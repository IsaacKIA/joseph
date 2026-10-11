/**
 * THE AYITEVI INTERFACE — CORE JAVASCRIPT ENGINE
 * Architected for Performance, Precision and Zero Dependency Bloat
 */

(function () {
  'use strict';

  // 1. WhatsApp Global Utility
  const WHATSAPP_NUM = '233247760892';
  
  function encodeWhatsAppUrl(text) {
    return 'https://wa.me/' + WHATSAPP_NUM + '?text=' + encodeURIComponent(text);
  }

  window.AyiteviWA = {
    number: WHATSAPP_NUM,
    buildUrl: encodeWhatsAppUrl,
    open: function (text) {
      window.open(encodeWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
    }
  };

  // Bind all [data-wa] links across the DOM
  function initWhatsAppLinks() {
    document.querySelectorAll('[data-wa]').forEach(function (el) {
      const msg = el.getAttribute('data-wa');
      if (msg) {
        el.href = encodeWhatsAppUrl(msg);
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
      }
    });
  }

  // 2. Mobile Navigation Drawer Controller
  function initMobileMenu() {
    const toggleBtn = document.querySelector('.menu-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');
    if (!toggleBtn || !drawer) return;

    function toggleMenu(isOpen) {
      const expanded = typeof isOpen === 'boolean' ? isOpen : toggleBtn.getAttribute('aria-expanded') !== 'true';
      toggleBtn.setAttribute('aria-expanded', expanded);
      drawer.classList.toggle('open', expanded);
      document.body.style.overflow = expanded ? 'hidden' : '';
    }

    toggleBtn.addEventListener('click', function () {
      toggleMenu();
    });

    // Close when clicking internal links
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggleMenu(false);
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
        toggleMenu(false);
      }
    });
  }

  // 3. Reading Progress Indicator for Articles
  function initReadingProgress() {
    const progressBar = document.querySelector('.reading-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', function () {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    }, { passive: true });
  }

  // 4. Subtle Cursor-Responsive Hero Constellation Canvas (Moment 1)
  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 38;
    const maxDistance = 140;

    let mouse = { x: -1000, y: -1000 };

    function resize() {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', function (e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', function () {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    function Particle() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.radius = Math.random() * 1.5 + 1;
    }

    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Gentle mouse interaction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        this.x -= (dx / dist) * force * 0.6;
        this.y -= (dy / dist) * force * 0.6;
      }
    };

    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(184, 153, 90, 0.45)';
      ctx.fill();
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId;
    function render() {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connective filaments
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(184, 153, 90, ' + alpha + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationId = requestAnimationFrame(render);
    }

    render();
  }

  // 5. Strategic Intersection Interactive Engine (Moment 2)
  const DOMAINS_DATA = [
    {
      id: 'ai-digital',
      num: '01',
      title: 'AI & Digital Transformation',
      subtitle: 'Applied Machine Learning Tailored to African Markets',
      image: '/assets/award_most_respected_ceo_ai_stage.jpg',
      imageCaption: 'Ghana CEO Awards 2024 · Most Respected CEO in AI & ML Presentation',
      metrics: [
        { val: '2 Honors', label: 'AI Excellence 2024' },
        { val: 'UT Austin', label: 'AI/ML Credential' },
        { val: 'Enterprise', label: 'Odoo ERP Integration' }
      ],
      thesis: 'Artificial intelligence creates defensible commercial value when engineered for regional realities: localized datasets, low-bandwidth infrastructure, and strict algorithmic accountability.',
      experience: [
        'CEO & Founder, Cognitive AI Technologies Ltd (2024–present)',
        'Postgraduate Degree in AI & Machine Learning, McCombs School of Business, UT Austin / Great Learning',
        'Generative AI for NLP Specialization, Great Learning',
        'Odoo ERP integration and AI compliance dashboards at AFA-EF Mining Ltd',
        'African AI Excellence Award & Most Respected CEO in AI & ML (2024)'
      ],
      applications: [
        'Predictive crop-yield forecasting & agritech analytics',
        'Financial technology risk underwriting & data lineage',
        'Institutional educational technology (Citi FM / MEST Africa speaker)'
      ],
      connections: [
        'Mining & Trade (traceability & compliance ERP)',
        'Agriculture (yield forecasting & soil analytics)'
      ],
      partners: 'Technology firms, financial institutions, educational entities',
      inquiryCategory: 'AI or digital transformation',
      connectedNodeIndices: [1, 4]
    },
    {
      id: 'mining-gold',
      num: '02',
      title: 'Mining, Gold & International Trade',
      subtitle: 'Regulatory Formalization, Doré Offtake & Supply Traceability',
      image: '/assets/handshake_sammy_gyamfi_gold_board.jpg',
      imageCaption: 'Regulatory Protocol · Ghana Gold Board Alignment & Bilateral Doré Trade',
      metrics: [
        { val: '17 Apr 2026', label: 'Toronto Agreements' },
        { val: '100%', label: 'Traceability Audit' },
        { val: 'Bank of GH', label: 'FX & Export Compliance' }
      ],
      thesis: 'In commodity markets, long-term commercial value depends strictly on verifiable compliance, rigorous assay protocols, and institutional buyer integrity rather than speculative trading.',
      experience: [
        'Managing Director, AFA-EF Mining Ltd (2025–present)',
        'Formalized gold buying and export under Ghana Gold Board & Bank of Ghana frameworks',
        'Execution of Strategic Partnership and Doré Sale & Purchase Agreements with The Bullion Mart Corporation (Toronto, 17 April 2026)',
        'Equipment Pool Model small-scale mining coordination'
      ],
      applications: [
        'Formalized Au Doré aggregation & assay verification',
        'North American and European export route compliance',
        'Digitized supply chain custody from aggregation to vaulting'
      ],
      connections: [
        'AI & Digital (ERP supply-chain tracking)',
        'Investment Partnerships (PARET Mining delegation, Bullion Mart)'
      ],
      partners: 'Refineries, bullion houses, institutional mining partners',
      inquiryCategory: 'Mining, gold trade or commodities',
      connectedNodeIndices: [0, 2]
    },
    {
      id: 'investment-partnerships',
      num: '03',
      title: 'International Business & Investment',
      subtitle: 'Connecting Global Sovereign and Private Capital to Ghana',
      image: '/assets/rep_joe_wilson_presenting_goodwill_gift.jpg',
      imageCaption: 'U.S. Capitol Room 1436 · Bilateral Mission & Official Goodwill Presentation',
      metrics: [
        { val: 'IMF & WB', label: 'Spring Meetings 2025' },
        { val: 'U.S. Capitol', label: 'Congressional Briefing' },
        { val: 'TICAD9', label: 'Analytical Review' }
      ],
      thesis: 'Cross-border partnerships stall when due diligence fails. Connecting global capital with West African opportunities requires local operating counterparts with legal literacy and execution discipline.',
      experience: [
        'MSc in International Business with Law, University of Salford (UK)',
        'Washington D.C. bilateral engagements during World Bank & IMF Spring Meetings (April 2025)',
        'Coordinated PARET Mining LLC inbound delegation to Ghana (June–July 2025)',
        'Author of strategic analytical review on TICAD9 Japan–Ghana bilateral outcomes (August 2025)'
      ],
      applications: [
        'Direct investment structuring and institutional market entry',
        'Public-Private Partnership (PPP) alignment with state leadership',
        'Due diligence and physical site assay validation'
      ],
      connections: [
        'Mining & Trade (Bullion Mart & PARET engagements)',
        'Governance & Policy (Bilateral state & Congressional briefings)'
      ],
      partners: 'Institutional funds, private family offices, multilateral trade bodies',
      inquiryCategory: 'International investment or business partnership',
      connectedNodeIndices: [1, 5]
    },
    {
      id: 'energy-health',
      num: '04',
      title: 'Energy & Healthcare Infrastructure',
      subtitle: 'Decentralized Clean Power and Hospital Medical Oxygen Plants',
      image: '/assets/boardroom_delegation_ghana_flag.jpg',
      imageCaption: 'Institutional Council · Clinical Oxygen Generation & Clean Microgrid Power',
      metrics: [
        { val: 'PSA', label: 'Medical Oxygen Plants' },
        { val: '2017–Pres', label: 'PROFOH Ghana Governance' },
        { val: 'Clean Tech', label: 'Decentralized Solar' }
      ],
      thesis: 'Reliable healthcare delivery and sustainable power are prerequisite foundations for economic productivity. On-site oxygen generation eliminates fragile cross-border supply chains.',
      experience: [
        'CEO, Sunbio2 Ghana Limited (2021–present)',
        'Country Director, PROFOH Ghana / Professionals For Humanity (2017–present)',
        'Implementation of Pressure Swing Adsorption (PSA) medical oxygen generation systems',
        'Regulatory alignment with national health authorities and device standards'
      ],
      applications: [
        'On-site clinical oxygen generation for district and regional hospitals',
        'Decentralized solar microgrid integration for critical wards',
        'Multi-stakeholder community health programs with international donors'
      ],
      connections: [
        'Governance & Policy (MOH, NGO, and donor alignment)'
      ],
      partners: 'Hospital networks, development finance institutions, health ministries',
      inquiryCategory: 'International organisation or development partnership',
      connectedNodeIndices: [5]
    },
    {
      id: 'agriculture-food',
      num: '05',
      title: 'Agriculture & Sustainable Systems',
      subtitle: 'Commercial Organic Cultivation and AgriTech Data Systems',
      image: '/assets/gala_dinner_candid_thoughtful.jpg',
      imageCaption: 'Accra Agribusiness Consultation · Organic Production & Predictive Modeling',
      metrics: [
        { val: '10+ Yrs', label: 'Sankofa Farms Leadership' },
        { val: 'CAG', label: 'Agri Database System' },
        { val: 'Predictive', label: 'Yield Modeling AI' }
      ],
      thesis: 'Agricultural productivity improves when practical farming experience is combined with empirical soil stewardship, database infrastructure, and predictive weather intelligence.',
      experience: [
        'CEO, Sankofa International Organic Farms (2014–present)',
        'Architected inaugural operational database for Chamber of Agribusiness Ghana (CAG)',
        'Machine learning yield-prediction models at Cognitive AI Technologies Ltd'
      ],
      applications: [
        'Certified organic crop production and export readiness',
        'Agribusiness database modeling and supply-chain logistics',
        'Soil fertility optimization and localized predictive algorithms'
      ],
      connections: [
        'AI & Digital (predictive yield modeling and soil sensors)'
      ],
      partners: 'Agribusiness conglomerates, export aggregators, agri-fintech providers',
      inquiryCategory: 'Other strategic opportunity',
      connectedNodeIndices: [0]
    },
    {
      id: 'governance-strategy',
      num: '06',
      title: 'Governance, Advisory & Policy',
      subtitle: 'Independent Fiduciary Oversight and Multilateral Coordination',
      image: '/assets/boardroom_roundtable_meeting.jpg',
      imageCaption: 'Executive Boardroom Roundtable · Multi-Stakeholder Fiduciary Stewardship',
      metrics: [
        { val: 'MSc Law', label: 'Salford University UK' },
        { val: 'Chairman', label: 'Silvercrown Board' },
        { val: 'Public MOH', label: 'Institutional Trust' }
      ],
      thesis: 'Sound corporate governance and institutional trust determine whether strategic partnerships survive economic and political cycles. Fiduciary discipline is non-negotiable.',
      experience: [
        'MSc International Business with Law, University of Salford (UK)',
        'Board Chairman, Silvercrown Commercial Limited',
        'Country Director, PROFOH Ghana (governance across NGOs and public health)',
        'Executive speaker on technology policy and education (Edtech Monday, Citi FM)'
      ],
      applications: [
        'Corporate board oversight on technology and international trade',
        'Emerging AI governance, liability frameworks and ethics oversight',
        'Cross-sector alignment between private operators and state regulators'
      ],
      connections: [
        'Investment (sovereign risk and compliance structuring)',
        'Energy & Health (public institutional alignment)'
      ],
      partners: 'Corporate boards, advisory councils, public institutions',
      inquiryCategory: 'Board or governance opportunity',
      connectedNodeIndices: [2, 3]
    }
  ];

  function initStrategicIntersection() {
    const orbitContainer = document.getElementById('constellationWrapper');
    const dossierPanel = document.getElementById('intersectionDossier');
    const svgLines = document.querySelectorAll('.constellation-svg line');
    const accordionContainer = document.getElementById('mobileIntersectionAccordion');

    if (!orbitContainer && !accordionContainer) return;

    // Node Positions around circumference: 6 points (50%, 50% origin, radius ~ 38%)
    // Coordinates: [ [50, 10], [84, 28], [84, 72], [50, 90], [16, 72], [16, 28] ]
    const coords = [
      { x: 50, y: 10 },
      { x: 84, y: 28 },
      { x: 84, y: 72 },
      { x: 50, y: 90 },
      { x: 16, y: 72 },
      { x: 16, y: 28 }
    ];

    function renderDossier(index) {
      const data = DOMAINS_DATA[index];
      if (!dossierPanel) return;

      dossierPanel.style.opacity = '0';
      dossierPanel.style.transform = 'translateY(6px)';

      setTimeout(function () {
        dossierPanel.innerHTML = `
          <div class="sector-num">Domain ${data.num} of 06 · ${data.subtitle}</div>
          <h3>${data.title}</h3>
          
          <div class="dossier-photo-hero">
            <img src="${data.image}" alt="${data.title}" loading="lazy">
            <div class="dossier-photo-caption">${data.imageCaption}</div>
          </div>

          <div class="dossier-metrics-grid">
            ${data.metrics.map(m => `
              <div class="dossier-metric-chip">
                <span class="dossier-metric-val">${m.val}</span>
                <span class="dossier-metric-label">${m.label}</span>
              </div>
            `).join('')}
          </div>

          <p class="sector-thesis">${data.thesis}</p>
          
          <div class="dossier-block">
            <h4>Documented Executive Experience</h4>
            <ul>
              ${data.experience.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <div class="dossier-block">
            <h4>Concrete Operational Applications</h4>
            <ul>
              ${data.applications.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <div class="dossier-block">
            <h4>Documented Sector Intersections</h4>
            <p>${data.connections.join(' · ')}</p>
          </div>

          <div class="dossier-action-footer">
            <span class="muted" style="font-size: 0.8125rem;">Relevant to: ${data.partners}</span>
            <a class="btn btn-em btn-sm" href="/desk/#deskForm" data-set-cat="${data.inquiryCategory}">
              Discuss This Domain
              <svg viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        `;

        dossierPanel.style.opacity = '1';
        dossierPanel.style.transform = 'translateY(0)';
      }, 140);

      // Highlight active node button
      if (orbitContainer) {
        orbitContainer.querySelectorAll('.constellation-node-btn').forEach(function (btn, idx) {
          btn.setAttribute('aria-selected', idx === index ? 'true' : 'false');
        });
      }

      // Highlight legitimate connecting lines in SVG
      if (svgLines.length > 0) {
        svgLines.forEach(function (line) {
          const from = parseInt(line.getAttribute('data-from'), 10);
          const to = parseInt(line.getAttribute('data-to'), 10);
          const isConnected = (from === index && data.connectedNodeIndices.includes(to)) ||
                              (to === index && data.connectedNodeIndices.includes(from));
          line.classList.toggle('active-connection', isConnected);
        });
      }
    }

    // Initialize Desktop Buttons if present
    if (orbitContainer) {
      orbitContainer.querySelectorAll('.constellation-node-btn').forEach(function (btn, index) {
        btn.addEventListener('click', function () {
          renderDossier(index);
        });
        btn.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            renderDossier(index);
          }
        });
      });
      // Initial render on domain 0
      renderDossier(0);
    }

    // Initialize Mobile Accordion
    if (accordionContainer) {
      accordionContainer.innerHTML = DOMAINS_DATA.map(function (d, idx) {
        return `
          <div class="accordion-item" id="accordion-${d.id}">
            <button type="button" class="accordion-trigger" aria-expanded="${idx === 0 ? 'true' : 'false'}" aria-controls="panel-${d.id}">
              <span><b style="color:var(--gold);margin-right:8px;">${d.num}.</b> ${d.title}</span>
              <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="accordion-panel ${idx === 0 ? '' : 'hidden'}" id="panel-${d.id}" role="region">
              <div class="dossier-photo-hero" style="height:170px;">
                <img src="${d.image}" alt="${d.title}" loading="lazy">
                <div class="dossier-photo-caption">${d.imageCaption}</div>
              </div>
              <div class="dossier-metrics-grid" style="grid-template-columns:repeat(3, 1fr);margin-bottom:16px;">
                ${d.metrics.map(m => `
                  <div class="dossier-metric-chip" style="padding:8px 6px;">
                    <span class="dossier-metric-val" style="font-size:0.95rem;">${m.val}</span>
                    <span class="dossier-metric-label" style="font-size:0.62rem;">${m.label}</span>
                  </div>
                `).join('')}
              </div>
              <p class="sector-thesis" style="font-size:0.95rem;margin-bottom:18px;">${d.thesis}</p>
              
              <div class="dossier-block">
                <h4>Documented Experience</h4>
                <ul>${d.experience.map(x => `<li>${x}</li>`).join('')}</ul>
              </div>

              <div class="dossier-block">
                <h4>Applications</h4>
                <ul>${d.applications.map(x => `<li>${x}</li>`).join('')}</ul>
              </div>

              <div class="dossier-block">
                <h4>Intersections</h4>
                <p>${d.connections.join(' · ')}</p>
              </div>

              <div style="margin-top:20px;">
                <a class="btn btn-em btn-sm" href="/desk/#deskForm" data-set-cat="${d.inquiryCategory}">Discuss This Domain</a>
              </div>
            </div>
          </div>
        `;
      }).join('');

      accordionContainer.querySelectorAll('.accordion-trigger').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const isExpanded = btn.getAttribute('aria-expanded') === 'true';
          const panel = btn.nextElementSibling;
          
          btn.setAttribute('aria-expanded', !isExpanded);
          panel.classList.toggle('hidden', isExpanded);
        });
      });
    }
  }

  // 6. Opportunity Desk Progressive Disclosure & WhatsApp Logic
  function initOpportunityDesk() {
    const form = document.getElementById('opportunityForm');
    if (!form) return;

    const catSelect = document.getElementById('opportunityCategory');
    const extraWrapper = document.getElementById('categoryExtraWrapper');
    const extraLabel = document.getElementById('categoryExtraLabel');
    const extraInput = document.getElementById('categoryExtraInput');
    const summaryBox = document.getElementById('opportunitySummary');
    const preformattedMsg = document.getElementById('summaryPreformatted');
    const continueWhatsAppBtn = document.getElementById('continueWhatsAppBtn');
    const copyMessageBtn = document.getElementById('copyMessageBtn');
    const emailFallbackBtn = document.getElementById('emailFallbackBtn');

    // Dynamic Extra Field Prompts mapped to Category
    const CATEGORY_PROMPTS = {
      'Board or governance opportunity': 'Type of board, advisory council or governance body <i>(optional)</i>',
      'Mining, gold trade or commodities': 'Commodity specification & approximate volume / scale <i>(optional)</i>',
      'AI or digital transformation': 'Enterprise sector or intended technological use case <i>(optional)</i>',
      'International investment or business partnership': 'Sector and current stage of discussions <i>(optional)</i>',
      'Speaking or institutional engagement': 'Event title, organizer, and target date <i>(optional)</i>'
    };

    function updateCategoryExtra() {
      const selectedVal = catSelect.value;
      const promptText = CATEGORY_PROMPTS[selectedVal];

      if (promptText) {
        extraWrapper.classList.remove('hidden');
        extraLabel.innerHTML = promptText;
      } else {
        extraWrapper.classList.add('hidden');
        extraInput.value = '';
      }
    }

    catSelect.addEventListener('change', updateCategoryExtra);

    // Support pre-selecting category via query string or click triggers
    const urlParams = new URLSearchParams(window.location.search);
    const preCat = urlParams.get('cat');
    if (preCat && catSelect) {
      catSelect.value = preCat;
      updateCategoryExtra();
    }

    // Global listener for [data-set-cat] shortcuts
    document.addEventListener('click', function (e) {
      const trigger = e.target.closest('[data-set-cat]');
      if (trigger) {
        const catValue = trigger.getAttribute('data-set-cat');
        if (catSelect) {
          catSelect.value = catValue;
          updateCategoryExtra();
        }
      }
    });

    // Toast helper
    function showToast(message) {
      const existingToast = document.querySelector('.toast-msg');
      if (existingToast) existingToast.remove();

      const toast = document.createElement('div');
      toast.className = 'toast-msg';
      toast.setAttribute('role', 'status');
      toast.textContent = message;
      document.body.appendChild(toast);

      setTimeout(function () {
        toast.remove();
      }, 2600);
    }

    // Build plain-text structured message
    function compileMessage() {
      const getVal = id => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };

      const lines = [
        'Hello Joseph, I visited your website and would like to explore a strategic opportunity.',
        '',
        'Type of Opportunity: ' + getVal('opportunityCategory'),
        'Full Name: ' + getVal('senderName')
      ];

      if (getVal('senderOrg')) {
        lines.push('Organisation: ' + getVal('senderOrg'));
      }

      lines.push('Professional Email: ' + getVal('senderEmail'));

      if (getVal('senderCountry')) {
        lines.push('Country / Market: ' + getVal('senderCountry'));
      }

      if (getVal('categoryExtraInput') && !extraWrapper.classList.contains('hidden')) {
        const cleanLabel = extraLabel.textContent.replace(' (optional)', '').trim();
        lines.push(cleanLabel + ': ' + getVal('categoryExtraInput'));
      }

      lines.push('');
      lines.push('About the Opportunity:');
      lines.push(getVal('opportunityDescription'));

      if (getVal('requestedTime')) {
        lines.push('');
        lines.push('Requested Consultation Time (Africa/Accra, not confirmed): ' + getVal('requestedTime').replace('T', ' '));
      }

      return lines.join('\n');
    }

    // Validation handler
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      function checkField(id, isInvalid, errorMsg) {
        const errEl = document.getElementById('err-' + id);
        if (errEl) {
          errEl.textContent = isInvalid ? errorMsg : '';
        }
        if (isInvalid) isValid = false;
      }

      const getVal = id => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };

      checkField('opportunityCategory', !getVal('opportunityCategory'), 'Please select a type of opportunity.');
      checkField('senderName', !getVal('senderName'), 'Please provide your full name.');
      checkField(
        'senderEmail',
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(getVal('senderEmail')),
        'Please enter a valid professional email address.'
      );
      checkField('opportunityDescription', !getVal('opportunityDescription'), 'Please include a brief overview of the opportunity.');

      if (!isValid) {
        const firstError = form.querySelector('.field-error-msg:not(:empty)');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      const formattedMessage = compileMessage();
      preformattedMsg.textContent = formattedMessage;
      continueWhatsAppBtn.href = encodeWhatsAppUrl(formattedMessage);

      // Email mailto fallback with placeholder
      if (emailFallbackBtn) {
        const emailAddress = 'josephfabian48@gmail.com';
        const mailtoSubject = encodeURIComponent('Opportunity Inquiry: ' + getVal('opportunityCategory'));
        const mailtoBody = encodeURIComponent(formattedMessage);
        emailFallbackBtn.href = 'mailto:' + emailAddress + '?subject=' + mailtoSubject + '&body=' + mailtoBody;
      }

      summaryBox.classList.remove('hidden');
      summaryBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
      summaryBox.focus();
    });

    // Copy to clipboard fallback
    if (copyMessageBtn) {
      copyMessageBtn.addEventListener('click', async function () {
        const messageText = preformattedMsg.textContent;
        try {
          await navigator.clipboard.writeText(messageText);
          showToast('Structured message copied to clipboard');
        } catch (_) {
          const range = document.createRange();
          range.selectNodeContents(preformattedMsg);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          showToast('Text selected — press Ctrl+C / Cmd+C to copy');
        }
      });
    }
  }

  // 7. Scroll Reveal & Cinematic Entry Animations
  function initScrollReveals() {
    if (!('IntersectionObserver' in window)) return;

    const revealTargets = document.querySelectorAll(
      '.proof-card, .timeline-event-card, .iconic-role-card, .iconic-contact-card, .insight-card-photographic, .insights-featured-card, .iconic-grid-2 > *, .iconic-grid-3 > *, .iconic-grid-4 > *, .reveal-init'
    );

    revealTargets.forEach(function (el, index) {
      if (!el.classList.contains('reveal-init')) {
        el.classList.add('reveal-init');
        // Add subtle stagger to consecutive sibling cards
        const staggerIndex = (index % 4) + 1;
        el.classList.add('stagger-' + staggerIndex);
      }
    });

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  // 8. Initialize Everything on DOM Ready
  document.addEventListener('DOMContentLoaded', function () {
    initWhatsAppLinks();
    initMobileMenu();
    initReadingProgress();
    initHeroCanvas();
    initStrategicIntersection();
    initOpportunityDesk();
    initScrollReveals();
  });

})();
