export default function postCanvasToFacebook(token, filename, mimeType, imageData, message) {
  const fd = new FormData()
  fd.append('access_token', token)
  fd.append('source', imageData)
  fd.append('caption', message)
  fd.append('no_story', false)
  // Upload image to facebook without story (post to feed)
  $.ajax({
    url: `https://graph.facebook.com/me/photos?access_token=${token}`,
    type: 'POST',
    data: fd,
    processData: false,
    contentType: false,
    cache: false,
    success: function success(data) {
      FB.api(
        '/me/photos',
        'POST',
        data,
      )
    },
    error: function error(shr, status, data) {
      // eslint-disable-next-line no-console
      console.log(`error ${data} Status ${shr.status}`)
    },
    complete: function complete() {
      window.open('http://facebook.com/me')
    },
  })
}
