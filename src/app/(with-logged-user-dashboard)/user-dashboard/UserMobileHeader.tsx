// app/layouts/MobileHeader.tsx
"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/logo/logo-3.jpeg";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const UserMobileHeader = ({ isOpen, setIsOpen }: Props) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
      <Link href={"/"} className="flex items-center gap-x-2">
        <Image src={logo} alt="Tutor Point" width={30} />
        <h1 className="text-xl font-bold text-[#6741E9]">Birthday Reminder</h1>
      </Link>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  );
};

export default UserMobileHeader;
