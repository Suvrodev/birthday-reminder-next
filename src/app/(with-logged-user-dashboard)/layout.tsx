"use client";

import { useEffect, useState } from "react";
import UserDrawer from "./user-dashboard/UserDrawer";
import UserMobileHeader from "./user-dashboard/UserMobileHeader";

export interface ILayout {
  children: React.ReactNode;
}

const ConsultantLayout = ({ children }: ILayout) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock scroll when drawer open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (isMobile === null) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Drawer */}
      <UserDrawer isOpen={isMobile ? isOpen : true} setIsOpen={setIsOpen} />

      {/* Mobile Header */}
      {isMobile && <UserMobileHeader isOpen={isOpen} setIsOpen={setIsOpen} />}

      {/* Page content */}
      <div className={`flex-1 overflow-y-auto ${isMobile ? "mt-[70px] " : ""}`}>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 land">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ConsultantLayout;
