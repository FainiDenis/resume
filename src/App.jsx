import { useState, useEffect } from "react";
import resumeData from "./data/resumeData";
import { Background, Section, Footer } from "./components/UI";
import { Header, Experience, Projects, Skills, Education, Certifications, StatusPanel } from "./components/Sections";
import PrintStyles from "./components/PrintStyles";
import PrintButton from "./components/PrintButton";
import PrintLayout from "./components/PrintLayout";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const width = useWindowWidth();
  const isMobile = width < 768;

  useEffect(() => { setTimeout(() => setBooted(true), 400); }, []);

  return (
    <>
      <PrintStyles />

      {/* ── Dedicated print layout (hidden on screen, visible on print) ── */}
      <PrintLayout />

      {/* ── Screen UI (hidden on print) ── */}
      <div className="screen-only" style={{
        minHeight: "100vh", background: "#0a0c0f",
        fontFamily: "'Courier New', monospace", color: "#c8d0d8",
        position: "relative", overflow: "hidden",
      }}>
        <Background />
        <PrintButton />

        <div style={{
          maxWidth: "900px", margin: "0 auto",
          padding: isMobile ? "24px 16px" : "40px 24px",
          position: "relative",
          opacity: booted ? 1 : 0, transition: "opacity 0.6s ease",
        }}>
          <Header
            name={resumeData.name}
            title={resumeData.title}
            tagline={resumeData.tagline}
            contact={resumeData.contact}
            isMobile={isMobile}
          />

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 280px",
            gap: isMobile ? "0" : "48px",
          }}>
            <div>
              <Section title="Profile">
                <p style={{
                  fontSize: isMobile ? "14px" : "13px",
                  lineHeight: "1.8", color: "#a0aab4", margin: 0,
                  borderLeft: "2px solid rgba(0,255,128,0.2)", paddingLeft: "16px",
                }}>
                  {resumeData.summary}
                </p>
              </Section>
              <Experience experience={resumeData.experience} isMobile={isMobile} />
              <Projects projects={resumeData.projects} />
            </div>

            <div style={{ marginTop: isMobile ? "8px" : "0" }}>
              <Skills skills={resumeData.skills} />
              <Education education={resumeData.education} />
              <Certifications certifications={resumeData.certifications} />
              <StatusPanel status={resumeData.status} />
            </div>
          </div>

          <Footer isMobile={isMobile} />
        </div>
      </div>
    </>
  );
}