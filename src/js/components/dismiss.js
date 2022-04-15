import { getDuration, getTarget, addEventListenerToSelector } from '../utils'

const dismiss = element => {
  let target = getTarget(element)
  if (!target) {
    target = element.closest(`.${element.getAttribute('data-dismiss')}`)
  }
  target.classList.add('opacity-0')
  setTimeout(() => target.remove(), getDuration(target))
}

const Dismiss = addEventListenerToSelector('[data-dismiss]', 'click', dismiss)
export default Dismiss
