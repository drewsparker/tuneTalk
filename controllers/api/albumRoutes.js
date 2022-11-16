const router = require('express').Router();
const { Album,Track,Comment } = require('../../models');
const withAuth = require('../../utils/withAuth');

require('dotenv').config();
var SpotifyWebApi = require('spotify-web-api-node');
const { fdatasync } = require('fs');




router.get('/:id',async(req, res)=>{

    const albumData= await Track.findAll({
        include:[
           {model:Comment}
        ],
        where:{
            album_id:req.params.id,
        },
    });
    if(!albumData[0]){
        console.log("Make API request");
        var spotifyApi = new SpotifyWebApi({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            redirectUri: 'http://www.example.com/callback'
        });
        spotifyApi.setAccessToken(process.env.CLIENT_TOKEN);
        spotifyApi.getAlbum(req.params.id)
        .then((data) => {
            console.log(data.body.tracks.items);
            data.body.tracks.items.forEach(async(track) => {
                console.log(track.name,track.track_number,track.duration_ms,track.uri,req.body.id,track.artists[0].id);
                
                const newTracks=await Track.findOrCreate({
                    where:{
                    name : track.name,
                    track_number : track.track_number,
                    duration_ms : track.duration_ms,
                    uri : track.uri,
                    album_id:req.params.id,
                    artist_id:track.artists[0].id, 
                    }
                });
                if(!newTracks){
                    res.status(400).json({ message: 'Fail to insert' });
                    return;
                }   
                else {
                    console.log(data.body.tracks.items.comments);
                    res.render('track',{tracks: data.body.tracks.items,
                        logged_in: req.session.logged_in,
                        user_id: req.session.user_id,
                    });
                 }                    
            });
            

        })
        .catch(function(err){
            res.status(500).json(err);
        });
    }
    //if data exist
    else{
        console.log("get data from DB");
        const tracks = albumData.map((track) => track.get({ plain: true }));
        console.log(tracks);
        console.log("render track logged_in",req.session.logged_in);
        res.status(200).render('track',{tracks,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,});

    }

        

});
// router.post('/',async(req, res)=>{

//         spotifyApi.getAlbum(req.body.id)
//         .then(function(data) {
//             res.json(data.body);
//             console.log(data.body.tracks.items);
//             data.body.tracks.items.forEach(async(track) => {
//                 console.log(track.name,track.track_number,track.duration_ms,track.uri,req.body.id,track.artists[0].id);
                
//                 const newTracks=await Track.create({
//                     name : track.name,
//                     track_number : track.track_number,
//                     duration_ms : track.duration_ms,
//                     uri : track.uri,
//                     album_id:req.body.id,
//                     artist_id:track.artists[0].id, 
//                 });
//                 if(!newTracks){
//                     alert("fail to create");
//                 }   
//                 else {
//                     console.log(newTracks);
//                  }                    
//             });
//             res.json(data.body.tracks.items);

//         })
//         .catch(function(err){
//             res.status(500).json(err);
//         });

        

// });





module.exports=router;