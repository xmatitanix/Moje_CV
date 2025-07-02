// static/js/main.js

document.addEventListener('DOMContentLoaded', function() {
  // 1. AOS – Animate On Scroll
  AOS.init({ duration: 800, once: true });

  // 2. Typed.js – typing effect
  var typedEl = document.querySelector('.typed-element');
  if (typedEl) {
    new Typed(typedEl, {
      strings: ['Full-Stack Developer', 'Python Lover', 'Open-Source Enthusiast'],
      typeSpeed: 50, backSpeed: 25, loop: true
    });
  }

  // 3. Chart.js – doughnut chart
  var skillsChartEl = document.getElementById('skillsChart');
  if (skillsChartEl) {
    new Chart(skillsChartEl.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Python','JavaScript','HTML/CSS','Flask','SQL'],
        datasets: [{
          data: [40,30,15,10,5],
          backgroundColor: [
            'rgba(255,99,132,0.6)','rgba(54,162,235,0.6)',
            'rgba(255,206,86,0.6)','rgba(75,192,192,0.6)',
            'rgba(153,102,255,0.6)'
          ],
          borderWidth: 1
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend:{ position:'bottom' } } }
    });
  }

  // 4. Rellax.js – parallax
  if (typeof Rellax !== 'undefined') new Rellax('.parallax', { speed:-2, center:true });

  // 5. Lenis – smooth scroll
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2, easing: t => 1-Math.pow(1-t,3),
      smoothWheel: true, smoothTouch: false
    });
    function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  // 6. GSAP + ScrollTrigger
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.fade-in').forEach(el => {
      gsap.from(el, {
        opacity:0, y:30, duration:1, ease:'power2.out',
        scrollTrigger:{ trigger:el, start:'top 85%' }
      });
    });
    ScrollTrigger.create({
      trigger:'#skills', start:'top top', end:'bottom top',
      pin:true, pinSpacing:false
    });
  }

  // 7. VanillaTilt – 3D tilt on .card
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('.card'), {
      max:12, speed:400, glare:true, 'max-glare':0.2
    });
  }

  // 8. Lottie – vector animation in header
  if (window.lottie && document.getElementById('lottie-header')) {
    lottie.loadAnimation({
      container:document.getElementById('lottie-header'),
      renderer:'svg', loop:true, autoplay:true,
      path:'/static/img/header-animation.json'
    });
  }

  // ──────────────────────────────────────────────────────────────────────────────
  // 9. Anime.js Draggable – przeciąganie elementów
  if (window.createDraggable) {
    // wszystkie elementy z klasą .draggable
    createDraggable('.draggable', {
      // pozwól przeciągać w obu osiach
      x: true,
      y: true,
      // zabezpieczenie względem viewportu
      container: document.body,
      // drobna skalująca animacja podczas drag
      onDrag: ({ target }) => {
        anime({
          targets: target,
          scale: 1.05,
          duration: 200,
          easing: 'easeOutQuad'
        });
      },
      // powrót do pierwotnej skali po puście
      onRelease: ({ target }) => {
        anime({
          targets: target,
          scale: 1,
          duration: 300,
          easing: 'spring(1, 80, 10, 0)'
        });
      }
    });
  }

  // odśwież AOS gdy wszystko załadowane
  window.addEventListener('load', () => AOS.refresh());
});
