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

export type TBanner = {
  title: string;
  url: string;
};
export type THeader = {
  path: string;
  label: string;
};
