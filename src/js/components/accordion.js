import { getTarget, getDuration, addEventListeners, addEscapeListener, addEventListenerToSelector } from '../utils'

const accordion = (element) => {
  let target = element.closest('.accordion-item').querySelector('.accordion-collapse')
  const duration = getDuration(target)

  target.style.overflow = 'hidden'
  target.style.height = 0

  if (element.getAttribute('aria-expanded') === 'true') {
    element.setAttribute('aria-expanded', 'false');
    target.classList.remove('show');

    window.setTimeout(() => {
      target.classList.remove('block');
      target.classList.add('hidden');
    }, duration)
    return
  }
  element.setAttribute('aria-expanded', 'true');
  target.classList.add('block');
  target.classList.add('show');
  target.classList.remove('hidden');

  window.setTimeout(() => {
    target.style.height = target.scrollHeight + 'px'
  }, 33)

  window.setTimeout(() => {
    target.style.overflow = ''
  }, duration)
}

const Accordion = addEventListenerToSelector('[data-toggle="accordion"]', 'click', accordion)
export default Accordion
