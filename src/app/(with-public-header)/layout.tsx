"use client";

import { useEffect, useState } from "react";
import MobileHeader from "./MobileHeader";
import Drawer from "./Drawer";
import PublicHeader from "@/components/modules/shared/PublicHeader/PublicHeader";

export interface ILayout {
  children: React.ReactNode;
}
const PublicHeaderLayout = ({ children }: ILayout) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Lock scroll
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (isMobile === null) return null;

  return (
    <div className="relative">
      {isMobile ? (
        <>
          <div className="fixed w-full top-0 z-20">
            <MobileHeader isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      ) : (
        <PublicHeader />
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-0 mt-[100px] md:mt-10">
        {children}
      </div>
    </div>
  );
};

export default PublicHeaderLayout;
