const fs = require("node:fs");
const path = require("node:path");

const projectRoot = __dirname;
const sourcePath = path.join(projectRoot, "source", "slides.md");
const outputPath = path.join(projectRoot, "index.html");

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderInline(text) {
  const placeholders = [];
  let rendered = text;

  rendered = rendered.replace(/`([^`]+)`/g, (_, code) => {
    const token = `__TOKEN_${placeholders.length}__`;
    placeholders.push(`<code>${escapeHtml(code)}</code>`);
    return token;
  });

  rendered = rendered.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
    const token = `__TOKEN_${placeholders.length}__`;
    placeholders.push(`<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />`);
    return token;
  });

  rendered = rendered.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const token = `__TOKEN_${placeholders.length}__`;
    placeholders.push(`<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`);
    return token;
  });

  rendered = escapeHtml(rendered);

  placeholders.forEach((html, index) => {
    rendered = rendered.replace(`__TOKEN_${index}__`, html);
  });

  return rendered;
}

function splitSlides(markdown) {
  const lines = markdown.split("\n");
  const slides = [];
  let currentSlide = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      currentSlide.push(line);
      continue;
    }

    if (!inCodeBlock && line.trim() === "---") {
      slides.push(currentSlide);
      currentSlide = [];
      continue;
    }

    currentSlide.push(line);
  }

  if (currentSlide.length > 0) {
    slides.push(currentSlide);
  }

  return slides.filter((slide) => slide.some((line) => line.trim() !== ""));
}

function closeLists(state, html) {
  while (state.depth > 0) {
    html.push(`${"  ".repeat(state.depth)}</li>`);
    html.push(`${"  ".repeat(state.depth - 1)}</ul>`);
    state.depth -= 1;
  }
}

function renderSlide(lines) {
  const html = ["<section>"];
  const notes = [];
  const listState = { depth: 0 };
  let inCodeBlock = false;
  let inHtmlComment = false;
  let codeFence = "";
  let codeLines = [];

  const flushCodeBlock = () => {
    const language = codeFence.slice(3).trim();
    const className = language ? ` class="language-${escapeHtml(language)}"` : "";
    html.push(`  <pre><code${className}>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
    codeFence = "";
    codeLines = [];
  };

  const closeToDepth = (targetDepth) => {
    while (listState.depth > targetDepth) {
      html.push(`${"  ".repeat(listState.depth)}</li>`);
      html.push(`${"  ".repeat(listState.depth - 1)}</ul>`);
      listState.depth -= 1;
    }
  };

  const openToDepth = (targetDepth) => {
    while (listState.depth < targetDepth) {
      html.push(`${"  ".repeat(listState.depth)}<ul>`);
      listState.depth += 1;
    }
  };

  let commentBuffer = [];

  for (const line of lines) {
    if (!inCodeBlock && inHtmlComment) {
      if (line.includes("-->")) {
        commentBuffer.push(line.slice(0, line.indexOf("-->"))); 
        notes.push(commentBuffer.map((text) => text.trim()).filter(Boolean).join("\n"));
        commentBuffer = [];
        inHtmlComment = false;
      } else {
        commentBuffer.push(line);
      }
      continue;
    }

    if (!inCodeBlock && /^\s*<!--/.test(line)) {
      if (line.includes("-->")) {
        const inner = line.slice(line.indexOf("<!--") + 4, line.indexOf("-->"));
        notes.push(inner.trim());
      } else {
        inHtmlComment = true;
        commentBuffer = [line.replace(/^\s*<!--\s*/, "")];
      }
      continue;
    }

    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        closeLists(listState, html);
        inCodeBlock = true;
        codeFence = line.trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      closeLists(listState, html);
      const level = headingMatch[1].length;
      html.push(`  <h${level}>${renderInline(headingMatch[2])}</h${level}>`);
      continue;
    }

    const listMatch = line.match(/^(\s*)-\s+(.*)$/);
    if (listMatch) {
      const indent = listMatch[1].replace(/\t/g, "  ").length;
      const targetDepth = Math.floor(indent / 2) + 1;

      if (listState.depth >= targetDepth) {
        html.push(`${"  ".repeat(listState.depth)}</li>`);
        closeToDepth(targetDepth);
      }

      openToDepth(targetDepth);
      html.push(`${"  ".repeat(targetDepth)}<li>${renderInline(listMatch[2])}`);
      continue;
    }

    if (line.trim() === "") {
      closeLists(listState, html);
      continue;
    }

    closeLists(listState, html);

    if (/^!\[([^\]]*)\]\(([^)]+)\)\s*$/.test(line.trim())) {
      html.push(`  <p>${renderInline(line.trim())}</p>`);
      continue;
    }

    const paragraph = /\s{2}$/.test(line)
      ? `${renderInline(line.slice(0, -2))}<br />`
      : renderInline(line);
    html.push(`  <p>${paragraph}</p>`);
  }

  closeLists(listState, html);

  if (notes.length > 0) {
    html.push(`  <aside class="notes">${escapeHtml(notes.join("\n"))}</aside>`);
  }

  html.push("</section>");
  return html.join("\n");
}

function buildHtml(slidesHtml) {
  return `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>a11y i praktiken</title>
    <link rel="stylesheet" href="./node_modules/reveal.js/dist/reset.css" />
    <link rel="stylesheet" href="./node_modules/reveal.js/dist/reveal.css" />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
${slidesHtml}
      </div>
    </div>
    <script src="./node_modules/reveal.js/dist/reveal.js"></script>
    <script src="./node_modules/reveal.js/plugin/notes/notes.js"></script>
    <script>
      Reveal.initialize({
        hash: true,
        progress: true,
        slideNumber: true,
        plugins: [RevealNotes]
      });
    </script>
  </body>
</html>
`;
}

const markdown = fs.readFileSync(sourcePath, "utf8").replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
const slides = splitSlides(markdown);
const slidesHtml = slides.map((slide) => renderSlide(slide)).join("\n");

fs.writeFileSync(outputPath, buildHtml(slidesHtml), "utf8");
process.stdout.write(`Generated ${path.basename(outputPath)} with ${slides.length} slides.\n`);
