const User = require('./Users');
const Album = require('./Album');
const Track =require('./Track');
const Artist = require('./Artist');
const Comment = require('./Comment');
const Like = require('./Likes');


// Artist.hasMany(Album, {
//   foreignKey: 'artist_id',
//   onDelete: 'CASCADE'
// });
Album.hasMany(Track, {
    foreignKey: 'album_id',
    onDelete: 'CASCADE'
});
// // Artist.hasMany(Track, {
// //     foreignKey: 'artist_id',
// //     onDelete: 'CASCADE'
// // });
Track.hasMany(Comment, {
    foreignKey: 'track_id',
    onDelete: 'CASCADE'
});
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});




// Album.belongsTo(Artist, {
//   foreignKey: 'artist_id'
// });
Track.belongsTo(Album, {
    foreignKey: 'album_id'
});
// // Track.belongsTo(Artist, {
// //     foreignKey: 'artist_id'
// // });
Comment.belongsTo(Track, {
    foreignKey: 'track_id'
});
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Like.belongsTo(User,{
    foreignKey: 'user_id'
});
Like.belongsTo(Track,{
    foreignKey: 'track_id'
});



module.exports = { User, Album, Track, Artist, Comment, Like };
