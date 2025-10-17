import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../api"; // Adjust path to your axios instance
import { API_URL } from "../../config";

export default function UniversitySlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
  const fetchUniversities = async () => {
  try {
    const res = await api.get("/home");
    const universitiesData = res.data?.data?.universities || [];
    setUniversities(universitiesData);
    console.log("✅ Fetched Universities:", universitiesData);

    if (universitiesData.length === 0) {
      console.warn("No universities found in the response.");
    }
  } catch (error) {
    console.error("Failed to fetch universities:", error);
  }
};

    fetchUniversities();
  }, []);

  return (
    <div className="relative px-6 py-16 bg-gradient-to-b from-blue-50 to-white">
      <h2 className="text-3xl font-bold text-center text-black mb-14">
        🎓 Top Trending Universities in{" "}
        <span className="text-blue-600">Malaysia</span>
      </h2>

      {/* Navigation Arrows */}
      <div className="absolute top-[47%] left-3 z-20">
        <button ref={prevRef} className="p-2 rounded-full hover:bg-blue-100 transition">
          <ChevronLeft size={22} />
        </button>
      </div>
      <div className="absolute top-[47%] right-3 z-20">
        <button ref={nextRef} className="p-2 rounded-full hover:bg-blue-100 transition">
          <ChevronRight size={22} />
        </button>
      </div>

      <Swiper
        slidesPerView={4}
        spaceBetween={24}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {universities.map((uni, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow hover:shadow-xl transition overflow-hidden">
              {/* University Logo */}
              <div className="relative h-52 w-full flex items-center justify-center bg-gray-100">
                <img
                  src={`${API_URL}${uni.logo_path}`}
                  alt={uni.name}
                  className="object-contain h-full p-4"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-md font-semibold text-gray-800 mb-1 truncate">{uni.name}</h3>
                <p className="text-sm text-blue-600 mb-2">
                  Programs: {uni.programs_count || 0}
                </p>
                <div className="text-gray-500 text-xs mb-4">Views: 416</div>

                <div className="space-y-2">
                  <button 
                    onClick={() => navigate(`/university/${uni.uname}`)}
                    className="w-full text-sm border border-blue-600 text-blue-600 rounded-full py-2 hover:bg-blue-100 transition">
                    Fee structure
                  </button>
                  <button 
                  onClick={() => navigate(`/university/${uni.uname}`)}
                  className="w-full text-sm border border-blue-600 text-blue-600 rounded-full py-2 hover:bg-blue-100 transition">
                    Download Brochure
                  </button>
                  <button className="w-full text-sm border border-blue-600 text-blue-600 rounded-full py-2 hover:bg-blue-100 transition">
                    Compare
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Browse All Button */}
      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/universities/universities-in-malaysia")}
          className="inline-flex items-center border-2 border-blue-800 text-blue-800 font-semibold px-6 py-2 rounded-full transition hover:bg-blue-800 hover:text-white"
        >
          BROWSE ALL UNIVERSITIES
        </button>
      </div>
    </div>
  );
}
