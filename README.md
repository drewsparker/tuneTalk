# tuneTalk
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Tune Talk enables users to share and discuss their favorite music with spotify player embedded.

![demo.gif](./tuneTalk%20demo_edit.gif)


## Description

How do you listen to music lately? 
What would you do when you want to find new good music?
The Billboard Hot 100 or recommendations from spotify are probably reliable, but sometimes the trend is just hard to follow.

Introducing: tune Talk!!
With tune Talk, you can comment and like songs, and even see how other users comment and like their favorite songs.
You can find users with similar taste and comment to interact with them. 

You will never need to worry about where to find new good music. 
==> Discover your new favorite song with tune Talk


## Table of Contents
- [Technology](#technology)
- [Installation](#installation)
- [Usage](#usage)
- [Demonstration](#demonstration)
- [Heroku](#heroku)
- [Authors](#authors)

## Technology

[express-handlebars](https://www.npmjs.com/package/express-handlebars) package to implement Handlebars.js for the Views, use the [MySQL2](https://www.npmjs.com/package/mysql2) and [Sequelize](https://www.npmjs.com/package/sequelize) packages to connect to a MySQL database for Models, and create an Express.js API for the Controllers.
Futhermore, [dotenv package](https://www.npmjs.com/package/dotenv) to use environment variables, the [bcrypt package](https://www.npmjs.com/package/bcrypt) to hash passwords, and the [express-session](https://www.npmjs.com/package/express-session) and [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) packages to add authentication.[Spotify Web API Node](https://www.npmjs.com/package/spotify-web-api-node)to make spotify API call.

## Installation

* Open new terminal in vscode

* install npm packages

```
npm i
```
* Create Database

```
mysql -u root -p
```

```
source db/schema.sql
quit
```
* Seed Data

```
node seeds/seed.js
```
* Create a .env file in the root of your project
```
DB_NAME='tuneTalk_db'
DB_USER=
DB_PASSWORD=
## Spotify authorization needed
SPOTIPY_KEY=   
CLIENT_ID=
CLIENT_SECRET=
CLIENT_TOKEN=
## 
```


### Usage
```
I can see Home page with most recent 5 commented songs
When I go to comments page
I can see all the commented song for all users
When I create an account…
I can log into tuneTalk
When I log into tuneTalk…
I can see profile page with your commented songs and liked songs
When I log into tuneTalk…
I can see profile, liked library tab.
When I search for artists…
I can see at most 5 albums with spotify playlist
When I click the album
I can see the tracks in that album with comments
When I click like button on certain song
I can save the playlist in Liked Library
When I click the comment button…
I can make a comment and save it
If you go to Profile page,
I can see all the comments that I made, and songs that I liked.
```


## Demonstration
[demonstration Link](https://drive.google.com/file/d/1BxKewiM1nB8Ob7isxuJiqhyY-4cHHbJv/view)


## Heroku
https://immense-meadow-73808.herokuapp.com/


## Authors

Contributors names and contact info
* Yeon Seo  (https://github.com/rogseo)
* Drew Parker
* Casey Myers 
* Thomas Chao (https://www.facebook.com/feitieng/)


## Acknowledgments

Inspiration, code snippets, etc.
time ago helper function : https://muffinman.io/blog/javascript-time-ago-function/




