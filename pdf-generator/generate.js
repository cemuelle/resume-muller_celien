const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage"
    ]
  });

  const page = await browser.newPage();
  const url = "https://cv.deverage.ch";

  await page.goto(url, { waitUntil: "networkidle0" });

  await page.addStyleTag({
    content: `
      @media print {

        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background: white !important;
          color: black !important;
        }

        :root {
          background: none !important;
          color: black !important;
        }

        /* Garder cv + header + icônes */
        body > *:not(#cv):not(.cv-container):not(header):not(nav):not(.icons):not(.links) {
          display: none !important;
        }

        #cv,
        .cv-container {
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
          border: none !important;
          width: 100% !important;
          max-width: 100% !important;
        }

        /* Icônes noires */
        svg {
          fill: black !important;
          color: black !important;
        }

        footer {
          display: none !important;
        }
      }
    `
  });

  await page.pdf({
    path: "CV_Muller_Celien.pdf",
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "8mm", bottom: "10mm", left: "12mm", right: "12mm" }
  });

  await browser.close();
  console.log("✔ PDF Generated with icons!");
}

run().catch(console.error);
