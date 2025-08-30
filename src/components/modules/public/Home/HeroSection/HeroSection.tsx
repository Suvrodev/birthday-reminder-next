import React from "react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Gift, PartyPopper, Plus } from "lucide-react";

interface IProps {
  setShowForm: (value: boolean) => void;
  showForm: boolean;
}

const HeroSection = ({ setShowForm, showForm }: IProps) => {
  return (
    <section className="container mx-auto px-6 py-10 flex flex-col items-center text-center">
      <Badge
        variant="outline"
        className="mb-6 py-2 px-4 text-sm font-semibold bg-white border-blue-200 text-blue-700"
      >
        <PartyPopper className="h-4 w-4 mr-1 text-blue-500" /> Celebrate Special
        Moments
      </Badge>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        Never Miss a{" "}
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Birthday
        </span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mb-10">
        Keep track of all your loved one`s birthdays and celebrate them in style
        with personalized reminders and gift ideas.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <Button
          size="lg"
          className="px-8 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="h-5 w-5 mr-2" /> Add Birthday
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="px-8 border-blue-300 text-blue-700 hover:bg-blue-50"
        >
          <Gift className="h-5 w-5 mr-2" /> Gift Ideas
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
