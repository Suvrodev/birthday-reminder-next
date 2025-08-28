"use client";

import { headerComponents } from "@/components/utils/Array/HeaderComponents";
import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Drawer = ({ isOpen, setIsOpen }: Props) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-yellow-600/10 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-md p-4"
      >
        <div className="flex flex-col  mt-10">
          {headerComponents.map((data, idx: number) => (
            <Link
              href={data.path}
              key={idx}
              className="border-b-1 p-4"
              onClick={() => setIsOpen(!isOpen)}
            >
              {data.label}
            </Link>
          ))}
          <Link
            href={"/map"}
            className="border-b-1 p-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            Map
          </Link>
          <div className="flex items-center justify-start p-4">
            {/* <LoginCheck /> */}
            <h1>Login Check</h1>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Drawer;
