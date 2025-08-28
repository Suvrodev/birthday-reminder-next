"use client";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react"; // icon
import { useAppSelector } from "@/components/redux/hooks";

const DashboardButton = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Link
      href={`/${user?.role}-dashboard`}
      className="flex items-center gap-2 px-4 py-2 bg-[#6741E9] text-white rounded-lg shadow-md hover:bg-[#5531c9] transition"
    >
      <LayoutDashboard size={18} />
      <span>Dashboard</span>
    </Link>
  );
};

export default DashboardButton;
