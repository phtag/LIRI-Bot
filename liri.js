require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api'); 

var UserRequest = process.argv[2];

if (UserRequest === 'concert-this') {
    var artist = process.argv[3];
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(function(response) {

      // Printing the entire object to console
      console.log(response);

      // Constructing HTML containing the artist information
    });
} else if (UserRequest === 'spotify-this-song') {
    var spotify = new Spotify({
      id: process.env.SPOTIFY_ID,
      secret: process.env.SPOTIFY_SECRET
    });    
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }  
    //   data.tracks.items.artists.foreach(function(element) {
    //       console.log(element);

    // console.log(data.tracks.items); 
    data.tracks.items.forEach(function(element) {
        // console.log(element);
        // console.log(element.album);
        // console.log(element);
        // console.log(element.album.name);
        // console.log(element.album);
        // console.log(element.album);
        // console.log(element);
        // console.log(element.artists);
        console.log(element.album);
        // console.log(element.album.total_tracks);
    })
    // console.log(data.tracks); 
    });
} else if (UserRequest === 'movie-this') {
    axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
        function(response) {
          console.log("The movie's rating is: " + response.data.imdbRating);
        }
      );
} else if (UserRequest === 'do-what-it-says') {
}