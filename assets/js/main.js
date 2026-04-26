/**
 * APG Alpenglow Tek — Main JavaScript
 * Handles: Navigation, Dropdowns, Mobile Menu, Scroll animations, FAQ, Back-to-top
 */

(function () {
  'use strict';

  /* ── Utility ── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ── Determine root path offset (for relative paths) ── */
  function getRootPath() {
    const scripts = document.getElementsByTagName('script');
    for (let s of scripts) {
      if (s.src && s.src.includes('assets/js/main.js')) {
        return s.src.split('assets/js/main.js')[0];
      }
    }
    // Fallback logic if script detection fails
    const path = window.location.pathname;
    if (path.includes('/zh/') || path.includes('/en/') || path.includes('/ja/')) {
        const parts = path.split('/');
        const lIdx = parts.findIndex(p => ['zh', 'en', 'ja'].includes(p));
        if (lIdx !== -1) return '../'.repeat(parts.length - lIdx - 1);
    }
    return './';
  }

  /* ── Render Header ── */
  function renderHeader() {
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    const root = getRootPath();
    const path = window.location.pathname;
    const lang = path.includes('/en/') ? 'en' : path.includes('/ja/') ? 'ja' : 'zh';
    const t = TRANSLATIONS[lang] || TRANSLATIONS.zh;

    // Determine current page path relative to language dir
    const pathParts = path.split('/' + lang + '/');
    const currentPage = pathParts.length > 1 ? '/' + pathParts[1] : '/index.html';

    // Contact Us page exclusion — Render simpler header
    if (path.includes('/contact/')) {
        renderContactHeader(headerEl, root, lang, t);
        return;
    }

    headerEl.innerHTML = `
<header class="site-header" id="siteHeader">
  <div class="header-inner">
    <!-- Logo -->
    <a href="${root}${lang}/index.html" class="site-logo">
      <img src="${root}assets/img/LOGO_blue.png" alt="臻至科技 Alpenglow Tek">
    </a>

    <!-- Desktop Navigation -->
    <nav class="site-nav">
      <!-- Solutions Dropdown -->
      <div class="nav-item">
        <a href="javascript:void(0);" class="nav-link">${t.solutions} <span class="chev">▾</span></a>
        <div class="dropdown dropdown-mega">
          <div class="dd-col">
            <span class="dropdown-col-title">ASIC</span>
            <span style="display:block; padding:0.6rem 0.9rem; font-size:0.85rem; color:#1a1a2e; cursor:default;">${t.anixTitle}</span>
            <a href="${root}${lang}/solutions/asic/anix/tech.html" class="dropdown-item" style="padding-left:1.4rem;font-size:.8rem">${t.anixTech}</a>
            <a href="${root}${lang}/solutions/asic/anix/apps-industrial.html" class="dropdown-item" style="padding-left:1.4rem;font-size:.8rem">${t.anixInd}</a>
            <a href="${root}${lang}/solutions/asic/anix/apps-consumer.html" class="dropdown-item" style="padding-left:1.4rem;font-size:.8rem">${t.anixCon}</a>
            <a href="${root}${lang}/solutions/asic/custom-asic.html" class="dropdown-item">${t.customAsic}</a>
          </div>
          <div class="dd-col">
            <span class="dropdown-col-title">FPGA</span>
            <a href="${root}${lang}/solutions/fpga/pqc.html" class="dropdown-item">${t.pqc}</a>
            <a href="${root}${lang}/solutions/fpga/event-camera.html" class="dropdown-item">${t.eventCamera}</a>
            <a href="${root}${lang}/solutions/fpga/rf.html" class="dropdown-item">${t.rf}</a>
            <a href="${root}${lang}/solutions/fpga/vision-audio-preprocess.html" class="dropdown-item">${t.preprocess}</a>
          </div>
        </div>
      </div>

      <!-- Company Dropdown -->
      <div class="nav-item">
        <a href="javascript:void(0);" class="nav-link">${t.company} <span class="chev">▾</span></a>
        <div class="dropdown">
          <span class="dropdown-cat">${t.about}</span>
          <a href="${root}${lang}/company/about.html" class="dropdown-item">${t.aboutUs}</a>
          <a href="${root}${lang}/company/team.html" class="dropdown-item">${t.team}</a>
          <a href="${root}${lang}/company/brand-story.html" class="dropdown-item">${t.brandStory}</a>
        </div>
      </div>

      <!-- News Dropdown -->
      <div class="nav-item">
        <a href="${root}${lang}/news/index.html" class="nav-link">${t.news} <span class="chev">▾</span></a>
        <div class="dropdown">
          <a href="${root}${lang}/news/index.html" class="dropdown-item">${t.devNews}</a>
        </div>
      </div>

    </nav>

    <!-- Language Switcher -->
    <div class="header-right">
      <div class="nav-item lang-switcher">
        <div class="lang-btn">${t.langCode} <span style="font-size:.6rem">▾</span></div>
        <div class="dropdown" style="right:0;left:auto;min-width:160px">
          <a href="${root}zh${currentPage}" class="dropdown-item${lang === 'zh' ? ' active' : ''}">🇹🇼 繁體中文</a>
          <a href="${root}en${currentPage}" class="dropdown-item${lang === 'en' ? ' active' : ''}">🇺🇸 English</a>
          <a href="${root}ja${currentPage}" class="dropdown-item${lang === 'ja' ? ' active' : ''}">🇯🇵 日本語</a>
        </div>
      </div>
    </div>

    <!-- Mobile Toggle -->
    <button class="menu-toggle" id="menuToggle" aria-label="選單">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<nav class="mobile-nav" id="mobileNav">
  ${buildMobileNavHTML(root, lang, t, currentPage)}
</nav>
    `;

    initHeader();
  }

  function renderContactHeader(el, root, lang, t) {
      // Minimal header style for Contact page
      el.innerHTML = `
<header class="site-header plain-header" id="siteHeader">
  <div class="header-inner" style="max-width: 1440px; padding: 0 3.5rem;">
    <a href="${root}${lang}/index.html" class="site-logo">
      <img src="${root}assets/img/LOGO_blue.png" alt="臻至科技 Alpenglow Tek">
    </a>
    <nav class="site-nav">
      <a href="${root}${lang}/index.html" class="nav-link" style="font-size:0.9rem">${t.home}</a>
    </nav>
    <button class="menu-toggle" id="menuToggle" aria-label="選單">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<nav class="mobile-nav" id="mobileNav">
    <a href="${root}${lang}/index.html" class="mobile-nav-link">${t.home}</a>
</nav>
      `;
      initHeader();
  }


  function buildMobileNavHTML(root, lang, t, currentPage) {
    // Generate mobile nav HTML following the new design patterns
    return `
      <a href="javascript:void(0);" class="mobile-nav-link">${t.solutions}</a>
      <div class="mobile-sub">
        <span class="mobile-sub-cat">ASIC</span>
        <a href="${root}${lang}/solutions/asic/anix/tech.html" class="mobile-sub-item">${t.anixTech}</a>
        <a href="${root}${lang}/solutions/asic/anix/apps-industrial.html" class="mobile-sub-item">${t.anixInd}</a>
        <a href="${root}${lang}/solutions/asic/anix/apps-consumer.html" class="mobile-sub-item">${t.anixCon}</a>
        <a href="${root}${lang}/solutions/asic/custom-asic.html" class="mobile-sub-item">↳ ${t.customAsic}</a>
        <span class="mobile-sub-cat">FPGA</span>
        <a href="${root}${lang}/solutions/fpga/pqc.html" class="mobile-sub-item">↳ ${t.pqc}</a>
        <a href="${root}${lang}/solutions/fpga/event-camera.html" class="mobile-sub-item">↳ ${t.eventCamera}</a>
        <a href="${root}${lang}/solutions/fpga/rf.html" class="mobile-sub-item">↳ ${t.rf}</a>
        <a href="${root}${lang}/solutions/fpga/vision-audio-preprocess.html" class="mobile-sub-item">↳ ${t.preprocess}</a>
      </div>

      <a href="javascript:void(0);" class="mobile-nav-link">${t.company}</a>
      <div class="mobile-sub">
        <a href="${root}${lang}/company/about.html" class="mobile-sub-item">↳ ${t.aboutUs}</a>
        <a href="${root}${lang}/company/team.html" class="mobile-sub-item">↳ ${t.team}</a>
        <a href="${root}${lang}/company/brand-story.html" class="mobile-sub-item">↳ ${t.brandStory}</a>
      </div>

      <a href="${root}${lang}/news/index.html" class="mobile-nav-link">${t.news}</a>
      <div class="mobile-sub">
        <a href="${root}${lang}/news/index.html" class="mobile-sub-item">↳ ${t.devNews}</a>
      </div>

      <div style="border-top:1px solid rgba(0,74,173,.1);margin-top:.75rem;padding-top:.75rem">
        <a href="${root}zh${currentPage}" class="mobile-nav-link" style="font-size:0.9rem;${lang === 'zh' ? 'color:var(--navy);font-weight:700' : ''}">🇹🇼 繁體中文</a>
        <a href="${root}en${currentPage}" class="mobile-nav-link" style="font-size:0.9rem;${lang === 'en' ? 'color:var(--navy);font-weight:700' : ''}">🇺🇸 English</a>
        <a href="${root}ja${currentPage}" class="mobile-nav-link" style="font-size:0.9rem;${lang === 'ja' ? 'color:var(--navy);font-weight:700' : ''}">🇯🇵 日本語</a>
      </div>
    `;
  }

  const TRANSLATIONS = {
    zh: { 
      solutions: '解決方案', company: '公司簡介', news: '最新消息', careers: '加入臻至', contact: '聯絡我們',
      anixTech: '↳ 技術介紹', anixInd: '↳ 工業低功耗應用', anixCon: '↳ 消費性低功耗應用',
      customAsic: '客製化 ASIC', pqc: 'PQC 密碼學', eventCamera: '事件相機', rf: 'RF 射頻', preprocess: '視覺/聽覺前處理',
      about: '關於', aboutUs: '關於我們', team: '核心成員', brandStory: '品牌故事',
      devNews: '發展動態', events: '最新活動', resources: '資源下載',
      anixTitle: 'ANIX — 超低功耗 AI 處理器',
      langCode: '🇹🇼 繁中', home: '首頁',
      footerSlogan1: '追光而行·臻至無限', footerSlogan2: 'Alpenglow Lights the Impossible.',
      contactTitle: '聯絡資訊', address: '(241454) 新北市三重區<br>重新路一段108號3樓',
      rights: '© 2026 臻至科技 Alpenglow Tek. All rights reserved.',
      privacy: '隱私權政策', terms: '服務條款'
    },
    en: { 
      solutions: 'Solutions', company: 'Company', news: 'News', careers: 'Careers', contact: 'Contact',
      anixTech: '↳ Tech Overview', anixInd: '↳ Industrial Apps', anixCon: '↳ Consumer Apps',
      customAsic: 'Custom ASIC', pqc: 'PQC Cryptography', eventCamera: 'Event Camera', rf: 'RF', preprocess: 'Vision/Audio Preprocess',
      about: 'About', aboutUs: 'About Us', team: 'Our Team', brandStory: 'Brand Story',
      devNews: 'Development Updates', events: 'Latest Events', resources: 'Resources',
      anixTitle: 'ANIX — Ultra-Low Power AI Processor',
      langCode: '🇺🇸 EN', home: 'Home',
      footerSlogan1: 'Chasing the light, reaching the infinite.', footerSlogan2: 'Alpenglow Lights the Impossible.',
      contactTitle: 'Contact Us', address: '3F, No.108, Sec. 1, Chongxin Rd.,<br>Sanchong Dist., New Taipei City 241454',
      rights: '© 2026 Alpenglow Tek. All rights reserved.',
      privacy: 'Privacy Policy', terms: 'Terms of Service'
    },
    ja: { 
      solutions: 'ソリューション', company: '会社概要', news: 'ニュース', careers: '採用情報', contact: 'お問い合わせ',
      anixTech: '↳ 技術紹介', anixInd: '↳ 産業向けアプリケーション', anixCon: '↳ コンシューマ向けアプリケーション',
      customAsic: 'カスタム ASIC', pqc: 'PQC 暗号学', eventCamera: 'イベントカメラ', rf: 'RF', preprocess: '視覚/聴覚前処理',
      about: 'アバウト', aboutUs: '私たちについて', team: 'コアメンバー', brandStory: 'ブランドストーリー',
      devNews: '発展動向', events: '最新イベント', resources: 'リソース',
      anixTitle: 'ANIX — 超低消費電力 AI プロセッサ',
      langCode: '🇯🇵 JP', home: 'ホーム',
      footerSlogan1: '光を追い、無限へと至る。', footerSlogan2: 'Alpenglow Lights the Impossible.',
      contactTitle: 'お問い合わせ', address: '(241454) 新北市三重区<br>重新路一段108号3階',
      rights: '© 2026 Alpenglow Tek. All rights reserved.',
      privacy: 'プライバシーポリシー', terms: '利用規約'
    },
  };

  /* ── Render Footer ── */
  function renderFooter() {
    const footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    const root = getRootPath();
    const path = window.location.pathname;
    const lang = path.includes('/en/') ? 'en' : path.includes('/ja/') ? 'ja' : 'zh';

    const t = TRANSLATIONS[lang] || TRANSLATIONS.zh;

    footerEl.innerHTML = `
<footer class="site-footer">
    <div class="footer-top">
        <!-- Brand -->
        <div>
            <div class="footer-brand-logo">
                <img src="${root}assets/img/LOGO_white.png" alt="Alpenglow Tek">
            </div>
            <p class="footer-brand-text">
                ${t.footerSlogan1}<br>
                ${t.footerSlogan2}
            </p>
        </div>

        <!-- Solutions -->
        <div>
            <p class="footer-col-title">${t.solutions}</p>
            <div class="footer-links">
                <a href="${root}${lang}/solutions/asic/anix/tech.html" class="footer-link">${t.anixTitle}</a>
                <a href="${root}${lang}/solutions/asic/custom-asic.html" class="footer-link">${t.customAsic}</a>
                <a href="${root}${lang}/solutions/fpga/pqc.html" class="footer-link">FPGA — ${t.pqc}</a>
                <a href="${root}${lang}/solutions/fpga/event-camera.html" class="footer-link">FPGA — ${t.eventCamera}</a>
                <a href="${root}${lang}/solutions/fpga/rf.html" class="footer-link">FPGA — ${t.rf}</a>
                <a href="${root}${lang}/solutions/fpga/vision-audio-preprocess.html" class="footer-link">FPGA — ${t.preprocess}</a>
            </div>
        </div>

        <!-- Company -->
        <div>
            <p class="footer-col-title">${t.company}</p>
            <div class="footer-links">
                <a href="${root}${lang}/company/about.html" class="footer-link">${t.aboutUs}</a>
                <a href="${root}${lang}/company/team.html" class="footer-link">${t.team}</a>
                <a href="${root}${lang}/company/brand-story.html" class="footer-link">${t.brandStory}</a>
                <a href="${root}${lang}/news/index.html" class="footer-link">${t.devNews}</a>
                <a href="${root}${lang}/resources/index.html" class="footer-link">${t.resources}</a>
                <a href="${root}${lang}/careers/index.html" class="footer-link">${t.careers}</a>
            </div>
        </div>

        <!-- Contact -->
        <div>
            <p class="footer-col-title">${t.contactTitle}</p>
            <div class="footer-contact-item">
                <span class="footer-contact-icon">📍</span>
                <span>${t.address}</span>
            </div>

            <div class="footer-contact-item">
                <span class="footer-contact-icon">✉️</span>
                <span>phyllis_huang@alpenglowtek.com</span>
            </div>
            <div class="footer-contact-item">
                <span class="footer-contact-icon">💬</span>
                <span>LINE@ @501ytnim</span>
            </div>
        </div>
    </div>

    <div style="max-width:1440px;margin:0 auto;padding:0 3.5rem">
        <div style="height:1px;background:rgba(255,255,255,.08)"></div>
    </div>
    <div class="footer-bottom">
        <p class="footer-copy">${t.rights}</p>
        <div class="footer-bottom-links">
            <a href="#">${t.privacy}</a>
            <a href="#">${t.terms}</a>
            <a href="${root}language.html">Language</a>
        </div>
    </div>
</footer>

<!-- Back to top -->
<button class="back-to-top" id="backToTop" aria-label="Top">↑</button>
    `;
  }

  function renderContactFooter(el, root, lang) {
      el.innerHTML = `
<footer class="site-footer">
  <div class="footer-bottom" style="max-width: var(--max-w); margin: 0 auto; padding: 2rem;">
    <p class="footer-copy">© 2026 臻至科技 Alpenglow Tek.</p>
    <div class="footer-bottom-links">
      <a href="${root}${lang}/index.html">Home</a>
    </div>
  </div>
</footer>
<button class="back-to-top" id="backToTop" aria-label="回到頂部">↑</button>
      `;
  }


  function initHeader() {
    const siteHeader = document.getElementById('siteHeader');
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const backToTop = document.getElementById('backToTop');

    if (siteHeader) {
      window.addEventListener('scroll', () => {
        siteHeader.classList.toggle('scrolled', window.scrollY > 10);
        if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
      }, { passive: true });
    }

    if (menuToggle && mobileNav) {
      menuToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        menuToggle.classList.toggle('open', isOpen);
      });
    }

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Handle mobile sub-menus if any (optional based on buildMobileNavHTML)
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
       link.addEventListener('click', (e) => {
          const sub = link.nextElementSibling;
          if (sub && sub.classList.contains('mobile-sub')) {
             // If you want to toggle sub-menus on mobile
             // sub.classList.toggle('open');
          }
       });
    });
  }

  /* ── Scroll Animation (Intersection Observer) ── */
  function initFadeUp() {
    const els = document.querySelectorAll('.fade-up');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
  }

  /* ── FAQ Accordion ── */
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  /* ── Particles (Canvas) ── */
  function initParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(47,232,250,${p.alpha})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
  }

  /* ── Contact Form (legacy standalone page) ── */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      btn.textContent = '已送出 ✓';
      btn.disabled = true;
      btn.style.background = '#10b981';
      setTimeout(() => { btn.textContent = '送出訊息'; btn.disabled = false; btn.style.background = ''; }, 3000);
    });
  }

  /* ── Contact Modal ── */
  const TURNSTILE_SITE_KEY = '0x4AAAAAAA_YOUR_TURNSTILE_KEY_HERE'; // ← 替換成您的 Turnstile Site Key
  const CONTACT_API_URL   = '/api/contact';                         // ← Cloudflare Worker 部署後的完整 URL

  function injectContactModal() {
    if (document.getElementById('contactModalOverlay')) return; // 已注入，略過

    const el = document.createElement('div');
    el.innerHTML = `
<div class="contact-modal-overlay" id="contactModalOverlay" role="dialog" aria-modal="true" aria-labelledby="cModalTitle">
  <div class="contact-modal" id="contactModalBox">
    <button class="contact-modal-close" id="closeContactModal" aria-label="關閉">✕</button>

    <!-- Header -->
    <div class="contact-modal-header">
      <h2 id="cModalTitle">聯絡我們</h2>
      <p>請填寫以下資料，我們將盡快與您聯繫。</p>
      <div class="contact-modal-divider"></div>
    </div>

    <!-- Success State -->
    <div class="cform-success-state" id="cformSuccess">
      <div class="cform-success-icon">✅</div>
      <h3>感謝您的聯繫！</h3>
      <p>感謝您的聯繫，我們將盡快與您聯絡。</p>
    </div>

    <!-- Form -->
    <form id="cModalForm" novalidate>

      <!-- Row 1: 姓名 + 職稱 -->
      <div class="cform-grid-2">
        <div class="cform-group">
          <label class="cform-label" for="cm_name">姓名 <span class="req">*</span></label>
          <input class="cform-input" id="cm_name" name="name" type="text" placeholder="王小明" required autocomplete="name">
        </div>
        <div class="cform-group">
          <label class="cform-label" for="cm_title">職稱 <span class="cform-opt-badge">選填</span></label>
          <input class="cform-input" id="cm_title" name="title" type="text" placeholder="工程師" autocomplete="organization-title">
        </div>
      </div>

      <!-- Row 2: 公司 + 國家 -->
      <div class="cform-grid-2">
        <div class="cform-group">
          <label class="cform-label" for="cm_company">所屬公司 <span class="req">*</span></label>
          <input class="cform-input" id="cm_company" name="company" type="text" placeholder="臻至科技" required autocomplete="organization">
        </div>
        <div class="cform-group">
          <label class="cform-label" for="cm_country">國家 <span class="req">*</span></label>
          <select class="cform-select" id="cm_country" name="country" required>
            <option value="" disabled selected>請選擇國家</option>
            <option value="TW">🇹🇼 台灣</option>
            <option value="JP">🇯🇵 日本</option>
            <option value="US">🇺🇸 美國</option>
            <option value="KR">🇰🇷 韓國</option>
            <option value="CN">🇨🇳 中國大陸</option>
            <option value="DE">🇩🇪 德國</option>
            <option value="GB">🇬🇧 英國</option>
            <option value="SG">🇸🇬 新加坡</option>
            <option value="IN">🇮🇳 印度</option>
            <option value="OTHER">🌐 其他</option>
          </select>
        </div>
      </div>

      <!-- Row 3: Email + 電話 -->
      <div class="cform-grid-2">
        <div class="cform-group">
          <label class="cform-label" for="cm_email">Email <span class="req">*</span></label>
          <input class="cform-input" id="cm_email" name="email" type="email" placeholder="example@company.com" required autocomplete="email">
        </div>
        <div class="cform-group">
          <label class="cform-label" for="cm_phone">聯絡電話 <span class="cform-opt-badge">選填</span></label>
          <input class="cform-input" id="cm_phone" name="phone" type="tel" placeholder="+886 912 345 678" autocomplete="tel">
        </div>
      </div>

      <!-- 需求類別 -->
      <div class="cform-group">
        <label class="cform-label" for="cm_category">需求 <span class="req">*</span></label>
        <select class="cform-select" id="cm_category" name="category" required>
          <option value="" disabled selected>請選擇您的需求</option>
          <option value="sales">銷售｜報價與採購</option>
          <option value="tech">技術合作</option>
          <option value="invest">投資</option>
          <option value="media">媒體與活動</option>
          <option value="other">其他</option>
        </select>
      </div>

      <!-- 訊息 -->
      <div class="cform-group">
        <label class="cform-label" for="cm_message">訊息 <span class="req">*</span></label>
        <textarea class="cform-textarea" id="cm_message" name="message" placeholder="請描述您的需求或問題..." required></textarea>
      </div>

      <!-- Turnstile CAPTCHA -->
      <div class="cform-captcha-wrap" id="cformCaptchaWrap">
        <!-- Cloudflare Turnstile widget will render here -->
      </div>

      <!-- Error / Info messages -->
      <div class="cform-message error" id="cformError">
        <span class="cform-message-icon">⚠️</span>
        <span id="cformErrorText">發生錯誤，請稍後再試。</span>
      </div>

      <!-- Submit -->
      <button type="submit" class="cform-submit" id="cformSubmitBtn">
        <div class="cform-spinner"></div>
        <span class="cform-btn-text">送出訊息</span>
      </button>
      <p class="cform-note">您的資料僅供本次聯繫使用，不會外流。</p>
    </form>
  </div>
</div>`.trim();

    document.body.appendChild(el.firstChild);
    bindContactModalEvents();
    loadTurnstile();
  }

  function loadTurnstile() {
    if (document.getElementById('cf-turnstile-script')) return;
    const s = document.createElement('script');
    s.id  = 'cf-turnstile-script';
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=_apgTurnstileReady';
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }

  // Called by Turnstile SDK when ready
  window._apgTurnstileReady = function () {
    if (!document.getElementById('cformCaptchaWrap')) return;
    if (typeof turnstile !== 'undefined') {
      window._apgTurnstileId = turnstile.render('#cformCaptchaWrap', {
        sitekey: TURNSTILE_SITE_KEY,
        callback: function (token) { window._apgCaptchaToken = token; },
        'expired-callback': function () { window._apgCaptchaToken = null; },
        'error-callback':   function () { window._apgCaptchaToken = null; },
      });
    }
  };

  function openModal() {
    const overlay = document.getElementById('contactModalOverlay');
    if (!overlay) return;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Re-render Turnstile if token already expired or widget not yet rendered
    if (typeof turnstile !== 'undefined' && window._apgTurnstileId !== undefined) {
      turnstile.reset(window._apgTurnstileId);
    } else if (typeof window._apgTurnstileReady === 'function' && typeof turnstile !== 'undefined') {
      window._apgTurnstileReady();
    }
  }

  function closeModal() {
    const overlay = document.getElementById('contactModalOverlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showCformError(msg) {
    const el = document.getElementById('cformError');
    const tx = document.getElementById('cformErrorText');
    if (tx) tx.textContent = msg;
    if (el) el.classList.add('show');
  }
  function hideCformError() {
    const el = document.getElementById('cformError');
    if (el) el.classList.remove('show');
  }

  function setLoading(on) {
    const btn = document.getElementById('cformSubmitBtn');
    if (!btn) return;
    if (on) { btn.classList.add('loading'); btn.disabled = true; }
    else     { btn.classList.remove('loading'); btn.disabled = false; }
  }

  function validateCform() {
    const required = ['cm_name','cm_company','cm_email','cm_country','cm_category','cm_message'];
    let ok = true;
    required.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove('invalid');
      if (!el.value.trim()) { el.classList.add('invalid'); ok = false; }
    });
    // Basic email check
    const emailEl = document.getElementById('cm_email');
    if (emailEl && emailEl.value && !/^[^@]+@[^@]+\.[^@]+$/.test(emailEl.value)) {
      emailEl.classList.add('invalid'); ok = false;
    }
    return ok;
  }

  function resetCform() {
    const form = document.getElementById('cModalForm');
    if (form) form.reset();
    ['cm_name','cm_company','cm_email','cm_country','cm_category','cm_message','cm_phone','cm_title'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('invalid');
    });
    hideCformError();
    if (typeof turnstile !== 'undefined' && window._apgTurnstileId !== undefined)
      turnstile.reset(window._apgTurnstileId);
    window._apgCaptchaToken = null;
  }

  function bindContactModalEvents() {
    // Close on X button
    document.getElementById('closeContactModal')?.addEventListener('click', closeModal);

    // Close on overlay click (outside dialog)
    document.getElementById('contactModalOverlay')?.addEventListener('click', function (e) {
      if (e.target === this) closeModal();
    });

    // ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    // Form submit
    document.getElementById('cModalForm')?.addEventListener('submit', async function (e) {
      e.preventDefault();
      hideCformError();

      if (!validateCform()) {
        showCformError('請填寫所有必填欄位（標有 * 號）。');
        return;
      }

      if (!window._apgCaptchaToken) {
        showCformError('請先完成驗證（Please complete the CAPTCHA）。');
        return;
      }

      setLoading(true);

      const payload = {
        name:         document.getElementById('cm_name').value.trim(),
        title:        document.getElementById('cm_title').value.trim(),
        company:      document.getElementById('cm_company').value.trim(),
        email:        document.getElementById('cm_email').value.trim(),
        phone:        document.getElementById('cm_phone').value.trim(),
        country:      document.getElementById('cm_country').value,
        category:     document.getElementById('cm_category').value,
        message:      document.getElementById('cm_message').value.trim(),
        captchaToken: window._apgCaptchaToken,
      };

      try {
        const res = await fetch(CONTACT_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));

        if (res.ok && data.ok) {
          // Success!
          document.getElementById('cModalForm').style.display = 'none';
          document.getElementById('cformSuccess').classList.add('show');
          resetCform();
          // Auto close after 4 seconds
          setTimeout(() => {
            closeModal();
            setTimeout(() => {
              const success = document.getElementById('cformSuccess');
              if (success) success.classList.remove('show');
              const form = document.getElementById('cModalForm');
              if (form) form.style.display = '';
            }, 400);
          }, 4000);
        } else if (data.error === 'captcha_failed' || res.status === 422) {
          showCformError('驗證失敗，請重新操作（CAPTCHA failed）。');
          if (typeof turnstile !== 'undefined' && window._apgTurnstileId !== undefined)
            turnstile.reset(window._apgTurnstileId);
          window._apgCaptchaToken = null;
        } else {
          showCformError('送出失敗，請稍後再試。（Server error: ' + (data.message || res.status) + '）');
        }
      } catch (err) {
        showCformError('網路錯誤，請稍後再試。');
      } finally {
        setLoading(false);
      }
    });
  }

  function initContactModal() {
    injectContactModal();
    // Also bind any static "open modal" buttons already in the page
    document.querySelectorAll('[data-open-contact-modal]').forEach(btn => {
      btn.addEventListener('click', openModal);
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    setTimeout(() => {
      initFadeUp();
      initFAQ();
      initContactForm();
      initContactModal();
      initParticles('heroCanvas');
      // Mark active nav link
      const currentPath = window.location.pathname;
      document.querySelectorAll('.nav-link, .dropdown-item').forEach(a => {
        if (a.href && currentPath.endsWith(a.getAttribute('href')?.split('?')[0])) {
          a.classList.add('active');
        }
      });
    }, 50);
  });

  // Expose for external pages
  window.apg = { initParticles, initFadeUp, openContactModal: () => openModal() };
})();
