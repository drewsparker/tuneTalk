const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Track extends Model {}

Track.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey:true,
    },             
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    track_number:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    duration_ms:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    uri:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },

    album_id:{
        type: DataTypes.STRING,
        // references:{
        //     model:'album',
        //     key:'id',
        // }
    },
    artist_id:{
        type: DataTypes.STRING,
        // references:{
        //     model:'artist',
        //     key:'id',
        // }
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'track',
  }
);

module.exports = Track;
