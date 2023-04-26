//this file is for the character count of the text in the textarea

$(document).ready(function() {
  $( "#tweet-text" ).keyup(function(event) {
    let tweetlength = event.target.value.length;
    console.log(tweetlength);
    $(".counter").text (140 - tweetlength);
    if (tweetlength > 140 ) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "grey");
    }
    console.log(this);
  });
});