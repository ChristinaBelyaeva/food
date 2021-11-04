"use strict";
import {closeModal, openModal} from "./modal";
import {postData} from "../services/services";

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

      postData("http://localhost:3000/requests", json)
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

export default forms;