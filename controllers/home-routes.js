const router = require('express').Router();
const withAuth = require('../utils/withAuth');
const { Album } = require('../models');
require('dotenv').config();
var SpotifyWebApi = require('spotify-web-api-node');
const { findAll } = require('../models/Users');

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://www.example.com/callback'
});

spotifyApi.setAccessToken(process.env.CLIENT_TOKEN);


router.get('/', async (req, res) => {
    res.status(200).render('homepage');
});

//when search artist name, Check the db first,
//if the data not found, request API call, and save it to database.
//Save top 5 albums of that artist. and render to album pages
router.post('/search', async (req, res) => {
    //check if data exist
    const albumData = await Album.findAll({
        where: {
            artist_name: req.body.searchName,
        },
    });
    // console.log(albumData);
    if (!albumData) {
        //Spotify API call request
        spotifyApi.searchAlbums(req.body.searchName, { limit: 5, offset: 20 })
            .then((data) => {
                console.log('search albums', data.body.albums.items);

                data.body.albums.items.forEach(async (album) => {
                    console.log(`(${album.id},"${album.name}","${album.uri}",${album.total_tracks},${album.release_date},"${album.artists[0].name}",${album.artists[0].id}`)
                    const newAlbum = await Album.create({
                        id: album.id,
                        name: album.name,
                        url: album.uri,
                        total_track: album.total_tracks,
                        release_date: album.release_date,
                        artist_name: album.artists[0].name,
                        artist_id: album.artists[0].id,
                    });
                    if (!newAlbum) {
                        alert("fail to create");
                    }
                    else {
                        console.log(newAlbum);
                    }

                });
                // const albums = data.body.albums.map((album) => album.get({ plain: true }));
                // console.log(data.body.albums);

                res.render('album');
            },
                function (err) {
                    console.error(err);
                }
            );
     }
    //if data exist
    else{
            // console.log(albumData);
            const albums = albumData.map((album) => album.get({ plain: true }));
            res.status(200).render('album',{albums});
    }


});

module.exports = router;