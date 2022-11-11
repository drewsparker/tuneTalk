const router = require('express').Router();
const withAuth = require('../utils/withAuth');
const { Album, Comment, Track, User, Like } = require('../models');
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
        order : [['updatedAt', 'DESC']],

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
    try {

        //check if data exist
        console.log(req.params.searchName);
        const albumData = await Album.findAll({
            where: {
                artist_name: req.params.searchName,
            },
        });

        console.log('albumData', albumData[0]);
        if (!albumData[0]) {
            console.log("API request");
            //Spotify API call request
            var spotifyApi = new SpotifyWebApi({
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                redirectUri: 'http://www.example.com/callback'
            });
            spotifyApi.setAccessToken(process.env.CLIENT_TOKEN);
            console.log(req.params.searchName);

            await spotifyApi.searchAlbums(req.params.searchName, { limit: 5, offset: 20 })
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

                    console.log("items", data.body.albums.items);
                    // const albums=data.body.albums.items;
                    res.status(200).render('album', { 
                        albums: data.body.albums.items,
                        logged_in: req.session.logged_in,
                        user_id: req.session.user_id,
                     });

                    // res.redirect(`/search/${req.params.searchName}`);

                },
                    function (err) {

                        console.error(err);
                    }
                );
            // res.status(200).render('album');
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
    }
    catch (error) {
        res.status(500).json({ message: "fail" });
    }
});



router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
});
router.get('/Signup', (req, res) => {

    res.render('signup');
});

// Use withAuth middleware to prevent access to route
router.get('/profile', async (req, res) => {
    try {

        const commentData = await Comment.findAll({
            where: {
                // user_id: 2
                user_id:req.session.user_id
            },
            include: [{ model: Track }, {
                model: User,
                attributes: { exclude: ['password'] }
            }]
        });

        const likeData = await Like.findAll({
            where: {
                // user_id: 2
                user_id:req.session.user_id
            },
            include: [{ model: Track }, {
                model: User,
                attributes: { exclude: ['password'] }
            }]
        });
        console.log("like",likeData);


        const comments = commentData.map((comment) => comment.get({ plain: true }));
        const likes = likeData.map((like) => like.get({ plain: true }));
        // res.json(comments);


          res.render('profile', {
            comments,likes,logged_in: true,  //changed from logged_in: req.session.logged_in
            user_id: req.session.user_id,
          });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/comment', (req, res) => {
  
    res.redirect('/api/comments');

});

router.get('/like', (req, res) => {
  
    res.redirect('/api/likes');

});


module.exports = router;