/*
 * SmileCare Dental Clinic — головний JS-файл
 * Зібраний з усіх інлайн-скриптів сторінки.
 * Підключається в кінці <body> з атрибутом defer,
 * тому DOM повністю готовий ще до виконання коду.
 */

/* ---------- Блок №1 ---------- */
const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 24);
    }, { passive: true });

    const heroBg = document.getElementById('heroBg');
    heroBg.style.backgroundImage = "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=85&w=2560&auto=format&fit=crop')";
    setTimeout(() => heroBg.classList.add('loaded'), 80);

    [
      ['eyebrow',     180],
      ['headline',    360],
      ['heroCopy',    540],
      ['heroActions', 700],
      ['heroStats',   880],
      ['scrollHint', 1080],
    ].forEach(([id, delay]) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.classList.add('appear');
      }, delay);
    });

    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      if (open) {
        mobileMenu.classList.add('active');
        requestAnimationFrame(() => mobileMenu.classList.add('visible'));
        document.body.style.overflow = 'hidden';
      } else {
        closeMenu();
      }
    });

    function closeMenu() {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('visible');
      document.body.style.overflow = '';
      setTimeout(() => mobileMenu.classList.remove('active'), 350);
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) closeMenu();
    });

/* ---------- Блок №2 ---------- */
(function () {
      const svcHead = document.getElementById('svcHeader');
      const cards   = document.querySelectorAll('[data-card]');
      const fadeIn  = (el, delay) => {
        new IntersectionObserver(([e], obs) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add('visible'), delay);
            obs.disconnect();
          }
        }, { threshold: 0.12 }).observe(el);
      };
      fadeIn(svcHead, 0);
      cards.forEach((c, i) => fadeIn(c, 80 + i * 80));
    })();

/* ---------- Блок №3 ---------- */
(function () {
      const whyH  = document.getElementById('whyHeader');
      const whyB  = document.getElementById('whyBanner');
      const whyCs = document.querySelectorAll('[data-why]');
      const vis = (el, delay) => {
        new IntersectionObserver(([e], obs) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add('vis'), delay);
            obs.disconnect();
          }
        }, { threshold: 0.12 }).observe(el);
      };
      vis(whyH, 0);
      whyCs.forEach((c, i) => vis(c, 80 + i * 90));
      vis(whyB, 200);
    })();

/* ---------- Блок №4 ---------- */
(function () {
    'use strict';

    var rvHeader = document.getElementById('rvHeader');
    var rvTrust  = document.getElementById('rvTrust');
    var rvCards  = document.querySelectorAll('[data-rv]');

    function revealEl(el, delay) {
      new IntersectionObserver(function (entries, obs) {
        if (entries[0].isIntersecting) {
          setTimeout(function () {
            el.classList.add('rv-vis');
          }, delay);
          obs.disconnect();
        }
      }, { threshold: 0.12 }).observe(el);
    }

    /* Trigger reveal animations */
    revealEl(rvHeader, 0);
    rvCards.forEach(function (card, i) {
      /* Smooth stagger: each card 0→1 progressively */
      card.style.transition =
        'opacity 0.75s ease ' + (0.1 + i * 0.08) + 's, ' +
        'transform 0.75s ease ' + (0.1 + i * 0.08) + 's, ' +
        'border-color 0.35s ease, box-shadow 0.35s ease, ' +
        'background 0.35s ease';
      revealEl(card, 100 + i * 100);
    });
    revealEl(rvTrust, 300);
  })();

/* ---------- Блок №5 ---------- */
(function () {
  'use strict';

  /* ── Accordion logic ─────────────────────────────── */
  var items = document.querySelectorAll('.faq-item');

  items.forEach(function (item) {
    var btn   = item.querySelector('.faq-q');
    var panel = item.querySelector('.faq-panel');

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      /* Close all others */
      items.forEach(function (other) {
        if (other !== item && other.classList.contains('is-open')) {
          closeItem(other);
        }
      });

      /* Toggle clicked */
      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });

    /* Keyboard: Space already triggers click on <button>;
       add Enter support for completeness */
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { btn.click(); }
    });
  });

  function openItem(item) {
    var panel = item.querySelector('.faq-panel');
    var inner = item.querySelector('.faq-panel-inner');
    var btn   = item.querySelector('.faq-q');

    item.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    panel.removeAttribute('hidden');

    /* Measure full height, then animate */
    var h = inner.offsetHeight;
    panel.style.maxHeight = '0px';

    /* rAF ensures browser registers the 0 before animating */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        panel.style.maxHeight = h + 'px';
      });
    });
  }

  function closeItem(item) {
    var panel = item.querySelector('.faq-panel');
    var btn   = item.querySelector('.faq-q');

    /* Snapshot current height so transition starts from real value */
    panel.style.maxHeight = panel.scrollHeight + 'px';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        panel.style.maxHeight = '0px';
      });
    });

    item.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');

    /* Re-add hidden after transition ends */
    panel.addEventListener('transitionend', function handler() {
      if (!item.classList.contains('is-open')) {
        panel.setAttribute('hidden', '');
      }
      panel.removeEventListener('transitionend', handler);
    });
  }

  /* ── Scroll reveal ───────────────────────────────── */
  var fqHeader = document.getElementById('fqHeader');
  var fqItems  = document.querySelectorAll('[data-fq]');
  var fqCta    = document.getElementById('fqCta');

  function revealEl(el, delay) {
    new IntersectionObserver(function (entries, obs) {
      if (entries[0].isIntersecting) {
        setTimeout(function () {
          el.classList.add('fq-vis');
        }, delay);
        obs.disconnect();
      }
    }, { threshold: 0.12 }).observe(el);
  }

  revealEl(fqHeader, 0);

  fqItems.forEach(function (item, i) {
    /* Stagger: left column even indices, right column odd */
    item.style.transitionDelay = (0.08 + i * 0.07) + 's';
    revealEl(item, 80 + i * 70);
  });

  revealEl(fqCta, 320);

})();

/* ---------- Блок №6 ---------- */
(function () {
      const dHeader = document.getElementById('doctorsHeader');
      const dTrust  = document.getElementById('doctorsTrust');
      const dCards  = document.querySelectorAll('[data-doc]');

      const reveal = (el, delay) => {
        new IntersectionObserver(([entry], obs) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('vis'), delay);
            obs.disconnect();
          }
        }, { threshold: 0.1 }).observe(el);
      };

      reveal(dHeader, 0);
      dCards.forEach((card, i) => reveal(card, 120 + i * 120));
      reveal(dTrust, 260);
    })();

/* ---------- Блок №7 ---------- */
(function(){
  'use strict';

  /* ── Поточний рік у футері ─────────────────────── */
  var yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Form validation & submit ─────────────────── */
  var form      = document.getElementById('ctForm');
  var success   = document.getElementById('cfSuccess');

  function getField(id){ return document.getElementById(id); }
  function getWrap(id){ return document.getElementById('cf-field-'+id); }
  function showError(fieldId){ getField(fieldId).classList.add('cf-error'); getWrap(fieldId).classList.add('has-error'); }
  function clearError(fieldId){ getField(fieldId).classList.remove('cf-error'); getWrap(fieldId).classList.remove('has-error'); }

  /* Live clear-on-input */
  ['cf-name','cf-phone','cf-email','cf-service'].forEach(function(id){
    var el = getField(id);
    if(el) el.addEventListener('input', function(){ clearError(id); });
  });
  /* Select */
  var sel = getField('cf-service');
  if(sel) sel.addEventListener('change', function(){ clearError('cf-service'); });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var valid = true;

    var name  = getField('cf-name').value.trim();
    var phone = getField('cf-phone').value.trim();
    var email = getField('cf-email').value.trim();
    var svc   = getField('cf-service').value;

    if(name.length < 2){ showError('cf-name'); valid=false; } else clearError('cf-name');
    if(phone.replace(/\D/g,'').length < 10){ showError('cf-phone'); valid=false; } else clearError('cf-phone');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showError('cf-email'); valid=false; } else clearError('cf-email');
    if(!svc){ showError('cf-service'); valid=false; } else clearError('cf-service');

    if(!valid) return;

    /* Simulate async submit */
    var btn = form.querySelector('.cf-submit');
    btn.disabled = true;
    btn.style.opacity = '.65';

    setTimeout(function(){
      form.style.display = 'none';
      success.classList.add('show');
    }, 600);
  });

  /* ── Scroll reveal ─────────────────────────────── */
  function revealEl(el, delay){
    if(!el) return;
    new IntersectionObserver(function(entries, obs){
      if(entries[0].isIntersecting){
        setTimeout(function(){ el.classList.add('ct-vis'); }, delay);
        obs.disconnect();
      }
    }, { threshold: 0.1 }).observe(el);
  }

  revealEl(document.getElementById('ctHeader'), 0);
  revealEl(document.getElementById('ctBody'),   120);
  revealEl(document.getElementById('ctMap'),    200);

})();
