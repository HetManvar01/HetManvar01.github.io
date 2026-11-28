/**
 * Het Manvar — Personal Portfolio
 * Creative, Engaging, Modern JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollProgress();
  initMobileMenu();
  initFeaturedCarousel();
  initTrajectoryTabs();
  initCertificateModal();
  initResumeModal();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle (Light / Dark with local persistence)
   -------------------------------------------------------------------------- */
function initTheme() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');

  const savedTheme = localStorage.getItem('het_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const activeTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(activeTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'light';
      const target = current === 'dark' ? 'light' : 'dark';
      applyTheme(target);
    });
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('het_theme', theme);

    if (toggleBtn) {
      toggleBtn.innerHTML = theme === 'dark'
        ? `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      toggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }
}

/* --------------------------------------------------------------------------
   2. Scroll Reading Progress Bar
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  const links = drawer.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   4. Featured Projects Carousel (Hiral Monpara Inspired Interactive Slider)
   -------------------------------------------------------------------------- */
function initFeaturedCarousel() {
  const slides = document.querySelectorAll('.featured-carousel-slide');
  const counterEl = document.getElementById('carousel-counter');
  const prevBtns = document.querySelectorAll('.carousel-btn-prev');
  const nextBtns = document.querySelectorAll('.carousel-btn-next');
  const tabBtns = document.querySelectorAll('.carousel-tab-btn');

  if (!slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    if (counterEl) {
      const currentFormatted = String(currentIndex + 1).padStart(2, '0');
      const totalFormatted = String(totalSlides).padStart(2, '0');
      counterEl.textContent = `${currentFormatted} / ${totalFormatted}`;
    }

    tabBtns.forEach((tab, i) => {
      tab.classList.toggle('active', i === currentIndex);
    });
  }

  prevBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    });
  });

  nextBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    });
  });

  tabBtns.forEach((tab, i) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(i);
    });
  });

  // Initialize first slide
  goToSlide(0);
}

/* --------------------------------------------------------------------------
   5. Segmented Trajectory Tabs (Experience, Certifications, Education)
   -------------------------------------------------------------------------- */
function initTrajectoryTabs() {
  const tabBtns = document.querySelectorAll('.trajectory-tab-btn');
  const panels = document.querySelectorAll('.trajectory-panel');

  if (!tabBtns.length || !panels.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-panel');

      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Certificate & Credential Modal Viewer (With Real Verified Image Support)
   -------------------------------------------------------------------------- */
const certificateDatabase = {
  algovista: {
    title: "Summer Internship Company Certificate",
    issuer: "Algovista Analytics (Insight · Foresight · Growth) · Ahmedabad",
    date: "4th May to 31st July 2026",
    credentialId: "ALGO-SIP-2026-HM",
    image: "./assets/certs/cert-algovista.jpg",
    description: "Officially certified that Het Manvar, student of Narayana Business School (PGDM Data Science & Analytics), successfully completed his summer internship under the guidance of Avadh Shah, Founder. Demonstrated high-level technical proficiency in data analysis, data visualization, dashboard development, and deriving business insights.",
    modules: [
      "Technical Proficiency in Data Analysis & Data Visualization",
      "Executive Dashboard Development & Insight Generation",
      "SIP Duration: 4th May to 31st July 2026",
      "Guidance & Certification by Founder Avadh Shah",
      "Issued & Signed on 3rd August 2026"
    ]
  },
  cadila: {
    title: "Industrial Training Internship Certificate",
    issuer: "Cadila Pharmaceuticals Limited (Chemicals SBU) · Ankleshwar, Gujarat",
    date: "13th May 2024 to 22nd June 2024",
    credentialId: "CADILA-ANKLESHWAR-2024-HM",
    image: "./assets/certs/cert-cadila.jpg",
    description: "Officially certified that Mr. Het Manvar, Student of BBA - Finance, completed his industrial training at Cadila Pharmaceuticals Ltd., Ankleshwar from 13th May 2024 to 22nd June 2024. Verified and sealed by Human Resources.",
    modules: [
      "Industrial Training & Corporate Analytics",
      "Duration: 13th May 2024 to 22nd June 2024",
      "Plot No. 294, G.I.D.C. Estate, Ankleshwar, Gujarat",
      "Authorized HR Signature & Official Company Seal"
    ]
  },
  "merit-rank": {
    title: "Certificate of Achievement — 3rd University Merit Rank",
    issuer: "Indukaka Ipcowala Institute of Management, CHARUSAT University (NAAC A+)",
    date: "Academic Year 2024 – 2025",
    credentialId: "CHARUSAT-BBA-BA-22BBAB023",
    image: "./assets/certs/cert-charusat-merit.jpg",
    description: "Awarded to MANVAR HET PANKAJBHAI (ID No. 22BBAB023) for securing 3rd Rank in the 3rd year of the BBA (Business Analytics) programme across the entire university, recognized and signed by Principal & Dean Dr. Reshma Sable.",
    modules: [
      "3rd Rank in University Examination Across BBA-BA",
      "Overall Academic Distinction: 84.3%",
      "Specialized Business Analytics Curriculum",
      "Signed & Verified by Dr. Reshma Sable, Principal IIIM"
    ]
  },
  "python-cert": {
    title: "Basics of Python Certification",
    issuer: "UniAthena in partnership with Cambridge International Qualifications, UK",
    date: "28, June 2025",
    credentialId: "Blockchain ID: 3172-7269-4603",
    image: "./assets/certs/cert-python.png",
    description: "Successfully completed Basics of Python. Course developed and delivered by UniAthena in partnership with Cambridge International Qualifications (UK), validated by Responsible Officer Huw Flynn Hughes.",
    modules: [
      "Python Language Syntax, Variables & Analytical Data Types",
      "Structured Conditionals, Iterators & Custom Functions",
      "Data Manipulation Structures (Lists, Dictionaries, Tuples)",
      "Algorithm Logic & Foundations for Data Analytics"
    ]
  },
  "ml-cert": {
    title: "Basics in Machine Learning Certification",
    issuer: "UniAthena in partnership with Cambridge International Qualifications, UK",
    date: "28, June 2025",
    credentialId: "Blockchain ID: 5458-5481-2766",
    image: "./assets/certs/cert-ml.png",
    description: "Successfully completed Basics in Machine Learning. Course developed and delivered by UniAthena in partnership with Cambridge International Qualifications (UK), validated by Responsible Officer Huw Flynn Hughes.",
    modules: [
      "Supervised vs Unsupervised Machine Learning Frameworks",
      "Regression Models, Classification & Clustering Paradigms",
      "Pattern Recognition & Feature Engineering Principles",
      "Predictive Evaluation Metrics & Validation Workflows"
    ]
  },
  "powerbi-cert": {
    title: "Certificate of Completion — Introduction To Power BI",
    issuer: "LearnTube.ai in association with Smart Cube",
    date: "26/06/2025",
    credentialId: "INT-M-2-2338-1055693",
    image: "./assets/certs/cert-powerbi.png",
    description: "Presented to Manvar Het Pankajbhai in association with Anuroop Pratap (Assistant Manager - Advanced Analytics at Smart Cube) and LearnTube Co-Founders Shronit Ladhani & Gargi Ruparelia for mastering Power BI.",
    modules: [
      "End-to-End Power BI Dashboard Engineering",
      "Power Query ETL & Data Modeling",
      "DAX Measures, Calculated Columns & Relational Schemas",
      "Business Intelligence Visualization & Storytelling"
    ]
  },
  "chatgpt-cert": {
    title: "Master ChatGPT Certification",
    issuer: "UniAthena (Athena Global Education)",
    date: "29, June 2025",
    credentialId: "Blockchain ID: 2827-8857-1715",
    image: "./assets/certs/cert-chatgpt.png",
    description: "Successfully completed Master ChatGPT, certified by Academic Director Col (Rtd) Anil Ahluwalia. Blockchain verified certificate under the Federation for European Education (FEDE).",
    modules: [
      "Advanced Prompt Engineering & Chain-of-Thought Workflows",
      "AI-Assisted Business Analysis & Research Automation",
      "Task Optimization Using Generative AI Models",
      "Analytical Problem-Solving with LLM Tooling"
    ]
  }
};

function initCertificateModal() {
  const modalBackdrop = document.getElementById('cert-modal');
  const closeBtn = document.getElementById('cert-modal-close');
  if (!modalBackdrop) return;

  const docTitle = document.getElementById('cert-modal-title');
  const docIssuer = document.getElementById('cert-modal-issuer');
  const docDesc = document.getElementById('cert-modal-desc');
  const docModules = document.getElementById('cert-modal-modules');
  const docId = document.getElementById('cert-modal-id');
  const docDate = document.getElementById('cert-modal-date');
  const docImgWrap = document.getElementById('cert-modal-img-wrap');
  const docImg = document.getElementById('cert-modal-img');

  const triggers = document.querySelectorAll('[data-cert]');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const certId = trigger.getAttribute('data-cert');
      const certData = certificateDatabase[certId];
      if (!certData) return;

      docTitle.textContent = certData.title;
      docIssuer.textContent = certData.issuer;
      docDesc.textContent = certData.description;
      docId.textContent = `Credential: ${certData.credentialId}`;
      docDate.textContent = `Issued: ${certData.date}`;

      // Handle real certificate photo/image
      if (certData.image && docImg && docImgWrap) {
        docImg.src = certData.image;
        docImg.alt = `${certData.title} Document`;
        docImgWrap.style.display = 'flex';
      } else if (docImgWrap) {
        docImgWrap.style.display = 'none';
      }

      docModules.innerHTML = '';
      certData.modules.forEach(mod => {
        const li = document.createElement('li');
        li.textContent = mod;
        docModules.appendChild(li);
      });

      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeCertModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeCertModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeCertModal();
    }
  });

  function closeCertModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* --------------------------------------------------------------------------
   7. Contact Form Direct Mailto
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim() || 'Data Analyst Opportunity Inquiry';
    const message = document.getElementById('message').value.trim();

    const body = `Hi Het,\n\nMy name is ${name} (${email}).\n\n${message}`;
    const mailto = `mailto:het.pgdmds25@nbs.edu.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  });
}

/**
 * Switch Insights Card Tab (SQL <-> Python)
 */
function switchInsightTab(tab) {
  const sqlBtn = document.getElementById('btn-tab-sql');
  const pyBtn = document.getElementById('btn-tab-py');
  const sqlCode = document.getElementById('insight-code-sql');
  const pyCode = document.getElementById('insight-code-py');
  if (!sqlBtn || !pyBtn || !sqlCode || !pyCode) return;

  if (tab === 'py') {
    sqlBtn.classList.remove('active');
    pyBtn.classList.add('active');
    sqlCode.style.display = 'none';
    pyCode.style.display = 'block';
  } else {
    pyBtn.classList.remove('active');
    sqlBtn.classList.add('active');
    pyCode.style.display = 'none';
    sqlCode.style.display = 'block';
  }
}
window.switchInsightTab = switchInsightTab;

/* --------------------------------------------------------------------------
   8. Resume / CV Interactive Modal
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const closeBtn = document.getElementById('resume-modal-close');
  const printBtn = document.getElementById('print-resume-btn');

  if (!modal) return;

  function openResume() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.remove('open');
  }

  function closeResume() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Resume buttons (Nav, Hero, Drawer) now directly link to ./assets/Het_Manvar_Resume.pdf
  // Allowing direct PDF opening in a new tab without preventing default!
  const webCvTriggers = document.querySelectorAll('.open-web-cv-btn');
  webCvTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openResume();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeResume);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeResume();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeResume();
    }
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

