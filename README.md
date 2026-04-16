# reveal.js presentation

This project is a static reveal.js presentation generated from `source/slides.md`.

## Install

```bash
npm install
```

## Build

```bash
npm run build
```

## Run locally

```bash
npm start
```

The local server serves `index.html` directly on port `3000`.

## Notes

- Slides are pre-generated into HTML `<section>` elements in `index.html`.
- `source/slides.md` is not loaded at runtime.
- No `fetch()` call is used.
- You can edit the slides directly in `index.html` after generation.
- Reveal speaker notes are enabled through the Reveal Notes plugin.
