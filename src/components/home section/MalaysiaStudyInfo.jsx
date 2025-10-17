import React from "react";
import {
  FaCheckCircle,
  FaUniversity,
  FaSun,
  FaMoneyBillWave,
  FaBed,
  FaSuitcaseRolling,
  FaGlobe,
  FaBook,
} from "react-icons/fa";
import { MdTranslate } from "react-icons/md";

const MalaysiaStudyInfo = () => {
  return (
    <section className="bg-white px-4 py-14 md:px-16 lg:px-24">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
        Why Study in Malaysia:{" "}
        <span className="text-blue-600">Unlock Global Opportunities</span>
      </h2>

      <p className="text-gray-700 max-w-4xl mx-auto text-center mb-12">
        Malaysia offers a unique combination of world-class education and diverse
        cultural experiences, making it a top destination for international
        students. With globally recognized universities, cutting-edge
        infrastructure, and an affordable cost of living, Malaysia delivers the
        perfect environment for students seeking a high-quality education.
        Discover Malaysia that combines academic excellence with global exposure,
        offering both personal growth and career development in a vibrant,
        multicultural setting.
      </p>

      {/* Grid with Cards and Map */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Info Cards */}
        <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          <InfoCard
            icon={<FaCheckCircle />}
            title="90%"
            subtitle="Visa Approval Rate"
            bg="bg-blue-100 text-blue-600"
          />
          <InfoCard
            icon={<FaUniversity />}
            title="500+"
            subtitle="Total Institutions"
            bg="bg-green-100 text-green-600"
          />
          <InfoCard
            icon={<FaSun />}
            title="Summer"
            subtitle="Best Intake"
            bg="bg-yellow-100 text-yellow-500"
          />
          <InfoCard
            icon={<FaMoneyBillWave />}
            title="$11,400 - $150,000"
            subtitle="Average Study Cost"
            bg="bg-indigo-100 text-indigo-600"
          />
          <InfoCard
            icon={<FaBed />}
            title="$1,000 - $1,200"
            subtitle="Living Cost"
            bg="bg-pink-100 text-pink-500"
          />
          <InfoCard
            icon={<FaSuitcaseRolling />}
            title="$800 - $4,000"
            subtitle="Travel Cost"
            bg="bg-purple-100 text-purple-600"
          />
          <InfoCard
            icon={<FaGlobe />}
            title="80 (iBT)"
            subtitle="Min TOEFL Score"
            bg="bg-sky-100 text-sky-600"
          />
          <InfoCard
            icon={<MdTranslate />}
            title="6"
            subtitle="Min IELTS Score"
            bg="bg-red-100 text-red-600"
          />
          <InfoCard
            icon={<FaBook />}
            title="58"
            subtitle="Min PTE Score"
            bg="bg-blue-100 text-blue-800"
          />
        </div>

        {/* Right: Map */}
        <div className="flex justify-center">
          <img
            src="/malaysia-map.png"
            alt="Malaysia Map"
            className="w-full max-w-md "
          />
        </div>
      </div>
    </section>
  );
};

const InfoCard = ({ icon, title, subtitle, bg }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-300 flex items-center space-x-4">
      <div className={`w-12 h-12 flex items-center justify-center rounded-full ${bg} text-xl`}>
        {icon}
      </div>
      <div>
        <div className="text-xl font-bold text-gray-900">{title}</div>
        <div className="text-sm text-gray-600">{subtitle}</div>
      </div>
    </div>
  );
};

export default MalaysiaStudyInfo;
