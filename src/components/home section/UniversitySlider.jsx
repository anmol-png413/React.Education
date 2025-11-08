


import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, BookOpen, Eye, ChevronRight, Heart, Share2 } from 'lucide-react';
import api from "../../api";
import { API_URL } from "../../config";

export default function UniversityCardsSlider() {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [likedUniversities, setLikedUniversities] = useState(new Set());
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Modal states
  const [feeModalOpen, setFeeModalOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedUniversityForModal, setSelectedUniversityForModal] = useState(null);
  const [compareSelection, setCompareSelection] = useState({ u1: "", u2: "", u3: "" });
  const [comparisonResult, setComparisonResult] = useState(null);

  // Fetch universities
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await api.get("/home");
        const data = res.data?.data?.universities || [];
        setUniversities(data);
        console.log("✅ Universities fetched:", data);
      } catch (err) {
        console.error("Failed to fetch universities:", err);
      }
    };
    fetchUniversities();
  }, []);

  // Toggle like
  const toggleLike = (universityId) => {
    const newLiked = new Set(likedUniversities);
    if (newLiked.has(universityId)) newLiked.delete(universityId);
    else newLiked.add(universityId);
    setLikedUniversities(new Set(newLiked));
  };

  // Utility functions
  const getUniversityTypeColor = (type) =>
    type === "public" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800";

  const getUniversityTypeIcon = (type) => (type === "public" ? "🏛️" : "🏢");

  // const logoFor = (uni) => {
  //   if (!uni) return "";
  //   if (uni.logo_path) return `${API_URL}${uni.logo_path}`;
  //   if (uni.logo) return uni.logo;
  //   return "";
  // };
  const logoFor = (uni) => {
  if (!uni) return "https://via.placeholder.com/200x200?text=University";
    // if (!uni) return "https://www.educationmalaysia.in/storage/";
  

  
  // Check logo_path
  if (uni.logo_path && uni.logo_path.trim() !== "") {
    if (uni.logo_path.startsWith('http')) {
      return uni.logo_path;
    }
    return `${API_URL}${uni.logo_path}`;
  }
  
  // Check logo
  if (uni.logo && uni.logo.trim() !== "") {
    if (uni.logo.startsWith('http')) {
      return uni.logo;
    }
    return `${API_URL}${uni.logo}`;
  }
  
  // Fallback placeholder
  return "https://via.placeholder.com/200x200?text=No+Logo";
};

  // Modal handlers
  const handleFeeStructure = (name) => {
    setSelectedUniversityForModal(name);
    setFeeModalOpen(true);
  };

  const handleBrochure = (name) => {
    setSelectedUniversityForModal(name);
    setBrochureModalOpen(true);
  };

  const handleCompare = () => {
    setCompareSelection({ u1: "", u2: "", u3: "" });
    setComparisonResult(null);
    setCompareModalOpen(true);
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setSuccessModalOpen(true);
    setTimeout(() => setSuccessModalOpen(false), 2200);
  };

  // Form submissions
  const onSubmitFee = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd);
    console.log("Fee Structure submitted:", data);
    setFeeModalOpen(false);
    showSuccess("Fee Structure request submitted");
    e.target.reset();
  };

  const onSubmitBrochure = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd);
    console.log("Brochure Download submitted:", data);
    setBrochureModalOpen(false);
    showSuccess("Brochure request submitted");
    e.target.reset();
  };

  const onSubmitCompare = (e) => {
    e.preventDefault();
    const selected = [compareSelection.u1, compareSelection.u2, compareSelection.u3].filter(Boolean);
    const comparisonData = selected.map((id) => 
      universities.find((u) => (u.id || u._id || String(u.name)) === id)
    );
    setComparisonResult(comparisonData);
  };



  // Modal wrapper component
const ModalWrapper = ({ open, onClose, title, children, wide = false }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className={`relative z-10 bg-white rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl ${wide ? "w-full max-w-5xl" : "w-full max-w-2xl"}`}>
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-2xl px-2 py-1 text-gray-600 hover:text-gray-800">×</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

  return (
    <div className="relative px-6 py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-black mb-8">
          🎓 Top Trending Universities <span className="text-blue-600">in Malaysia</span>
        </h2>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-3 z-30">
          <button ref={prevRef} className="p-2 rounded-full hover:bg-blue-100 transition shadow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-3 z-30">
          <button ref={nextRef} className="p-2 rounded-full hover:bg-blue-100 transition shadow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={4}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {universities.length === 0 ? (
            <SwiperSlide>
              <div className="h-56 flex items-center justify-center">
                <p className="text-gray-600">Loading universities...</p>
              </div>
            </SwiperSlide>
          ) : (
            universities.map((uni, idx) => (
              <SwiperSlide key={uni.id || uni._id || idx}>
                <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100">
                  {/* University Image */}
                  <div className="h-60 overflow-hidden relative bg-gradient-to-br from-blue-50 to-white">
                    {/* <img
                      src={logoFor(uni)}
                      alt={uni.name}
                      className="w-full h-full object-contain p-4 transition-transform duration-600 group-hover:scale-110"
                    /> */}
                    <img
  src={logoFor(uni)}
  alt={uni.name || "University Logo"}
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/200x200?text=No+Logo";
    //  e.target.src = "https://www.educationmalaysia.in/storage/";
  }}
  className="w-full h-full object-contain p-4 transition-transform duration-600 group-hover:scale-110"
/>

                    {/* Overlay Icons */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleLike(uni.id || uni._id)}
                            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                              likedUniversities.has(uni.id || uni._id)
                                ? 'bg-red-500 text-white'
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${likedUniversities.has(uni.id || uni._id) ? 'fill-current' : ''}`} />
                          </button>
                          <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-200">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Type Badge */}
                    {uni.type && (
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getUniversityTypeColor(uni.type)}`}>
                          <span className="mr-1">{getUniversityTypeIcon(uni.type)}</span>
                          {uni.type.charAt(0).toUpperCase() + uni.type.slice(1)}
                        </span>
                      </div>
                    )}

                    {/* Ranking Badge */}
                    {uni.ranking && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          #{uni.ranking}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="font-bold text-gray-800 text-xl group-hover:text-blue-600 mb-3 line-clamp-2 min-h-[3.5rem]">
                      {uni.name}
                    </h3>

                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">{uni.location || 'Malaysia'}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                      {uni.description || 'Explore this university.'}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <BookOpen className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                        <div className="text-lg font-bold text-blue-600">{uni.programs_count || uni.programs || 0}</div>
                        <div className="text-xs text-gray-600">Programs</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <Eye className="w-5 h-5 text-green-600 mx-auto mb-1" />
                        <div className="text-lg font-bold text-green-600">{uni.views || 416}</div>
                        <div className="text-xs text-gray-600">Views</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-xl">
                        <Star className="w-5 h-5 text-yellow-600 mx-auto mb-1 fill-current" />
                        <div className="text-lg font-bold text-yellow-600">
                          {uni.rating?.toFixed ? uni.rating.toFixed(1) : '4.8'}
                        </div>
                        <div className="text-xs text-gray-600">Rating</div>
                      </div>
                    </div>  

                     <div className="flex-grow"></div>

                    {/* Action Buttons */}
                    <div className="space-y-3 mt-auto">
                      <button 
                        onClick={() => navigate(`/university/${uni.uname}`)}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center group"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleFeeStructure(uni.name)}
                          className="py-2 px-3 border-2 border-blue-200 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-all duration-200 text-sm"
                        >
                          Fee Structure
                        </button>
                        <button
                          onClick={() => handleBrochure(uni.name)}
                          className="py-2 px-3 border-2 border-green-200 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-all duration-200 text-sm"
                        >
                          Brochure
                        </button>
                      </div>

                      <button
                        onClick={handleCompare}
                        className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 text-sm"
                      >
                        Compare Universities
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>

        {/* Browse All Button */}
        <div className="text-center mt-8">
          <button 
            onClick={() => navigate("/universities/universities-in-malaysia")}
            className="inline-flex items-center border-2 border-blue-800 text-blue-800 font-semibold px-6 py-2 rounded-full transition hover:bg-blue-800 hover:text-white"
          >
            BROWSE ALL UNIVERSITIES
          </button>
        </div>
      </div>

      {/* Fee Structure Modal */}
      <ModalWrapper open={feeModalOpen} onClose={() => setFeeModalOpen(false)} title={`Fee Structure - ${selectedUniversityForModal || ""}`}>
         
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Fee Structure Request</h3>
      <p className="text-gray-600">
        Get detailed fee information for {selectedUniversityForModal || "the selected university"}
      </p>
    </div>
        <form onSubmit={onSubmitFee} className="space-y-4">
          <input type="hidden" name="university" value={selectedUniversityForModal || ""} />

          
          {/* <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">First Name</label>
              <input name="firstName" required className="w-full px-3 py-2 border rounded-lg" placeholder="First name" />
            </div> */}
              <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">First Name</label>
            <input
  type="text"
  name="firstName"
  required
  placeholder="Enter your first name"
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
/>

          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Last Name</label>
            <input
  type="text"
  name="lastName"
  required
  placeholder="Enter your last name"
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
/>

          </div>
         
            
          
          </div>

          <div>
             <label className="block text-gray-700 font-semibold mb-2">Nationality</label>
  <select
    name="nationality"
    required
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  >
   

         
              <option value="">Select nationality</option>
              <option>India</option>
                <option>Afghanistan</option>
  <option>Bangladesh</option>
  <option>Bhutan</option>
  <option>China</option>

  <option>Indonesia</option>
  <option>Iran</option>
  <option>Iraq</option>
  <option>Japan</option>
  <option>Kazakhstan</option>
  <option>Kuwait</option>
  <option>Kyrgyzstan</option>
  <option>Maldives</option>
  <option>Myanmar</option>
  <option>Nepal</option>
  <option>Oman</option>
  <option>Pakistan</option>
  <option>Philippines</option>
  <option>Qatar</option>
  <option>Saudi Arabia</option>
  <option>Singapore</option>
  <option>South Korea</option>
  <option>Sri Lanka</option>
  <option>Thailand</option>
  <option>Turkey</option>
  <option>United Arab Emirates</option>
  <option>Uzbekistan</option>
  <option>Vietnam</option>
  <option>Yemen</option>
  <option>Other</option>
            
            </select> 
          </div>

          <div>
             <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
  <input
    type="email"
    name="email"
    required
    placeholder="Enter your email"
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
            {/* <label className="block text-sm font-semibold mb-1">Email</label>
            <input name="email" type="email" required className="w-full px-3 py-2 border rounded-lg" placeholder=" Enter your email" /> */}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
            <div className="flex gap-2">
              <select name="countryCode" required className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                
                  <option value="+880">Code</option>
  <option value="+975">+975 Bhutan</option>
  <option value="+86">+86 China</option>
  <option value="+91">+91 India</option>
  <option value="+62">+62 Indonesia</option>
  <option value="+98">+98 Iran</option>
  <option value="+964">+964 Iraq</option>
  <option value="+81">+81 Japan</option>
  <option value="+7">+7 Kazakhstan</option>
  <option value="+965">+965 Kuwait</option>
  <option value="+996">+996 Kyrgyzstan</option>
  <option value="+960">+960 Maldives</option>
  <option value="+95">+95 Myanmar</option>
  <option value="+977">+977 Nepal</option>
  <option value="+968">+968 Oman</option>
  <option value="+92">+92 Pakistan</option>
  <option value="+63">+63 Philippines</option>
  <option value="+974">+974 Qatar</option>
  <option value="+966">+966 Saudi Arabia</option>
  <option value="+65">+65 Singapore</option>
  <option value="+82">+82 South Korea</option>
                 <option value="+93"> +93 Afghanistan </option>
                   <option value="+94">+94 Sri Lanka</option>
  <option value="+66">+66 Thailand</option>
  <option value="+90">+90 Turkey</option>
  <option value="+971">+971 United Arab Emirates</option>
  <option value="+998">+998 Uzbekistan</option>
  <option value="+84">+84 Vietnam</option>
  <option value="+967">+967 Yemen</option>
  <option value="+">+ Other</option>
              </select>
              <input name="phone" required className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder=" Enter Your Phone number" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Interested Course</label>
            <select name="course" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Select a course</option>
              <option value="computer-science">Computer Science</option>
              <option value="business-administration">Business Administration</option>
              <option value="engineering">Engineering</option>
              <option value="medicine">Medicine</option>
              <option value="other">Other</option>
            </select>
          </div>
             <div>
          <label class="block text-gray-700 font-semibold mb-2">Study Level</label>
          <select name="level" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Select study level</option>
            <option value="diploma">Diploma</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="phd">PhD</option>
          </select>
        </div>

          <div className="flex gap-3 mt-2">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
              Request Fee Structure
            </button>
            <button type="button" onClick={() => setFeeModalOpen(false)} className="px-4 py-2 border rounded-lg">
              Cancel
            </button>
          </div>
        </form>
      </ModalWrapper>

      {/* Brochure Modal */}
      <ModalWrapper open={brochureModalOpen} onClose={() => setBrochureModalOpen(false)} title={`Download Brochure - ${selectedUniversityForModal || ""}`}>
            <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Download Brochure</h3>
      <p className="text-gray-600">
        Get the complete brochure for {selectedUniversityForModal || "the selected university"}
      </p>
    </div>
        <form onSubmit={onSubmitBrochure} className="space-y-4">
          <input type="hidden" name="university" value={selectedUniversityForModal || ""} />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">First Name</label>
              <input name="firstName" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="First name" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Last Name</label>
              <input name="lastName" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Last name" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Nationality</label>
            <select name="nationality" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Select nationality</option>
               <option>Afghanistan</option>
  <option>Bangladesh</option>
  <option>Bhutan</option>
  <option>China</option>
  <option>India</option>
  <option>Indonesia</option>
  <option>Iran</option>
  <option>Iraq</option>
  <option>Japan</option>
  <option>Kazakhstan</option>
  <option>Kuwait</option>
  <option>Kyrgyzstan</option>
  <option>Maldives</option>
  <option>Myanmar</option>
  <option>Nepal</option>
  <option>Oman</option>
  <option>Pakistan</option>
  <option>Philippines</option>
  <option>Qatar</option>
  <option>Saudi Arabia</option>
  <option>Singapore</option>
  <option>South Korea</option>
  <option>Sri Lanka</option>
  <option>Thailand</option>
  <option>Turkey</option>
  <option>United Arab Emirates</option>
  <option>Uzbekistan</option>
  <option>Vietnam</option>
  <option>Yemen</option>
  <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input name="email" type="email" required className=" w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter Your email" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Phone Number</label>
            <div className="flex gap-2">
             
              <select name="countryCode" required className=" px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="+93">Code</option>
            <option value="+93">+93 Afghanistan</option>
  <option value="+880">+880 Bangladesh</option>
  <option value="+975">+975 Bhutan</option>
  <option value="+86">+86 China</option>
  <option value="+91">+91 India</option>
  <option value="+62">+62 Indonesia</option>
  <option value="+98">+98 Iran</option>
  <option value="+964">+964 Iraq</option>
  <option value="+81">+81 Japan</option>
  <option value="+7">+7 Kazakhstan</option>
  <option value="+965">+965 Kuwait</option>
  <option value="+996">+996 Kyrgyzstan</option>
  <option value="+960">+960 Maldives</option>
  <option value="+95">+95 Myanmar</option>
  <option value="+977">+977 Nepal</option>
  <option value="+968">+968 Oman</option>
  <option value="+92">+92 Pakistan</option>
  <option value="+63">+63 Philippines</option>
  <option value="+974">+974 Qatar</option>
  <option value="+966">+966 Saudi Arabia</option>
  <option value="+65">+65 Singapore</option>
  <option value="+82">+82 South Korea</option>
  <option value="+94">+94 Sri Lanka</option>
  <option value="+66">+66 Thailand</option>
  <option value="+90">+90 Turkey</option>
  <option value="+971">+971 United Arab Emirates</option>
  <option value="+998">+998 Uzbekistan</option>
  <option value="+84">+84 Vietnam</option>
  <option value="+967">+967 Yemen</option>
  <option value="+">+ Other</option>
              </select>
              <input name="phone" required className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your phone number" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Interested Program Type</label>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center">
                <input type="checkbox" name="programs" value="undergraduate" className="mr-2" />
                Undergraduate
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="programs" value="postgraduate" className="mr-2" />
                Postgraduate
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="programs" value="diploma" className="mr-2" />
                Diploma
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="programs" value="phd" className="mr-2" />
                PhD
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded-lg">
              Download Brochure
            </button>
            <button type="button" onClick={() => setBrochureModalOpen(false)} className="px-4 py-2 border rounded-lg">
              Cancel
            </button>
          </div>
        </form>
      </ModalWrapper>

   
      <ModalWrapper open={compareModalOpen} onClose={() => setCompareModalOpen(false)} title="Compare Universities" wide>
  <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6">

    {/* Header Section */}
    <div className="text-center">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Compare Universities</h3>
      <p className="text-gray-500">Select up to 3 universities to compare their features</p>
    </div>

    <div className="space-y-4">
      {!comparisonResult && (
        <form onSubmit={onSubmitCompare} className="space-y-6">

          {/* University Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Select First University</label>
              <select
                required
                value={compareSelection.u1}
                onChange={(e) => setCompareSelection({ ...compareSelection, u1: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose University</option>
                {universities.map((u, i) => (
                  <option key={i} value={u.id || u._id || u.name}>{u.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Select Second University</label>
              <select
                required
                value={compareSelection.u2}
                onChange={(e) => setCompareSelection({ ...compareSelection, u2: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose University</option>
                {universities.map((u, i) => (
                  <option key={i} value={u.id || u._id || u.name}>{u.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Select Third University (Optional)</label>
            <select
              value={compareSelection.u3}
              onChange={(e) => setCompareSelection({ ...compareSelection, u3: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose University</option>
              {universities.map((u, i) => (
                <option key={i} value={u.id || u._id || u.name}>{u.name}</option>
              ))}
            </select>
          </div>

          {/* Email & Nationality */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Your Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nationality</label>
              <select
                name="nationality"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select your nationality</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="China">China</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Nepal">Nepal</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Philippines">Philippines</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Thailand">Thailand</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
            <div className="flex gap-3">
              <select
                name="countryCode"
                required
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Code</option>
                <option value="+93">+93 Afghanistan</option>
                <option value="+880">+880 Bangladesh</option>
                <option value="+86">+86 China</option>
                <option value="+91">+91 India</option>
                <option value="+62">+62 Indonesia</option>
                <option value="+977">+977 Nepal</option>
                <option value="+92">+92 Pakistan</option>
                <option value="+63">+63 Philippines</option>
                <option value="+94">+94 Sri Lanka</option>
                <option value="+66">+66 Thailand</option>
                <option value="+84">+84 Vietnam</option>
              </select>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Enter your phone number"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Comparison Criteria */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Comparison Criteria (Optional)</label>
            <textarea
              name="criteria"
              rows="4"
              placeholder="What specific aspects would you like to compare? (e.g., fees, programs, facilities)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              Generate Comparison
            </button>
            <button
              type="button"
              onClick={() => setCompareModalOpen(false)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              Cancel
            </button>
          </div>

        </form>
      )}

      {/* Comparison Result Table */}
      {comparisonResult && (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border px-4 py-3 text-left font-semibold">Criteria</th>
                  {comparisonResult.map((uni, i) => (
                    <th key={i} className="border px-4 py-3 text-center font-semibold">
                      {uni?.name || 'N/A'}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-3 font-medium">Type</td>
                  {comparisonResult.map((uni, i) => (
                    <td key={i} className="border px-4 py-3 text-center">
                      {uni?.type ? (uni.type.charAt(0).toUpperCase() + uni.type.slice(1)) : 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-3 font-medium">Established</td>
                  {comparisonResult.map((uni, i) => (
                    <td key={i} className="border px-4 py-3 text-center">{uni?.established || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-4 py-3 font-medium">Location</td>
                  {comparisonResult.map((uni, i) => (
                    <td key={i} className="border px-4 py-3 text-center">{uni?.location || 'N/A'}</td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-3 font-medium">Programs</td>
                  {comparisonResult.map((uni, i) => (
                    <td key={i} className="border px-4 py-3 text-center">{uni?.programs || uni?.programs_count || 'N/A'}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-4 py-3 font-medium">Ranking</td>
                  {comparisonResult.map((uni, i) => (
                    <td key={i} className="border px-4 py-3 text-center">{uni?.ranking ? `#${uni.ranking}` : 'N/A'}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mt-4 flex flex-col md:flex-row justify-center gap-3">
            <button
              onClick={() => {
                setComparisonResult(null);
                setCompareSelection({ u1: "", u2: "", u3: "" });
              }}
              className="px-4 py-2 border rounded-lg"
            >
              Back
            </button>
            <button
              onClick={() => setCompareModalOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Close Comparison
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
</ModalWrapper>


      {/* Success Modal */}
      <ModalWrapper open={successModalOpen} onClose={() => setSuccessModalOpen(false)} title="Success">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{successMessage || "Submitted"}</h3>
          <p className="text-gray-600">We'll get back to you soon.</p>
          <div className="mt-4">
            <button onClick={() => setSuccessModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Close
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}
