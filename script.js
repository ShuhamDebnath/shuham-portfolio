/**
 * script.js — Shuham Debnath Developer Website
 * Shared vanilla JavaScript for all pages.
 *
 * Features:
 *  1. Prefers-reduced-motion detection
 *  2. Scroll-triggered fade/slide-up reveals (IntersectionObserver)
 *  3. Nav hide on scroll-down / reveal on scroll-up
 *  4. Mobile nav toggle (hamburger)
 *  5. Hero feature pill: show "Always Improving" at ≥768px
 *  6. Legal page scroll-spy — sidebar TOC links
 *  7. Legal page scroll-spy — mobile chip row
 *  8. Smooth anchor scroll with nav offset (via scroll-margin-top in CSS)
 *  9. Mobile trust/agreement card visibility
 */

(function () {
  'use strict';

  /* =========================================================
     1. PREFERS-REDUCED-MOTION
     ========================================================= */
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* =========================================================
     2. SCROLL-TRIGGERED REVEALS
     Adds `.is-visible` to `.fade-in-up` elements when they
     enter the viewport. Stagger delays are set via CSS on
     `.fade-stagger > *:nth-child(n)`.
     ========================================================= */
  function initReveal() {
    const elements = document.querySelectorAll('.fade-in-up');
    if (!elements.length) return;

    if (prefersReducedMotion) {
      // Make everything immediately visible
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
    );

    elements.forEach(el => observer.observe(el));
  }

  /* =========================================================
     3. NAV HIDE ON SCROLL-DOWN / REVEAL ON SCROLL-UP
     ========================================================= */
  function initNavBehavior() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    if (prefersReducedMotion) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Scrolled past nav height — hide or show
          if (currentScrollY > 80) {
            if (currentScrollY > lastScrollY) {
              // Scrolling down → hide
              nav.classList.add('nav--hidden');
              // Close mobile nav if open
              closeMobileNav();
            } else {
              // Scrolling up → show
              nav.classList.remove('nav--hidden');
            }
          } else {
            // Near top — always show
            nav.classList.remove('nav--hidden');
          }

          // Add scrolled shadow
          if (currentScrollY > 10) {
            nav.classList.add('nav--scrolled');
          } else {
            nav.classList.remove('nav--scrolled');
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* =========================================================
     4. MOBILE NAV TOGGLE
     ========================================================= */
  let mobileNavOpen = false;

  function openMobileNav() {
    const mobileNav = document.getElementById('mobile-nav');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    if (!mobileNav) return;

    mobileNav.classList.add('is-open');
    hamburgerBtn && hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn && hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');
    if (hamburgerIcon) hamburgerIcon.textContent = 'close';
    mobileNavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    const mobileNav = document.getElementById('mobile-nav');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    if (!mobileNav) return;

    mobileNav.classList.remove('is-open');
    hamburgerBtn && hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn && hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
    if (hamburgerIcon) hamburgerIcon.textContent = 'menu';
    mobileNavOpen = false;
    document.body.style.overflow = '';
  }

  function initMobileNav() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    if (!hamburgerBtn || !mobileNav) return;

    hamburgerBtn.addEventListener('click', () => {
      if (mobileNavOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    // Close when any link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (
        mobileNavOpen &&
        !mobileNav.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
      ) {
        closeMobileNav();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileNavOpen) {
        closeMobileNav();
      }
    });
  }

  /* =========================================================
     5. HERO "ALWAYS IMPROVING" PILL VISIBILITY
     Show third feature pill at ≥768px (matches CSS grid change)
     ========================================================= */
  function initHeroFeaturePill() {
    const pill = document.getElementById('feature-always-improving');
    if (!pill) return;

    function update() {
      if (window.innerWidth >= 768) {
        pill.style.display = '';
        pill.removeAttribute('aria-hidden');
      } else {
        pill.style.display = 'none';
        pill.setAttribute('aria-hidden', 'true');
      }
    }

    update();
    window.addEventListener('resize', update, { passive: true });
  }

  /* =========================================================
     6. LEGAL PAGE SCROLL-SPY — SIDEBAR TOC
     Highlights the active TOC link as user scrolls content.
     ========================================================= */
  function initScrollSpySidebar(tocNavId, sectionSelector) {
    const tocNav = document.getElementById(tocNavId);
    if (!tocNav) return;

    const tocLinks = tocNav.querySelectorAll('a[href^="#"]');
    if (!tocLinks.length) return;

    const sections = [];
    tocLinks.forEach(link => {
      const id = link.getAttribute('href').slice(1);
      const section = document.getElementById(id);
      if (section) sections.push(section);
    });

    if (!sections.length) return;

    function setActive(activeId) {
      tocLinks.forEach(link => {
        const href = link.getAttribute('href').slice(1);
        if (href === activeId) {
          link.classList.add('is-active');
        } else {
          link.classList.remove('is-active');
        }
      });
    }

    // Set first as active initially
    if (sections[0]) setActive(sections[0].id);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -78% 0px',
        threshold: 0
      }
    );

    sections.forEach(section => observer.observe(section));
  }

  /* =========================================================
     7. LEGAL PAGE SCROLL-SPY — MOBILE CHIP ROW
     Highlights the active chip and scrolls it into view.
     ========================================================= */
  function initScrollSpyChips(chipsContainerId, sectionSelector) {
    const chipsContainer = document.getElementById(chipsContainerId);
    if (!chipsContainer) return;

    const chips = chipsContainer.querySelectorAll('a[href^="#"]');
    if (!chips.length) return;

    const sections = [];
    chips.forEach(chip => {
      const id = chip.getAttribute('href').slice(1);
      const section = document.getElementById(id);
      if (section) sections.push(section);
    });

    if (!sections.length) return;

    function setActiveChip(activeId) {
      chips.forEach(chip => {
        const href = chip.getAttribute('href').slice(1);
        if (href === activeId) {
          chip.classList.remove('toc-chip--inactive');
          chip.classList.add('toc-chip--active', 'is-active');
          // Scroll active chip into view horizontally
          chip.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
        } else {
          chip.classList.add('toc-chip--inactive');
          chip.classList.remove('toc-chip--active', 'is-active');
        }
      });
    }

    // Set first as active initially
    if (sections[0]) setActiveChip(sections[0].id);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveChip(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -78% 0px',
        threshold: 0
      }
    );

    sections.forEach(section => observer.observe(section));
  }

  /* =========================================================
     8. SMOOTH ANCHOR SCROLL WITH OFFSET
     CSS `scroll-margin-top` handles the offset on sections.
     This ensures clicking chip/TOC links also lands cleanly.
     (No extra JS needed beyond what CSS provides, but we
     intercept to ensure reliable cross-browser behaviour.)
     ========================================================= */
  function initAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        if (prefersReducedMotion) {
          target.scrollIntoView({ block: 'start' });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Update URL hash without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      });
    });
  }

  /* =========================================================
     9. MOBILE TRUST / AGREEMENT CARD VISIBILITY
     Show card on mobile, hide on tablet+
     ========================================================= */
  function initMobileTrustCard() {
    const trustCard = document.getElementById('mobile-trust-card');
    const agreementCard = document.getElementById('mobile-agreement-card');

    function update() {
      const isMobile = window.innerWidth < 768;
      if (trustCard) trustCard.style.display = isMobile ? 'flex' : 'none';
      if (agreementCard) agreementCard.style.display = isMobile ? 'block' : 'none';
    }

    update();
    window.addEventListener('resize', update, { passive: true });
  }

  /* =========================================================
     10. DYNAMIC COPYRIGHT YEAR
     Populates every <span id="copyright-year"> with the
     current year so footers never go stale.
     ========================================================= */
  function initCopyrightYear() {
    const year = new Date().getFullYear();
    document.querySelectorAll('#copyright-year').forEach(el => {
      el.textContent = year;
    });
  }

  /* =========================================================
     11. APP CARDS
     ========================================================= */
  function initAppCards() {
    const carelogCard = document.getElementById('card-carelog');
    if (carelogCard) {
      carelogCard.addEventListener('click', (e) => {
        // Prevent navigation if clicking a store button or link inside the card
        if (e.target.closest('a')) return;
        window.open('https://carelog-01g.pages.dev/', '_blank');
      });
    }
  }

  /* =========================================================
     INIT — Run everything on DOMContentLoaded
     ========================================================= */
  document.addEventListener('DOMContentLoaded', () => {
    initCopyrightYear();
    initReveal();
    initNavBehavior();
    initMobileNav();
    initHeroFeaturePill();
    initAnchorScroll();
    initMobileTrustCard();
    initAppCards();

    // Legal page scroll-spy — Privacy Policy
    if (document.getElementById('privacy-toc-nav')) {
      initScrollSpySidebar('privacy-toc-nav', 'section');
      initScrollSpyChips('privacy-toc-chips', 'section');
    }

    // Legal page scroll-spy — Terms of Service
    if (document.getElementById('terms-toc-nav')) {
      initScrollSpySidebar('terms-toc-nav', 'section');
      initScrollSpyChips('terms-toc-chips', 'section');
    }
  });

})();
