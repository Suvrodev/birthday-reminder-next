"use client";
import logo from "@/app/assets/logo/logo-1.jpg";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const MobileHeader = ({ isOpen, setIsOpen }: Props) => {
  return (
    <div className="w-full p-4 bg-white shadow-md sticky top-0 z-50 flex justify-between items-center">
      <Link href={"/"} className="flex items-center gap-x-2">
        <Image src={logo} alt="Tutor Point" width={30} />
        <h1 className="text-xl font-bold text-[#6741E9]">Tutor Point</h1>
      </Link>
      <button onClick={() => setIsOpen(!isOpen)} className="z-50">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  );
};

export default MobileHeader;
