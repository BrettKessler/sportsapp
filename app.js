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

var express = require("express");
var app = express();
var request = require ("request");
app.set("view engine", "ejs");

// this gets the current date and converts it to numerical form.
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10){
}
if(mm<10){
    mm='0'+mm
}

// this is getting information from the API and returning results in the ejs.


 

request("https://api.sportradar.us/ncaamb-t3/games/" + yyyy + "/" + mm + "/" + dd + "/schedule.json?api_key=j6mu95u99hsaayj5etfuzh6w", function(error, response, body){
    if(!error && response.statusCode == 200){
        var data = JSON.parse(body);
      data.games.forEach((v,i) => {
    setTimeout(() => {
        T.post('statuses/update', { status: v.home.name + " VS " + v.away.name },
            function(err, data, response) {
                // ... handle the response as you like
            });
    }, i * 1000*60*10);
});


 }
});   

 