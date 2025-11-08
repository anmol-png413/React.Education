
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Play,
//   GraduationCap,
//   Globe2,
//   Shield,
//   Users,
//   Globe,
//   Briefcase,
//   DollarSign,
//   BookOpen,
//   School,
//   Building2,
//   Award,
// } from "lucide-react";

// // ------------------ Stats Section Data ------------------
// const stats = [
//   {
//     icon: <GraduationCap className="w-6 h-6" />,
//     value: 150,
//     suffix: "+",
//     label: "Accredited Universities (Public & Private)",
//   },
//   {
//     icon: <Users className="w-6 h-6" />,
//     value: 1.3,
//     suffix: " Million+",
//     label: "Total Students Studying in Malaysia",
//   },
//   {
//     icon: <Globe className="w-6 h-6" />,
//     value: 130000,
//     suffix: "+",
//     label: "International Students from 150+ Countries",
//   },
//   {
//     icon: <Briefcase className="w-6 h-6" />,
//     value: 2,
//     suffix: " Years",
//     label: "Post-Study Work Visa for Graduates",
//   },
//   {
//     icon: <DollarSign className="w-6 h-6" />,
//     value: 70,
//     suffix: "%",
//     prefix: "Up to ",
//     label: "Lower Tuition Cost than UK/USA",
//   },
// ];

// // ------------------ Counter Animation ------------------
// function Counter({ value, suffix, prefix = "" }) {
//   const [count, setCount] = useState(0);
//   const [hasAnimated, setHasAnimated] = useState(false);
//   const counterRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && !hasAnimated) {
//             setHasAnimated(true);
//             const duration = 2000;
//             const steps = 60;
//             const increment = value / steps;
//             let current = 0;

//             const timer = setInterval(() => {
//               current += increment;
//               if (current >= value) {
//                 setCount(value);
//                 clearInterval(timer);
//               } else {
//                 setCount(current);
//               }
//             }, duration / steps);

//             return () => clearInterval(timer);
//           }
//         });
//       },
//       { threshold: 0.3 }
//     );

//     if (counterRef.current) {
//       observer.observe(counterRef.current);
//     }

//     return () => observer.disconnect();
//   }, [value, hasAnimated]);

//   const formatNumber = (num) => {
//     if (value >= 1000 && value < 1000000) {
//       return Math.floor(num).toLocaleString();
//     }
//     if (value < 10) {
//       return num.toFixed(1);
//     }
//     return Math.floor(num).toString();
//   };

//   return (
//     <div ref={counterRef} className="text-2xl md:text-3xl font-bold text-[#003893]">
//       {prefix}
//       {formatNumber(count)}
//       {suffix}
//     </div>
//   );
// }

// // ------------------ Education System Section ------------------
// const EducationSystem = () => {
//   const stages = [
//     {
//       title: "Early Education",
//       icon: BookOpen,
//       color: "from-amber-400 to-orange-500",
//       items: ["Government", "Private", "Special Needs", "Assistance"],
//     },
//     {
//       title: "Primary Education",
//       icon: School,
//       color: "from-rose-500 to-pink-600",
//       items: [
//         "Government",
//         "Religious",
//         "Private",
//         "Special Needs",
//         "Examinations & Assessments",
//         "School Transfer",
//         "Assistance",
//       ],
//     },
//     {
//       title: "Secondary Education",
//       icon: Building2,
//       color: "from-purple-500 to-violet-600",
//       items: [
//         "Government",
//         "Vocational College",
//         "Private",
//         "Special Needs",
//         "Examinations & Assessments",
//         "Assistance",
//       ],
//     },
//     {
//       title: "Post Secondary",
//       icon: Award,
//       color: "from-blue-500 to-indigo-600",
//       items: ["Form 6", "Matriculation", "Examinations", "Assistance"],
//     },
//     {
//       title: "Higher Education",
//       icon: GraduationCap,
//       color: "from-cyan-500 to-blue-600",
//       sections: [
//         {
//           title: "Citizen",
//           items: [
//             "Local IPTA",
//             "Local IPTS",
//             "Study Abroad",
//             "Accreditation",
//             "Assistance",
//           ],
//         },
//         {
//           title: "Non-Citizen",
//           items: ["IPTA", "IPTS", "Scholarship"],
//         },
//       ],
//     },
//   ];

//   return (
//     <div className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
//             Education System in Malaysia
//           </h1>
//           <p className="text-slate-600 text-lg max-w-4xl mx-auto leading-relaxed">
//           Malaysia’s formal education system offers inclusive and high-quality learning from early childhood to higher education, ensuring that both citizens and non-citizens have equal access and flexible learning opportunities.
//           </p>
//         </div>

//         <div className="text-center mb-8">
//           <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
//             Getting Formal Education
//           </h2>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-4 mb-8">
//           {stages.map((stage) => {
//             const Icon = stage.icon;
//             const isHigherEd = stage.title === "Higher Education";

//             return (
//               <div
//                 key={stage.title}
//                 className={`flex-1 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
//                   isHigherEd ? "lg:flex-[1.5]" : ""
//                 }`}
//               >
//                 <div
//                   className={`bg-gradient-to-br ${stage.color} p-6 text-white`}
//                 >
//                   <div className="flex items-center gap-3 mb-2">
//                     <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
//                       <Icon className="w-6 h-6" />
//                     </div>
//                     <h2 className="text-xl font-bold">{stage.title}</h2>
//                   </div>
//                 </div>

//                 <div className="bg-white p-6">
//                   {!isHigherEd ? (
//                     <ul className="space-y-2.5">
//                       {stage.items?.map((item, idx) => (
//                         <li
//                           key={idx}
//                           className="flex items-start gap-2 text-slate-700 group"
//                         >
//                           <span className="text-slate-400 mt-1 group-hover:text-slate-600 transition-colors">
//                             •
//                           </span>
//                           <span className="group-hover:text-slate-900 transition-colors">
//                             {item}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <div className="space-y-6">
//                       {stage.sections?.map((section, idx) => (
//                         <div key={idx}>
//                           <h3 className="font-semibold text-slate-900 mb-3 pb-2 border-b-2 border-slate-200">
//                             {section.title}
//                           </h3>
//                           <ul className="space-y-2.5">
//                             {section.items.map((item, itemIdx) => (
//                               <li
//                                 key={itemIdx}
//                                 className="flex items-start gap-2 text-slate-700 group"
//                               >
//                                 <span className="text-slate-400 mt-1 group-hover:text-slate-600 transition-colors">
//                                   •
//                                 </span>
//                                 <span className="group-hover:text-slate-900 transition-colors">
//                                   {item}
//                                 </span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

  
//       </div>
//     </div>
//   );
// };

// // ------------------ Main Section ------------------
// const WhyMalaysia = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
//       {/* ---- Top Why Choose Section ---- */}
//       <section className="container mx-auto px-6 py-12 lg:py-16">
//         <div className="text-center mb-10">
//           <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent mb-4">
//             Why Choose Malaysia?
//           </h2>
//           <p className="text-xl text-slate-600 max-w-2xl mx-auto">
//             Your gateway to world-class education in the heart of Asia
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
//           {/* Left Section (Images + Video) */}
//           <div className="space-y-6">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[4/5] group">
//                 <img
//                   src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg"
//                   alt="International students studying together"
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//               </div>

//               <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[4/5] group mt-8">
//                 <img
//                   src="https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg"
//                   alt="Kuala Lumpur Petronas Towers skyline"
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//               </div>

//               <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-video col-span-2 group">
//                 <img
//                   src="https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg"
//                   alt="Diverse cultural activities and campus life"
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//               </div>
//             </div>

//             {/* Video Section */}
//             <div className="relative bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl shadow-2xl overflow-hidden group cursor-pointer hover:shadow-blue-500/20 hover:shadow-3xl transition-all duration-500">
//               <div className="aspect-video relative">
//                 <img
//                   src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
//                   alt="Study in Malaysia video introduction"
//                   className="w-full h-full object-cover opacity-80"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900/60 backdrop-blur-[1px]" />
//                 <div className="absolute inset-0 flex flex-col items-center justify-center">
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
//                     <div className="relative bg-white rounded-full p-5 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300 shadow-2xl">
//                       <Play
//                         className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors"
//                         fill="currentColor"
//                       />
//                     </div>
//                   </div>
//                   <div className="mt-6 text-center">
//                     <p className="text-white/90 text-sm font-semibold tracking-widest mb-2">
//                       WATCH NOW
//                     </p>
//                     <p className="text-white text-2xl font-bold drop-shadow-lg">
//                       Discover Malaysia in 45 Seconds
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Section (Cards) */}
//           <div className="space-y-5">
//             {/* Card 1 */}
//             <div className="bg-white/80 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 hover:border-blue-300 group">
//               <div className="flex items-start space-x-5">
//                 <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 shadow-lg">
//                   <GraduationCap className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600">
//                     High-Quality Education with Affordable Cost
//                   </h3>
//                   <p className="text-slate-600 text-lg">
//                     Experience world-class education at a fraction of the cost.
//                     Malaysian universities offer internationally recognized
//                     degrees with tuition fees up to 70% lower than Western
//                     countries.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Card 2 */}
//             <div className="bg-white/80 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 hover:border-emerald-300 group">
//               <div className="flex items-start space-x-5">
//                 <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 shadow-lg">
//                   <Globe2 className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600">
//                     Multicultural Student Environment
//                   </h3>
//                   <p className="text-slate-600 text-lg">
//                     Join a vibrant community of students from over 160
//                     countries. Experience diverse cultures, forge global
//                     friendships, and build an international network that lasts a
//                     lifetime.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             {/* crd 4  */}

//                 <div className="bg-white/80 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 hover:border-blue-300 group">
//               <div className="flex items-start space-x-5">
//                 <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 shadow-lg">
//                   <GraduationCap className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600">
//             Affordable Access to Quality Learning
//                   </h3>
//                   <p className="text-slate-600 text-lg">
//                   Study in Malaysia, where quality meets affordability.
// Earn a globally valued degree while enjoying tuition fees that are significantly lower than those in Western countries.Malaysian universities provide internationally accredited degrees with tuition fees up to 70% lower than those in Western nations.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Card 3 */}
//             <div className="bg-white/80 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 hover:border-amber-300 group">
//               <div className="flex items-start space-x-5">
//                 <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-4 shadow-lg">
//                   <Shield className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-amber-600">
//                     Safe, Modern, and English-Speaking Country
//                   </h3>
//                   <p className="text-slate-600 text-lg">
//                     Study in one of Asia's safest countries with modern
//                     infrastructure. English is widely spoken, making your
//                     transition smooth and helping you focus on what matters
//                     most — your education.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ---- Stats Section ---- */}
//       <section className="relative py-16 px-4 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-amber-50 opacity-60"></div>
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="text-center mb-10">
//             <h2 className="text-4xl font-bold text-[#003893] mb-3">
//             Gateway to World-Class Education in Malaysia
//             </h2>
//             <p className="text-lg text-gray-600">
//          Learn in a nation known for academic innovation.
//             </p>
//             <div className="w-24 h-1 bg-gradient-to-r from-[#003893] to-[#D4AF37] mx-auto mt-4 rounded-full"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className="group relative bg-white/70 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 hover:scale-105"
//               >
//                 <div className="flex justify-center mb-2">
//                   <div className="p-2 bg-gradient-to-br from-[#003893] to-[#0052CC] rounded-lg text-white group-hover:scale-110 transition-transform duration-300 shadow-md">
//                     {stat.icon}
//                   </div>
//                 </div>

//                 <div className="text-center mb-2">
//                   <Counter
//                     value={stat.value}
//                     suffix={stat.suffix}
//                     prefix={stat.prefix}
//                   />
//                 </div>

//                 <p className="text-xs text-gray-600 text-center leading-snug">
//                   {stat.label}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ---- Education System Section ---- */}
//       <EducationSystem />
//     </div>
//   );
// };

// export default WhyMalaysia;







import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  GraduationCap,
  Globe2,
  Shield,
  Users,
  Globe,
  Briefcase,
  DollarSign,
  BookOpen,
  School,
  Building2,
  Award,
} from "lucide-react";

const stats = [
  {
    icon: <GraduationCap className="w-6 h-6" />,
    value: 150,
    suffix: "+",
    label: "Accredited Universities (Public & Private)",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: 1.3,
    suffix: " Million+",
    label: "Total Students Studying in Malaysia",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    value: 130000,
    suffix: "+",
    label: "International Students from 150+ Countries",
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    value: 2,
    suffix: " Years",
    label: "Post-Study Work Visa for Graduates",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    value: 70,
    suffix: "%",
    prefix: "Up to ",
    label: "Lower Tuition Cost than UK/USA",
  },
];

function Counter({ value, suffix, prefix = "" }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= value) {
                setCount(value);
                clearInterval(timer);
              } else {
                setCount(current);
              }
            }, duration / steps);

            return () => clearInterval(timer);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const formatNumber = (num) => {
    if (value >= 1000 && value < 1000000) return Math.floor(num).toLocaleString();
    if (value < 10) return num.toFixed(1);
    return Math.floor(num).toString();
  };

  return (
    <div ref={counterRef} className="text-2xl md:text-3xl font-bold text-[#003893]">
      {prefix}
      {formatNumber(count)}
      {suffix}
    </div>
  );
}

const EducationSystem = () => {
  const stages = [
    {
      title: "Early Education",
      icon: BookOpen,
      color: "from-amber-400 to-orange-500",
      items: ["Government", "Private", "Special Needs", "Assistance"],
    },
    {
      title: "Primary Education",
      icon: School,
      color: "from-rose-500 to-pink-600",
      items: [
        "Government",
        "Religious",
        "Private",
        "Special Needs",
        "Examinations & Assessments",
        "School Transfer",
        "Assistance",
      ],
    },
    {
      title: "Secondary Education",
      icon: Building2,
      color: "from-purple-500 to-violet-600",
      items: [
        "Government",
        "Vocational College",
        "Private",
        "Special Needs",
        "Examinations & Assessments",
        "Assistance",
      ],
    },
    {
      title: "Post Secondary",
      icon: Award,
      color: "from-blue-500 to-indigo-600",
      items: ["Form 6", "Matriculation", "Examinations", "Assistance"],
    },
    {
      title: "Higher Education",
      icon: GraduationCap,
      color: "from-cyan-500 to-blue-600",
      sections: [
        {
          title: "Citizen",
          items: ["Local IPTA", "Local IPTS", "Study Abroad", "Accreditation", "Assistance"],
        },
        {
          title: "Non-Citizen",
          items: ["IPTA", "IPTS", "Scholarship"],
        },
      ],
    },
  ];

  return (
    <div className="py-14 md:py-16 bg-gradient-to-br from-slate-50 to-slate-100 mt-[-1rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            Education System in Malaysia
          </h1>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Malaysia’s formal education system offers inclusive and high-quality learning from early childhood to higher education, ensuring that both citizens and non-citizens have equal access and flexible learning opportunities.
          </p>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
            Getting Formal Education
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isHigherEd = stage.title === "Higher Education";
            return (
              <div
                key={stage.title}
                className={`flex-1 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isHigherEd ? "lg:flex-[1.5]" : ""}`}
              >
                <div className={`bg-gradient-to-br ${stage.color} p-5 text-white`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-lg font-bold">{stage.title}</h2>
                  </div>
                </div>

                <div className="bg-white p-5">
                  {!isHigherEd ? (
                    <ul className="space-y-2">
                      {stage.items?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-700 group">
                          <span className="text-slate-400 mt-1 group-hover:text-slate-600 transition-colors">•</span>
                          <span className="group-hover:text-slate-900 transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-5">
                      {stage.sections?.map((section, idx) => (
                        <div key={idx}>
                          <h3 className="font-semibold text-slate-900 mb-2 pb-1 border-b border-slate-200">
                            {section.title}
                          </h3>
                          <ul className="space-y-2">
                            {section.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2 text-slate-700 group">
                                <span className="text-slate-400 mt-1 group-hover:text-slate-600 transition-colors">•</span>
                                <span className="group-hover:text-slate-900 transition-colors">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const WhyMalaysia = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Main Section */}
      <section className="container mx-auto px-6 py-8 lg:py-10">
        <div className="text-center mb-10">
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent mb-3">
            Why Choose Malaysia?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Your gateway to world-class education in the heart of Asia
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
          {/* Image + Video Grid */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-[4/5] group">
                <img
                  src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg"
                  alt="International students studying together"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-[4/5] group mt-6">
                <img
                  src="https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg"
                  alt="Kuala Lumpur Petronas Towers skyline"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-video col-span-2 group">
                <img
                  src="https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg"
                  alt="Diverse cultural activities and campus life"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Video Box */}
            <div className="relative bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl shadow-2xl overflow-hidden group cursor-pointer hover:shadow-blue-500/20 transition-all duration-500">
              <div className="aspect-video relative">
                <img
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                  alt="Study in Malaysia video introduction"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative bg-white rounded-full p-5 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300 shadow-lg">
                      <Play className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors" fill="currentColor" />
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <p className="text-white/90 text-sm font-semibold tracking-widest mb-1">WATCH NOW</p>
                    <p className="text-white text-xl font-bold drop-shadow-lg">
                      Discover Malaysia in 45 Seconds
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="space-y-5">
            {[
              {
                icon: <GraduationCap className="w-8 h-8 text-white" />,
                color: "from-blue-500 to-blue-600",
                title: "High-Quality Education with Affordable Cost",
                desc: "Experience world-class education at a fraction of the cost. Malaysian universities offer internationally recognized degrees with tuition fees up to 70% lower than Western countries.",
              },
              {
                icon: <Globe2 className="w-8 h-8 text-white" />,
                color: "from-emerald-500 to-emerald-600",
                title: "Multicultural Student Environment",
                desc: "Join a vibrant community of students from over 160 countries. Experience diverse cultures and build an international network that lasts a lifetime.",
              },
              {
                icon: <GraduationCap className="w-8 h-8 text-white" />,
                color: "from-blue-500 to-blue-600",
                title: "Affordable Access to Quality Learning",
                desc: "Study in Malaysia, where quality meets affordability. Earn a globally valued degree while enjoying tuition fees that are significantly lower than Western countries.",
              },
              {
                icon: <Shield className="w-8 h-8 text-white" />,
                color: "from-amber-500 to-amber-600",
                title: "Safe, Modern, and English-Speaking Country",
                desc: "Study in one of Asia's safest countries with modern infrastructure. English is widely spoken, making your transition smooth and helping you focus on your education.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/80 rounded-3xl p-7 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200 group"
              >
                <div className="flex items-start space-x-5">
                  <div
                    className={`bg-gradient-to-br ${item.color} rounded-2xl p-4 shadow-md`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-8 lg:py-10 px-4 overflow-hidden mt-[-1.5rem]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-amber-50 opacity-70"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003893] mb-2">
              Gateway to World-Class Education in Malaysia
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Learn in a nation known for academic innovation.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#003893] to-[#D4AF37] mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-white/80 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-white/30 hover:scale-105"
              >
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-gradient-to-br from-[#003893] to-[#0052CC] rounded-lg text-white group-hover:scale-110 transition-transform duration-300 shadow-md">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-center mb-1">
                  <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <p className="text-xs text-gray-600 text-center leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education System Section */}
      <EducationSystem />
    </div>
  );
};

export default WhyMalaysia;
