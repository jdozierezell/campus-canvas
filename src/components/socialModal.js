import dataURItoBlob from '../js/socialFunctions/dataURI' // require data URI function
import postCanvasToTwitter from '../js/socialFunctions/twitter' // require twitter function
import postCanvasToFacebook from '../js/socialFunctions/facebook' // require facebook function

/* eslint-disable */
require('script-loader!../js/canvas-toBlob.js') // require canvas-toBlob functions
require('script-loader!../js/socialFunctions/oauth.min.js') // require oauth
require('script-loader!../js/socialFunctions/facebookSDK.js') // require facebook functions
/* eslint-enable */

export default function socialModal(network, image, filename) {
  // network specific configs
  let message
  if (network === 'Facebook') {
    message = 'You may customize your message below by editing the text provided. Please note that clicking "Post to Facebook" will directly post the image to your social feed. A new window will open in your browser so that you can view the post in your feed. Depending on Facebook\'s traffic, this can take a second or two. Please do not click twice on the button as that will cause Facebook to post twice.'
  } else if (network === 'Twitter') {
    message = 'You may customize your tweet below by editing the text provided. Please note that clicking "Post to Twitter" will directly post the image to your social feed. Tweets are limited to 140 characters. A new window will open in your browser so that you can view the post in your feed.'
  }

  const existingModal = document.getElementById(`${network}-modal`)

  if (!existingModal) { // if this is the first time we're trying to post
    // create modal
    const modal = document.createElement('div')
    modal.className = 'modal shareable__modal'
    modal.id = `${network}-modal`

    // create modal innards
    const modalHeader = document.createElement('h2')
    const modalBody = document.createElement('p')
    const userMessage = document.createElement('textarea')
    const backButton = document.createElement('button')
    const postButton = document.createElement('button')

    modalHeader.className = 'modal__header'
    modalHeader.textContent = `Customize your message and send to ${network}`
    modalBody.className = 'modal__body'
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

    postButton.addEventListener('click', () => {
      message = userMessage.value
      let blob = {}
      if (network === 'Facebook') {
        try {
          blob = dataURItoBlob(image)
          console.log(blob)
        } catch (e) {
          console.log(e)
        }
        FB.getLoginStatus((response) => {
          if (response.status === 'connected') {
            postCanvasToFacebook(response.authResponse.accessToken, filename, 'image/jpeg', blob, message)
          } else if (response.status === 'not_authorized') {
            FB.login(() => {
              postCanvasToFacebook(response.authResponse.accessToken, filename, 'image/jpeg', blob, message)
            }, { scope: 'publish_actions' })
          } else {
            FB.login(() => {
              postCanvasToFacebook(response.authResponse.accessToken, filename, 'image/jpeg', blob, message)
            }, { scope: 'publish_actions' })
          }
        })
      } else if (network === 'Twitter') {
        OAuth.initialize('Zw8PiMk6fP8HN49YN4I0YYI_1IE')
        postCanvasToTwitter(image, message)
      }
    })

    backButton.addEventListener('click', () => {
      document.getElementById(`${network}-modal`).style.display = 'none'
      document.getElementById('modal-overlay').style.display = 'none'
    })

    // add innards to modal
    modal.appendChild(modalHeader)
    modal.appendChild(modalBody)
    modal.appendChild(userMessage)
    modal.appendChild(backButton)
    modal.appendChild(postButton)

    if (!document.getElementById('modal-overlay')) {
      // create modal overlay and add to body
      const modalOverlay = document.createElement('div')
      modalOverlay.className = 'modal__overlay'
      modalOverlay.id = 'modal-overlay'
      document.body.appendChild(modalOverlay)
    } else {
      document.getElementById('modal-overlay').style.display = 'initial'
    }

    // add modal to body
    document.body.appendChild(modal)
  } else { // if we've tried posting before
    document.getElementById(`${network}-modal`).style.display = 'initial'
    document.getElementById('modal-overlay').style.display = 'initial'
  }
}
