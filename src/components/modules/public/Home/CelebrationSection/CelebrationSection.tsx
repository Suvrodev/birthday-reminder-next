import React from "react";

import { Bell, Calendar, Gift, PartyPopper } from "lucide-react";

const CelebrationSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-16">
      <div className="container mx-auto px-6 text-center">
        <PartyPopper className="h-12 w-12 mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Celebrate Every Moment
        </h2>
        <p className="text-blue-100 max-w-2xl mx-auto mb-10">
          Make every birthday special with personalized reminders, gift
          suggestions, and celebration ideas.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <Bell className="h-10 w-10 mb-4 text-blue-200" />
            <h3 className="font-semibold mb-2">Smart Reminders</h3>
            <p className="text-sm">
              Get notified before birthdays so you`re always prepared
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <Gift className="h-10 w-10 mb-4 text-blue-200" />
            <h3 className="font-semibold mb-2">Gift Ideas</h3>
            <p className="text-sm">
              Personalized gift recommendations based on interests
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <Calendar className="h-10 w-10 mb-4 text-blue-200" />
            <h3 className="font-semibold mb-2">Event Planning</h3>
            <p className="text-sm">
              Plan parties and celebrations with our tools
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CelebrationSection;
