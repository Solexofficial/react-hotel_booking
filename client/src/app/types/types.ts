export type RoomType = {
  _id: string;
  roomNumber: number | string;
  countReviews?: number;
  rate?: number;
  images?: Array<string>;
  price: number;
  type?: 'Стандарт' | 'Люкс';
  comforts?: Array<string>;
  bookings?: Array<string> | null;
  hasWifi?: boolean;
  hasConditioner?: boolean;
  hasWorkSpace?: boolean;
  canSmoke?: boolean;
  canPets?: boolean;
  canInvite?: boolean;
  hasWideCorridor?: boolean;
  hasDisabledAssistant?: boolean;
};

export type BookingType = {
  _id?: string;
  adults: number;
  babies: number;
  children: number;
  arrivalDate: Date;
  departureDate: Date;
  roomId: string;
  userId: string;
  totalPrice: number;
  expires_at?: number;
};

export type UserType = {
  _id?: string;
  firstName: string;
  secondName: string;
  subscribe?: boolean;
  birthYear: Date | number;
  avatarPhoto?: string;
  email?: string;
  password?: string;
  role: 'user' | 'admin';
  gender: 'male' | 'female';
};

export type ReviewType = {
  _id?: string;
  content: string;
  rating: number;
  roomId: string;
  userId?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
};

export type LikeType = {
  _id: string;
  reviewId: string;
  userId: string;
  created_at?: Date;
  updated_at?: Date;
};

export type SignInDataType = {
  email: string;
  password: string;
};

