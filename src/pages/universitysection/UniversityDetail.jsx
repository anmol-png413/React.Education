

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import GetinTouchUiversity from "../../components/GetinTouchUiversity";
import TabContentLoader from "./TabContentLoader";
import Overview from "./Overview";
import Courses from "./Courses2";
import Gallery from "./Gallery";
import Videos from "./Videos";
import Reviews from "./Reviews";
import Ranking from "./Rankingdetails";
import api from "../../api"; 
import UniversityCoursesCard from "./UniversityCoursesCard";
import SEO from "../../components/SEO";
import { Home, Layers, Loader2 } from "lucide-react";
import { API_URL } from "../../config";
import PopupForm from "./PopupForm";
import { BsCalendar3 } from "react-icons/bs";
import FeaturedUniversities from "../../components/FeaturedUniversities";




// ==========================================
// FIX 1: Icons Import (Line 23 ke baad add karo)
// ==========================================

import {
  FaLocationArrow,
  FaMapMarkerAlt,
  FaEye,
  FaBookOpen,
  FaDownload,
  FaFileAlt,
  FaEdit,
  FaStar,
  FaGraduationCap,
  FaSchool,
  FaCheck,
  FaPhone,  
  FaPhoneSquareAlt,
  FaPhoneAlt,     
  FaFax,          
  FaEnvelope,     
  FaBuilding,    
  FaBed,          
  FaUsers,        
} from "react-icons/fa";

// The static data for photos and offered courses as requested
const STATIC_PHOTOS = [
  "https://www.educationmalaysia.in/uploads/university/photos/IMG_20221209_181808.png",
  "https://www.educationmalaysia.in/assets/uploadFiles/study/IMG_20221209_181825.png",
  "https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=300&h=200&fit=crop",
];

const STATIC_OFFERED_COURSES = [
  "Business Administration",
  "Computer Science",
  "Engineering",
  "Arts & Sciences",
  "Health Sciences",
  "Communications",
  "Communications",
  "Communications",
  "Communications",
  
];

// Default data used while API loads or fails, so UI never blocks on a loader
const DEFAULT_UNIVERSITY = {
  name: "",
  logo_path: "",
  city: "",
  inst_type: "Private Institution",
  photos: STATIC_PHOTOS,
  offeredCourses: STATIC_OFFERED_COURSES,
  rank: "",
  qs_rank: "",
  established: "",
  Scholarship: false,
  views: "",
  courses: "",
  seo: null,
};


// Heuristic to pick the best 5 photo URLs from a larger list without extra metadata
const selectBestFivePhotos = (photoUrls) => {
  if (!Array.isArray(photoUrls)) return [];

  // De-duplicate while preserving order
  const uniqueUrls = Array.from(new Set(photoUrls.filter(Boolean)));

  const scored = uniqueUrls.map((url) => {
    const lower = String(url).toLowerCase();
    const ext = lower.split("?")[0].split(".").pop();

    let score = 0;
    // Prefer high-quality photo paths and common photo extensions
    if (["jpg", "jpeg"].includes(ext)) score += 3;
    if (["png", "webp"].includes(ext)) score += 2;
    if (lower.includes("/uploads/university/photos")) score += 2;

    // Penalize likely non-hero images
    const badHints = ["logo", "icon", "thumbnail", "thumb", "placeholder", "default", "sprite"];
    if (badHints.some((h) => lower.includes(h))) score -= 4;

    // Mildly prefer filenames that look like real photos (contain long digit sequences)
    if (/(\d{4,})/.test(lower)) score += 1;

    return { url, score };
  });

  // Sort by score descending and take top 5
  const top = scored.sort((a, b) => b.score - a.score).map((s) => s.url).slice(0, 5);
  return top.length > 0 ? top : uniqueUrls.slice(0, 5);
};

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "courses", label: "Courses" },
  { id: "gallery", label: "Gallery" },
  { id: "videos", label: "Videos" },
  { id: "reviews", label: "Reviews" },
  { id: "ranking", label: "Ranking" },
];

const UniversityDetailPage = () => {



  
  const { slug, section } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(section || "overview");
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [universityData, setUniversityData] = useState(DEFAULT_UNIVERSITY);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [seo, setSeo] = useState({});
  const [faculties, setFaculties] = useState([]);
  const [featuredPhotos, setFeaturedPhotos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCounsellingOpen, setIsCounsellingOpen] = useState(false);

  // Effect to fetch university details from the API
  useEffect(() => {
    const fetchUniversityData = async () => {
      if (!slug) return;
      setIsDataLoading(true);
      try {
        const response = await api.get(`/university-details/${slug}`);
        const fetchedData = response.data.university;
        console.log("Fetched University Data:", response);
        setSeo(response.data.university || {});
        setFaculties(response.data.faculties || []);
        setFeaturedPhotos(response.data.featured_photos || []);
        console.log(featuredPhotos);

        // console.log(response.data.faculties || []);

        // Fetch gallery photos for the header image strip
        let fetchedPhotos = [];
        try {
          const galleryRes = await api.get(`/university-gallery/${slug}`);
          const photosArray = galleryRes?.data?.universityPhotos ?? galleryRes?.data?.data?.universityPhotos ?? [];
          const toAbsoluteUrl = (path) => {
            if (!path) return null;
            if (/^https?:\/\//i.test(path)) return path;
            const cleaned = String(path).replace(/^\/+/, '');
            return `https://www.educationmalaysia.in/storage/${cleaned}`;
          };
          if (Array.isArray(photosArray)) {
            fetchedPhotos = photosArray
              .map((p) => toAbsoluteUrl(p?.photo_path))
              .filter(Boolean);
          }
        } catch (galleryErr) {
          console.warn('Failed to fetch gallery photos, falling back to static photos', galleryErr);
        }

        // Choose the best five from fetched photos; fallback to static if none
        const bestFive = fetchedPhotos.length > 0 ? selectBestFivePhotos(fetchedPhotos) : [];

       
const mergedData = {
  ...fetchedData,
  photos: bestFive.length > 0 ? bestFive : STATIC_PHOTOS,
  offeredCourses: STATIC_OFFERED_COURSES,
  
  // ✅ CITY + STATE add karo
 city: fetchedData.city
  ? fetchedData.state
    ? `${fetchedData.city}, ${fetchedData.state}`
    : fetchedData.city
  : "Kuala Lumpur, Malaysia",

  
  established: fetchedData.established_year || "1970",
  courses: fetchedData.active_programs_count || "N/A",
  Scholarship: true,
  inst_type: fetchedData.institute_type?.type || "Private Institution",

  local_students: fetchedData.local_students || "18,000+",
  international_students: fetchedData.international_students || "9,000+",
  
  hostel_facility: fetchedData.hostel_facility || [
    "On-campus accommodation available",
    "Separate facilities for male and female students", 
    "Fully furnished rooms with amenities"
  ],
  
  approved_by: fetchedData.approved_by || "MQA",
  accredited_by: fetchedData.accredited_by || "Malaysian Qualifications Agency",
  times_rank: fetchedData.times_rank || "N/A",
  qs_asia_rank: fetchedData.qs_asia_rank || "N/A",
  rating: fetchedData.rating || 4.2,
};     setUniversityData(mergedData);
      } catch (error) {
        console.error("Error fetching university details:", error);
        // Handle error state or redirect
        setUniversityData(null);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchUniversityData();
  }, [slug]);


  // Effect to handle tab changes and scroll to top
  useEffect(() => {
    setActiveTab(section || "overview");
    setIsTabLoading(true);
    

    const timer = setTimeout(() => setIsTabLoading(false), 500);
    return () => clearTimeout(timer);
  }, [section]);

  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab);
      navigate(
        tab === "overview"
          ? `/university/${slug}`
          : `/university/${slug}/${tab}`
      );
    },
    [navigate, slug]
  );


  const renderTabContent = () => {
    if (isTabLoading) return <TabContentLoader />;
    switch (activeTab) {
      case "courses":
        return <Courses />;
      case "gallery":
        return <Gallery />;
      case "videos":
        return <Videos />;
      case "ranking":
        return <Ranking />;
      case "reviews":
        return <Reviews />;
      default:
        return <Overview />;
    }
  };

const handleClick = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${universityData.latitude_longitude}`;
    window.open(url, "_blank"); // Google Maps nayi tab me open hoga
  };

  // Use the fetched data to render the component
  return (
    
    <>
      {/* SEO Component */}
          <SEO 
title={seo?.meta_title}
description={seo?.meta_description}
keywords={seo?.meta_keyword}
ogImage={seo?.og_image_path}
pageContent={seo?.page_content}
pageurl={seo?.page_url}
seorating={seo?.seo_rating}
/>
      
      <div className="w-full bg-blue-50 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-3 py-3">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Link to="/" className="flex items-center gap-1 hover:underline hover:text-blue-500">
              <Home size={18} /> Home
            </Link>
            <span>/</span>
            <Link to="/universities" className="flex items-center gap-1 hover:underline hover:text-blue-500">
              <Layers size={18} /> Universities
            </Link>
            <span>/</span>
            <Link to={`/university/${slug}`} className="flex items-center gap-1 hover:underline hover:text-blue-500">
              <Layers size={18} /> {universityData.name}
            </Link>
          </div>
        </div>
      </div>
    
         {/* <div className="min-h-screen bg-gray-50"> */}
       {/* Mobile Layout  */}
       <div className="sm:hidden bg-gray-50">
        <div className="bg-white p-4">
          {/* Logo, Title, and Details */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 flex-shrink-0 border border-gray-200 rounded-xl p-1">
              <img
                src={`${API_URL}${universityData.logo_path}`}
                alt="University Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-900">
                {universityData.name}
              </h1>
              {/* <div className="flex items-center gap-1.5 mt-1">
                <FaMapMarkerAlt className="text-blue-500 text-xs" />
                <span className="text-blue-600 font-medium text-sm">
                  Location: {universityData.city}
                </span>
              </div> */}
              <div className="flex items-center gap-1.5 mt-1">
  <FaMapMarkerAlt className="text-blue-500 text-xs flex-shrink-0" />
  <span className="text-blue-600 font-medium text-sm " title={`Location: ${universityData.city}`}>
    Location: {universityData.city}
  </span>
</div>
              {/* SETARA Stars */}
<div className="flex items-center gap-1 text-gray-600 text-sm">
  <span className="font-medium">SETARA:</span>
  {[...Array(5)].map((_, i) => (
    <FaStar 
      key={i} 
      className={i < Math.round(universityData.rating || 3) ? "text-yellow-400" : "text-gray-300"} 
    />
  ))}
</div>       </div>
            </div>
          {/* </div> */}

          Main Image
          <div className="relative mb-4">
            {featuredPhotos?.length > 0 && (
              <img
                src={`${API_URL}${featuredPhotos[0].photo_path}`}
                alt={featuredPhotos[0].photo_name || 'University main image'}
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Action Buttons Row */}
        
        

          {/* Global Rankings */}
        
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3">
  <h3 className="text-base font-semibold text-gray-900 mb-1">Downloads & Services</h3>
  
  <button 
    onClick={() => setIsOpen(true)} 
    className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
  >
    <FaDownload /> Download Brochure
  </button>
  
  <button 
    onClick={() => setIsOpen(true)} 
    className="w-full bg-gray-100 border border-gray-300 text-gray-800 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
  >
    <FaFileAlt /> Download Fees Structures
  </button>
  
  
<button 
  onClick={() => setIsCounsellingOpen(true)} 
  className="w-full bg-gray-100 border border-gray-300 text-gray-800 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
>
  <FaBookOpen /> Book Direct University Counseling
</button>
  
  <Link to="/write-a-review" className="w-full">
    <button className="w-full bg-gray-100 border border-gray-300 text-gray-800 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
      <FaEdit /> Write a review
    </button>
  </Link>
</div>

<PopupForm 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)} 
  universityData={universityData} 
  formType="brochure"
/>
<PopupForm 
  isOpen={isCounsellingOpen} 
  onClose={() => setIsCounsellingOpen(false)} 
  universityData={universityData} 
  formType="counselling"
/>
</div>
</div>

       {/* Desktop Layout - Hidden on mobile */}
       <div className="hidden sm:block">
         {/* Header Section */}
         <div className="bg-white">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
             {/* Desktop Layout - Logo and Title Section */}
             <div className="flex flex-row items-center justify-between gap-6 mb-6">
               {/* Logo + Info */}
               <div className="flex items-center gap-4 flex-row text-left">
                 <div className="w-20 h-20 flex-shrink-0 border border-slate-200 rounded-xl ">
                   <img
                     src={`${API_URL}${universityData.logo_path}`}
                     alt="University Logo"
                     className="w-full h-full object-contain"
                   />
                 </div>
                 {/* <div className="flex-1"> */}
                 <div className="flex-1 min-w-0">
                   <h1 className="text-lg font-bold text-gray-900 mb-1">
                     {universityData.name}
                   </h1>
                   {/* <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-600"> */}
                   <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-600 flex-wrap">

                     {/* <div className="flex items-center gap-1">
                 <span className="text-blue-600 font-medium">       
                         Location: {universityData.city}
                       </span>
                     </div> */}
                     <div className="flex items-center gap-1 min-w-0 flex-1">
  <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
  <span className="text-blue-600 font-medium truncate" title={`Location: ${universityData.city}`}> 
    Location: {universityData.city}
  </span>
</div>
                     <div className="mt-0">
                       <button  onClick={handleClick }
                        className="flex items-center gap-2 border border-blue-700 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-50 transition whitespace-nowrap">
                         <FaLocationArrow className="text-sm" />
                         Get Direction
                       </button>
                     </div>
                   </div>
                 </div>
               </div>

{/* Desktop Detail Block - RIGHT ALIGNED */}
<div className="flex items-start justify-end gap-4 text-sm mr-50">
  
  {/* Type + SETARA Ranking */}
 
<div className="flex flex-col gap-2">

  {/* TYPE */}
  <div className="flex items-center gap-2">
    <span className="text-gray-600 text-sm">Type:</span>
    <span className="bg-blue-700 text-white px-2.5 py-1 rounded-full font-medium text-sm">
      {universityData.inst_type}
    </span>
  </div>

  {/* SETARA */}
  <div className="flex items-center gap-1 text-gray-600 text-sm">
    <span className="font-medium">SETARA:</span>
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <FaStar 
          key={i} 
          className={
            i < Math.round(universityData.rating || 3) 
              ? "text-yellow-400" 
              : "text-gray-300"
          } 
        />
      ))}
    </div>
  </div>

</div>


  {/* Featured + Approved By (Stacked) */}
<div className="flex flex-col gap-1.5 ml-20">
    <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-medium gap-2 text-sm">
      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
      <span>Featured</span>
    </div>
    <div className="text-gray-600 text-sm">
      <span className="font-medium">Approved By:</span> MQA
    </div>
  </div>

</div>
              </div>


 {/* Images */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-5">
  {/* Main large image */}
  <div className="md:col-span-6 relative">
    {featuredPhotos?.length > 0 && (
      <img
       src={`${API_URL}${
          featuredPhotos.find((photo) => photo.title === "Main")?.photo_path ||
          featuredPhotos.find((photo) => photo.title === "Campus")?.photo_path ||
          featuredPhotos[0]?.photo_path
        }`}
        alt="Main"
        className="w-full h-[300px] md:h-[350px] object-cover rounded-lg"
      />
    )}
    <button className="absolute bottom-4 left-4 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
      View All Photos
    </button>
  </div>

  {/* Grid of 4 smaller images */}
  <div className="md:col-span-6 grid grid-cols-2 gap-3">
    {featuredPhotos
      ?.filter(photo => photo.title !== 'Main')
      .slice(0, 4)
      .map((photo, index) => (
        <div key={photo.id} className="relative h-[140px] md:h-[168px]">
          <img
            src={`${API_URL}${photo.photo_path}`}
            alt={photo.photo_name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ))}
  </div>
</div>

           </div>
         </div>

      {/* University Details Section */}
<div className="bg-white">
  <div className="max-w-7xl mx-auto px-5 sm:px-6 py-6 -mt-12">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      
      {/* Left Content (Cards + Study Options) */}
      <div className="col-span-2 space-y-4">

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4  ">
          {/* Established Year */}
          <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center h-26">
            <BsCalendar3 className="text-2xl text-blue-600" />
            <h3 className="text-lg font-bold mt-2">
              {universityData.established || "1970"}
            </h3>
            <p className="text-gray-600 text-xs">Established Year</p>
          </div>

          {/* Scholarship */}
          <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center h-26">
            <FaGraduationCap className="text-2xl text-green-600" />
            <h3 className="text-lg font-bold mt-2">
              {universityData.Scholarship ? "Yes" : "No"}
            </h3>
            <p className="text-gray-600 text-xs">Scholarship</p>
          </div>

          {/* Views */}
          <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center h-26">
            <FaEye className="text-2xl text-purple-600" />
            <h3 className="text-lg font-bold mt-2">
              {universityData.views || "1,264"}
            </h3>
            <p className="text-gray-600 text-xs">Views</p>
          </div>

          {/* Courses */}
          <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center h-26">
            <FaSchool className="text-2xl text-orange-600" />
            <h3 className="text-lg font-bold mt-2">
              {universityData.courses || "N/A"}
            </h3>
            <p className="text-gray-600 text-xs">Courses</p>
          </div>
        </div>

        {/* Study Options */}
    
          <div className="flex flex-wrap gap-4">
            {[
              
            ].map((option, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl border ${option.bg} ${option.border} cursor-pointer transition`}
              >
                <div className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${option.icon} border-current`}>
                  <FaCheck className="text-xs" />
                </div>
                <span className={`text-sm font-medium ${option.text}`}>
                  {option.label}
                </span>
              </div>
            ))}
          {/* </div> */}
        </div>
         
    
         
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 -mt-2">
  
  {/* TOP LEFT: Accredited By */}
  <div className="bg-white rounded-xl shadow-sm p-5">
    <div className="flex items-center gap-2 mb-4">
      <FaBuilding className="text-blue-600 text-lg" />
      <h3 className="text-base font-semibold text-gray-900">Accredited By</h3>
    </div>
    <ul className="space-y-2 text-sm text-gray-700">
      <li className="flex items-start gap-2">
        <span className="text-blue-600 mt-0.5">•</span>
        <span>Malaysian Qualifications Agency (MQA)</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-blue-600 mt-0.5">•</span>
        <span>Ministry of Higher Education Malaysia</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-blue-600 mt-0.5">•</span>
        <span>International Accreditation Bodies</span>
      </li>
    </ul>
  </div>

  {/* Hostel Facility */}
{/* Hostel Facility */}
<div className="bg-white rounded-xl shadow-sm p-5">
  <div className="flex items-center gap-2 mb-4">
    <FaBed className="text-green-600 text-lg" />
    <h3 className="text-base font-semibold text-gray-900">Hostel Facility</h3>
  </div>
  <ul className="space-y-2 text-sm text-gray-700">
    {Array.isArray(universityData.hostel_facility) ? (
      universityData.hostel_facility.map((facility, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="text-green-600 mt-0.5">•</span>
          <span>{facility}</span>
        </li>
      ))
    ) : (
      <li className="flex items-start gap-2">
        <span className="text-green-600 mt-0.5">•</span>
        <span>{universityData.hostel_facility || "Available"}</span>
      </li>
    )}
  </ul>
</div>
{/* Total Students */}
<div className="bg-white rounded-xl shadow-sm p-5">
  <div className="flex items-center gap-2 mb-4">
    <FaUsers className="text-purple-600 text-lg" />
    <h3 className="text-base font-semibold text-gray-900">Total Students</h3>
  </div>
  <div className="space-y-4">
    {/* Local Students */}
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Local Students</span>
        <span className="text-sm font-bold text-purple-700">
          {universityData.local_students || "18,000+"}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
      </div>
    </div>
    
    {/* International Students */}
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">International Students</span>
        <span className="text-sm font-bold text-blue-700">
          {universityData.international_students || "9,000+"}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
      </div>
    </div>
  </div>
</div>

  {/* Contact Info - Desktop */}
{/* Contact Info - Desktop */}
<div className="bg-white rounded-xl shadow-sm p-5">
  <div className="flex items-center gap-2 mb-4">
    <FaPhoneAlt className="text-orange-600 text-lg" />
    <h3 className="text-base font-semibold text-gray-900">Contact Info</h3>
  </div>
  <div className="space-y-3 text-sm text-gray-700">
    <div className="flex items-center gap-3">
      <FaPhoneAlt className="text-orange-500" />
      <span>+60 3-8196 4000</span>
    </div>
    <div className="flex items-center gap-3">
      <FaFax className="text-gray-500" />
      <span>+60 3-8196 4053</span>
    </div>
    <div className="flex items-center gap-3">
      <FaEnvelope className="text-blue-500" />
      <span>info@university.edu.my</span>
    </div>
  </div>
</div>
</div>
 
           {/* Added Facilities section */}
<div className="mt-6 bg-white rounded-2xl shadow-md border border-gray-100 p-5 w-full">
  <h3 className="text-md font-bold text-gray-900 mb-4">Faculties:</h3>
  <div className="flex flex-wrap gap-2">
    {universityData.offeredCourses.map((course, index) => (
      <div
        key={index}
        className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-xl text-sm font-medium transition"
      >
        {course}
      </div>
    ))}
  </div>
</div>


      </div>
      

      {/* Right Content (Global Rankings & Actions) */}
      <div className="col-span-1 space-y-3">
        

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-3">
           
          <button onClick={() => setIsOpen(true)} className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
            <FaDownload className="text-base" />
            Download Brochure
          </button>
          <button onClick={() => setIsOpen(true)} className="w-full bg-gray-100 border border-gray-300 text-gray-800 px-5 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
            <FaFileAlt className="text-base" />
            Download Fees Structure
          </button>
         

<button 
  onClick={() => setIsCounsellingOpen(true)}
  className="w-full bg-gray-100 border border-gray-300 text-gray-800 px-5 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
>
  <FaBookOpen className="text-base" />
  Book Direct University Counciling
</button>

          
          <Link to="/write-a-review" className="w-full">
            <button className="w-full bg-gray-100 border border-gray-300 text-gray-800 px-5 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
              <FaEdit className="text-base" />
              Write a review
            </button>
          </Link>
          
       

        {/* ✅ YAHAN YE DO POPUP FORMS ADD KARO */}
        <PopupForm 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
          universityData={universityData} 
          formType="brochure"
        />
        <PopupForm 
          isOpen={isCounsellingOpen} 
          onClose={() => setIsCounsellingOpen(false)} 
          universityData={universityData} 
          formType="counselling"
        />
          
        </div>
      <div className="bg-white rounded-xl shadow-md p-6">
  <h3 className="text-lg font-semibold text-gray-900 mb-1">
    Global Rankings
  </h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg p-5 text-white shadow">
      <p className="text-2xl font-bold">
        #{universityData.rank || "397"}
      </p>
      <p className="text-sm opacity-90">World Rank</p>
    </div>
    <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-lg p-5 text-white shadow">
      <p className="text-2xl font-bold">
        {universityData.qs_rank || "1001-1400"}
      </p>
      <p className="text-sm opacity-90">QS Rank</p>
    </div>
    <div className="bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg p-5 text-white shadow">
      <p className="text-2xl font-bold">
        {universityData.times_rank || "1501+"}
      </p>
      <p className="text-sm opacity-90">Times Rank</p>
    </div>
    {universityData.qs_asia_rank && (
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg p-5 text-white shadow">
        <p className="text-2xl font-bold">
          {universityData.qs_asia_rank}
        </p>
        <p className="text-sm opacity-90">QS Asia Rank</p>
      </div>
    )}
  </div>
</div>
        <PopupForm isOpen={isOpen} onClose={() => setIsOpen(false)}  universityData={universityData} />

               <div className="flex flex-col gap-4">
                   {/* Study Options */}
                 <div className="bg-white rounded-xl shadow-sm p-6 w-full">
  <h2 className="text-lg font-semibold mb-4">Study Options</h2>
  <div className="grid grid-cols-3 gap-3">
    {[
       { label: "Study Online", bgColor: "bg-green-50", border: "border-green-300", text: "text-green-700", icon: "text-green-500" },
       { label: "Part Time", bgColor: "bg-blue-50", border: "border-blue-300", text: "text-blue-700", icon: "text-blue-500" },
       { label: "Full Time", bgColor: "bg-purple-50", border: "border-purple-300", text: "text-purple-700", icon: "text-purple-500" },
    ].map((option, index) => (
      <div
        key={index}
        className={`flex flex-row items-center justify-center gap-2 px-3 py-2.5 rounded-lg border-2 ${option.bgColor} ${option.border}`}
      >
        <div className={`w-4 h-4 flex items-center justify-center ${option.icon}`}>
          <FaCheck className="text-xs" />
        </div>
        <span className={`text-sm font-medium whitespace-nowrap ${option.text}`}>
          {option.label}
        </span>
      </div>
    ))}
  </div>
</div>
{/* </div> */}
      


</div>
 
          
      </div>
      
      
    </div>
  </div>
  
</div>
           </div>
         {/* </div> */}
     

      {/* Tabs */}
      <div className="bg-white border-b shadow-sm -mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto hide-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`py-4 px-6 text-sm font-medium transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
      </div>

      {/* Tab Content */}
      {/* Conditional rendering for different layouts */}
      {activeTab === "courses" ? (
        <div className="py-8">
          <Courses />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-xl p-6 shadow-md min-h-[400px]"
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
         {activeTab !== "courses" && (
  <div>
    {/* Get In Touch Form */}
    <GetinTouchUiversity />
    
    {/* 🎯 Featured Universities - Get In Touch ke neeche */}
    <div className="mt-1">
      <FeaturedUniversities />
    </div>
    
    {/* University Courses Card */}
    <div className="mt-10">
    <UniversityCoursesCard />
    </div>
  </div>
)}
        </div>
      )}

    </>
  );
};

export default UniversityDetailPage;

