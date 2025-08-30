import React from "react";
import { Button } from "@/components/ui/button";

import { Bell, Calendar, Cake, Gift, Users, Plus } from "lucide-react";

interface IProps {
  setShowForm: (value: boolean) => void;
  showForm: boolean;
}

const Navigation = ({ setShowForm, showForm }: IProps) => {
  return (
    <nav className="flex items-center justify-between p-6">
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full">
          <Cake className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Birthday Reminder
        </span>
      </div>
      <div className="hidden md:flex space-x-6">
        <a
          href="#"
          className="text-sm font-medium hover:text-blue-600 transition-colors flex items-center"
        >
          <Calendar className="h-4 w-4 mr-1" /> Calendar
        </a>
        <a
          href="#"
          className="text-sm font-medium hover:text-blue-600 transition-colors flex items-center"
        >
          <Gift className="h-4 w-4 mr-1" /> Gifts
        </a>
        <a
          href="#"
          className="text-sm font-medium hover:text-blue-600 transition-colors flex items-center"
        >
          <Users className="h-4 w-4 mr-1" /> Friends
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" className="flex items-center">
          <Bell className="h-4 w-4 mr-2" /> Reminders
        </Button>
        <Button
          className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 flex items-center"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Birthday
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
