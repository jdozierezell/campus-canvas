import './style.css'

import imgLoader from './components/imgLoader'
import walkCanvas from './components/walkCanvas'
import socialButtons from './components/socialButtons'

require('script-loader!fabric') // require fabric library

const walkCanvasWrapper = document.createElement('div'),
      backgroundImg = 'http://afsp.imgix.net/wp-content/uploads/2017/07/cw_background.png',
      titleImg = 'http://afsp.imgix.net/wp-content/uploads/2017/07/cw_titles.png'

walkCanvasWrapper.setAttribute('id', 'campus-canvas-wrapper')
walkCanvasWrapper.appendChild(imgLoader)
walkCanvasWrapper.appendChild(walkCanvas)
walkCanvasWrapper.appendChild(socialButtons)
document.body.appendChild(walkCanvasWrapper)

const canvas = new fabric.Canvas(walkCanvas.id, {
  width: 1080,
  height: 1080
})

document.getElementById('canvas').fabric = canvas // create canvas object as an attribute on the actual canvas

const text = new fabric.IText('sample', {
  originX: 'center',
  originY: 'center',
  textAlign: 'center',
  hoverCursor: 'text',
  left: 540,
  top: 825,
  maxWidth: 200,
  fontFamily: 'Permanent Marker',
  fontSize: 50,
  hasBorders: false,
  hasControls: false,
  lockMovementX: true,
  lockMovementY: true
})
canvas.add(text)

const background = fabric.Image.fromURL(backgroundImg, image => {
  canvas.add(image)
  canvas.sendToBack(image) // make sure the background stays on bottom
  canvas.bringToFront(text) // make sure text stays on top
}, {
  crossOrigin: 'anonymous',
  selectable: false,
  id: 'background'
})

const titles = fabric.Image.fromURL(titleImg, image => {
  canvas.add(image)
  canvas.bringToFront(text) // make sure text stays on top
}, {
  crossOrigin: 'anonymous',
  selectable: false,
  id: 'titles'
})