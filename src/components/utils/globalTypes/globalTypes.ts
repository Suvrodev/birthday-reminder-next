export type THeader = {
  label: string;
  path: string;
};

export type TBanner = {
  title: string;
  url: string;
};

export type TLoggedUser = {
  email: string;
  email_verified: boolean;
  exp: number;
  firstName: string;
  iat: number;
  isProfileComplete: boolean;
  lastName: string;
  picture: string;
  role: "teacher" | "parent" | "coaching" | "consultant"; // চাইলে নির্দিষ্ট role union দিতে পারো
  userId: string;
};

export type TStudentPost = {
  id: number;
  title: string;
  class: string;
  daysPerWeek: number;
  subjects: string[];
  tutorGender: "Male" | "Female";
  salary: number;
  salaryNegotiable: boolean;
  medium: "Bangla" | "English" | string;
  postTime: string; // ISO string
  description: string;
  user: {
    username: string;
    profileImage: string;
    postId: number;
  };
  location: {
    lat: number;
    lng: number;
  };
  isSaved: boolean;
  phone?: string;
};

export type TTeacher = {
  id: string;
  name: string;
  university: string;
  subject: string;
  department: string;
  location: {
    lat: number;
    lng: number;
  };
  salary: string;
  rating: number;
  image: string;
  tags: string[];
  phone: string;
  email: string;
  whatsapp: string;
  isSaved: boolean;
  isVerified: boolean;
};

export type TCoaching = {
  id: string;
  name: string;
  frontImage: string;
  coverImage: string;
  profileImage: string;
  images: string[];
  location: {
    lat: number;
    lng: number;
  };
  phone: string;
  whatsapp: string;
  description: string;
  isSaved: boolean;
};
