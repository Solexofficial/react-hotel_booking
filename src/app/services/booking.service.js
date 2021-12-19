import httpService from './http.service';

const bookingEndPoint = 'booking/';

const bookingService = {
  getAll: async () => {
    const { data } = await httpService.get(bookingEndPoint);
    return data;
  },
  create: async payload => {
    const { data } = await httpService.put(bookingEndPoint + payload._id, payload);
    return data;
  },
  getById: async id => {
    const { data } = await httpService.get(bookingEndPoint + id);
    return data;
  },
};

export default bookingService;
