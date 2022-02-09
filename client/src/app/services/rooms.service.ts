import { BookingType, RoomType } from '../types/types';
import httpService from './http.service';

const roomsEndPoint = 'rooms/';

const roomsService = {
  getAll: async (params?: { [key: string]: any }) => {
    const { data } = await httpService.get(roomsEndPoint, { params: { ...params } });
    return data;
  },
  create: async (payload: RoomType) => {
    const { data } = await httpService.put(roomsEndPoint + payload._id, payload);
    return data;
  },
  update: async (payload: RoomType) => {
    const { data } = await httpService.patch(roomsEndPoint + payload._id, payload);
    return data;
  },
  getById: async (id: string) => {
    const { data } = await httpService.get(roomsEndPoint + id);
    return data;
  },
  setBooking: async (payload: BookingType) => {
    const { data } = await httpService.post(roomsEndPoint + payload.roomId, { bookings: payload._id });
    return data;
  },
  deleteBooking: async (payload: { roomId: string; _id: string }) => {
    const { data } = await httpService.post(roomsEndPoint + payload.roomId, { bookings: payload._id });
    return data;
  },
};

export default roomsService;
