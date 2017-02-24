console.log("The Bot is Starting");


var Twit = require("twit");

var T = new Twit({
  consumer_key:         'UqxZitdHtCyA7jRFwlryJSYqR',
  consumer_secret:      'nXPxxj7rpOUbNT2ezqW7Hoat6SYy0rvAFoyKKqtppyvVY1k4NA',
  access_token:         '824704196511404032-zor9HVMcp5lbPfcJA6h36HjMFnLdjJq',
  access_token_secret:  'Kh3f0I2kWbGuAah4s9d4E0R2OBCV9KWFUSTLEPrqMwX2A',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});


var stream = T.stream('user');

stream.on('follow', followed);
stream.on('tweet', tweetEvent);

function followed(eventMsg){
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  tweetIt(' Thanks for following, ' + '@' + screenName + ' stay tuned for something really cool coming soon! GO CYCLONES!');
}

function tweetEvent(tweetMsg){
  var fs = require('fs');
  var json = JSON.stringify(tweetMsg, null, 2);
  fs.writeFile("tweet.json", json);
  
  console.log(replyto + '' + from);

  
  var replyto = tweetMsg.in_reply_to_screen_name;
  var text = tweetMsg.txt;
  var from = tweetMsg.user.screen_name;
  
  if (replyto === 'TestBook89'){
    var newTweet = '@' + from + " GO #CYCLONES!"
    tweetIt(newTweet);
  }
}


var params = {
  q: '#cyclonenation since:2017-02-24', 
  count: 1
  };


// This searches tweets on twitter
T.get('search/tweets', params, gotData); 

function gotData(error, data, response) {
  var tweets = data.statuses;
  for (var i = 1; i < tweets.length; i++)
  console.log(tweets[i].text);
}

tweetIt();

function tweetIt(txt){
var tweet = {
  status: txt
};

T.post('statuses/update', tweet, tweeted);
 
function tweeted(error, data, response) {
  if(error){
    console.log(error);
  } else {
    console.log(tweet);
  }

}}