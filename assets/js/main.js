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
