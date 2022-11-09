const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Album extends Model {}


Album.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // album_id:{
    //     type : DataTypes.STRING,
    //     primaryKey: true,
    //     allowNull: false,
    //     unique:true,
    // },
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
    modelName: 'album',
  }
);

module.exports = Album;
