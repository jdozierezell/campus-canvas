import './style.css'

import imgLoader from './components/imgLoader'
import walkCanvas from './components/walkCanvas'
import socialButtons from './components/socialButtons'

// eslint-disable-next-line
require('script-loader!fabric') // require fabric library

const walkCanvasWrapper = document.createElement('div')
const backgroundImg = 'http://afsp.imgix.net/wp-content/uploads/2017/07/cw_background.png'
const titleImg = 'http://afsp.imgix.net/wp-content/uploads/2017/07/cw_titles.png'

walkCanvasWrapper.setAttribute('id', 'campus-canvas-wrapper')
walkCanvasWrapper.appendChild(imgLoader)
walkCanvasWrapper.appendChild(walkCanvas)
walkCanvasWrapper.appendChild(socialButtons)
document.getElementById('app-container').appendChild(walkCanvasWrapper)

const canvas = new fabric.Canvas(walkCanvas.id, {
  width: 1080,
  height: 1080,
})

document.getElementById('canvas').fabric = canvas // create canvas object as an attribute on the actual canvas

const text = new fabric.IText('Type Your Message', {
  originX: 'center',
  originY: 'center',
  textAlign: 'center',
  hoverCursor: 'text',
  left: 525,
  top: 825,
  width: 300,
  fontFamily: 'Permanent Marker',
  fontSize: 50,
  hasBorders: false,
  hasControls: false,
  lockMovementX: true,
  lockMovementY: true,
  id: 'text',
})
canvas.add(text)

// create the background for the canvas
fabric.Image.fromURL(backgroundImg, (image) => {
  canvas.add(image)
  canvas.sendToBack(image) // make sure the background stays on bottom
  canvas.bringToFront(text) // make sure text stays on top
}, {
  crossOrigin: 'anonymous',
  selectable: false,
  id: 'background',
})

// create the titles for the canvas
fabric.Image.fromURL(titleImg, (image) => {
  canvas.add(image)
  canvas.bringToFront(text) // make sure text stays on top
}, {
  crossOrigin: 'anonymous',
  selectable: false,
  id: 'titles',
})

text.on('changed', function changedText() {
  // set left position to canvas width minus text width and add half of text width 
  // because position is calculated from center of text due to 
  // originX: 'center' setting on text declaration
  this.left = ((1080 - this.width) / 2) + (this.width / 2)
  if (this.width >= 635) {
    const newText = this.text.slice(0, -1)
    this.text = newText
    this.hiddenTextarea.value = newText
  }
})
