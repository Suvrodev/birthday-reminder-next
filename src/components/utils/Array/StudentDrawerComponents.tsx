// HeaderComponents.tsx
import { User, Users, Home, PlusSquare, Gift } from "lucide-react";

export const USerDrawerComponents = [
  { label: "Home", icon: <Home size={20} />, path: "/" },
  {
    label: "My Profile",
    icon: <User size={20} />,
    path: "/user-dashboard/my-profile",
  },
  {
    label: "Add Friend",
    icon: <PlusSquare size={20} />,
    path: "/user-dashboard/add-friend",
  },
  {
    label: "Birthday",
    icon: <Gift size={20} />,
    path: "/user-dashboard/birthday",
  },
  {
    label: "My Friend",
    icon: <Users size={20} />,
    path: "/user-dashboard/my-friend",
  },
];
