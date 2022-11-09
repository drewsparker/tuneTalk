const router = require('express').Router();
const withAuth = require('../utils/withAuth');
const { Album,Comment,Track,User } = require('../models');
require('dotenv').config();
var SpotifyWebApi = require('spotify-web-api-node');
const { findAll } = require('../models/Users');

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://www.example.com/callback'
});



router.get('/', async (req, res) => {

    const commentData= await Comment.findAll({
        include:[
           {model:Track},{model:User}
        ],
        limit:5,
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
    console.log(comments);
    
    res.status(200).render('homepage',{
        comments,
        logged_in: req.session.logged_in,
        user_id:req.session.user_id,});

    
  
});

//when search artist name, Check the db first,
//if the data not found, request API call, and save it to database.
//Save top 5 albums of that artist. and render to album pages
router.get('/search/:searchName', async (req, res) => {
    //check if data exist
    const albumData = await Album.findAll({
        where: {
            artist_name: req.params.searchName,
        },
    });
    if (!albumData[0]) { //if albumData=[] ->!albumData=false
        //Spotify API call request
        spotifyApi.setAccessToken(process.env.CLIENT_TOKEN); 

        spotifyApi.searchAlbums(req.params.searchName, { limit: 5, offset: 20 })
            .then(async(data) => {
                console.log('search albums', data.body.albums.items);

                const albumData= await data.body.albums.items.map(async (album) => {
                    console.log(`(${album.id},"${album.name}","${album.uri}",${album.total_tracks},${album.release_date},"${album.artists[0].name}",${album.artists[0].id}`)
                    const newAlbum = await Album.findOrCreate({
                        where:{
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
                        res.status(400).json({message:"fail to Insert"});
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
                console.log("items",data.body.albums.items);
                // const albums=data.body.albums.items;

                const albums = data.body.albums.items.map((album) => album.get({ plain: true }));
                res.status(200).render('album',{albums});
                
                // res.redirect(`/search/${req.params.searchName}`);
                
            },
                function (err) {
                    console.error(err);
                }
            );
     }
    //if data exist
    else{
            const albums = albumData.map((album) => album.get({ plain: true }));
            console.log(albums);
            res.status(200).render('album',{
                albums,
                logged_in: req.session.logged_in,
                user_id:req.session.user_id,
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


module.exports = router;