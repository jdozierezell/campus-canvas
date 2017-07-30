import dataURItoBlob from './dataURI' // require data URI function

export default function postCanvasToTwitter(src, tweet) {
  // Convert Base64 to binary
  var file = dataURItoBlob(src)
  // Open a tweet popup and autopopulate with data
  OAuth.popup('twitter').then(function (result) {
    var data = new FormData()
    // Tweet text
    data.append('status', tweet)
    // Tweet image
    data.append('media[]', file, 'image.jpeg')
    // Post to Twitter as an update with media
    return result.post('/1.1/statuses/update_with_media.json', {
      data: data,
      cache: false,
      processData: false,
      contentType: false
    })
  // Success/Error Logging
  }).done(function (data) {
    // var str = JSON.stringify(data, null, 2)
    console.log('Success')
    window.open('http://twitter.com')
  }).fail(function (e) {
    var str = JSON.stringify(e, null, 2)
    console.log('Fail: ', str)
  })
}