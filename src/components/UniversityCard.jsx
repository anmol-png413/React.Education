import React, { useEffect, useState } from "react";
import { MapPin, GraduationCap } from "lucide-react";
import { useParams } from "react-router-dom";
import api from "../api"; 
import { useNavigate } from "react-router-dom"; // Your axios instance
import { API_URL } from "../config";

const RelatedUniversities = () => {
  const navigate = useNavigate();
  const [related, setRelated] = useState([]);
  const { name } = useParams();
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const res = await api.get(`/specialization-detail-by-slug/${name}`);
        const relatedUniversities = res.data?.data?.related_universities || [];
        console.log("✅ Related Universities:", relatedUniversities);
        setRelated(relatedUniversities);
      } catch (err) {
        console.error("❌ Failed to fetch related universities:", err);
      }
    };

    fetchData();
  }, [name]);



useEffect(() => {
    const fetchData = async () => {
      try {
       
        const res = await api.get(`/course-category/${slug}`);
        const relatedUniversities = res.data?.related_universities || [];
        console.log("✅ Related Universities:", relatedUniversities);
        setRelated(relatedUniversities);
      } catch (err) {
        console.error("❌ Failed to fetch related universities:", err);
      }
    };

    fetchData();
  }, [slug]);
  return (
   <div className="space-y-4 px-0 py-6 bg-gray-50 rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Related Universities
      </h2>

      {related.length === 0 ? (
        <p className="text-gray-600">No testing universities available.</p>
      ) : (
        related.map((uni) => (
          <div
            key={uni.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border rounded-xl shadow-sm bg-white"
          >
            <div className="flex items-center gap-4">
              <img
                src={`${API_URL}${uni.logo_path}`}
                // alt={uni.name}
                className="w-20 h-20 object-contain rounded-md border"
               
              />
              <div>
                <h2 className="text-lg font-semibold text-blue-700">
                  {uni.name}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                  <MapPin size={16} />
                  {uni.city|| "Malaysia"}
                  <GraduationCap size={16} />
                  {uni.inst_type || "Institution"}
                </div>

                <div className="flex flex-wrap gap-6 mt-2 text-sm font-medium text-gray-700">
                  <div>
                    <span className="text-blue-800">Courses:</span>{" "}
                    {uni.courses || "N/A"}
                  </div>
                  <div>
                    <span className="text-blue-800">World Rank:</span>{" "}
                    {uni.rank || "N/A"}
                  </div>
                  <div>
                    <span className="text-blue-800">Scholarship:</span>{" "}
                    {uni.scholarship ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            </div>

            <button  onClick={() => navigate("/courses-in-malaysias")}
            className="bg-blue-800 text-white text-sm px-4 py-2 rounded hover:bg-blue-900 transition whitespace-nowrap coursor-pointer">
             {uni.allspcprograms}  {name}  Courses Available
            </button>
          </div>
        ))
      )}

      <div className="flex justify-center mt-6">
        <button  onClick={() => navigate("/courses-in-malaysias")}
        className="bg-blue-800 text-white px-5 py-2 rounded hover:bg-blue-900 transition cuorsor-pointer">
          Browse All Courses
        </button>
      </div>
    </div>
  );
};

export default RelatedUniversities;
