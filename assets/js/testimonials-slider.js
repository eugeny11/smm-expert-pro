document.addEventListener("DOMContentLoaded", function () {
  const trackAuthor = document.querySelector('.track-author');
  const trackBody   = document.querySelector('.track-body');
  const slidesAuthor = document.querySelectorAll('.slide-author');
  const slidesBody   = document.querySelectorAll('.slide-body');
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

  goTo(0);
  start();
});
