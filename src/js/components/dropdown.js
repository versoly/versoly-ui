import { addEventListeners, addEscapeListener } from '../utils'

export default () => document.querySelectorAll('[data-toggle="dropdown"]').forEach(element => {
  let dropdown = element.nextSibling.nextSibling
  // let dropdownHeight = dropdown && dropdown.offsetHeight
  // console.log(dropdown)

  function toggle() {
    if (dropdown.className.includes('show')) {
      hide()
      return
    }
    dropdown.classList.add('block')
    // dropdown.classList.remove('hidden')

    window.setTimeout(() => {
      dropdown.classList.toggle('show')
    }, 50)

    // if (dropdown.getAttribute('class').includes('show')) {
    //   document.getElementById('nav').style.height = document.getElementById('nav').offsetHeight + dropdownHeight + 'px'
    //   dropdown.style.height = dropdownHeight + 'px'
    // }
    // else {
    //   dropdown.style.height = '0px'
    // }
    // setTimeout(() => dropdown.classList.toggle('block'), 1000)
    // dropdown.style.position = 'absolute';
  }

  function hide() {
    dropdown.classList.remove('show');

    window.setTimeout(() => {
      // dropdown.classList.add('hidden');
      dropdown.classList.remove('block')
    }, 300)

    // if (dropdown.getAttribute('class').includes('show')) {
    //   document.getElementById('nav').style.height = document.getElementById('nav').offsetHeight - dropdownHeight + 'px'
    //   dropdown.style.height = '0px'
    //   dropdown.style.padding = 0
    //   dropdown.style.width = '0px'
    // }
  }

  addEventListeners(element, ['click'], toggle);
  // addEventListeners(element, ['blur'], hide);

  addEventListeners(element, ['focus', 'mouseenter'], () => {
    let popperInstance = Popper.createPopper(element, dropdown, {
      placement: 'bottom-start',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
      ]
    });
    dropdown.classList.add('block')
    popperInstance.forceUpdate()
    popperInstance.update()

    window.setTimeout(() => {
      if (!dropdown.getAttribute('class').includes('show')) {
        dropdown.classList.remove('block')
      }
    }, 50)
  });

  addEventListeners(element, ['blur', 'mouseleave'], () => {
    if (!dropdown.getAttribute('class').includes('show')) {
      dropdown.classList.remove('block')
    }
  });
  addEscapeListener(hide)

  const handleDropdownOutsideClick = (event) => {
    const targetElement = event.target; // clicked element
    if (targetElement !== dropdown && targetElement !== element && !element.contains(targetElement)) {
        hide()
    }
  }

  document.body.addEventListener('click', handleDropdownOutsideClick);
})
