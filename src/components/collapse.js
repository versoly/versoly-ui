import { getDuration, getTarget, addEventListenerToSelector } from "../utils";

const Collapse = (element) => {
  let target = getTarget(element);
  if (!target) {
    return;
  }

  const duration = getDuration(target);
  target.style.overflow = "hidden";
  target.style.height = 0;

  if (element.getAttribute("aria-expanded") === "true") {
    element.setAttribute("aria-expanded", "false");
    target.classList.remove("show");

    window.setTimeout(() => target.classList.remove("block"), duration);
    return;
  }

  element.setAttribute("aria-expanded", "true");
  target.classList.add("block");
  target.classList.add("show");

  window.setTimeout(() => {
    target
      .querySelectorAll(".dropdown-menu")
      .forEach((m) => m.classList.add("hidden"));
    let navHeight = target.scrollHeight;
    target
      .querySelectorAll(".dropdown-menu")
      .forEach((m) => m.classList.remove("hidden"));
    target.style.height = navHeight + "px";
  }, 32);

  window.setTimeout(() => (target.style.overflow = ""), duration);
};

export const collapse = addEventListenerToSelector(
  '[data-toggle="collapse"]',
  "click",
  Collapse
);
