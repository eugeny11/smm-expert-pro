document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector('.what__slider__track');               
  const subtitleTrack = document.querySelector('.subtitle__track');          
  const slides = document.querySelectorAll('.what__slider__content');
  const prevBtn = document.querySelector('.what__slider-switch--left');
  const nextBtn = document.querySelector('.what__slider-switch--right');
  const dots = document.querySelectorAll('.what__slider-dot');

  let index = 0;
  const count = slides.length;
  const AUTOPLAY_MS = 4000;   
  const RESUME_DELAY = 4000;  
  let timer;
  let resumeTimeout;

  function goTo(i) {
    if (!count) return;
    index = (i + count) % count;

    track.style.transform = `translateX(-${index * 100}%)`;
    if (subtitleTrack) {
      subtitleTrack.style.transform = `translateX(-${index * 100}%)`;
    }

    dots.forEach((d, n) => d.classList.toggle('active', n === index));
  }

  function start() {
    if (count <= 1) return;
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

  // стрелки
  prevBtn.addEventListener('click', () => { goTo(index - 1); pauseAndResume(); });
  nextBtn.addEventListener('click', () => { goTo(index + 1); pauseAndResume(); });
  dots.forEach((dot, i) => 
    dot.addEventListener('click', () => { goTo(i); pauseAndResume(); })
  );

  // пауза при скрытии вкладки
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });

  goTo(0);
  start();

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
        pauseAndResume(); // свайп → пауза с возобновлением
      }
    }

    [track, subtitleTrack].forEach(el => {
      if (el) {
        el.addEventListener("touchstart", handleTouchStart);
        el.addEventListener("touchend", handleTouchEnd);
      }
    });
  }
});
