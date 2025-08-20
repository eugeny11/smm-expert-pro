document.addEventListener("DOMContentLoaded", function () {
  const trackAuthor = document.querySelector('.track-author');
  const trackBody   = document.querySelector('.track-body');
  const prevBtn = document.querySelector('.testimonial__switcher-direction:first-child');
  const nextBtn = document.querySelector('.testimonial__switcher-direction:last-child');
  const dots    = document.querySelectorAll('.switcher__points-item');

  let index = 0;
  const steps = dots.length;
  const AUTOPLAY_MS = 4000;
  let timer;

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

  prevBtn.addEventListener('click', () => { goTo(index - 1); start(); });
  nextBtn.addEventListener('click', () => { goTo(index + 1); start(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); start(); }));

  if (window.matchMedia("(max-width: 420px)").matches) {
  let startX = 0;

  trackBody.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  trackBody.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goTo(index + 1);
      } else {
        goTo(index - 1);
      }
    }
    start();
  });

  trackAuthor.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  trackAuthor.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goTo(index + 1);
      } else {
        goTo(index - 1);
      }
    }
    start();
  });
}


  goTo(0);
  start();
});
