const likesMockData = require('../mockData/likes.json');
const reviewsMockData = require('../mockData/reviews.json');
const roomsMockData = require('../mockData/rooms.json');
const usersMockData = require('../mockData/users.json');

const User = require('../models/User');
const Room = require('../models/Room');
const Like = require('../models/Like');
const Review = require('../models/Review');

module.exports = async () => {
  const likes = await Like.find();
  if (likes.length !== likesMockData.length) {
    await createInitialEntity(Like, likesMockData);
    console.log('likes add mongoDB');
  }
  const reviews = await Review.find();
  if (reviews.length !== reviewsMockData.length) {
    await createInitialEntity(Review, reviewsMockData);
    console.log('reviews add mongoDB');
  }
  const rooms = await Room.find();
  if (rooms.length !== roomsMockData.length) {
    await createInitialEntity(Room, roomsMockData);
    console.log('rooms add mongoDB');
  }
  const users = await User.find();
  if (users.length !== usersMockData.length) {
    await createInitialEntity(User, usersMockData);
    console.log('users add mongoDB');
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async item => {
      try {
        delete item._id;
        const newItem = new Model(item);
        console.log(item);
        console.log(newItem);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
