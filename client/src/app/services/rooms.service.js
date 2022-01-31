import httpService from './http.service';

const roomsEndPoint = 'room/';

const roomsService = {
  getAll: async params => {
    const { data } = await httpService.get(roomsEndPoint, {
      params: {
        test: 1,
      },
    });
    return data;
  },
  create: async payload => {
    const { data } = await httpService.put(roomsEndPoint + payload._id, payload);
    return data;
  },
  getById: async id => {
    const { data } = await httpService.get(roomsEndPoint + id);
    return data;
  },
  setBooking: async (roomId, payload) => {
    const { data } = await httpService.put(roomsEndPoint + roomId + '/bookings/' + payload._id, payload);
    return data;
  },
};

export default roomsService;
