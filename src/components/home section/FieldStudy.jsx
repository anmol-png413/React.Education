
// import React, { useState, useMemo } from 'react';
// import { BookOpen, Calendar, TrendingUp, Globe, Filter, BarChart3 } from 'lucide-react';

// const fieldOfStudyData = [
//   { 
//     year: 2020, 
//     socialSciences: 10522, 
//     science: 3626, 
//     generalProgrammes: 3151, 
//     engineering: 3744, 
//     artsHumanities: 2933,
//     education: 1369,
//     healthWelfare: 1368,
//     agriculture: 76,
//     services: 1290,
//     others: 2263
//   },
//   { 
//     year: 2021, 
//     socialSciences: 15796, 
//     science: 4157, 
//     generalProgrammes: 4290, 
//     engineering: 3564, 
//     artsHumanities: 4299,
//     education: 0,
//     healthWelfare: 0,
//     agriculture: 0,
//     services: 0,
//     others: 0
//   },
//   { 
//     year: 2022, 
//     socialSciences: 19081, 
//     science: 5943, 
//     generalProgrammes: 5373, 
//     engineering: 4324, 
//     artsHumanities: 4967,
//     education: 0,
//     healthWelfare: 0,
//     agriculture: 0,
//     services: 0,
//     others: 0
//   },
//   { 
//     year: 2023, 
//     socialSciences: 20095, 
//     science: 8868, 
//     generalProgrammes: 6239, 
//     engineering: 4915, 
//     artsHumanities: 5301,
//     education: 0,
//     healthWelfare: 0,
//     agriculture: 0,
//     services: 0,
//     others: 0
//   },
//   { 
//     year: 2024, 
//     socialSciences: 21336, 
//     science: 12176, 
//     generalProgrammes: 8525, 
//     engineering: 6571, 
//     artsHumanities: 5402,
//     education: 0,
//     healthWelfare: 0,
//     agriculture: 0,
//     services: 0,
//     others: 0
//   },
// ];

// const fieldColors = {
//   socialSciences: 'bg-emerald-300',
//   science: 'bg-red-300', 
//   generalProgrammes: 'bg-blue-300',
//   engineering: 'bg-yellow-300',
//   artsHumanities: 'bg-purple-300',
//   education: 'bg-green-300',
//   healthWelfare: 'bg-orange-300',
//   agriculture: 'bg-pink-300',
//   services: 'bg-cyan-300',
//   others: 'bg-rose-300'
// };

// const fieldLabels = {
//   socialSciences: 'Social Sciences, Business and Law',
//   science: 'Science, Mathematics and Computing',
//   generalProgrammes: 'General Programmes',
//   engineering: 'Engineering, Manufacturing and Construction',
//   artsHumanities: 'Arts and Humanities',
//   education: 'Education',
//   healthWelfare: 'Health and Welfare',
//   agriculture: 'Agriculture and Veterinary',
//   services: 'Services',
//   others: 'Others'
// };

// function FieldOfStudyDashboard() {
//   const [selectedYears, setSelectedYears] = useState(fieldOfStudyData.map(d => d.year));
//   const [showFilters, setShowFilters] = useState(false);

//   const filteredData = useMemo(() => {
//     return fieldOfStudyData.filter(yearData => selectedYears.includes(yearData.year));
//   }, [selectedYears]);

//   const totalApplications = useMemo(() => {
//     return filteredData.reduce((sum, yearData) => {
//       return sum + yearData.socialSciences + yearData.science + yearData.generalProgrammes + 
//              yearData.engineering + yearData.artsHumanities + yearData.education + 
//              yearData.healthWelfare + yearData.agriculture + yearData.services + yearData.others;
//     }, 0);
//   }, [filteredData]);

//   const toggleYear = (year) => {
//     setSelectedYears(prev => 
//       prev.includes(year) 
//         ? prev.filter(y => y !== year)
//         : [...prev, year].sort()
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Header Section */}
//       <div className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl mb-4 shadow-lg">
//               <BookOpen className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-3">
//               What do these students <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">study?</span>
//             </h1>
//             <p className="text-gray-600 max-w-4xl mx-auto">
//               Distribution by Field of Study for New Application Received (By 2020 - 2024)
//             </p>
//           </div>

//           {/* Year Filter Controls */}
//           <div className="flex items-center justify-center gap-4 mt-6">
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white/90 transition-all duration-200 shadow-md"
//             >
//               <Filter className="w-4 h-4" />
//               Filter Years
//             </button>
            
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <BarChart3 className="w-4 h-4" />
//               {selectedYears.length} of {fieldOfStudyData.length} years selected
//             </div>
//           </div>

//           {/* Year Selection */}
//           <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'max-h-96 mt-4' : 'max-h-0'}`}>
//             <div className="flex flex-wrap justify-center gap-2 p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-md">
//               {fieldOfStudyData.map((yearData) => (
//                 <button
//                   key={yearData.year}
//                   onClick={() => toggleYear(yearData.year)}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//                     selectedYears.includes(yearData.year)
//                       ? 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white shadow-lg transform scale-105'
//                       : 'bg-white/80 text-gray-600 border border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-md'
//                   }`}
//                 >
//                   {yearData.year}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Summary Statistics */}
//         <div className="mb-8">
//           <div className="text-center mb-6">
//             <p className="text-2xl font-bold text-gray-900">
//               {totalApplications.toLocaleString()} Total Applications
//             </p>
//             <p className="text-gray-600">
//               Across {selectedYears.length} selected years ({Math.min(...selectedYears)} - {Math.max(...selectedYears)})
//             </p>
//           </div>
//         </div>

//         {/* Legend */}
//         <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
//           {Object.entries(fieldColors).map(([field, colorClass]) => (
//             <div key={field} className="flex items-center gap-2">
//               <div className={`w-4 h-4 ${colorClass} rounded shadow-sm`}></div>
//               <span className="font-medium text-gray-700">{fieldLabels[field]}</span>
//             </div>
//           ))}
//         </div>

//         {/* Field Distribution Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
//           {filteredData.map((yearData) => (
//             <div key={yearData.year} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
//               <div className="text-center mb-4">
//                 <div className="flex items-center justify-center gap-2 mb-2">
//                   <Calendar className="w-4 h-4 text-gray-600" />
//                   <span className="text-lg font-bold text-gray-900">{yearData.year}</span>
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   Total: {(yearData.socialSciences + yearData.science + yearData.generalProgrammes + 
//                           yearData.engineering + yearData.artsHumanities + yearData.education + 
//                           yearData.healthWelfare + yearData.agriculture + yearData.services + yearData.others).toLocaleString()}
//                 </div>
//               </div>
              
//               <div className="space-y-3">
//                 {Object.entries(fieldLabels).map(([field, label]) => {
//                   const value = yearData[field];
//                   if (value === 0) return null;
                  
//                   return (
//                     <div key={field} className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className={`w-3 h-3 ${fieldColors[field]} rounded`}></div>
//                         <span className="text-xs text-gray-600 truncate">{label.split(',')[0]}</span>
//                       </div>
//                       <span className="text-sm font-semibold text-gray-900">{value.toLocaleString()}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Horizontal Bar Chart */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-8">
//           <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Field Distribution by Year</h3>
//           <div className="space-y-6">
//             {filteredData.map((yearData) => {
//               const total = yearData.socialSciences + yearData.science + yearData.generalProgrammes + 
//                            yearData.engineering + yearData.artsHumanities + yearData.education + 
//                            yearData.healthWelfare + yearData.agriculture + yearData.services + yearData.others;
              
//               return (
//                 <div key={yearData.year} className="flex items-center gap-6">
//                   <div className="w-16 text-lg font-bold text-gray-700 flex items-center">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     {yearData.year}
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex h-12 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
//                       {Object.entries(fieldColors).map(([field, colorClass]) => {
//                         const value = yearData[field];
//                         if (value === 0) return null;
                        
//                         return (
//                           <div 
//                             key={field}
//                             className={`${colorClass} flex items-center justify-center text-gray-800 text-sm font-semibold transition-all duration-300 hover:brightness-110 cursor-pointer`}
//                             style={{ width: `${(value / total) * 100}%` }}
//                             title={`${fieldLabels[field]}: ${value.toLocaleString()}`}
//                           >
//                             {value > 1000 && (
//                               <span className="px-2">{value.toLocaleString()}</span>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                   <div className="w-24 text-right text-lg font-bold text-gray-700">
//                     {total.toLocaleString()}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Summary Statistics by Field */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
//           {Object.entries(fieldColors).map(([field, colorClass]) => {
//             const total = filteredData.reduce((sum, year) => sum + year[field], 0);
//             const percentage = totalApplications > 0 ? ((total / totalApplications) * 100).toFixed(1) : '0';
            
//             if (total === 0) return null;
            
//             return (
//               <div key={field} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
//                 <div className={`w-12 h-12 ${colorClass} rounded-lg mx-auto mb-3 shadow-md`}></div>
//                 <div className="text-2xl font-bold text-gray-900 mb-1">{total.toLocaleString()}</div>
//                 <div className="text-sm text-gray-600 mb-1">{fieldLabels[field].split(',')[0]}</div>
//                 <div className="text-xs text-gray-500">{percentage}%</div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Trends Analysis */}
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
//           <div className="text-center mb-6">
//             <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl mb-4 shadow-lg">
//               <TrendingUp className="w-6 h-6 text-white" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Key Insights & Trends
//             </h2>
//             <p className="text-gray-600">
//               Analysis of field preferences over time
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
//               <div className="text-3xl font-bold text-emerald-600 mb-2">
//                 {Math.round(((filteredData[filteredData.length - 1]?.socialSciences || 0) / (filteredData[0]?.socialSciences || 1)) * 100 - 100)}%
//               </div>
//               <div className="text-gray-700 font-medium">Social Sciences Growth</div>
//               <div className="text-sm text-gray-500">Since {Math.min(...selectedYears)}</div>
//             </div>
            
//             <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
//               <div className="text-3xl font-bold text-red-600 mb-2">
//                 {Math.round(((filteredData[filteredData.length - 1]?.science || 0) / (filteredData[0]?.science || 1)) * 100 - 100)}%
//               </div>
//               <div className="text-gray-700 font-medium">Science & Computing Growth</div>
//               <div className="text-sm text-gray-500">Since {Math.min(...selectedYears)}</div>
//             </div>
            
//             <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
//               <div className="text-3xl font-bold text-blue-600 mb-2">
//                 {selectedYears.length}
//               </div>
//               <div className="text-gray-700 font-medium">Years of Data</div>
//               <div className="text-sm text-gray-500">Comprehensive tracking</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200 mt-12">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl mb-4 shadow-xl">
//             <Globe className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-3">
//             Education Malaysia Global Services
//           </h2>
//           <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
//             Comprehensive data insights into international student applications and field of study preferences in Malaysia.
//           </p>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 max-w-4xl mx-auto">
//             <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
//               <div className="text-2xl font-bold text-blue-600 mb-2">{fieldOfStudyData.length}</div>
//               <div className="text-gray-700 font-medium">Years of Data</div>
//             </div>
//             <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
//               <div className="text-2xl font-bold text-green-600 mb-2">10</div>
//               <div className="text-gray-700 font-medium">Fields of Study</div>
//             </div>
//             <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
//               <div className="text-2xl font-bold text-indigo-600 mb-2">
//                 {fieldOfStudyData.reduce((sum, year) => 
//                   sum + year.socialSciences + year.science + year.generalProgrammes + 
//                   year.engineering + year.artsHumanities + year.education + 
//                   year.healthWelfare + year.agriculture + year.services + year.others, 0
//                 ).toLocaleString()}
//               </div>
//               <div className="text-gray-700 font-medium">Total Applications</div>
//             </div>
//           </div>

//           <div className="text-sm text-gray-500">
//             {/* Prepared by Corporate Strategy Division - EMGS Malaysia */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FieldOfStudyDashboard;



// // import React, { useState, useMemo } from 'react';
// // import { BookOpen, Calendar, TrendingUp, Globe, Filter, BarChart3 } from 'lucide-react';

// // const fieldOfStudyData = [
// //   { year: 2020, socialSciences: 10522, science: 3626, generalProgrammes: 3151, engineering: 3744, artsHumanities: 2933, education: 1369, healthWelfare: 1368, agriculture: 76, services: 1290, others: 2263 },
// //   { year: 2021, socialSciences: 15796, science: 4157, generalProgrammes: 4290, engineering: 3564, artsHumanities: 4299, education: 0, healthWelfare: 0, agriculture: 0, services: 0, others: 0 },
// //   { year: 2022, socialSciences: 19081, science: 5943, generalProgrammes: 5373, engineering: 4324, artsHumanities: 4967, education: 0, healthWelfare: 0, agriculture: 0, services: 0, others: 0 },
// //   { year: 2023, socialSciences: 20095, science: 8868, generalProgrammes: 6239, engineering: 4915, artsHumanities: 5301, education: 0, healthWelfare: 0, agriculture: 0, services: 0, others: 0 },
// //   { year: 2024, socialSciences: 21336, science: 12176, generalProgrammes: 8525, engineering: 6571, artsHumanities: 5402, education: 0, healthWelfare: 0, agriculture: 0, services: 0, others: 0 },
// // ];

// // const fieldColors = {
// //   socialSciences: 'bg-emerald-300',
// //   science: 'bg-red-300',
// //   generalProgrammes: 'bg-blue-300',
// //   engineering: 'bg-yellow-300',
// //   artsHumanities: 'bg-purple-300',
// //   education: 'bg-green-300',
// //   healthWelfare: 'bg-orange-300',
// //   agriculture: 'bg-pink-300',
// //   services: 'bg-cyan-300',
// //   others: 'bg-rose-300'
// // };

// // const fieldLabels = {
// //   socialSciences: 'Social Sciences, Business and Law',
// //   science: 'Science, Mathematics and Computing',
// //   generalProgrammes: 'General Programmes',
// //   engineering: 'Engineering, Manufacturing and Construction',
// //   artsHumanities: 'Arts and Humanities',
// //   education: 'Education',
// //   healthWelfare: 'Health and Welfare',
// //   agriculture: 'Agriculture and Veterinary',
// //   services: 'Services',
// //   others: 'Others'
// // };

// // function FieldOfStudyDashboard() {
// //   const [selectedYears, setSelectedYears] = useState(fieldOfStudyData.map(d => d.year));
// //   const [showFilters, setShowFilters] = useState(true); // ✅ Default open

// //   const filteredData = useMemo(() => {
// //     return fieldOfStudyData.filter(yearData => selectedYears.includes(yearData.year));
// //   }, [selectedYears]);

// //   const totalApplications = useMemo(() => {
// //     return filteredData.reduce((sum, yearData) => {
// //       return sum + yearData.socialSciences + yearData.science + yearData.generalProgrammes +
// //         yearData.engineering + yearData.artsHumanities + yearData.education +
// //         yearData.healthWelfare + yearData.agriculture + yearData.services + yearData.others;
// //     }, 0);
// //   }, [filteredData]);

// //   const toggleYear = (year) => {
// //     setSelectedYears(prev =>
// //       prev.includes(year)
// //         ? prev.filter(y => y !== year)
// //         : [...prev, year].sort()
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
// //       {/* Header Section */}
// //       <div className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"> {/* ✅ Reduced top padding */}
// //           <div className="text-center">
// //             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl mb-3 shadow-lg">
// //               <BookOpen className="w-8 h-8 text-white" />
// //             </div>
// //             <h1 className="text-3xl font-bold text-gray-900 mb-2">
// //               What do these students <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">study?</span>
// //             </h1>
// //             <p className="text-gray-600 max-w-4xl mx-auto">
// //               Distribution by Field of Study for New Application Received (By 2020 - 2024)
// //             </p>
// //           </div>

// //           {/* Year Filter Controls */}
// //           <div className="flex items-center justify-center gap-4 mt-5">
// //             <button
// //               onClick={() => setShowFilters(!showFilters)}
// //               className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white/90 transition-all duration-200 shadow-md"
// //             >
// //               <Filter className="w-4 h-4" />
// //               Filter Years
// //             </button>

// //             <div className="flex items-center gap-2 text-sm text-gray-600">
// //               <BarChart3 className="w-4 h-4" />
// //               {selectedYears.length} of {fieldOfStudyData.length} years selected
// //             </div>
// //           </div>

// //           {/* Year Selection */}
// //           <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'max-h-96 mt-4' : 'max-h-0'}`}>
// //             <div className="flex flex-wrap justify-center gap-2 p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-md">
// //               {fieldOfStudyData.map((yearData) => (
// //                 <button
// //                   key={yearData.year}
// //                   onClick={() => toggleYear(yearData.year)}
// //                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedYears.includes(yearData.year)
// //                     ? 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white shadow-lg transform scale-105'
// //                     : 'bg-white/80 text-gray-600 border border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-md'
// //                     }`}
// //                 >
// //                   {yearData.year}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Summary Statistics */}
// //         <div className="mb-8 text-center">
// //           <p className="text-2xl font-bold text-gray-900">
// //             {totalApplications.toLocaleString()} Total Applications
// //           </p>
// //           <p className="text-gray-600">
// //             Across {selectedYears.length} selected years ({Math.min(...selectedYears)} - {Math.max(...selectedYears)})
// //           </p>
// //         </div>

// //         {/* Legend */}
// //         <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
// //           {Object.entries(fieldColors).map(([field, colorClass]) => (
// //             <div key={field} className="flex items-center gap-2">
// //               <div className={`w-4 h-4 ${colorClass} rounded shadow-sm`}></div>
// //               <span className="font-medium text-gray-700">{fieldLabels[field]}</span>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Field Distribution Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
// //           {filteredData.map((yearData) => (
// //             <div key={yearData.year} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
// //               <div className="text-center mb-4">
// //                 <div className="flex items-center justify-center gap-2 mb-2">
// //                   <Calendar className="w-4 h-4 text-gray-600" />
// //                   <span className="text-lg font-bold text-gray-900">{yearData.year}</span>
// //                 </div>
// //                 <div className="text-sm text-gray-600">
// //                   Total: {(yearData.socialSciences + yearData.science + yearData.generalProgrammes +
// //                     yearData.engineering + yearData.artsHumanities + yearData.education +
// //                     yearData.healthWelfare + yearData.agriculture + yearData.services + yearData.others).toLocaleString()}
// //                 </div>
// //               </div>

// //               <div className="space-y-3">
// //                 {Object.entries(fieldLabels).map(([field, label]) => {
// //                   const value = yearData[field];
// //                   if (value === 0) return null;

// //                   return (
// //                     <div key={field} className="flex items-center justify-between">
// //                       <div className="flex items-center gap-2">
// //                         <div className={`w-3 h-3 ${fieldColors[field]} rounded`}></div>
// //                         <span className="text-xs text-gray-600 truncate">{label.split(',')[0]}</span>
// //                       </div>
// //                       <span className="text-sm font-semibold text-gray-900">{value.toLocaleString()}</span>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Remaining content unchanged... */}
// //       </div>
// //     </div>
// //   );
// // }

// // export default FieldOfStudyDashboard;

import React, { useState, useMemo } from 'react';
import { BookOpen, Calendar, TrendingUp, Globe, Filter, BarChart3 } from 'lucide-react';

const fieldOfStudyData = [
  { year: 2020, socialSciences: 10522, science: 3626, generalProgrammes: 3151, engineering: 3744, artsHumanities: 2933, education: 1369, healthWelfare: 1368, agriculture: 76, services: 1290, others: 2263 },
  { year: 2021, socialSciences: 15796, science: 4157, generalProgrammes: 4290, engineering: 3564, artsHumanities: 4299, education: 0, healthWelfare: 0, agriculture: 0, services: 0, others: 0 },
  { year: 2022, socialSciences: 19081, science: 5943, generalProgrammes: 5373, engineering: 4324, artsHumanities: 4967, education: 0, healthWelfare: 0, agriculture: 0, services: 0, others: 0 },
  { year: 2023, socialSciences: 20095, science: 8868, generalProgrammes: 6239, engineering: 4915, artsHumanities: 5301, education: 0, healthWelfare: 0, agriculture: 0, services: 0, others: 0 },
  { year: 2024, socialSciences: 21336, science: 12176, generalProgrammes: 8525, engineering: 6571, artsHumanities: 5402, education: 0, healthWelfare: 0, agriculture: 0, services: 0, others: 0 },
];

const fieldColors = {
  socialSciences: 'bg-emerald-300',
  science: 'bg-red-300',
  generalProgrammes: 'bg-blue-300',
  engineering: 'bg-yellow-300',
  artsHumanities: 'bg-purple-300',
  education: 'bg-green-300',
  healthWelfare: 'bg-orange-300',
  agriculture: 'bg-pink-300',
  services: 'bg-cyan-300',
  others: 'bg-rose-300'
};

const fieldLabels = {
  socialSciences: 'Social Sciences, Business and Law',
  science: 'Science, Mathematics and Computing',
  generalProgrammes: 'General Programmes',
  engineering: 'Engineering, Manufacturing and Construction',
  artsHumanities: 'Arts and Humanities',
  education: 'Education',
  healthWelfare: 'Health and Welfare',
  agriculture: 'Agriculture and Veterinary',
  services: 'Services',
  others: 'Others'
};

function FieldOfStudyDashboard() {
  const [selectedYears, setSelectedYears] = useState(fieldOfStudyData.map(d => d.year));
  const [showFilters, setShowFilters] = useState(true); // ✅ Default open

  const filteredData = useMemo(() => {
    return fieldOfStudyData.filter(yearData => selectedYears.includes(yearData.year));
  }, [selectedYears]);

  const totalApplications = useMemo(() => {
    return filteredData.reduce((sum, yearData) => {
      return sum + yearData.socialSciences + yearData.science + yearData.generalProgrammes +
             yearData.engineering + yearData.artsHumanities + yearData.education +
             yearData.healthWelfare + yearData.agriculture + yearData.services + yearData.others;
    }, 0);
  }, [filteredData]);

  const toggleYear = (year) => {
    setSelectedYears(prev =>
      prev.includes(year)
        ? prev.filter(y => y !== year)
        : [...prev, year].sort()
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl mb-4 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              What do these students <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">study?</span>
            </h1>
            <p className="text-gray-600 max-w-4xl mx-auto">
              Distribution by Field of Study for New Application Received (By 2020 - 2024)
            </p>
          </div>

          {/* Year Filter Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white/90 transition-all duration-200 shadow-md"
            >
              <Filter className="w-4 h-4" />
              Filter Years
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BarChart3 className="w-4 h-4" />
              {selectedYears.length} of {fieldOfStudyData.length} years selected
            </div>
          </div>

          {/* Year Selection */}
          <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'max-h-96 mt-4' : 'max-h-0'}`}>
            <div className="flex flex-wrap justify-center gap-2 p-4 bg-white/60 backdrop-blur-sm rounded-lg shadow-md">
              {fieldOfStudyData.map((yearData) => (
                <button
                  key={yearData.year}
                  onClick={() => toggleYear(yearData.year)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedYears.includes(yearData.year)
                      ? 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white shadow-lg transform scale-105'
                      : 'bg-white/80 text-gray-600 border border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  {yearData.year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Summary */}
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">
            {totalApplications.toLocaleString()} Total Applications
          </p>
          <p className="text-gray-600">
            Across {selectedYears.length} years ({Math.min(...selectedYears)} - {Math.max(...selectedYears)})
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
          {Object.entries(fieldColors).map(([field, colorClass]) => (
            <div key={field} className="flex items-center gap-2">
              <div className={`w-4 h-4 ${colorClass} rounded shadow-sm`}></div>
              <span className="font-medium text-gray-700">{fieldLabels[field]}</span>
            </div>
          ))}
        </div>

        {/* Year Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {filteredData.map((yearData) => (
            <div key={yearData.year} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-lg font-bold text-gray-900">{yearData.year}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Total: {(
                    yearData.socialSciences + yearData.science + yearData.generalProgrammes +
                    yearData.engineering + yearData.artsHumanities + yearData.education +
                    yearData.healthWelfare + yearData.agriculture + yearData.services + yearData.others
                  ).toLocaleString()}
                </div>
              </div>

              <div className="space-y-3">
                {Object.entries(fieldLabels).map(([field, label]) => {
                  const value = yearData[field];
                  if (value === 0) return null;
                  return (
                    <div key={field} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 ${fieldColors[field]} rounded`}></div>
                        <span className="text-xs text-gray-600 truncate">{label.split(',')[0]}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{value.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Horizontal Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Field Distribution by Year</h3>
          <div className="space-y-6">
            {filteredData.map((yearData) => {
              const total = Object.keys(fieldLabels).reduce((sum, f) => sum + yearData[f], 0);
              return (
                <div key={yearData.year} className="flex items-center gap-6">
                  <div className="w-16 text-lg font-bold text-gray-700 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {yearData.year}
                  </div>
                  <div className="flex-1">
                    <div className="flex h-10 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
                      {Object.entries(fieldColors).map(([field, colorClass]) => {
                        const value = yearData[field];
                        if (value === 0) return null;
                        return (
                          <div
                            key={field}
                            className={`${colorClass} flex items-center justify-center text-gray-800 text-sm font-semibold transition hover:brightness-110 cursor-pointer`}
                            style={{ width: `${(value / total) * 100}%` }}
                            title={`${fieldLabels[field]}: ${value.toLocaleString()}`}
                          >
                            {value > 1000 && <span className="px-2">{value.toLocaleString()}</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="w-24 text-right text-lg font-bold text-gray-700">{total.toLocaleString()}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary by Field */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {Object.entries(fieldColors).map(([field, colorClass]) => {
            const total = filteredData.reduce((sum, y) => sum + y[field], 0);
            if (total === 0) return null;
            const percentage = ((total / totalApplications) * 100).toFixed(1);
            return (
              <div key={field} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
                <div className={`w-12 h-12 ${colorClass} rounded-lg mx-auto mb-3 shadow-md`}></div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{total.toLocaleString()}</div>
                <div className="text-sm text-gray-600 mb-1">{fieldLabels[field].split(',')[0]}</div>
                <div className="text-xs text-gray-500">{percentage}%</div>
              </div>
            );
          })}
        </div>

        {/* Trends */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl mb-4 shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Key Insights & Trends</h2>
            <p className="text-gray-600">Analysis of field preferences over time</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {Math.round(((filteredData.at(-1)?.socialSciences || 0) / (filteredData[0]?.socialSciences || 1)) * 100 - 100)}%
              </div>
              <div className="text-gray-700 font-medium">Social Sciences Growth</div>
              <div className="text-sm text-gray-500">Since {Math.min(...selectedYears)}</div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {Math.round(((filteredData.at(-1)?.science || 0) / (filteredData[0]?.science || 1)) * 100 - 100)}%
              </div>
              <div className="text-gray-700 font-medium">Science & Computing Growth</div>
              <div className="text-sm text-gray-500">Since {Math.min(...selectedYears)}</div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{selectedYears.length}</div>
              <div className="text-gray-700 font-medium">Years of Data</div>
              <div className="text-sm text-gray-500">Comprehensive tracking</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200 mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl mb-4 shadow-xl">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Education Malaysia Global Services
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Comprehensive data insights into international student applications and field of study preferences in Malaysia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">{fieldOfStudyData.length}</div>
              <div className="text-gray-700 font-medium">Years of Data</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">10</div>
              <div className="text-gray-700 font-medium">Fields of Study</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-indigo-600 mb-2">
                {fieldOfStudyData.reduce((sum, year) =>
                  sum + year.socialSciences + year.science + year.generalProgrammes +
                  year.engineering + year.artsHumanities + year.education +
                  year.healthWelfare + year.agriculture + year.services + year.others, 0
                ).toLocaleString()}
              </div>
              <div className="text-gray-700 font-medium">Total Applications</div>
            </div>
          </div>
        </div>
      </div>
    </div>

      
  );
}

export default FieldOfStudyDashboard;

