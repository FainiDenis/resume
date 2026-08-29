# Resume

An interactive, responsive resume site built with vanilla HTML, CSS, and JavaScript. It doubles as a **portfolio**, rendering Markdown coursework and lab write-ups inline so visitors can read every project without leaving the page.

> **Live site**: [fainidenis.github.io/resume](https://fainidenis.github.io/resume/)

## Features

- **Two tabs** — switch between the **Resume** sheet and the **Portfolio** viewer.
- **Resume sheet** — a print-ready, letter-sized page with editable text inline and a **Download PDF** button (`html2canvas` + `jsPDF`, single page, no splitting).
- **Portfolio viewer** — a sidebar lists every project and its assignments; documents render as styled Markdown (`marked`) with screenshots in place.
- **Works offline** — all Markdown content is embedded in `./js/portfolio-data.js` and `marked` is vendored locally, so the page works when opened directly from the file system.
- **Responsive** — the sidebar collapses to a document picker on small screens.


## Adding Portfolio Content

1. Add your assignment or write-up as Markdown under `portifolio/<project>/`.
2. Register it in the `PORTFOLIO` array in `./js/script.js` (title, folder, and a labeled list of docs).
3. Regenerate the embedded data so it loads anywhere:

   ```sh
   python3 make_portfolio.py
   ```

Any screenshots referenced with relative paths (e.g. `../screenshots/week04/image2.png`) resolve automatically.

## Deployment

The site is published with **GitHub Pages** from the `gh-pages` branch, using a plain `index.html` — no build step. Push changes and Pages serves them.

## License

[MIT](LICENSE) © 2020 FainiDenis