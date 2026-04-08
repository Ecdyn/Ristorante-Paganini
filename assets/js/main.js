// assets/js/main.js
// Ristorante Paganini — all interactive behaviors
// Single file, no dependencies, ES2020+, loaded via <script defer>
// CUBE CSS contract: toggle data-* attributes; CSS handles visual states


/* ============================================================
 * 1. STICKY HEADER
 *    IntersectionObserver on .hero-sentinel detects when user
 *    scrolls past the hero. Scroll direction detection via
 *    requestAnimationFrame-throttled scroll listener activates
 *    only after scrolling past hero (D-01, D-02, D-03, FOUND-04).
 * ============================================================ */

(function initStickyHeader() {
  const header   = document.getElementById('site-header');
  const sentinel = document.querySelector('.hero-sentinel');

  if (!header || !sentinel) return;

  let lastScrollY = window.scrollY;
  let ticking     = false;
  let pastHero    = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const currentY = window.scrollY;

      if (pastHero) {
        if (currentY > lastScrollY + 5) {
          // Scrolling down past hero — hide header
          header.dataset.state = 'hidden';
        } else if (currentY < lastScrollY - 5) {
          // Scrolling up — show solid header
          header.dataset.state = 'scrolled';
        }
      }

      lastScrollY = currentY;
      ticking = false;
    });
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // Hero is visible — transparent header
        pastHero = false;
        delete header.dataset.state;
      } else {
        // Scrolled past hero — solid header
        pastHero = true;
        header.dataset.state = 'scrolled';
      }
    },
    { threshold: 0 }
  );

  observer.observe(sentinel);
  window.addEventListener('scroll', onScroll, { passive: true });
}());


/* ============================================================
 * 2. MOBILE MENU
 *    Full-screen overlay with focus trap, Escape key support,
 *    anchor auto-close, and aria-expanded state management
 *    (D-04, D-05, D-06, FOUND-05).
 * ============================================================ */

(function initMobileMenu() {
  const toggle   = document.getElementById('menu-toggle');
  const menu     = document.getElementById('mobile-menu');
  const closeBtn = menu?.querySelector('.mobile-menu-close');

  if (!toggle || !menu) return;

  const FOCUSABLE = 'a[href], button:not([disabled])';

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    menu.dataset.open = 'true';
    document.body.style.overflow = 'hidden';
    const first = menu.querySelector(FOCUSABLE);
    if (first) first.focus();
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    delete menu.dataset.open;
    document.body.style.overflow = '';
    toggle.focus();
  }

  // Toggle on hamburger click
  toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });

  // Close button
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Anchor auto-close — clicking any section link closes overlay
  menu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Keyboard handling: Escape + Tab focus trap
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      return;
    }

    if (e.key !== 'Tab') return;

    const focusable = [...menu.querySelectorAll(FOCUSABLE)];
    if (!focusable.length) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}());


/* ============================================================
 * 3. SMOOTH SCROLL — handled entirely by CSS
 *    - scroll-behavior: smooth on html (main.css line 178)
 *    - scroll-padding-top: var(--header-height) (main.css line 177)
 *    - @media (prefers-reduced-motion: reduce) override in main.css
 *    No JavaScript required.
 * ============================================================ */


/* ============================================================
 * 4. GALLERY LIGHTBOX
 *    Vanilla JS modal for viewing gallery images larger.
 *    Hooks: [data-lightbox-trigger] on gallery items,
 *           id="lightbox" modal, id="lightbox-img" image,
 *           id="lightbox-prev/next/close" controls.
 *    ARIA: role="dialog", aria-modal="true",
 *          aria-label="Bildergalerie"
 *    Keyboard: Escape closes, ArrowLeft/Right navigates
 *    (D-14, SECT-06)
 * ============================================================ */

(function initLightbox() {
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const prevBtn     = document.getElementById('lightbox-prev');
  const nextBtn     = document.getElementById('lightbox-next');
  const closeBtn    = document.getElementById('lightbox-close');
  const triggers    = document.querySelectorAll('[data-lightbox-trigger]');

  if (!lightbox || !lightboxImg || !triggers.length) return;

  const images = [...triggers];
  let currentIndex = 0;
  let lastFocused  = null;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Set static ARIA attributes on the lightbox element
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Bildergalerie');
  lightbox.setAttribute('aria-hidden', 'true');

  function updateNavButtons() {
    if (prevBtn) prevBtn.disabled = currentIndex <= 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= images.length - 1;
  }

  function openLightbox(index) {
    currentIndex       = index;
    const trigger      = images[index];
    lightboxImg.src    = trigger.getAttribute('data-lightbox-src') || trigger.getAttribute('href') || '';
    lightboxImg.alt    = trigger.getAttribute('data-lightbox-alt') || trigger.querySelector('img')?.alt || '';
    lastFocused        = document.activeElement;
    lightbox.dataset.open = 'true';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    updateNavButtons();
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    delete lightbox.dataset.open;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  function navigate(direction) {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      openLightbox(newIndex);
    }
  }

  // Trigger clicks
  images.forEach((trigger, index) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  // Control buttons
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn)  prevBtn.addEventListener('click', () => navigate(-1));
  if (nextBtn)  nextBtn.addEventListener('click', () => navigate(1));

  // Backdrop click — close only when clicking the overlay itself, not children
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard: Escape, ArrowLeft, ArrowRight, Tab (focus trap)
  const FOCUSABLE = 'button:not([disabled])';

  lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      return;
    }

    if (e.key === 'ArrowLeft') {
      navigate(-1);
      return;
    }

    if (e.key === 'ArrowRight') {
      navigate(1);
      return;
    }

    if (e.key !== 'Tab') return;

    // Focus trap cycling between focusable controls
    const focusable = [...lightbox.querySelectorAll(FOCUSABLE)];
    if (!focusable.length) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}());
