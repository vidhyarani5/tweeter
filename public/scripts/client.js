/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//Will take an array of tweet objects and then appending each one to the #tweets-container.
const renderTweets = function(tweets) {
  for (const tweet in tweets) {
    const tweetdata = createTweetElement(tweets[tweet]);
    $('#container-tweet').prepend(tweetdata);
  }
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  let $tweet =
  `<article class = "border-tweet">
    <header class = "header-tweet">
      <img class = "header-userphoto" src= "${tweet.user.avatars}"></img>
      <span class="header-name">${tweet.user.name}</span>
      <span class="header-username">${tweet.user.handle}</span>
    </header>
    <p class="tweet-sentence">${escape(tweet.content.text)}</p>
    <span class = "tweet-line"></span>
    <footer class = "footer-tweet">
      <a> ${timeago.format(tweet.created_at)} </a>
      <div class = "tweet-button">
        <button class = "btn"><i class="fa-solid fa-flag"></i></button>
        <button class = "btn"><i class="fa-solid fa-retweet"></i></button>
        <button class = "btn"><i class="fa-solid fa-heart"></i></button>
      </div>
    </footer>
  </article>`
  return $tweet;

}

$(document).ready(function() {
    $(".tweet-submit").submit(function(event) {
      event.preventDefault();
      if ($("#tweet-text").val().length > 140) {
        alert('Tweets must be less than 140 characters');
      } else if ($("#tweet-text").val().length === 0) {
        alert('Text feild cannot be empty');
      } else {
          $.post('/tweets', $(this).serialize()).then(function() {
              $.ajax('/tweets', {method: 'GET'}).then(function(data) {
                  const tweetdata = createTweetElement(data[data.length-1]);
                  $('#container-tweet').prepend(tweetdata);
                  document.getElementById("tweet-text").value = '';
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
