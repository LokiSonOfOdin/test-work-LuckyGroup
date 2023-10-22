const headerMenuItem = document.querySelectorAll(".header__item-link");
const menuBtn = document.querySelector(".header__menu-icon");
const menu = document.querySelector(".header__nav");

const circleItem = document.querySelectorAll(".content__box-img");
const length = circleItem.length;
const arc = 2 * Math.PI * (1 / length);
const radius = 50;

const searchInput = document.querySelector(".content__search-input");

headerMenuItem.forEach((item) => {
  item.addEventListener("click", () => {
    headerMenuItem.forEach((item) => {
      item.classList.remove("active__link");
    });
    item.classList.add("active__link");
  });
});

menuBtn.addEventListener("click", openMenu);

function openMenu() {
  menu.classList.toggle("active");
  menuBtn.classList.toggle("open");
}

window.addEventListener("load", (e) => {
  e.preventDefault();
  setTimeout(() => {
    for (let i = 0; i < length; i++) {
      const angle = i * arc;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      setTimeout(() => {
        circleItem[i].style.left = 50 + x + "%";
        circleItem[i].style.top = 50 + y + "%";
        if (i === length - 1) {
          startFanAnimation();
        }
      }, i * 400);
    }
  }, 3000);
});

function startFanAnimation() {
  setTimeout(() => {
    document.querySelector(".content__right-box").classList.add("start__fan");
    document.querySelectorAll(".content__box-img").forEach((element) => {
      element.classList.add("start__spin");
    });
  }, 1000);
}

searchInput.addEventListener("input", function () {
  const inputValue = this.value;

  if (inputValue.length < 4) {
    this.setCustomValidity("Минимум 4 символа");
  } else if (inputValue.length > 12) {
    this.setCustomValidity("Максимум 12 символов");
  } else {
    const forbiddenCharacters = [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
    ];
    const hasForbiddenCharacters = forbiddenCharacters.some((char) =>
      inputValue.includes(char)
    );

    if (hasForbiddenCharacters) {
      this.setCustomValidity("Запрещенные символы: ! @ # $ % ^ & * ( )");
    } else {
      this.setCustomValidity("");
    }
  }
});

async function getDescription() {
  try {
    const response = await fetch("https://baconipsum.com/api/?type=lucky");

    if (response.ok) {
      const data = await response.json();

      const description = data[0];

      const paragraph = document.querySelector(".content__text");
      paragraph.textContent = description;
    } else {
      console.error("Ошибка при выполнении запроса:", response.status);
    }
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

getDescription();
