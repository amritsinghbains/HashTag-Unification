var express = require('express');
var http = require('http');
var url = require('url');
var bodyParser = require('body-parser');
var app = express();
var pg = require('pg');
var port = process.env.PORT || 5000
var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization, Content-Type');
  next();
});

app.listen(port);
console.log('Listening at ' + port);

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'r2VPOkmTywrOuHM6JIbkEuK9E',
  consumer_secret: '3alaPekmVEXyDaVVrWi5Gia8UJVOMOu4iDGRL2uYqQbBnWXHAY',
  access_token_key: '2931383984-TY9Nf0ZcPZY29VKumvk2S0uKFuupkXYfWL00AOl',
  access_token_secret: '7tEI2kuSNlBRvMgYsbXtinKSjfyV6w7TahoV4aNdmD2pN'
});

// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response){
//   if (!error) {
//     console.log(tweets);
//   }
// });

client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response){
           // console.log(tweets);
           for(var i=0; i<tweets.statuses.length; i++){
                console.log(tweets.statuses[i].created_at, tweets.statuses[i].text, tweets.statuses[i].user.name, tweets.statuses[i].user.url, tweets.statuses[i].user.profile_image_url)
           }
        });

app.get('/', function (req, res) {

    if(req.query.query != undefined){
        console.log("Query: " + req.query.query)

        

        res.writeHead(200, {
            'content-type': 'text/json'
        });
        res.write("hahahs")
        res.end('\n')
    }else{
        console.log('nope')
        res.writeHead(200, {
            'content-type': 'text/json'
        });
        res.write("no query sent")
        res.end('\n')
    }
});
