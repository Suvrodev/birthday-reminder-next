"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerComponents } from "@/components/utils/Array/HeaderComponents";
import LoginCheck from "../../LoggedUser/Login/LoginCheck/LoginCheck";
import { useState } from "react";
import { THeader } from "@/components/utils/globalTypes/globalTypes";
import { Cake } from "lucide-react";

const PublicHeader = () => {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-x-3 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full">
                <Cake className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Birthday Reminder
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {headerComponents.map((data: THeader, idx: number) => (
              <Link
                href={data.path}
                key={idx}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  data.path === path
                    ? "text-white bg-gradient-to-r from-purple-600 to-indigo-700 shadow-md"
                    : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                {data.label}
              </Link>
            ))}
          </nav>

          {/* Login Section */}
          <div className="hidden md:flex items-center justify-end flex-shrink-0">
            <LoginCheck />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t rounded-b-md shadow-lg">
            {headerComponents.map((data: THeader, idx: number) => (
              <Link
                href={data.path}
                key={idx}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  data.path === path
                    ? "text-white bg-gradient-to-r from-purple-600 to-indigo-700"
                    : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {data.label}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-gray-200">
              <LoginCheck />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
