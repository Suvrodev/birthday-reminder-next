"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const UserDashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/user-dashboard/my-profile");
  }, [router]);

  return null; // কিছু render করার দরকার নাই, শুধু redirect
};

export default UserDashboardPage;
