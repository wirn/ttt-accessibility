You are generating a reveal.js presentation project.

IMPORTANT:
The text below is INSTRUCTIONS, not slide content.
Do NOT render this text as slides.

Instead:
- Read the file "source/slides.md"
- Use that file as the ONLY source of slide content
- Treat source/slides.md as read-only input
- Do NOT modify source/slides.md

---

TASK:

Generate a complete reveal.js project.

Requirements:
- Convert slides.md into static HTML slides (<section>)
- Do NOT load slides.md at runtime
- Do NOT use fetch()
- I want to edit slides directly in HTML after generation
- Ensure the RevealNotes plugin is included and initialized in index.html

---

SLIDE FORMAT (STRICT):

The file "slides.md" follows a Marp-style Markdown format.

You MUST follow these rules exactly:

- "---" = new slide
- "# / ## / ###" = headings inside the slide
- "-" = bullet list
- Indentation = nested bullets
- Code blocks (``` ) must be preserved as-is
- Normal Markdown paragraphs must be preserved as paragraph content
- Markdown links must be preserved as links
- Markdown images must be preserved as images

---

SPEAKER NOTES (MANDATORY):

Before rendering each slide, scan the raw slide Markdown for note comments using this exact pattern:

<!-- _note: ... -->

Behavior:
- Every comment matching `<!-- _note: ... -->` MUST be extracted before normal Markdown rendering
- The extracted note text MUST NOT be rendered as visible slide content
- Instead, append the extracted note text to that slide as:
  <aside class="notes">...</aside>
- Remove the original HTML comments from the rendered slide body

Important:
- Do NOT ignore these comments
- Do NOT leave these comments in the HTML
- Do NOT render them as visible text
- They MUST become reveal.js speaker notes

If a slide contains multiple note comments:
- Merge all note texts into a single `<aside class="notes">`
- Preserve order
- Separate each note with a newline

Example input:
<!-- _note: First note -->
# Title
Some text
<!-- _note: Second note -->

Required output:
<section>
  <h1>Title</h1>
  <p>Some text</p>
  <aside class="notes">First note
Second note</aside>
</section>

Implementation requirement:
- Parse notes from the raw Markdown source before converting Markdown to HTML
- HTML comments other than `<!-- _note: ... -->` should be discarded and must not appear visibly

---

IMAGES:

- Standard Markdown image syntax may be used:
  ![alt](path)
- Preserve image paths as written unless a relative path adjustment is strictly necessary
- Images are stored in /source/

---

OTHER RULES:

- Keep ALL content exactly as written
- Do NOT rewrite, summarize, or translate
- Do NOT infer or add missing content
- Preserve all valid Markdown content

---

PROJECT REQUIREMENTS:

Generate:
- package.json
- local dev server (npm start)
- reveal.js as dependency
- index.html with slides already generated
- styles.css
- README with instructions

---

REVEAL.JS REQUIREMENTS:

- slide numbers
- progress bar
- speaker notes enabled

---

DESIGN:

- clean, minimal
- good contrast

Use colors:
- #ffffff
- #1e2022
- #a3b6b4
- #FFB300

Use the colors for CSS variables.
Ensure #ffffff is used for background and #1e2022 for text to maintain accessibility standards. Use #FFB300 for header and #a3b6b4 for background blocks. Use #FFB300 for header and #a3b6b4 for background blocks.

---

AT THE END:

- You may run npm install
- Do NOT run npm start
- summarize generated files
- explain how to run the project
- confirm that slides.md is NOT used at runtime
- confirm that source/slides.md was not modified