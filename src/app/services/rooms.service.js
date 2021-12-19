import httpService from './http.service';

const roomsEndPoint = 'rooms/';

const roomsService = {
  getAll: async () => {
    const { data } = await httpService.get(roomsEndPoint);
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
    const { data } = await httpService.patch(roomsEndPoint + roomId, payload);
    return data;
  },
};

export default roomsService;
