// // import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBookOpen, FaArrowRight } from "react-icons/fa";
// import api from "../api"; 

// const TrendingCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSpecializations = async () => {
//       try {
//         const res = await api.get("/home");
        
//         if (res.data && res.data.data && Array.isArray(res.data.data.specializationsWithContent)) {
//           // ✅ Only take first 12 courses (3 rows × 4 columns)
//           setCourses(res.data.data.specializationsWithContent.slice(0, 12));
//         } else {
//           console.warn("specializations not found in response");
//         }
//       } catch (error) {
//         console.error("Failed to load specializations:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSpecializations();
//   }, []);

//   return (
//     <section className="bg-white px-4 py-16 md:px-10 lg:px-24">
//       <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
//         List of Top Trending <span className="text-blue-600">Courses in Malaysia</span>
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading courses...</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {courses.map((course, index) => (
//             <Link
//               key={course.id || index}
//               to={`/specialization/${course.slug}`}
//               className="bg-gray-50 rounded-2xl shadow-md p-5 group hover:shadow-xl hover:-translate-y-1 transition duration-300"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center">
//                   <FaBookOpen className="h-5 w-5" />
//                 </div>
//                 <FaArrowRight className="text-orange-500 group-hover:text-orange-600 transition" />
//               </div>
//               <h3 className="text-gray-800 font-semibold text-lg truncate group-hover:text-blue-600 transition">
//                 {course.name}
//               </h3>
//             </Link>
//           ))}
//         </div>
//       )}

//       <div className="text-center mt-12">
//         <Link
//           to="/specialization"
//           className="inline-flex items-center border-2 border-blue-800 text-blue-800 font-semibold px-6 py-2 rounded-full transition hover:bg-blue-800 hover:text-white"
//         >
//           Browse All Courses
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default TrendingCourses;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookOpen, FaArrowRight } from "react-icons/fa";
import api from "../api"; 

const TrendingCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const res = await api.get("/home");
        
        if (res.data && res.data.data && Array.isArray(res.data.data.specializationsWithContent)) {
          // ✅ Only take first 12 courses (3 rows × 4 columns)
          setCourses(res.data.data.specializationsWithContent.slice(0, 12));
        } else {
          console.warn("specializations not found in response");
        }
      } catch (error) {
        console.error("Failed to load specializations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecializations();
  }, []);

  return (
    <section className="bg-white px-4 py-16 md:px-10 lg:px-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        List of Top Trending <span className="text-blue-600">Courses in Malaysia</span>
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading courses...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => (
            <Link
              key={course.id || index}
              to={`/specialization/${course.slug}`}
              className="bg-gray-50 rounded-2xl shadow-md p-5 group hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center">
                  <FaBookOpen className="h-5 w-5" />
                </div>
                <FaArrowRight className="text-orange-500 group-hover:text-orange-600 transition" />
              </div>
              <h3 className="text-gray-800 font-semibold text-lg truncate group-hover:text-blue-600 transition">
                {course.name}
              </h3>
            </Link>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <Link
          to="/specialization"
          className="inline-flex items-center border-2 border-blue-800 text-blue-800 font-semibold px-6 py-2 rounded-full transition hover:bg-blue-800 hover:text-white"
        >
          Browse All Courses
        </Link>
      </div>
    </section>
  );
};

export default TrendingCourses;