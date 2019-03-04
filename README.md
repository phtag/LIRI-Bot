# LIRI-Bot
Week 10 homework assignment
### Overview
This project uses Node.js to create a simple language interprtation and recognition interface (LIRI) to get different types of requested information. The information is obtained using Axios and Spotify to query different URLs to get data for movies, songs and concerts.

### Purpose
The purpose of this assignment is to provide users with useful information about upcoming concert events for bands they are interesting in seeing, information about specific movies and information about specific songs.

### Getting Started
To use the LIRI created for this project, you will need to copy the package.json file for this project to your root node.js directory and install NPM packages for:
* Node-Spotify-API
* Axios
* Moment
* DotEnv
After installing these packages, copy all of the files from the repository to your node.js root node. You will be running the liri.js file in node. This file takes in the following four commands:
* concert-this
* spotify-this-song
* movie-this
* do-what-it-says
Each of these commands will be followed by an argument that will represent the "this" of the above three ...-this commands. For example, if you wanted to see all the concerts that Ariana Grande will be performing in in the future, your command line will look like this:
* $node liri concert-this Ariana Grande
Likewise, to get information about a specific movie, your command line will look like this:
* $node liri movie-this Groundhog Day
To get information about a specific song, your command line will look like this:
* $node liri spotify-this My Favorite Things


![LIRI Screenshot](assets/images/TrainScheduleScreenShot.jpg)

This project is maintained by Peter Tag
