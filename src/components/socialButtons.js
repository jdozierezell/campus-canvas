import { saveAs } from '../js/file-saver.min'

import socialModal from './socialModal'

const downloadEl = document.createElement('button')
const facebookEl = document.createElement('button')
const twitterEl = document.createElement('button')
const socialButtons = document.createElement('div')
const canvasId = 'canvas'
const filename = 'whyIWalk'

// downloadEl attributes, listeners, and functions
downloadEl.id = 'download'
downloadEl.className = 'social-button'
downloadEl.textContent = 'Download'
downloadEl.addEventListener('click', () => {
  const canvas = document.getElementById(canvasId)
  canvas.toBlob((blob) => {
    saveAs(blob, filename)
  }, {
    type: 'image/jpeg',
  })
})

// facebookEl attributes and listeners
facebookEl.id = 'facebook'
facebookEl.className = 'social-button'
facebookEl.textContent = 'Facebook'
facebookEl.addEventListener('click', () => {
  const src = document.getElementById(canvasId).toDataURL('image/jpeg')
  socialModal('Facebook', src, filename)
})

// twitterEl attributes and listeners
twitterEl.id = 'twitter'
twitterEl.className = 'social-button'
twitterEl.textContent = 'Twitter'
twitterEl.addEventListener('click', () => {
  const src = document.getElementById(canvasId).toDataURL('image/jpeg')
  socialModal('Twitter', src, filename)
})

// socialButtons attributes
socialButtons.className = 'button-wrapper'

socialButtons.appendChild(facebookEl)
socialButtons.appendChild(twitterEl)
socialButtons.appendChild(downloadEl)

export default socialButtons
