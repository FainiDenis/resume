async function downloadResume() {
  const btn = document.getElementById('downloadBtn');
  const sheet = document.querySelector('.sheet');
  const nameText = document.querySelector('.head-name').innerText.trim().replace(/\s+/g, '-') || 'Resume';

  const originalLabel = btn.textContent;
  btn.textContent = 'generating…';
  btn.disabled = true;

  try {
    const prevZoom = sheet.style.zoom;
    const root = document.documentElement;
    const wasPdfMode = root.classList.contains('pdf-mode');
    sheet.style.zoom = '1';
    root.classList.add('pdf-mode');

    // Let the browser reflow to the desktop layout before capturing.
    const nextFrame = () => new Promise(res => requestAnimationFrame(() => res()));
    await nextFrame();
    await nextFrame();

    const canvas = await html2canvas(sheet, {
      scale: sheet.offsetWidth <= 900 ? 2 : 3,
      useCORS: true,
      backgroundColor: '#ffffff'
    });

    sheet.style.zoom = prevZoom;
    if (!wasPdfMode) root.classList.remove('pdf-mode');

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'in', format: 'letter', orientation: 'portrait' });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    // Scale the rendered image to fit within one page — never split across pages.
    let imgW = pageW;
    let imgH = (canvas.height * imgW) / canvas.width;
    if (imgH > pageH) {
      imgH = pageH;
      imgW = (canvas.width * imgH) / canvas.height;
    }
    const xOffset = (pageW - imgW) / 2;
    const yOffset = (pageH - imgH) / 2;

    pdf.addImage(canvas.toDataURL('image/jpeg', 0.98), 'JPEG', xOffset, yOffset, imgW, imgH);
    pdf.save(nameText + '-Resume.pdf');
  } catch (err) {
    alert('PDF generation failed — please try again.');
  } finally {
    btn.textContent = originalLabel;
    btn.disabled = false;
  }
}

/* ===================== Portfolio ===================== */

const PORTFOLIO = [
  {
    id: 'event-based-travel',
    title: 'Event-Based Travel Planning',
    sub: 'Team capstone · web + mobile travel booking',
    tag: 'project',
    dir: 'showcase/event-based-travel',
    docs: [
      { file: 'README.md', label: 'Overview' },
      { file: 'docs/01-wireframes.md', label: 'Wireframe Design Demo' }
    ]
  },
  {
    id: 'client-server-networks',
    title: 'Client-Server Networks',
    sub: 'Windows Server 2012 R2 Administration',
    tag: 'coursework',
    dir: 'showcase/client-server-networks',
    docs: [
      { file: 'README.md', label: 'Overview' },
      { file: 'docs/00-addressing-extra-credit.md', label: 'IPv4/IPv6 Addressing' },
      { file: 'docs/week02-introducing-server-2012r2.md', label: 'Introducing Server 2012 R2' },
      { file: 'docs/week03-installing-server-2012r2.md', label: 'Installing Server 2012 R2' },
      { file: 'docs/week04-file-and-printer-services.md', label: 'File & Printer Services' },
      { file: 'docs/week05-active-directory-intro.md', label: 'Active Directory Intro' },
      { file: 'docs/week06-ch7-ous-and-ad-accounts.md', label: 'OUs & AD Accounts' },
      { file: 'docs/week07-ch8-group-policies.md', label: 'Configuring Group Policies' },
      { file: 'docs/week09-ch9-tcpip.md', label: 'Configuring TCP/IP' },
      { file: 'docs/week10-dns.md', label: 'Configuring DNS' },
      { file: 'docs/week11-dhcp.md', label: 'Configuring DHCP' },
      { file: 'docs/week12-linux-intro.md', label: 'Introduction to Linux' },
      { file: 'docs/week14-vpn-remote-access.md', label: 'Remote Access & VPN' }
    ]
  },
  {
    id: 'lan-wan-design',
    title: 'LAN/WAN Design',
    sub: 'Network design & Cisco labs',
    tag: 'coursework',
    dir: 'showcase/lan-wan-design',
    docs: [
      { file: 'README.md', label: 'Overview' },
      { file: 'docs/01-course-overview.md', label: 'Overview' },
      { file: 'docs/02-homework-assignments.md', label: 'Homework Assignments' },
      { file: 'docs/03-lab-exercises.md', label: 'Lab Exercises' },
      { file: 'docs/04-skills-summary.md', label: 'Skills & Competencies' }
    ]
  },
  {
    id: 'system-administration',
    title: 'Systems Administration',
    sub: 'Windows Server, Linux, DevOps',
    tag: 'coursework',
    dir: 'showcase/system-administration',
    docs: [
      { file: 'system-admin-I.md', label: 'Systems Admin I · Overview' },
      { file: 'system-admin-II.md', label: 'Systems Admin II · Overview' },
      { file: 'multi-distro-install-lab.md', label: 'Multi-Distro Install · Overview' },
      // { file: 'docs/linux-install-lab/01-linux-mint.md', label: 'Linux Mint' },
      // { file: 'docs/linux-install-lab/02-debian.md', label: 'Debian' },
      // { file: 'docs/linux-install-lab/03-centos.md', label: 'CentOS' },
      // { file: 'docs/linux-install-lab/04-fedora.md', label: 'Fedora' },
      // { file: 'docs/linux-install-lab/05-rhel8.md', label: 'RHEL 8' },
      // { file: 'docs/linux-install-lab/06-freebsd.md', label: 'FreeBSD' },
      // { file: 'docs/linux-install-lab/07-puppy.md', label: 'Puppy Linux' },
      // { file: 'docs/linux-install-lab/08-zorin.md', label: 'Zorin OS' },
      // { file: 'docs/linux-install-lab/09-parrot.md', label: 'Parrot OS' },
      { file: 'docs/sysadmin-I/01-active-directory.md', label: 'SysAdmin I · Active Directory' },
      { file: 'docs/sysadmin-I/02-linux-foundations.md', label: 'SysAdmin I · Linux Foundations' },
      { file: 'docs/sysadmin-I/03-storage-management.md', label: 'SysAdmin I · Storage Management' },
      { file: 'docs/sysadmin-I/04-network-services.md', label: 'SysAdmin I · Network Services' },
      { file: 'docs/sysadmin-I/05-web-and-email.md', label: 'SysAdmin I · Web & Email Servers' },
      { file: 'docs/sysadmin-II/01-infrastructure.md', label: 'SysAdmin II · Enterprise Infrastructure' },
      { file: 'docs/sysadmin-II/02-monitoring-logging.md', label: 'SysAdmin II · Monitoring & Logging' },
      { file: 'docs/sysadmin-II/03-cross-platform-integration.md', label: 'SysAdmin II · Cross-Platform Integration' },
      { file: 'docs/sysadmin-II/04-containerization.md', label: 'SysAdmin II · Containerization (Docker)' },
      { file: 'docs/sysadmin-II/05-kubernetes.md', label: 'SysAdmin II · Kubernetes Orchestration' },
      { file: 'docs/sysadmin-II/06-enterprise-mail.md', label: 'SysAdmin II · Enterprise Mail (Exchange)' },
      { file: 'docs/sysadmin-II/07-pki-security.md', label: 'SysAdmin II · PKI & Security' }
    ]
  },
  {
    id: 'task-automation',
    title: 'Task Automation',
    sub: 'Scripting with Bash & Python',
    tag: 'coursework',
    dir: 'showcase/task-automation',
    docs: [
      { file: 'README.md', label: 'Overview' },
      { file: 'docs/01-linux-command-line.md', label: 'Linux Command-Line & Data Parsing' },
      { file: 'docs/02-bash-scripting.md', label: 'Bash Scripting' },
      { file: 'docs/03-python-data-processing.md', label: 'Python Data Processing' },
      { file: 'docs/04-system-monitoring.md', label: 'System Monitoring & Visualization' },
      { file: 'docs/05-user-lifecycle-automation.md', label: 'User Lifecycle Automation' }
    ]
  },
  {
    id: 'configuration-management',
    title: 'Configuration Management',
    sub: 'DevOps, orchestration & high availability',
    tag: 'coursework',
    dir: 'showcase/configuration-management',
    docs: [
      { file: 'README.md', label: 'Overview' },
      { file: 'docs/01-package-management.md', label: 'Package Management' },
      { file: 'docs/02-service-management.md', label: 'Service Management (systemd)' },
      { file: 'docs/03-secure-remote-automation.md', label: 'Secure Remote Automation (SSH & Ansible)' },
      { file: 'docs/04-team-workflow.md', label: 'Team Workflow with Azure DevOps' },
      { file: 'docs/05-containerized-application-deployment.md', label: 'Containerized HA Deployment' }
    ]
  }
];

(function initPortfolio() {
  const pageBase = new URL('.', location.href).href;
  const sidebar = document.getElementById('portSidebar');
  const selectEl = document.getElementById('portSelect');
  const content = document.getElementById('portContent');
  const cards = document.getElementById('portCards');
  if (!sidebar || !content) return;

  const index = new Map();
  const pathOf = (p, d) => p.dir + '/' + d.file;
  PORTFOLIO.forEach(p => p.docs.forEach(d => index.set(pathOf(p, d), { project: p, doc: d })));

  const frag = document.createDocumentFragment();
  PORTFOLIO.forEach(p => {
    const group = document.createElement('div');
    group.className = 'port-group';

    const head = document.createElement('button');
    head.type = 'button';
    head.className = 'port-project';
    head.dataset.path = pathOf(p, p.docs[0]);
    const title = document.createElement('span');
    title.className = 'port-project-title';
    title.textContent = p.title;
    const sub = document.createElement('span');
    sub.className = 'port-project-sub';
    sub.textContent = p.sub;
    head.append(title, sub);

    const ul = document.createElement('ul');
    ul.className = 'port-docs';
    p.docs.forEach(d => {
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'port-doc';
      b.dataset.path = pathOf(p, d);
      b.textContent = d.label;
      li.appendChild(b);
      ul.appendChild(li);
    });

    group.append(head, ul);
    frag.appendChild(group);

    if (cards) {
      const card = document.createElement('article');
      card.className = 'port-card';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'port-card-btn';
      btn.dataset.path = pathOf(p, p.docs[0]);
      const cardTitle = document.createElement('h3');
      cardTitle.textContent = p.title;
      const cardSub = document.createElement('p');
      cardSub.textContent = p.tag;
      const cta = document.createElement('span');
      cta.className = 'port-card-cta';
      cta.textContent = 'Browse docs →';
      btn.append(cardTitle, cardSub, cta);
      card.appendChild(btn);
      cards.appendChild(card);
    }
  });
  sidebar.appendChild(frag);

  PORTFOLIO.forEach(p => p.docs.forEach(d => {
    const opt = document.createElement('option');
    opt.value = pathOf(p, d);
    opt.textContent = p.title + ' — ' + d.label;
    selectEl.appendChild(opt);
  }));

  sidebar.addEventListener('click', e => {
    const b = e.target.closest('button[data-path]');
    if (b) openDoc(b.dataset.path);
  });

  if (cards) {
    cards.addEventListener('click', e => {
      const b = e.target.closest('button[data-path]');
      if (b) openDoc(b.dataset.path);
    });
  }

  selectEl.addEventListener('change', () => {
    if (selectEl.value) openDoc(selectEl.value);
  });

  content.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (/^(#|mailto:|tel:|javascript:)/i.test(href)) return;
    const abs = new URL(a.href, location.href).href;
    if (abs.startsWith(pageBase) && /\.md$/i.test(abs)) {
      e.preventDefault();
      const rel = abs.slice(pageBase.length);
      if (index.has(rel)) openDoc(rel);
    }
  });

  async function openDoc(path) {
    const entry = index.get(path);
    if (!entry) return;
    setActive(path);
    content.classList.add('is-loading');
    try {
      let text;
      if (window.PORTFOLIO_DATA && Object.prototype.hasOwnProperty.call(window.PORTFOLIO_DATA, path)) {
        text = window.PORTFOLIO_DATA[path];
      } else {
        const res = await fetch(path);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        text = await res.text();
      }
      const html = marked.parse(text);
      const holder = document.createElement('div');
      holder.className = 'markdown-body';
      holder.innerHTML = html;
      fixPaths(holder, path);
      content.innerHTML = '';
      content.appendChild(holder);
      window.scrollTo(0, 0);
    } catch (err) {
      content.innerHTML = '<p class="port-msg">Couldn&rsquo;t load this document. If you&rsquo;re opening this page directly from your file system, run <code>python3 make_portfolio.py</code> once (to embed the docs), or serve the folder with <code>python3 -m http.server</code>.</p>';
    } finally {
      content.classList.remove('is-loading');
    }
  }

  function fixPaths(holder, path) {
    const base = new URL(path, pageBase).href;
    holder.querySelectorAll('img, a').forEach(el => {
      const attr = el.tagName === 'IMG' ? 'src' : 'href';
      const v = el.getAttribute(attr);
      if (!v || /^(#|mailto:|tel:|data:|javascript:)/i.test(v)) return;
      const resolved = new URL(v, base).href;
      if (el.tagName === 'IMG') {
        el.setAttribute('src', resolved);
        el.setAttribute('loading', 'lazy');
      } else if (!/^https?:/i.test(resolved) || resolved.startsWith(pageBase)) {
        el.setAttribute('href', resolved);
      } else {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
        el.setAttribute('href', resolved);
      }
    });
  }

  function setActive(path) {
    document.querySelectorAll('.port-project, .port-doc').forEach(b =>
      b.classList.toggle('is-active', b.dataset.path === path));
    selectEl.value = path;
  }
})();

/* ===================== Tabs ===================== */

(function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  const resumeView = document.getElementById('resumeView');
  const portfolioView = document.getElementById('portfolioView');
  const downloadBtn = document.getElementById('downloadBtn');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchView(tab.dataset.view));
  });

  function switchView(view) {
    const isResume = view === 'resume';
    tabs.forEach(t => {
      const active = t.dataset.view === view;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
    });
    resumeView.hidden = !isResume;
    portfolioView.hidden = isResume;
    downloadBtn.style.display = isResume ? '' : 'none';
    window.scrollTo(0, 0);
  }
})();