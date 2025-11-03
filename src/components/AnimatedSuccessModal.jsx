import React from "react";
import { motion } from "framer-motion";

const AnimatedSuccessModal = ({ onClose }) => (
  <motion.div
    className="success-modal"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 100 }}
  >
    <h3>🎉 Certificate Sent Successfully!</h3>
    <button onClick={onClose}>Close</button>
  </motion.div>
);

export default AnimatedSuccessModal;
