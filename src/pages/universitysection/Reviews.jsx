import React from "react";
import { FaStar, FaCheckCircle } from "react-icons/fa";

// ⭐ Reusable ReviewCard
const ReviewCard = ({ name, date, rating, reviewTitle, reviewText }) => {
  return (
    <div className="bg-white rounded-md border p-4 mb-4 relative shadow-sm">
      {/* Floating Score */}
      <div className="absolute top-4 right-4 bg-blue-900 text-white font-bold text-lg px-3 py-1 rounded">
        {rating.toFixed(1)}
      </div>

      <div className="flex items-center gap-3 mb-2">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white text-xl font-bold">
          {name.charAt(0)}
        </div>

        {/* Name + Verified + Stars */}
        <div>
          <div className="flex items-center gap-1 text-lg font-semibold">
            {name}
            <FaCheckCircle className="text-green-600" />
          </div>
          <div className="flex items-center text-green-600 text-sm mt-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-green-600" />
            ))}
            <span className="ml-2 text-gray-600">✔ Verified Review</span>
          </div>
        </div>
      </div>

      {/* Date */}
      <p className="text-sm text-gray-500 mb-2">
        Post on - {date} <span className="font-semibold text-gray-800">by {name}</span>
      </p>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{reviewTitle}</h3>

      {/* Body */}
      <p className="text-gray-700 leading-relaxed">{reviewText}</p>
    </div>
  );
};

// ⭐ Main Component
const Reviews = () => {
  const reviews = [
    {
      name: "David",
      date: "Aug 19, 2023",
      rating: 2.5,
      reviewTitle: "Highly Recommended - Help University",
      reviewText:
        "HELP University provides an exceptional learning experience with a dedicated faculty who are experts in their fields. The supportive environment encourages students to excel academically and personally.",
    },
    {
      name: "Sophia",
      date: "Sep 05, 2023",
      rating: 4.0,
      reviewTitle: "Great Campus and Teachers",
      reviewText:
        "The campus life is vibrant and the professors are very helpful. The classes are engaging and I feel supported throughout my academic journey.",
    },
    {
      name: "Arjun",
      date: "Oct 11, 2023",
      rating: 3.5,
      reviewTitle: "Good University, Some Improvements Needed",
      reviewText:
        "The academics are strong, though admin processes can be slow. Still, it's a great place to study and grow.",
    },
    {
      name: "Liyana",
      date: "Nov 22, 2023",
      rating: 5.0,
      reviewTitle: "Best Decision Ever",
      reviewText:
        "I am grateful for choosing HELP University. The learning atmosphere, peer support, and facilities are top-notch.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Top Section */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Rating and Reviews</h2>
        <div className="flex justify-center items-center gap-2 mb-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-xl" />
          ))}
          <span className="text-lg font-semibold">5.0 out of 5</span>
        </div>
        <p className="text-gray-600">Based on 4 Review</p>
        <p className="font-semibold text-gray-700 mt-1">100% Reviewer</p>
        <p className="text-gray-500">Recommends this college</p>
      </div>

      {/* Reviews */}
      <h3 className="text-lg font-semibold mb-2">Showing {reviews.length} Reviews</h3>
      {reviews.map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}
    </div>
  );
};

export default Reviews;
