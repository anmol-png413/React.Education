import React, { useEffect, useState } from "react";
import { ArrowUpRightFromSquare, Award, Globe, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api"; // adjust if your path is different

const UniversityRankingTable = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await api.get("/home");
        const universityRanks = response.data?.data?.universityRanks;
   
       
        if (Array.isArray(universityRanks)) {
          setRankings(universityRanks);
        } else {
          console.error("Unexpected universityRanks format");
        }
      } catch (error) {
        console.error("Error fetching university rankings:", error);
      }
    };

    fetchRankings();
  }, []);

  return (
    <section className="bg-gray-100 px-4 py-10 md:px-10 lg:px-20 overflow-x-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        🎓 Top Malaysian Universities – <span className="text-blue-600">2025 Rankings</span>
      </h2>

      <table className="min-w-full text-sm border border-gray-300 shadow-md rounded-md overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <tr>
            <th className="p-4 text-left font-semibold">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                University
              </div>
            </th>
            <th className="p-4 text-center font-semibold">
              <div className="flex items-center justify-center gap-2">
                <Award className="w-4 h-4" />
                Times Rank
              </div>
            </th>
            <th className="p-4 text-center font-semibold">
              <div className="flex items-center justify-center gap-2">
                <Globe className="w-4 h-4" />
                QS World
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {rankings.map((uni) => (
            <tr
              key={uni.id}
              className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition duration-200"
            >
              <td className="p-4 text-blue-800 font-medium">
                <div>{uni.name}</div>
                <Link
                  to={`/${uni.uname}`}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
                >
                  View All Courses <ArrowUpRightFromSquare className="w-3 h-3" />
                </Link>
              </td>
              <td className="p-4 text-center">
                <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {uni.times_rank || "N/A"}
                </span>
              </td>
              <td className="p-4 text-center">
                <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {uni.qs_rank || "N/A"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UniversityRankingTable;
