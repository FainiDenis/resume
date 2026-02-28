
// Centralized data object for resume content
const resumeData = {
  name: "Denis Faini",
  title: "IT Support Technician",
  tagline: "Keeping systems alive. Keeping users sane.",
  contact: {
    email: "dfaini25@gmail.com",
    // phone: "(5xx) 0xx-3xxx",
    location: "Rochester, NY",
    linkedin: "linkedin.com/in/fainidenis",
    github: "github.com/fainidenis",
  },

  // Brief summary or objective statement
  summary:
    "Motivated IT Technician and web developer with hands-on experience in hardware troubleshooting, OS deployments, network support, and web application development. CompTIA A+ certified with a passion for solving complex technical problems and delivering clear solutions to end-users.",

  // Skills organized by category for easy parsing
  skills: {
    "Operating Systems": ["Windows 11", "Ubuntu/Debian", "Rocky/Fedora", "macOS Tahoe"],
    Networking: ["TCP/IP", "DNS/DHCP", "VPN Setup", "Wireshark"],
    Hardware: ["PC Assembly", "Component Replacement", "Printer Setup"],
    Tools: ["LanDesk", "Active Directory", "Office 365", "FreshService", "Jamf", "GPO", "Ansible"],
    Scripting: ["HTML", "CSS", "JavaScript", "Bash", "Python", "MySQL"],
  },

  // Certifications with name, year obtained, and issuing organization
  certifications: [
    { name: "CompTIA A+", year: "2026", issuer: "CompTIA" },
    { name: "CompTIA Security+", year: "in-progress", issuer: "CompTIA" },
  ],

  // Experience entries with role, company, period, location, and bullet points
  experience: [
    {
      role: "IT Support Specialist",
      company: "Rochester Institute of Technology – NTID Service Desk",
      period: "Dec 2020 – Dec 2024",
      location: "Rochester, NY",
      bullets: [
        "Resolved 30+ weekly tickets with 94% same-day resolution rate.",
        "Deployed 40+ workstations using automated imaging via Ivanti LANDesk, reducing setup time by 50%.",
        "Decommissioned old devices and updated inventory records, improving asset tracking accuracy.",
        "Provided remote support via Zoom and LanDesk for 20+ recurring clients.",
        "Supported Active Directory user/group management and Office 365 assignments.",
      ],
    },
    {
      role: "Jr. System Administrator (Intern)",
      company: "Rochester Institute of Technology – NTID Service Desk",
      period: "Jan 2024 – Aug 2024",
      location: "Rochester, NY",
      bullets: [
        "Assisted in maintaining a mixed environment of 200+ Windows and Mac machines.",
        "Maintained compliance with security policies by applying updates and patches to workstations.",
        "Supported device provisioning and deprovisioning using LanDesk Ivanti, Jamf Pro, and CLAWs.",
        "Created a standardized documentation framework for common issues, improving team knowledge sharing and onboarding.",
      ],
    },
    {
      role: "Peer Tutor",
      company: "Rochester Institute of Technology – Information Computing Studies",
      period: "Jan 2020 – May 2022",
      location: "Rochester, NY",
      bullets: [
        "Provided one-on-one tutoring in programming concepts and IT fundamentals to 50+ Deaf and hard-of-hearing students, improving their course performance.",
        
      ],
    },
  ],

  // Education entry with degree, school, graduation year, and GPA
  education: {
    degree: "Bachelor of Science – Computing and Information Technology",
    school: "Rochester Institute of Technology",
    year: "2025",
    gpa: "3.2 / 4.0",
  },

  // Personal projects or relevant coursework
  projects: [
    {
      name: "Home Lab Network",
      desc: "Built a virtualized home lab with pfSense firewall, VLANs, 3 VMs and 10+ LXC containers running on Proxmox hypervisor for security practice.",
      tags: ["pfSense", "Proxmox", "VLAN", "Linux", "GPU Passthrough", "Open Media Vault", "LUKS", "Docker", "Proxmox VE Helper Scripts"],
    },
    {
      name: "Senior Development Project: Flight booking web app",
      desc: "Collaborated on a team of seven to develop a full-stack flight booking application for a company's event planner using React, Node.js, Express, and MySQL. Implemented user authentication, flight search, and booking features.",
      tags: ["React", "Node.js", "Express", "HTML", "CSS", "JavaScript", "MySQL", "Git", "Agile", "Figma", "Amadeus API", "DigitalOcean"],
    },
  ],

  // Current job search status
  status: [
    { label: "Availability", value: "Open to Work", ok: true },
    { label: "Work Type", value: "On-site / Remote", ok: true },
    { label: "Clearance", value: "None (Willing)", ok: true },
  ],
};

// Exporting the resume data object for use in other components
export default resumeData;
