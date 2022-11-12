# tuneTalk

Tune Talk enables users to share and discuss their favorite music with spotify player embedded.




## Description

How do you listen to music lately? 
What would you do when you want to find new good music?
The Billboard Hot 100 or recommendations from spotify are probably reliable, but sometimes the trend is just hard to follow.

Introducing: tune Talk!!
With tune Talk, you can comment and like songs, and even see how other users comment and like their favorite songs.
You can find users with similar taste and comment to interact with them. 

You will never need to worry about where to find new good music. 
==> Discover your new favorite song with tune Talk




## Getting Started
Visit our website at https://github.com/drewsparker/tuneTalk




### Installing

* Open new terminal in vscode

* install npm packages

```
npm i
```
* use database

```
mysql -u root -p
```

```
source db/schema.sql
quit
```

* run seed.js
```
node seeds/seed.js
```




### Executing program

* Run server.js on your local host with insomnia
* Or visit https://github.com/drewsparker/tuneTalk 
* Create a user account with email and password 
* Log in and start to like and comment your favorite music




## Authors

Contributors names and contact info
* Yeon Seo  
* Drew Parker
* Casey Myers
* Thomas Chao (https://www.facebook.com/feitieng/)




## Version History

* v0.2 initial release
    * Add unlike button to delete liked libary
    * add more seed data
    * Updated required packages
    * Index.js Spotify User Auth
    * add album click button, when clicked, it goes to album route
    * add signup handlebar and signup.js
    * logout button is working
    * change handlebar feature to look better
    * add Like handlebars
    * add 'api/comment' route and add handlebar
    * bug solved: style.css-> css/style.css
    * like models added
    * add helper function
    * get comment data order by updatedAT

* v0.1 Build structures 
    * move spotifyApi so that only if data isn't exist, use the spotifyAPi.… 
    * Add login handlebars, Add logIn.js, Add profile.handlebars and route
    * put html page to handlebar
    * combine html to handlebar
    * commit after merge
    * seeding more data to track
    * "uploading what i have as of this morning"
    * profile.html album.html artist.html




## License

This project is licensed under the MIT License - see the LICENSE.md file for details




## Acknowledgments

Inspiration, code snippets, etc.

<a href="https://www.flaticon.com/free-icons/comment" title="comment icons">Comment icons created by flatart_icons - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/heart" title="heart icons">Heart icons created by Kiranshastry - Flaticon</a>
timeago helper function : https://muffinman.io/blog/javascript-time-ago-function/



