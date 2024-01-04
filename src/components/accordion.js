import { getDuration, addEventListenerToSelector } from "../utils";

const handleOpen = (element, target, duration) => {
  target.style.overflow = "hidden";
  target.style.height = 0;

  element.setAttribute("aria-expanded", "true");
  target.classList.add("block");
  target.classList.add("show");
  target.classList.remove("hidden");

  window.setTimeout(() => {
    target.style.height = target.scrollHeight + "px";
  }, 33);

  window.setTimeout(() => {
    target.style.overflow = "";
  }, duration);
};

const handleClose = (element, target, duration) => {
  target.style.overflow = "hidden";
  target.style.height = 0;

  element.setAttribute("aria-expanded", "false");
  target.classList.remove("show");

  window.setTimeout(() => {
    target.classList.remove("block");
    target.classList.add("hidden");
  }, duration);
};

const Accordion = (element) => {
  let target = element
    .closest(".accordion-item")
    .querySelector(".accordion-collapse");
  const duration = getDuration(target);

  if (element.getAttribute("aria-expanded") === "true") {
    handleClose(element, target, duration);
    return;
  }

  handleOpen(element, target, duration);

  if (element.hasAttribute("data-parent")) {
    element
      .closest(".accordion")
      .querySelectorAll(".accordion-collapse")
      .forEach((item) => {
        if (item === target) {
          return;
        }

        handleClose(
          item.closest(".accordion-item").querySelector("[aria-expanded]"),
          item,
          duration
        );
      });
  }
};

export const accordion = addEventListenerToSelector(
  '[data-toggle="accordion"]',
  "click",
  Accordion
);
