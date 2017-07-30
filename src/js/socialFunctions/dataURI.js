// turns the data URI into a Blob object

export default function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1])
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], {type: 'image/jpeg'})
}