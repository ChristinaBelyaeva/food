"use strict";
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

export default tabs;