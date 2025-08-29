export type TLoggedUser = {
  firstName: string;
  lastName?: string;
  email: string;
  role?: string;
  profileImage: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  isBlocked?: boolean;
};

export type TFriend = {
  _id: string;
  name: string;
  date: string; // ISO date string
  photo: string;
  ratting: number; // rating (0-5)
  phone: string;
  location: string;
  ref: string;
};
export type TBanner = {
  title: string;
  url: string;
};
export type THeader = {
  path: string;
  label: string;
};
