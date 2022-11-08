const router = require('express').Router();
const { Album,Track } = require('../../models');
const withAuth = require('../../utils/auth');

// router.get('/albums/:id',async(req, res)=>{

//     const trackData = await Track.findByPk(req.params.id
//     );
//     console.log(albumData);
//     if (!albumData) {
//         //Spotify API call request
//         spotifyApi.searchAlbums(req.body.searchName, { limit: 5, offset: 20 })
//             .then((data) => {
//                 console.log('search albums', data.body);

//                 data.body.albums.items.forEach(async (album) => {
//                     const newAlbum = await Album.create({
//                         id: album.id,
//                         name: album.name,
//                         url: album.uri,
//                         total_tracks: album.total_tracks,
//                         release_date: album.release_date,
//                         artist_name: album.artists[0].name,
//                         artist_id: album.artists[0].id,
//                     });
//                     if (!newAlbum) {
//                         alert("fail to create");
//                     }
//                     else {
//                         console.log(newAlbum);
//                     }

//                 });
//                 const albums = data.body.albums.map((album) => album.get({ plain: true }));
//                 // console.log(data.body.albums);

//                 res.render('homepage', {albums});
//             },
//                 function (err) {
//                     console.error(err);
//                 }
//             );
//     }
//     //if data exist
//     else{
//             // console.log(albumData);
//             const albums = albumData.map((album) => album.get({ plain: true }));
//             console.log(albums);
//             res.render('homepage', { albums }); //add render data from db
//     }





// });




module.exports=router;