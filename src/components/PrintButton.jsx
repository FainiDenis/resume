// Importing necessary libraries and components
import { useState } from "react";

// Component for a print button that triggers the browser's print dialog
const PrintButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="no-print"
      onClick={() => window.print()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed", bottom: "24px", right: "24px", zIndex: 200,
        background: hovered ? "#00ff80" : "transparent",
        color: hovered ? "#0a0c0f" : "#00ff80",
        border: "1px solid #00ff80",
        fontFamily: "'Courier New', monospace",
        fontSize: "12px", letterSpacing: "0.1em",
        padding: "10px 20px", cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: hovered ? "0 0 20px rgba(0,255,128,0.4)" : "none",
      }}
    >
      ⎙ PRINT / SAVE PDF
    </button>
  );
};

// Exporting the PrintButton component for use in other parts of the application
export default PrintButton;