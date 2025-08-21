document.addEventListener("DOMContentLoaded", function () {
  const trackAuthor = document.querySelector('.track-author');
  const trackBody   = document.querySelector('.track-body');
  const prevBtn = document.querySelector('.testimonial__switcher-direction:first-child');
  const nextBtn = document.querySelector('.testimonial__switcher-direction:last-child');
  const dots    = document.querySelectorAll('.switcher__points-item');

  let index = 0;
  const steps = dots.length;
  const AUTOPLAY_MS = 4000;
  const RESUME_DELAY = 4000; 
  let timer;
  let resumeTimeout;

  function goTo(i) {
    index = (i + steps) % steps;
    trackAuthor.style.transform = `translateX(-${index * 100}%)`;
    trackBody.style.transform   = `translateX(-${index * 100}%)`;
    dots.forEach((dot, n) => dot.classList.toggle('active', n === index));
  }

  function start() {
    stop();
    timer = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
  }

  function stop() {
    clearInterval(timer);
  }

  function pauseAndResume() {
    stop();
    clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => {
      start();
    }, RESUME_DELAY);
  }

  // кнопки и точки
  prevBtn.addEventListener('click', () => { goTo(index - 1); pauseAndResume(); });
  nextBtn.addEventListener('click', () => { goTo(index + 1); pauseAndResume(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); pauseAndResume(); }));

  // свайп для <=420px
  if (window.matchMedia("(max-width: 420px)").matches) {
    let startX = 0;

    function handleTouchStart(e) {
      startX = e.touches[0].clientX;
    }

    function handleTouchEnd(e) {
      let endX = e.changedTouches[0].clientX;
      let diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goTo(index + 1);
        } else {
          goTo(index - 1);
        }
        pauseAndResume(); // свайп → пауза и возобновление
      }
    }

    [trackAuthor, trackBody].forEach(el => {
      if (el) {
        el.addEventListener("touchstart", handleTouchStart);
        el.addEventListener("touchend", handleTouchEnd);
      }
    });
  }

  goTo(0);
  start();
});
