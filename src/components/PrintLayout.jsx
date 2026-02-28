import resumeData from "../data/resumeData";

const p = {
  // Colors
  black:    "#111111",
  dark:     "#222222",
  mid:      "#444444",
  muted:    "#666666",
  light:    "#888888",
  accent:   "#1a5c3a",
  accentBg: "#eef6f1",
  border:   "#cccccc",
  rule:     "#dddddd",
};

const PrintLayout = () => (
  <div className="print-only" style={{ display: "none" }}>
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: p.black,
      background: "#ffffff",
      maxWidth: "100%",
      fontSize: "10pt",
      lineHeight: "1.5",
    }}>

      {/* ── NAME & TITLE ── */}
      <div style={{ borderBottom: `3px solid ${p.accent}`, paddingBottom: "10px", marginBottom: "14px" }}>
        <h1 style={{ margin: 0, fontSize: "22pt", fontWeight: "700", color: p.black, letterSpacing: "-0.3px" }}>
          {resumeData.name}
        </h1>
        <div style={{ fontSize: "11pt", color: p.accent, fontWeight: "600", marginTop: "2px", letterSpacing: "0.5px" }}>
          {resumeData.title}
        </div>

        {/* Contact row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0 18px", marginTop: "7px", fontSize: "8.5pt", color: p.mid }}>
          {Object.entries(resumeData.contact).map(([key, val]) => (
            <span key={key}>
              <span style={{ color: p.accent, marginRight: "4px" }}>
                {key === "email" ? "✉" : key === "phone" ? "☎" : key === "location" ? "⌖" : key === "linkedin" ? "in" : "⌘"}
              </span>
              {val}
            </span>
          ))}
        </div>
      </div>

      {/* ── TWO COLUMN BODY ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 168px", gap: "20px", alignItems: "start" }}>

        {/* ── LEFT ── */}
        <div>
          {/* Summary */}
          <PrintSection title="Profile">
            <p style={{ margin: 0, color: p.dark, fontSize: "9.5pt", lineHeight: "1.6" }}>
              {resumeData.summary}
            </p>
          </PrintSection>

          {/* Experience */}
          <PrintSection title="Experience">
            {resumeData.experience.map((job, i) => (
              <div key={i} style={{ marginBottom: i < resumeData.experience.length - 1 ? "12px" : 0, pageBreakInside: "avoid" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: "700", fontSize: "10pt", color: p.black }}>{job.role}</span>
                  <span style={{ fontSize: "8pt", color: p.muted, whiteSpace: "nowrap", marginLeft: "8px" }}>{job.period}</span>
                </div>
                <div style={{ fontSize: "8.5pt", color: p.accent, marginBottom: "5px" }}>
                  {job.company} &nbsp;·&nbsp; {job.location}
                </div>
                <ul style={{ margin: 0, paddingLeft: "14px" }}>
                  {job.bullets.map((b, j) => (
                    <li key={j} style={{ fontSize: "9pt", color: p.dark, marginBottom: "3px", lineHeight: "1.45" }}>{b}</li>
                  ))}
                </ul>
                {i < resumeData.experience.length - 1 && (
                  <div style={{ borderBottom: `1px solid ${p.rule}`, marginTop: "10px" }} />
                )}
              </div>
            ))}
          </PrintSection>

          {/* Projects */}
          <PrintSection title="Projects">
            {resumeData.projects.map((p2, i) => (
              <div key={i} style={{ marginBottom: i < resumeData.projects.length - 1 ? "9px" : 0, pageBreakInside: "avoid" }}>
                <span style={{ fontWeight: "700", fontSize: "9.5pt", color: p.black }}>{p2.name}</span>
                <span style={{ fontSize: "8.5pt", color: p.dark, marginLeft: "6px" }}>— {p2.desc}</span>
                <div style={{ marginTop: "4px" }}>
                  {p2.tags.map((t) => (
                    <span key={t} style={{
                      fontSize: "7.5pt", color: p.accent, background: p.accentBg,
                      border: `1px solid ${p.accent}`, borderRadius: "2px",
                      padding: "1px 6px", marginRight: "4px", display: "inline-block",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </PrintSection>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div>
          {/* Skills */}
          <PrintSection title="Skills">
            {Object.entries(resumeData.skills).map(([cat, items]) => (
              <div key={cat} style={{ marginBottom: "8px" }}>
                <div style={{ fontSize: "7.5pt", fontWeight: "700", color: p.accent, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "3px" }}>
                  {cat}
                </div>
                <div style={{ fontSize: "8.5pt", color: p.dark, lineHeight: "1.5" }}>
                  {items.join(", ")}
                </div>
              </div>
            ))}
          </PrintSection>

          {/* Education */}
          <PrintSection title="Education">
            <div style={{ fontSize: "9pt", fontWeight: "700", color: p.black }}>{resumeData.education.degree}</div>
            <div style={{ fontSize: "8.5pt", color: p.accent, marginTop: "2px" }}>{resumeData.education.school}</div>
            <div style={{ fontSize: "8pt", color: p.muted, marginTop: "2px" }}>
              {resumeData.education.year} &nbsp;·&nbsp; GPA {resumeData.education.gpa}
            </div>
          </PrintSection>

          {/* Certifications */}
          <PrintSection title="Certifications">
            {resumeData.certifications.map((c, i) => (
              <div key={i} style={{ marginBottom: "7px", pageBreakInside: "avoid" }}>
                <div style={{ fontSize: "8.5pt", fontWeight: "700", color: p.black }}>{c.name}</div>
                <div style={{ fontSize: "7.5pt", color: p.muted }}>{c.issuer} · {c.year}</div>
              </div>
            ))}
          </PrintSection>

          {/* Availability */}
          <PrintSection title="Status">
            {resumeData.status.map((s) => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "8pt", marginBottom: "5px" }}>
                <span style={{ color: p.muted }}>{s.label}</span>
                <span style={{ color: s.ok ? p.accent : "#cc0000", fontWeight: "600" }}>{s.value}</span>
              </div>
            ))}
          </PrintSection>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${p.rule}`, marginTop: "14px", paddingTop: "7px", display: "flex", justifyContent: "space-between", fontSize: "7.5pt", color: p.light }}>
        <span>{resumeData.name} · Resume {new Date().getFullYear()}</span>
        <span>References available upon request</span>
      </div>
    </div>
  </div>
);

const PrintSection = ({ title, children }) => (
  <div style={{ marginBottom: "14px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "7px" }}>
      <h3 style={{
        margin: 0, fontSize: "8pt", fontWeight: "700", textTransform: "uppercase",
        letterSpacing: "0.8px", color: p.accent,
      }}>
        {title}
      </h3>
      <div style={{ flex: 1, height: "1px", background: p.accent, opacity: 0.35 }} />
    </div>
    {children}
  </div>
);

export default PrintLayout;