"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  rating: number;
  category: string;
  message: string;
};

const Feedback = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const onSubmit = (data: FormValues) => {
    console.log("Feedback Data:", { ...data, rating });
    setIsSubmitted(true);
  };

  const resetForm = () => {
    reset();
    setRating(0);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#5390C9] text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Share Your Feedback</h2>
            <p className="text-blue-100 mt-1">
              We value your opinion and would love to hear from you
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              ✅
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Thank You!
            </h3>
            <p className="text-gray-600 mb-6">
              Your feedback has been submitted successfully.
            </p>
            <button
              onClick={resetForm}
              className="bg-[#5390C9] hover:bg-[#4678a8] text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Submit New Feedback
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Name *
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`w-full border rounded-lg px-4 py-3 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full border rounded-lg px-4 py-3 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Rating Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                How would you rate your experience? *
              </label>
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setRating(ratingValue)}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                      className="text-2xl focus:outline-none"
                    >
                      {ratingValue <= (hover || rating) ? (
                        <span className="text-yellow-400">★</span>
                      ) : (
                        <span className="text-gray-300">☆</span>
                      )}
                    </button>
                  );
                })}
                {/* 👉 Rating Number দেখাবে */}
                {rating > 0 && (
                  <span className="ml-3 text-gray-700 font-medium">
                    {rating} / 5
                  </span>
                )}
              </div>
              <input
                type="hidden"
                {...register("rating", {
                  validate: () => rating > 0 || "Rating is required",
                })}
                value={rating}
              />
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.rating.message}
                </p>
              )}
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category *
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                defaultValue=""
                className={`w-full border rounded-lg px-4 py-3 ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  -- Select Category --
                </option>
                <option value="general">General Feedback</option>
                <option value="bug">Bug Report</option>
                <option value="suggestion">Feature Suggestion</option>
                <option value="complaint">Complaint</option>
                <option value="compliment">Compliment</option>
                <option value="other">Other</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Message *
              </label>
              <textarea
                rows={4}
                {...register("message", { required: "Message is required" })}
                className={`w-full border rounded-lg px-4 py-3 ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Please share your thoughts..."
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#5390C9] hover:bg-[#4678a8] text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback;
