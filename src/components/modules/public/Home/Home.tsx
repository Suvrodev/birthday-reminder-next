"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, PartyPopper, Plus, Trash2 } from "lucide-react";
import HeroSection from "./HeroSection/HeroSection";
import CelebrationSection from "./CelebrationSection/CelebrationSection";
import Footer from "./Footer/Footer";

interface Birthday {
  id: number;
  name: string;
  date: string;
  daysUntil: number;
  age: number;
}

const HomePage = () => {
  const [birthdays, setBirthdays] = useState<Birthday[]>([
    { id: 1, name: "Emma Johnson", date: "1995-08-15", daysUntil: 12, age: 29 },
    { id: 2, name: "Michael Chen", date: "1990-09-22", daysUntil: 30, age: 34 },
    {
      id: 3,
      name: "Sarah Williams",
      date: "1988-10-05",
      daysUntil: 43,
      age: 36,
    },
    { id: 4, name: "James Wilson", date: "1992-07-30", daysUntil: -1, age: 32 },
    {
      id: 5,
      name: "Sophia Rodriguez",
      date: "1998-08-28",
      daysUntil: 25,
      age: 26,
    },
  ]);

  const [newBirthday, setNewBirthday] = useState({ name: "", date: "" });
  const [showForm, setShowForm] = useState(true);

  const addBirthday = () => {
    if (newBirthday.name && newBirthday.date) {
      const birthDate = new Date(newBirthday.date);
      const today = new Date();
      const nextBirthday = new Date(
        today.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
      );

      if (nextBirthday < today) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
      }

      const daysUntil = Math.floor(
        (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
      const age = today.getFullYear() - birthDate.getFullYear();

      setBirthdays([
        ...birthdays,
        {
          id: birthdays.length + 1,
          name: newBirthday.name,
          date: newBirthday.date,
          daysUntil,
          age,
        },
      ]);

      setNewBirthday({ name: "", date: "" });
      setShowForm(false);
    }
  };

  const deleteBirthday = (id: number) => {
    setBirthdays(birthdays.filter((birthday) => birthday.id !== id));
  };

  const getGradient = (daysUntil: number) => {
    if (daysUntil === 0) return "from-pink-500 to-yellow-500";
    if (daysUntil <= 7) return "from-purple-500 to-pink-500";
    return "from-blue-400 to-purple-500";
  };

  const getStatus = (daysUntil: number) => {
    if (daysUntil === 0) return "Today! 🎉";
    if (daysUntil === 1) return "Tomorrow!";
    if (daysUntil < 0) return "Passed";
    return `In ${daysUntil} days`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900 dark:via-purple-900 dark:to-gray-900">
      {/* Navigation */}
      {/* <Navigation setShowForm={setShowForm} showForm={showForm} /> */}

      {/* Hero Section */}
      <HeroSection setShowForm={setShowForm} showForm={showForm} />

      {/* Birthday List Section */}
      <section className="container mx-auto px-6 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Upcoming Birthdays</h2>
          <Badge
            variant="outline"
            className="text-sm bg-blue-50 text-blue-700 border-blue-200"
          >
            {birthdays.filter((b) => b.daysUntil >= 0).length} upcoming
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {birthdays.map((birthday) => (
            <Card
              key={birthday.id}
              className={`overflow-hidden border-0 shadow-lg bg-gradient-to-br ${getGradient(
                birthday.daysUntil
              )} text-white`}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{birthday.name}</CardTitle>
                    <CardDescription className="text-white/80">
                      Turning {birthday.age} years old
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20"
                    onClick={() => deleteBirthday(birthday.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>
                      {new Date(birthday.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <Badge
                    variant={birthday.daysUntil === 0 ? "default" : "secondary"}
                    className={
                      birthday.daysUntil === 0
                        ? "bg-white text-blue-600"
                        : "bg-white/20"
                    }
                  >
                    {getStatus(birthday.daysUntil)}
                  </Badge>
                </div>

                {birthday.daysUntil === 0 && (
                  <div className="mt-4 p-3 bg-white/20 rounded-lg flex items-center">
                    <PartyPopper className="h-5 w-5 mr-2 text-yellow-300" />
                    <span className="text-sm">
                      It`s their birthday today! Send wishes now!
                    </span>
                  </div>
                )}

                {birthday.daysUntil > 0 && birthday.daysUntil <= 7 && (
                  <div className="mt-4 p-3 bg-white/20 rounded-lg flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-yellow-300" />
                    <span className="text-sm">
                      Coming up soon! Time to plan a surprise!
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Add Birthday Form */}
      {showForm && (
        <section className="container mx-auto px-6 pb-16">
          <Card className="max-w-2xl mx-auto bg-white/30 backdrop-blur-md shadow-xl rounded-xl border ">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Plus className="h-5 w-5 mr-2" /> Add New Birthday
              </CardTitle>
              <CardDescription>
                Add a friend or family member to your birthday reminder list
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={newBirthday.name}
                  onChange={(e) =>
                    setNewBirthday({ ...newBirthday, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Birthdate</Label>
                <Input
                  id="date"
                  type="date"
                  value={newBirthday.date}
                  onChange={(e) =>
                    setNewBirthday({ ...newBirthday, date: e.target.value })
                  }
                />
              </div>
              <Button
                className="w-full bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 shadow-lg"
                onClick={addBirthday}
              >
                Add Birthday
              </Button>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Celebration Section */}
      <CelebrationSection />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
