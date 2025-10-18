const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
  const serverUrl = process.env.TEST_URL || "http://127.0.0.1:3000";
  const downloadPath = path.resolve(__dirname, "../../tmp-downloads");
  if (!fs.existsSync(downloadPath))
    fs.mkdirSync(downloadPath, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      `--window-size=1280,800`,
      `--no-sandbox`,
      `--disable-setuid-sandbox`,
    ],
  });

  try {
    const page = await browser.newPage();
    await page._client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: downloadPath,
    });

    page.on("console", (msg) => {
      const text = msg.text();
      console.log("PAGE LOG:", text);
    });

    await page.goto(serverUrl, { waitUntil: "networkidle2" });

    // Scroll to certificate section
    await page.evaluate(() => {
      const el = document.getElementById("certificate-generator");
      if (el) el.scrollIntoView();
    });

    // Fill certificate form
    await page.waitForSelector("#certificate-form");
    await page.type("#certificate-name", "Test User");
    await page.select("#certificate-badge", "eco-explorer");
    await page.type("#certificate-date", "2025-10-18");
    await page.type("#certificate-description", "E2E test certificate.");

    // Listen for certificate:downloaded event via console
    const downloaded = new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("Timed out waiting for download event")),
        10000
      );
      page
        .exposeFunction("onE2EDownload", (detail) => {
          clearTimeout(timeout);
          resolve(detail);
        })
        .catch(reject);
    });

    // Inject a small listener that logs to console when the event fires
    await page.evaluate(() => {
      document.addEventListener("certificate:downloaded", (e) => {
        // send to node via console
        console.log("E2E_CERT_DOWNLOADED:" + JSON.stringify(e.detail));
      });
    });

    // Submit the form to generate
    await page.click('#certificate-form button[type="submit"]');

    // Wait for the download button to appear and click it
    await page.waitForSelector("#download-certificate", {
      visible: true,
      timeout: 8000,
    });
    await page.click("#download-certificate");

    // Wait for the console log from the page indicating the event
    const found = await new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("Timed out waiting for page console event")),
        15000
      );
      page.on("console", (msg) => {
        const text = msg.text();
        if (text.startsWith("E2E_CERT_DOWNLOADED:")) {
          clearTimeout(timeout);
          try {
            const detail = JSON.parse(text.replace("E2E_CERT_DOWNLOADED:", ""));
            resolve(detail);
          } catch (err) {
            reject(err);
          }
        }
      });
    });

    console.log("E2E test succeeded, certificate detail:", found);

    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error("E2E test failed:", err);
    await browser.close();
    process.exit(1);
  }
})();
