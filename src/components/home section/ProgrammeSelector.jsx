
// // // import React, { useEffect, useState } from "react";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import { FaArrowRight } from "react-icons/fa";
// // // import {
// // //   FaTools,
// // //   FaHeartbeat,
// // //   FaMicroscope,
// // //   FaLeaf,
// // //   FaGavel,
// // //   FaFlask,
// // //   FaShip,
// // //   FaCamera,
// // //   FaGlobe,
// // //   FaCouch,
// // //   FaPrayingHands,
// // //   FaBrain,
// // //   FaGraduationCap,
// // //   FaPeopleCarry,
// // //   FaUserMd,
// // //   FaBusinessTime,
// // //   FaPaintBrush,
// // //   FaBalanceScale,
// // //   FaUserShield,
// // // } from "react-icons/fa";
// // // import api from "../../api";

// // // const iconMap = [
// // //   FaTools,
// // //   FaHeartbeat,
// // //   FaMicroscope,
// // //   FaLeaf,
// // //   FaGavel,
// // //   FaFlask,
// // //   FaShip,
// // //   FaCamera,
// // //   FaGlobe,
// // //   FaCouch,
// // //   FaPrayingHands,
// // //   FaBrain,
// // //   FaGraduationCap,
// // //   FaPeopleCarry,
// // //   FaUserMd,
// // //   FaBusinessTime,
// // //   FaPaintBrush,
// // //   FaBalanceScale,
// // //   FaUserShield,
// // // ];

// // // const ProgrammeSelector = () => {
// // //   const navigate = useNavigate();
// // //   const [specializations, setSpecializations] = useState([]);
// // //   const [showAll, setShowAll] = useState(false);

// // //   // Fetch data from API
// // //   useEffect(() => {
// // //     const fetchSpecializations = async () => {
// // //       try {
// // //         const res = await api.get("/home");
// // //         const data = res.data?.data?.specializations;
// // //         if (Array.isArray(data)) {
// // //           setSpecializations(data);
// // //         }
// // //       } catch (err) {
// // //         console.error("Error fetching specializations", err);
// // //       }
// // //     };
// // //     fetchSpecializations();
// // //   }, []);

// // //   // Calculate items to show (2 rows x 4 columns = 8 items)
// // //   const itemsPerRow = 4;
// // //   const rowsToShow = 2;
// // //   const maxItemsToShow = itemsPerRow * rowsToShow; // 8 items

// // //   const displayedSpecializations = showAll 
// // //     ? specializations 
// // //     : specializations.slice(0, maxItemsToShow);

// // //   return (
// // //     <section className="bg-white px-4 py-16 md:px-10 lg:px-24">
// // //       <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
// // //         Choose Your <span className="text-blue-600">Favourite Programme</span> in Malaysia
// // //       </h2>

// // //       {/* Grid of cards */}
// // //       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
// // //         {displayedSpecializations.length > 0 ? (
// // //           displayedSpecializations.map((item, index) => {
// // //             const Icon = iconMap[index % iconMap.length] || FaGlobe;
// // //             return (
// // //               <Link
// // //                 key={item.id || index}
// // //                 to={`/specialization/${item.uri}`}
// // //                 className="bg-gray-50 rounded-2xl shadow-md p-5 group hover:shadow-xl hover:-translate-y-1 transition duration-300"
// // //               >
// // //                 <div className="flex items-center justify-between mb-4">
// // //                  <div className="flex items-center gap-3">
// // //   <span className="text-gray-700 font-semibold text-base">Study</span>
// // //   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center text-xl">
// // //     <Icon />
// // //   </div>
// // // </div>
// // //                   <FaArrowRight className="text-orange-500 text-lg group-hover:translate-x-1 transition" />
// // //                 </div>
// // //                 <h3 className="text-gray-800 font-semibold text-lg truncate group-hover:text-blue-600 transition">
// // //                   {item.name}
// // //                 </h3>
// // //                 <p className="text-sm text-white mt-2 inline-block bg-blue-500 px-3 py-1 rounded-full">
// // //                   In Malaysia
// // //                 </p>
// // //               </Link>
// // //             );
// // //           })
// // //         ) : (
// // //           <p className="text-gray-500 text-center col-span-full">
// // //             No results found.
// // //           </p>
// // //         )}
// // //       </div>

// // //       {/* Browse All Button - Navigate to Specializations Page */}
// // //       {!showAll && specializations.length > maxItemsToShow && (
// // //         <div className="flex justify-center mt-10">
// // //        <button
// // //   onClick={() => navigate('/specialization')}
// // //   className="bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:scale-105 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer"
// // // >
// // //   Browse All Programmes
// // //   <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
// // // </button>
// // //         </div>
// // //       )}
// // //     </section>
// // //   );
// // // };

// // // export default ProgrammeSelector;

// // import React, { useEffect, useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { FaArrowRight } from "react-icons/fa";
// // import {
// //   FaTools,
// //   FaHeartbeat,
// //   FaMicroscope,
// //   FaLeaf,
// //   FaGavel,
// //   FaFlask,
// //   FaShip,
// //   FaCamera,
// //   FaGlobe,
// //   FaCouch,
// //   FaPrayingHands,
// //   FaBrain,
// //   FaGraduationCap,
// //   FaPeopleCarry,
// //   FaUserMd,
// //   FaBusinessTime,
// //   FaPaintBrush,
// //   FaBalanceScale,
// //   FaUserShield,
// // } from "react-icons/fa";
// // import api from "../../api";

// // const iconMap = [
// //   FaTools,
// //   FaHeartbeat,
// //   FaMicroscope,
// //   FaLeaf,
// //   FaGavel,
// //   FaFlask,
// //   FaShip,
// //   FaCamera,
// //   FaGlobe,
// //   FaCouch,
// //   FaPrayingHands,
// //   FaBrain,
// //   FaGraduationCap,
// //   FaPeopleCarry,
// //   FaUserMd,
// //   FaBusinessTime,
// //   FaPaintBrush,
// //   FaBalanceScale,
// //   FaUserShield,
// // ];

// // const ProgrammeSelector = () => {
// //   const navigate = useNavigate();
// //   const [specializations, setSpecializations] = useState([]);
// //   const [showAll, setShowAll] = useState(false);
// //   const [isMobile, setIsMobile] = useState(false);

// //   // Detect screen size
// //   useEffect(() => {
// //     const checkMobile = () => {
// //       setIsMobile(window.innerWidth < 640); // sm breakpoint
// //     };
    
// //     checkMobile();
// //     window.addEventListener('resize', checkMobile);
    
// //     return () => window.removeEventListener('resize', checkMobile);
// //   }, []);

// //   // Fetch data from API
// //   useEffect(() => {
// //     const fetchSpecializations = async () => {
// //       try {
// //         const res = await api.get("/home");
// //         const data = res.data?.data?.specializations;
// //         if (Array.isArray(data)) {
// //           setSpecializations(data);
// //         }
// //       } catch (err) {
// //         console.error("Error fetching specializations", err);
// //       }
// //     };
// //     fetchSpecializations();
// //   }, []);

// //   // Calculate items to show
// //   // Mobile: 4 items, Desktop: 8 items
// //   const maxItemsToShow = isMobile ? 4 : 8;

// //   const displayedSpecializations = showAll 
// //     ? specializations 
// //     : specializations.slice(0, maxItemsToShow);

// //   return (
// //     <section className="bg-white px-4 py-16 md:px-10 lg:px-24">
// //       <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
// //         Choose Your <span className="text-blue-600">Favourite Programme</span> in Malaysia
// //       </h2>

// //       {/* Grid of cards */}
// //       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
// //         {displayedSpecializations.length > 0 ? (
// //           displayedSpecializations.map((item, index) => {
// //             const Icon = iconMap[index % iconMap.length] || FaGlobe;
// //             return (
// //    <Link
// //   key={item.id || index}
// //   to={`/specialization/${item.slug ?? item.name.toLowerCase().replace(/\s+/g, "-")}`}
// //   className="bg-gray-50 rounded-2xl shadow-md p-5 group hover:shadow-xl hover:-translate-y-1 transition duration-300"
// // >

// //                 <div className="flex items-center justify-between mb-4">
// //                  <div className="flex items-center gap-3">
// //   <span className="text-gray-700 font-semibold text-base">Study</span>
// //   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center text-xl">
// //     <Icon />
// //   </div>
// // </div>
// //                   <FaArrowRight className="text-orange-500 text-lg group-hover:translate-x-1 transition" />
// //                 </div>
// //                 <h3 className="text-gray-800 font-semibold text-lg truncate group-hover:text-blue-600 transition">
// //                   {item.name}
// //                 </h3>
// //                 <p className="text-sm text-white mt-2 inline-block bg-blue-500 px-3 py-1 rounded-full">
// //                   In Malaysia
// //                 </p>
// //               </Link>
// //             );
// //           })
// //         ) : (
// //           <p className="text-gray-500 text-center col-span-full">
// //             No results found.
// //           </p>
// //         )}
// //       </div>

// //       {/* Browse All Button - Navigate to Specializations Page */}
// //       {!showAll && specializations.length > maxItemsToShow && (
// //         <div className="flex justify-center mt-10">
// //        <button
// //   onClick={() => navigate('/specialization')}
// //   className="bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:scale-105 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer"
// // >
// //   Browse All Programmes
// //   <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
// // </button>
// //         </div>
// //       )}
// //     </section>
// //   );
// // };

// // export default ProgrammeSelector;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBookOpen, FaArrowRight } from "react-icons/fa";
// import api from "../../api"; 

// const ProgrammeSelector = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSpecializations = async () => {
//       try {
//         const res = await api.get("/home");

//         if (res.data?.data?.specializationsWithContent) {
//           setCourses(res.data.data.specializationsWithContent.slice(0, 12));
//         } else {
//           console.warn("specializationsWithContent missing from API response");
//         }
//       } catch (error) {
//         console.error("Failed to load specializations:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSpecializations();
//   }, []);

//   const LoadingSkeleton = () => (
//     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//       {[...Array(12)].map((_, i) => (
//         <div key={i} className="bg-gray-50 rounded-2xl shadow-md p-5 animate-pulse">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-3">
//               <div className="h-4 bg-gray-300 rounded w-16"></div>
//               <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-teal-400"></div>
//             </div>
//             <div className="w-6 h-6 rounded-full bg-orange-300"></div>
//           </div>
//           <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
//           <div className="h-6 bg-blue-200 rounded-full w-24"></div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <section className="bg-white px-4 py-16 md:px-10 lg:px-24">
      
//       <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
//         Choose Your <span className="text-blue-600">Favourite Programme</span> in Malaysia
//       </h2>

//       {loading ? (
//         <LoadingSkeleton />
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {courses.map((course, index) => (
//             <Link
//               key={course.id || index}
//               to={`/specialization/${course.slug}`}
//               className="group bg-gray-50 rounded-2xl shadow-md hover:shadow-xl p-5 transition-all duration-300 border border-gray-100 hover:border-blue-200 relative overflow-hidden"
//             >
//               {/* Hover Background */}
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//               <div className="relative z-10">
//                 {/* Top Section */}
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <span className="text-gray-700 font-medium text-sm">Study</span>
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md">
//                       <FaBookOpen className="h-5 w-5" />
//                     </div>
//                   </div>

//                   <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
//                     <FaArrowRight className="text-white text-sm" />
//                   </div>
//                 </div>

//                 {/* Course Name */}
//                 <h3 className="text-gray-800 font-semibold text-base mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 min-h-[3rem]">
//                   {course.name}
//                 </h3>

//                 {/* Badge */}
//                 <div className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-full">
//                   In Malaysia
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* Browse All Button */}
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

// export default ProgrammeSelector;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookOpen, FaArrowRight } from "react-icons/fa";
import api from "../../api"; 

const ProgrammeSelector = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const res = await api.get("/home");

        if (res.data?.data?.specializationsWithContent) {
          // 🔥 Only 8 items → 2 rows × 4 cards
          setCourses(res.data.data.specializationsWithContent.slice(0, 8));
        } else {
          console.warn("specializationsWithContent missing from API response");
        }
      } catch (error) {
        console.error("Failed to load specializations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecializations();
  }, []);

  const LoadingSkeleton = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-gray-50 rounded-2xl shadow-md p-5 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-teal-400"></div>
            </div>
            <div className="w-6 h-6 rounded-full bg-orange-300"></div>
          </div>
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-blue-200 rounded-full w-24"></div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="bg-white px-4 py-16 md:px-10 lg:px-24">
      
      {/* ⭐ HEADING ⭐ */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Choose Your <span className="text-blue-600">Favourite Programme</span> in Malaysia
      </h2>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => (
            <Link
              key={course.id || index}
              to={`/specialization/${course.slug}`}
              className="group bg-gray-50 rounded-2xl shadow-md hover:shadow-xl p-5 transition-all duration-300 border border-gray-100 hover:border-blue-200 relative overflow-hidden"
            >
              {/* Hover Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                
                {/* Top Section */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-700 font-medium text-sm">Study</span>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md">
                      <FaBookOpen className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                    <FaArrowRight className="text-white text-sm" />
                  </div>
                </div>

                {/* Course Name */}
                <h3 className="text-gray-800 font-semibold text-base mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 min-h-[3rem]">
                  {course.name}
                </h3>

                {/* Badge */}
                <div className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-full">
                  In Malaysia
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Browse All Button */}
      <div className="text-center mt-12">
        <Link
          to="/specialization"
          className="inline-flex items-center border-2 border-blue-800 text-blue-800 font-semibold px-6 py-2 rounded-full transition hover:bg-blue-800 hover:text-white"
        >
          Browse All Programmes
        </Link>
      </div>

    </section>
  );
};

export default ProgrammeSelector;
