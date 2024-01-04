import { getDuration, getTarget, addEventListenerToSelector } from "../utils";

const Dismiss = (element) => {
  let target = getTarget(element);
  if (!target) {
    target = element.closest(`.${element.getAttribute("data-dismiss")}`);
  }
  target.classList.add("opacity-0");
  setTimeout(() => target.remove(), getDuration(target));
};

export const dismiss = addEventListenerToSelector(
  "[data-dismiss]",
  "click",
  Dismiss
);
