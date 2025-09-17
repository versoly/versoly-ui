import type { IAccordionOptions } from 'src/types';
import {
  addEventListeners,
  getDuration,
  getElementsBySelectors,
  getElementsByToggle,
  getIsAriaExpanded,
  parseElementOptions,
} from '../utils/index';

interface IAccordionItem {
  trigger: HTMLElement;
  target: HTMLElement;
}

const handleOpen = (trigger: HTMLElement, target: HTMLElement, duration: number) => {
  target.style.overflow = 'hidden';
  target.style.height = '0';

  trigger.setAttribute('aria-expanded', 'true');
  target.classList.add('block');
  target.classList.add('show');
  target.classList.remove('hidden');

  window.setTimeout(() => {
    target.style.height = `${target.scrollHeight}px`;
  }, 33);

  window.setTimeout(() => {
    target.style.overflow = '';
  }, duration);
};

const handleClose = (trigger: HTMLElement, target: HTMLElement, duration: number) => {
  target.style.overflow = 'hidden';
  target.style.height = '0';

  trigger.setAttribute('aria-expanded', 'false');
  target.classList.remove('show');

  window.setTimeout(() => {
    target.classList.remove('block');
    target.classList.add('hidden');
  }, duration);
};

const Accordion = (element: HTMLElement) => {
  const options: IAccordionOptions = {
    min: 0,
    max: null,
    ...parseElementOptions(element),
  };
  const { min, max } = options;

  const canOpenMultiple = max === null;

  const items: IAccordionItem[] = getElementsBySelectors('.accordion-item [aria-expanded]', element).reduce(
    (acc: IAccordionItem[], trigger) => {
      const item = trigger.closest('.accordion-item');
      const target = item?.querySelector('.accordion-collapse');
      if (item && target instanceof HTMLElement) {
        acc.push({ trigger, target });
      }
      return acc;
    },
    [],
  );

  const getOpenCount = () => items.filter(({ trigger }) => getIsAriaExpanded(trigger)).length;

  const toggle = ({ trigger, target }: IAccordionItem) => {
    const isOpen = getIsAriaExpanded(trigger);
    const duration = getDuration(target);

    if (canOpenMultiple === false && getOpenCount() === min && isOpen) {
      return;
    }

    if (!isOpen) {
      handleOpen(trigger, target, duration);
    }

    if (canOpenMultiple === false) {
      items.forEach((item) => {
        if (!isOpen && item.trigger === trigger) {
          return;
        }
        handleClose(item.trigger, item.target, duration);
      });
    } else if (isOpen) {
      handleClose(trigger, target, duration);
    }
  };

  items.forEach((item) => {
    addEventListeners(item.trigger, ['click'], () => toggle(item));
  });

  if (min === 1 && getOpenCount() === 0 && items.length > 0) {
    items[0].trigger.click();
  }
};

export const accordion = () => {
  // legacy support for accordion via data attributes on headers
  getElementsBySelectors('.accordion-header[data-toggle=accordion]').forEach((element) => {
    const parentAccordion = element.closest('.accordion');
    if (parentAccordion) {
      parentAccordion.setAttribute('data-toggle', 'accordion');

      if (element.hasAttribute('data-parent') && !parentAccordion.hasAttribute('data-options')) {
        parentAccordion.setAttribute('data-options', "{'min': 1, 'max': 1}");
      }
      return;
    }

    element.removeAttribute('data-toggle');
  });

  getElementsByToggle('accordion').forEach(Accordion);
};
