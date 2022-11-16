const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey:true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'comment',
  }
);

module.exports = Comment;
