const router = require('express').Router();
const withAuth = require('../utils/withAuth');
const { Album } = require('../../models');
require('dotenv').config();
var SpotifyWebApi = require('spotify-web-api-node');

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
//Save top 5 albums of that artist. and render to home-pages
router.post('/search', async (req, res) => {
    //Spotify API call request
    spotifyApi.searchAlbums(req.body.searchName, { limit: 5, offset: 20 })
        .then((data) => {
            console.log('search albums', data.body);

            data.body.albums.items.forEach(async(album) => {
                const newAlbum = await Album.create({
                    name:album.artists.name,
                    album_id:album.id,
                    uri:album.uri,
                    total_tracks:album.total_tracks,
                    release_date:album.release_date,
                    artist_name:album.artists.name,
                    artist_id:album.artists.id,
                })
                if(!newAlbum){
                    console.error()
                }
                else{
                    console.log(newAlbum);
                }

            });

            res.json(data.body);
        },
            function (err) {
                console.error(err);
            }
        );



});

module.exports = router;