const router = require('express').Router();
const withAuth = require('../utils/withAuth');
const fs = require('fs');
require('dotenv').config();
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: 'fcecfc72172e4cd267473117a17cbd4d',
    clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
    redirectUri: 'http://www.example.com/callback'
});

spotifyApi.setAccessToken('BQB_tVyxgLBwA6vX8MiA8iOgfw775bGsP2PZmQ1O7SRtV55_vq5AS-YDHCucznXWfGeu89U_nRvdeBwa3NXPzF9B0bc4Bxri91qAzQztw_whqFt-sqKoKdk5_L4D5XgJNcNYhr1xAG-6R8d0AFfXrF_SKORX_AGPGFButsvkRoLIVA-WKpvLlnaoljUKN_G2jur0T81y');



router.get('/', async (req, res) => {
    res.status(200).render('homepage');
});

//when search artist name, Check the db first,
//if the data not found, request API call, and save it to database.
//Save top 5 albums of that artist. and render to home-pages
router.post('/search', async (req, res) => {
    //Spotify API call request
    spotifyApi.searchAlbums(req.body.searchName, { limit: 5, offset: 20 })
        .then((data) => {
            console.log('search albums', data.body);
            //Create album
            // data.body.albums.items.forEach(album => {
            //     const newAlbum = await album.create({

            //     })


            // });
            // const album =
            // {
            //     artist_name: data.body.albums.items[i].artists.name,
            //     artist_id: data.body.albums.items[i].artists.id,
            //     album_name: data.body.albums.items[i].name,
            //     album_id: data.body.albums.items[i].id,
            //     album_uri: data.body.albums.items[i].uri,
            //     album_total_track: data.body.albums.items[i].total_tracks,
            //     album_release_date: data.body.albums.items[i].release_date,
            // };

            res.json(data.body);
        },
            function (err) {
                console.error(err);
            }
        );
    // ///Create Artist and albums
    // try {
    //     const newProject = await Project.create({
    //         ...req.body,
    //         user_id: req.session.user_id,
    //     });

    //     res.status(200).json(newProject);
    // } catch (err) {
    //     res.status(400).json(err);
    // }


});

module.exports = router;