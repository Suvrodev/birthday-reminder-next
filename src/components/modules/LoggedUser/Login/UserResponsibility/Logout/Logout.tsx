"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { clearTokenAction } from "@/components/utils/authService/getCurrentUser";
import { useAppDispatch } from "@/components/redux/hooks";
import { logOut } from "@/components/redux/features/auth/authSlice";

const Logout = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleLogout = async () => {
    await clearTokenAction();
    dispatch(logOut());
    // window.location.reload();
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
    >
      Logout
    </button>
  );
};

export default Logout;
