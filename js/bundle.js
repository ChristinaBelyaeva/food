/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function calculator() {
    // calculator

  const result = document.querySelector(".calculating__result span");
  let sex, height, weight, age, ratio;

  if(localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }

  if(localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }

  function initLocalSettings(selector, classActive) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
      element.classList.remove(classActive);

      if(element.getAttribute("id") === localStorage.getItem("sex")) {
        element.classList.add(classActive);
      }

      if(element.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        element.classList.add(classActive);
      }
    });
  }
  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

  function calcResult() {
    if(!sex || !height || !weight || !age || !ratio) {
      result.textContent = "Укажите все значения!";
      return;
    }

    if(sex === "female") {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    }

    if(sex === "male") {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }
  calcResult();

  function getStaticInformation(parent, classActive) {
    const elements = document.querySelectorAll(parent);

    elements.forEach(element => {
      element.addEventListener("click", (e) => {
        if(e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
        }
  
        elements.forEach(element => {
          element.classList.remove(classActive);
        });
  
        e.target.classList.add(classActive);
        
        calcResult();
      });
    });
  }

  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {

      if(input.value.match(/\D/g)){
        input.style.border = "solid 3px red";
      } else {
        input.style.border = "none";
      }

      switch(input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
      calcResult();
    });
  }

  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    // menu card template

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        element.classList.add("menu__item");
        } else {
          this.classes.forEach(className => {
          element.classList.add(className);
          });
        }
      
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">
        ${this.descr}
        </div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span>
          грн/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }
// console.log(document.querySelector(".menu__field .container"));
  // const fitnes = new MenuCard("img/tabs/vegy.jpg", "vegy", "Меню 'Фитнес'", "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!", 229, ".menu__field .container");
  // fitnes.render();



  /*getRecource("http://localhost:3000/menu")
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
      });
    });
    */

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getRecource)("http://localhost:3000/menu")
      .then(data => createCard(data));

      function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
          const element = document.createElement("div");

          element.classList.add("menu__item");

          element.innerHTML = `
          <img src=${img} alt=${altimg}>
          <h3 class="menu__item-subtitle">${title}</h3>
          <div class="menu__item-descr">
          ${descr}
          </div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${price}</span>
            грн/день</div>
          </div>
          `;

          document.querySelector(".menu .container").append(element);
        });
      }


 /* new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Меню \"Фитнес\"",
    "Меню \“Фитнес\” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    9,
    ".menu .container",
    "menu__item",
    "big",
  ).render();
  
  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню \"Премиум\"",
    "В меню \“Премиум\” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    14,
    ".menu .container",
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    "Меню \"Постное\"",
    "Меню \“Постное\” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    21,
    ".menu .container",
    "menu__item",
  ).render();
*/
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function forms() {
    // Forms

  const forms = document.querySelectorAll("form");
  // console.log('forms: ', forms);

  const message = {
    loading: "Загружается",
    success: "Спасибо! Скоро мы с Вами свяжемся!",
    failure: "Что-то пошло не так",
  };

  forms.forEach(item => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const formData = new FormData(form);
      console.log(formData);
      
      // const object = {};
      // formData.forEach(function(value, key) {
      //   object[key] = value;
      // });

      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      console.log(json);

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
      .then((data) => {
        console.log(data);
        statusMessage.textContent = message.success;
      })
      .catch(() => {
        statusMessage.textContent = message.failure;
      })
      .finally(() => {
        form.reset();
      });

      // const request = new XMLHttpRequest();
      // request.open("POST", "server.php");

      // // request.setRequestHeader("Content-type", "multipart/form-data");

      // request.send(formData);

      // request.addEventListener("load", () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     statusMessage.textContent = message.success;
      //   } else {
      //     statusMessage.textContent = message.failure;
      //   }
      // });

    });
  }

  fetch("http://localhost:3000/menu")
  .then(data => data.json())
  .then(res => console.log(res));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });

function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.style.display = "block";
    document.body.style.overflow = "hidden"; //останавливаем прокрутку сайта
    // clearInterval(setTime);
    }

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.style.display = "none";
    document.body.style.overflow = ""; //восстанавливаем прокрутку, после закрытия модального окна
    }

function modal(triggerSelector, modalSelector) {
    // modal
    const modal = document.querySelector(modalSelector),
    btnClose = modal.querySelector("[data-close]"),
    btnsOpenModal = document.querySelectorAll(triggerSelector);

    btnsOpenModal.forEach(btn => {
    btn.addEventListener("click", () => openModal(modalSelector));
    });

    btnClose.addEventListener("click", closeModal);

    // закрытие модального окна по тапу мимо него
    modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal(modalSelector);
    }
    });

    //закрытие модального окна по escape
    document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.style.display === "block") {
        closeModal(modalSelector);
    }
    });

    // const setTime = setTimeout(openModal, 3000);

    window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal(modalSelector);
    }
    });


    // console.log(document.documentElement.scrollTop);
    // console.log(document.documentElement.clientHeight);
    // console.log(document.documentElement.scrollHeight);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function slider() {
    // slider

    const prevButton = document.querySelector(".offer__slider-prev"),
    nextButton = document.querySelector(".offer__slider-next"),
    slides = document.querySelectorAll(".offer__slide"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total");
    let slideIndex = 1;

    showSlides(slideIndex);

    if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
    }
    if(slides.length >= 10) {
        total.textContent = `${slides.length}`;
    }

    function showSlides(n) {
        if(n > slides.length) {
            slideIndex = 1;
    }

    if(n < 1) {
        slideIndex = slides.length;
        current.textContent = `${slideIndex}`;
    }

    if(slideIndex < 10){
        current.textContent = `0${slideIndex}`;
    }

    slides.forEach(slide => {
        slide.style.display = "none";
    });

    slides[slideIndex - 1].style.display = "block";
    }

    function countSlides(n) {
        showSlides(slideIndex += n);
    }

    prevButton.addEventListener("click", () => {
        countSlides(- 1);
    });

    nextButton.addEventListener("click", () => {
        countSlides(+ 1);
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // tabs

  const tabs = document.querySelectorAll(tabsSelector);
  const tabContent = document.querySelectorAll(tabsContentSelector);
  const tabsWrapper = document.querySelector(tabsParentSelector);

  function hideContent() {
    tabContent.forEach(function (item) {
      item.style.display = "none";
    });

    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  function showContent(i = 0) {
    tabContent[i].style = "display: block";
    tabs[i].classList.add(activeClass);
  }

  hideContent();
  showContent();

  tabsWrapper.addEventListener("click", (e) => {
    e.preventDefault();

    const target = e.target;
    // console.log('target: ', target);

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideContent();
          showContent(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function timer(id, deadline) {
    // timer

    // const deadLine = new Date("2021-12-31");
    // console.log('deadLine: ', deadLine);

    function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - new Date();
    // console.log('new Date(): ', new Date());
    // console.log('t: ', t);

    let days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        minutes = Math.floor((t / (1000 * 60)) % 60),
        seconds = Math.floor((t / 1000) % 60);
        // console.log('days: ', days);
        // console.log('hours: ', hours);
        // console.log('minutes: ', minutes);
        // console.log('seconds: ', seconds);
    
    return {
        "total": t,
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds,
    };
    }

    function getZero(num) {
    if (num > 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
    }

    function setClock(selector, endtime) {

    const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector("#hours"),
        minutes = timer.querySelector("#minutes"),
        seconds = timer.querySelector("#seconds"),
        interval = setInterval(updateClock, 1000);
    
    updateClock();
    
    function updateClock() {
        const t = getTimeRemaining(endtime);
        // console.log('t: ', t);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
        clearInterval(interval);
        }
    }
    }

    // getTimeRemaining(deadLine);
    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getRecource": () => (/* binding */ getRecource)
/* harmony export */ });

const postData = async(url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: data,
    });
    return await res.json();
  };

const getRecource = async(url) => {
    let res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
};

  
  

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");









window.addEventListener("DOMContentLoaded", () => {
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])("[data-modal]", ".modal");
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__["default"])(".timer", "2021-12-31");
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_6__["default"])(".tabheader__item", ".tabcontent", ".tabheader", "tabheader__item_active");

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map