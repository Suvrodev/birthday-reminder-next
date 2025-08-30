import { Cake } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full">
                <Cake className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold">Birthday Reminder</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Never forget a special day again. Celebrate every birthday with
              joy.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Reminders
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Gift Suggestions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Event Planning
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-blue-600">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Birthday Reminder. Made with ❤️ and 🎂
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
