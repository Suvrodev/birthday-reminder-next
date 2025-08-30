"use client";
import { Cake, Menu, X } from "lucide-react";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const MobileHeader = ({ isOpen, setIsOpen }: Props) => {
  return (
    <div className="w-full p-4 bg-white shadow-md sticky top-0 z-50 flex justify-between items-center">
      {/* <Link href={"/"} className="flex items-center gap-x-2">
        <Image src={logo} alt="Tutor Point" width={30} />
        <h1 className="text-xl font-bold text-[#6741E9]">Tutor Point</h1>
      </Link> */}

      <Link href={"/"} className="flex items-center space-x-2">
        <div className="p-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full">
          <Cake className="h-6 w-6 text-white" />
        </div>
        <span className="text-sm font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Birthday Reminder
        </span>
      </Link>

      <button onClick={() => setIsOpen(!isOpen)} className="z-50">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  );
};

export default MobileHeader;
