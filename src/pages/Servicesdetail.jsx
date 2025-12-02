
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import GetInTouchForm from '../components/GetInTouchForm';
// import OtherServicesBox from '../components/OtherFeatures';
// import TrendingCourse2 from "../components/TrandingCourse2";
// import UniversityBox from '../components/FeaturedUniversities';
// import api from '../api';
// import { Helmet } from "react-helmet";
// import { GraduationCap, MapPin, FileText, Globe, CheckCircle } from 'lucide-react';

// // ---------------------- Skeleton Loader ----------------------
// const ServiceDetailSkeleton = () => (
//   <section className="bg-gradient-to-b from-blue-50 to-white py-8 px-4 md:px-8 animate-pulse">
//     <div className="max-w-7xl mx-auto md:grid md:grid-cols-12 gap-6 flex flex-col relative">
//       <aside className="md:col-span-4 md:block">
//         <div className="space-y-6">
//           <div className="bg-white rounded-2xl shadow p-6">
//             <div className="h-6 bg-gray-200 rounded-md w-1/2 mb-5"></div>
//             <div className="space-y-3">
//               <div className="h-8 bg-gray-200 rounded-lg"></div>
//               <div className="h-8 bg-gray-200 rounded-lg"></div>
//               <div className="h-8 bg-gray-200 rounded-lg"></div>
//             </div>
//           </div>
//           <div className="bg-white rounded-2xl shadow p-6">
//             <div className="h-6 bg-gray-200 rounded-md w-1/2 mb-5"></div>
//             <div className="space-y-3">
//               <div className="h-8 bg-gray-200 rounded-lg"></div>
//               <div className="h-8 bg-gray-200 rounded-lg"></div>
//             </div>
//           </div>
//         </div>
//       </aside>

//       <main className="md:col-span-8 space-y-8 mt-6 md:mt-0">
//         <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-blue-100">
//           <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-4"></div>
//           <div className="h-8 bg-gray-200 rounded-md w-1/2 mb-6"></div>
//           <div className="w-full h-80 bg-gray-200 rounded-xl mb-6"></div>
//           <div className="flex flex-wrap gap-2 mb-4">
//             <div className="h-10 bg-gray-200 rounded-full w-24"></div>
//             <div className="h-10 bg-gray-200 rounded-full w-32"></div>
//             <div className="h-10 bg-gray-200 rounded-full w-28"></div>
//           </div>
//           <div className="space-y-4">
//             <div className="h-4 bg-gray-200 rounded-md w-full"></div>
//             <div className="h-4 bg-gray-200 rounded-md w-full"></div>
//             <div className="h-4 bg-gray-200 rounded-md w-11/12"></div>
//             <div className="h-4 bg-gray-200 rounded-md w-full"></div>
//           </div>
//         </div>
//       </main>
//     </div>
//   </section>
// );

// // ---------------------- Main Component ----------------------
// const ServiceDetail = () => {
//   const { slug } = useParams();
//   const [service, setService] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState(0);
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [seo, setSeo] = useState({});
//   const [contentTab, setContentTab] = useState('documents');

//   const toggleSidebar = () => setShowSidebar(!showSidebar);
//   const closeSidebar = () => setShowSidebar(false);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });

//     const fetchService = async () => {
//       try {
//         const res = await api.get(`/service-details/${slug}`);
//         const serviceData = res?.data?.data?.service;
//         setSeo(res.data.data?.seo || {});
//         setService(serviceData);
//       } catch (error) {
//         console.error("Error fetching service details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchService();
//   }, [slug]);

//   if (loading) {
//     return <ServiceDetailSkeleton />;
//   }

//   if (!service) {
//     return <div className="text-center text-red-500 mt-10">Service not found.</div>;
//   }

//   // ✅ YAHAN CHANGE HAI - Ab har service ke liye tabs show honge agar 3+ contents hain
//   const showEnhancedTabs = service.contents?.length >= 3;

//   return (
//     <>
//       {/* 🔹 SEO Meta Tags */}
//       <Helmet>
//         <title>{seo?.meta_title}</title>
//         <meta name="title" content={seo?.meta_title} />
//         <meta name="description" content={seo?.meta_description} />
//         <meta name="keywords" content={seo?.meta_keyword} />
//         <meta name="robots" content={seo?.robots || "index, follow"} />
//         {seo?.page_url && <link rel="canonical" href={seo?.page_url} />}
//         <meta property="og:title" content={seo?.meta_title} />
//         <meta property="og:description" content={seo?.meta_description} />
//         <meta property="og:image" content={seo?.og_image_path} />
//         <meta property="og:url" content={seo?.page_url} />
//         <meta property="og:site_name" content={seo?.site_name || "Study in Malaysia"} />
//         <meta property="og:type" content={seo?.og_type || "website"} />
//         <meta property="og:locale" content={seo?.og_locale || "en_US"} />
//         {seo?.seo_rating && <meta name="seo:rating" content={seo?.seo_rating} />}
//         {seo?.seo_rating_schema && (
//           <script type="application/ld+json">
//             {JSON.stringify(seo.seo_rating_schema)}
//           </script>
//         )}
//       </Helmet>
// {/* 🔹 HERO SECTION - MOBILE OPTIMIZED */}
// <section className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white overflow-hidden">
//   <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>

//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 relative">
//     <div className="text-center">
//       <div className="flex justify-center mb-4 sm:mb-6">
//         <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-2xl">
//           <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16" />
//         </div>
//       </div>

//       <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 tracking-tight px-4">
//         {service?.page_name || "Service Details"}
//       </h1>

//       <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
//         <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
//         <p className="text-lg sm:text-xl md:text-2xl text-emerald-100">2025 Edition</p>
//       </div>

//       {service?.headline && (
//         <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
//           {service.headline}
//         </p>
//       )}
//     </div>
//   </div>

//   <div className="absolute bottom-0 left-0 right-0">
//     <svg viewBox="0 0 1440 60" className="w-full h-6 sm:h-8 md:h-12 fill-slate-50">
//       <path d="M0,30 Q360,0 720,30 T1440,30 L1440,60 L0,60 Z"></path>
//     </svg>
//   </div>
// </section>
//      {/* 🔹 TAB NAVIGATION - MOBILE RESPONSIVE */}
// {showEnhancedTabs && (
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
//     <div className="bg-white rounded-xl shadow-lg p-2 sm:p-3">
//       {/* Mobile: Stacked Vertical Tabs */}
//       <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
//         <button
//           onClick={() => setContentTab('documents')}
//           className={`flex items-center justify-center sm:justify-start space-x-2 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base ${
//             contentTab === 'documents'
//               ? 'bg-blue-600 text-white shadow-md'
//               : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
//           }`}
//         >
//           <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
//           <span>Required Documents</span>
//         </button>
        
//         <button
//           onClick={() => setContentTab('additional')}
//           className={`flex items-center justify-center sm:justify-start space-x-2 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base ${
//             contentTab === 'additional'
//               ? 'bg-blue-600 text-white shadow-md'
//               : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
//           }`}
//         >
//           <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
//           <span>Additional Info</span>
//         </button>
        
//         <button
//           onClick={() => setContentTab('checklist')}
//           className={`flex items-center justify-center sm:justify-start space-x-2 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base ${
//             contentTab === 'checklist'
//               ? 'bg-emerald-600 text-white shadow-md'
//               : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
//           }`}
//         >
//           <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
//           <span>Checklist</span>
//         </button>
//       </div>
//     </div>
//   </div>
// )}
//       {/* 🔹 SERVICE DETAIL SECTION */}
//       <section className="bg-gradient-to-b from-blue-50 to-white py-8 px-4 md:px-8">
//         <div className="max-w-7xl mx-auto md:grid md:grid-cols-12 gap-6 flex flex-col relative">
//           {/* Mobile Toggle */}
//         {/* Mobile Toggle - IMPROVED */}
// <button
//   onClick={toggleSidebar}
//   className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center gap-2"
// >
//   <span className="text-xl">📂</span>
//   <span className="font-semibold">
//     {showSidebar ? "Close" : "Services"}
//   </span>
// </button>

//           {showSidebar && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={closeSidebar} />
//           )}

//           {/* Sidebar */}
//           <aside
//             className={`md:col-span-4 fixed md:static top-0 right-0 z-40 h-full md:h-fit w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 overflow-y-auto shadow-lg md:shadow-none transition-transform transform ${
//               showSidebar ? "translate-x-0" : "translate-x-full"
//             } md:translate-x-0 md:block`}
//           >
//             <div className="flex justify-end mb-4 md:hidden">
//               <button
//                 onClick={closeSidebar}
//                 className="text-xl text-gray-600 hover:text-red-500"
//               >
//                 ❌ close sidebar
//               </button>
//             </div>
//             <div className="space-y-6">
//               <OtherServicesBox />
//               <GetInTouchForm />
//               <TrendingCourse2 />
//               <UniversityBox />
//             </div>
//           </aside>

//           {/* Main Content */}
//         <main className="md:col-span-8 space-y-6 sm:space-y-8 mt-6 md:mt-0">
//   <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-6 md:p-8 border border-blue-100 transition hover:shadow-blue-200 duration-300">
//     {service.thumbnail_path && (
//       <img
//         src={`https://www.educationmalaysia.in/storage/${service.thumbnail_path}`}
//         alt={service.page_name}
//         className="w-full h-48 sm:h-60 md:h-80 object-cover rounded-lg sm:rounded-xl mb-4 sm:mb-6"
//       />
//     )}


//               {service.contents?.length > 0 && (
//                 <div>
//                   {showEnhancedTabs ? (
//                     <>
//                       {/* ✅ Enhanced tabs ke liye content */}
//                       {contentTab === 'documents' && (
//                         <div
//                           className="prose max-w-none prose-blue text-gray-800"
//                           dangerouslySetInnerHTML={{
//                             __html: service.contents[0].tab_content,
//                           }}
//                         />
//                       )}
//                       {contentTab === 'additional' && (
//                         <div
//                           className="prose max-w-none prose-blue text-gray-800"
//                           dangerouslySetInnerHTML={{
//                             __html: service.contents[1].tab_content,
//                           }}
//                         />
//                       )}
//                       {contentTab === 'checklist' && (
//                         <div
//                           className="prose max-w-none prose-blue text-gray-800"
//                           dangerouslySetInnerHTML={{
//                             __html: service.contents[2].tab_content,
//                           }}
//                         />
//                       )}
//                     </>
//                   ) : (
//                     <>
//                       {/* Original tab navigation for services with less than 3 tabs */}
//                      {/* Original tab navigation - RESPONSIVE VERSION */}
// <div className="overflow-x-auto -mx-4 px-4 pb-2">
//   <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap mb-4">
//     {service.contents.map((item, index) => (
//       <button
//         key={index}
//         onClick={() => setActiveTab(index)}
//         className={`px-3 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
//           activeTab === index
//             ? "bg-blue-600 text-white shadow-md"
//             : "bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
//         }`}
//       >
//         {item.tab_title.length > 40
//           ? item.tab_title.slice(0, 40) + "..."
//           : item.tab_title}
//       </button>
//     ))}
//   </div>
// </div>

//                       <div
//                         className="prose max-w-none prose-blue text-gray-800"
//                         dangerouslySetInnerHTML={{
//                           __html: service.contents[activeTab].tab_content,
//                         }}
//                       />
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </main>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ServiceDetail;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GetInTouchForm from '../components/GetInTouchForm';
import OtherServicesBox from '../components/OtherFeatures';
import TrendingCourse2 from "../components/TrandingCourse2";
import UniversityBox from '../components/FeaturedUniversities';
import api from '../api';
import { Helmet } from "react-helmet";
import { GraduationCap, MapPin, FileText, Globe, CheckCircle } from 'lucide-react';

// ---------------------- Skeleton Loader ----------------------
const ServiceDetailSkeleton = () => (
  <section className="bg-gradient-to-b from-blue-50 to-white py-8 px-4 md:px-8 animate-pulse">
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Mobile-friendly skeleton */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded-md w-1/2 mb-6"></div>
        <div className="w-full h-60 bg-gray-200 rounded-xl mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded-md w-full"></div>
          <div className="h-4 bg-gray-200 rounded-md w-full"></div>
          <div className="h-4 bg-gray-200 rounded-md w-11/12"></div>
        </div>
      </div>
    </div>
  </section>
);

// ---------------------- Main Component ----------------------
const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [seo, setSeo] = useState({});
  const [contentTab, setContentTab] = useState('documents');

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeSidebar = () => setShowSidebar(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchService = async () => {
      try {
        const res = await api.get(`/service-details/${slug}`);
        const serviceData = res?.data?.data?.service;
        setSeo(res.data.data?.seo || {});
        setService(serviceData);
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (loading) {
    return <ServiceDetailSkeleton />;
  }

  if (!service) {
    return <div className="text-center text-red-500 mt-10 p-4">Service not found.</div>;
  }

  const showEnhancedTabs = service.contents?.length >= 3;

  return (
    <>
      {/* 🔹 SEO Meta Tags */}
      <Helmet>
        <title>{seo?.meta_title}</title>
        <meta name="title" content={seo?.meta_title} />
        <meta name="description" content={seo?.meta_description} />
        <meta name="keywords" content={seo?.meta_keyword} />
        <meta name="robots" content={seo?.robots || "index, follow"} />
        {seo?.page_url && <link rel="canonical" href={seo?.page_url} />}
        <meta property="og:title" content={seo?.meta_title} />
        <meta property="og:description" content={seo?.meta_description} />
        <meta property="og:image" content={seo?.og_image_path} />
        <meta property="og:url" content={seo?.page_url} />
        <meta property="og:site_name" content={seo?.site_name || "Study in Malaysia"} />
        <meta property="og:type" content={seo?.og_type || "website"} />
        <meta property="og:locale" content={seo?.og_locale || "en_US"} />
        {seo?.seo_rating && <meta name="seo:rating" content={seo?.seo_rating} />}
        {seo?.seo_rating_schema && (
          <script type="application/ld+json">
            {JSON.stringify(seo.seo_rating_schema)}
          </script>
        )}
      </Helmet>

      {/* 🔹 HERO SECTION - FULLY RESPONSIVE */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-10">
          <div className="text-center">
            {/* Icon */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-2xl">
                <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-tight px-2">
              {service?.page_name || "Service Details"}
            </h1>

            {/* Edition Badge */}
            <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <p className="text-base sm:text-lg md:text-xl text-emerald-100">2025 Edition</p>
            </div>

            {/* Headline */}
            {service?.headline && (
              <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
                {service.headline}
              </p>
            )}
          </div>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-6 sm:h-8 md:h-12 fill-white">
            <path d="M0,30 Q360,0 720,30 T1440,30 L1440,60 L0,60 Z"></path>
          </svg>
        </div>
      </section>

      {/* 🔹 TAB NAVIGATION - MOBILE RESPONSIVE */}
      {showEnhancedTabs && (
        <div className="bg-white  top-0 z-20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setContentTab('documents')}
                className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                  contentTab === 'documents'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Required Documents</span>
              </button>
              
              <button
                onClick={() => setContentTab('additional')}
                className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                  contentTab === 'additional'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Additional Info</span>
              </button>
              
              <button
                onClick={() => setContentTab('checklist')}
                className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                  contentTab === 'checklist'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Checklist</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 SERVICE DETAIL SECTION - MOBILE FIRST */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="md:hidden w-full bg-blue-600 text-white py-3 px-4 rounded-lg mb-4 font-semibold shadow-md"
          >
            {showSidebar ? "✕ Close Menu" : "📂 View Other Services"}
          </button>

          {/* Layout Grid */}
          <div className="md:grid md:grid-cols-12 md:gap-6 space-y-6 md:space-y-0">
            {/* Sidebar Overlay for Mobile */}
            {showSidebar && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
                onClick={closeSidebar} 
              />
            )}

            {/* Sidebar */}
            <aside
              className={`
                md:col-span-4 
                fixed md:static 
                top-0 right-0 
                z-50 md:z-auto
                h-full md:h-auto
                w-80 md:w-auto
                bg-white 
                p-4 md:p-0
                overflow-y-auto
                shadow-2xl md:shadow-none
                transition-transform duration-300
                ${showSidebar ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
              `}
            >
              {/* Close button for mobile */}
              <button
                onClick={closeSidebar}
                className="md:hidden absolute top-4 right-4 text-2xl text-gray-600 hover:text-red-500"
              >
                ✕
              </button>

              <div className="space-y-6 mt-12 md:mt-0">
                <OtherServicesBox />
                <GetInTouchForm />
                <TrendingCourse2 />
                <UniversityBox />
              </div>
            </aside>

            {/* Main Content */}
            <main className="md:col-span-8">
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-blue-100">
                {/* Thumbnail */}
                {service.thumbnail_path && (
                  <img
                    src={`https://www.educationmalaysia.in/storage/${service.thumbnail_path}`}
                    alt={service.page_name}
                    className="w-full h-48 sm:h-60 md:h-80 object-cover rounded-xl mb-6"
                  />
                )}

                {/* Content */}
                {service.contents?.length > 0 && (
                  <div className="prose prose-sm sm:prose max-w-none">
                    {showEnhancedTabs ? (
                      <>
                        {contentTab === 'documents' && (
                          <div dangerouslySetInnerHTML={{ __html: service.contents[0].tab_content }} />
                        )}
                        {contentTab === 'additional' && (
                          <div dangerouslySetInnerHTML={{ __html: service.contents[1].tab_content }} />
                        )}
                        {contentTab === 'checklist' && (
                          <div dangerouslySetInnerHTML={{ __html: service.contents[2].tab_content }} />
                        )}
                      </>
                    ) : (
                      <>
                        {/* Original tabs - Mobile Scrollable */}
                        <div className="overflow-x-auto -mx-4 px-4 mb-4">
                          <div className="flex gap-2 min-w-max pb-2">
                            {service.contents.map((item, index) => (
                              <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition ${
                                  activeTab === index
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                                }`}
                              >
                                {item.tab_title.length > 40
                                  ? item.tab_title.slice(0, 40) + "..."
                                  : item.tab_title}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div dangerouslySetInnerHTML={{ __html: service.contents[activeTab].tab_content }} />
                      </>
                    )}
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;