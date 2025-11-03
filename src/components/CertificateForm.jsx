import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateCertificate } from "../api.js";
import AnimatedSuccessModal from "./AnimatedSuccessModal";
import "../styles/animations.css";
import "../styles/loader.css";
import "../styles/form.css";

const CertificateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gstNumber: "",
    businessName: "",
    businessAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await generateCertificate(formData);
      setSuccess(true);
    } catch (err) {
      console.error("Error generating certificate:", err);
      alert("Something went wrong while generating the certificate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="form-wrapper"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >


      <motion.h2
        className="form-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Generate Your Business Certificate
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="certificate-form"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {Object.keys(formData).map((key) => (
          <div key={key} className="input-group">
            <label htmlFor={key}>
              {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
            </label>
            <input
              id={key}
              name={key}
              placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
              value={formData[key]}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        ))}

        <motion.button
          type="submit"
          className="submit-btn"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.03 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
        >
          {loading ? "Generating..." : "Generate Certificate"}
        </motion.button>
      </motion.form>

      <AnimatePresence>
        {loading && (
          <motion.div
            className="loader-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="loader"></div>
            <p>Generating your certificate...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {success && <AnimatedSuccessModal onClose={() => setSuccess(false)} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default CertificateForm;
