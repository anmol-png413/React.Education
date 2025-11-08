// import React from "react";
// import {
//   GraduationCap,
//   Briefcase,
//   Globe,
//   MapPin,
//   TrendingUp,
//   Users,
//   Award,
//   Star,
// } from "lucide-react";

// function Malaysia() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
//       <div className="min-h-screen flex items-center justify-center px-6 py-12">
//         <div className="max-w-6xl w-full">
//           {/* ---------- Title Section ---------- */}
//           <div className="text-center mb-10">
          
//             <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
//            Where Knowledge Grows and Opportunities Thrive
//             </p>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//            Experience studying, working, and living in one of Asia’s most vibrant, affordable, and diverse nations.
//             </p>
//           </div>

//           {/* ---------- Stats Cards ---------- */}
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
//             {[
//          { color: "from-blue-300 to-blue-400", value: "150+", label: "Accredited Universities" },
// { color: "from-green-300 to-green-400", value: "130K+", label: "International Students" },
// { color: "from-orange-300 to-red-400", value: "$399B", label: "GDP Economy" },
// { color: "from-purple-300 to-pink-400", value: "97%", label: "Visa Success Rate" },

//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl text-white text-center shadow-xl hover:shadow-2xl transition-all hover:scale-105`}
//               >
//                 <div className="text-4xl font-bold mb-1">{item.value}</div>
//                 <div className="text-sm opacity-90">{item.label}</div>
//               </div>
//             ))}
//           </div>

//           {/* ---------- Info Cards ---------- */}
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
//             {[
//               {
//                 icon: <GraduationCap className="w-7 h-7 text-blue-600" />,
//                 bg: "bg-blue-100",
//                 title: "Quality Education",
//                 desc: "Globally ranked universities with world-class programs and research facilities",
//               },
//               {
//                 icon: <TrendingUp className="w-7 h-7 text-green-600" />,
//                 bg: "bg-green-100",
//                 title: "Affordable Cost",
//                 desc: "Lower tuition and living costs compared to Western countries",
//               },
//               {
//                 icon: <Award className="w-7 h-7 text-yellow-600" />,
//                 bg: "bg-yellow-100",
//                 title: "Global Recognition",
//                 desc: "Degrees recognized worldwide by top employers and institutions",
//               },
//               {
//                 icon: <Users className="w-7 h-7 text-purple-600" />,
//                 bg: "bg-purple-100",
//                 title: "Cultural Diversity",
//                 desc: "Harmonious blend of Malay, Chinese, Indian and indigenous cultures",
//               },
//               {
//                 icon: <Briefcase className="w-7 h-7 text-orange-600" />,
//                 bg: "bg-orange-100",
//                 title: "Career Growth",
//                 desc: "Home to global MNCs in tech, finance, healthcare and more",
//               },
//               {
//                 icon: <Globe className="w-7 h-7 text-cyan-600" />,
//                 bg: "bg-cyan-100",
//                 title: "English Friendly",
//                 desc: "English widely spoken across the country for easy communication",
//               },
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:-translate-y-1"
//               >
//                 <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-3`}>
//                   {item.icon}
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
//               </div>
//             ))}
//           </div>

//           {/* ---------- About Malaysia ---------- */}
//           <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-3xl shadow-lg mb-10 border border-gray-200">
//             <div className="grid md:grid-cols-2 gap-8">
//               <div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <MapPin className="w-5 h-5 text-red-600" />
//                   About Malaysia
//                 </h3>
//                 <div className="space-y-2 text-gray-700">
//                   <div className="flex">
//                     <span className="font-semibold w-32">Capital:</span>
//                     <span>Kuala Lumpur</span>
//                   </div>
//                   <div className="flex">
//                     <span className="font-semibold w-32">Population:</span>
//                     <span>34 Million</span>
//                   </div>
//                   <div className="flex">
//                     <span className="font-semibold w-32">Language:</span>
//                     <span>Malay, English widely spoken</span>
//                   </div>
//                   <div className="flex">
//                     <span className="font-semibold w-32">Climate:</span>
//                     <span>Tropical, warm year-round</span>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <TrendingUp className="w-5 h-5 text-green-600" />
//                   Economy & Industries
//                 </h3>
//                 <div className="space-y-2 text-gray-700">
//                   <div className="flex">
//                     <span className="font-semibold w-32">Growth:</span>
//                     <span>~5% annually</span>
//                   </div>
//                   <div className="flex">
//                     <span className="font-semibold w-32">Unemployment:</span>
//                     <span>3.0%</span>
//                   </div>
//                   <div className="flex">
//                     <span className="font-semibold w-32">Top Sectors:</span>
//                     <span>Electronics, IT, Oil & Gas, Healthcare</span>
//                   </div>
//                   <div className="flex">
//                     <span className="font-semibold w-32">States:</span>
//                     <span>13 States & 3 Federal Territories</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


// export default Malaysia;

import React from "react";
import {
  GraduationCap,
  Briefcase,
  Globe,
  MapPin,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";

function Malaysia() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="min-h-screen flex items-center justify-center px-6 py-8">
        <div className="max-w-6xl w-full">

          {/* ---------- Title Section ---------- */}
          <div className="text-center mb-8 mt-[-1rem]">
            <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Where Knowledge Grows and Opportunities Thrive
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience studying, working, and living in one of Asia’s most vibrant, affordable, and diverse nations.
            </p>
          </div>

          {/* ---------- Stats Cards ---------- */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { color: "from-blue-300 to-blue-400", value: "150+", label: "Accredited Universities" },
              { color: "from-green-300 to-green-400", value: "130K+", label: "International Students" },
              { color: "from-orange-300 to-red-400", value: "$399B", label: "GDP Economy" },
              { color: "from-purple-300 to-pink-400", value: "97%", label: "Visa Success Rate" },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl text-white text-center shadow-xl hover:shadow-2xl transition-all hover:scale-105`}
              >
                <div className="text-4xl font-bold mb-1">{item.value}</div>
                <div className="text-sm opacity-90">{item.label}</div>
              </div>
            ))}
          </div>

          {/* ---------- Info Cards (Icons beside Titles) ---------- */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {[
              {
                icon: <GraduationCap className="w-7 h-7 text-blue-600" />,
                bg: "bg-blue-100",
                title: "Quality Education",
                desc: "Globally ranked universities with world-class programs and research facilities",
              },
              {
                icon: <TrendingUp className="w-7 h-7 text-green-600" />,
                bg: "bg-green-100",
                title: "Affordable Cost",
                desc: "Lower tuition and living costs compared to Western countries",
              },
              {
                icon: <Award className="w-7 h-7 text-yellow-600" />,
                bg: "bg-yellow-100",
                title: "Global Recognition",
                desc: "Degrees recognized worldwide by top employers and institutions",
              },
              {
                icon: <Users className="w-7 h-7 text-purple-600" />,
                bg: "bg-purple-100",
                title: "Cultural Diversity",
                desc: "Harmonious blend of Malay, Chinese, Indian and indigenous cultures",
              },
              {
                icon: <Briefcase className="w-7 h-7 text-orange-600" />,
                bg: "bg-orange-100",
                title: "Career Growth",
                desc: "Home to global MNCs in tech, finance, healthcare and more",
              },
              {
                icon: <Globe className="w-7 h-7 text-cyan-600" />,
                bg: "bg-cyan-100",
                title: "English Friendly",
                desc: "English widely spoken across the country for easy communication",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* ---------- About Malaysia ---------- */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-3xl shadow-lg mb-10 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  About Malaysia
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex">
                    <span className="font-semibold w-32">Capital:</span>
                    <span>Kuala Lumpur</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold w-32">Population:</span>
                    <span>34 Million</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold w-32">Language:</span>
                    <span>Malay, English widely spoken</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold w-32">Climate:</span>
                    <span>Tropical, warm year-round</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Economy & Industries
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex">
                    <span className="font-semibold w-32">Growth:</span>
                    <span>~5% annually</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold w-32">Unemployment:</span>
                    <span>3.0%</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold w-32">Top Sectors:</span>
                    <span>Electronics, IT, Oil & Gas, Healthcare</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold w-32">States:</span>
                    <span>13 States & 3 Federal Territories</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Malaysia;

