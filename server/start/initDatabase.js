const roomsMockData = require('../mockData/rooms.json');

const Room = require('../models/Room');

module.exports = async () => {
  const rooms = await Room.find();
  if (rooms.length !== roomsMockData.length) {
    await createInitialEntity(Room, roomsMockData);
    console.log('rooms add mongoDB');
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async item => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
