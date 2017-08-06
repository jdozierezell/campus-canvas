import walkCanvas from './walkCanvas'

// eslint-disable-next-line
require('script-loader!fabric') // require fabric library

const imgLoader = document.createElement('input')
imgLoader.className = 'canvas-input'
imgLoader.setAttribute('type', 'file')
imgLoader.setAttribute('id', 'imgLoader')

imgLoader.addEventListener('change', (e) => {
  let canvas = walkCanvas.id
  canvas = document.getElementById(walkCanvas.id)
  canvas = canvas.fabric // get canvas object
  const files = e.target.files || e.dataTransfer.files // get uploaded file(s)
  const reader = new FileReader() // create new file reader
  reader.onload = () => { // reader load event
    const backgroundObj = new Image() // create new image object
    backgroundObj.src = e.target.result // assign uploaded image to new image object
    backgroundObj.onload = () => { // image load event
      const objects = canvas.getObjects() // get array of all canvas objects
      const background = new fabric.Image(backgroundObj) // create new image from uploaded object
      for (let i = 0; i < objects.length; i += 1) { // loop through canvas objects
        if (objects[i].id === 'background') { // if object in loop is background
          objects[i].remove() // remove background object
          break
        }
      }
      // create some useful variables
      let scale
      let width
      let height

      // set scale, width, and height for tall/square image
      if (background.width <= background.height) {
        scale = background.width / canvas.width
        width = canvas.width
        height = background.height / scale
      } else { // set scale, width, and height for wide image
        scale = background.height / canvas.height
        height = canvas.height
        width = background.width / scale
      }
      background.set({ // set background options including id
        width,
        height,
        id: 'background',
      })
      canvas.add(background) // add background
      background.center() // center background
      background.setCoords() // set background's coordinates after center
      canvas.sendToBack(background) // send background to back
    }
  }
  reader.readAsDataURL(files[0])
})

export default imgLoader
