// initialize Facebook SDK

window.fbAsyncInit = function() {
  FB.init({
    appId            : '1771779836370199',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.10'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

// START Facebook post image function
function postImageToFacebook(token, filename, mimeType, imageData, message) {
  var fd = new FormData()
  fd.append('access_token', token)
  fd.append('source', imageData)
  fd.append('caption', message)
  fd.append('no_story', false)

  // Upload image to facebook without story (post to feed)
  $.ajax({
    url: 'https://graph.facebook.com/me/photos?access_token' + token,
    type: 'POST',
    data: fd,
    processData: false,
    contentType: false,
    cache: false,
    success: function (data) {
      console.log('success: ', data)

      FB.api(
        '/me/photos',
        'POST',
        data
      )
    },
    error: function (shr, status, data) {
      console.log('error ' + data + ' Status ' + shr.status)
    },
    complete: function (data) {
      console.log('Post to facebook complete')
      console.log(data)
      window.open('http://facebook.com/me')
    }
  })
}
// END Facebook post image function