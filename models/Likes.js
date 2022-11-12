const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Like extends Model {}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey:true,
    },
    user_id:{
        type: DataTypes.INTEGER,
        references:{
            model:'user',
            key:'id',
        }
    },
    track_id:{
        type: DataTypes.INTEGER,
        references:{
            model:'track',
            key:'id',
        }
    },

  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'like',
  }
);

module.exports = Like;
