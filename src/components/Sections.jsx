import { Badge, Section } from "./UI";

// ─── Header ──────────────────────────────────────────────────────────────────
export const Header = ({ name, title, tagline, contact, isMobile }) => (
  <div style={{ borderLeft: "3px solid #00ff80", paddingLeft: isMobile ? "16px" : "24px", marginBottom: "40px" }}>
    <div style={{ fontSize: "11px", color: "#00ff80", letterSpacing: "0.3em", marginBottom: "8px", opacity: 0.7 }}>
      root@system:~$ ./load_resume.sh
    </div>
    <h1 style={{
      fontSize: isMobile ? "36px" : "clamp(50px, 6vw, 58px)",
      fontWeight: "900", color: "#ffffff", margin: "0 0 4px 0",
      letterSpacing: "-0.02em", fontFamily: "'Courier New', monospace", lineHeight: 1,
    }}>
      {name}
    </h1>
    <div style={{ fontSize: isMobile ? "13px" : "15px", color: "#00ff80", letterSpacing: "0.1em", marginBottom: "10px", textTransform: "uppercase" }}>
      {title}
    </div>
    <div style={{ fontSize: "13px", color: "#6a7a8a", fontStyle: "italic" }}>// {tagline}</div>

    {/* Contact bar — wraps naturally on mobile */}
    <div style={{
      display: "flex", flexWrap: "wrap", marginTop: "20px",
      background: "rgba(0,255,128,0.04)", border: "1px solid rgba(0,255,128,0.15)",
      padding: "8px 0",
    }}>
      {Object.entries(contact).map(([key, val]) => (
        <div key={key} style={{
          padding: isMobile ? "6px 12px" : "4px 18px",
          borderRight: "1px solid rgba(0,255,128,0.15)",
          fontSize: isMobile ? "12px" : "14px", color: "#8a9aaa",
        }}>
          <span style={{ color: "#00ff80", marginRight: "6px" }}>
            {key === "email" ? "✉" : key === "phone" ? "☎" : key === "location" ? "⌖" : key === "linkedin" ? "in" : "⌘"}
          </span>
          {val}
        </div>
      ))}
    </div>
  </div>
);

// ─── Experience ───────────────────────────────────────────────────────────────
export const Experience = ({ experience, isMobile }) => (
  <Section title="Experience">
    {experience.map((job, i) => (
      <div key={i} className="experience-item" style={{
        marginBottom: "28px", paddingBottom: "28px",
        borderBottom: i < experience.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          flexDirection: isMobile ? "column" : "row",
          flexWrap: "wrap", gap: "4px", marginBottom: "6px",
        }}>
          <div>
            <div style={{ fontSize: isMobile ? "16px" : "20px", color: "#e8e8e8", fontWeight: "bold" }}>{job.role}</div>
            <div style={{ fontSize: "15px", color: "#00ff80", opacity: 0.8 }}>{job.company} · {job.location}</div>
          </div>
          <div style={{
            fontSize: "12px", color: "#4a6070", alignSelf: isMobile ? "flex-start" : "flex-start",
            background: "rgba(255,255,255,0.04)", padding: "3px 10px",
            border: "1px solid rgba(255,255,255,0.08)", marginTop: isMobile ? "4px" : "0",
          }}>
            {job.period}
          </div>
        </div>
        <ul style={{ margin: "12px 0 0 0", paddingLeft: "16px" }}>
          {job.bullets.map((b, j) => (
            <li key={j} style={{
              fontSize: isMobile ? "14px" : "14px", color: "#8a9aaa",
              lineHeight: "1.7", marginBottom: "8px",
              listStyleType: "none", position: "relative", paddingLeft: "14px",
            }}>
              <span style={{ position: "absolute", left: 0, color: "#00ff80", fontSize: "10px", top: "5px" }}>▸</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </Section>
);

// ─── Projects ─────────────────────────────────────────────────────────────────
export const Projects = ({ projects }) => (
  <Section title="Projects">
    {projects.map((p, i) => (
      <div key={i} style={{
        background: "rgba(0,255,128,0.03)", border: "1px solid rgba(0,255,128,0.1)",
        padding: "16px", marginBottom: "14px",
      }}>
        <div style={{ fontSize: "20px", color: "#e0e0e0", fontWeight: "bold", marginBottom: "6px" }}>⌗ {p.name}</div>
        <div style={{ fontSize: "14px", color: "#7a8a9a", lineHeight: "1.6", marginBottom: "10px" }}>{p.desc}</div>
        <div>{p.tags.map((t) => <Badge key={t} text={t} />)}</div>
      </div>
    ))}
  </Section>
);

// ─── Skills ───────────────────────────────────────────────────────────────────
export const Skills = ({ skills }) => (
  <Section title="Skills">
    {Object.entries(skills).map(([cat, items]) => (
      <div key={cat} style={{ marginBottom: "18px" }}>
        <div style={{ fontSize: "10px", color: "#00ff80", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px", opacity: 0.7 }}>
          {cat}
        </div>
        <div>{items.map((s) => <Badge key={s} text={s} />)}</div>
      </div>
    ))}
  </Section>
);

// ─── Education ────────────────────────────────────────────────────────────────
export const Education = ({ education }) => (
  <Section title="Education">
    <div style={{ background: "rgba(0,255,128,0.04)", border: "1px solid rgba(0,255,128,0.12)", padding: "16px" }}>
      <div style={{ fontSize: "14px", color: "#e0e0e0", fontWeight: "bold", marginBottom: "4px" }}>{education.degree}</div>
      <div style={{ fontSize: "13px", color: "#00ff80", opacity: 0.8, marginBottom: "4px" }}>{education.school}</div>
      <div style={{ fontSize: "12px", color: "#4a6070" }}>Class of {education.year} · GPA {education.gpa}</div>
    </div>
  </Section>
);

// ─── Certifications ───────────────────────────────────────────────────────────
export const Certifications = ({ certifications }) => (
  <Section title="Certifications">
    {certifications.map((c, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ width: "8px", height: "8px", background: "#00ff80", flexShrink: 0, clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
        <div>
          <div style={{ fontSize: "13px", color: "#d0d8e0", fontWeight: "bold" }}>{c.name}</div>
          <div style={{ fontSize: "11px", color: "#4a6070" }}>{c.issuer} · {c.year}</div>
        </div>
      </div>
    ))}
  </Section>
);

// ─── Status Panel ─────────────────────────────────────────────────────────────
export const StatusPanel = ({ status }) => (
  <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(0,255,128,0.15)", padding: "16px", marginTop: "8px" }}>
    <div style={{ fontSize: "10px", color: "#00ff80", letterSpacing: "0.15em", marginBottom: "12px", fontFamily: "'Courier New', monospace" }}>
      SYSTEM STATUS
    </div>
    {status.map((s) => (
      <div key={s.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "8px", color: "#6a7a8a", fontFamily: "'Courier New', monospace" }}>
        <span>{s.label}</span>
        <span style={{ color: s.ok ? "#00ff80" : "#ff4040" }}>{s.value}</span>
      </div>
    ))}
  </div>
);