
// import React, { useState, useEffect } from "react";
// import { 
//   ArrowRight, Layers, BookOpen, GraduationCap, Sparkles, Star, Wrench, Monitor, Heart, Briefcase, FlaskConical, Palette, Globe, Calculator
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import api from "../api";
// import { Helmet } from "react-helmet";

// const Specialization = () => {
//   const [specializations, setSpecializations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [seo, setSeo] = useState({});
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });

//     const fetchSpecializations = async () => {
//       try {
//         const res = await api.get("/specializations");
//         setSpecializations(res.data.data || []);
//         setSeo(res.data.seo || {});
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch specializations", error);
//         setLoading(false);
//       }
//     };

//     fetchSpecializations();
//   }, []);

//   const slugify = (str) => {
//     return str
//       .toLowerCase()
//       .replace(/&/g, "-")
//       .replace(/[^\w\s-]/g, "")
//       .replace(/\s+/g, "-")
//       .replace(/--+/g, "-")
//       .replace(/^-+|-+$/g, "");
//   };

//   const LoadingSkeleton = () => (
//     <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {[...Array(8)].map((_, i) => (
//         <div key={i} className="bg-white rounded-xl shadow-md p-5 animate-pulse border border-gray-100">
//           <div className="flex flex-col items-center text-center">
//             <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mb-3"></div>
//             <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
//             <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const getSpecializationIcon = (index) => {
//     const icons = [Wrench, Heart, FlaskConical, GraduationCap, Monitor, Briefcase, Palette, Globe, Calculator, BookOpen, Sparkles, Star];
//     const IconComponent = icons[index % icons.length];
//     return <IconComponent size={24} strokeWidth={2} />;
//   };

//   const categories = [
//     { id: "all", name: "All Specializations", icon: BookOpen, count: specializations.length },
//     { id: "engineering", name: "Engineering", icon: Wrench },
//     { id: "technology", name: "Technology & IT", icon: Monitor },
//     { id: "medical", name: "Medical & Health", icon: Heart },
//     { id: "business", name: "Business & Management", icon: Briefcase },
//     { id: "science", name: "Science", icon: FlaskConical },
//     { id: "arts", name: "Arts & Design", icon: Palette },
//     { id: "social", name: "Social Sciences", icon: Globe },
//     { id: "mathematics", name: "Mathematics", icon: Calculator }
//   ];

//   const filteredSpecializations = specializations.filter((spec) => {
//     const matchesCategory =
//       selectedCategory === "all" ? true : spec.category === selectedCategory;
//     const matchesSearch = spec.name.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <>
//       <Helmet>
//         <title>{seo?.meta_title}</title>
//         <meta name="title" content={seo?.meta_title} />
//         <meta name="description" content={seo?.meta_description} />
//         <meta name="keywords" content={seo?.meta_keyword} />
//       </Helmet>

//       {/* Hero Section */}
//       <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
//         <div
//           className="absolute inset-0 bg-cover bg-center transform scale-105"
//           style={{ backgroundImage: "url('/girl banner.jpg')" }}
//         ></div>
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-indigo-900/80"></div>
//         <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto">
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
//             Discover Your Perfect
//             <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
//               Specialization
//             </span>
//           </h1>
//           <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
//             Start your academic journey with the right path. Explore top courses and fields of study in Malaysia with expert guidance.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <section className="bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-12 md:px-8 lg:px-12">
//         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

//           {/* Categories Sidebar */}
//           <div className="lg:w-80 flex-shrink-0">
//             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
//               <h3 className="text-xl font-bold text-gray-800 mb-6">Categories</h3>
//               <div className="space-y-2">
//                 {categories.map((category) => {
//                   const IconComponent = category.icon;
//                   return (
//                     <button
//                       key={category.id}
//                       onClick={() => setSelectedCategory(category.id)}
//                       className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
//                         selectedCategory === category.id
//                           ? "bg-blue-50 text-blue-600 border-2 border-blue-200"
//                           : "hover:bg-gray-50 text-gray-700 border-2 border-transparent"
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <IconComponent size={20} />
//                         <span className="font-medium text-sm">{category.name}</span>
//                       </div>
//                       <span
//                         className={`text-xs font-bold px-2 py-1 rounded-full ${
//                           selectedCategory === category.id
//                             ? "bg-blue-600 text-white"
//                             : "bg-gray-200 text-gray-600"
//                         }`}
//                       >
//                         {category.count}
//                       </span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Right Side: Search + Cards */}
//           <div className="flex-1">
//             <div className="mb-6">
//               <input
//                 type="text"
//                 placeholder="Search specializations..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               />
//             </div>

//             {/* Cards */}
//             {loading ? (
//               <LoadingSkeleton />
//             ) : filteredSpecializations.length > 0 ? (
//               <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                 {filteredSpecializations.map((item, index) => (
//                   <Link
//                     key={index}
//                     to={`/specialization/${slugify(item.name)}`}
//                     className="group bg-white rounded-xl shadow-md hover:shadow-lg p-5 transition-all duration-300 border border-gray-100 hover:border-blue-200 relative overflow-hidden"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                     <div className="relative z-10 flex flex-col items-center text-center">
//                       <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300 shadow-md">
//                         {getSpecializationIcon(index)}
//                       </div>

//                       <h3 className="text-gray-900 font-semibold text-base mb-1 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
//                         {item.name}
//                       </h3>
//                       <p className="text-gray-500 text-xs font-medium">In Malaysia</p>

//                       <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
//                         <ArrowRight size={14} className="text-white" />
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-16">
//                 <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Layers size={32} className="text-gray-400" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-600 mb-2">
//                   No Specializations Found
//                 </h3>
//                 <p className="text-gray-500">
//                   Please check back later or contact support.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Specialization;

import React, { useState, useEffect } from "react";
import { 
  ArrowRight, Layers, BookOpen, GraduationCap, Sparkles, Star, Wrench, Monitor, Heart, Briefcase, FlaskConical, Palette, Globe, Calculator
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api";
import { Helmet } from "react-helmet";

const Specialization = () => {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seo, setSeo] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Static data for categories
  const staticCategoryData = {
    engineering: [
      { name: "Aerospace Engineering" },
      { name: "Civil Engineering" },
      { name: "Mechanical Engineering" },
      { name: "Electrical Engineering" },
      { name: "Chemical Engineering" },
      { name: "Aircraft Engineering" },
      { name: "Automotive Engineering" },
      { name: "Biomedical Engineering" },
      { name: "Petroleum Engineering" },
      { name: "Industrial Engineering" }
    ],
    technology: [
      { name: "Computer Science" },
      { name: "Information Technology" },
      { name: "Software Engineering" },
      { name: "Cyber Security" },
      { name: "Data Science" },
      { name: "Artificial Intelligence" },
      { name: "Cloud Computing" },
      { name: "Web Development" },
      { name: "Mobile App Development" },
      { name: "Network Engineering" }
    ],
    medical: [
      { name: "Medicine (MBBS)" },
      { name: "Nursing" },
      { name: "Pharmacy" },
      { name: "Dentistry" },
      { name: "Actuarial Science" },
      { name: "Public Health" },
      { name: "Medical Laboratory Technology" },
      { name: "Physiotherapy" },
      { name: "Radiology" },
      { name: "Nutrition & Dietetics" }
    ],
    business: [
      { name: "Business Administration" },
      { name: "Accounting" },
      { name: "Finance" },
      { name: "Marketing" },
      { name: "Human Resource Management" },
      { name: "International Business" },
      { name: "Entrepreneurship" },
      { name: "Business Analytics" },
      { name: "Banking & Finance" },
      { name: "Supply Chain Management" }
    ],
    science: [
      { name: "Physics" },
      { name: "Chemistry" },
      { name: "Biology" },
      { name: "Biotechnology" },
      { name: "Environmental Science" },
      { name: "Aquatic Science" },
      { name: "Animal Science" },
      { name: "Agricultural Science" },
      { name: "Marine Biology" },
      { name: "Microbiology" }
    ],
    arts: [
      { name: "Graphic Design" },
      { name: "Animation" },
      { name: "Fine Arts" },
      { name: "Interior Design" },
      { name: "Architecture" },
      { name: "Fashion Design" },
      { name: "Digital Media" },
      { name: "Film & Television" },
      { name: "Photography" },
      { name: "Music Production" }
    ],
    social: [
      { name: "Psychology" },
      { name: "Sociology" },
      { name: "Anthropology" },
      { name: "Political Science" },
      { name: "Economics" },
      { name: "International Relations" },
      { name: "Education" },
      { name: "Social Work" },
      { name: "Law" },
      { name: "Journalism & Mass Communication" }
    ],
    mathematics: [
      { name: "Mathematics" },
      { name: "Statistics" },
      { name: "Applied Mathematics" },
      { name: "Financial Mathematics" },
      { name: "Computational Mathematics" },
      { name: "Mathematical Economics" },
      { name: "Data Analytics" }
    ]
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchSpecializations = async () => {
      try {
        const res = await api.get("/specializations");
        setSpecializations(res.data.data || []);
        setSeo(res.data.seo || {});
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch specializations", error);
        setLoading(false);
      }
    };

    fetchSpecializations();
  }, []);

  const slugify = (str) => {
    return str
      .toLowerCase()
      .replace(/&/g, "-")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const LoadingSkeleton = () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md p-5 animate-pulse border border-gray-100">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const getSpecializationIcon = (index) => {
    const icons = [Wrench, Heart, FlaskConical, GraduationCap, Monitor, Briefcase, Palette, Globe, Calculator, BookOpen, Sparkles, Star];
    const IconComponent = icons[index % icons.length];
    return <IconComponent size={24} strokeWidth={2} />;
  };

  const categories = [
    { id: "all", name: "All Specializations", icon: BookOpen, count: specializations.length },
    { id: "engineering", name: "Engineering", icon: Wrench, count: staticCategoryData.engineering?.length || 0 },
    { id: "technology", name: "Technology & IT", icon: Monitor, count: staticCategoryData.technology?.length || 0 },
    { id: "medical", name: "Medical & Health", icon: Heart, count: staticCategoryData.medical?.length || 0 },
    { id: "business", name: "Business & Management", icon: Briefcase, count: staticCategoryData.business?.length || 0 },
    { id: "science", name: "Science", icon: FlaskConical, count: staticCategoryData.science?.length || 0 },
    { id: "arts", name: "Arts & Design", icon: Palette, count: staticCategoryData.arts?.length || 0 },
    { id: "social", name: "Social Sciences", icon: Globe, count: staticCategoryData.social?.length || 0 },
    { id: "mathematics", name: "Mathematics", icon: Calculator, count: staticCategoryData.mathematics?.length || 0 }
  ];

  // Filter logic: API data for "all", static data for specific categories
  const filteredSpecializations = selectedCategory === "all" 
    ? specializations.filter((spec) => 
        spec.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : (staticCategoryData[selectedCategory] || []).filter((spec) =>
        spec.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <>
      <Helmet>
        <title>{seo?.meta_title}</title>
        <meta name="title" content={seo?.meta_title} />
        <meta name="description" content={seo?.meta_description} />
        <meta name="keywords" content={seo?.meta_keyword} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{ backgroundImage: "url('/girl banner.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-indigo-900/80"></div>
        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Discover Your Perfect
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Specialization
            </span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Start your academic journey with the right path. Explore top courses and fields of study in Malaysia with expert guidance.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-12 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

          {/* Categories Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                        selectedCategory === category.id
                          ? "bg-blue-50 text-blue-600 border-2 border-blue-200"
                          : "hover:bg-gray-50 text-gray-700 border-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent size={20} />
                        <span className="font-medium text-sm">{category.name}</span>
                      </div>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          selectedCategory === category.id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Search + Cards */}
          <div className="flex-1">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search specializations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Cards */}
            {loading ? (
              <LoadingSkeleton />
            ) : filteredSpecializations.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredSpecializations.map((item, index) => (
                  <Link
                    key={index}
                    to={`/specialization/${slugify(item.name)}`}
                    className="group bg-white rounded-xl shadow-md hover:shadow-lg p-5 transition-all duration-300 border border-gray-100 hover:border-blue-200 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300 shadow-md">
                        {getSpecializationIcon(index)}
                      </div>

                      <h3 className="text-gray-900 font-semibold text-base mb-1 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-xs font-medium">In Malaysia</p>

                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                        <ArrowRight size={14} className="text-white" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No Specializations Found
                </h3>
                <p className="text-gray-500">
                  Please check back later or contact support.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Specialization;