import { createCertificate } from "../services/certificateService.js";
import { sendCertificateEmail } from "../services/emailService.js";

export const generateCertificate = async (req, res) => {
  try {
    const data = req.body;
    const { pdfPath, jpgPath } = await createCertificate(data);

    await sendCertificateEmail(data.email, pdfPath, jpgPath, data.name);
    res.json({ message: "Certificate generated and emailed successfully!" });
  } catch (err) {
    console.error("Error generating certificate:", err);
    res.status(500).json({ message: "Error generating certificate" });
  }
};
