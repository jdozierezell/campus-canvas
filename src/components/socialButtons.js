import { saveAs } from '../js/file-saver.min.js'

import socialModal from './socialModal'

const downloadEl = document.createElement('button'),
      facebookEl = document.createElement('button'),
      twitterEl = document.createElement('button'),
      socialButtons = document.createElement('div'),
      canvasId = 'canvas',
      filename = 'whyIWalk'

// downloadEl attributes, listeners, and functions
downloadEl.id = 'download'
downloadEl.className = 'social-button'
downloadEl.textContent = 'Download'
downloadEl.addEventListener('click', e => {
  const canvas = document.getElementById(canvasId)
  console.log(canvas)
  canvas.toBlob(function (blob) {
    saveAs(blob, filename)
  }, {
    type: 'image/jpeg'
  })
})

// facebookEl attributes and listeners
facebookEl.id = 'facebook'
facebookEl.className = 'social-button'
facebookEl.textContent = 'Facebook'
facebookEl.addEventListener('click', e => {
  const src = document.getElementById(canvasId).toDataURL('image/jpeg')
  socialModal('Facebook', src, filename)
  // console.log(src)
})

// twitterEl attributes and listeners
twitterEl.id = 'twitter'
twitterEl.className = 'social-button'
twitterEl.textContent = 'Twitter'
twitterEl.addEventListener('click', e => {
  const src = document.getElementById(canvasId).toDataURL('image/jpeg')
  socialModal('Twitter', src, filename)
})

// socialButtons attributes
socialButtons.className = 'button-wrapper'

socialButtons.appendChild(downloadEl)
socialButtons.appendChild(facebookEl)
socialButtons.appendChild(twitterEl)

export default socialButtons