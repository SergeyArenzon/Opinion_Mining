
var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);


// Set up your search parameters
var params = {
  q: 'trump',
  count: 1,
  result_type: 'recent',
  lang: 'en',
  
}
T.get('search/tweets', params, function(err, data, response) {
  if(!err){
    // Loop through the returned tweets
    for(let i = 0; i < data.statuses.length; i++){
      // Get the tweet Id from the returned data
      //let id = { id: data.statuses[i].id_str }

      console.log(data.statuses[i]);
      console.log("****");
      console.log(data.statuses[i].text);
    }
    
  } 
  
  else {
    console.log(err);
  }
})
