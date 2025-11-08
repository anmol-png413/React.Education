// // import { GraduationCap, FileCheck, Plane, Compass, Sparkles } from 'lucide-react';
// // import { useState } from 'react';

// // interface JourneyStep {
// //   id: number;
// //   title: string;
// //   subtitle: string;
// //   icon: React.ReactNode;
// //   path: string;
// //   color: string;
// // }

// // const journeySteps: JourneyStep[] = [
// //   {
// //     id: 1,
// //     title: 'Choose Course',
// //     subtitle: 'Find your passion',
// //     icon: <GraduationCap className="w-8 h-8" />,
// //     path: '/courses',
// //     color: 'from-blue-500 to-cyan-500'
// //   },
// //   {
// //     id: 2,
// //     title: 'Get Admission',
// //     subtitle: 'Apply & secure your spot',
// //     icon: <FileCheck className="w-8 h-8" />,
// //     path: '/admission',
// //     color: 'from-cyan-500 to-teal-500'
// //   },
// //   {
// //     id: 3,
// //     title: 'Visa Process',
// //     subtitle: 'We guide you through',
// //     icon: <Compass className="w-8 h-8" />,
// //     path: '/visa',
// //     color: 'from-teal-500 to-emerald-500'
// //   },
// //   {
// //     id: 4,
// //     title: 'Fly to Malaysia',
// //     subtitle: 'Your journey begins',
// //     icon: <Plane className="w-8 h-8" />,
// //     path: '/travel',
// //     color: 'from-emerald-500 to-green-500'
// //   },
// //   {
// //     id: 5,
// //     title: 'Begin Your Future',
// //     subtitle: 'Success awaits',
// //     icon: <Sparkles className="w-8 h-8" />,
// //     path: '/start',
// //     color: 'from-green-500 to-lime-500'
// //   }
// // ];

// // export default function StudyJourney() {
// //   const [hoveredStep, setHoveredStep] = useState<number | null>(null);

// //   const handleStepClick = (path: string) => {
// //     console.log(`Navigate to: ${path}`);
// //   };

// //   return (
// //     <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="text-center mb-12">
// //           <h2 className="text-4xl font-bold text-slate-800 mb-3">
// //             Your Study Journey in Malaysia
// //           </h2>
// //           <p className="text-slate-600 text-lg">
// //             Five simple steps to transform your educational dreams into reality
// //           </p>
// //         </div>

// //         <div className="relative">
// //           <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 rounded-full"
// //                style={{ width: 'calc(100% - 8rem)', marginLeft: '4rem' }} />

// //           <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative">
// //             {journeySteps.map((step, index) => (
// //               <div
// //                 key={step.id}
// //                 className="flex flex-col items-center"
// //                 onMouseEnter={() => setHoveredStep(step.id)}
// //                 onMouseLeave={() => setHoveredStep(null)}
// //               >
// //                 <button
// //                   onClick={() => handleStepClick(step.path)}
// //                   className="group relative mb-4 transition-all duration-300 ease-out"
// //                   aria-label={`Go to ${step.title}`}
// //                 >
// //                   <div
// //                     className={`
// //                       relative z-10 w-20 h-20 rounded-full bg-gradient-to-br ${step.color}
// //                       flex items-center justify-center text-white shadow-lg
// //                       transform transition-all duration-300 ease-out
// //                       ${hoveredStep === step.id ? 'scale-125 shadow-2xl' : 'scale-100'}
// //                       group-hover:scale-125 group-hover:shadow-2xl
// //                     `}
// //                   >
// //                     {step.icon}
// //                   </div>

// //                   <div
// //                     className={`
// //                       absolute inset-0 rounded-full bg-gradient-to-br ${step.color}
// //                       opacity-0 blur-xl transition-opacity duration-300
// //                       ${hoveredStep === step.id ? 'opacity-40' : ''}
// //                       group-hover:opacity-40
// //                     `}
// //                   />

// //                   <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-slate-200 font-bold text-slate-700 text-sm z-20">
// //                     {step.id}
// //                   </div>
// //                 </button>

// //                 <div className="text-center">
// //                   <h3 className={`
// //                     font-bold text-lg mb-1 transition-all duration-300
// //                     ${hoveredStep === step.id ? 'text-slate-900 scale-105' : 'text-slate-800'}
// //                   `}>
// //                     {step.title}
// //                   </h3>
// //                   <p className="text-slate-600 text-sm">
// //                     {step.subtitle}
// //                   </p>
// //                 </div>

// //                 {index < journeySteps.length - 1 && (
// //                   <div className="md:hidden w-px h-12 bg-gradient-to-b from-slate-300 to-transparent mx-auto my-4" />
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="text-center mt-12">
// //           <button
// //             onClick={() => handleStepClick('/get-started')}
// //             className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
// //           >
// //             <Sparkles className="w-5 h-5" />
// //             Start Your Journey Today
// //           </button>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }


// import React, { useState } from "react";
// import {
//   GraduationCap,
//   FileCheck,
//   Plane,
//   Compass,
//   Sparkles,
// } from "lucide-react";

// // ✅ formatHTML utility function
// const formatHTML = (html) => {
//   if (!html) return "";

//   const textarea = document.createElement("textarea");
//   textarea.innerHTML = html;
//   let decoded = textarea.value;

//   // --- Clean HTML ---
//   decoded = decoded.replace(/<span[^>]*>/gi, "");
//   decoded = decoded.replace(/<\/span>/gi, "");
//   decoded = decoded.replace(/style="[^"]*"/gi, "");
//   decoded = decoded.replace(/&nbsp;/gi, " ");

//   // Headings formatting
//   decoded = decoded.replace(
//     /<h([1-3])(.*?)>([^<]*?)<\/h\1>/gi,
//     (_m, level, _a, content) => {
//       if (level === "1") {
//         return `<h1 class="text-2xl md:text-3xl font-bold text-gray-800 pb-2 mt-8 mb-4">${content.trim()}</h1>`;
//       } else if (level === "2") {
//         return `<h2 class="text-xl md:text-2xl font-bold text-gray-800 pb-2 mt-6 mb-3">${content.trim()}</h2>`;
//       }
//       return `<h3 class="text-lg md:text-xl font-bold text-gray-800 mt-5 mb-2">${content.trim()}</h3>`;
//     }
//   );

//   decoded = decoded.replace(/<p>\s*:\s*/gi, "<p>");
//   decoded = decoded.replace(
//     /<strong>(.*?)<\/strong>/gi,
//     `<h4 class="text-lg font-semibold mb-2 mt-4 text-gray-700">$1</h4>`
//   );
//   decoded = decoded.replace(
//     /<b>(.*?)<\/b>/gi,
//     `<h4 class="text-lg font-semibold mb-2 mt-4 text-gray-700">$1</h4>`
//   );

//   // Paragraph styling
//   decoded = decoded.replace(
//     /<p>/g,
//     '<p class="text-gray-700 leading-relaxed mb-4">'
//   );

//   // ✅ TABLE STYLING
//   decoded = decoded.replace(
//     /<table(.*?)>/g,
//     `<div class="overflow-x-auto rounded-2xl shadow-lg my-8"><table class="w-full border-collapse bg-white" $1>`
//   );
//   decoded = decoded.replace(/<\/table>/g, "</table></div>");
//   decoded = decoded.replace(/<thead>/g, '<thead class="bg-blue-600">');
//   decoded = decoded.replace(/<th[^>]*style="[^"]*"[^>]*>/gi, (m) =>
//     m.replace(/style="[^"]*"/gi, "")
//   );
//   decoded = decoded.replace(/<th[^>]*>/g, '<th class="px-6 py-4 text-white font-bold text-base uppercase">');
//   decoded = decoded.replace(/<tbody>/g, '<tbody class="divide-y divide-gray-100">');
//   decoded = decoded.replace(/<tr/g, '<tr class="hover:bg-gray-50 transition-colors"');
//   decoded = decoded.replace(/<td>/g, '<td class="px-6 py-5 text-gray-800 text-base">');

//   // Serial numbers (blue circle)
//   decoded = decoded.replace(
//     /<td class="px-6 py-5 text-gray-800 text-base">(\d+)<\/td>/g,
//     '<td class="px-6 py-5"><span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-base">$1</span></td>'
//   );

//   // Year column (orange text)
//   decoded = decoded.replace(
//     /<td class="px-6 py-5 text-gray-800 text-base">(19\d{2}|20\d{2})<\/td>/g,
//     '<td class="px-6 py-5 text-orange-600 font-semibold text-base">$1</td>'
//   );

//   // Location with icon
//   decoded = decoded.replace(
//     /<td class="px-6 py-5 text-gray-800 text-base">([^<]*(?:\/[^<]*)*)<\/td>/g,
//     (match, location) => {
//       if (
//         location.includes("/") ||
//         /Kuala|Selangor|Johor|Penang|Melaka|Putrajaya|Cyberjaya|Pahang/i.test(location)
//       ) {
//         return `<td class="px-6 py-5"><span class="inline-flex items-center gap-2 text-gray-700"><svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg><span>${location}</span></span></td>`;
//       }
//       return match;
//     }
//   );

//   // Checkbox, list styling
//   decoded = decoded.replace(
//     /<input[^>]*type=["']checkbox["'][^>]*>/gi,
//     `<span class="inline-block w-4 h-4 rounded border border-gray-400 mr-2 bg-white"></span>`
//   );
//   decoded = decoded.replace(
//     /<ul>/g,
//     '<ul class="list-disc pl-6 space-y-2 text-gray-800">'
//   );
//   decoded = decoded.replace(
//     /<ol>/g,
//     '<ol class="list-decimal pl-6 space-y-2 text-gray-800">'
//   );
//   decoded = decoded.replace(/<li>/g, '<li class="mb-1">');

//   return decoded;
// };

// // ✅ Data for journey steps
// const journeySteps = [
//   {
//     id: 1,
//     title: "Choose Course",
//     subtitle: "Find your passion",
//     icon: <GraduationCap className="w-8 h-8" />,
//     path: "/courses",
//     color: "from-blue-500 to-cyan-500",
//   },
//   {
//     id: 2,
//     title: "Get Admission",
//     subtitle: "Apply & secure your spot",
//     icon: <FileCheck className="w-8 h-8" />,
//     path: "/admission",
//     color: "from-cyan-500 to-teal-500",
//   },
//   {
//     id: 3,
//     title: "Visa Process",
//     subtitle: "We guide you through",
//     icon: <Compass className="w-8 h-8" />,
//     path: "/visa",
//     color: "from-teal-500 to-emerald-500",
//   },
//   {
//     id: 4,
//     title: "Fly to Malaysia",
//     subtitle: "Your journey begins",
//     icon: <Plane className="w-8 h-8" />,
//     path: "/travel",
//     color: "from-emerald-500 to-green-500",
//   },
//   {
//     id: 5,
//     title: "Begin Your Future",
//     subtitle: "Success awaits",
//     icon: <Sparkles className="w-8 h-8" />,
//     path: "/start",
//     color: "from-green-500 to-lime-500",
//   },
// ];

// // ✅ Main React Component
// export default function StudyJourney() {
//   const [hoveredStep, setHoveredStep] = useState(null);

//   const handleStepClick = (path) => {
//     console.log(`Navigate to: ${path}`);
//   };

//   return (
//     <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Heading Section */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-slate-800 mb-3">
//             Your Study Journey in Malaysia
//           </h2>
//           <p className="text-slate-600 text-lg">
//             Five simple steps to transform your educational dreams into reality
//           </p>
//         </div>

//         {/* Timeline Section */}
//         <div className="relative">
//           <div
//             className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 rounded-full"
//             style={{ width: "calc(100% - 8rem)", marginLeft: "4rem" }}
//           />

//           <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative">
//             {journeySteps.map((step, index) => (
//               <div
//                 key={step.id}
//                 className="flex flex-col items-center"
//                 onMouseEnter={() => setHoveredStep(step.id)}
//                 onMouseLeave={() => setHoveredStep(null)}
//               >
//                 {/* Circle Button */}
//                 <button
//                   onClick={() => handleStepClick(step.path)}
//                   className="group relative mb-4 transition-all duration-300 ease-out"
//                   aria-label={`Go to ${step.title}`}
//                 >
//                   <div
//                     className={`relative z-10 w-20 h-20 rounded-full bg-gradient-to-br ${step.color}
//                       flex items-center justify-center text-white shadow-lg
//                       transform transition-all duration-300 ease-out
//                       ${hoveredStep === step.id ? "scale-125 shadow-2xl" : "scale-100"}
//                       group-hover:scale-125 group-hover:shadow-2xl`}
//                   >
//                     {step.icon}
//                   </div>

//                   <div
//                     className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color}
//                       opacity-0 blur-xl transition-opacity duration-300
//                       ${hoveredStep === step.id ? "opacity-40" : ""}
//                       group-hover:opacity-40`}
//                   />

//                   <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-slate-200 font-bold text-slate-700 text-sm z-20">
//                     {step.id}
//                   </div>
//                 </button>

//                 {/* Labels */}
//                 <div className="text-center">
//                   <h3
//                     className={`font-bold text-lg mb-1 transition-all duration-300 ${
//                       hoveredStep === step.id
//                         ? "text-slate-900 scale-105"
//                         : "text-slate-800"
//                     }`}
//                   >
//                     {step.title}
//                   </h3>
//                   <p className="text-slate-600 text-sm">{step.subtitle}</p>
//                 </div>

//                 {/* Connector for mobile */}
//                 {index < journeySteps.length - 1 && (
//                   <div className="md:hidden w-px h-12 bg-gradient-to-b from-slate-300 to-transparent mx-auto my-4" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* CTA Button */}
//         <div className="text-center mt-12">
//           <button
//             onClick={() => handleStepClick("/get-started")}
//             className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
//           >
//             <Sparkles className="w-5 h-5" />
//             Start Your Journey Today
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }


import { GraduationCap, FileCheck, Plane, Compass, Sparkles } from 'lucide-react';
import { useState } from 'react';

const journeySteps = [
  {
    id: 1,
    title: 'Choose Course',
    subtitle: 'Find your passion',
    icon: <GraduationCap className="w-8 h-8" />,
    path: '/courses',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'Get Admission',
    subtitle: 'Apply & secure your spot',
    icon: <FileCheck className="w-8 h-8" />,
    path: '/admission',
    color: 'from-cyan-500 to-teal-500'
  },
  {
    id: 3,
    title: 'Visa Process',
    subtitle: 'We guide you through',
    icon: <Compass className="w-8 h-8" />,
    path: '/visa',
    color: 'from-teal-500 to-emerald-500'
  },
  {
    id: 4,
    title: 'Fly to Malaysia',
    subtitle: 'Your journey begins',
    icon: <Plane className="w-8 h-8" />,
    path: '/travel',
    color: 'from-emerald-500 to-green-500'
  },
  {
    id: 5,
    title: 'Begin Your Future',
    subtitle: 'Success awaits',
    icon: <Sparkles className="w-8 h-8" />,
    path: '/start',
    color: 'from-green-500 to-lime-500'
  }
];

export default function StudyJourney() {
  const [hoveredStep, setHoveredStep] = useState(null);

  const handleStepClick = (path) => {
    console.log(`Navigate to: ${path}`);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-3">
            Your Study Journey in Malaysia
          </h2>
          <p className="text-slate-600 text-lg">
            Five simple steps to transform your educational dreams into reality
          </p>
        </div>

        <div className="relative">
          <div
            className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 rounded-full"
            style={{ width: 'calc(100% - 8rem)', marginLeft: '4rem' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative">
            {journeySteps.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col items-center"
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <button
                  onClick={() => handleStepClick(step.path)}
                  className="group relative mb-4 transition-all duration-300 ease-out"
                  aria-label={`Go to ${step.title}`}
                >
                  <div
                    className={`
                      relative z-10 w-20 h-20 rounded-full bg-gradient-to-br ${step.color}
                      flex items-center justify-center text-white shadow-lg
                      transform transition-all duration-300 ease-out
                      ${hoveredStep === step.id ? 'scale-125 shadow-2xl' : 'scale-100'}
                      group-hover:scale-125 group-hover:shadow-2xl
                    `}
                  >
                    {step.icon}
                  </div>

                  <div
                    className={`
                      absolute inset-0 rounded-full bg-gradient-to-br ${step.color}
                      opacity-0 blur-xl transition-opacity duration-300
                      ${hoveredStep === step.id ? 'opacity-40' : ''}
                      group-hover:opacity-40
                    `}
                  />

                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-slate-200 font-bold text-slate-700 text-sm z-20">
                    {step.id}
                  </div>
                </button>

                <div className="text-center">
                  <h3
                    className={`
                    font-bold text-lg mb-1 transition-all duration-300
                    ${hoveredStep === step.id ? 'text-slate-900 scale-105' : 'text-slate-800'}
                  `}
                  >
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{step.subtitle}</p>
                </div>

                {index < journeySteps.length - 1 && (
                  <div className="md:hidden w-px h-12 bg-gradient-to-b from-slate-300 to-transparent mx-auto my-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => handleStepClick('/get-started')}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
}
