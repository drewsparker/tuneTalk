const router = require('express').Router();
const withAuth = require('../utils/withAuth');
const { Album, Comment, Track, User } = require('../models');
require('dotenv').config();
var SpotifyWebApi = require('spotify-web-api-node');
const { findAll } = require('../models/Users');




//Render Top 10 recent commented Song
router.get('/', async (req, res) => {

    const commentData = await Comment.findAll({
        include: [
            { model: Track }, { model: User }
        ],
        limit: 5,
        // db.itemHistory.findAll({
        //     attributes: [
        //         'id',
        //         'price',
        //         'itemId',
        //         [db.Sequelize.fn('max', db.Sequelize.col('date')), 'date']
        //     ],
        //     group: ['itemId'],
        //     limit: 1
        // }).then(function(histories) {
        //     console.log(histories);
        // });

    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.status(200).render('homepage', {
        comments,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
    });



});

//when search artist name, Check the db first,
//if the data not found, request API call, and save it to database.
//Save top 5 albums of that artist. and render to album pages
router.get('/search/:searchName', async (req, res) => {

    //check if data existc
    console.log(req.params.searchName);
    const albumData = await Album.findAll({
        where: {
            artist_name: req.params.searchName,
        },
    });
    console.log('albuData', albumData[0]);
    if (!albumData[0]) {
        console.log("API request");
        //Spotify API call request
        var spotifyApi = new SpotifyWebApi({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            redirectUri: 'http://www.example.com/callback'
        });
        spotifyApi.setAccessToken(process.env.CLIENT_TOKEN);

        spotifyApi.searchAlbums(req.params.searchName, { limit: 5, offset: 20 })
            .then(async (data) => {
                console.log('search albums', data.body.albums.items);

                const albumData = await data.body.albums.items.map(async (album) => {
                    const newAlbum = await Album.findOrCreate({
                        where: {
                            id: album.id,
                            name: album.name,
                            url: album.uri,
                            total_track: album.total_tracks,
                            release_date: album.release_date,
                            artist_name: album.artists[0].name,
                            artist_id: album.artists[0].id,
                        }
                    });
                    if (!newAlbum) {
                        res.status(400).json({ message: "fail to Insert" });
                        return;
                    }
                    return newAlbum;
                });

                //Get the data from DB and render it to album handlebar
                // const albumData = await Album.findAll({
                //     where: {
                //         artist_name: req.params.searchName,
                //     },
                // });
                // console.log("albumData",albumData);
                // const albums = albumData.map((album) => album.get({ plain: true }));
                // console.log(albums);

                // console.log(data.body.albums.items);
                console.log("items", data.body.albums.items);
                // const albums=data.body.albums.items;

                const albums = data.body.albums.items.map((album) => album.get({ plain: true }));
                res.status(200).render('album', { albums });

                // res.redirect(`/search/${req.params.searchName}`);

            },
                function (err) {
                    console.error(err);
                }
            );
    }
    //if data exist
    else {
        console.log("get data from DB");
        const albums = albumData.map((album) => album.get({ plain: true }));
        console.log(albums);
        res.status(200).render('album', {
            albums,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });
    }
});



router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Comment },],   //Like should be added
      });
  
      const user = userData.get({ plain: true });
      console.log(user);
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;