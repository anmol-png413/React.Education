// // import React from "react";
// // import {
// //   FaCheckCircle,
// //   FaUniversity,
// //   FaSun,
// //   FaMoneyBillWave,
// //   FaBed,
// //   FaSuitcaseRolling,
// //   FaGlobe,
// //   FaBook,
// // } from "react-icons/fa";
// // import { MdTranslate } from "react-icons/md";

// // const MalaysiaStudyInfo = () => {
// //   return (
// //     <section className="bg-white px-4 py-14 md:px-16 lg:px-24">
// //       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
// //         Why Study in Malaysia:{" "}
// //         <span className="text-blue-600">Unlock Global Opportunities</span>
// //       </h2>

// //       <p className="text-gray-700 max-w-4xl mx-auto text-center mb-12">
// //         Malaysia offers a unique combination of world-class education and diverse
// //         cultural experiences, making it a top destination for international
// //         students. With globally recognized universities, cutting-edge
// //         infrastructure, and an affordable cost of living, Malaysia delivers the
// //         perfect environment for students seeking a high-quality education.
// //         Discover Malaysia that combines academic excellence with global exposure,
// //         offering both personal growth and career development in a vibrant,
// //         multicultural setting.
// //       </p>

// //       {/* Grid with Cards and Map */}
// //       <div className="grid lg:grid-cols-2 gap-12 items-center">
// //         {/* Left: Info Cards */}
// //         <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
// //           <InfoCard
// //             icon={<FaCheckCircle />}
// //             title="90%"
// //             subtitle="Visa Approval Rate"
// //             bg="bg-blue-100 text-blue-600"
// //           />
// //           <InfoCard
// //             icon={<FaUniversity />}
// //             title="500+"
// //             subtitle="Total Institutions"
// //             bg="bg-green-100 text-green-600"
// //           />
// //           <InfoCard
// //             icon={<FaSun />}
// //             title="Summer"
// //             subtitle="Best Intake"
// //             bg="bg-yellow-100 text-yellow-500"
// //           />
// //           <InfoCard
// //             icon={<FaMoneyBillWave />}
// //             title="$11,400 - $150,000"
// //             subtitle="Average Study Cost"
// //             bg="bg-indigo-100 text-indigo-600"
// //           />
// //           <InfoCard
// //             icon={<FaBed />}
// //             title="$1,000 - $1,200"
// //             subtitle="Living Cost"
// //             bg="bg-pink-100 text-pink-500"
// //           />
// //           <InfoCard
// //             icon={<FaSuitcaseRolling />}
// //             title="$800 - $4,000"
// //             subtitle="Travel Cost"
// //             bg="bg-purple-100 text-purple-600"
// //           />
// //           <InfoCard
// //             icon={<FaGlobe />}
// //             title="80 (iBT)"
// //             subtitle="Min TOEFL Score"
// //             bg="bg-sky-100 text-sky-600"
// //           />
// //           <InfoCard
// //             icon={<MdTranslate />}
// //             title="6"
// //             subtitle="Min IELTS Score"
// //             bg="bg-red-100 text-red-600"
// //           />
// //           <InfoCard
// //             icon={<FaBook />}
// //             title="58"
// //             subtitle="Min PTE Score"
// //             bg="bg-blue-100 text-blue-800"
// //           />
// //         </div>

// //         {/* Right: Map */}
// //         <div className="flex justify-center">
// //           <img
// //             src="/malaysia-map.png"
// //             alt="Malaysia Map"
// //             className="w-full max-w-md "
// //           />
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // const InfoCard = ({ icon, title, subtitle, bg }) => {
// //   return (
// //     <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-300 flex items-center space-x-4">
// //       <div className={`w-12 h-12 flex items-center justify-center rounded-full ${bg} text-xl`}>
// //         {icon}
// //       </div>
// //       <div>
// //         <div className="text-xl font-bold text-gray-900">{title}</div>
// //         <div className="text-sm text-gray-600">{subtitle}</div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MalaysiaStudyInfo;
// import React from "react";
// import {
//   FaCheckCircle,
//   FaUniversity,
//   FaSun,
//   FaMoneyBillWave,
//   FaBed,
//   FaSuitcaseRolling,
//   FaGlobe,
//   FaBook,
// } from "react-icons/fa";
// import { MdTranslate } from "react-icons/md";
// import { GraduationCap, ArrowUp } from "lucide-react";

// // ---------------------- MAIN COMPONENT ----------------------
// const MalaysiaStudyInfo = () => {
//   return (
//     <div className="bg-gray-50">
//       {/* ---------- WHY STUDY IN MALAYSIA SECTION ---------- */}
//       <section className="bg-white px-4 py-14 md:px-16 lg:px-24">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
//           Why Study in Malaysia:{" "}
//           <span className="text-blue-600">Unlock Global Opportunities</span>
//         </h2>

//         <p className="text-gray-700 max-w-4xl mx-auto text-center mb-12">
//           Malaysia offers a unique combination of world-class education and
//           diverse cultural experiences, making it a top destination for
//           international students. With globally recognized universities,
//           cutting-edge infrastructure, and an affordable cost of living, Malaysia
//           delivers the perfect environment for students seeking a high-quality
//           education. Discover Malaysia that combines academic excellence with
//           global exposure, offering both personal growth and career development
//           in a vibrant, multicultural setting.
//         </p>

//         {/* Grid with Cards and Map */}
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left: Info Cards */}
//           <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
//             <InfoCard
//               icon={<FaCheckCircle />}
//               title="90%"
//               subtitle="Visa Approval Rate"
//               bg="bg-blue-100 text-blue-600"
//             />
//             <InfoCard
//               icon={<FaUniversity />}
//               title="500+"
//               subtitle="Total Institutions"
//               bg="bg-green-100 text-green-600"
//             />
//             <InfoCard
//               icon={<FaSun />}
//               title="Summer"
//               subtitle="Best Intake"
//               bg="bg-yellow-100 text-yellow-500"
//             />
//             <InfoCard
//               icon={<FaMoneyBillWave />}
//               title="$11,400 - $150,000"
//               subtitle="Average Study Cost"
//               bg="bg-indigo-100 text-indigo-600"
//             />
//             <InfoCard
//               icon={<FaBed />}
//               title="$1,000 - $1,200"
//               subtitle="Living Cost"
//               bg="bg-pink-100 text-pink-500"
//             />
//             <InfoCard
//               icon={<FaSuitcaseRolling />}
//               title="$800 - $4,000"
//               subtitle="Travel Cost"
//               bg="bg-purple-100 text-purple-600"
//             />
//             <InfoCard
//               icon={<FaGlobe />}
//               title="80 (iBT)"
//               subtitle="Min TOEFL Score"
//               bg="bg-sky-100 text-sky-600"
//             />
//             <InfoCard
//               icon={<MdTranslate />}
//               title="6"
//               subtitle="Min IELTS Score"
//               bg="bg-red-100 text-red-600"
//             />
//             <InfoCard
//               icon={<FaBook />}
//               title="58"
//               subtitle="Min PTE Score"
//               bg="bg-blue-100 text-blue-800"
//             />
//           </div>

//           {/* Right: Map */}
//           <div className="flex justify-center">
//             <img
//               src="/malaysia-map.png"
//               alt="Malaysia Map"
//               className="w-full max-w-md"
//             />
//           </div>
//         </div>
//       </section>

//       {/* ---------- EDUCATION SYSTEM SECTION ---------- */}
//       <section className="py-16 bg-gray-100">
//         <EducationSystem />
//       </section>
//     </div>
//   );
// };

// // ---------------------- INFO CARD COMPONENT ----------------------
// const InfoCard = ({ icon, title, subtitle, bg }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-300 flex items-center space-x-4">
//       <div
//         className={`w-12 h-12 flex items-center justify-center rounded-full ${bg} text-xl`}
//       >
//         {icon}
//       </div>
//       <div>
//         <div className="text-xl font-bold text-gray-900">{title}</div>
//         <div className="text-sm text-gray-600">{subtitle}</div>
//       </div>
//     </div>
//   );
// };

// // ---------------------- EDUCATION SYSTEM COMPONENT ----------------------
// const EducationSystem = () => {
//   const nodes = [
//     { id: "1", title: "Doctor of Philosophy", level: 1, column: 1, color: "blue", width: "full" },
//     { id: "2", title: "Master's Degree", level: 2, column: 1, color: "blue", width: "third" },
//     { id: "3", title: "Postgraduate Diploma", level: 2, column: 2, color: "blue", width: "third" },
//     { id: "4", title: "Postgraduate Certificate", level: 2, column: 3, color: "blue", width: "third" },
//     { id: "5", title: "Bachelor's Degree", level: 3, column: 1, color: "blue", width: "full" },
//     { id: "6", title: "Malaysian Higher School Certificate (STPM)", level: 4, column: 1, color: "green", width: "third" },
//     { id: "7", title: "MOE Matriculation Certificate (KPM) / University Foundation", level: 4, column: 2, color: "green", width: "third" },
//     { id: "8", title: "Polytechnic Diploma", level: 4, column: 3, color: "green", width: "third" },
//     { id: "9", title: "Community College Diploma", level: 4, column: 4, color: "green", width: "third" },
//     { id: "10", title: "Community College Certificate", level: 4, column: 4, color: "green", width: "third" },
//     { id: "11", title: "Malaysian Certificate of Education (SPM)", level: 5, column: 1, color: "gray", width: "half" },
//     { id: "12", title: "Unified Examinations Certificate (UEC)", level: 5, column: 2, color: "gray", width: "half" },
//     { id: "13", title: "Upper Secondary Education", level: 6, column: 1, color: "blue", width: "half" },
//     { id: "14", title: "Chinese Independent Secondary School", level: 6, column: 2, color: "blue", width: "half" },
//     { id: "15", title: "Lower Secondary Education", level: 7, column: 1, color: "blue", width: "full" },
//     { id: "16", title: "Bahasa Melayu Assessment Literacy Test (UPLBM) or One-Year Transition Class", level: 8, column: 1, color: "gray", width: "full" },
//     { id: "17", title: "National School (SK)", level: 9, column: 1, color: "blue", width: "third" },
//     { id: "18", title: "National-Type Tamil School (SJKT)", level: 9, column: 2, color: "blue", width: "third" },
//     { id: "19", title: "National-Type Chinese School (SJKC)", level: 9, column: 3, color: "blue", width: "third" },
//     { id: "20", title: "Preschool", level: 10, column: 1, color: "green", width: "full" },
//   ];

//   const getColorClass = (color) => {
//     switch (color) {
//       case "blue":
//         return "bg-[#004976] text-white";
//       case "green":
//         return "bg-[#2d8659] text-white";
//       case "gray":
//         return "bg-[#6b7c8d] text-white";
//       default:
//         return "bg-[#004976] text-white";
//     }
//   };

//   const getWidthClass = (width) => {
//     switch (width) {
//       case "full":
//         return "col-span-4";
//       case "half":
//         return "col-span-2";
//       case "third":
//         return "col-span-1";
//       default:
//         return "col-span-1";
//     }
//   };

//   const getLevelNodes = (level) => {
//     return nodes.filter((node) => node.level === level);
//   };

//   return (
//     <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
//       <div className="flex items-center gap-3 mb-4">
//         <GraduationCap className="w-7 h-7 text-[#004976]" />
//         <h1 className="text-2xl font-bold text-[#004976]">
//           Educational System
//         </h1>
//       </div>

//       <div className="space-y-3">
//         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => {
//           const levelNodes = getLevelNodes(level);
//           if (levelNodes.length === 0) return null;

//           return (
//             <div key={level} className="relative">
//               <div className="grid grid-cols-4 gap-2">
//                 {levelNodes.map((node) => (
//                   <div
//                     key={node.id}
//                     className={`${getColorClass(node.color)} ${getWidthClass(
//                       node.width
//                     )} rounded p-2 relative flex flex-col justify-center items-center text-center shadow-md transition-transform hover:scale-105 hover:shadow-xl cursor-pointer min-h-[50px]`}
//                   >
//                     <h3 className="font-semibold text-xs leading-tight">
//                       {node.title}
//                     </h3>
//                     {node.subtitle && (
//                       <p className="text-[10px] mt-0.5 opacity-90">
//                         {node.subtitle}
//                       </p>
//                     )}

//                     {level < 10 && (
//                       <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
//                         <ArrowUp className="w-3 h-3 text-gray-500" />
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="mt-6 pt-4 border-t border-gray-200">
//         <p className="text-xs text-gray-600 text-center">
//           Malaysian Education System Progression Pathways
//         </p>
//       </div>
//     </div>
//   );
// };

// export default MalaysiaStudyInfo;

// import React from "react";
// import { GraduationCap, ArrowUp } from "lucide-react";

// const EducationSystem = () => {
//   const nodes = [
//     { id: "1", title: "Doctor of Philosophy", level: 1, column: 1, color: "blue", width: "full" },
//     { id: "2", title: "Master's Degree", level: 2, column: 1, color: "blue", width: "third" },
//     { id: "3", title: "Postgraduate Diploma", level: 2, column: 2, color: "blue", width: "third" },
//     { id: "4", title: "Postgraduate Certificate", level: 2, column: 3, color: "blue", width: "third" },
//     { id: "5", title: "Bachelor's Degree", level: 3, column: 1, color: "blue", width: "full" },
//     { id: "6", title: "Malaysian Higher School Certificate (STPM)", level: 4, column: 1, color: "green", width: "third" },
//     { id: "7", title: "MOE Matriculation Certificate (KPM) / University Foundation", level: 4, column: 2, color: "green", width: "third" },
//     { id: "8", title: "Polytechnic Diploma", level: 4, column: 3, color: "green", width: "third" },
//     { id: "9", title: "Community College Diploma", level: 4, column: 4, color: "green", width: "third" },
//     { id: "10", title: "Community College Certificate", level: 4, column: 4, color: "green", width: "third" },
//     { id: "11", title: "Malaysian Certificate of Education (SPM)", level: 5, column: 1, color: "gray", width: "half" },
//     { id: "12", title: "Unified Examinations Certificate (UEC)", level: 5, column: 2, color: "gray", width: "half" },
//     { id: "13", title: "Upper Secondary Education", level: 6, column: 1, color: "blue", width: "half" },
//     { id: "14", title: "Chinese Independent Secondary School", level: 6, column: 2, color: "blue", width: "half" },
//     { id: "15", title: "Lower Secondary Education", level: 7, column: 1, color: "blue", width: "full" },
//     { id: "16", title: "Bahasa Melayu Assessment Literacy Test (UPLBM) or One-Year Transition Class", level: 8, column: 1, color: "gray", width: "full" },
//     { id: "17", title: "National School (SK)", level: 9, column: 1, color: "blue", width: "third" },
//     { id: "18", title: "National-Type Tamil School (SJKT)", level: 9, column: 2, color: "blue", width: "third" },
//     { id: "19", title: "National-Type Chinese School (SJKC)", level: 9, column: 3, color: "blue", width: "third" },
//     { id: "20", title: "Preschool", level: 10, column: 1, color: "green", width: "full" },
//   ];

//   const getColorClass = (color) => {
//     switch (color) {
//       case "blue":
//         return "bg-blue-900 text-white";
//       case "green":
//         return "bg-green-700 text-white";
//       case "gray":
//         return "bg-slate-600 text-white";
//       default:
//         return "bg-blue-900 text-white";
//     }
//   };

//   const getWidthClass = (width) => {
//     switch (width) {
//       case "full":
//         return "col-span-4";
//       case "half":
//         return "col-span-2";
//       case "third":
//         return "col-span-1";
//       default:
//         return "col-span-1";
//     }
//   };

//   const getLevelNodes = (level) => {
//     return nodes.filter((node) => node.level === level);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto bg-gray-50 rounded-lg shadow-lg p-6">
//         <div className="flex items-center gap-3 mb-6">
//           <GraduationCap className="w-7 h-7 text-blue-900" />
//           <h1 className="text-2xl font-bold text-blue-900">
//             Educational System
//           </h1>
//         </div>

//         <div className="space-y-5">
//           {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => {
//             const levelNodes = getLevelNodes(level);
//             if (levelNodes.length === 0) return null;

//             return (
//               <div key={level} className="relative">
//                 <div className="grid grid-cols-4 gap-4">
//                   {levelNodes.map((node) => (
//                     <div
//                       key={node.id}
//                       className={`${getColorClass(node.color)} ${getWidthClass(
//                         node.width
//                       )} rounded-lg p-3 relative flex flex-col justify-center items-center text-center shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[60px]`}
//                     >
//                       <h3 className="font-semibold text-xs leading-tight">
//                         {node.title}
//                       </h3>
//                       {node.subtitle && (
//                         <p className="text-[10px] mt-0.5 opacity-90">
//                           {node.subtitle}
//                         </p>
//                       )}

//                       {level < 10 && (
//                         <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
//                           <ArrowUp className="w-4 h-4 text-gray-400" />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* <div className="mt-6 pt-4 border-t border-gray-200">
//           <p className="text-xs text-gray-600 text-center">
//             Malaysian Education System Progression Pathways
//           </p>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default EducationSystem;
import React from "react";
import { GraduationCap, ArrowUp } from "lucide-react";

const EducationSystem = () => {
  const nodes = [
    { id: "1", title: "Doctor of Philosophy", level: 1, column: 1, color: "blue", width: "full" },
    { id: "2", title: "Master's Degree", level: 2, column: 1, color: "blue", width: "third" },
    { id: "3", title: "Postgraduate Diploma", level: 2, column: 2, color: "blue", width: "third" },
    { id: "4", title: "Postgraduate Certificate", level: 2, column: 3, color: "blue", width: "third" },
    { id: "5", title: "Bachelor's Degree", level: 3, column: 1, color: "blue", width: "full" },
    { id: "6", title: "Malaysian Higher School Certificate (STPM)", level: 4, column: 1, color: "green", width: "third" },
    { id: "7", title: "MOE Matriculation Certificate (KPM) / University Foundation", level: 4, column: 2, color: "green", width: "third" },
    { id: "8", title: "Polytechnic Diploma", level: 4, column: 3, color: "green", width: "third" },
    { id: "9", title: "Community College Diploma", level: 4, column: 4, color: "green", width: "third" },
    { id: "10", title: "Community College Certificate", level: 4, column: 4, color: "green", width: "third" },
    { id: "11", title: "Malaysian Certificate of Education (SPM)", level: 5, column: 1, color: "gray", width: "half" },
    { id: "12", title: "Unified Examinations Certificate (UEC)", level: 5, column: 2, color: "gray", width: "half" },
    { id: "13", title: "Upper Secondary Education", level: 6, column: 1, color: "blue", width: "half" },
    { id: "14", title: "Chinese Independent Secondary School", level: 6, column: 2, color: "blue", width: "half" },
    { id: "15", title: "Lower Secondary Education", level: 7, column: 1, color: "blue", width: "full" },
    { id: "16", title: "Bahasa Melayu Assessment Literacy Test (UPLBM) or One-Year Transition Class", level: 8, column: 1, color: "gray", width: "full" },
    { id: "17", title: "National School (SK)", level: 9, column: 1, color: "blue", width: "third" },
    { id: "18", title: "National-Type Tamil School (SJKT)", level: 9, column: 2, color: "blue", width: "third" },
    { id: "19", title: "National-Type Chinese School (SJKC)", level: 9, column: 3, color: "blue", width: "third" },
    { id: "20", title: "Preschool", level: 10, column: 1, color: "green", width: "full" },
  ];

  const getColorClass = (color) => {
    switch (color) {
      case "blue":
        return "bg-blue-900 text-white";
      case "green":
        return "bg-green-700 text-white";
      case "gray":
        return "bg-slate-600 text-white";
      default:
        return "bg-blue-900 text-white";
    }
  };

  const getWidthClass = (width) => {
    switch (width) {
      case "full":
        return "col-span-4";
      case "half":
        return "col-span-2";
      case "third":
        return "col-span-1";
      default:
        return "col-span-1";
    }
  };

  const getLevelNodes = (level) => {
    return nodes.filter((node) => node.level === level);
  };

  return (
    // 🔽 Top padding reduced from p-8 to p-4 + margin top tightened
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 -mt-6">
      <div className="max-w-7xl mx-auto bg-gray-50 rounded-lg shadow-lg p-5 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap className="w-7 h-7 text-blue-900" />
          <h1 className="text-2xl font-bold text-blue-900">
            Educational System
          </h1>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => {
            const levelNodes = getLevelNodes(level);
            if (levelNodes.length === 0) return null;

            return (
              <div key={level} className="relative">
                <div className="grid grid-cols-4 gap-3">
                  {levelNodes.map((node) => (
                    <div
                      key={node.id}
                      className={`${getColorClass(node.color)} ${getWidthClass(
                        node.width
                      )} rounded-lg p-3 relative flex flex-col justify-center items-center text-center shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[60px]`}
                    >
                      <h3 className="font-semibold text-xs leading-tight">
                        {node.title}
                      </h3>
                      {node.subtitle && (
                        <p className="text-[10px] mt-0.5 opacity-90">
                          {node.subtitle}
                        </p>
                      )}

                      {level < 10 && (
                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                          <ArrowUp className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EducationSystem;
