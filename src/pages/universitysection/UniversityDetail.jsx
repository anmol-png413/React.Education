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
            return `https://www.educationmalaysia.in/${cleaned}`;
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

        // Merge fetched data with selected photos (fallback to static) and offered courses
        const mergedData = {
          ...fetchedData,
          photos: bestFive.length > 0 ? bestFive : STATIC_PHOTOS,
          offeredCourses: STATIC_OFFERED_COURSES,
        };
        setUniversityData(mergedData);
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
    
         <div className="min-h-screen bg-gray-50">
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
              <div className="flex items-center gap-1.5 mt-1">
                <FaMapMarkerAlt className="text-blue-500 text-xs" />
                <span className="text-blue-600 font-medium text-sm">
                  Location: {universityData.city}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-blue-700 text-white px-2 py-1 rounded-full font-medium text-xs">
                  {universityData.inst_type}
                </span>
                <div className="flex items-center gap-1 text-gray-600 text-xs">
                  <span className="font-medium">SETARA:</span>
                  <div className="flex items-center">
                    {[1, 2, 3].map((i) => <FaStar key={i} className="text-yellow-400" />)}
                    {[4, 5].map((i) => <FaStar key={i} className="text-gray-300" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Image */}
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
          <div className="grid grid-cols-2 gap-3 mb-4">
             <button  onClick={handleClick }
                className="w-full bg-blue-50 text-blue-700 px-4 py-2.5 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <FaLocationArrow /> Get Direction
            </button>
            <button className="w-full bg-blue-50 text-blue-700 px-4 py-2.5 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <FaEye /> View Photos
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Detail Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl shadow-sm p-3 flex flex-col items-center text-center">
              <BsCalendar3 className="text-xl text-blue-600" />
              <h3 className="text-md font-bold mt-1.5">{universityData.established || "1970"}</h3>
              <p className="text-gray-500 text-xs">Established</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-3 flex flex-col items-center text-center">
              <FaGraduationCap className="text-xl text-green-600" />
              <h3 className="text-md font-bold mt-1.5">{universityData.Scholarship ? "Yes" : "No"}</h3>
              <p className="text-gray-500 text-xs">Scholarship</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-3 flex flex-col items-center text-center">
              <FaEye className="text-xl text-purple-600" />
              <h3 className="text-md font-bold mt-1.5">{universityData.views || "1.2k"}</h3>
              <p className="text-gray-500 text-xs">Views</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-3 flex flex-col items-center text-center">
              <FaSchool className="text-xl text-orange-600" />
              <h3 className="text-md font-bold mt-1.5">{universityData.courses || "40"}</h3>
              <p className="text-gray-500 text-xs">Courses</p>
            </div>
          </div>

          {/* Global Rankings */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Global Rankings</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg p-4 text-white shadow">
                <p className="text-xl font-bold">#{universityData.rank || "28"}</p>
                <p className="text-xs opacity-90">in World</p>
              </div>
              <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg p-4 text-white shadow">
                <p className="text-xl font-bold">#{universityData.qs_rank || "181"}</p>
                <p className="text-xs opacity-90">in Malaysia</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Downloads & Reviews</h3>
            <button onClick={() => setIsOpen(true)} className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
              <FaDownload /> Download Brochure
            </button>
            <button onClick={() => setIsOpen(true)} className="w-full bg-gray-100 border border-gray-300 text-gray-800 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
              <FaFileAlt /> Download Fees Structure
            </button>
            <Link to="/write-a-review" className="w-full">
              <button className="w-full bg-gray-100 border border-gray-300 text-gray-800 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <FaEdit /> Write a review
              </button>
            </Link>
          </div>
          <PopupForm isOpen={isOpen} onClose={() => setIsOpen(false)} universityData={universityData} />
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
                 <div className="flex-1">
                   <h1 className="text-lg font-bold text-gray-900 mb-1">
                     {universityData.name}
                   </h1>
                   <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-600">
                     <div className="flex items-center gap-1">
                       <FaMapMarkerAlt className="text-blue-500" />
                       <span className="text-blue-600 font-medium">
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

               {/* Desktop Detail Block */}
               <div className="grid grid-cols-3 gap-4 sm:gap-6 text-sm w-auto">
                 {/* Type + Ranking */}
                 <div className="flex flex-col gap-1 items-start text-left">
                   <div className="flex items-center gap-2">
                     <span className="text-gray-600 text-sm">Type</span>
                     <span className="bg-blue-700 text-white px-2 py-1 rounded-full font-medium text-sm">
                       {universityData.inst_type}
                     </span>
                   </div>
                   <div className="flex items-center gap-1 text-gray-600 text-sm">
                     <span className="font-lg">SETARA Ranking:</span>
                     {[1, 2, 3].map((i) => (
                       <FaStar key={i} className="text-yellow-400 text-sm" />
                     ))}
                     {[4, 5].map((i) => (
                       <FaStar key={i} className="text-black text-sm" />
                     ))}
                   </div>
                 </div>

                 {/* Featured + MQA */}
                 <div className="flex flex-col gap-1 items-start text-left">
                   <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium gap-2 text-sm">
                     <div className="w-1 h-1 bg-blue-950 rounded-full " />
                     <div className="animate-pulse">
                       Featured
                     </div>
                   </div>
                   <div className="text-gray-600 text-sm">
                     Approved By : <span className="font-medium">MQA</span>
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
      <div className="col-span-2 space-y-6">

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
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="text-base font-semibold mb-4">Study Options</h2>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Study Online", bg: "bg-green-50", border: "border-green-200", text: "text-green-700", icon: "text-green-500" },
              { label: "Part Time", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", icon: "text-blue-500" },
              { label: "Full Time", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", icon: "text-purple-500" },
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
          </div>
        </div>
    



           {/* Added Facilities section */}
<div className="mt-6 bg-white rounded-2xl shadow-md border border-gray-100 p-5 w-full">
  <h3 className="text-md font-bold text-gray-900 mb-4">Facilities:</h3>
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
          <Link to="/write-a-review" className="w-full">
            <button className="w-full bg-gray-100 border border-gray-300 text-gray-800 px-5 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
              <FaEdit className="text-base" />
              Write a review
            </button>
          </Link>
          
        </div>
        {/* Global Rankings */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Global Rankings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg p-5 text-white shadow">
              <p className="text-2xl font-bold">
                #{universityData.rank || "28"}
              </p>
              <p className="text-sm opacity-90">in World</p>
            </div>
            <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg p-5 text-white shadow">
              <p className="text-2xl font-bold">
                #{universityData.qs_rank || "181"}
              </p>
              <p className="text-sm opacity-90">in Malaysia</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
              View ranking details
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <PopupForm isOpen={isOpen} onClose={() => setIsOpen(false)}  universityData={universityData} />
      </div>
      
    </div>
  </div>
</div>
           </div>
         </div>
     

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
          {activeTab !== "courses" &&   (
            <div>

              <GetinTouchUiversity/>
               <UniversityCoursesCard />
            </div>
          )}
        </div>
      )}

    </>
  );
};

export default UniversityDetailPage;
