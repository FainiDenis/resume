// ─── Shared UI primitives ────────────────────────────────────────────────────

export const Badge = ({ text }) => (
  <span style={{
    background: "rgba(0,255,128,0.08)",
    border: "1px solid rgba(0,255,128,0.25)",
    color: "#00ff80", padding: "3px 10px", borderRadius: "2px",
    fontSize: "12px", fontFamily: "'Courier New', monospace",
    letterSpacing: "0.05em", display: "inline-block",
    marginRight: "6px", marginTop: "5px",
  }}>
    {text}
  </span>
);

export const Section = ({ title, children, accent = "#00ff80" }) => (
  <div style={{ marginBottom: "36px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
      <span style={{ color: accent, fontFamily: "'Courier New', monospace", fontSize: "11px", opacity: 0.7 }}>
        //
      </span>
      <h2 style={{
        color: "#e8e8e8", fontSize: "13px", letterSpacing: "0.2em",
        textTransform: "uppercase", margin: 0,
        fontFamily: "'Courier New', monospace", fontWeight: "bold",
      }}>
        {title}
      </h2>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${accent}40, transparent)` }} />
    </div>
    {children}
  </div>
);

export const Background = () => (
  <>
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100,
      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
    }} />
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none",
      backgroundImage: "linear-gradient(rgba(0,255,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,128,0.03) 1px, transparent 1px)",
      backgroundSize: "40px 40px",
    }} />
  </>
);

export const Footer = ({ isMobile }) => (
  <div style={{
    borderTop: "1px solid rgba(0,255,128,0.1)", marginTop: "40px", paddingTop: "16px",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "center" : "unset",
    justifyContent: "space-between", gap: isMobile ? "6px" : "0",
    fontSize: "10px", color: "#2a3a4a", letterSpacing: "0.1em",
    fontFamily: "'Courier New', monospace", textAlign: "center",
  }}>
    <span>resume_v2.1 · {new Date().getFullYear()}</span>
    <span>References available upon request</span>
    <span>// END OF FILE</span>
  </div>
);