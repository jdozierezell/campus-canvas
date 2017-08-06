import dataURItoBlob from './dataURI' // require data URI function

export default function postCanvasToTwitter(src, tweet) {
  // Convert Base64 to binary
  const file = dataURItoBlob(src)
  // Open a tweet popup and autopopulate with data
  OAuth.popup('twitter').then((result) => {
    const data = new FormData()
    // Tweet text
    data.append('status', tweet)
    // Tweet image
    data.append('media[]', file, 'image.jpeg')
    // Post to Twitter as an update with media
    return result.post('/1.1/statuses/update_with_media.json', {
      data,
      cache: false,
      processData: false,
      contentType: false,
    })
  // Success/Error Logging
  }).done(() => {
    window.open('http://twitter.com')
  }).fail((e) => {
    const str = JSON.stringify(e, null, 2)
    // eslint-disable-next-line no-console
    console.log('Fail: ', str)
  })
}
