const puppeteer = require("puppeteer");
const path = require("path");

function getArg(name, fallback = null) {
  const i = process.argv.indexOf(name);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

async function run() {
  const url =
    getArg("--url") ||
    process.env.URL ||
    "https://cv.deverage.ch";

  const outDir = process.env.OUT_DIR || "/output";

  const filename =
    getArg("--out") ||
    process.env.OUT_FILE ||
    "CV_Muller_Celien.pdf";

  const outPath = path.isAbsolute(filename)
    ? filename
    : path.join(outDir, filename);

  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: process.env.CHROMIUM_PATH, // important in Docker
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
    ],
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  await page.addStyleTag({
    content: `
      @media print {
        html, body { margin: 0 !important; padding: 0 !important; background: white !important; color: black !important; }
        :root { background: none !important; color: black !important; }
        body > *:not(#cv):not(.cv-container):not(header):not(nav):not(.icons):not(.links) { display: none !important; }
        #cv, .cv-container { margin: 0 !important; padding: 0 !important; box-shadow: none !important; border: none !important; width: 100% !important; max-width: 100% !important; }
        svg { fill: black !important; color: black !important; }
        footer { display: none !important; }
      }
    `,
  });

  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "8mm", bottom: "10mm", left: "12mm", right: "12mm" },
  });

  await browser.close();
  console.log(`PDF generated: ${outPath}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
