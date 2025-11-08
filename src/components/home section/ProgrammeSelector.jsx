// // // // // import React, { useEffect, useState } from "react";
// // // // // import { Link } from "react-router-dom";
// // // // // import { FaArrowRight } from "react-icons/fa";
// // // // // import {
// // // // //   FaTools,
// // // // //   FaHeartbeat,
// // // // //   FaMicroscope,
// // // // //   FaLeaf,
// // // // //   FaGavel,
// // // // //   FaFlask,
// // // // //   FaShip,
// // // // //   FaCamera,
// // // // //   FaGlobe,
// // // // //   FaCouch,
// // // // //   FaPrayingHands,
// // // // //   FaBrain,
// // // // //   FaGraduationCap,
// // // // //   FaPeopleCarry,
// // // // //   FaUserMd,
// // // // //   FaBusinessTime,
// // // // //   FaPaintBrush,
// // // // //   FaBalanceScale,
// // // // //   FaUserShield,
// // // // // } from "react-icons/fa";
// // // // // import api from "../../api"; // adjust path based on your project

// // // // // const iconMap = [
// // // // //   FaTools,
// // // // //   FaHeartbeat,
// // // // //   FaMicroscope,
// // // // //   FaLeaf,
// // // // //   FaGavel,
// // // // //   FaFlask,
// // // // //   FaShip,
// // // // //   FaCamera,
// // // // //   FaGlobe,
// // // // //   FaCouch,
// // // // //   FaPrayingHands,
// // // // //   FaBrain,
// // // // //   FaGraduationCap,
// // // // //   FaPeopleCarry,
// // // // //   FaUserMd,
// // // // //   FaBusinessTime,
// // // // //   FaPaintBrush,
// // // // //   FaBalanceScale,
// // // // //   FaUserShield,
// // // // // ];

// // // // // const ProgrammeSelector = () => {
// // // // //   const [specializations, setSpecializations] = useState([]);

// // // // //   useEffect(() => {
// // // // //     const fetchSpecializations = async () => {
// // // // //       try {
// // // // //         const res = await api.get("/home");
// // // // //         const data = res.data?.data?.specializations;
// // // // //         console.log("API Response: ", res);
// // // // //         if (Array.isArray(data)) {
// // // // //           setSpecializations(data);
// // // // //         } else {
// // // // //           console.error("Specializations data not an array");
// // // // //         }
// // // // //       } catch (err) {
// // // // //         console.error("Error fetching specializations", err);
// // // // //       }
// // // // //     };

// // // // //     fetchSpecializations();
// // // // //   }, []);

// // // // //   return (
// // // // //     <section className="bg-white px-4 py-16 md:px-10 lg:px-24">
// // // // //       <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
// // // // //         Choose Your <span className="text-blue-600">Favourite Programme</span> in Malaysia
// // // // //       </h2>

// // // // //       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
// // // // //         {specializations.map((item, index) => {
// // // // //           const Icon = iconMap[index % iconMap.length] || FaGlobe;
// // // // //           return (
// // // // //             <Link
// // // // //               key={item.id}
// // // // //               to={`/specialization/${item.uri}`}
// // // // //               className="bg-gray-50 rounded-2xl shadow-md p-5 group hover:shadow-xl hover:-translate-y-1 transition duration-300"
// // // // //             >
// // // // //               <div className="flex items-center justify-between mb-4">
// // // // //                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center text-xl">
// // // // //                   <Icon />
// // // // //                 </div>
// // // // //                 <FaArrowRight className="text-orange-500 group-hover:text-white transition" />
// // // // //               </div>
// // // // //               <h3 className="text-gray-800 font-semibold text-lg truncate group-hover:text-blue-600 transition">
// // // // //                 {item.name}
// // // // //               </h3>
// // // // //             </Link>
// // // // //           );
// // // // //         })}
// // // // //       </div>
// // // // //     </section>
// // // // //   );
// // // // // };

// // // // // export default ProgrammeSelector;

// // // // import React, { useEffect, useState } from "react";
// // // // import { Link } from "react-router-dom";
// // // // import { FaArrowRight, FaSearch } from "react-icons/fa";
// // // // import {
// // // //   FaTools,
// // // //   FaHeartbeat,
// // // //   FaMicroscope,
// // // //   FaLeaf,
// // // //   FaGavel,
// // // //   FaFlask,
// // // //   FaShip,
// // // //   FaCamera,
// // // //   FaGlobe,
// // // //   FaCouch,
// // // //   FaPrayingHands,
// // // //   FaBrain,
// // // //   FaGraduationCap,
// // // //   FaPeopleCarry,
// // // //   FaUserMd,
// // // //   FaBusinessTime,
// // // //   FaPaintBrush,
// // // //   FaBalanceScale,
// // // //   FaUserShield,
// // // // } from "react-icons/fa";
// // // // import api from "../../api";

// // // // const iconMap = [
// // // //   FaTools,
// // // //   FaHeartbeat,
// // // //   FaMicroscope,
// // // //   FaLeaf,
// // // //   FaGavel,
// // // //   FaFlask,
// // // //   FaShip,
// // // //   FaCamera,
// // // //   FaGlobe,
// // // //   FaCouch,
// // // //   FaPrayingHands,
// // // //   FaBrain,
// // // //   FaGraduationCap,
// // // //   FaPeopleCarry,
// // // //   FaUserMd,
// // // //   FaBusinessTime,
// // // //   FaPaintBrush,
// // // //   FaBalanceScale,
// // // //   FaUserShield,
// // // // ];

// // // // // Sidebar Categories (you can modify or fetch dynamically)
// // // // const categories = [
// // // //   "All Specializations",
// // // //   "Engineering",
// // // //   "Technology & IT",
// // // //   "Medical & Health",
// // // //   "Business & Management",
// // // //   "Science",
// // // //   "Arts & Design",
// // // //   "Social Sciences",
// // // //   "Mathematics",
// // // // ];

// // // // const ProgrammeSelector = () => {
// // // //   const [specializations, setSpecializations] = useState([]);
// // // //   const [filteredSpecializations, setFilteredSpecializations] = useState([]);
// // // //   const [selectedCategory, setSelectedCategory] = useState("All Specializations");
// // // //   const [searchQuery, setSearchQuery] = useState("");

// // // //   // Fetch data from API
// // // //   useEffect(() => {
// // // //     const fetchSpecializations = async () => {
// // // //       try {
// // // //         const res = await api.get("/home");
// // // //         const data = res.data?.data?.specializations;
// // // //         if (Array.isArray(data)) {
// // // //           setSpecializations(data);
// // // //           setFilteredSpecializations(data);
// // // //         }
// // // //       } catch (err) {
// // // //         console.error("Error fetching specializations", err);
// // // //       }
// // // //     };
// // // //     fetchSpecializations();
// // // //   }, []);

// // // //   // Filter when category or search changes
// // // //   useEffect(() => {
// // // //     let filtered = [...specializations];

// // // //     if (selectedCategory !== "All Specializations") {
// // // //       filtered = filtered.filter(
// // // //         (item) =>
// // // //           item.category &&
// // // //           item.category.toLowerCase().includes(selectedCategory.toLowerCase())
// // // //       );
// // // //     }

// // // //     if (searchQuery.trim()) {
// // // //       filtered = filtered.filter((item) =>
// // // //         item.name.toLowerCase().includes(searchQuery.toLowerCase())
// // // //       );
// // // //     }

// // // //     setFilteredSpecializations(filtered);
// // // //   }, [searchQuery, selectedCategory, specializations]);

// // // //   return (
// // // //     <section className="bg-white px-4 py-16 md:px-10 lg:px-24">
// // // //       <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
// // // //         Choose Your <span className="text-blue-600">Favourite Programme</span> in Malaysia
// // // //       </h2>

// // // //       <div className="flex flex-col lg:flex-row gap-10">
// // // //         {/* Sidebar Categories */}
// // // //         <aside className="lg:w-1/4 w-full bg-gray-50 p-5 rounded-2xl shadow-sm">
// // // //           <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
// // // //           <ul className="space-y-2">
// // // //             {categories.map((cat) => (
// // // //               <li key={cat}>
// // // //                 <button
// // // //                   onClick={() => setSelectedCategory(cat)}
// // // //                   className={`w-full text-left px-3 py-2 rounded-lg font-medium transition ${
// // // //                     selectedCategory === cat
// // // //                       ? "bg-blue-100 text-blue-700"
// // // //                       : "hover:bg-gray-100 text-gray-700"
// // // //                   }`}
// // // //                 >
// // // //                   {cat}
// // // //                 </button>
// // // //               </li>
// // // //             ))}
// // // //           </ul>
// // // //         </aside>

// // // //         {/* Main content */}
// // // //         <div className="flex-1">
// // // //           {/* Search bar */}
// // // //           <div className="relative mb-8">
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Search specializations..."
// // // //               value={searchQuery}
// // // //               onChange={(e) => setSearchQuery(e.target.value)}
// // // //               className="w-full border border-gray-300 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
// // // //             />
// // // //             <FaSearch className="absolute left-4 top-3.5 text-gray-500" />
// // // //           </div>

// // // //           {/* Grid of cards */}
// // // //           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
// // // //             {filteredSpecializations.length > 0 ? (
// // // //               filteredSpecializations.map((item, index) => {
// // // //                 const Icon = iconMap[index % iconMap.length] || FaGlobe;
// // // //                 return (
// // // //                   <Link
// // // //                     key={item.id || index}
// // // //                     to={`/specialization/${item.uri}`}
// // // //                     className="bg-gray-50 rounded-2xl shadow-md p-5 group hover:shadow-xl hover:-translate-y-1 transition duration-300"
// // // //                   >
// // // //                     <div className="flex items-center justify-between mb-4">
// // // //                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center text-xl">
// // // //                         <Icon />
// // // //                       </div>
// // // //                       <FaArrowRight className="text-orange-500 group-hover:text-white transition" />
// // // //                     </div>
// // // //                     <h3 className="text-gray-800 font-semibold text-lg truncate group-hover:text-blue-600 transition">
// // // //                       {item.name}
// // // //                     </h3>
// // // //                     <p className="text-sm text-gray-500 mt-1">In Malaysia</p>
// // // //                   </Link>
// // // //                 );
// // // //               })
// // // //             ) : (
// // // //               <p className="text-gray-500 text-center col-span-full">
// // // //                 No results found.
// // // //               </p>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // };

// // // // export default ProgrammeSelector;

// // // import React, { useEffect, useState } from "react";
// // // import { Link } from "react-router-dom";
// // // import { FaArrowRight, FaSearch } from "react-icons/fa";
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

// // // // Sidebar Categories (you can modify or fetch dynamically)
// // // const categories = [
// // //   "Favourite Programmes",
// // //   "Engineering",
// // //   "Technology & IT",
// // //   "Medical & Health",
// // //   "Business & Management",
// // //   "Science",
// // //   "Arts & Design",
// // //   "Social Sciences",
// // //   "Mathematics",
// // // ];

// // // const ProgrammeSelector = () => {
// // //   const [specializations, setSpecializations] = useState([]);
// // //   const [filteredSpecializations, setFilteredSpecializations] = useState([]);
// // //   const [selectedCategory, setSelectedCategory] = useState("Favourite Programmes");
// // //   const [searchQuery, setSearchQuery] = useState("");

// // //   // Fetch data from API
// // //   useEffect(() => {
// // //     const fetchSpecializations = async () => {
// // //       try {
// // //         const res = await api.get("/home");
// // //         const data = res.data?.data?.specializations;
// // //         if (Array.isArray(data)) {
// // //           setSpecializations(data);
// // //           setFilteredSpecializations(data);
// // //         }
// // //       } catch (err) {
// // //         console.error("Error fetching specializations", err);
// // //       }
// // //     };
// // //     fetchSpecializations();
// // //   }, []);

// // //   // Filter when category or search changes
// // //   useEffect(() => {
// // //     let filtered = [...specializations];

// // //     if (selectedCategory !== "Favourite Programmes") {
// // //       filtered = filtered.filter(
// // //         (item) =>
// // //           item.category &&
// // //           item.category.toLowerCase().includes(selectedCategory.toLowerCase())
// // //       );
// // //     }

// // //     if (searchQuery.trim()) {
// // //       filtered = filtered.filter((item) =>
// // //         item.name.toLowerCase().includes(searchQuery.toLowerCase())
// // //       );
// // //     }

// // //     setFilteredSpecializations(filtered);
// // //   }, [searchQuery, selectedCategory, specializations]);

// // //   return (
// // //     <section className="bg-white px-4 py-16 md:px-10 lg:px-24">
// // //       <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
// // //         Choose Your <span className="text-blue-600">Favourite Programme</span> in Malaysia
// // //       </h2>

// // //       <div className="flex flex-col lg:flex-row gap-10">
// // //         {/* Sidebar Categories */}
// // //         <aside className="lg:w-1/4 w-full bg-gray-50 p-5 rounded-2xl shadow-sm">
// // //           <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
// // //           <ul className="space-y-2">
// // //             {categories.map((cat) => (
// // //               <li key={cat}>
// // //                 <button
// // //                   onClick={() => setSelectedCategory(cat)}
// // //                   className={`w-full text-left px-3 py-2 rounded-lg font-medium transition ${
// // //                     selectedCategory === cat
// // //                       ? "bg-blue-100 text-blue-700"
// // //                       : "hover:bg-gray-100 text-gray-700"
// // //                   }`}
// // //                 >
// // //                   {cat}
// // //                 </button>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         </aside>

// // //         {/* Main content */}
// // //         <div className="flex-1">
// // //           {/* Search bar */}
// // //           <div className="relative mb-8">
// // //             <input
// // //               type="text"
// // //               placeholder="Search favourite programmes..."
// // //               value={searchQuery}
// // //               onChange={(e) => setSearchQuery(e.target.value)}
// // //               className="w-full border border-gray-300 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
// // //             />
// // //             <FaSearch className="absolute left-4 top-3.5 text-gray-500" />
// // //           </div>

// // //           {/* Grid of cards */}
// // //           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
// // //             {filteredSpecializations.length > 0 ? (
// // //               filteredSpecializations.map((item, index) => {
// // //                 const Icon = iconMap[index % iconMap.length] || FaGlobe;
// // //                 return (
// // //                   <Link
// // //                     key={item.id || index}
// // //                     to={`/specialization/${item.uri}`}
// // //                     className="bg-gray-50 rounded-2xl shadow-md p-5 group hover:shadow-xl hover:-translate-y-1 transition duration-300"
// // //                   >
// // //                     <div className="flex items-center justify-between mb-4">
// // //                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center text-xl">
// // //                         <Icon />
// // //                       </div>
// // //                       <FaArrowRight className="text-orange-500 group-hover:text-white transition" />
// // //                     </div>
// // //                     <h3 className="text-gray-800 font-semibold text-lg truncate group-hover:text-blue-600 transition">
// // //                       {item.name}
// // //                     </h3>
// // //                     <p className="text-sm text-gray-500 mt-1">In Malaysia</p>
// // //                   </Link>
// // //                 );
// // //               })
// // //             ) : (
// // //               <p className="text-gray-500 text-center col-span-full">
// // //                 No results found.
// // //               </p>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default ProgrammeSelector;

// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { FaArrowRight, FaSearch, FaBook } from "react-icons/fa";
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
// //   FaLaptopCode,
// //   FaBriefcase,
// //   FaVial,
// //   FaPalette,
// //   FaUsers,
// //   FaSquareRootAlt,
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

// // // ✅ Categories with icons
// // const categories = [
// //   { name: "Engineering", icon: <FaTools className="text-blue-500" /> },
// //   { name: "Technology & IT", icon: <FaLaptopCode className="text-blue-500" /> },
// //   { name: "Medical & Health", icon: <FaHeartbeat className="text-blue-500" /> },
// //   { name: "Business & Management", icon: <FaBriefcase className="text-blue-500" /> },
// //   { name: "Science", icon: <FaVial className="text-blue-500" /> },
// //   { name: "Arts & Design", icon: <FaPalette className="text-blue-500" /> },
// //   { name: "Social Sciences", icon: <FaUsers className="text-blue-500" /> },
// //   { name: "Mathematics", icon: <FaSquareRootAlt className="text-blue-500" /> },
// // ];

// // const ProgrammeSelector = () => {
// //   const [specializations, setSpecializations] = useState([]);
// //   const [filteredSpecializations, setFilteredSpecializations] = useState([]);
// //   const [selectedCategory, setSelectedCategory] = useState("Favourite Programmes");
// //   const [searchQuery, setSearchQuery] = useState("");

// //   // Fetch data from API
// //   useEffect(() => {
// //     const fetchSpecializations = async () => {
// //       try {
// //         const res = await api.get("/home");
// //         const data = res.data?.data?.specializations;
// //         if (Array.isArray(data)) {
// //           setSpecializations(data);
// //           setFilteredSpecializations(data);
// //         }
// //       } catch (err) {
// //         console.error("Error fetching specializations", err);
// //       }
// //     };
// //     fetchSpecializations();
// //   }, []);

// //   // Filter logic
// //   useEffect(() => {
// //     let filtered = [...specializations];

// //     if (selectedCategory !== "Favourite Programmes") {
// //       filtered = filtered.filter(
// //         (item) =>
// //           item.category &&
// //           item.category.toLowerCase().includes(selectedCategory.toLowerCase())
// //       );
// //     }

// //     if (searchQuery.trim()) {
// //       filtered = filtered.filter((item) =>
// //         item.name.toLowerCase().includes(searchQuery.toLowerCase())
// //       );
// //     }

// //     setFilteredSpecializations(filtered);
// //   }, [searchQuery, selectedCategory, specializations]);

// //   return (
// //     <section className="bg-white px-4 py-16 md:px-10 lg:px-24">
// //       <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
// //         Choose Your <span className="text-blue-600">Favourite Programme</span> in Malaysia
// //       </h2>

// //       <div className="flex flex-col lg:flex-row gap-10">
// //         {/* Sidebar Categories */}
// //         <aside className="lg:w-1/4 w-full bg-gray-50 p-5 rounded-2xl shadow-sm">
// //           <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>

// //           {/* ✅ Favourite Programmes Button (Top Section) */}
// //           <button
// //             onClick={() => setSelectedCategory("Favourite Programmes")}
// //             className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border transition mb-3 ${
// //               selectedCategory === "Favourite Programmes"
// //                 ? "bg-blue-100 border-blue-300 text-blue-700"
// //                 : "bg-white hover:bg-gray-100 border-gray-200 text-gray-700"
// //             }`}
// //           >
// //             <div className="flex items-center gap-2 font-medium">
// //               <FaBook className="text-blue-600" />
// //               <span>Favourite Programmes</span>
// //             </div>
// //             <span className="bg-blue-600 text-white text-sm px-2.5 py-0.5 rounded-full">
// //               {specializations.length}
// //             </span>
// //           </button>

// //           {/* ✅ Category List with Icons */}
// //           <ul className="space-y-2">
// //             {categories.map((cat) => (
// //               <li key={cat.name}>
// //                 <button
// //                   onClick={() => setSelectedCategory(cat.name)}
// //                   className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg font-medium transition ${
// //                     selectedCategory === cat.name
// //                       ? "bg-blue-100 text-blue-700"
// //                       : "hover:bg-gray-100 text-gray-700"
// //                   }`}
// //                 >
// //                   {cat.icon}
// //                   {cat.name}
// //                 </button>
// //               </li>
// //             ))}
// //           </ul>
// //         </aside>

// //         {/* Main Content */}
// //         <div className="flex-1">
// //           {/* Search bar */}
// //           <div className="relative mb-8">
// //             <input
// //               type="text"
// //               placeholder="Search favourite programmes..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="w-full border border-gray-300 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
// //             />
// //             <FaSearch className="absolute left-4 top-3.5 text-gray-500" />
// //           </div>

// //           {/* Grid of cards */}
// //           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
// //             {filteredSpecializations.length > 0 ? (
// //               filteredSpecializations.map((item, index) => {
// //                 const Icon = iconMap[index % iconMap.length] || FaGlobe;
// //                 return (
// //                   <Link
// //                     key={item.id || index}
// //                     to={`/specialization/${item.uri}`}
// //                     className="bg-gray-50 rounded-2xl shadow-md p-5 group hover:shadow-xl hover:-translate-y-1 transition duration-300"
// //                   >
// //                     <div className="flex items-center justify-between mb-4">
// //                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center text-xl">
// //                         <Icon />
// //                       </div>
// //                       <FaArrowRight className="text-orange-500 group-hover:text-white transition" />
// //                     </div>
// //                     <h3 className="text-gray-800 font-semibold text-lg truncate group-hover:text-blue-600 transition">
// //                       {item.name}
// //                     </h3>
// //                     <p className="text-sm text-gray-500 mt-1">In Malaysia</p>
// //                   </Link>
// //                 );
// //               })
// //             ) : (
// //               <p className="text-gray-500 text-center col-span-full">
// //                 No results found.
// //               </p>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default ProgrammeSelector;





// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaArrowRight, FaSearch, FaBook } from "react-icons/fa";
// import {
//   FaTools,
//   FaHeartbeat,
//   FaMicroscope,
//   FaLeaf,
//   FaGavel,
//   FaFlask,
//   FaShip,
//   FaCamera,
//   FaGlobe,
//   FaCouch,
//   FaPrayingHands,
//   FaBrain,
//   FaGraduationCap,
//   FaPeopleCarry,
//   FaUserMd,
//   FaBusinessTime,
//   FaPaintBrush,
//   FaBalanceScale,
//   FaUserShield,
//   FaLaptopCode,
//   FaBriefcase,
//   FaVial,
//   FaPalette,
//   FaUsers,
//   FaSquareRootAlt,
// } from "react-icons/fa";
// import api from "../../api";

// const iconMap = [
//   FaTools,
//   FaHeartbeat,
//   FaMicroscope,
//   FaLeaf,
//   FaGavel,
//   FaFlask,
//   FaShip,
//   FaCamera,
//   FaGlobe,
//   FaCouch,
//   FaPrayingHands,
//   FaBrain,
//   FaGraduationCap,
//   FaPeopleCarry,
//   FaUserMd,
//   FaBusinessTime,
//   FaPaintBrush,
//   FaBalanceScale,
//   FaUserShield,
// ];

// // ✅ Categories with icons
// const categories = [
//   { name: "Engineering", icon: <FaTools className="text-blue-500" /> },
//   { name: "Technology & IT", icon: <FaLaptopCode className="text-blue-500" /> },
//   { name: "Medical & Health", icon: <FaHeartbeat className="text-blue-500" /> },
//   { name: "Business & Management", icon: <FaBriefcase className="text-blue-500" /> },
//   { name: "Science", icon: <FaVial className="text-blue-500" /> },
//   { name: "Arts & Design", icon: <FaPalette className="text-blue-500" /> },
//   { name: "Social Sciences", icon: <FaUsers className="text-blue-500" /> },
//   { name: "Mathematics", icon: <FaSquareRootAlt className="text-blue-500" /> },
// ];

// const ProgrammeSelector = () => {
//   const [specializations, setSpecializations] = useState([]);
//   const [filteredSpecializations, setFilteredSpecializations] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("Favourite Programmes");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showAll, setShowAll] = useState(false); // ✅ Browse All state

//   // Fetch data from API
//   useEffect(() => {
//     const fetchSpecializations = async () => {
//       try {
//         const res = await api.get("/home");
//         const data = res.data?.data?.specializations;
//         if (Array.isArray(data)) {
//           setSpecializations(data);
//           setFilteredSpecializations(data);
//         }
//       } catch (err) {
//         console.error("Error fetching specializations", err);
//       }
//     };
//     fetchSpecializations();
//   }, []);

//   // Filter logic
//   useEffect(() => {
//     let filtered = [...specializations];

//     if (selectedCategory !== "Favourite Programmes") {
//       filtered = filtered.filter(
//         (item) =>
//           item.category &&
//           item.category.toLowerCase().includes(selectedCategory.toLowerCase())
//       );
//     }

//     if (searchQuery.trim()) {
//       filtered = filtered.filter((item) =>
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredSpecializations(filtered);
//   }, [searchQuery, selectedCategory, specializations]);

//   // ✅ Calculate items to show (2 rows x 4 columns = 8 items)
//   const itemsPerRow = 4;
//   const rowsToShow = 2;
//   const maxItemsToShow = itemsPerRow * rowsToShow; // 8 items

//   const displayedSpecializations = showAll 
//     ? filteredSpecializations 
//     : filteredSpecializations.slice(0, maxItemsToShow);

//   return (
//     <section className="bg-white px-4 py-16 md:px-10 lg:px-24">
//       <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
//         Choose Your <span className="text-blue-600">Favourite Programme</span> in Malaysia
//       </h2>

//       <div className="flex flex-col lg:flex-row gap-10">
//         {/* Sidebar Categories */}
//         <aside className="lg:w-1/4 w-full bg-gray-50 p-5 rounded-2xl shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>

//           {/* ✅ Favourite Programmes Button (Top Section) */}
//           <button
//             onClick={() => {
//               setSelectedCategory("Favourite Programmes");
//               setShowAll(false); // Reset to 2 rows when category changes
//             }}
//             className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border transition mb-3 ${
//               selectedCategory === "Favourite Programmes"
//                 ? "bg-blue-100 border-blue-300 text-blue-700"
//                 : "bg-white hover:bg-gray-100 border-gray-200 text-gray-700"
//             }`}
//           >
//             <div className="flex items-center gap-2 font-medium">
//               <FaBook className="text-blue-600" />
//               <span>Favourite Programmes</span>
//             </div>
//             <span className="bg-blue-600 text-white text-sm px-2.5 py-0.5 rounded-full">
//               {specializations.length}
//             </span>
//           </button>

//           {/* ✅ Category List with Icons */}
//           <ul className="space-y-2">
//             {categories.map((cat) => (
//               <li key={cat.name}>
//                 <button
//                   onClick={() => {
//                     setSelectedCategory(cat.name);
//                     setShowAll(false); // Reset to 2 rows when category changes
//                   }}
//                   className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg font-medium transition ${
//                     selectedCategory === cat.name
//                       ? "bg-blue-100 text-blue-700"
//                       : "hover:bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   {cat.icon}
//                   {cat.name}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </aside>

//         {/* Main Content */}
//         <div className="flex-1">
//           {/* Search bar */}
//           <div className="relative mb-8">
//             <input
//               type="text"
//               placeholder="Search favourite programmes..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full border border-gray-300 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <FaSearch className="absolute left-4 top-3.5 text-gray-500" />
//           </div>

//           {/* Grid of cards */}
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {displayedSpecializations.length > 0 ? (
//               displayedSpecializations.map((item, index) => {
//                 const Icon = iconMap[index % iconMap.length] || FaGlobe;
//                 return (
//                   <Link
//                     key={item.id || index}
//                     to={`/specialization/${item.uri}`}
//                     className="bg-gray-50 rounded-2xl shadow-md p-5 group hover:shadow-xl hover:-translate-y-1 transition duration-300"
//                   >
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center text-xl">
//                         <Icon />
//                       </div>
//                       <FaArrowRight className="text-orange-500 group-hover:text-white transition" />
//                     </div>
//                     <h3 className="text-gray-800 font-semibold text-lg truncate group-hover:text-blue-600 transition">
//                       {item.name}
//                     </h3>
//                     <p className="text-sm text-gray-500 mt-1">In Malaysia</p>
//                   </Link>
//                 );
//               })
//             ) : (
//               <p className="text-gray-500 text-center col-span-full">
//                 No results found.
//               </p>
//             )}
//           </div>

//           {/* ✅ Browse All Button */}
//           {!showAll && filteredSpecializations.length > maxItemsToShow && (
//             <div className="flex justify-center mt-10">
//               <button
//                 onClick={() => setShowAll(true)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300 flex items-center gap-2"
//               >
//                 Browse All Programmes
//                 <FaArrowRight />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProgrammeSelector;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import api from "../../api";

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
  const navigate = useNavigate();
  const [specializations, setSpecializations] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const res = await api.get("/home");
        const data = res.data?.data?.specializations;
        if (Array.isArray(data)) {
          setSpecializations(data);
        }
      } catch (err) {
        console.error("Error fetching specializations", err);
      }
    };
    fetchSpecializations();
  }, []);

  // Calculate items to show (2 rows x 4 columns = 8 items)
  const itemsPerRow = 4;
  const rowsToShow = 2;
  const maxItemsToShow = itemsPerRow * rowsToShow; // 8 items

  const displayedSpecializations = showAll 
    ? specializations 
    : specializations.slice(0, maxItemsToShow);

  return (
    <section className="bg-white px-4 py-16 md:px-10 lg:px-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Choose Your <span className="text-blue-600">Favourite Programme</span> in Malaysia
      </h2>

      {/* Grid of cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayedSpecializations.length > 0 ? (
          displayedSpecializations.map((item, index) => {
            const Icon = iconMap[index % iconMap.length] || FaGlobe;
            return (
              <Link
                key={item.id || index}
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
                <p className="text-sm text-gray-500 mt-1">In Malaysia</p>
              </Link>
            );
          })
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No results found.
          </p>
        )}
      </div>

      {/* Browse All Button - Navigate to Specializations Page */}
      {!showAll && specializations.length > maxItemsToShow && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate('/specialization')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300 flex items-center gap-2"
          >
            Browse All Programmes
            <FaArrowRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default ProgrammeSelector;