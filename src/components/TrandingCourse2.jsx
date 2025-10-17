import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import api from "../api"; // ✅ Make sure this is default export

const TrendingCourse2 = () => {
  const [courses, setCourses] = useState([]);
  const { slug } = useParams();
  const { name } = useParams();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
       
        const res = await api.get(`/specialization-detail-by-slug/${name}`);
        console.log("Full API response:", res.data);

        const courseList = res.data.data.other_specializations || [];
        setCourses(courseList);
      } catch (error) {
        console.error("Failed to fetch trending courses:", error);
      }
    };

    fetchCourses();
  }, [name]);

useEffect(() => {

  const fetchCourses = async () => {
    if (!slug) return;
     
    try {
      const res = await api.get(`/exam-details/${slug}`);
      console.log("Full API response: trending", res.data);
      console.log("Current Slug:", slug);

      // Specializations is directly available at root
     const courseList = res.data.data?.specializations || [];
      console.log("Specializations List: ", courseList);
      setCourses(courseList);
    } catch (error) {
      console.error("Failed to fetch trending courses:", error);
    }
  };

  fetchCourses();
}, [slug]);

useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchService = async () => {
      try {
        const res = await api.get(`/service-details/${slug}`);
        const tradingData = res?.data?.data?.specializations;
        console.log("featured_universities:", res);

        setCourses(tradingData);
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
        const tradingData = res?.data?.other_categories;
        console.log("featured_universities:", res);

        setCourses(tradingData);
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);





  return (
    <div className="px-3">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h4 className="text-xl font-bold border-b pb-3 mb-5 text-gray-800">
          🔥 Trending Courses
        </h4>
        {courses.length === 0 ? (
          <p className="text-gray-500">No trending courses available.</p>
        ) : (
          <ul className="space-y-3">
            {courses.map((course) => (
              <li key={course.id}>
                <Link
                  to={`/specialization/${course.slug}`}
                  className="flex items-center justify-between px-4 py-2 rounded-md text-gray-700 hover:bg-orange-100/70 hover:text-orange-700 transition group"
                >
                  <span className="font-medium group-hover:translate-x-1 transition">
                    {course.name}
                  </span>
                  <FaArrowRight className="text-orange-500 group-hover:translate-x-1 transition" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TrendingCourse2;
