import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import api from "../../api"; // adjust path based on your project

const Hero = () => {
  const images = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];

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
const fetchseoData = async () => {
      try {
        const res = await api.get("/home");
        const data = res.data?.data;
        console.log(res.data?.data?.seo);
        
       
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };
    fetchseoData();
  

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Swiper Background Slider */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-blue-900/60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center h-full px-6 md:px-20">
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
            Welcome to Education Malaysia!
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6"
          >
            <span className="block">Education Roadmap:</span>
            <span className="block mt-2 bg-gradient-to-r from-sky-300 via-blue-400 to-sky-300 bg-clip-text text-transparent">
              From Admissions to Community
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-100 max-w-2xl mb-8 md:mb-10 leading-relaxed"
          >
            Navigate admissions, access essential resources, and connect with
            our vibrant community for a fulfilling academic journey in Malaysia.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/who-we-are">
                <button className="bg-blue-400 hover:bg-blue-500 text-black font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center gap-2">
                  ABOUT MORE
                </button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/specialization">
                <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 backdrop-blur-sm flex items-center gap-2">
                  KNOW MORE
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
