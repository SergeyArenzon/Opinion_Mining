
// var Twitter = require('twitter');
// var config = require('./config.js');
// var T = new Twitter(config);


// // Set up your search parameters
// var params = {
//   q: 'trump',
//   count: 100,
//   result_type: 'recent',
//   lang: 'en',
  
  
  
// }
// T.get('search/tweets', params, function(err, data, response) {
//   if(!err){
//     // Loop through the returned tweets
//     for(let i = 0; i < data.statuses.length; i++){
//       // Get the tweet Id from the returned data
//       //let id = { id: data.statuses[i].id_str }

//       //console.log(data.statuses[i]);
//       console.log("****");
//       console.log(data.statuses[i].text);
//     }
    
//   } 
  
//   else {
//     console.log(err);
//   }
// })




const https = require('https');
const request = require('request');
const util = require('util');





const get = util.promisify(request.get);
const post = util.promisify(request.post);

const consumer_key = 'fgFMaMMgnSfd63VoXxYrHdnGl';                             // Add your API key here
const consumer_secret = '1ctcEkSoT7jLRVba3xKeufTKGPRIJzACS8tLuhPUYzWibI1gtG'; // Add your API secret key here

const bearerTokenURL = new URL('https://api.twitter.com/oauth2/token');
const searchURL = new URL('https://api.twitter.com/labs/2/tweets/search');

async function bearerToken (auth) {
  const requestConfig = {
    url: bearerTokenURL,
    auth: {
      user: consumer_key,
      pass: consumer_secret,
    },
    form: {
      grant_type: 'client_credentials',
    },
  };

  const response = await post(requestConfig);
  return JSON.parse(response.body).access_token;
}

(async () => {
  let token;
  const query = 'netanyahu';
  const maxResults = 100;

  try {
    // Exchange your credentials for a Bearer token
    token = await bearerToken({consumer_key, consumer_secret});
  } catch (e) {
    console.error(`Could not generate a Bearer token. Please check that your credentials are correct and that the Filtered Stream preview is enabled in your Labs dashboard. (${e})`);
    process.exit(-1);
  }

  const requestConfig = {
    url: searchURL,
    qs: {
      query: query,
      max_results: maxResults,
      
    },
    auth: {
      bearer: token,
    },
    headers: {
      'User-Agent': 'LabsRecentSearchQuickStartJS',
    },
    json: true,
  };

  try {
    const res = await get(requestConfig);  
    //console.log(res.statusCode);
    console.log(res.body.data);
    if (res.statusCode !== 200) {
      throw new Error(res.json);
      return;
    }

    //console.log(res.json);
  } catch (e) {
    console.error(`Could not get search results. An error occurred: ${e}`);
    process.exit(-1);
  }
})();