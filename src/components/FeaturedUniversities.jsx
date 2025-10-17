import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../api";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";

const FeaturedUniversities = () => {
  const [universities, setUniversity] = useState([]);
  const { name } = useParams();
const { slug } = useParams();
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await api.get(`/specialization-detail-by-slug/${name}`);
        // console.log("✅ Full API response:", res.data);
        const universityList = res.data.data.featured_universities || [];
        setUniversity(universityList); // ✅ correct setter function
      } catch (error) {
        console.error("❌ Failed to fetch featured universities:", error);
      }
    };

    fetchUniversities();
  }, [name]);

 useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await api.get(`/exam-details/${slug}`);
        // console.log("✅ Full API response:", res.data);
        const universityList = res.data.data.featured_universities || [];
        setUniversity(universityList); // ✅ correct setter function
      } catch (error) {
        console.error("❌ Failed to fetch featured universities:", error);
      }
    };

    fetchUniversities();
  }, [slug]);

useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchService = async () => {
      try {
        const res = await api.get(`/service-details/${slug}`);
        const universityData = res?.data?.data?.featured_universities;
        console.log("featured_universities:", res);
        
        setUniversity(universityData);
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchService = async () => {
      try {
        const res = await api.get(`/course-category/${slug}`);
        const universityData = res?.data?.featured_universities;
        console.log("featured_universities:",universityData);
        
        setUniversity(universityData);
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  return (
    <div className="px-4 py-6">
      <div className="bg-white shadow-md rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4">Featured Universities</h2>

        {universities.length === 0 ? (
          <p className="text-gray-500">No featured universities available.</p>
        ) : (
          <div className="space-y-4">
            {universities.map((uni, index) => (
              <div
                key={uni.id || index}
                className="flex items-start gap-4 p-4 hover:shadow-md transition"
              >
                {/* University Logo */}
                <img
                  src={`${API_URL}${uni.logo_path}`}
                  // alt={uni.name}
                  className="w-16 h-16 object-contain rounded-md border"
                />

                {/* University Info */}
                <div>
                  <h3 className="font-bold text-blue-800 text-[16px] mb-1">
                    {uni.name}
                  </h3>

                  <p className="flex items-center text-sm text-gray-700">
                    <FaMapMarkerAlt className="mr-2 text-gray-500" />
                    {uni.city || "Malaysia"}
                  </p>

                  <Link
                    to={`/university/${uni.uname}`}
                    className="mt-1 inline-flex items-center text-blue-700 font-semibold text-sm hover:underline"
                  >
                    <FaGraduationCap className="mr-2" />
                    Visit University
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedUniversities;
