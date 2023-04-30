//this file is for the character count of the text in the textarea

$(document).ready(function() {
  $( "#tweet-text" ).keyup(function(event) {
    let tweetlength = event.target.value.length;  //find the length of the text
    $(".counter").text (140 - tweetlength);
    if (tweetlength > 140 ) {                     //checking for text length
      $(".counter").css("color", "red");          // If length greater than 104 then the text will show in red color
    } else {
      $(".counter").css("color", "grey");
    }
  });
});