import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay"; // Optional but good to have
import api from "../../api"; // ✅ Update the path if needed

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchTestimonials = async () => {
    try {
      const res = await api.get("/home");
      
      // ✅ Adjusted to use nested "data"
      if (res.data && res.data.data && Array.isArray(res.data.data.testimonials)) {
        setTestimonials(res.data.data.testimonials);
      } else {
        console.warn("Testimonials not found in response");
      }
    } catch (error) {
      console.error("Failed to load testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchTestimonials();
}, []);

  return (
    <section className="bg-gradient-to-b from-white to-cyan-50 px-4 py-16 md:px-10 lg:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        What our <span className="text-blue-600">Students</span> Say
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading testimonials...</p>
      ) : testimonials.length > 0 ? (
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          speed={1000}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Autoplay]}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={t.id || index} className="h-full">
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 p-6 flex flex-col justify-between min-h-[300px] h-full border border-gray-100">
                <div className="text-4xl text-cyan-500 mb-3 text-left leading-none">❝</div>
                <div className="text-gray-700 text-sm mb-4">{t.review}</div>
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
                  <span className="inline-block mt-1 text-xs bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full font-medium uppercase tracking-wide">
                    {t.country}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-400">No testimonials found.</p>
      )}
    </section>
  );
};

export default TestimonialSlider;
