"use client";

import Image from "next/image";
import DashboardButton from "../UserResponsibility/Dashboard/Dashboard";
import { useAppSelector } from "@/components/redux/hooks";
import GoogleLoginBase from "../GoogleLoginBase/GoogleLoginBase";

const LoginCheck = () => {
  const { user } = useAppSelector((state) => state.auth);
  console.log("User in Check Login: ", user);

  return (
    <div>
      {user ? (
        <div className="flex items-center justify-center gap-x-2 ">
          <div className="hidden md:block">
            <Image
              src={user?.image}
              alt=""
              height={50}
              width={50}
              className="rounded-full"
            />
          </div>
          <DashboardButton />
          {/* <Logout /> */}
        </div>
      ) : (
        <GoogleLoginBase />
      )}
    </div>
  );
};

export default LoginCheck;
