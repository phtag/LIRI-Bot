require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api'); 
var moment = require('moment');
var fs = require('fs');
var UserRequest = process.argv[2];
respondToUserRequest(UserRequest, process.argv.slice(3));

//_______________________________________________________________________________
//  FUNCTIONS
//
function respondToUserRequest(UserRequest, queryItem) {
  if (UserRequest === 'concert-this') {
    // var artist = process.argv.slice(3).join(' ');
    var artist = queryItem.join(' ');
    console.log('Checking for artist=' + artist)
    concertThis(artist);
  } else if (UserRequest === 'spotify-this-song') {
    //________
    // SPOTIFY
    //
    // var song = process.argv.slice(3).join(' ');
    var song = queryItem.join(' ');

    spotifyThisSong(song);

  } else if (UserRequest === 'movie-this') {
    // var movie = process.argv.slice(3).join('+');
    var movie = queryItem.join('+');
    if (movie === '') {
      movie = 'Mr. Nobody';
    }
    movieThis(movie);
    // axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(

  } else if (UserRequest === 'do-what-it-says') {
    fs.readFile('./random.txt', 'utf8', function(error, data) {
      var arguments = data.split(',');
      var which = arguments[0];
      console.log(arguments[1]);
      var secondArgument = arguments[1].replace(/\"/g, "");
      var queryItem = [];
      if (secondArgument.indexOf(' ') > 0) {
        queryItem = secondArgument.split(' ');
      } else {
        queryItem.push(secondArgument.trim());
      }
      console.log(queryItem);
      respondToUserRequest(arguments[0], queryItem);
    });
  }
}

function concertThis(artist) {
  // Build a query for BandsinTown to return a list of all events that the specified artist
  // will be performing in soon
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  axios.get(queryURL).then(function(response) {
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
    })
  });
}

function spotifyThisSong(song) {
  var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });    
  spotify.search({ type: 'track', query: song }, function(err, data) {
    // spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
    // spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
        if (err) {
      return console.log('Error occurred: ' + err);
    }  
    console.log(data.tracks.items[0]); 
    console.log('==================================================');
    data.tracks.items.forEach(function(element) {
        var songName = element.name;
        var qArtists = element.album.artists;
        var ArtistsNames = "";
        var external_URLs = [];
        // Create a list of the artists for this track
        qArtists.forEach(function(thisElement) {
          external_URLs.push(thisElement.external_urls.spotify);
          if (ArtistsNames === '') {
            ArtistsNames = thisElement.name;
          } else {
            ArtistsNames += ', ' + thisElement.name;
          }
        })
        // Display the results for the user
        console.log('Song name: ' + songName);
        console.log('Artist(s): ' + ArtistsNames);
        console.log('ID: ' + element.album.id);
        console.log('Album name: ' + element.album.name);
        console.log('Album release date: ' + moment(element.album.release_date).format('LLLL'));
        console.log('Preview URLs: ' + element.preview_url);
        console.log('Total tracks: ' + element.album.total_tracks);
        console.log('==================================================');

        var songData = [
          'Song name: ' + songName,
          'Artist(s): ' + ArtistsNames,
          'ID: ' + element.album.id,
          'Album name: ' + element.album.name,
          'Album release date: ' + moment(element.album.release_date).format('LLLL'),
          'Preview URLs: ' + element.preview_url,
          'Total tracks: ' + element.album.total_tracks,
        ].join('\n\n');
      fs.appendFile('Spotify.txt', songData, function(err) {
          if (err) {

          } else {
              console.log('Successfully wrote to actor.txt');
          }
      });

    })
  });
}

function movieThis(movie) {
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
  });
}
