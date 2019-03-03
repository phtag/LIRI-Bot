require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api'); 
var moment = require('moment');

var UserRequest = process.argv[2];

if (UserRequest === 'concert-this') {
  // var artist = process.argv.slice(3).join('+');
  var artist = process.argv.slice(3).join(' ');
  console.log('Checking for artist=' + artist)
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(function(response) {

      // Printing the entire object to console
      // console.log(response.data);
      console.log(response.data[0]);
      console.log('================================');
      response.data.forEach(function(element) {
        var lineUp = "";
        // Because there can be more than one band at the concert, 
        // build a line up string by iterating over the linup array elements
        element.lineup.forEach(function(element) {
          if (lineUp === "") {
            lineUp = element;
          } else {
            lineUp += ', ' + element;
          }
        });
        console.log('Performing bands: '+ lineUp);
        console.log('Venue name: ' + element.venue.name);
        console.log('Venue location: ' + element.venue.city + ", " + element.venue.country);
        console.log('Date: ' + moment(element.datetime).format('LLLL'));
        console.log('================================');
//         Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")
      })

      // Constructing HTML containing the artist information
    });
} else if (UserRequest === 'spotify-this-song') {
  //________
  // SPOTIFY
  //
    var spotify = new Spotify({
      id: process.env.SPOTIFY_ID,
      secret: process.env.SPOTIFY_SECRET
    });    
    spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
      // spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
      // spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
          if (err) {
        return console.log('Error occurred: ' + err);
      }  
    //   data.tracks.items.artists.foreach(function(element) {
    //       console.log(element);

    // console.log(data.tracks.items); 
    data.tracks.items.forEach(function(element) {
        //console.log(element);
        // console.log(element.album);
        // console.log(element);
        // console.log(element.album.name);
        // console.log(element.album);
        // console.log(element.album);
        var qArtists = element.album.artists;
        qArtists.forEach(function(thisElement) {
          console.log(thisElement.external_urls);
        })

        // GOOD Results...
        // console.log(element.album.artists);
        // console.log(element.album.id);
        // console.log(element.album.name);
        // console.log(element.album.release_date);
        // console.log(element.album.external_urls);
        // console.log(element.album.total_tracks);
    })
    // console.log(data.tracks); 
    });
} else if (UserRequest === 'movie-this') {
  var movie = process.argv.slice(3).join('+');

  // axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
    function(response) {
      var RottenTomatoesRating;
      console.log('=======================================================================');
      console.log('Movie name: ' + response.data.Title);
      console.log('Year released: ' + response.data.Year);
      response.data.Ratings.forEach(function(element) {
        if (element.Source === 'Rotten Tomatoes') {
          RottenTomatoesRating = element.Value;
        }
      });
      console.log('IMDB rating: ' + response.data.imdbRating);
      console.log('Rotten Tomatoes rating: ' + RottenTomatoesRating);
      console.log('Country where produced: ' + response.data.Country);
      console.log('Language: ' + response.data.Language);
      console.log('Plot: ' + response.data.Plot);
      console.log('Actors: ' + response.data.Actors);   
      console.log('=======================================================================');
    }
      );
} else if (UserRequest === 'do-what-it-says') {
}