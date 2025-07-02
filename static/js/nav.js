document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', e => {
    const target = link.getAttribute('href');
    if (target.startsWith('#')) {
      // Internal link: smooth scroll
      e.preventDefault();
      gsap.to(window, {
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTo: {
          y: target,
          offsetY: 80 // Adjust for header height
        }
      });
    } else {
      // External link: allow default navigation
      window.location.href = target;
    }
  });
});