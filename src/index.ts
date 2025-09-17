import { accordion, collapse, dismiss, dropdown, modal, tabs, handleResize } from './plugins/index';

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

  document.addEventListener('DOMContentLoaded', window.initializeVUI);
  if (document.readyState !== 'loading') {
    window.initializeVUI();
  }
})();
