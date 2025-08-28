"use client";
import logo from "@/app/assets/logo/logo-3.jpeg";
import { THeader } from "@/components/utils/globalTypes/globalTypes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerComponents } from "@/components/utils/Array/HeaderComponents";
import LoginCheck from "../../Login/LoginCheck/LoginCheck";

const PublicHeader = () => {
  const path = usePathname();
  // console.log("Path: ", path);
  return (
    <div className="shadow-md   sticky top-0 z-10 bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto py-2">
        <Link href={"/"} className="flex items-center gap-x-2 w-1/3">
          <Image
            src={logo}
            alt="Tutor Point"
            width={65}
            className="rounded-xl"
          />
          <h1 className="text-2xl font-bold text-[#6741E9]">Tutor Point</h1>
        </Link>
        <div className="flex gap-4 justify-center items-center  w-1/3">
          {headerComponents.map((data: THeader, idx: number) => (
            <Link
              href={data.path}
              key={idx}
              className={`${data.path == path ? "text-blue-500 " : ""}`}
            >
              <div className="relative">
                {data.label}
                <p
                  className={`${
                    data.path == path
                      ? "absolute w-full h-[1px] bg-blue-600"
                      : ""
                  }`}
                ></p>
              </div>
            </Link>
          ))}
        </div>
        <div className="w-1/3 flex justify-end">
          <LoginCheck />
        </div>
      </div>
    </div>
  );
};

export default PublicHeader;
