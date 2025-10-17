import React from "react";
import {
  FaUserEdit, FaFileAlt, FaUniversity, FaFileSignature, FaChalkboardTeacher,
  FaMoneyCheckAlt, FaGlobeAsia, FaPlane, FaFileInvoice,
  FaCertificate, FaGraduationCap, FaUserGraduate, FaGlasses
} from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const leftServices = [
  { title: "Register", sub: "Yourself", icon: <FaUserEdit />, link: "/register" },
  { title: "Document", sub: "Counselling", icon: <FaFileAlt />, link: "/document-counselling" },
  { title: "Entrance", sub: "Test", icon: <FaFileInvoice />, link: "/entrance-test" },
  { title: "University", sub: "Shortlist", icon: <FaUniversity />, link: "/university-shortlist" },
  { title: "Preparing", sub: "Docs", icon: <FaFileSignature />, link: "/preparing-documentation" },
  { title: "Application", sub: "Guidance", icon: <FaChalkboardTeacher />, link: "/application-guidance" },
  { title: "Financial", sub: "Docs", icon: <FaMoneyCheckAlt />, link: "/financial-documentation" },
  { title: "VISA", sub: "Application", icon: <FaGlobeAsia />, link: "/visa-application" },
  { title: "Post", sub: "Visa Help", icon: <FaPlane />, link: "/post-visa" },
];

const rightCourses = [
  { label: "Certificate", icon: <FaCertificate />, link: "/courses/certificate" },
  { label: "Pre University", icon: <FaUserGraduate />, link: "/courses/pre-university" },
  { label: "Diploma", icon: <FaGraduationCap />, link: "/courses/diploma" },
  { label: "Under Graduate", icon: <FaGraduationCap />, link: "/courses/under-graduate" },
  { label: "Post Graduate", icon: <FaUserGraduate />, link: "/courses/post-graduate" },
  { label: "P.hd", icon: <FaGlasses />, link: "/courses/phd" },
];

const CounsellorSupport = () => {
  return (
    <section className="bg-white px-4 py-12 md:px-10 lg:px-20">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Side */}
        <div className="flex-[1.2]">
          <h2 className="text-3xl font-bold mb-8 leading-tight">
            How Our <span className="text-blue-600">Academic Counsellor</span> Can Help You Get Admission in Malaysia
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {leftServices.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="group bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl mb-2 shadow-md group-hover:scale-105 transition-all">
                    {item.icon}
                  </div>
                  <p className="text-[15px] font-bold text-gray-800 group-hover:text-blue-700">{item.title}</p>
                  <p className="text-sm text-gray-500 group-hover:text-blue-600">{item.sub}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Button */}
          <div className="mt-8">
            <a
              href="/talk-to-counsellor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold transition hover:scale-105"
            >
              TALK TO COUNSELLOR
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 bg-gray-50 p-6 rounded-2xl shadow-inner">
          <h3 className="text-2xl font-semibold mb-6">
            Study in <span className="text-blue-600">Malaysia Courses</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {rightCourses.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="group bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl mb-2 shadow-md group-hover:scale-105 transition-all">
                    {item.icon}
                  </div>
                  <p className="text-base font-semibold text-gray-800 group-hover:text-blue-700">
                    {item.label}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounsellorSupport;
