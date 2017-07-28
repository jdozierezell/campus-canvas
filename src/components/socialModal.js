require('script-loader!../js/socialFunctions/dataURI.js') // require data URI function
require('script-loader!../js/socialFunctions/facebook.js') // require facebook

export default function socialModal (network, image) {
  console.log(network)

  // network specific configs
  let message
  if (network === 'Facebook') {
    message = 'You may customize your message below by editing the text provided. Please note that clicking "Post to Facebook" will directly post the image to your social feed. A new window will open in your browser so that you can view the post in your feed. Depending on Facebook\'s traffic, this can take a second or two. Please do not click twice on the button as that will cause Facebook to post twice.'
  } else if (network === 'Twitter') {
    message = 'You may customize your tweet below by editing the text provided. Please note that clicking "Post to Twitter" will directly post the image to your social feed. Tweets are limited to 140 characters. A new window will open in your browser so that you can view the post in your feed.'
  }

  // create modal framework
  const modal = document.createElement('div'),
        modalOverlay = document.createElement('div')
  modal.className = 'modal shareable__modal'
  modal.id = `${network}-modal`
  modalOverlay.className = 'modal__overlay'
  modalOverlay.id = 'modal-overlay'


  // create modal innards
  const modalHeader = document.createElement('h2'),
        modalBody = document.createElement('p'),
        userMessage = document.createElement('textarea'),
        backButton = document.createElement('button'),
        postButton = document.createElement('button')

  modalHeader.className = 'modal__header'
  modalHeader.textContent = `Customize your message and send to ${network}`
  modalBody.textContent = message
  userMessage.id = `${network}-message`
  userMessage.setAttribute('rows', '5')
  userMessage.setAttribute('cols', '5')
  if (network === 'Twitter') {
    userMessage.setAttribute('maxlength', '140')
  }
  backButton.className = 'modal__button'
  backButton.id = `${network}-back`
  backButton.textContent = 'Back'
  postButton.className = 'modal__button'
  postButton.id = `${network}-post`
  postButton.textContent = `Post to ${network}`

  postButton.addEventListener('click', e => {
    const message = userMessage.value
    try {
      blob = dataURItoBlob(image)
    } catch (e) {
      console.log(e)
    }
  })

  // add innards to modal
  modal.appendChild(modalHeader)
  modal.appendChild(modalBody)
  modal.appendChild(userMessage)
  modal.appendChild(backButton)
  modal.appendChild(postButton)

  // add modal to body
  document.body.appendChild(modalOverlay)
  document.body.appendChild(modal)
}