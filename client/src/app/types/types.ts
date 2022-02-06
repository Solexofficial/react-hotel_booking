export type RoomType = {
  _id: string;
  roomNumber: number;
  images: Array<string>;
  price: number;
  type: 'Стандарт' | 'Люкс';
  comforts?: Array<string>;
  bookings: Array<string>;
  hasWifi?: boolean;
  hasConditioner?: boolean;
  hasWorkSpace?: boolean;
  canSmoke?: boolean;
  canPets?: boolean;
  canInvite?: boolean;
  hasWideCorridor?: boolean;
  hasDisabledAssistant?: boolean;
};

export type BookingType = {};
