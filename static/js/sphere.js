// static/js/sphere.js
(function applyStyles() {
  const animationWrapper = document.querySelector('.animation-wrapper');
  if (animationWrapper) {
    animationWrapper.style.margin = '0';
    animationWrapper.style.padding = '0';
    animationWrapper.style.overflow = 'hidden'; // Prevent scrollbars
  }
})();

// Dopasowanie elementu do wrappera i dodatkowe zmniejszenie przez factor
function fitElementToParent(el, padding = 0, factor = 1, offsetY = 0, heightBuffer = 100) {
  let timeout;
  function resize() {
    if (timeout) clearTimeout(timeout);
    anime.set(el, { scale: 1, translateY: offsetY });
    const parent = el.parentNode;
    const ratio = parent.offsetWidth / (el.offsetWidth - padding);
    timeout = setTimeout(() => {
      const scaledHeight = el.offsetHeight * ratio * factor + heightBuffer; // Add buffer to height
      anime.set(el, { scale: ratio * factor, translateY: offsetY });
      parent.style.height = `${scaledHeight}px`; // Set parent height with buffer
      parent.style.margin = '0';
      parent.style.padding = '0';
    }, 10);
  }
  resize();
  window.addEventListener('resize', resize);
}

(function sphereAnimation() {
  const sphereEl = document.querySelector('.sphere-animation');
  const spherePaths = sphereEl.querySelectorAll('.sphere path');
  const pathCount = spherePaths.length;
  const animations = [];

  // Skaluj sferę do wrappera i dodatkowo o połowę
  fitElementToParent(sphereEl, 0, 0.5, -800);

  // Breath animation
  const breath = anime({
    begin() {
      for (let i = 0; i < pathCount; i++) {
        animations.push(anime({
          targets: spherePaths[i],
          stroke: { value: ['rgba(255,75,75,1)', 'rgba(80,80,80,.35)'], duration: 500 },
          translateX: [2, -4],
          translateY: [2, -4],
          easing: 'easeOutQuad',
          autoplay: false
        }));
      }
    },
    update(ins) {
      animations.forEach((anim, i) => {
        const percent = (1 - Math.sin(i * 0.35 + ins.currentTime * 0.0022)) / 2;
        anim.seek(anim.duration * percent);
      });
    },
    duration: Infinity,
    autoplay: true
  });

  // Intro drawing animation
  anime.timeline({ autoplay: true })
    .add({
      targets: spherePaths,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 3900,
      easing: 'easeInOutCirc',
      delay: anime.stagger(190, { direction: 'reverse' })
    }, 0);

  // Gradient shadow animation
  anime({
    targets: '#sphereGradient',
    x1: '25%', x2: '25%', y1: '0%', y2: '75%',
    duration: 30000,
    easing: 'easeOutQuint',
    loop: true
  });

})();