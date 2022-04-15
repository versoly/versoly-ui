import { waitForElement, parseElementOptions, addEventListenerToSelector } from '../utils'


const defaults = {
  closeButton: 'fixed right-0 top-0 z-50 text-white px-5 close'
}

  // if (element.getAttribute('aria-label')) {
  //   return
  // }
  // element.setAttribute('aria-label', 'modal')

const addModal = (element) => {
  const options = parseElementOptions(element)
  const {size, beforeShown} = options
  const id = options.id || 'v-modal'
  let content = element.dataset.html || ''

  if (options.imgSrc) {
    content = `<img src="${options.imgSrc}">`
  }
  if (options.iframeSrc) {
    content = `<iframe allow="autoplay" class="aspect-video w-full" src="${options.iframeSrc}" allowfullscreen="" autoplay=""></iframe>`
  }

  let modalHTML = `<div class="modal" id="${id}">
  <div class="modal-content ${size ? `modal-${size}` : ''}">
    ${content}
  </div>

  <button onclick="removeModal('${id}')" type="button" class="${defaults.closeButton}" data-dismiss="modal" aria-label="Close">
    <span class="text-4xl" aria-hidden="true">&times;</span>
  </button>

  <div class="modal-bg" onclick="removeModal('${id}')"></div>
</div>
`;

  document.addEventListener('keydown', e => e.keyCode == 27 && window.removeModal(id))
  document.body.style.overflow = 'hidden'
  document.body.insertAdjacentHTML('beforeend', modalHTML)

  waitForElement('#' + id).then(ele => {
    beforeShown && window[beforeShown]()
    window.setTimeout(() => ele.classList.add('opacity-100'), 32)
  })
}

const removeModal = (id='v-modal') => {
  let modal = document.getElementById(id)
  modal.classList.remove('opacity-100')
  window.setTimeout(() => {
    modal.remove()
    document.body.style.overflow = ''
  }, 500)
}

window.removeModal = removeModal
const Modals = addEventListenerToSelector('[data-toggle="modal"]', 'click', addModal)
export default Modals
