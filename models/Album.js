const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Album extends Model {}


            //     artist_name: data.body.albums.items[i].artists.name,
            //     artist_id: data.body.albums.items[i].artists.id,
            //     album_name: data.body.albums.items[i].name,
            //     album_id: data.body.albums.items[i].id,
            //     album_uri: data.body.albums.items[i].uri,
            //     album_total_track: data.body.albums.items[i].total_tracks,
            //     album_release_date: data.body.albums.items[i].release_date,

Album.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album_id:{
        type : DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique:true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_track:{
        type: DataTypes.INTEGER,
    },
    release_date:{
        type: DataTypes.DATE,
    },
    artist_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    artist_id:{
        type: DataTypes.STRING,
        references: {
            model: 'artist',
            key: 'artist_id',
          },
    },


  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'album',
  }
);

module.exports = Album;
