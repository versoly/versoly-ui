import {
  accordion,
  collapse,
  dismiss,
  dropdown,
  modal,
  tabs,
  handleResize,
} from "./components";

(function () {
  window.vInitialized = false;
  window.initializeVUI = () => {
    if (window.vInitialized) {
      return;
    }

    window.vInitialized = true;
    accordion();
    collapse();
    dismiss();
    dropdown();
    modal();
    tabs();

    handleResize();
  };

  document.addEventListener("DOMContentLoaded", initializeVUI);
  if (document.readyState !== "loading") {
    initializeVUI();
  }
})();
