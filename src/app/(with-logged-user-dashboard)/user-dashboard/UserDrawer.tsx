"use client";

import { USerDrawerComponents } from "@/components/utils/Array/StudentDrawerComponents";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logout from "@/components/modules/LoggedUser/Login/UserResponsibility/Logout/Logout";
import { useAppSelector } from "@/components/redux/hooks";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const UserDrawer = ({ isOpen, setIsOpen }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const path = usePathname();
  // console.log("Path: ", path);
  return (
    <>
      {/* Overlay with smooth animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`
          fixed top-0 left-0 min-h-screen bg-gradient-to-b from-white to-gray-50 z-50 
          shadow-xl p-6 w-72 border-r border-gray-200
          md:sticky md:top-0 md:h-screen md:translate-x-0 md:flex-shrink-0
          flex flex-col justify-between
        `}
      >
        {/* User Info with animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-2 mb-8 mt-20 md:mt-0 "
        >
          <div className="w-28 h-28 relative rounded-full overflow-hidden border-4 border-white shadow-lg">
            {user?.profileImage && (
              <Image
                src={user.profileImage}
                alt="User"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            )}
          </div>
          <div className="text-center mt-4">
            <h2 className="font-semibold text-xl text-gray-800">
              <span> {user?.firstName} </span> <span> {user?.lastName} </span>
            </h2>
            <p className="text-sm text-gray-500 mt-1 uppercase">{user?.role}</p>
          </div>
        </motion.div>

        {/* Menu Items with staggered animation */}
        <nav className="flex-1">
          <ul className="flex flex-col gap-1">
            {USerDrawerComponents.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx + 0.3 }}
              >
                <Link
                  href={item.path}
                  className={`flex items-center gap-4 p-3 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 group ${
                    item.path === path ? "bg-purple-400 text-white" : ""
                  }`}
                  onClick={() => isOpen && setIsOpen(false)}
                >
                  <span className="text-purple-600 group-hover:text-purple-800 transition-colors duration-200">
                    {item.icon}
                  </span>
                  <span className="font-normal md:font-medium">
                    {item.label}
                  </span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    →
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div>
          <Logout />
        </div>

        {/* Footer with subtle animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 text-xs text-gray-400 flex flex-col items-center"
        >
          <div className="w-16 h-px bg-gray-200 mb-3"></div>
          <p>&copy; 2025 Tutor Point</p>
          <p className="mt-1">All rights reserved</p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default UserDrawer;
