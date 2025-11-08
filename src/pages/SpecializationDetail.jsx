
// // // // import React, { useRef, useEffect, useState } from "react";
// // // // import { useParams, Link } from "react-router-dom";
// // // // import { Home, Layers, Info, Clock, DollarSign, Briefcase, Share2 } from "lucide-react";
// // // // import { motion } from "framer-motion";
// // // // import api from "../api";
// // // // import GetInTouchForm from "../components/GetInTouchForm";
// // // // import FeaturedUniversities from "../components/FeaturedUniversities";
// // // // import TrendingCourse2 from "../components/TrandingCourse2";
// // // // import UniversityCard from "../components/UniversityCard";
// // // // import { Helmet } from "react-helmet";

// // // // const tabIcons = {
// // // //   "About Course": <Info size={16} />,
// // // //   "Duration": <Clock size={16} />,
// // // //   "Cost": <DollarSign size={16} />,
// // // //   "Career": <Briefcase size={16} />,
// // // //   "Branches": <Share2 size={16} />,
// // // // };

// // // // const formatHTML = (html) => {
// // // //   if (!html) return "";
// // // //   const textarea = document.createElement("textarea");
// // // //   textarea.innerHTML = html;
// // // //   let decoded = textarea.value;
// // // //   decoded = decoded.replace(/<span[^>]*>/gi, "").replace(/<\/span>/gi, "");
// // // //   decoded = decoded.replace(/style="[^"]*"/gi, "").replace(/&nbsp;/gi, " ");
// // // //   decoded = decoded.replace(/(?:\r\n|\r|\n)/g, "</p><p>");
// // // //   decoded = `<p>${decoded}</p>`.replace(/<p><\/p>/g, "");
// // // //   return decoded;
// // // // };

// // // // const SpecializationDetail = () => {
// // // //   const { name } = useParams();
// // // //   const slug = name.toLowerCase();
// // // //   const formattedName = slug.split("-").map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(" ");

// // // //   const [tabs, setTabs] = useState([]);
// // // //   const [activeTab, setActiveTab] = useState(null);
// // // //   const [contentMap, setContentMap] = useState({});
// // // //   const [faqs, setFaqs] = useState([]);
// // // //   const [seo, setSeo] = useState({});
// // // //   const sectionRefs = useRef({});

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         const res = await api.get(`/specialization-detail-by-slug/${slug}`);
// // // //         const spec = res?.data?.data?.specialization;
// // // //         const contents = spec?.contents || [];
// // // //         setSeo(res.data.data.seo || {});
// // // //         const map = {};
// // // //         const dynamicTabs = [];
// // // //         contents.forEach((c) => {
// // // //           if(c.tab && c.description){
// // // //             map[c.tab] = c.description;
// // // //             dynamicTabs.push({ name: c.tab, icon: tabIcons[c.tab] || <Info size={16}/> });
// // // //             sectionRefs.current[c.tab] = React.createRef();
// // // //           }
// // // //         });
// // // //         setContentMap(map);
// // // //         setTabs(dynamicTabs);
// // // //         setActiveTab(dynamicTabs[0]?.name || "");
// // // //         setFaqs(spec?.faqs || []);
// // // //       } catch(e){ console.error(e); }
// // // //     };
// // // //     fetchData();
// // // //   }, [slug]);

// // // //   const handleTabClick = (tabName) => {
// // // //     sectionRefs.current[tabName]?.current?.scrollIntoView({ behavior:"smooth", block:"start" });
// // // //   };

// // // //   return (
// // // //     <>
// // // //       <Helmet>
// // // //         <title>{seo?.meta_title}</title>
// // // //         <meta name="description" content={seo?.meta_description} />
// // // //         <meta name="keywords" content={seo?.meta_keyword} />
// // // //       </Helmet>

// // // //       <div className="w-full h-50 md:h-50 bg-cover bg-center relative" style={{ backgroundImage:"url('/9169143.jpg')" }}>
// // // //         <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-blue-900/60 z-10" />
// // // //         <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 py-10">
// // // //           <h1 className="text-white text-xl md:text-3xl font-bold mb-2">
// // // //             {formattedName} Course in Malaysia: <span className="text-yellow-300">Complete Guide</span>
// // // //           </h1>
// // // //         </div>
// // // //       </div>

// // // //       <section className="px-3 py-3 md:px-8 lg:px-8 max-w-7xl mx-auto">
// // // //         <div className="mb-6 flex items-center text-sm text-gray-600 space-x-2">
// // // //           <Link to="/" className="flex items-center gap-1 hover:underline"><Home size={18}/> Home</Link>
// // // //           <span>/</span>
// // // //           <Link to="/specialization" className="flex items-center gap-1 hover:underline"><Layers size={18}/> Specialization</Link>
// // // //           <span>/</span>
// // // //           <span className="capitalize font-medium">{formattedName}</span>
// // // //         </div>

// // // //         {/* Tabs */}
// // // //         <div className="sticky top-0 z-30 bg-blue-50/30 backdrop-blur-sm p-3 rounded-xl shadow-sm mb-8 flex flex-wrap gap-3 w-full md:w-auto">
// // // //           {tabs.map(({ name, icon }) => (
// // // //             <button key={name} onClick={()=>handleTabClick(name)}
// // // //               className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border shadow-sm ${
// // // //                 activeTab === name ? "text-blue-700 bg-white border-blue-300 ring-2 ring-blue-200" : "text-gray-700 bg-white hover:bg-blue-50 border-gray-200"
// // // //               }`}>
// // // //               {icon} {name}
// // // //             </button>
// // // //           ))}
// // // //         </div>

// // // //         <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">
// // // //           <div className="space-y-10">
// // // //             {tabs.map(({ name }, idx) => (
// // // //               <motion.div key={name} ref={sectionRefs.current[name]}
// // // //                 className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition"
// // // //                 initial={{ opacity:0, y:50 }} whileInView={{ opacity:1, y:0 }} viewport={{once:true}} transition={{ duration:0.6, delay: idx*0.1 }}>
// // // //                 <h3 className="text-xl md:text-2xl font-semibold text-[#0E3C6E] border-l-4 border-blue-500 pl-3 mb-4">{name}</h3>
// // // //                 <div dangerouslySetInnerHTML={{ __html: formatHTML(contentMap[name]) }} />
// // // //               </motion.div>
// // // //             ))}
// // // //             <UniversityCard />
// // // //             {faqs.length>0 && (
// // // //               <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition">
// // // //                 <h3 className="text-xl md:text-2xl font-semibold text-[#0E3C6E] border-l-4 border-blue-500 pl-3 mb-4">Frequently Asked Questions (FAQs)</h3>
// // // //                 {faqs.map((faq,i)=>(
// // // //                   <details key={i} className="border-l-4 border-blue-500 bg-blue-50 px-4 py-3 rounded-md">
// // // //                     <summary className="cursor-pointer font-semibold text-gray-900 text-base">{faq.question}</summary>
// // // //                     <div className="mt-2 text-gray-800 text-sm leading-relaxed" dangerouslySetInnerHTML={{__html: formatHTML(faq.answer)}}/>
// // // //                   </details>
// // // //                 ))}
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           <div className="space-y-1">
// // // //             <TrendingCourse2 />
// // // //             <GetInTouchForm />
// // // //             <FeaturedUniversities />
// // // //           </div>
// // // //         </div>
// // // //       </section>
// // // //     </>
// // // //   );
// // // // };

// // // // export default SpecializationDetail;


// // // import React, { useRef, useEffect, useState } from "react";
// // // import { useParams, Link } from "react-router-dom";
// // // import { Home, Layers, Info, Clock, DollarSign, Briefcase, Share2, Search, Settings } from "lucide-react";
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
// // // };

// // // const formatHTML = (html) => {
// // //   if (!html) return "";
// // //   const textarea = document.createElement("textarea");
// // //   textarea.innerHTML = html;
// // //   let decoded = textarea.value;
// // //   decoded = decoded.replace(/<span[^>]*>/gi, "").replace(/<\/span>/gi, "");
// // //   decoded = decoded.replace(/style="[^"]*"/gi, "").replace(/&nbsp;/gi, " ");
// // //   decoded = decoded.replace(/(?:\r\n|\r|\n)/g, "</p><p>");
// // //   decoded = `<p>${decoded}</p>`.replace(/<p><\/p>/g, "");
// // //   return decoded;
// // // };

// // // const SpecializationDetail = () => {
// // //   const { name } = useParams();
// // //   const slug = name.toLowerCase();
// // //   const formattedName = slug.split("-").map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(" ");

// // //   const [tabs, setTabs] = useState([]);
// // //   const [activeTab, setActiveTab] = useState(null);
// // //   const [contentMap, setContentMap] = useState({});
// // //   const [faqs, setFaqs] = useState([]);
// // //   const [seo, setSeo] = useState({});
// // //   const [searchQuery, setSearchQuery] = useState('');
// // //   const sectionRefs = useRef({});

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const res = await api.get(`/specialization-detail-by-slug/${slug}`);
// // //         const spec = res?.data?.data?.specialization;
// // //         const contents = spec?.contents || [];
// // //         setSeo(res.data.data.seo || {});
// // //         const map = {};
// // //         const dynamicTabs = [];
// // //         contents.forEach((c) => {
// // //           if(c.tab && c.description){
// // //             map[c.tab] = c.description;
// // //             dynamicTabs.push({ name: c.tab, icon: tabIcons[c.tab] || <Info size={16}/> });
// // //             sectionRefs.current[c.tab] = React.createRef();
// // //           }
// // //         });
// // //         setContentMap(map);
// // //         setTabs(dynamicTabs);
// // //         setActiveTab(dynamicTabs[0]?.name || "");
// // //         setFaqs(spec?.faqs || []);
// // //       } catch(e){ console.error(e); }
// // //     };
// // //     fetchData();
// // //   }, [slug]);

// // //   const handleTabClick = (tabName) => {
// // //     sectionRefs.current[tabName]?.current?.scrollIntoView({ behavior:"smooth", block:"start" });
// // //   };

// // //   const handleSearch = (value) => {
// // //     setSearchQuery(value);
// // //     // Add your search logic here
// // //   };

// // //   const handleFilterClick = () => {
// // //     // Add your filter logic here
// // //     console.log('Filter clicked');
// // //   };

// // //   return (
// // //     <>
// // //       <Helmet>
// // //         <title>{seo?.meta_title}</title>
// // //         <meta name="description" content={seo?.meta_description} />
// // //         <meta name="keywords" content={seo?.meta_keyword} />
// // //       </Helmet>

// // //       {/* New Header */}
// // //       <div className="w-full bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600">
// // //         <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
// // //           <div className="mb-8">
// // //             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
// // //               {formattedName} Course in Malaysia
// // //             </h1>
// // //             <p className="text-teal-100">
// // //               Complete Guide to <span className="font-semibold">{formattedName}</span> Programs
// // //             </p>
// // //           </div>
// // //           <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
// // //             <div className="flex-1 relative">
// // //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// // //               <input
// // //                 type="text"
// // //                 placeholder="Search courses, universities..."
// // //                 value={searchQuery}
// // //                 onChange={(e) => handleSearch(e.target.value)}
// // //                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
// // //               />
// // //             </div>
// // //             <button
// // //               onClick={handleFilterClick}
// // //               className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap"
// // //             >
// // //               <Settings className="w-5 h-5" />
// // //               <span>Filters</span>
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <section className="px-3 py-3 md:px-8 lg:px-8 max-w-7xl mx-auto">
// // //         <div className="mb-6 flex items-center text-sm text-gray-600 space-x-2">
// // //           <Link to="/" className="flex items-center gap-1 hover:underline"><Home size={18}/> Home</Link>
// // //           <span>/</span>
// // //           <Link to="/specialization" className="flex items-center gap-1 hover:underline"><Layers size={18}/> Specialization</Link>
// // //           <span>/</span>
// // //           <span className="capitalize font-medium">{formattedName}</span>
// // //         </div>

// // //         {/* Tabs */}
// // //         <div className="sticky top-0 z-30 bg-blue-50/30 backdrop-blur-sm p-3 rounded-xl shadow-sm mb-8 flex flex-wrap gap-3 w-full md:w-auto">
// // //           {tabs.map(({ name, icon }) => (
// // //             <button key={name} onClick={()=>handleTabClick(name)}
// // //               className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border shadow-sm ${
// // //                 activeTab === name ? "text-blue-700 bg-white border-blue-300 ring-2 ring-blue-200" : "text-gray-700 bg-white hover:bg-blue-50 border-gray-200"
// // //               }`}>
// // //               {icon} {name}
// // //             </button>
// // //           ))}
// // //         </div>

// // //         <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">
// // //           <div className="space-y-10">
// // //             {tabs.map(({ name }, idx) => (
// // //               <motion.div key={name} ref={sectionRefs.current[name]}
// // //                 className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition"
// // //                 initial={{ opacity:0, y:50 }} whileInView={{ opacity:1, y:0 }} viewport={{once:true}} transition={{ duration:0.6, delay: idx*0.1 }}>
// // //                 <h3 className="text-xl md:text-2xl font-semibold text-[#0E3C6E] border-l-4 border-blue-500 pl-3 mb-4">{name}</h3>
// // //                 <div dangerouslySetInnerHTML={{ __html: formatHTML(contentMap[name]) }} />
// // //               </motion.div>
// // //             ))}
// // //             <UniversityCard />
// // //             {faqs.length>0 && (
// // //               <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition">
// // //                 <h3 className="text-xl md:text-2xl font-semibold text-[#0E3C6E] border-l-4 border-blue-500 pl-3 mb-4">Frequently Asked Questions (FAQs)</h3>
// // //                 {faqs.map((faq,i)=>(
// // //                   <details key={i} className="border-l-4 border-blue-500 bg-blue-50 px-4 py-3 rounded-md">
// // //                     <summary className="cursor-pointer font-semibold text-gray-900 text-base">{faq.question}</summary>
// // //                     <div className="mt-2 text-gray-800 text-sm leading-relaxed" dangerouslySetInnerHTML={{__html: formatHTML(faq.answer)}}/>
// // //                   </details>
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </div>

// // //           <div className="space-y-1">
// // //             <TrendingCourse2 />
// // //             <GetInTouchForm />
// // //             <FeaturedUniversities />
// // //           </div>
// // //         </div>
// // //       </section>
// // //     </>
// // //   );
// // // };

// // // export default SpecializationDetail;
// // import React, { useRef, useEffect, useState } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import { Home, Layers, Info, Clock, DollarSign, Briefcase, Share2 } from "lucide-react";
// // import { motion } from "framer-motion";
// // import api from "../api";
// // import GetInTouchForm from "../components/GetInTouchForm";
// // import FeaturedUniversities from "../components/FeaturedUniversities";
// // import TrendingCourse2 from "../components/TrandingCourse2";
// // import UniversityCard from "../components/UniversityCard";
// // import { Helmet } from "react-helmet";

// // const tabIcons = {
// //   "About Course": <Info size={16} />,
// //   "Duration": <Clock size={16} />,
// //   "Cost": <DollarSign size={16} />,
// //   "Career": <Briefcase size={16} />,
// //   "Branches": <Share2 size={16} />,
// // };

// // const formatHTML = (html) => {
// //   if (!html) return "";
// //   const textarea = document.createElement("textarea");
// //   textarea.innerHTML = html;
// //   let decoded = textarea.value;
// //   decoded = decoded.replace(/<span[^>]*>/gi, "").replace(/<\/span>/gi, "");
// //   decoded = decoded.replace(/style="[^"]*"/gi, "").replace(/&nbsp;/gi, " ");
// //   decoded = decoded.replace(/(?:\r\n|\r|\n)/g, "</p><p>");
// //   decoded = `<p>${decoded}</p>`.replace(/<p><\/p>/g, "");
// //   return decoded;
// // };

// // const SpecializationDetail = () => {
// //   const { name } = useParams();
// //   const slug = name.toLowerCase();
// //   const formattedName = slug.split("-").map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(" ");

// //   const [tabs, setTabs] = useState([]);
// //   const [activeTab, setActiveTab] = useState(null);
// //   const [contentMap, setContentMap] = useState({});
// //   const [faqs, setFaqs] = useState([]);
// //   const [seo, setSeo] = useState({});
// //   const sectionRefs = useRef({});

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const res = await api.get(`/specialization-detail-by-slug/${slug}`);
// //         const spec = res?.data?.data?.specialization;
// //         const contents = spec?.contents || [];
// //         setSeo(res.data.data.seo || {});
// //         const map = {};
// //         const dynamicTabs = [];
// //         contents.forEach((c) => {
// //           if(c.tab && c.description){
// //             map[c.tab] = c.description;
// //             dynamicTabs.push({ name: c.tab, icon: tabIcons[c.tab] || <Info size={16}/> });
// //             sectionRefs.current[c.tab] = React.createRef();
// //           }
// //         });
// //         setContentMap(map);
// //         setTabs(dynamicTabs);
// //         setActiveTab(dynamicTabs[0]?.name || "");
// //         setFaqs(spec?.faqs || []);
// //       } catch(e){ console.error(e); }
// //     };
// //     fetchData();
// //   }, [slug]);

// //   const handleTabClick = (tabName) => {
// //     sectionRefs.current[tabName]?.current?.scrollIntoView({ behavior:"smooth", block:"start" });
// //   };

// //   return (
// //     <>
// //       <Helmet>
// //         <title>{seo?.meta_title}</title>
// //         <meta name="description" content={seo?.meta_description} />
// //         <meta name="keywords" content={seo?.meta_keyword} />
// //       </Helmet>

// //       {/* New Header */}
// //       <div className="w-full bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600">
// //         <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
// //           <div className="text-center">
// //             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
// //               {formattedName} Course in Malaysia
// //             </h1>
// //             <p className="text-teal-100">
// //               Complete Guide to <span className="font-semibold">{formattedName}</span> Programs
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       <section className="px-3 py-3 md:px-8 lg:px-8 max-w-7xl mx-auto">
// //         <div className="mb-6 flex items-center text-sm text-gray-600 space-x-2">
// //           <Link to="/" className="flex items-center gap-1 hover:underline"><Home size={18}/> Home</Link>
// //           <span>/</span>
// //           <Link to="/specialization" className="flex items-center gap-1 hover:underline"><Layers size={18}/> Specialization</Link>
// //           <span>/</span>
// //           <span className="capitalize font-medium">{formattedName}</span>
// //         </div>

// //         {/* Tabs */}
// //         <div className="sticky top-0 z-30 bg-blue-50/30 backdrop-blur-sm p-3 rounded-xl shadow-sm mb-8 flex flex-wrap gap-3 w-full md:w-auto">
// //           {tabs.map(({ name, icon }) => (
// //             <button key={name} onClick={()=>handleTabClick(name)}
// //               className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border shadow-sm ${
// //                 activeTab === name ? "text-blue-700 bg-white border-blue-300 ring-2 ring-blue-200" : "text-gray-700 bg-white hover:bg-blue-50 border-gray-200"
// //               }`}>
// //               {icon} {name}
// //             </button>
// //           ))}
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">
// //           <div className="space-y-10">
// //             {tabs.map(({ name }, idx) => (
// //               <motion.div key={name} ref={sectionRefs.current[name]}
// //                 className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition"
// //                 initial={{ opacity:0, y:50 }} whileInView={{ opacity:1, y:0 }} viewport={{once:true}} transition={{ duration:0.6, delay: idx*0.1 }}>
// //                 <h3 className="text-xl md:text-2xl font-semibold text-[#0E3C6E] border-l-4 border-blue-500 pl-3 mb-4">{name}</h3>
// //                 <div dangerouslySetInnerHTML={{ __html: formatHTML(contentMap[name]) }} />
// //               </motion.div>
// //             ))}
// //             <UniversityCard />
// //             {faqs.length>0 && (
// //               <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition">
// //                 <h3 className="text-xl md:text-2xl font-semibold text-[#0E3C6E] border-l-4 border-blue-500 pl-3 mb-4">Frequently Asked Questions (FAQs)</h3>
// //                 {faqs.map((faq,i)=>(
// //                   <details key={i} className="border-l-4 border-blue-500 bg-blue-50 px-4 py-3 rounded-md">
// //                     <summary className="cursor-pointer font-semibold text-gray-900 text-base">{faq.question}</summary>
// //                     <div className="mt-2 text-gray-800 text-sm leading-relaxed" dangerouslySetInnerHTML={{__html: formatHTML(faq.answer)}}/>
// //                   </details>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           <div className="space-y-1">
// //             <TrendingCourse2 />
// //             <GetInTouchForm />
// //             <FeaturedUniversities />
// //           </div>
// //         </div>
// //       </section>
// //     </>
// //   );
// // };

// // export default SpecializationDetail;
// import React, { useRef, useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
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
// };

// const formatHTML = (html) => {
//   if (!html) return "";
//   const textarea = document.createElement("textarea");
//   textarea.innerHTML = html;
//   let decoded = textarea.value;
//   decoded = decoded.replace(/<span[^>]*>/gi, "").replace(/<\/span>/gi, "");
//   decoded = decoded.replace(/style="[^"]*"/gi, "").replace(/&nbsp;/gi, " ");
//   decoded = decoded.replace(/(?:\r\n|\r|\n)/g, "</p><p>");
//   decoded = `<p>${decoded}</p>`.replace(/<p><\/p>/g, "");
//   return decoded;
// };

// const SpecializationDetail = () => {
//   const { name } = useParams();
//   const slug = name.toLowerCase();
//   const formattedName = slug.split("-").map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(" ");

//   const [tabs, setTabs] = useState([]);
//   const [activeTab, setActiveTab] = useState(null);
//   const [contentMap, setContentMap] = useState({});
//   const [faqs, setFaqs] = useState([]);
//   const [seo, setSeo] = useState({});
//   const [specializationData, setSpecializationData] = useState(null);
//   const sectionRefs = useRef({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await api.get(`/specialization-detail-by-slug/${slug}`);
//         const spec = res?.data?.data?.specialization;
//         const contents = spec?.contents || [];
        
//         setSpecializationData(spec);
//         setSeo(res.data.data.seo || {});
        
//         const map = {};
//         const dynamicTabs = [];
//         contents.forEach((c) => {
//           if(c.tab && c.description){
//             map[c.tab] = c.description;
//             dynamicTabs.push({ name: c.tab, icon: tabIcons[c.tab] || <Info size={16}/> });
//             sectionRefs.current[c.tab] = React.createRef();
//           }
//         });
        
//         setContentMap(map);
//         setTabs(dynamicTabs);
//         setActiveTab(dynamicTabs[0]?.name || "");
//         setFaqs(spec?.faqs || []);
//       } catch(e){ 
//         console.error(e); 
//       }
//     };
//     fetchData();
//   }, [slug]);

//   const handleTabClick = (tabName) => {
//     setActiveTab(tabName);
//     sectionRefs.current[tabName]?.current?.scrollIntoView({ 
//       behavior:"smooth", 
//       block:"start"
//     });
//   };

//   if (!specializationData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Helmet>
//         <title>{seo?.meta_title || `${formattedName} Course in Malaysia`}</title>
//         <meta name="description" content={seo?.meta_description || `Complete guide to ${formattedName} programs in Malaysia`} />
//         <meta name="keywords" content={seo?.meta_keyword || formattedName} />
//       </Helmet>

//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
//         {/* Modern Header with Gradient */}
//         <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <Link to="/specialization" className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-6">
//               <ArrowLeft className="w-5 h-5" />
//               Back to All Specializations
//             </Link>
            
//             <div className="text-center mt-4">
//               <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
//                 {formattedName}
//               </h1>
//               <p className="text-blue-100 text-lg">
//                 Complete Guide to <span className="font-semibold">{formattedName}</span> Programs in Malaysia
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            
//             {/* Hero Image Section */}
//             {specializationData?.image && (
//               <div className="relative h-96">
//                 <img
//                   src={specializationData.image}
//                   alt={formattedName}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-8">
//                   <div className="flex items-center gap-3 mb-3">
//                     {specializationData?.rating && (
//                       <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full">
//                         <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                         <span className="text-sm font-semibold text-gray-900">{specializationData.rating}</span>
//                         {specializationData?.reviews && (
//                           <span className="text-sm text-gray-600">({specializationData.reviews} reviews)</span>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Breadcrumb */}
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
//                 <span className="font-medium text-gray-900">{formattedName}</span>
//               </div>
//             </div>

//             {/* Sticky Tabs Navigation */}
//             <div className="border-b border-gray-200 bg-white sticky top-0 z-20 shadow-sm">
//               <div className="px-8 py-4">
//                 <div className="flex flex-wrap gap-3">
//                   {tabs.map(({ name, icon }) => (
//                     <button
//                       key={name}
//                       onClick={() => handleTabClick(name)}
//                       className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
//                         activeTab === name
//                           ? 'bg-blue-600 text-white shadow-lg'
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                     >
//                       {icon}
//                       {name}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Main Content Grid */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              
//               {/* Left Column - Main Content */}
//               <div className="lg:col-span-2 space-y-8">
                
//                 {/* Dynamic Content Sections from API */}
//                 {tabs.map(({ name }, idx) => (
//                   <motion.section
//                     key={name}
//                     ref={sectionRefs.current[name]}
//                     initial={{ opacity: 0, y: 50 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.6, delay: idx * 0.1 }}
//                     className="scroll-mt-24"
//                   >
//                     <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-md hover:shadow-lg transition-shadow">
//                       <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                         {tabIcons[name] || <Info className="w-6 h-6 text-blue-600" />}
//                         <span className="text-blue-600">{name}</span>
//                       </h2>
//                       <div 
//                         className="prose prose-blue max-w-none text-gray-700 leading-relaxed"
//                         dangerouslySetInnerHTML={{ __html: formatHTML(contentMap[name]) }} 
//                       />
//                     </div>
//                   </motion.section>
//                 ))}

//                 {/* University Cards */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 50 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <UniversityCard />
//                 </motion.div>

//                 {/* FAQs Section */}
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

//               {/* Right Column - Sidebar */}
//               <div className="lg:col-span-1 space-y-6">
                
//                 {/* Quick Info Card */}
//                 {specializationData && (
//                   <motion.div
//                     initial={{ opacity: 0, x: 50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.6 }}
//                     className="bg-white border border-gray-200 rounded-xl p-6 shadow-md sticky top-24"
//                   >
//                     <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                       <Building2 className="w-6 h-6 text-blue-600" />
//                       Quick Information
//                     </h3>
//                     <div className="space-y-4">
//                       {specializationData.duration && (
//                         <div className="flex items-center gap-3">
//                           <div className="bg-blue-100 p-2 rounded-lg">
//                             <Clock className="w-5 h-5 text-blue-600" />
//                           </div>
//                           <div>
//                             <div className="text-sm text-gray-600">Duration</div>
//                             <div className="font-semibold text-gray-900">{specializationData.duration}</div>
//                           </div>
//                         </div>
//                       )}
//                       {specializationData.fees && (
//                         <div className="flex items-center gap-3">
//                           <div className="bg-green-100 p-2 rounded-lg">
//                             <DollarSign className="w-5 h-5 text-green-600" />
//                           </div>
//                           <div>
//                             <div className="text-sm text-gray-600">Tuition Fees</div>
//                             <div className="font-semibold text-gray-900">{specializationData.fees}</div>
//                           </div>
//                         </div>
//                       )}
//                       {specializationData.intake && (
//                         <div className="flex items-center gap-3">
//                           <div className="bg-purple-100 p-2 rounded-lg">
//                             <Calendar className="w-5 h-5 text-purple-600" />
//                           </div>
//                           <div>
//                             <div className="text-sm text-gray-600">Intake</div>
//                             <div className="font-semibold text-gray-900">{specializationData.intake}</div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                     <button className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl">
//                       Apply Now
//                       <ChevronRight className="w-5 h-5" />
//                     </button>
//                   </motion.div>
//                 )}

//                 {/* Sidebar Components */}
//                 <TrendingCourse2 />
//                 <GetInTouchForm />
//                 <FeaturedUniversities />
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
import { useParams, Link } from "react-router-dom";
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
};

const formatHTML = (html) => {
  if (!html) return "";
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  let decoded = textarea.value;
  decoded = decoded.replace(/<span[^>]*>/gi, "").replace(/<\/span>/gi, "");
  decoded = decoded.replace(/style="[^"]*"/gi, "").replace(/&nbsp;/gi, " ");
  decoded = decoded.replace(/(?:\r\n|\r|\n)/g, "</p><p>");
  decoded = `<p>${decoded}</p>`.replace(/<p><\/p>/g, "");
  return decoded;
};

const SpecializationDetail = () => {
  const { name } = useParams();
  const slug = name.toLowerCase();
  const formattedName = slug.split("-").map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(" ");

  const [selectedLevel, setSelectedLevel] = useState('undergraduate');
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [contentMap, setContentMap] = useState({});
  const [faqs, setFaqs] = useState([]);
  const [seo, setSeo] = useState({});
  const [specializationData, setSpecializationData] = useState(null);
  const [educationLevels, setEducationLevels] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/specialization-detail-by-slug/${slug}`);
        const spec = res?.data?.data?.specialization;
        const contents = spec?.contents || [];
        
        setSpecializationData(spec);
        setSeo(res.data.data.seo || {});
        
        // Education levels data (API se aayega ya default)
        setEducationLevels(spec?.educationLevels || {
          diploma: { title: 'Diploma', duration: '2.5 Years', fees: 'RM 18,000/year', intake: 'January, April, August', accreditation: 'MQA Approved' },
          undergraduate: { title: 'Undergraduate', duration: '4 Years', fees: 'RM 35,000/year', intake: 'February, July, September', accreditation: 'EAC Accredited' },
          postgraduate: { title: 'Postgraduate', duration: '1.5-2 Years', fees: 'RM 42,000/year', intake: 'February, September', accreditation: 'MQA Accredited' },
          phd: { title: 'PhD', duration: '3-4 Years', fees: 'RM 38,000/year', intake: 'Throughout the year', accreditation: 'MQA Accredited' },
          certificate: { title: 'Certificates', duration: '3-6 Months', fees: 'RM 5,000-12,000', intake: 'Multiple intakes', accreditation: 'Professional Bodies' }
        });
        
        const map = {};
        const dynamicTabs = [];
        contents.forEach((c) => {
          if(c.tab && c.description){
            map[c.tab] = c.description;
            dynamicTabs.push({ name: c.tab, icon: tabIcons[c.tab] || <Info size={16}/> });
            sectionRefs.current[c.tab] = React.createRef();
          }
        });
        
        setContentMap(map);
        setTabs(dynamicTabs);
        setActiveTab(dynamicTabs[0]?.name || "");
        setFaqs(spec?.faqs || []);
      } catch(e){ 
        console.error(e); 
      }
    };
    fetchData();
  }, [slug]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    sectionRefs.current[tabName]?.current?.scrollIntoView({ 
      behavior:"smooth", 
      block:"start"
    });
  };

  if (!specializationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const currentLevel = educationLevels[selectedLevel] || {};
  const heroImage = specializationData?.image || 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1200';

  return (
    <>
      <Helmet>
        <title>{seo?.meta_title || `${formattedName} Course in Malaysia`}</title>
        <meta name="description" content={seo?.meta_description || `Complete guide to ${formattedName} programs in Malaysia`} />
        <meta name="keywords" content={seo?.meta_keyword || formattedName} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Modern Header with Gradient */}
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
            
            {/* Hero Image Section with Title Overlay */}
            <div className="relative h-96">
              <img
                src={heroImage}
                alt={formattedName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-3">
                  {specializationData?.rating && (
                    <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900">{specializationData.rating}</span>
                      {specializationData?.reviews && (
                        <span className="text-sm text-gray-600">({specializationData.reviews} reviews)</span>
                      )}
                    </div>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  {formattedName}
                </h1>
                <div className="flex flex-wrap gap-4 text-white/90">
                  {specializationData?.university && (
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      <span className="font-medium">{specializationData.university}</span>
                    </div>
                  )}
                  {specializationData?.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{specializationData.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Breadcrumb */}
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
                <span className="font-medium text-gray-900">{formattedName}</span>
              </div>
            </div>

            {/* Education Level Selector */}
            <div className="border-b border-gray-200 bg-white sticky top-0 z-20 shadow-sm">
              <div className="px-8 py-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Select Education Level</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { key: 'diploma', label: 'Diploma', icon: FileText },
                    { key: 'undergraduate', label: 'Undergraduate', icon: GraduationCap },
                    { key: 'postgraduate', label: 'Postgraduate', icon: Award },
                    { key: 'phd', label: 'PhD', icon: Target },
                    { key: 'certificate', label: 'Certificates', icon: BookOpen }
                  ].map((level) => (
                    <button
                      key={level.key}
                      onClick={() => setSelectedLevel(level.key)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                        selectedLevel === level.key
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <level.icon className="w-5 h-5" />
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Level Info Cards */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-b border-blue-100">
              <div className="px-8 py-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{currentLevel.title || formattedName}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Duration</div>
                      <div className="font-semibold text-gray-900">{currentLevel.duration || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Tuition Fees</div>
                      <div className="font-semibold text-gray-900">{currentLevel.fees || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Intake</div>
                      <div className="font-semibold text-gray-900">{currentLevel.intake || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Award className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Accreditation</div>
                      <div className="font-semibold text-gray-900">{currentLevel.accreditation || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Tabs Navigation */}
            <div className="border-b border-gray-200 bg-white sticky top-[140px] z-10 shadow-sm">
              <div className="px-8 py-4">
                <div className="flex flex-wrap gap-3">
                  {tabs.map(({ name, icon }) => (
                    <button
                      key={name}
                      onClick={() => handleTabClick(name)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                        activeTab === name
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {icon}
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Dynamic Content Sections from API */}
                {tabs.map(({ name }, idx) => (
                  <motion.section
                    key={name}
                    ref={sectionRefs.current[name]}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="scroll-mt-24"
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
                ))}

                {/* University Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <UniversityCard />
                </motion.div>

                {/* FAQs Section */}
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

              {/* Right Column - Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Quick Info Card */}
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

                {/* Sidebar Components */}
                <TrendingCourse2 />
                <GetInTouchForm />
                <FeaturedUniversities />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default SpecializationDetail;