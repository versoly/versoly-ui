export const getTarget = element => element.getAttribute('data-target') && document.getElementById(element.getAttribute('data-target').replace('#', ''))

export const getDuration = element => window.getComputedStyle(element).getPropertyValue('transition-duration').replace('s', '') * 1000 + 1

export const addEventListeners = (element, events, listenerFunction) => {
  events.forEach(event => {
    element.addEventListener(event, listenerFunction);
  });
}

export const addEscapeListener = listenerFunction => {
  document.addEventListener('keydown', e => {
    if (e.key === "Escape") {
      listenerFunction()
    }
  })
}

export const addEventListenerToSelector = (selector, eventListener, listenerFunction) => {
  return () => document.querySelectorAll(selector).forEach(element => {
    element.addEventListener(eventListener, () => listenerFunction(element))
  })
}

export const handleResize = () => window.addEventListener('resize', () => {
  document.querySelectorAll('[data-toggle="collapse"]').forEach(element => {
    let target = getTarget(element)

    if (!target) {
      return
    }

    element.setAttribute('aria-expanded', 'false');
    target.classList.remove('show');
    target.classList.remove('block');
    target.style.height = 'auto'
    target.style.overflow = ''
  })
})


export const waitForElement = (s) => {
  let d = document
  return new Promise(resolve => {
    if (d.querySelector(s)) {
      return resolve(d.querySelector(s));
    }
    const observer = new MutationObserver(mutations => {
      if (d.querySelector(s)) {
        resolve(d.querySelector(s));
        observer.disconnect();
      }
    });
    observer.observe(d.body, {childList: true,subtree: true});
  });
}

export const parseElementOptions = element => {
  let t = element.dataset.options
  return t ? JSON.parse(t.replaceAll("'", '"')) : {};
}

export const triggerEvent = (element, eventName) => {
  let event = document.createEvent("HTMLEvents");
  event.initEvent(eventName, true, true);
  event.eventName = eventName;
  element.dispatchEvent(event);
}
