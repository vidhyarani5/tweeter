/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//Will take an array of tweet objects and then appending each one to the #tweets-container.
const renderTweets = function(tweets) {
  for (const tweet in tweets) {
    const tweetdata = createTweetElement(tweets[tweet]);
    $('#containertweet').prepend(tweetdata);
  }
}

const createTweetElement = function(tweet) {
  let $tweet =
  `<article class = "bordertweet">
    <header class = "headertweet">
      <img class = "headeruserphoto" src= "${tweet.user.avatars}"></img>
      <span class="headername">${tweet.user.name}</span>
      <span class="headerusername">${tweet.user.handle}</span>
    </header>
    <p class="tweetsentence">${tweet.content.text}</p>
    <span class = "tweetline"></span>
    <footer class = "footertweet">
      <a> ${timeago.format(tweet.created_at)} </a>
      <div class = "tweetbuttons">
        <button class = "btn"><i class="fa-solid fa-flag"></i></button>
        <button class = "btn"><i class="fa-solid fa-retweet"></i></button>
        <button class = "btn"><i class="fa-solid fa-heart"></i></button>
      </div>
    </footer>
  </article>`
  return $tweet;

}

$(document).ready(function() {
    $(".tweetsubmit").submit(function(event) {
      event.preventDefault();
      if ($("#tweet-text").val().length > 140) {
        alert('Tweets must be less than 140 characters');
      } else if ($("#tweet-text").val().length === 0) {
        alert('Text feild cannot be empty');
      } else {
          $.post('/tweets', $(this).serialize()).then(function() {
              $.ajax('/tweets', {method: 'GET'}).then(function(data) {
                  const tweetdata = createTweetElement(data[data.length-1]);
                  $('#containertweet').prepend(tweetdata);
            });
          });
      }
    }); 
  }); 

function loadTweets() {
  $.ajax('/tweets', {method: 'GET'})
  .then(function(data) {
    renderTweets(data);
  });
}
loadTweets();
