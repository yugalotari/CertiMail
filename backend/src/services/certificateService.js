import ejs from "ejs";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import pdf from "pdf-poppler";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createCertificate = async (data) => {
  try {
    const templatePath = path.resolve(__dirname, "../templates/certificateTemplate.html");
    const htmlTemplate = fs.readFileSync(templatePath, "utf-8");
    const renderedHTML = ejs.render(htmlTemplate, data);

    const certDir = path.resolve(__dirname, "../certificates");
    if (!fs.existsSync(certDir)) fs.mkdirSync(certDir, { recursive: true });

    const baseName = data.name.replace(/\s+/g, "_");
    const pdfPath = path.join(certDir, `${baseName}.pdf`);
    const jpgPath = path.join(certDir, `${baseName}-1.jpg`);

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(renderedHTML, {
      waitUntil: "domcontentloaded",
      timeout: 90000,
    });

    await page.emulateMediaType("screen");

    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await browser.close();

    const opts = {
      format: "jpeg",
      out_dir: certDir,
      out_prefix: baseName,
      page: null,
      scale: 2048,
    };

    await pdf.convert(pdfPath, opts);

    console.log("Certificate generated successfully!");
    return { pdfPath, jpgPath };
  } catch (err) {
    console.error("Error in createCertificate:", err);
    throw err;
  }
};
