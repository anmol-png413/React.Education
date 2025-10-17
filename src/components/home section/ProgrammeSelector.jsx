import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import {
  FaTools,
  FaHeartbeat,
  FaMicroscope,
  FaLeaf,
  FaGavel,
  FaFlask,
  FaShip,
  FaCamera,
  FaGlobe,
  FaCouch,
  FaPrayingHands,
  FaBrain,
  FaGraduationCap,
  FaPeopleCarry,
  FaUserMd,
  FaBusinessTime,
  FaPaintBrush,
  FaBalanceScale,
  FaUserShield,
} from "react-icons/fa";
import api from "../../api"; // adjust path based on your project

const iconMap = [
  FaTools,
  FaHeartbeat,
  FaMicroscope,
  FaLeaf,
  FaGavel,
  FaFlask,
  FaShip,
  FaCamera,
  FaGlobe,
  FaCouch,
  FaPrayingHands,
  FaBrain,
  FaGraduationCap,
  FaPeopleCarry,
  FaUserMd,
  FaBusinessTime,
  FaPaintBrush,
  FaBalanceScale,
  FaUserShield,
];

const ProgrammeSelector = () => {
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const res = await api.get("/home");
        const data = res.data?.data?.specializations;
        console.log("API Response: ", res);
        if (Array.isArray(data)) {
          setSpecializations(data);
        } else {
          console.error("Specializations data not an array");
        }
      } catch (err) {
        console.error("Error fetching specializations", err);
      }
    };

    fetchSpecializations();
  }, []);

  return (
    <section className="bg-white px-4 py-16 md:px-10 lg:px-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Choose Your <span className="text-blue-600">Favourite Programme</span> in Malaysia
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {specializations.map((item, index) => {
          const Icon = iconMap[index % iconMap.length] || FaGlobe;
          return (
            <Link
              key={item.id}
              to={`/specialization/${item.uri}`}
              className="bg-gray-50 rounded-2xl shadow-md p-5 group hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center text-xl">
                  <Icon />
                </div>
                <FaArrowRight className="text-orange-500 group-hover:text-white transition" />
              </div>
              <h3 className="text-gray-800 font-semibold text-lg truncate group-hover:text-blue-600 transition">
                {item.name}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ProgrammeSelector;
