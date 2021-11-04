"use strict";
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

export default modal;
export {closeModal};
export {openModal};