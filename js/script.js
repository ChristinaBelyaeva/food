require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import calculator from "./modules/calculator";
import slider from "./modules/slider";
import forms from "./modules/forms";
import cards from "./modules/cards";
import modal from "./modules/modal";
import timer from "./modules/timer";
import tabs from "./modules/tabs";

window.addEventListener("DOMContentLoaded", () => {
  calculator();
  slider();
  forms();
  cards();
  modal("[data-modal]", ".modal");
  timer(".timer", "2021-12-31");
  tabs(".tabheader__item", ".tabcontent", ".tabheader", "tabheader__item_active");

});