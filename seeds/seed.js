const sequelize = require('../config/connection');
const { User,Track,Album,Comment } = require('../models');

const userData = require('./user.json');
const albumData = require('./album.json');
const trackData = require('./track.json');
const commentData= require('./comment.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const album of albumData) {
    await Album.create({
      ...album,
    //   user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const track of trackData) {
    await Track.create({
      ...track,
    //   user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  for (const comment of commentData){
    await Comment.create({
        ...comment,
        track_id: trackData[Math.floor(Math.random() * users.length)].id,
        user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }


  process.exit(0);
};

seedDatabase();
