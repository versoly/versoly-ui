import { addEventListenerToSelector } from '../utils'

const tabs = element => {
  if (element.getAttribute("aria-selected") === 'true') {
    return null
  }

  let target = document.querySelector(`[aria-labelledby="${element.getAttribute('aria-controls')}"]`)
  if (!target) {
    return null
  }

  let inactiveClass = element.classList.value

  let tablist = element.parentNode
  while (tablist && tablist.getAttribute('role') !== 'tablist') {
    tablist = tablist.parentNode
  }

  let activeTabs = tablist.querySelectorAll('[aria-selected="true"]')
  if (!activeTabs || activeTabs.length === 0) {
    return null
  }
  let activeClass = activeTabs[0].classList.value;

  tablist.querySelectorAll('[role="tab"]').forEach(tab => {
    tab.classList = inactiveClass
    tab.setAttribute('aria-selected', 'false')
  });

  element.classList = activeClass;
  element.setAttribute('aria-selected', 'true');

  if (target.getAttribute('role') === 'tabcontent') {
    [...target.children].forEach(n => {
      if (n.getAttribute('role') === 'tabpanel') {
        n.classList.remove('hidden')
      }
    })
    return
  }

  [...target.parentNode.children].forEach(n => {
    if (n.getAttribute('role') === 'tabpanel') {
      n.classList.add('hidden')
    }
  })

  target.classList.remove('hidden')
}

const Tabs = addEventListenerToSelector('[role="tab"]', 'click', tabs)
export default Tabs
