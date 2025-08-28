// HeaderComponents.tsx
import {
  User,
  FileText,
  Bookmark,
  Users,
  Home,
  FileCheck,
  Info,
  PlusSquare,
} from "lucide-react";

export const StudentDrawerComponents = [
  {
    label: "My Profile",
    icon: <User size={20} />,
    path: "/parent-dashboard/my-profile",
  },
  {
    label: "Add Post",
    icon: <PlusSquare size={20} />,
    path: "/parent-dashboard/add-post",
  },
  {
    label: "My Post",
    icon: <FileText size={20} />,
    path: "/parent-dashboard/my-post",
  },
  {
    label: "Saved Post",
    icon: <Bookmark size={20} />,
    path: "/parent-dashboard/saved-post",
  },
  {
    label: "Saved Teacher",
    icon: <Users size={20} />,
    path: "/parent-dashboard/saved-teacher",
  },
  {
    label: "Saved Coaching",
    icon: <Home size={20} />,
    path: "/parent-dashboard/saved-coaching",
  },
  {
    label: "Saved Consultant",
    icon: <FileCheck size={20} />,
    path: "/parent-dashboard/saved-consultant",
  },
  {
    label: "Terms & Condition",
    icon: <Info size={20} />,
    path: "/parent-dashboard/terms",
  },
];

export const TeacherDrawerComponents = [
  {
    label: "My Profile",
    icon: <User size={20} />,
    path: "/teacher-dashboard/my-profile",
  },
  {
    label: "Saved Post",
    icon: <Bookmark size={20} />,
    path: "/teacher-dashboard/saved-post",
  },
  {
    label: "Saved Teacher",
    icon: <Users size={20} />,
    path: "/teacher-dashboard/saved-teacher",
  },
  {
    label: "Saved Coaching",
    icon: <Home size={20} />,
    path: "/teacher-dashboard/saved-coaching",
  },
  {
    label: "Saved Consultant",
    icon: <FileCheck size={20} />,
    path: "/teacher-dashboard/saved-consultant",
  },
  {
    label: "Terms & Condition",
    icon: <Info size={20} />,
    path: "/teacher-dashboard/terms",
  },
];

export const CoachingDrawerComponents = [
  {
    label: "My Profile",
    icon: <User size={20} />,
    path: "/coaching-dashboard/my-profile",
  },
  {
    label: "Add Post",
    icon: <PlusSquare size={20} />,
    path: "/coaching-dashboard/add-post",
  },
  {
    label: "My Post",
    icon: <FileText size={20} />,
    path: "/coaching-dashboard/my-post",
  },
  {
    label: "Saved Post",
    icon: <Users size={20} />,
    path: "/coaching-dashboard/saved-post",
  },
  {
    label: "Saved Teacher",
    icon: <Bookmark size={20} />,
    path: "/coaching-dashboard/saved-teacher",
  },
  {
    label: "Saved Coaching",
    icon: <Home size={20} />,
    path: "/coaching-dashboard/saved-coaching",
  },
  {
    label: "Saved Consultant",
    icon: <FileCheck size={20} />,
    path: "/coaching-dashboard/saved-consultant",
  },
  {
    label: "Terms & Condition",
    icon: <Info size={20} />,
    path: "/coaching-dashboard/terms",
  },
];

export const ConsultantDrawerComponents = [
  {
    label: "My Profile",
    icon: <User size={20} />,
    path: "/consultant-dashboard/my-profile",
  },
  {
    label: "Add Post",
    icon: <PlusSquare size={20} />,
    path: "/consultant-dashboard/add-post",
  },
  {
    label: "My Post",
    icon: <FileText size={20} />,
    path: "/consultant-dashboard/my-post",
  },
  {
    label: "Saved Post",
    icon: <Bookmark size={20} />,
    path: "/consultant-dashboard/saved-post",
  },
  {
    label: "Saved Teacher",
    icon: <Users size={20} />,
    path: "/consultant-dashboard/saved-teacher",
  },
  {
    label: "Saved Coaching",
    icon: <Home size={20} />,
    path: "/consultant-dashboard/saved-coaching",
  },
  {
    label: "Saved Consultant",
    icon: <FileCheck size={20} />,
    path: "/consultant-dashboard/saved-consultant",
  },
  {
    label: "Terms & Condition",
    icon: <Info size={20} />,
    path: "/consultant-dashboard/terms",
  },
];
