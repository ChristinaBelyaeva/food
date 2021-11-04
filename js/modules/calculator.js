"use strict";
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

export default calculator;