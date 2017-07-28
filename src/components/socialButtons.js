import { saveAs } from '../js/file-saver.min.js'

require('script-loader!../js/canvas-toBlob.js')

const downloadEl = document.createElement('button'),
      facebookEl = document.createElement('button'),
      twitterEl = document.createElement('button'),
      socialButtons = document.createElement('div'),
      canvasId = 'canvas'

// downloadEl attributes, listeners, and functions
downloadEl.id = 'download'
downloadEl.textContent = 'Download'
downloadEl.addEventListener('click', e => {
  const canvas = document.getElementById(canvasId)
  console.log(canvas)
  canvas.toBlob(function (blob) {
    saveAs(blob, 'my_file')
  }, {
    type: 'image/jpeg'
  })
})

// facebookEl attributes and listeners
facebookEl.id = 'facebook'
facebookEl.textContent = 'Facebook'
facebookEl.addEventListener('click', e => {
  console.log('Facebook clicked')
})

// twitterEl attributes and listeners
twitterEl.id = 'twitter'
twitterEl.textContent = 'Twitter'
twitterEl.addEventListener('click', e => {
  console.log('Twitter clicked')
})

// socialButtons attributes
socialButtons.id = 'button-wrapper'

socialButtons.appendChild(downloadEl)
socialButtons.appendChild(facebookEl)
socialButtons.appendChild(twitterEl)

export default socialButtons