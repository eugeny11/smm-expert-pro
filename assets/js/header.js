document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".header__hamburger");
  const menu = document.querySelector(".header__nav__menu");
  const lang = document.querySelector(".header__lang")

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
    lang.classList.toggle("active");
  });

  const langBlock = document.querySelector(".header__lang");
  const langPos = langBlock.querySelector(".header__lang-pos");
  const langList = langBlock.querySelector(".header__lang-list");
  const items = langList.querySelectorAll("li");

  // открытие/закрытие
  langBlock.addEventListener("click", () => {
    langBlock.classList.toggle("open");
  });

  // выбор языка
  items.forEach(item => {
  item.addEventListener("click", (e) => {
    e.stopPropagation(); // ← стопаем всплытие
    const lang = item.dataset.lang;
    langPos.textContent = lang;
    localStorage.setItem("lang", lang); // сохраним выбор
    langBlock.classList.remove("open"); // закрыть список
  });
});

  // восстановление из localStorage
  const savedLang = localStorage.getItem("lang");
  if (savedLang) {
    langPos.textContent = savedLang;
  }

  // клик вне блока → закрыть
  document.addEventListener("click", (e) => {
    if (!langBlock.contains(e.target)) {
      langBlock.classList.remove("open");
    }
  });
});
