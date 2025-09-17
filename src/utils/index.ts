export const getElementBySelector = (selector: string) => document.querySelector(selector) as HTMLElement;
export const getElementsBySelectors = (selector: string, element: Document | HTMLElement = document) =>
  Array.from(element.querySelectorAll(selector)) as HTMLElement[];

export const getTarget = (element: HTMLElement) => {
  const attrValue = element.dataset.target;
  if (!attrValue) {
    return null;
  }
  return getElementBySelector(attrValue);
};

export const getDuration = (element: HTMLElement) => {
  const duration = window.getComputedStyle(element).getPropertyValue('transition-duration');

  if (!duration) {
    return 0;
  }

  return parseInt(duration.replace('s', '')) * 1000 + 1;
};

export const getIsAriaExpanded = (element: HTMLElement) => element.getAttribute('aria-expanded') === 'true';

export const addEventListeners = (
  element: HTMLElement,
  events: (keyof HTMLElementEventMap)[],
  callback: EventListenerOrEventListenerObject,
) => {
  events.forEach((event) => {
    element.addEventListener(event, callback);
  });
};

export const addEscapeListener = (callback: () => void) => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      callback();
    }
  });
};

export const addEventListenerToSelector = (
  selector: string,
  eventListener: keyof HTMLElementEventMap,
  callback: (element: HTMLElement) => void,
) => {
  return () =>
    getElementsBySelectors(selector).forEach((element) => {
      element.addEventListener(eventListener, () => callback(element));
    });
};

export const handleResize = () =>
  window.addEventListener('resize', () => {
    getElementsBySelectors('[data-toggle="collapse"]').forEach((element) => {
      const target = getTarget(element);

      if (!target) {
        return;
      }

      element.setAttribute('aria-expanded', 'false');
      target.classList.remove('show');
      target.classList.remove('block');
      target.style.height = 'auto';
      target.style.overflow = '';
    });
  });

export const waitForElement = (s: string): Promise<HTMLElement> => {
  return new Promise((resolve) => {
    if (getElementBySelector(s)) {
      return resolve(getElementBySelector(s));
    }

    const observer = new MutationObserver(() => {
      if (getElementBySelector(s)) {
        resolve(getElementBySelector(s));
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
};

export const parseElementOptions = (element: HTMLElement): Record<string, any> => {
  // eval('(' + trigger.dataset.options + ')' || '') || {};
  const t = element.dataset.options;
  if (!t) {
    return {};
  }

  try {
    return JSON.parse(t.replaceAll("'", '"'));
  } catch {
    return {};
  }
};

export const getElementsByToggle = (toggleName: string) => {
  const query = `[data-toggle="${toggleName}"]`;
  const elements = getElementsBySelectors(query);
  return elements;
};
