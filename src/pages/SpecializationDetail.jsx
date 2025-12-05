

// // // import React, { useRef, useEffect, useState } from "react";
// // // import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
// // // import { 
// // //   Home, Layers, Info, Clock, DollarSign, Briefcase, Share2, 
// // //   ArrowLeft, Star, MapPin, Users, BookOpen, CheckCircle, 
// // //   Award, TrendingUp, Building2, Target, Lightbulb, 
// // //   ChevronRight, GraduationCap, FileText, Calendar, Globe
// // // } from "lucide-react";
// // // import { motion } from "framer-motion";
// // // import api from "../api";
// // // import GetInTouchForm from "../components/GetInTouchForm";
// // // import FeaturedUniversities from "../components/FeaturedUniversities";
// // // import TrendingCourse2 from "../components/TrandingCourse2";
// // // import UniversityCard from "../components/UniversityCard";
// // // import { Helmet } from "react-helmet";

// // // const tabIcons = {
// // //   "About Course": <Info size={16} />,
// // //   "Duration": <Clock size={16} />,
// // //   "Cost": <DollarSign size={16} />,
// // //   "Career": <Briefcase size={16} />,
// // //   "Branches": <Share2 size={16} />,
// // //   "Entry Requirement": <FileText size={16} />,
// // // };const formatHTML = (html) => {
// // //   if (!html) return "";
  
// // //   const textarea = document.createElement("textarea");
// // //   textarea.innerHTML = html;
// // //   let decoded = textarea.value;
  
// // //   // Clean spans and inline styles
// // //   decoded = decoded.replace(/<span[^>]*>/gi, "").replace(/<\/span>/gi, "");
// // //   decoded = decoded.replace(/style="[^"]*"/gi, "").replace(/&nbsp;/gi, " ");
  
// // //   // 🎯 TABLE PROCESSING
// // //   decoded = decoded.replace(
// // //     /<table[^>]*>/gi, 
// // //     '<div class="overflow-x-auto my-6 rounded-xl shadow-lg"><table class="min-w-full border-collapse bg-white border border-gray-200">'
// // //   );
// // //   decoded = decoded.replace(/<\/table>/gi, '</table></div>');
  
// // //   if (!decoded.includes('<thead')) {
// // //     decoded = decoded.replace(
// // //       /(<table[^>]*>)\s*(<tr[^>]*>)/i,
// // //       '$1<thead class="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">$2'
// // //     );
// // //     let firstTrEnd = decoded.indexOf('</tr>');
// // //     if (firstTrEnd !== -1) {
// // //       decoded = decoded.substring(0, firstTrEnd + 5) + '</thead><tbody class="divide-y divide-gray-200">' + decoded.substring(firstTrEnd + 5);
// // //     }
// // //     decoded = decoded.replace(/<\/table>/i, '</tbody></table>');
// // //   } else {
// // //     decoded = decoded.replace(/<thead[^>]*>/gi, '<thead class="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">');
// // //     decoded = decoded.replace(/<tbody[^>]*>/gi, '<tbody class="divide-y divide-gray-200">');
// // //   }
  
// // //   decoded = decoded.replace(/<th([^>]*)>/gi, '<th$1 class="px-6 py-4 text-left text-sm font-bold text-white bg-blue-700 uppercase tracking-wider border border-white/20 whitespace-nowrap align-middle">');
// // //   decoded = decoded.replace(/<tr([^>]*)>/gi, '<tr$1 class="hover:bg-blue-50 transition-colors duration-150">');
// // //   decoded = decoded.replace(/<td([^>]*)>/gi, '<td$1 class="px-6 py-4 text-sm text-gray-900 border border-gray-200 align-middle">');
// // //   decoded = decoded.replace(/<th([^>]*)><\/th>/gi, '<th$1>&nbsp;</th>');
// // //   decoded = decoded.replace(/<td([^>]*)><\/td>/gi, '<td$1>&nbsp;</td>');
  
// // //   // 🎯 ANCHOR/LINK STYLING - FIX LINKS
// // //   decoded = decoded.replace(/<a\s+/gi, '<a class="text-blue-600 hover:text-blue-800 underline font-medium transition-colors" ');
  
// // //   // 🎯 LIST STYLING - FIX BULLETS & NUMBERS
// // //   decoded = decoded.replace(/<ul>/gi, '<ul class="space-y-2 my-4 pl-6">');
// // //   decoded = decoded.replace(/<ol>/gi, '<ol class="space-y-2 my-4 pl-6">');
// // //   decoded = decoded.replace(/<li>/gi, '<li class="text-gray-700 leading-relaxed relative pl-2" style="display: list-item; list-style-position: outside;">');
  
// // //   // Apply bullet/number styles to ul/ol
// // //   decoded = decoded.replace(/<ul class="space-y-2 my-4 pl-6">/gi, '<ul class="space-y-2 my-4 pl-6" style="list-style-type: disc;">');
// // //   decoded = decoded.replace(/<ol class="space-y-2 my-4 pl-6">/gi, '<ol class="space-y-2 my-4 pl-6" style="list-style-type: decimal;">');
  

// // // // Common heading keywords
// // // decoded = decoded.replace(/^(Career Opportunities?|Key Features?|Admission Process|Entry Requirements?|Top Universities|Specializations?|Application|Coverage|Eligibility|Support|Description|Availability|Examples|Duration|Overview|Aerodynamics Engineering|Propulsion Systems Engineering|Aerospace Structures Engineering|Aeronautical Engineering|Aircraft Engineering):?\s*$/gim, '<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4 block" style="display: block !important;">$1</h3>');

// // // // Convert bold standalone lines to headings
// // // decoded = decoded.replace(/<p[^>]*>\s*<strong>([A-Z][^<]+)<\/strong>\s*<\/p>/gi, '<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4 block" style="display: block !important;">$1</h3>');
  
// // //   // 🎯 PARAGRAPH STYLING
// // //   decoded = decoded.replace(/<p>/gi, '<p class="mb-4 text-gray-700 leading-relaxed">');
  
// // //   // Clean up
// // //   decoded = decoded.replace(/\n{3,}/g, '\n\n');
// // //   decoded = decoded.replace(/<p[^>]*>\s*<\/p>/g, '');
  
// // //   return decoded;
// // // };


// // // const detectCategoryFromSlug = (slug, name) => {
// // //   const lowerSlug = slug?.toLowerCase() || '';
// // //   const lowerName = name?.toLowerCase() || '';
  
// // //   if (lowerSlug.includes('engineer') || lowerName.includes('engineer')) return 'Engineering';
// // //   if (lowerSlug.includes('computer') || lowerSlug.includes('software') || lowerSlug.includes('it') || lowerSlug.includes('technology') || lowerSlug.includes('cyber') || lowerSlug.includes('data') || lowerName.includes('computer') || lowerName.includes('software')) return 'Technology & IT';
// // //   if (lowerSlug.includes('medic') || lowerSlug.includes('health') || lowerSlug.includes('nurs') || lowerSlug.includes('pharmac') || lowerSlug.includes('dent') || lowerName.includes('medical')) return 'Medical & Health';
// // //   if (lowerSlug.includes('business') || lowerSlug.includes('management') || lowerSlug.includes('accounting') || lowerSlug.includes('finance') || lowerSlug.includes('marketing') || lowerSlug.includes('entrepreneur') || lowerSlug.includes('banking') || lowerSlug.includes('human-resource') || lowerSlug.includes('hrm') || lowerSlug.includes('supply-chain') || lowerName.includes('business') || lowerName.includes('accounting')) return 'Business & Management';
// // //   if (lowerSlug.includes('science') || lowerSlug.includes('biology') || lowerSlug.includes('chemistry') || lowerSlug.includes('physics') || lowerSlug.includes('biotechnology') || lowerSlug.includes('agriculture') || lowerSlug.includes('actuarial') || lowerName.includes('science')) return 'Science';
// // //   if (lowerSlug.includes('art') || lowerSlug.includes('design') || lowerSlug.includes('graphic') || lowerSlug.includes('fashion') || lowerSlug.includes('interior') || lowerSlug.includes('architecture') || lowerName.includes('design') || lowerName.includes('art')) return 'Arts & Design';
// // //   if (lowerSlug.includes('social') || lowerSlug.includes('psychology') || lowerSlug.includes('sociology') || lowerSlug.includes('education') || lowerSlug.includes('law') || lowerSlug.includes('political') || lowerName.includes('social') || lowerName.includes('law')) return 'Social Sciences';
// // //   if (lowerSlug.includes('math') || lowerSlug.includes('statistic') || lowerName.includes('math') || lowerName.includes('statistic')) return 'Mathematics';
  
// // //   return 'General';
// // // };

// // // const getCategoryImage = (category) => {
// // //   const categoryImages = {
// // //     'Engineering': 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1200',
// // //     'Technology & IT': 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200',
// // //     'Medical & Health': 'https://images.pexels.com/photos/356054/pexels-photo-356054.jpeg?auto=compress&cs=tinysrgb&w=1200',
// // //     'Business & Management': 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
// // //     'Science': 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1200',
// // //     'Arts & Design': 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
// // //     'Social Sciences': 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1200',
// // //     'Mathematics': 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
// // //     'General': 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800'
// // //   };
  
// // //   return categoryImages[category] || categoryImages['General'];
// // // };

// // // const SpecializationDetail = () => {
// // //  const { name, level, nameWithLevel } = useParams();

// // // // Extract name and level from combined slug
// // // let slug, selectedLevelFromUrl;

// // // if (nameWithLevel) {
// // //   // New format: accounting-diploma
// // //   const parts = nameWithLevel.split('-');
// // //   const lastPart = parts[parts.length - 1];
  
// // //   // Check if last part is a valid level
// // //   const validLevels = ['diploma', 'undergraduate', 'postgraduate', 'phd', 'certificate'];
  
// // //   if (validLevels.includes(lastPart)) {
// // //     selectedLevelFromUrl = lastPart;
// // //     slug = parts.slice(0, -1).join('-'); // accounting
// // //   } else {
// // //     slug = nameWithLevel; // No level specified
// // //     selectedLevelFromUrl = null;
// // //   }
// // // } else {
// // //   // Old format fallback: name/level
// // //   slug = name?.toLowerCase();
// // //   selectedLevelFromUrl = level;
// // // }

// // // const formattedName = slug ? slug.split("-").map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(" ") : "Course";

// // //   const thumbnailFromState = location.state?.thumbnail;

// // //   const [selectedLevel, setSelectedLevel] = useState(selectedLevelFromUrl || 'undergraduate');
// // //   const [tabs, setTabs] = useState([]);
// // //   const [activeTab, setActiveTab] = useState(null);
// // //   const [contentMap, setContentMap] = useState({});
// // //   const [faqs, setFaqs] = useState([]);
// // //   const [seo, setSeo] = useState({});
// // //   const [categoryData, setCategoryData] = useState(null);
// // //   const [relatedUniversities, setRelatedUniversities] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [educationLevels, setEducationLevels] = useState({});
// // //   const sectionRefs = useRef({});
// // // useEffect(() => {
// // //   const fetchData = async () => {
// // //     if (!slug) {
// // //       setError("Invalid URL - No course name provided");
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     try {
// // //       setLoading(true);
      
// // //       const res = await api.get(`/specialization-detail-by-slug/${slug}`);
      
// // //       // ✅ CORRECT FIX: Handle actual API response structure
// // //       const category = res?.data?.data?.specialization || res?.data?.specialization || res?.data?.category || res?.data;
      
// // //       if (!category || !category.name) {
// // //         throw new Error("Course not found. This specialization may not exist or the slug might be incorrect.");
// // //       }
      
// // //       const contents = category?.contents || [];
      
// // //       setCategoryData(category);
// // //       setSeo(res.data?.seo || res.data?.data?.seo || category?.seo || {});
// // //       setRelatedUniversities(res.data?.related_universities || res.data?.data?.related_universities || category?.related_universities || []);
      
// // //       setEducationLevels({
// // //         diploma: { title: 'Diploma', duration: '2.5 Years', fees: 'RM 18,000/year', intake: 'January, April, August', accreditation: 'MQA Approved' },
// // //         undergraduate: { title: 'Undergraduate', duration: '4 Years', fees: 'RM 35,000/year', intake: 'February, July, September', accreditation: 'EAC Accredited' },
// // //         postgraduate: { title: 'Postgraduate', duration: '1.5-2 Years', fees: 'RM 42,000/year', intake: 'February, September', accreditation: 'MQA Accredited' },
// // //         phd: { title: 'PhD', duration: '3-4 Years', fees: 'RM 38,000/year', intake: 'Throughout the year', accreditation: 'MQA Accredited' },
// // //         certificate: { title: 'Certificates', duration: '3-6 Months', fees: 'RM 5,000-12,000', intake: 'Multiple intakes', accreditation: 'Professional Bodies' }
// // //       });
      
// // //       const map = {};
// // //       const dynamicTabs = [];
// // //       contents.forEach((c) => {
// // //         if(c.tab && c.description){
// // //           map[c.tab] = c.description;
// // //           dynamicTabs.push({ 
// // //             name: c.tab, 
// // //             icon: tabIcons[c.tab] || <Info size={16}/> 
// // //           });
// // //           sectionRefs.current[c.tab] = React.createRef();
// // //         }
// // //       });
      
// // //       setContentMap(map);
// // //       setTabs(dynamicTabs);
// // //       setActiveTab(dynamicTabs[0]?.name || "");
// // //       setFaqs(category?.faqs || res.data?.faqs || []);
// // //       setLoading(false);
// // //     } catch(e) { 
// // //       let errorMessage = "Failed to load course data";
      
// // //       if (e.response?.status === 404) {
// // //         errorMessage = `Course "${formattedName}" not found. Please check if this specialization exists in the system.`;
// // //       } else if (e.response?.data?.message) {
// // //         errorMessage = e.response.data.message;
// // //       } else if (e.message) {
// // //         errorMessage = e.message;
// // //       }
      
// // //       setError(errorMessage);
// // //       setLoading(false);
// // //     }
// // //   };
  
// // //   fetchData();
// // // }, [slug, formattedName]);
// // // useEffect(() => {
// // //   if (selectedLevelFromUrl && educationLevels[selectedLevelFromUrl]) {
// // //     setSelectedLevel(selectedLevelFromUrl);
// // //   } else if (!selectedLevelFromUrl) {
// // //     setSelectedLevel('undergraduate');
// // //   }
// // // }, [selectedLevelFromUrl, educationLevels]);

// // //   const handleTabClick = (tabName) => {
// // //     setActiveTab(tabName);
// // //     sectionRefs.current[tabName]?.current?.scrollIntoView({ 
// // //       behavior:"smooth", 
// // //       block:"start"
// // //     });
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
// // //           <p className="mt-4 text-gray-600 font-medium">Loading {formattedName}...</p>
// // //           <p className="mt-2 text-sm text-gray-500">Fetching course details</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
// // //         <div className="text-center max-w-md mx-auto px-4">
// // //           <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
// // //             <BookOpen className="w-10 h-10 text-red-600" />
// // //           </div>
// // //           <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
// // //           <p className="text-gray-600 mb-2">{error}</p>
// // //           <div className="bg-gray-100 rounded-lg p-4 mb-6">
// // //             <p className="text-sm text-gray-700 mb-2">
// // //               <strong>Requested:</strong> {formattedName}
// // //             </p>
// // //             <p className="text-sm text-gray-700">
// // //               <strong>Slug:</strong> {slug}
// // //             </p>
// // //           </div>
// // //           <div className="space-y-3">
// // //             <Link 
// // //               to="/specialization" 
// // //               className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
// // //             >
// // //               <ArrowLeft className="w-5 h-5" />
// // //               Back to Specializations
// // //             </Link>
// // //             <p className="text-sm text-gray-500">
// // //               Check the browser console (F12) for detailed error information
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!categoryData) {
// // //     return null;
// // //   }

// // //   const currentLevel = educationLevels[selectedLevel] || {};
// // //   const detectedCategory = detectCategoryFromSlug(slug, categoryData.name);
  
// // //   let heroImage = null;
  
// // //   if (thumbnailFromState) {
// // //     heroImage = `https://www.educationmalaysia.in/storage/${thumbnailFromState}`;
// // //   }
// // //   else if (seo?.og_image_path) {
// // //     heroImage = `https://www.educationmalaysia.in/storage/${seo.og_image_path}`;
// // //   }
// // //   else if (categoryData?.thumbnail_path) {
// // //     heroImage = `https://www.educationmalaysia.in/storage/${categoryData.thumbnail_path}`;
// // //   }
// // //   else if (categoryData?.image_path) {
// // //     heroImage = `https://www.educationmalaysia.in/storage/${categoryData.image_path}`;
// // //   }
// // //   else if (categoryData?.contents && categoryData.contents.length > 0) {
// // //     const contentWithImage = categoryData.contents.find(c => c.image_path && c.image_path.trim() !== '');
// // //     if (contentWithImage) {
// // //       heroImage = `https://www.educationmalaysia.in/storage/${contentWithImage.image_path}`;
// // //     }
// // //   }
  
// // //   if (!heroImage) {
// // //     heroImage = getCategoryImage(detectedCategory);
// // //   }

// // //   return (
// // //     <>
// // //       <Helmet>
// // //         <title>{seo?.meta_title || `${categoryData.name} ${currentLevel.title || ''} Course in Malaysia`}</title>
// // //         <meta name="description" content={seo?.meta_description || `Complete guide to ${categoryData.name} ${currentLevel.title || ''} programs in Malaysia`} />
// // //         <meta name="keywords" content={seo?.meta_keyword || categoryData.name} />
// // // <link rel="canonical" href={`https://educationmalaysia.in/specialization/${slug}${selectedLevel ? `-${selectedLevel}` : ''}`} />
// // //       </Helmet>

// // //       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
// // //         <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white">
// // //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // //             <Link to="/specialization" className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-6">
// // //               <ArrowLeft className="w-5 h-5" />
// // //               Back to All Specializations
// // //             </Link>
// // //           </div>
// // //         </div>

// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
// // //           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            
// // //             <div className="relative h-96">
// // //               <img
// // //                 src={heroImage}
// // //                 alt={categoryData.name}
// // //                 className="w-full h-full object-cover"
// // //                 onError={(e) => {
// // //                   e.target.src = getCategoryImage('General');
// // //                 }}
// // //               />
// // //               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
// // //               <div className="absolute bottom-0 left-0 right-0 p-8">
// // //                 <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
// // //                   {categoryData.name}
// // //                 </h1>
// // //                 <div className="flex flex-wrap gap-4 text-white/90">
// // //                   <div className="flex items-center gap-2">
// // //                     <GraduationCap className="w-5 h-5" />
// // //                     <span className="font-medium">Study in Malaysia</span>
// // //                   </div>
// // //                   <div className="flex items-center gap-2">
// // //                     <MapPin className="w-5 h-5" />
// // //                     <span>Top Malaysian Universities</span>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="px-8 py-4 border-b border-gray-100">
// // //               <div className="flex items-center text-sm text-gray-600 space-x-2">
// // //                 <Link to="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
// // //                   <Home size={18}/> Home
// // //                 </Link>
// // //                 <span>/</span>
// // //                 <Link to="/specialization" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
// // //                   <Layers size={18}/> Specialization
// // //                 </Link>
// // //                 <span>/</span>
// // //                 <span className="font-medium text-gray-900">{categoryData.name}</span>
// // //                 {level && (
// // //                   <>
// // //                     <span>/</span>
// // //                     <span className="font-medium text-blue-600">{currentLevel.title}</span>
// // //                   </>
// // //                 )}
// // //               </div>
// // //             </div>

      
// // //             <div className="border-b border-gray-200 bg-white sticky top-0 z-20 shadow-sm">
// // //   <div className="px-4 sm:px-8 py-4">
// // //     <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Select Education Level</h3>
// // //     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
// // //       {[
// // //         { key: 'diploma', label: 'Diploma', icon: FileText },
// // //         { key: 'undergraduate', label: 'Undergraduate', icon: GraduationCap },
// // //         { key: 'postgraduate', label: 'Postgraduate', icon: Award },
// // //         { key: 'phd', label: 'PhD', icon: Target },
// // //         { key: 'certificate', label: 'Certificates', icon: BookOpen }
// // //       ].map((levelItem) => (
// // //         <Link
// // //           key={levelItem.key}
// // //           to={`/specialization/${slug}-${levelItem.key}`}
// // //           className={`flex items-center justify-center gap-2 px-3 sm:px-5 py-3 rounded-xl font-medium transition-all text-center ${
// // //             selectedLevel === levelItem.key
// // //               ? 'bg-blue-600 text-white shadow-lg'
// // //               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // //           }`}
// // //         >
// // //           <levelItem.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
// // //           <span className="text-sm sm:text-base whitespace-nowrap">{levelItem.label}</span>
// // //         </Link>
// // //       ))}
// // //     </div>
// // //   </div>
// // // </div>

// // //           <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-b border-blue-100">
// // //   <div className="px-4 sm:px-8 py-6">
// // //     <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{currentLevel.title || categoryData.name}</h2>
// // //     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
// // //       <div className="flex items-center gap-3">
// // //         <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
// // //           <Clock className="w-5 h-5 text-blue-600" />
// // //         </div>
// // //         <div className="min-w-0">
// // //           <div className="text-sm text-gray-600">Duration</div>
// // //           <div className="font-semibold text-gray-900 whitespace-nowrap text-sm">{currentLevel.duration || 'Varies'}</div>
// // //         </div>
// // //       </div>
// // //       <div className="flex items-center gap-3">
// // //         <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
// // //           <DollarSign className="w-5 h-5 text-green-600" />
// // //         </div>
// // //         <div className="min-w-0">
// // //           <div className="text-sm text-gray-600">Tuition Fees</div>
// // //           <div className="font-semibold text-gray-900 whitespace-nowrap text-xs sm:text-sm">{currentLevel.fees || 'Contact Us'}</div>
// // //         </div>
// // //       </div>
// // //       <div className="flex items-center gap-3">
// // //         <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
// // //           <Calendar className="w-5 h-5 text-purple-600" />
// // //         </div>
// // //         <div className="min-w-0">
// // //           <div className="text-sm text-gray-600">Intake</div>
// // //           <div className="font-semibold text-gray-900 whitespace-nowrap text-xs sm:text-sm">{currentLevel.intake || 'Multiple'}</div>
// // //         </div>
// // //       </div>
// // //       <div className="flex items-center gap-3">
// // //         <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
// // //           <Award className="w-5 h-5 text-orange-600" />
// // //         </div>
// // //         <div className="min-w-0">
// // //           <div className="text-sm text-gray-600">Accreditation</div>
// // //           <div className="font-semibold text-gray-900 whitespace-nowrap text-xs sm:text-sm">{currentLevel.accreditation || 'MQA'}</div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   </div>
// // // </div>

// // //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              
// // //               <div className="lg:col-span-2 space-y-8">
                
// // //                 {tabs.length > 0 ? (
// // //                   tabs.map(({ name }, idx) => (
// // //                     <motion.section
// // //                       key={name}
// // //                       ref={sectionRefs.current[name]}
// // //                       initial={{ opacity: 0, y: 50 }}
// // //                       whileInView={{ opacity: 1, y: 0 }}
// // //                       viewport={{ once: true }}
// // //                       transition={{ duration: 0.6, delay: idx * 0.1 }}
// // //                       className="scroll-mt-24"
// // //                     >
// // //                       <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-md hover:shadow-lg transition-shadow">
// // //                         <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
// // //                           <span className="text-blue-600">{tabIcons[name] || <Info className="w-6 h-6" />}</span>
// // //                           {name}
// // //                         </h2>
// // //                         <div 
// // //                           className="prose prose-blue max-w-none text-gray-700 leading-relaxed"
// // //                           dangerouslySetInnerHTML={{ __html: formatHTML(contentMap[name]) }} 
// // //                         />
// // //                       </div>
// // //                     </motion.section>
// // //                   ))
// // //                 ) : (
// // //                   <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
// // //                     <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
// // //                     <p className="text-gray-500">Course details coming soon.</p>
// // //                   </div>
// // //                 )}

// // //                 <motion.div
// // //                   initial={{ opacity: 0, y: 50 }}
// // //                   whileInView={{ opacity: 1, y: 0 }}
// // //                   viewport={{ once: true }}
// // //                   transition={{ duration: 0.6 }}
// // //                 >
// // //                   <UniversityCard />
// // //                 </motion.div>

// // //                 {faqs.length > 0 && (
// // //                   <motion.section
// // //                     initial={{ opacity: 0, y: 50 }}
// // //                     whileInView={{ opacity: 1, y: 0 }}
// // //                     viewport={{ once: true }}
// // //                     transition={{ duration: 0.6 }}
// // //                     className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md"
// // //                   >
// // //                     <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
// // //                       <Lightbulb className="w-6 h-6 text-blue-600" />
// // //                       Frequently Asked Questions
// // //                     </h2>
// // //                     <div className="space-y-4">
// // //                       {faqs.map((faq, i) => (
// // //                         <details 
// // //                           key={i} 
// // //                           className="group bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl overflow-hidden border border-blue-100"
// // //                         >
// // //                           <summary className="cursor-pointer font-semibold text-gray-900 px-6 py-4 flex items-center justify-between hover:bg-blue-100 transition-colors">
// // //                             <span>{faq.question}</span>
// // //                             <ChevronRight className="w-5 h-5 text-blue-600 group-open:rotate-90 transition-transform" />
// // //                           </summary>
// // //                           <div 
// // //                             className="px-6 pb-4 text-gray-700 leading-relaxed prose prose-sm max-w-none"
// // //                             dangerouslySetInnerHTML={{ __html: formatHTML(faq.answer) }}
// // //                           />
// // //                         </details>
// // //                       ))}
// // //                     </div>
// // //                   </motion.section>
// // //                 )}
// // //               </div>

// // //               <div className="lg:col-span-1 space-y-6">
                
// // //                 <motion.div
// // //                   initial={{ opacity: 0, x: 50 }}
// // //                   animate={{ opacity: 1, x: 0 }}
// // //                   transition={{ duration: 0.6 }}
// // //                   className="bg-white border border-gray-200 rounded-xl p-6 shadow-md sticky top-24"
// // //                 >
// // //                   <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
// // //                     <Building2 className="w-6 h-6 text-blue-600" />
// // //                     Quick Information
// // //                   </h3>
// // //                   <div className="space-y-4">
// // //                     <div className="flex items-center gap-3">
// // //                       <div className="bg-blue-100 p-2 rounded-lg">
// // //                         <Globe className="w-5 h-5 text-blue-600" />
// // //                       </div>
// // //                       <div>
// // //                         <div className="text-sm text-gray-600">Language</div>
// // //                         <div className="font-semibold text-gray-900">English Taught</div>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                   <button className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl">
// // //                     Apply Now
// // //                     <ChevronRight className="w-5 h-5" />
// // //                   </button>
// // //                 </motion.div>

// // //                 <TrendingCourse2 />
                
// // //                 <GetInTouchForm />
                
// // //              <div className="-mt-2">
// // //                   <FeaturedUniversities />
// // //                 </div>
              
// // //               </div>
// // //             </div>

// // //           </div>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default SpecializationDetail;


// import React, { useRef, useEffect, useState } from "react";
// import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
// import { 
//   Home, Layers, Info, Clock, DollarSign, Briefcase, Share2, 
//   ArrowLeft, Star, MapPin, Users, BookOpen, CheckCircle, 
//   Award, TrendingUp, Building2, Target, Lightbulb, 
//   ChevronRight, GraduationCap, FileText, Calendar, Globe
// } from "lucide-react";
// import { motion } from "framer-motion";
// import api from "../api";
// import GetInTouchForm from "../components/GetInTouchForm";
// import FeaturedUniversities from "../components/FeaturedUniversities";
// import TrendingCourse2 from "../components/TrandingCourse2";
// import UniversityCard from "../components/UniversityCard";
// import { Helmet } from "react-helmet";

// const tabIcons = {
//   "About Course": <Info size={16} />,
//   "Duration": <Clock size={16} />,
//   "Cost": <DollarSign size={16} />,
//   "Career": <Briefcase size={16} />,
//   "Branches": <Share2 size={16} />,
//   "Entry Requirement": <FileText size={16} />,
// };const formatHTML = (html) => {
//   if (!html) return "";
  
//   const textarea = document.createElement("textarea");
//   textarea.innerHTML = html;
//   let decoded = textarea.value;
  
//   // Clean spans and inline styles
//   decoded = decoded.replace(/<span[^>]*>/gi, "").replace(/<\/span>/gi, "");
//   decoded = decoded.replace(/style="[^"]*"/gi, "").replace(/&nbsp;/gi, " ");
  
//   // 🎯 TABLE PROCESSING
//   decoded = decoded.replace(
//     /<table[^>]*>/gi, 
//     '<div class="overflow-x-auto my-6 rounded-xl shadow-lg"><table class="min-w-full border-collapse bg-white border border-gray-200">'
//   );
//   decoded = decoded.replace(/<\/table>/gi, '</table></div>');
  
//   if (!decoded.includes('<thead')) {
//     decoded = decoded.replace(
//       /(<table[^>]*>)\s*(<tr[^>]*>)/i,
//       '$1<thead class="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">$2'
//     );
//     let firstTrEnd = decoded.indexOf('</tr>');
//     if (firstTrEnd !== -1) {
//       decoded = decoded.substring(0, firstTrEnd + 5) + '</thead><tbody class="divide-y divide-gray-200">' + decoded.substring(firstTrEnd + 5);
//     }
//     decoded = decoded.replace(/<\/table>/i, '</tbody></table>');
//   } else {
//     decoded = decoded.replace(/<thead[^>]*>/gi, '<thead class="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">');
//     decoded = decoded.replace(/<tbody[^>]*>/gi, '<tbody class="divide-y divide-gray-200">');
//   }
  
//   decoded = decoded.replace(/<th([^>]*)>/gi, '<th$1 class="px-6 py-4 text-left text-sm font-bold text-white bg-blue-700 uppercase tracking-wider border border-white/20 whitespace-nowrap align-middle">');
//   decoded = decoded.replace(/<tr([^>]*)>/gi, '<tr$1 class="hover:bg-blue-50 transition-colors duration-150">');
//   decoded = decoded.replace(/<td([^>]*)>/gi, '<td$1 class="px-6 py-4 text-sm text-gray-900 border border-gray-200 align-middle">');
//   decoded = decoded.replace(/<th([^>]*)><\/th>/gi, '<th$1>&nbsp;</th>');
//   decoded = decoded.replace(/<td([^>]*)><\/td>/gi, '<td$1>&nbsp;</td>');
  
//   // 🎯 ANCHOR/LINK STYLING - FIX LINKS
//   decoded = decoded.replace(/<a\s+/gi, '<a class="text-blue-600 hover:text-blue-800 underline font-medium transition-colors" ');
  
//   // 🎯 LIST STYLING - FIX BULLETS & NUMBERS
//   decoded = decoded.replace(/<ul>/gi, '<ul class="space-y-2 my-4 pl-6">');
//   decoded = decoded.replace(/<ol>/gi, '<ol class="space-y-2 my-4 pl-6">');
//   decoded = decoded.replace(/<li>/gi, '<li class="text-gray-700 leading-relaxed relative pl-2" style="display: list-item; list-style-position: outside;">');
  
//   // Apply bullet/number styles to ul/ol
//   decoded = decoded.replace(/<ul class="space-y-2 my-4 pl-6">/gi, '<ul class="space-y-2 my-4 pl-6" style="list-style-type: disc;">');
//   decoded = decoded.replace(/<ol class="space-y-2 my-4 pl-6">/gi, '<ol class="space-y-2 my-4 pl-6" style="list-style-type: decimal;">');
  

// // Common heading keywords
// decoded = decoded.replace(/^(Career Opportunities?|Key Features?|Admission Process|Entry Requirements?|Top Universities|Specializations?|Application|Coverage|Eligibility|Support|Description|Availability|Examples|Duration|Overview|Aerodynamics Engineering|Propulsion Systems Engineering|Aerospace Structures Engineering|Aeronautical Engineering|Aircraft Engineering):?\s*$/gim, '<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4 block" style="display: block !important;">$1</h3>');

// // Convert bold standalone lines to headings
// decoded = decoded.replace(/<p[^>]*>\s*<strong>([A-Z][^<]+)<\/strong>\s*<\/p>/gi, '<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4 block" style="display: block !important;">$1</h3>');
  
//   // 🎯 PARAGRAPH STYLING
//   decoded = decoded.replace(/<p>/gi, '<p class="mb-4 text-gray-700 leading-relaxed">');
  
//   // Clean up
//   decoded = decoded.replace(/\n{3,}/g, '\n\n');
//   decoded = decoded.replace(/<p[^>]*>\s*<\/p>/g, '');
  
//   return decoded;
// };


// const detectCategoryFromSlug = (slug, name) => {
//   const lowerSlug = slug?.toLowerCase() || '';
//   const lowerName = name?.toLowerCase() || '';
  
//   if (lowerSlug.includes('engineer') || lowerName.includes('engineer')) return 'Engineering';
//   if (lowerSlug.includes('computer') || lowerSlug.includes('software') || lowerSlug.includes('it') || lowerSlug.includes('technology') || lowerSlug.includes('cyber') || lowerSlug.includes('data') || lowerName.includes('computer') || lowerName.includes('software')) return 'Technology & IT';
//   if (lowerSlug.includes('medic') || lowerSlug.includes('health') || lowerSlug.includes('nurs') || lowerSlug.includes('pharmac') || lowerSlug.includes('dent') || lowerName.includes('medical')) return 'Medical & Health';
//   if (lowerSlug.includes('business') || lowerSlug.includes('management') || lowerSlug.includes('accounting') || lowerSlug.includes('finance') || lowerSlug.includes('marketing') || lowerSlug.includes('entrepreneur') || lowerSlug.includes('banking') || lowerSlug.includes('human-resource') || lowerSlug.includes('hrm') || lowerSlug.includes('supply-chain') || lowerName.includes('business') || lowerName.includes('accounting')) return 'Business & Management';
//   if (lowerSlug.includes('science') || lowerSlug.includes('biology') || lowerSlug.includes('chemistry') || lowerSlug.includes('physics') || lowerSlug.includes('biotechnology') || lowerSlug.includes('agriculture') || lowerSlug.includes('actuarial') || lowerName.includes('science')) return 'Science';
//   if (lowerSlug.includes('art') || lowerSlug.includes('design') || lowerSlug.includes('graphic') || lowerSlug.includes('fashion') || lowerSlug.includes('interior') || lowerSlug.includes('architecture') || lowerName.includes('design') || lowerName.includes('art')) return 'Arts & Design';
//   if (lowerSlug.includes('social') || lowerSlug.includes('psychology') || lowerSlug.includes('sociology') || lowerSlug.includes('education') || lowerSlug.includes('law') || lowerSlug.includes('political') || lowerName.includes('social') || lowerName.includes('law')) return 'Social Sciences';
//   if (lowerSlug.includes('math') || lowerSlug.includes('statistic') || lowerName.includes('math') || lowerName.includes('statistic')) return 'Mathematics';
  
//   return 'General';
// };

// const getCategoryImage = (category) => {
//   const categoryImages = {
//     'Engineering': 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1200',
//     'Technology & IT': 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200',
//     'Medical & Health': 'https://images.pexels.com/photos/356054/pexels-photo-356054.jpeg?auto=compress&cs=tinysrgb&w=1200',
//     'Business & Management': 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
//     'Science': 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1200',
//     'Arts & Design': 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
//     'Social Sciences': 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1200',
//     'Mathematics': 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
//     'General': 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800'
//   };
  
//   return categoryImages[category] || categoryImages['General'];
// };

// const SpecializationDetail = () => {
//  const { name, level, nameWithLevel } = useParams();

// // Extract name and level from combined slug
// let slug, selectedLevelFromUrl;

// if (nameWithLevel) {
//   // New format: accounting-diploma
//   const parts = nameWithLevel.split('-');
//   const lastPart = parts[parts.length - 1];
  
//   // Check if last part is a valid level
//   const validLevels = ['diploma', 'undergraduate', 'postgraduate', 'phd', 'certificate'];
  
//   if (validLevels.includes(lastPart)) {
//     selectedLevelFromUrl = lastPart;
//     slug = parts.slice(0, -1).join('-'); // accounting
//   } else {
//     slug = nameWithLevel; // No level specified
//     selectedLevelFromUrl = null;
//   }
// } else {
//   // Old format fallback: name/level
//   slug = name?.toLowerCase();
//   selectedLevelFromUrl = level;
// }

// const formattedName = slug ? slug.split("-").map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(" ") : "Course";

// const location = useLocation();
//   const thumbnailFromState = location.state?.thumbnail;

// const [selectedLevel, setSelectedLevel] = useState(() => {
//   // ✅ URL se level detect karo pehle
//   if (selectedLevelFromUrl) {
//     return selectedLevelFromUrl;
//   }
//   return 'undergraduate'; // default
// });
//   const [tabs, setTabs] = useState([]);
//   const [activeTab, setActiveTab] = useState(null);
//   const [contentMap, setContentMap] = useState({});
//   const [faqs, setFaqs] = useState([]);
//   const [seo, setSeo] = useState({});
//   const [categoryData, setCategoryData] = useState(null);
//   const [relatedUniversities, setRelatedUniversities] = useState([]);
//   const [loading, setLoading] = useState(true);

//  const handleLevelChange = (newLevel) => {
//   // ✅ Pehle state update karo
//   setSelectedLevel(newLevel);
  
//   // ✅ Phir URL update karo (without reload)
//   const newUrl = `/specialization/${slug}-${newLevel}`;
//   window.history.pushState(null, '', newUrl);
  
//   // ✅ Scroll to top
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// };
//   const [error, setError] = useState(null);
//   const [educationLevels, setEducationLevels] = useState({});
//   const sectionRefs = useRef({});

//  useEffect(() => {
//   const fetchData = async () => {
//     if (!slug) {
//       setError("Invalid URL - No course name provided");
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
      
//       // ✅ STEP 1: Pehle specialization details fetch karo (SIRF EK BAAR)
//       const res = await api.get(`/specialization-detail-by-slug/${slug}`);
      
//       const category = res?.data?.data?.specialization || res?.data?.specialization || res?.data?.category || res?.data;
      
//       if (!category || !category.name) {
//         throw new Error("Course not found.");
//       }
      
//       setCategoryData(category);
//       setSeo(res.data?.seo || res.data?.data?.seo || category?.seo || {});
//       setRelatedUniversities(res.data?.related_universities || res.data?.data?.related_universities || category?.related_universities || []);
//       setFaqs(category?.faqs || res.data?.faqs || []);
      
//       setEducationLevels({
//         diploma: { title: 'Diploma', duration: '2.5 Years', fees: 'RM 18,000/year', intake: 'January, April, August', accreditation: 'MQA Approved' },
//         undergraduate: { title: 'Undergraduate', duration: '4 Years', fees: 'RM 35,000/year', intake: 'February, July, September', accreditation: 'EAC Accredited' },
//         postgraduate: { title: 'Postgraduate', duration: '1.5-2 Years', fees: 'RM 42,000/year', intake: 'February, September', accreditation: 'MQA Accredited' },
//         phd: { title: 'PhD', duration: '3-4 Years', fees: 'RM 38,000/year', intake: 'Throughout the year', accreditation: 'MQA Accredited' },
//         certificate: { title: 'Certificates', duration: '3-6 Months', fees: 'RM 5,000-12,000', intake: 'Multiple intakes', accreditation: 'Professional Bodies' }
//       });
      
//       setLoading(false);
      
//     } catch(e) { 
//       let errorMessage = "Failed to load course data";
      
//       if (e.response?.status === 404) {
//         errorMessage = `Course "${formattedName}" not found.`;
//       } else if (e.response?.data?.message) {
//         errorMessage = e.response.data.message;
//       } else if (e.message) {
//         errorMessage = e.message;
//       }
      
//       setError(errorMessage);
//       setLoading(false);
//     }
//   };
  
//   fetchData();
// }, [slug, formattedName]);

// // ✅ YE NAYA useEffect ADD KARO - SIRF LEVEL CHANGE PE CONTENT FETCH KARE
// useEffect(() => {
//   const fetchLevelContent = async () => {
//     if (!categoryData || !selectedLevel) return;
    
//     const levelIdMap = {
//       'diploma': 1,
//       'undergraduate': 2,
//       'postgraduate': 3,
//       'phd': 4,
//       'certificate': 5
//     };
    
//     const levelId = levelIdMap[selectedLevel];
    
//     if (levelId && categoryData?.id) {
//       try {
//         const levelContentsRes = await api.get(`/specialization-level-contents/${levelId}`);
//         const levelContents = levelContentsRes?.data?.data?.rows || [];
        
//         const map = {};
//         const dynamicTabs = [];
        
//         levelContents.forEach((c) => {
//           if(c.title && c.description){
//             map[c.title] = c.description;
//             dynamicTabs.push({ 
//               name: c.title, 
//               icon: tabIcons[c.title] || <Info size={16}/> 
//             });
//             sectionRefs.current[c.title] = React.createRef();
//           }
//         });
        
//         setContentMap(map);
//         setTabs(dynamicTabs);
//         setActiveTab(dynamicTabs[0]?.name || "");
        
//       } catch (levelError) {
//         console.warn("Level contents fetch failed:", levelError);
//         // Fallback
//         const contents = categoryData?.contents || [];
//         const map = {};
//         const dynamicTabs = [];
//         contents.forEach((c) => {
//           if(c.tab && c.description){
//             map[c.tab] = c.description;
//             dynamicTabs.push({ 
//               name: c.tab, 
//               icon: tabIcons[c.tab] || <Info size={16}/> 
//             });
//             sectionRefs.current[c.tab] = React.createRef();
//           }
//         });
//         setContentMap(map);
//         setTabs(dynamicTabs);
//         setActiveTab(dynamicTabs[0]?.name || "");
//       }
//     }
//   };
  
//   fetchLevelContent();
// }, [selectedLevel, categoryData]); // ✅ SIRF selectedLevel aur categoryData pe trigger ho// ✅ SIRF slug aur formattedName, selectedLevel NAHI

// // ✅ selectedLevel ko dependency mein add karo
// useEffect(() => {
//   // ✅ URL se level set karo (agar hai to)
//   if (selectedLevelFromUrl) {
//     setSelectedLevel(selectedLevelFromUrl);
//   }
  
//   // ✅ Hash-based tab navigation
//   const hash = window.location.hash.replace('#', '');
//   if (hash && tabs.length > 0) {
//     const tabName = tabs.find(tab => 
//       tab.name.toLowerCase().replace(/\s+/g, '-') === hash
//     )?.name;
    
//     if (tabName) {
//       setTimeout(() => handleTabClick(tabName), 500);
//     }
//   }
// }, [selectedLevelFromUrl, tabs]); // ✅ educationLevels HATA DO

// const handleTabClick = (tabName) => {
//   setActiveTab(tabName);
  
//   // ✅ YE 2 LINES ADD KARO - URL mein #duration add ho jayega
//   const hashName = tabName.toLowerCase().replace(/\s+/g, '-');
//   window.history.pushState(null, '', `#${hashName}`);
  
//   const element = sectionRefs.current[tabName]?.current;
//   if (element) {
//     const offset = 200;
//     const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
//     window.scrollTo({
//       top: elementPosition - offset,
//       behavior: 'smooth'
//     });
//   }
// };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600 font-medium">Loading {formattedName}...</p>
//           <p className="mt-2 text-sm text-gray-500">Fetching course details</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
//         <div className="text-center max-w-md mx-auto px-4">
//           <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
//             <BookOpen className="w-10 h-10 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
//           <p className="text-gray-600 mb-2">{error}</p>
//           <div className="bg-gray-100 rounded-lg p-4 mb-6">
//             <p className="text-sm text-gray-700 mb-2">
//               <strong>Requested:</strong> {formattedName}
//             </p>
//             <p className="text-sm text-gray-700">
//               <strong>Slug:</strong> {slug}
//             </p>
//           </div>
//           <div className="space-y-3">
//             <Link 
//               to="/specialization" 
//               className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5" />
//               Back to Specializations
//             </Link>
//             <p className="text-sm text-gray-500">
//               Check the browser console (F12) for detailed error information
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!categoryData) {
//     return null;
//   }

//   const currentLevel = educationLevels[selectedLevel] || {};
//   const detectedCategory = detectCategoryFromSlug(slug, categoryData.name);
  
//   let heroImage = null;
  
//   if (thumbnailFromState) {
//     heroImage = `https://www.educationmalaysia.in/storage/${thumbnailFromState}`;
//   }
//   else if (seo?.og_image_path) {
//     heroImage = `https://www.educationmalaysia.in/storage/${seo.og_image_path}`;
//   }
//   else if (categoryData?.thumbnail_path) {
//     heroImage = `https://www.educationmalaysia.in/storage/${categoryData.thumbnail_path}`;
//   }
//   else if (categoryData?.image_path) {
//     heroImage = `https://www.educationmalaysia.in/storage/${categoryData.image_path}`;
//   }
//   else if (categoryData?.contents && categoryData.contents.length > 0) {
//     const contentWithImage = categoryData.contents.find(c => c.image_path && c.image_path.trim() !== '');
//     if (contentWithImage) {
//       heroImage = `https://www.educationmalaysia.in/storage/${contentWithImage.image_path}`;
//     }
//   }
  
//   if (!heroImage) {
//     heroImage = getCategoryImage(detectedCategory);
//   }

//   return (
//     <>
//       <Helmet>
//         <title>{seo?.meta_title || `${categoryData.name} ${currentLevel.title || ''} Course in Malaysia`}</title>
//         <meta name="description" content={seo?.meta_description || `Complete guide to ${categoryData.name} ${currentLevel.title || ''} programs in Malaysia`} />
//         <meta name="keywords" content={seo?.meta_keyword || categoryData.name} />
// <link rel="canonical" href={`https://educationmalaysia.in/specialization/${slug}${selectedLevel ? `-${selectedLevel}` : ''}`} />
//       </Helmet>

//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
//         <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <Link to="/specialization" className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-6">
//               <ArrowLeft className="w-5 h-5" />
//               Back to All Specializations
//             </Link>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            
//             <div className="relative h-96">
//               <img
//                 src={heroImage}
//                 alt={categoryData.name}
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   e.target.src = getCategoryImage('General');
//                 }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8">
//                 <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
//                   {categoryData.name}
//                 </h1>
//                 <div className="flex flex-wrap gap-4 text-white/90">
//                   <div className="flex items-center gap-2">
//                     <GraduationCap className="w-5 h-5" />
//                     <span className="font-medium">Study in Malaysia</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <MapPin className="w-5 h-5" />
//                     <span>Top Malaysian Universities</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="px-8 py-4 border-b border-gray-100">
//               <div className="flex items-center text-sm text-gray-600 space-x-2">
//                 <Link to="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
//                   <Home size={18}/> Home
//                 </Link>
//                 <span>/</span>
//                 <Link to="/specialization" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
//                   <Layers size={18}/> Specialization
//                 </Link>
//                 <span>/</span>
//                 <span className="font-medium text-gray-900">{categoryData.name}</span>
//                 {level && (
//                   <>
//                     <span>/</span>
//                     <span className="font-medium text-blue-600">{currentLevel.title}</span>
//                   </>
//                 )}
//               </div>
//             </div>

      
// <div className="border-b border-gray-200 bg-white shadow-sm">
//   <div className="px-4 sm:px-8 py-1">
//     <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Select Education Level</h3>
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
//       {[
//         { key: 'diploma', label: 'Diploma', icon: FileText },
//         { key: 'undergraduate', label: 'Undergraduate', icon: GraduationCap },
//         { key: 'postgraduate', label: 'Postgraduate', icon: Award },
//         { key: 'phd', label: 'PhD', icon: Target },
//         { key: 'certificate', label: 'Certificates', icon: BookOpen }
//       ].map((levelItem) => (

//       <button
//   key={levelItem.key}
//   onClick={() => handleLevelChange(levelItem.key)}
//   className={`flex items-center justify-center gap-2 px-3 sm:px-5 py-3 rounded-xl font-medium transition-all text-center ${
//     selectedLevel === levelItem.key
//       ? 'bg-blue-600 text-white shadow-lg'
//       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//   }`}
// >
//   <levelItem.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
//   <span className="text-sm sm:text-base whitespace-nowrap">{levelItem.label}</span>
// </button>
//       ))}
//     </div>
//   </div>
// </div>

//           <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-b border-blue-100">
//   <div className="px-4 sm:px-8 py-6">
//     <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{currentLevel.title || categoryData.name}</h2>
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//       <div className="flex items-center gap-3">
//         <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
//           <Clock className="w-5 h-5 text-blue-600" />
//         </div>
//         <div className="min-w-0">
//           <div className="text-sm text-gray-600">Duration</div>
//           <div className="font-semibold text-gray-900 whitespace-nowrap text-sm">{currentLevel.duration || 'Varies'}</div>
//         </div>
//       </div>
//       <div className="flex items-center gap-3">
//         <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
//           <DollarSign className="w-5 h-5 text-green-600" />
//         </div>
//         <div className="min-w-0">
//           <div className="text-sm text-gray-600">Tuition Fees</div>
//           <div className="font-semibold text-gray-900 whitespace-nowrap text-xs sm:text-sm">{currentLevel.fees || 'Contact Us'}</div>
//         </div>
//       </div>
//       <div className="flex items-center gap-3">
//         <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
//           <Calendar className="w-5 h-5 text-purple-600" />
//         </div>
//         <div className="min-w-0">
//           <div className="text-sm text-gray-600">Intake</div>
//           <div className="font-semibold text-gray-900 whitespace-nowrap text-xs sm:text-sm">{currentLevel.intake || 'Multiple'}</div>
//         </div>
//       </div>
//       <div className="flex items-center gap-3">
//         <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
//           <Award className="w-5 h-5 text-orange-600" />
//         </div>
//         <div className="min-w-0">
//           <div className="text-sm text-gray-600">Accreditation</div>
//           <div className="font-semibold text-gray-900 whitespace-nowrap text-xs sm:text-sm">{currentLevel.accreditation || 'MQA'}</div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

// {tabs.length > 0 && (
// <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg transition-all duration-300">

//     <div className="px-4 sm:px-8">
//       <div className="flex gap-4 overflow-x-auto scrollbar-hide py-1">
//         {tabs.map(({ name, icon }) => (
//           <button
//             key={name}
//             onClick={() => handleTabClick(name)}
//             className={`flex items-center gap-2 py-4 px-3 font-medium whitespace-nowrap transition-all border-b-2 ${
//               activeTab === name
//                 ? 'text-blue-600 border-blue-600'
//                 : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
//             }`}
//           >
//             {icon}
//             <span className="text-sm">{name}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   </div>
// )}



//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              
//               <div className="lg:col-span-2 space-y-8">


                
//                 {tabs.length > 0 ? (
//                   tabs.map(({ name }, idx) => (
//                     <motion.section
//                       key={name}
//                       ref={sectionRefs.current[name]}
//                       initial={{ opacity: 0, y: 50 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.6, delay: idx * 0.1 }}
//                       className="scroll-mt-32"
//                     >
//                       <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-md hover:shadow-lg transition-shadow">
//                         <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                           <span className="text-blue-600">{tabIcons[name] || <Info className="w-6 h-6" />}</span>
//                           {name}
//                         </h2>
//                         <div 
//                           className="prose prose-blue max-w-none text-gray-700 leading-relaxed"
//                           dangerouslySetInnerHTML={{ __html: formatHTML(contentMap[name]) }} 
//                         />
//                       </div>
//                     </motion.section>
//                   ))
//                 ) : (
//                   <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
//                     <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                     <p className="text-gray-500">Course details coming soon.</p>
//                   </div>
//                 )}

//                 <motion.div
//                   initial={{ opacity: 0, y: 50 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <UniversityCard />
//                 </motion.div>

//                 {faqs.length > 0 && (
//                   <motion.section
//                     initial={{ opacity: 0, y: 50 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.6 }}
//                     className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md"
//                   >
//                     <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//                       <Lightbulb className="w-6 h-6 text-blue-600" />
//                       Frequently Asked Questions
//                     </h2>
//                     <div className="space-y-4">
//                       {faqs.map((faq, i) => (
//                         <details 
//                           key={i} 
//                           className="group bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl overflow-hidden border border-blue-100"
//                         >
//                           <summary className="cursor-pointer font-semibold text-gray-900 px-6 py-4 flex items-center justify-between hover:bg-blue-100 transition-colors">
//                             <span>{faq.question}</span>
//                             <ChevronRight className="w-5 h-5 text-blue-600 group-open:rotate-90 transition-transform" />
//                           </summary>
//                           <div 
//                             className="px-6 pb-4 text-gray-700 leading-relaxed prose prose-sm max-w-none"
//                             dangerouslySetInnerHTML={{ __html: formatHTML(faq.answer) }}
//                           />
//                         </details>
//                       ))}
//                     </div>
//                   </motion.section>
//                 )}
//               </div>

//               <div className="lg:col-span-1 space-y-6">
                
//                 <motion.div
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.6 }}
//                   className="bg-white border border-gray-200 rounded-xl p-6 shadow-md sticky top-24"
//                 >
//                   <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                     <Building2 className="w-6 h-6 text-blue-600" />
//                     Quick Information
//                   </h3>
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-3">
//                       <div className="bg-blue-100 p-2 rounded-lg">
//                         <Globe className="w-5 h-5 text-blue-600" />
//                       </div>
//                       <div>
//                         <div className="text-sm text-gray-600">Language</div>
//                         <div className="font-semibold text-gray-900">English Taught</div>
//                       </div>
//                     </div>
//                   </div>
//                   <button className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl">
//                     Apply Now
//                     <ChevronRight className="w-5 h-5" />
//                   </button>
//                 </motion.div>

//                 <TrendingCourse2 />
                
//                 <GetInTouchForm />
                
//              <div className="-mt-2">
//                   <FeaturedUniversities />
//                 </div>
              
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SpecializationDetail;

import React, { useRef, useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, Layers, Info, Clock, DollarSign, Briefcase, Share2, 
  ArrowLeft, Star, MapPin, Users, BookOpen, CheckCircle, 
  Award, TrendingUp, Building2, Target, Lightbulb, 
  ChevronRight, GraduationCap, FileText, Calendar, Globe
} from "lucide-react";
import { motion } from "framer-motion";
import api from "../api";
import GetInTouchForm from "../components/GetInTouchForm";
import FeaturedUniversities from "../components/FeaturedUniversities";
import TrendingCourse2 from "../components/TrandingCourse2";
import UniversityCard from "../components/UniversityCard";
import { Helmet } from "react-helmet";

const tabIcons = {
  "About Course": <Info size={16} />,
  "Duration": <Clock size={16} />,
  "Cost": <DollarSign size={16} />,
  "Career": <Briefcase size={16} />,
  "Branches": <Share2 size={16} />,
  "Entry Requirement": <FileText size={16} />,
};const formatHTML = (html) => {
  if (!html) return "";
  
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  let decoded = textarea.value;
  
  // Clean spans and inline styles
  decoded = decoded.replace(/<span[^>]*>/gi, "").replace(/<\/span>/gi, "");
  decoded = decoded.replace(/style="[^"]*"/gi, "").replace(/&nbsp;/gi, " ");
  
  // 🎯 TABLE PROCESSING
  decoded = decoded.replace(
    /<table[^>]*>/gi, 
    '<div class="overflow-x-auto my-6 rounded-xl shadow-lg"><table class="min-w-full border-collapse bg-white border border-gray-200">'
  );
  decoded = decoded.replace(/<\/table>/gi, '</table></div>');
  
  if (!decoded.includes('<thead')) {
    decoded = decoded.replace(
      /(<table[^>]*>)\s*(<tr[^>]*>)/i,
      '$1<thead class="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">$2'
    );
    let firstTrEnd = decoded.indexOf('</tr>');
    if (firstTrEnd !== -1) {
      decoded = decoded.substring(0, firstTrEnd + 5) + '</thead><tbody class="divide-y divide-gray-200">' + decoded.substring(firstTrEnd + 5);
    }
    decoded = decoded.replace(/<\/table>/i, '</tbody></table>');
  } else {
    decoded = decoded.replace(/<thead[^>]*>/gi, '<thead class="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">');
    decoded = decoded.replace(/<tbody[^>]*>/gi, '<tbody class="divide-y divide-gray-200">');
  }
  
  decoded = decoded.replace(/<th([^>]*)>/gi, '<th$1 class="px-6 py-4 text-left text-sm font-bold text-white bg-blue-700 uppercase tracking-wider border border-white/20 whitespace-nowrap align-middle">');
  decoded = decoded.replace(/<tr([^>]*)>/gi, '<tr$1 class="hover:bg-blue-50 transition-colors duration-150">');
  decoded = decoded.replace(/<td([^>]*)>/gi, '<td$1 class="px-6 py-4 text-sm text-gray-900 border border-gray-200 align-middle">');
  decoded = decoded.replace(/<th([^>]*)><\/th>/gi, '<th$1>&nbsp;</th>');
  decoded = decoded.replace(/<td([^>]*)><\/td>/gi, '<td$1>&nbsp;</td>');
  
  // 🎯 ANCHOR/LINK STYLING - FIX LINKS
  decoded = decoded.replace(/<a\s+/gi, '<a class="text-blue-600 hover:text-blue-800 underline font-medium transition-colors" ');
  
  // 🎯 LIST STYLING - FIX BULLETS & NUMBERS
  decoded = decoded.replace(/<ul>/gi, '<ul class="space-y-2 my-4 pl-6">');
  decoded = decoded.replace(/<ol>/gi, '<ol class="space-y-2 my-4 pl-6">');
  decoded = decoded.replace(/<li>/gi, '<li class="text-gray-700 leading-relaxed relative pl-2" style="display: list-item; list-style-position: outside;">');
  
  // Apply bullet/number styles to ul/ol
  decoded = decoded.replace(/<ul class="space-y-2 my-4 pl-6">/gi, '<ul class="space-y-2 my-4 pl-6" style="list-style-type: disc;">');
  decoded = decoded.replace(/<ol class="space-y-2 my-4 pl-6">/gi, '<ol class="space-y-2 my-4 pl-6" style="list-style-type: decimal;">');
  

// Common heading keywords
decoded = decoded.replace(/^(Career Opportunities?|Key Features?|Admission Process|Entry Requirements?|Top Universities|Specializations?|Application|Coverage|Eligibility|Support|Description|Availability|Examples|Duration|Overview|Aerodynamics Engineering|Propulsion Systems Engineering|Aerospace Structures Engineering|Aeronautical Engineering|Aircraft Engineering):?\s*$/gim, '<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4 block" style="display: block !important;">$1</h3>');

// Convert bold standalone lines to headings
decoded = decoded.replace(/<p[^>]*>\s*<strong>([A-Z][^<]+)<\/strong>\s*<\/p>/gi, '<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4 block" style="display: block !important;">$1</h3>');
  
  // 🎯 PARAGRAPH STYLING
  decoded = decoded.replace(/<p>/gi, '<p class="mb-4 text-gray-700 leading-relaxed">');
  
  // Clean up
  decoded = decoded.replace(/\n{3,}/g, '\n\n');
  decoded = decoded.replace(/<p[^>]*>\s*<\/p>/g, '');
  
  return decoded;
};


const detectCategoryFromSlug = (slug, name) => {
  const lowerSlug = slug?.toLowerCase() || '';
  const lowerName = name?.toLowerCase() || '';
  
  if (lowerSlug.includes('engineer') || lowerName.includes('engineer')) return 'Engineering';
  if (lowerSlug.includes('computer') || lowerSlug.includes('software') || lowerSlug.includes('it') || lowerSlug.includes('technology') || lowerSlug.includes('cyber') || lowerSlug.includes('data') || lowerName.includes('computer') || lowerName.includes('software')) return 'Technology & IT';
  if (lowerSlug.includes('medic') || lowerSlug.includes('health') || lowerSlug.includes('nurs') || lowerSlug.includes('pharmac') || lowerSlug.includes('dent') || lowerName.includes('medical')) return 'Medical & Health';
  if (lowerSlug.includes('business') || lowerSlug.includes('management') || lowerSlug.includes('accounting') || lowerSlug.includes('finance') || lowerSlug.includes('marketing') || lowerSlug.includes('entrepreneur') || lowerSlug.includes('banking') || lowerSlug.includes('human-resource') || lowerSlug.includes('hrm') || lowerSlug.includes('supply-chain') || lowerName.includes('business') || lowerName.includes('accounting')) return 'Business & Management';
  if (lowerSlug.includes('science') || lowerSlug.includes('biology') || lowerSlug.includes('chemistry') || lowerSlug.includes('physics') || lowerSlug.includes('biotechnology') || lowerSlug.includes('agriculture') || lowerSlug.includes('actuarial') || lowerName.includes('science')) return 'Science';
  if (lowerSlug.includes('art') || lowerSlug.includes('design') || lowerSlug.includes('graphic') || lowerSlug.includes('fashion') || lowerSlug.includes('interior') || lowerSlug.includes('architecture') || lowerName.includes('design') || lowerName.includes('art')) return 'Arts & Design';
  if (lowerSlug.includes('social') || lowerSlug.includes('psychology') || lowerSlug.includes('sociology') || lowerSlug.includes('education') || lowerSlug.includes('law') || lowerSlug.includes('political') || lowerName.includes('social') || lowerName.includes('law')) return 'Social Sciences';
  if (lowerSlug.includes('math') || lowerSlug.includes('statistic') || lowerName.includes('math') || lowerName.includes('statistic')) return 'Mathematics';
  
  return 'General';
};

const getCategoryImage = (category) => {
  const categoryImages = {
    'Engineering': 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Technology & IT': 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Medical & Health': 'https://images.pexels.com/photos/356054/pexels-photo-356054.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Business & Management': 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Science': 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Arts & Design': 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Social Sciences': 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Mathematics': 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    'General': 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800'
  };
  
  return categoryImages[category] || categoryImages['General'];
};

const SpecializationDetail = () => {
 const { name, level, nameWithLevel } = useParams();

// Extract name and level from combined slug
let slug, selectedLevelFromUrl;

if (nameWithLevel) {
  // New format: accounting-diploma
  const parts = nameWithLevel.split('-');
  const lastPart = parts[parts.length - 1];
  
  // Check if last part is a valid level
  const validLevels = ['diploma', 'undergraduate', 'postgraduate', 'phd', 'certificate'];
  
  if (validLevels.includes(lastPart)) {
    selectedLevelFromUrl = lastPart;
    slug = parts.slice(0, -1).join('-'); // accounting
  } else {
    slug = nameWithLevel; // No level specified
    selectedLevelFromUrl = null;
  }
} else {
  // Old format fallback: name/level
  slug = name?.toLowerCase();
  selectedLevelFromUrl = level;
}

const formattedName = slug ? slug.split("-").map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(" ") : "Course";

  const thumbnailFromState = location.state?.thumbnail;

  const [selectedLevel, setSelectedLevel] = useState(selectedLevelFromUrl || 'undergraduate');
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [contentMap, setContentMap] = useState({});
  const [faqs, setFaqs] = useState([]);
  const [seo, setSeo] = useState({});
  const [categoryData, setCategoryData] = useState(null);
  const [relatedUniversities, setRelatedUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [educationLevels, setEducationLevels] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
  const fetchData = async () => {
    if (!slug) {
      setError("Invalid URL - No course name provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // ✅ STEP 1: Pehle specialization details fetch karo
      const res = await api.get(`/specialization-detail-by-slug/${slug}`);
      
      const category = res?.data?.data?.specialization || res?.data?.specialization || res?.data?.category || res?.data;
      
      if (!category || !category.name) {
        throw new Error("Course not found.");
      }
      
      setCategoryData(category);
      setSeo(res.data?.seo || res.data?.data?.seo || category?.seo || {});
      setRelatedUniversities(res.data?.related_universities || res.data?.data?.related_universities || category?.related_universities || []);
      
      setEducationLevels({
        diploma: { title: 'Diploma', duration: '2.5 Years', fees: 'RM 18,000/year', intake: 'January, April, August', accreditation: 'MQA Approved' },
        undergraduate: { title: 'Undergraduate', duration: '4 Years', fees: 'RM 35,000/year', intake: 'February, July, September', accreditation: 'EAC Accredited' },
        postgraduate: { title: 'Postgraduate', duration: '1.5-2 Years', fees: 'RM 42,000/year', intake: 'February, September', accreditation: 'MQA Accredited' },
        phd: { title: 'PhD', duration: '3-4 Years', fees: 'RM 38,000/year', intake: 'Throughout the year', accreditation: 'MQA Accredited' },
        certificate: { title: 'Certificates', duration: '3-6 Months', fees: 'RM 5,000-12,000', intake: 'Multiple intakes', accreditation: 'Professional Bodies' }
      });
      
      // ✅ STEP 2: Ab level-based contents fetch karo
      // Pehle check karo ki specialization_id mil gaya
      const specializationId = category?.id;
      
      if (specializationId && selectedLevel) {
        // Level ID mapping (ye tumhare database se match hona chahiye)
        const levelIdMap = {
          'diploma': 1,
          'undergraduate': 2,
          'postgraduate': 3,
          'phd': 4,
          'certificate': 5
        };
        
        const levelId = levelIdMap[selectedLevel];
        
        if (levelId) {
          try {
            const levelContentsRes = await api.get(`/specialization-level-contents/${levelId}`);
            
            const levelContents = levelContentsRes?.data?.data?.rows || [];
            
            // ✅ STEP 3: Level contents se tabs banao
            const map = {};
            const dynamicTabs = [];
            
            levelContents.forEach((c) => {
              if(c.title && c.description){
                map[c.title] = c.description;
                dynamicTabs.push({ 
                  name: c.title, 
                  icon: tabIcons[c.title] || <Info size={16}/> 
                });
                sectionRefs.current[c.title] = React.createRef();
              }
            });
            
            setContentMap(map);
            setTabs(dynamicTabs);
            setActiveTab(dynamicTabs[0]?.name || "");
            
          } catch (levelError) {
            console.warn("Level contents fetch failed:", levelError);
            // Fallback to old method
            const contents = category?.contents || [];
            const map = {};
            const dynamicTabs = [];
            contents.forEach((c) => {
              if(c.tab && c.description){
                map[c.tab] = c.description;
                dynamicTabs.push({ 
                  name: c.tab, 
                  icon: tabIcons[c.tab] || <Info size={16}/> 
                });
                sectionRefs.current[c.tab] = React.createRef();
              }
            });
            setContentMap(map);
            setTabs(dynamicTabs);
            setActiveTab(dynamicTabs[0]?.name || "");
          }
        }
      } else {
        // Fallback: Agar level nahi mila to old method use karo
        const contents = category?.contents || [];
        const map = {};
        const dynamicTabs = [];
        contents.forEach((c) => {
          if(c.tab && c.description){
            map[c.tab] = c.description;
            dynamicTabs.push({ 
              name: c.tab, 
              icon: tabIcons[c.tab] || <Info size={16}/> 
            });
            sectionRefs.current[c.tab] = React.createRef();
          }
        });
        setContentMap(map);
        setTabs(dynamicTabs);
        setActiveTab(dynamicTabs[0]?.name || "");
      }
      
      setFaqs(category?.faqs || res.data?.faqs || []);
      setLoading(false);
      
    } catch(e) { 
      let errorMessage = "Failed to load course data";
      
      if (e.response?.status === 404) {
        errorMessage = `Course "${formattedName}" not found.`;
      } else if (e.response?.data?.message) {
        errorMessage = e.response.data.message;
      } else if (e.message) {
        errorMessage = e.message;
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };
  
  fetchData();
}, [slug, formattedName, selectedLevel]); // ✅ selectedLevel ko dependency mein add karo
useEffect(() => {
  if (selectedLevelFromUrl && educationLevels[selectedLevelFromUrl]) {
    setSelectedLevel(selectedLevelFromUrl);
  } else if (!selectedLevelFromUrl) {
    setSelectedLevel('undergraduate');
  }
  
  // ✅ YE CODE ADD KARO - Hash se scroll karega
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const tabName = tabs.find(tab => 
      tab.name.toLowerCase().replace(/\s+/g, '-') === hash
    )?.name;
    
    if (tabName) {
      setTimeout(() => handleTabClick(tabName), 500);
    }
  }
}, [selectedLevelFromUrl, educationLevels, tabs]);

const handleTabClick = (tabName) => {
  setActiveTab(tabName);
  
  // ✅ YE 2 LINES ADD KARO - URL mein #duration add ho jayega
  const hashName = tabName.toLowerCase().replace(/\s+/g, '-');
  window.history.pushState(null, '', `#${hashName}`);
  
  const element = sectionRefs.current[tabName]?.current;
  if (element) {
    const offset = 200;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading {formattedName}...</p>
          <p className="mt-2 text-sm text-gray-500">Fetching course details</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-2">{error}</p>
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Requested:</strong> {formattedName}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Slug:</strong> {slug}
            </p>
          </div>
          <div className="space-y-3">
            <Link 
              to="/specialization" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Specializations
            </Link>
            <p className="text-sm text-gray-500">
              Check the browser console (F12) for detailed error information
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!categoryData) {
    return null;
  }

  const currentLevel = educationLevels[selectedLevel] || {};
  const detectedCategory = detectCategoryFromSlug(slug, categoryData.name);
  
  let heroImage = null;
  
  if (thumbnailFromState) {
    heroImage = `https://www.educationmalaysia.in/storage/${thumbnailFromState}`;
  }
  else if (seo?.og_image_path) {
    heroImage = `https://www.educationmalaysia.in/storage/${seo.og_image_path}`;
  }
  else if (categoryData?.thumbnail_path) {
    heroImage = `https://www.educationmalaysia.in/storage/${categoryData.thumbnail_path}`;
  }
  else if (categoryData?.image_path) {
    heroImage = `https://www.educationmalaysia.in/storage/${categoryData.image_path}`;
  }
  else if (categoryData?.contents && categoryData.contents.length > 0) {
    const contentWithImage = categoryData.contents.find(c => c.image_path && c.image_path.trim() !== '');
    if (contentWithImage) {
      heroImage = `https://www.educationmalaysia.in/storage/${contentWithImage.image_path}`;
    }
  }
  
  if (!heroImage) {
    heroImage = getCategoryImage(detectedCategory);
  }

  return (
    <>
      <Helmet>
        <title>{seo?.meta_title || `${categoryData.name} ${currentLevel.title || ''} Course in Malaysia`}</title>
        <meta name="description" content={seo?.meta_description || `Complete guide to ${categoryData.name} ${currentLevel.title || ''} programs in Malaysia`} />
        <meta name="keywords" content={seo?.meta_keyword || categoryData.name} />
<link rel="canonical" href={`https://educationmalaysia.in/specialization/${slug}${selectedLevel ? `-${selectedLevel}` : ''}`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/specialization" className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-5 h-5" />
              Back to All Specializations
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            
            <div className="relative h-96">
              <img
                src={heroImage}
                alt={categoryData.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = getCategoryImage('General');
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  {categoryData.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    <span className="font-medium">Study in Malaysia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>Top Malaysian Universities</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-4 border-b border-gray-100">
              <div className="flex items-center text-sm text-gray-600 space-x-2">
                <Link to="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                  <Home size={18}/> Home
                </Link>
                <span>/</span>
                <Link to="/specialization" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                  <Layers size={18}/> Specialization
                </Link>
                <span>/</span>
                <span className="font-medium text-gray-900">{categoryData.name}</span>
                {level && (
                  <>
                    <span>/</span>
                    <span className="font-medium text-blue-600">{currentLevel.title}</span>
                  </>
                )}
              </div>
            </div>

      
<div className="border-b border-gray-200 bg-white shadow-sm">
  <div className="px-4 sm:px-8 py-1">
    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Select Education Level</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {[
        { key: 'diploma', label: 'Diploma', icon: FileText },
        { key: 'undergraduate', label: 'Undergraduate', icon: GraduationCap },
        { key: 'postgraduate', label: 'Postgraduate', icon: Award },
        { key: 'phd', label: 'PhD', icon: Target },
        { key: 'certificate', label: 'Certificates', icon: BookOpen }
      ].map((levelItem) => (
        <Link
          key={levelItem.key}
          to={`/specialization/${slug}-${levelItem.key}`}
          className={`flex items-center justify-center gap-2 px-3 sm:px-5 py-3 rounded-xl font-medium transition-all text-center ${
            selectedLevel === levelItem.key
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <levelItem.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="text-sm sm:text-base whitespace-nowrap">{levelItem.label}</span>
        </Link>
      ))}
    </div>
  </div>
</div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-b border-blue-100">
  <div className="px-4 sm:px-8 py-6">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{currentLevel.title || categoryData.name}</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
          <Clock className="w-5 h-5 text-blue-600" />
        </div>
        <div className="min-w-0">
          <div className="text-sm text-gray-600">Duration</div>
          <div className="font-semibold text-gray-900 whitespace-nowrap text-sm">{currentLevel.duration || 'Varies'}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
          <DollarSign className="w-5 h-5 text-green-600" />
        </div>
        <div className="min-w-0">
          <div className="text-sm text-gray-600">Tuition Fees</div>
          <div className="font-semibold text-gray-900 whitespace-nowrap text-xs sm:text-sm">{currentLevel.fees || 'Contact Us'}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
          <Calendar className="w-5 h-5 text-purple-600" />
        </div>
        <div className="min-w-0">
          <div className="text-sm text-gray-600">Intake</div>
          <div className="font-semibold text-gray-900 whitespace-nowrap text-xs sm:text-sm">{currentLevel.intake || 'Multiple'}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
          <Award className="w-5 h-5 text-orange-600" />
        </div>
        <div className="min-w-0">
          <div className="text-sm text-gray-600">Accreditation</div>
          <div className="font-semibold text-gray-900 whitespace-nowrap text-xs sm:text-sm">{currentLevel.accreditation || 'MQA'}</div>
        </div>
      </div>
    </div>
  </div>
</div>

{tabs.length > 0 && (
<div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg transition-all duration-300">

    <div className="px-4 sm:px-8">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide py-1">
        {tabs.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => handleTabClick(name)}
            className={`flex items-center gap-2 py-4 px-3 font-medium whitespace-nowrap transition-all border-b-2 ${
              activeTab === name
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            {icon}
            <span className="text-sm">{name}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
)}



            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              
              <div className="lg:col-span-2 space-y-8">


                
                {tabs.length > 0 ? (
                  tabs.map(({ name }, idx) => (
                    <motion.section
                      key={name}
                      ref={sectionRefs.current[name]}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="scroll-mt-32"
                    >
                      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-md hover:shadow-lg transition-shadow">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <span className="text-blue-600">{tabIcons[name] || <Info className="w-6 h-6" />}</span>
                          {name}
                        </h2>
                        <div 
                          className="prose prose-blue max-w-none text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: formatHTML(contentMap[name]) }} 
                        />
                      </div>
                    </motion.section>
                  ))
                ) : (
                  <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Course details coming soon.</p>
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <UniversityCard />
                </motion.div>

                {faqs.length > 0 && (
                  <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Lightbulb className="w-6 h-6 text-blue-600" />
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                      {faqs.map((faq, i) => (
                        <details 
                          key={i} 
                          className="group bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl overflow-hidden border border-blue-100"
                        >
                          <summary className="cursor-pointer font-semibold text-gray-900 px-6 py-4 flex items-center justify-between hover:bg-blue-100 transition-colors">
                            <span>{faq.question}</span>
                            <ChevronRight className="w-5 h-5 text-blue-600 group-open:rotate-90 transition-transform" />
                          </summary>
                          <div 
                            className="px-6 pb-4 text-gray-700 leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: formatHTML(faq.answer) }}
                          />
                        </details>
                      ))}
                    </div>
                  </motion.section>
                )}
              </div>

              <div className="lg:col-span-1 space-y-6">
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-md sticky top-24"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-blue-600" />
                    Quick Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Globe className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Language</div>
                        <div className="font-semibold text-gray-900">English Taught</div>
                      </div>
                    </div>
                  </div>
                  <button className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl">
                    Apply Now
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>

                <TrendingCourse2 />
                
                <GetInTouchForm />
                
             <div className="-mt-2">
                  <FeaturedUniversities />
                </div>
              
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default SpecializationDetail;
