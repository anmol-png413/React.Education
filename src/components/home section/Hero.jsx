

// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, EffectFade } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import api from "../../api";

// const Hero = () => {
//   const images = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg", "/banner4.jpg", "/banner5.jpg"];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   const fetchseoData = async () => {
//     try {
//       const res = await api.get("/home");
//       const data = res.data?.data;
//       console.log(res.data?.data?.seo);
//     } catch (error) {
//       console.error("Error fetching universities:", error);
//     }
//   };
//   fetchseoData();

//   return (
//     <section className="relative w-full h-screen overflow-hidden">
//       {/* Swiper Background Slider */}
//       <div className="absolute inset-0 z-0">
//         <Swiper
//           modules={[Navigation, Pagination, EffectFade]}
//           effect="fade"
//           navigation
//           pagination={{ clickable: true }}
//           loop
//           className="w-full h-full"
//         >
//           {images.map((img, i) => (
//             <SwiperSlide key={i}>
//               <img
//                 src={img}
//                 alt={`slide-${i}`}
//                 className="w-full h-full object-cover"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-blue-900/60 z-10 pointer-events-none" />

//       {/* Content */}
//       <div className="relative z-20 flex items-center h-full px-6 md:px-20 pointer-events-none">
//         <motion.div
//           className="text-white max-w-3xl"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.p
//             variants={itemVariants}
//             className="text-sm md:text-base text-blue-400 tracking-widest font-semibold uppercase mb-3 md:mb-4"
//           >
//         Study in Malaysia
//           </motion.p>

//           <motion.h1
//             variants={itemVariants}
//             className="text-4xl md:text-6xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6"
//           >
//             <span className="block"> Explore Top Universities</span>
//             <span className="block mt-2 bg-gradient-to-r from-sky-300 via-blue-400 to-sky-300 bg-clip-text text-transparent">
//     In-Demand Courses & Global Career Pathways     </span>
//           </motion.h1>

//           <motion.p
//             variants={itemVariants}
//             className="text-base md:text-lg text-gray-100 max-w-2xl mb-8 md:mb-10 leading-relaxed"
//           >
//           Begin your study journey in Malaysia with expert guidance for admissions, course selection, and fast-track visa processing.
//           </motion.p>

//           <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pointer-events-auto">
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Link to="/who-we-are">
//                 <button className=" cursor-pointer bg-blue-400 hover:bg-blue-500 text-black font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center gap-2">
//                   ABOUT US
//                 </button>
//               </Link>
//             </motion.div>

//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Link to="/courses-in-malaysias">
//                 <button className=" cursor-pointer bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 backdrop-blur-sm flex items-center gap-2">
//                   KNOW MORE
//                 </button>
//               </Link>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Custom CSS for Swiper Controls */}
//     {/* Custom CSS for Swiper Controls */}
// <style jsx>{`
//   :global(.swiper-button-prev),
//   :global(.swiper-button-next) {
//     background: white !important;
//     width: 50px !important;
//     height: 50px !important;
//     border-radius: 50% !important;
//     z-index: 30 !important;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
//     transition: all 0.3s ease !important;
//   }

//   :global(.swiper-button-prev:hover),
//   :global(.swiper-button-next:hover) {
//     background: #3b82f6 !important;
//     transform: scale(1.1) !important;
//     box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5) !important;
//   }

//   :global(.swiper-button-prev::after),
//   :global(.swiper-button-next::after) {
//     font-size: 22px !important;
//     font-weight: bold !important;
//     color: #1f2937 !important;
//   }

//   :global(.swiper-button-prev:hover::after),
//   :global(.swiper-button-next:hover::after) {
//     color: white !important;
//   }

//   :global(.swiper-pagination) {
//     bottom: 30px !important;
//     z-index: 30 !important;
//   }

//   :global(.swiper-pagination-bullet) {
//     width: 12px !important;
//     height: 12px !important;
//     background: white !important;
//     opacity: 0.6 !important;
//     transition: all 0.3s ease !important;
//   }

//   :global(.swiper-pagination-bullet:hover) {
//     opacity: 0.8 !important;
//     transform: scale(1.2) !important;
//   }

//   :global(.swiper-pagination-bullet-active) {
//     background: #60a5fa !important;
//     opacity: 1 !important;
//     transform: scale(1.3) !important;
//   }
// `}</style>
//     </section>
//   );
// };

// export default Hero;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import api from "../../api";

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/home");
      const data = res.data?.data;
      setHeroData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hero data:", error);
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Loading skeleton
  if (loading) {
    return (
      <section className="relative w-full h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </section>
    );
  }

  // Default fallback data if API fails
  const defaultData = {
    images: ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg", "/banner4.jpg", "/banner5.jpg"],
    subtitle: "Study in Malaysia",
    title_line1: "Explore Top Universities",
    title_line2: "In-Demand Courses & Global Career Pathways",
    description: "Begin your study journey in Malaysia with expert guidance for admissions, course selection, and fast-track visa processing.",
    button1_text: "ABOUT US",
    button1_link: "/who-we-are",
    button2_text: "KNOW MORE",
    button2_link: "/courses-in-malaysias"
  };

  // Use API data or fallback to default
  const images = heroData?.banner_images || heroData?.images || defaultData.images;
  const subtitle = heroData?.subtitle || defaultData.subtitle;
  const titleLine1 = heroData?.title_line1 || heroData?.title || defaultData.title_line1;
  const titleLine2 = heroData?.title_line2 || heroData?.subtitle_title || defaultData.title_line2;
  const description = heroData?.description || defaultData.description;
  const button1Text = heroData?.button1_text || defaultData.button1_text;
  const button1Link = heroData?.button1_link || defaultData.button1_link;
  const button2Text = heroData?.button2_text || defaultData.button2_text;
  const button2Link = heroData?.button2_link || defaultData.button2_link;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Swiper Background Slider */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Navigation, Pagination, EffectFade]}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          loop
          className="w-full h-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt={`slide-${i}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-blue-900/60 z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex items-center h-full px-6 md:px-20 pointer-events-none">
        <motion.div
          className="text-white max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-blue-400 tracking-widest font-semibold uppercase mb-3 md:mb-4"
          >
            {subtitle}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6"
          >
            <span className="block">{titleLine1}</span>
            <span className="block mt-2 bg-gradient-to-r from-sky-300 via-blue-400 to-sky-300 bg-clip-text text-transparent">
              {titleLine2}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-100 max-w-2xl mb-8 md:mb-10 leading-relaxed"
          >
            {description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pointer-events-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to={button1Link}>
                <button className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-black font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center gap-2">
                  {button1Text}
                </button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to={button2Link}>
                <button className="cursor-pointer bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 backdrop-blur-sm flex items-center gap-2">
                  {button2Text}
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom CSS for Swiper Controls */}
      <style jsx>{`
        :global(.swiper-button-prev),
        :global(.swiper-button-next) {
          background: white !important;
          width: 50px !important;
          height: 50px !important;
          border-radius: 50% !important;
          z-index: 30 !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
          transition: all 0.3s ease !important;
        }

        :global(.swiper-button-prev:hover),
        :global(.swiper-button-next:hover) {
          background: #3b82f6 !important;
          transform: scale(1.1) !important;
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5) !important;
        }

        :global(.swiper-button-prev::after),
        :global(.swiper-button-next::after) {
          font-size: 22px !important;
          font-weight: bold !important;
          color: #1f2937 !important;
        }

        :global(.swiper-button-prev:hover::after),
        :global(.swiper-button-next:hover::after) {
          color: white !important;
        }

        :global(.swiper-pagination) {
          bottom: 30px !important;
          z-index: 30 !important;
        }

        :global(.swiper-pagination-bullet) {
          width: 12px !important;
          height: 12px !important;
          background: white !important;
          opacity: 0.6 !important;
          transition: all 0.3s ease !important;
        }

        :global(.swiper-pagination-bullet:hover) {
          opacity: 0.8 !important;
          transform: scale(1.2) !important;
        }

        :global(.swiper-pagination-bullet-active) {
          background: #60a5fa !important;
          opacity: 1 !important;
          transform: scale(1.3) !important;
        }
      `}</style>
    </section>
  );
};

export default Hero;