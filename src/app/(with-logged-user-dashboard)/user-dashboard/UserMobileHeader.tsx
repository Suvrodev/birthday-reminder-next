// app/layouts/MobileHeader.tsx
"use client";

import { Cake, Menu, X } from "lucide-react";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const UserMobileHeader = ({ isOpen, setIsOpen }: Props) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
      <Link href={"/"} className="flex items-center space-x-2">
        <div className="p-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full">
          <Cake className="h-6 w-6 text-white" />
        </div>
        <span className="text-sm font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Birthday Reminder
        </span>
      </Link>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  );
};

export default UserMobileHeader;
