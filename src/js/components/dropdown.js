import { addEventListeners, addEscapeListener } from '../utils'

export default () => document.querySelectorAll('[data-toggle="dropdown"]').forEach(trigger => {

  const {computePosition, shift, offset} = window.FloatingUIDOM;
  const target = trigger.nextElementSibling;
  const parent = trigger.parentElement;
  const options = eval('(' + trigger.dataset.options + ')' || '') || {};

  let middleware = [
    offset(6),
    shift({
      padding: 5,
    }),
  ];

  function update() {
    computePosition(trigger, target, {
      placement: options.placement || 'bottom',
      middleware,
    }).then(({ x, y }) => {
      Object.assign(target.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  const show = () => {
    target.style.display = 'block';
    requestAnimationFrame(() => {
      target.classList.add('opacity-100', 'visible');
    });
    update();
  };

  const hide = () => {
    target.style.display = '';
    target.classList.remove('opacity-100', 'visible');
  };

  const toggle = () => {
    if (target.style.display === 'block') {
      hide();
      return;
    }
    show();
  };

  parent.addEventListener('focusout', (e) => {
    if (parent.contains(e.relatedTarget) || !document.hasFocus()) {
      return
    };
    hide()
  });
  addEventListeners(trigger, ['click'], toggle)
  addEscapeListener(hide)
})
