import type { IModalOptions } from 'src/types';
import { waitForElement, parseElementOptions, addEventListenerToSelector, addEscapeListener } from '../utils';

const defaults = {
  closeButton: 'fixed right-0 top-0 z-50 text-white px-5 close',
};

// if (element.getAttribute('aria-label')) {
//   return
// }
// element.setAttribute('aria-label', 'modal')

const Modal = (element: HTMLElement) => {
  const options: IModalOptions = {
    id: 'v-modal',
    size: undefined,
    beforeShown: undefined,
    imgSrc: undefined,
    iframeSrc: undefined,
    ...parseElementOptions(element),
  };

  const { size, beforeShown, id, imgSrc, iframeSrc } = options;

  let content = element.dataset.html || '';

  if (imgSrc) {
    content = `<img src="${imgSrc}">`;
  }
  if (iframeSrc) {
    content = `<iframe allow="autoplay" class="aspect-video w-full" src="${iframeSrc}" allowfullscreen="" autoplay=""></iframe>`;
  }

  const modalHTML = `<div class="modal" id="${id}">
  <div class="modal-content ${size ? `modal-${size}` : ''}">
    ${content}
  </div>
  
  <button class="${defaults.closeButton}" onclick="removeModal('${id}')" type="button" data-dismiss="modal" aria-label="Close">
    <span class="text-4xl" aria-hidden="true">&times;</span>
  </button>

  <div class="modal-bg" onclick="removeModal('${id}')"></div>
</div>
`;

  addEscapeListener(() => window.removeModal(id));
  document.body.style.overflow = 'hidden';
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  waitForElement(`#${id}`).then((ele) => {
    beforeShown && (window as any)[beforeShown]();
    window.setTimeout(() => ele.classList.add('opacity-100'), 32);
  });
};

const removeModal = (id = 'v-modal') => {
  const modal = document.getElementById(id);

  if (!modal) {
    return;
  }

  modal.classList.remove('opacity-100');
  window.setTimeout(() => {
    modal.remove();
    document.body.style.overflow = '';
  }, 500);
};

window.removeModal = removeModal;

export const modal = addEventListenerToSelector('[data-toggle="modal"]', 'click', Modal);
