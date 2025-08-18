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
  let timer;

  function goTo(i) {
    if (!count) return;
    index = (i + count) % count;

    // крутим оба трека синхронно
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

  // клики + перезапуск автоскролла
  prevBtn.addEventListener('click', () => { goTo(index - 1); start(); });
  nextBtn.addEventListener('click', () => { goTo(index + 1); start(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); start(); }));

  // автопауза, когда вкладка неактивна
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });

  goTo(0);
  start();
});
