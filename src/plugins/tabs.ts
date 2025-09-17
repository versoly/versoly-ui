import { addEventListenerToSelector, getElementBySelector } from '../utils/index';

const Tabs = (element: HTMLElement) => {
  if (element.getAttribute('aria-selected') === 'true') {
    return null;
  }

  const target = getElementBySelector(`[aria-labelledby="${element.getAttribute('aria-controls')}"]`);
  if (!target) {
    return null;
  }

  const inactiveClass = element.classList.value;

  let tablist: ParentNode | null = element.parentNode;
  while (tablist && (!(tablist instanceof HTMLElement) || tablist.getAttribute('role') !== 'tablist')) {
    tablist = tablist.parentNode;
  }
  if (!(tablist instanceof HTMLElement)) {
    return null;
  }

  const activeTabs = tablist.querySelectorAll('[aria-selected="true"]');
  if (!activeTabs || activeTabs.length === 0) {
    return null;
  }
  const activeClass = activeTabs[0].classList.value;

  tablist.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.classList = inactiveClass;
    tab.setAttribute('aria-selected', 'false');
  });

  element.classList = activeClass;
  element.setAttribute('aria-selected', 'true');

  if (target.getAttribute('role') === 'tabcontent') {
    Array.from(target.children).forEach((n) => {
      if (n.getAttribute('role') === 'tabpanel') {
        n.classList.remove('hidden');
      }
    });
    return;
  }

  if (!target.parentNode) {
    return null;
  }

  Array.from(target.parentNode.children).forEach((n) => {
    if (n.getAttribute('role') === 'tabpanel') {
      n.classList.add('hidden');
    }
  });

  target.classList.remove('hidden');
};

export const tabs = addEventListenerToSelector('[role="tab"]', 'click', Tabs);
