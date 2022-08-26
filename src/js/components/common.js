import accordion from './accordion'
import dismiss from './dismiss'
import collapse from './collapse'
import dropdown from './dropdown'
import modal from './modal'
import tabs from './tabs'
import { handleResize } from '../utils'

(function() {
window.vInitialized = false
window.initializeVUI = () => {
  if (window.vInitialized) {
    return
  }
  window.vInitialized = true
  accordion()
  collapse()
  dismiss()
  dropdown()
  modal()
  tabs()

  handleResize()
}

document.addEventListener('DOMContentLoaded', initializeVUI)
if (document.readyState !== "loading") {
  initializeVUI()
}
})();