

// // // // import React, { useState, useEffect } from "react";
// // // // import { useParams } from "react-router-dom";
// // // // import api from "../../api";
// // // // import HelpUniversityCourses from "./HelpUniversityCourses";
// // // // import PopularCourses from "./PopularCourses";

// // // // // ✅ FIXED formatHTML function
// // // // const formatHTML = (html) => {
// // // //   if (!html) return "";

// // // //   const textarea = document.createElement("textarea");
// // // //   textarea.innerHTML = html;
// // // //   let decoded = textarea.value;

// // // //   // Clean unnecessary tags
// // // //   decoded = decoded.replace(/<span[^>]*>/gi, "");
// // // //   decoded = decoded.replace(/<\/span>/gi, "");
// // // //   decoded = decoded.replace(/style="[^"]*"/gi, "");
// // // //   decoded = decoded.replace(/&nbsp;/gi, " ");
  
// // // //   // Remove colons from headings
// // // //   decoded = decoded.replace(/<h([1-6])[^>]*>([^<]*?)\s*:\s*<\/h\1>/gi, (_m, level, title) => {
// // // //     return `<h${level}>${title.trim()}</h${level}>`;
// // // //   });
// // // //   decoded = decoded.replace(/<p>\s*:\s*/gi, "<p>");

// // // //   // ✅ FIX 1: Convert ONLY standalone <strong> or <b> that look like headings
// // // //   // This converts "14th among Malaysian universities" to proper heading
// // // //   decoded = decoded.replace(
// // // //     /<p>\s*<(strong|b)>([^<]{10,})<\/\1>\s*<\/p>/gi,
// // // //     '<h3 class="text-lg font-bold text-gray-900 mb-3 mt-4">$2</h3>'
// // // //   );

// // // //   // ✅ FIX 2: Keep <strong> and <b> inside paragraphs as bold text
// // // //   // This keeps paragraph text bold when needed
// // // //   decoded = decoded.replace(
// // // //     /<(strong|b)>/gi,
// // // //     '<span class="font-semibold text-gray-900">'
// // // //   );
// // // //   decoded = decoded.replace(/<\/(strong|b)>/gi, '</span>');

// // // //   // Handle line breaks
// // // //   decoded = decoded.replace(/(?:\r\n|\r|\n)/g, "</p><p>");
// // // //   decoded = `<p>${decoded}</p>`;
// // // //   decoded = decoded.replace(/<p><\/p>/g, "");

// // // //   // ✅ Paragraph styling - make text normal weight
// // // //   decoded = decoded.replace(
// // // //     /<p>/g,
// // // //     '<p class="text-sm text-gray-700 leading-relaxed mb-4">'
// // // //   );

// // // //   // ✅ Table styling
// // // //   decoded = decoded.replace(
// // // //     /<table(.*?)>/g,
// // // //     `<div class="overflow-auto rounded-xl shadow-sm border border-gray-200 my-6"><table class="w-full border-collapse" $1>`
// // // //   );
// // // //   decoded = decoded.replace(/<\/table>/g, "</table></div>");
// // // //   decoded = decoded.replace(
// // // //     /<thead>/g,
// // // //     '<thead class="bg-gradient-to-r from-blue-500 to-blue-600 text-black text-left text-sm">'
// // // //   );
// // // //   decoded = decoded.replace(
// // // //     /<th>/g,
// // // //     '<th class="px-4 py-3 font-medium whitespace-nowrap border-b border-blue-200 text-white text-sm">'
// // // //   );
// // // //   decoded = decoded.replace(/<tr>/g, '<tr class="even:bg-blue-50">');
// // // //   decoded = decoded.replace(
// // // //     /<td>(.*?)<\/td>/g,
// // // //     '<td class="px-4 py-3 text-sm text-gray-800">$1</td>'
// // // //   );

// // // //   // ✅ Checkbox
// // // //   decoded = decoded.replace(
// // // //     /<input[^>]*type=["']checkbox["'][^>]*>/gi,
// // // //     `<span class="inline-block w-4 h-4 rounded border border-gray-400 mr-2 bg-white"></span>`
// // // //   );

// // // //   // ✅ Bullet & Numbered lists
// // // //   decoded = decoded.replace(
// // // //     /<ul>/g,
// // // //     '<ul class="list-disc pl-6 space-y-2 text-gray-800 mb-4">'
// // // //   );
// // // //   decoded = decoded.replace(
// // // //     /<ol>/g,
// // // //     '<ol class="list-decimal pl-6 space-y-2 text-gray-800 mb-4">'
// // // //   );
// // // //   decoded = decoded.replace(
// // // //     /<li>/g,
// // // //     '<li class="mb-1 text-sm">'
// // // //   );

// // // //   return decoded;
// // // // };

// // // // const Overview = () => {
// // // //   const { slug } = useParams();
// // // //   const [overviewData, setOverviewData] = useState([]);
// // // //   const [isLoading, setIsLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     const fetchUniversityOverview = async () => {
// // // //       try {
// // // //         const response = await api.get(`/university-overview/${slug}`);
// // // //         const { overviews } = response.data.data;
// // // //         setOverviewData(overviews);
// // // //       } catch (error) {
// // // //         console.error('Error fetching university overview:', error);
// // // //       } finally {
// // // //         setIsLoading(false);
// // // //       }
// // // //     };

// // // //     if (slug) {
// // // //       fetchUniversityOverview();
// // // //     }
// // // //   }, [slug]);

// // // //   if (isLoading) {
// // // //     return <div className="text-center p-10">Loading overview...</div>;
// // // //   }
  
// // // //   return (
// // // //     <div className="space-y-10 px-1 md:px-0 py-8 text-black bg-white">
// // // //       {/* Map through overview sections */}
// // // //       {overviewData.map((section, index) => (
// // // //         <div key={index} className="space-y-6">
// // // //           <div className="border-l-4 border-blue-600 pl-4">
// // // //             <h2 className="text-2xl font-bold text-blue-900">
// // // //               {section.title}
// // // //             </h2>
// // // //           </div>
          
// // // //           {/* Add thumbnail image if available */}
// // // //           {section.thumbnail_path && (
// // // //             <div className="w-full overflow-hidden rounded-xl shadow-lg">
// // // //               <img
// // // //                 src={`https://www.educationmalaysia.in/${section.thumbnail_path}`}
// // // //                 alt={section.title}
// // // //                 className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
// // // //               />
// // // //             </div>
// // // //           )}

// // // //           <div 
// // // //             className="space-y-6 text-base leading-relaxed"
// // // //             dangerouslySetInnerHTML={{ __html: formatHTML(section.description) }}
// // // //           />
// // // //         </div>
// // // //       ))}

// // // //       {/* Keep existing additional components */}
// // // //       <HelpUniversityCourses />
// // // //       <PopularCourses />
// // // //     </div>
// // // //   );
// // // // };

// // // // // export default Overview;
// // // // import React, { useState, useEffect } from "react";
// // // // import { useParams } from "react-router-dom";
// // // // import api from "../../api";
// // // // import HelpUniversityCourses from "./HelpUniversityCourses";
// // // // import PopularCourses from "./PopularCourses";

// // // // // ✅ FIXED formatHTML function
// // // // const formatHTML = (html) => {
// // // //   if (!html) return "";

// // // //   const textarea = document.createElement("textarea");
// // // //   textarea.innerHTML = html;
// // // //   let decoded = textarea.value;

// // // //   // Clean unnecessary tags
// // // //   decoded = decoded.replace(/<span[^>]*>/gi, "");
// // // //   decoded = decoded.replace(/<\/span>/gi, "");
// // // //   decoded = decoded.replace(/style="[^"]*"/gi, "");
// // // //   decoded = decoded.replace(/&nbsp;/gi, " ");
  
// // // //   // Remove colons from headings
// // // //   decoded = decoded.replace(/<h([1-6])[^>]*>([^<]*?)\s*:\s*<\/h\1>/gi, (_m, level, title) => {
// // // //     return `<h${level}>${title.trim()}</h${level}>`;
// // // //   });
// // // //   decoded = decoded.replace(/<p>\s*:\s*/gi, "<p>");

// // // //   // ✅ FIX 1: Convert ONLY standalone <strong> or <b> that look like headings
// // // //   decoded = decoded.replace(
// // // //     /<p>\s*<(strong|b)>([^<]{10,})<\/\1>\s*<\/p>/gi,
// // // //     '<h3 class="text-lg font-bold text-gray-900 mb-3 mt-4">$2</h3>'
// // // //   );

// // // //   // ✅ FIX 2: Keep <strong> and <b> inside paragraphs as bold text
// // // //   decoded = decoded.replace(
// // // //     /<(strong|b)>/gi,
// // // //     '<span class="font-semibold text-gray-900">'
// // // //   );
// // // //   decoded = decoded.replace(/<\/(strong|b)>/gi, '</span>');

// // // //   // Handle line breaks
// // // //   decoded = decoded.replace(/(?:\r\n|\r|\n)/g, "</p><p>");
// // // //   decoded = `<p>${decoded}</p>`;
// // // //   decoded = decoded.replace(/<p><\/p>/g, "");

// // // //   // ✅ Paragraph styling
// // // //   decoded = decoded.replace(
// // // //     /<p>/g,
// // // //     '<p class="text-sm text-gray-700 leading-relaxed mb-4">'
// // // //   );

// // // //   // ✅ Table styling - WITH SPECIAL CLASS FOR TARGETING
// // // //   decoded = decoded.replace(
// // // //     /<table(.*?)>/g,
// // // //     `<div class="overflow-auto rounded-xl shadow-sm border border-gray-200 my-6"><table class="university-info-table w-full border-collapse" $1>`
// // // //   );
// // // //   decoded = decoded.replace(/<\/table>/g, "</table></div>");
// // // //   decoded = decoded.replace(
// // // //     /<thead>/g,
// // // //     '<thead class="bg-gradient-to-r from-blue-500 to-blue-600 text-black text-left text-sm">'
// // // //   );
// // // //   decoded = decoded.replace(
// // // //     /<th>/g,
// // // //     '<th class="px-4 py-3 font-medium whitespace-nowrap border-b border-blue-200 text-white text-sm">'
// // // //   );
// // // //   decoded = decoded.replace(/<tr>/g, '<tr class="even:bg-blue-50">');
// // // //   decoded = decoded.replace(
// // // //     /<td>(.*?)<\/td>/g,
// // // //     '<td class="px-4 py-3 text-sm text-gray-800">$1</td>'
// // // //   );

// // // //   // ✅ Checkbox
// // // //   decoded = decoded.replace(
// // // //     /<input[^>]*type=["']checkbox["'][^>]*>/gi,
// // // //     `<span class="inline-block w-4 h-4 rounded border border-gray-400 mr-2 bg-white"></span>`
// // // //   );

// // // //   // ✅ Bullet & Numbered lists
// // // //   decoded = decoded.replace(
// // // //     /<ul>/g,
// // // //     '<ul class="list-disc pl-6 space-y-2 text-gray-800 mb-4">'
// // // //   );
// // // //   decoded = decoded.replace(
// // // //     /<ol>/g,
// // // //     '<ol class="list-decimal pl-6 space-y-2 text-gray-800 mb-4">'
// // // //   );
// // // //   decoded = decoded.replace(
// // // //     /<li>/g,
// // // //     '<li class="mb-1 text-sm">'
// // // //   );

// // // //   return decoded;
// // // // };

// // // // const Overview = () => {
// // // //   const { slug } = useParams();
// // // //   const [overviewData, setOverviewData] = useState([]);
// // // //   const [isLoading, setIsLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     const fetchUniversityOverview = async () => {
// // // //       try {
// // // //         const response = await api.get(`/university-overview/${slug}`);
// // // //         const { overviews } = response.data.data;
// // // //         setOverviewData(overviews);
// // // //       } catch (error) {
// // // //         console.error('Error fetching university overview:', error);
// // // //       } finally {
// // // //         setIsLoading(false);
// // // //       }
// // // //     };

// // // //     if (slug) {
// // // //       fetchUniversityOverview();
// // // //     }
// // // //   }, [slug]);

// // // //   if (isLoading) {
// // // //     return <div className="text-center p-10">Loading overview...</div>;
// // // //   }
  
// // // //   return (
// // // //     <div className="space-y-10 px-1 md:px-0 py-8 text-black bg-white">
// // // //       {/* Map through overview sections */}
// // // //       {overviewData.map((section, index) => (
// // // //         <div key={index} className="space-y-6">
// // // //           <div className="border-l-4 border-blue-600 pl-4">
// // // //             <h2 className="text-2xl font-bold text-blue-900">
// // // //               {section.title}
// // // //             </h2>
// // // //           </div>
          
// // // //           {/* Add thumbnail image if available */}
// // // //           {section.thumbnail_path && (
// // // //             <div className="w-full overflow-hidden rounded-xl shadow-lg">
// // // //               <img
// // // //                 src={`https://www.educationmalaysia.in/${section.thumbnail_path}`}
// // // //                 alt={section.title}
// // // //                 className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
// // // //               />
// // // //             </div>
// // // //           )}

// // // //           <div 
// // // //             className="space-y-6 text-base leading-relaxed"
// // // //             dangerouslySetInnerHTML={{ __html: formatHTML(section.description) }}
// // // //           />
// // // //         </div>
// // // //       ))}

// // // //       {/* Keep existing additional components */}
// // // //       <HelpUniversityCourses />
// // // //       <PopularCourses />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Overview;


// // // // import React, { useState, useEffect } from "react";
// // // // import { useParams } from "react-router-dom";
// // // // import api from "../../api";
// // // // import HelpUniversityCourses from "./HelpUniversityCourses";
// // // // import PopularCourses from "./PopularCourses";

// // // // /* ============================================================
// // // //     FINAL CLEAN HTML FORMATTER (NO BLANK SPACE + FIXED TABLES)
// // // //    ============================================================ */
// // // // const formatHTML = (html) => {
// // // //   if (!html) return "";

// // // //   const textarea = document.createElement("textarea");
// // // //   textarea.innerHTML = html;
// // // //   let decoded = textarea.value;

// // // //   /* 🔥 Remove first redundant About <p> completely */
// // // //   decoded = decoded.replace(/^<p[^>]*>.*?About.*?<\/p>/i, "");

// // // //   /* 🔥 Remove spans, inline styles, NBSP */
// // // //   decoded = decoded.replace(/<span[^>]*>/gi, "");
// // // //   decoded = decoded.replace(/<\/span>/gi, "");
// // // //   decoded = decoded.replace(/style="[^"]*"/gi, "");
// // // //   decoded = decoded.replace(/&nbsp;/gi, " ");

// // // //   /* 🔥 Convert <p><strong>Heading</strong></p> → H3 */
// // // //   decoded = decoded.replace(
// // // //     /<p>\s*<(strong|b)>([^<]{5,})<\/\1>\s*<\/p>/gi,
// // // //     '<h3 class="text-lg font-bold text-gray-900 mb-3 mt-6">$2</h3>'
// // // //   );

// // // //   /* Bold inside text stays inline */
// // // //   decoded = decoded.replace(
// // // //     /<(strong|b)>/gi,
// // // //     '<span class="font-semibold text-gray-900">'
// // // //   );
// // // //   decoded = decoded.replace(/<\/(strong|b)>/gi, "</span>");

// // // //   /* 🔥 Style paragraphs */
// // // //   decoded = decoded.replace(
// // // //     /<p>/gi,
// // // //     '<p class="text-sm text-gray-700 leading-relaxed mb-4">'
// // // //   );

// // // //   /* 🔥 Remove empty <p> → fixes whitespace */
// // // //   decoded = decoded.replace(/<p[^>]*>\s*<\/p>/gi, "");

// // // //   /* ============================================================
// // // //       TABLE FIX (HEADER BLUE ONLY)
// // // //      ============================================================ */

// // // //   // Wrap table
// // // //   decoded = decoded.replace(
// // // //     /<table[^>]*>/gi,
// // // //     `<div class="overflow-auto rounded-xl shadow-md border border-gray-200 my-6">
// // // //       <table class="w-full border-collapse text-sm">`
// // // //   );
// // // //   decoded = decoded.replace(/<\/table>/gi, "</table></div>");

// // // //   // Style THEAD (blue header)
// // // //   decoded = decoded.replace(
// // // //     /<thead[^>]*>/gi,
// // // //     `<thead class="bg-blue-600 text-white">`
// // // //   );

// // // //   // Style first row containing <th> if no thead exists
// // // //   decoded = decoded.replace(
// // // //     /<tr[^>]*>(\s*<th[\s\S]*?<\/tr>)/i,
// // // //     `<tr class="bg-blue-600 text-white">$1`
// // // //   );

// // // //   // Style tbody
// // // //   decoded = decoded.replace(
// // // //     /<tbody[^>]*>/gi,
// // // //     `<tbody class="text-gray-800">`
// // // //   );

// // // //   // Table header cells
// // // //   decoded = decoded.replace(
// // // //     /<th[^>]*>/gi,
// // // //     `<th class="px-4 py-3 border-b border-gray-200 text-left font-semibold whitespace-nowrap">`
// // // //   );

// // // //   // Table rows
// // // //   decoded = decoded.replace(
// // // //     /<tr[^>]*>/gi,
// // // //     `<tr class="even:bg-blue-50">`
// // // //   );

// // // //   // Table cells
// // // //   decoded = decoded.replace(
// // // //     /<td[^>]*>/gi,
// // // //     `<td class="px-4 py-3 border-b border-gray-100">`
// // // //   );

// // // //   /* 🔥 Checkbox Fix */
// // // //   decoded = decoded.replace(
// // // //     /<input[^>]*type=["']checkbox["'][^>]*>/gi,
// // // //     `<span class="inline-block w-4 h-4 rounded border border-gray-400 mr-2 bg-white"></span>`
// // // //   );

// // // //   /* 🔥 Lists */
// // // //   decoded = decoded.replace(
// // // //     /<ul>/gi,
// // // //     '<ul class="list-disc pl-6 space-y-2 text-gray-800 mb-4">'
// // // //   );
// // // //   decoded = decoded.replace(
// // // //     /<ol>/gi,
// // // //     '<ol class="list-decimal pl-6 space-y-2 text-gray-800 mb-4">'
// // // //   );
// // // //   decoded = decoded.replace(/<li>/gi, '<li class="mb-1 text-sm">');

// // // //   return decoded;
// // // // };

// // // // /* ============================================================
// // // //     CHECK VALID CONTENT
// // // //    ============================================================ */
// // // // const hasValidContent = (description) => {
// // // //   if (!description) return false;

// // // //   const stripped = description
// // // //     .replace(/<[^>]*>/g, "")
// // // //     .replace(/&nbsp;/g, " ")
// // // //     .trim();

// // // //   return stripped.length >= 15;
// // // // };

// // // // /* ============================================================
// // // //     MAIN COMPONENT
// // // //    ============================================================ */
// // // // const Overview = () => {
// // // //   const { slug } = useParams();
// // // //   const [overviewData, setOverviewData] = useState([]);
// // // //   const [isLoading, setIsLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     const fetchUniversityOverview = async () => {
// // // //       try {
// // // //         const response = await api.get(`/university-overview/${slug}`);
// // // //         const { overviews } = response.data.data;
// // // //         setOverviewData(overviews || []);
// // // //       } catch (error) {
// // // //         console.error("Error fetching overview:", error);
// // // //         setOverviewData([]);
// // // //       } finally {
// // // //         setIsLoading(false);
// // // //       }
// // // //     };

// // // //     if (slug) fetchUniversityOverview();
// // // //   }, [slug]);

// // // //   const validSections = overviewData.filter((section) => {
// // // //     const hasTitle = section.title?.trim() !== "";
// // // //     const hasDesc = hasValidContent(section.description);
// // // //     const hasImage = section.thumbnail_path?.trim() !== "";

// // // //     return hasTitle && (hasDesc || hasImage);
// // // //   });

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="flex items-center justify-center p-10">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
// // // //           <p className="text-gray-600">Loading overview...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="space-y-10 px-1 md:px-0 py-8 text-black bg-white">
// // // //       {validSections.length > 0 ? (
// // // //         validSections.map((section, index) => (
// // // //           <div key={index} className="space-y-6">
// // // //             {/* Title */}
// // // //             <div className="border-l-4 border-blue-600 pl-4">
// // // //               <h2 className="text-2xl font-bold text-blue-900">
// // // //                 {section.title}
// // // //               </h2>
// // // //             </div>

// // // //             {/* Image */}
// // // //             {section.thumbnail_path && (
// // // //               <div className="w-full overflow-hidden rounded-xl shadow-lg">
// // // //                 <img
// // // //                   src={`https://www.educationmalaysia.in/storage/${section.thumbnail_path}`}
// // // //                   alt={section.title}
// // // //                   className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
// // // //                 />
// // // //               </div>
// // // //             )}

// // // //             {/* Description */}
// // // //             {hasValidContent(section.description) && (
// // // //               <div
// // // //                 className="space-y-6 text-base leading-relaxed"
// // // //                 dangerouslySetInnerHTML={{
// // // //                   __html: formatHTML(section.description),
// // // //                 }}
// // // //               />
// // // //             )}
// // // //           </div>
// // // //         ))
// // // //       ) : (
// // // //         <div className="text-center py-10">
// // // //           <div className="p-6 bg-gray-50 rounded-lg inline-block">
// // // //             <p className="text-gray-500 text-lg mb-2">
// // // //               📄 No overview available
// // // //             </p>
// // // //             <p className="text-gray-400 text-sm">
// // // //               Content will be updated soon
// // // //             </p>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       <HelpUniversityCourses />
// // // //       <PopularCourses />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Overview;


// // // // import React, { useState, useEffect } from "react";
// // // // import { useParams } from "react-router-dom";
// // // // import api from "../../api";
// // // // import HelpUniversityCourses from "./HelpUniversityCourses";
// // // // import PopularCourses from "./PopularCourses";


// // // // /* ============================================================
// // // //     FINAL CLEAN HTML FORMATTER (NO BLANK SPACE + FIXED TABLES)
// // // //    ============================================================ */
// // // // const formatHTML = (html) => {
// // // //   if (!html) return "";

// // // //   const textarea = document.createElement("textarea");
// // // //   textarea.innerHTML = html;
// // // //   let decoded = textarea.value;

// // // //   /* 🔥 Remove first redundant About <p> completely */
// // // //   decoded = decoded.replace(/^<p[^>]*>.*?About.*?<\/p>/i, "");

// // // //   /* 🔥 Remove spans, inline styles, NBSP */
// // // //   decoded = decoded.replace(/<span[^>]*>/gi, "");
// // // //   decoded = decoded.replace(/<\/span>/gi, "");
// // // //   decoded = decoded.replace(/style="[^"]*"/gi, "");
// // // //   decoded = decoded.replace(/&nbsp;/gi, " ");

// // // //   /* 🔥 Convert <p><strong>Heading</strong></p> → H3 */
// // // //   decoded = decoded.replace(
// // // //     /<p>\s*<(strong|b)>([^<]{5,})<\/\1>\s*<\/p>/gi,
// // // //     '<h3 class="text-lg font-bold text-gray-900 mb-3 mt-6">$2</h3>'
// // // //   );

// // // //   /* Bold inside text stays inline */
// // // //   decoded = decoded.replace(
// // // //     /<(strong|b)>/gi,
// // // //     '<span class="font-semibold text-gray-900">'
// // // //   );
// // // //   decoded = decoded.replace(/<\/(strong|b)>/gi, "</span>");

// // // //   /* 🔥 Style paragraphs */
// // // //   decoded = decoded.replace(
// // // //     /<p>/gi,
// // // //     '<p class="text-sm text-gray-700 leading-relaxed mb-4">'
// // // //   );

// // // //   /* 🔥 Remove empty <p> → fixes whitespace */
// // // //   decoded = decoded.replace(/<p[^>]*>\s*<\/p>/gi, "");

// // // //   /* ============================================================
// // // //       TABLE FIX (HEADER BLUE ONLY)
// // // //      ============================================================ */

// // // //   // Wrap table
// // // //   decoded = decoded.replace(
// // // //     /<table[^>]*>/gi,
// // // //     `<div class="overflow-auto rounded-xl shadow-md border border-gray-200 my-6">
// // // //       <table class="w-full border-collapse text-sm">`
// // // //   );
// // // //   decoded = decoded.replace(/<\/table>/gi, "</table></div>");

// // // //   // Style THEAD (blue header)
// // // //   decoded = decoded.replace(
// // // //     /<thead[^>]*>/gi,
// // // //     `<thead class="bg-blue-600 text-white">`
// // // //   );

// // // //   // Style first row containing <th> if no thead exists
// // // //   decoded = decoded.replace(
// // // //     /<tr[^>]*>(\s*<th[\s\S]*?<\/tr>)/i,
// // // //     `<tr class="bg-blue-600 text-white">$1`
// // // //   );

// // // //   // Style tbody
// // // //   decoded = decoded.replace(
// // // //     /<tbody[^>]*>/gi,
// // // //     `<tbody class="text-gray-800">`
// // // //   );

// // // //   // Table header cells
// // // //   decoded = decoded.replace(
// // // //     /<th[^>]*>/gi,
// // // //     `<th class="px-4 py-3 border-b border-gray-200 text-left font-semibold whitespace-nowrap">`
// // // //   );

// // // //   // Table rows
// // // //   decoded = decoded.replace(
// // // //     /<tr[^>]*>/gi,
// // // //     `<tr class="even:bg-blue-50">`
// // // //   );

// // // //   // Table cells
// // // //   decoded = decoded.replace(
// // // //     /<td[^>]*>/gi,
// // // //     `<td class="px-4 py-3 border-b border-gray-100">`
// // // //   );

// // // //   /* 🔥 Checkbox Fix */
// // // //   decoded = decoded.replace(
// // // //     /<input[^>]*type=["']checkbox["'][^>]*>/gi,
// // // //     `<span class="inline-block w-4 h-4 rounded border border-gray-400 mr-2 bg-white"></span>`
// // // //   );

// // // //   /* 🔥 Lists */
// // // //   decoded = decoded.replace(
// // // //     /<ul>/gi,
// // // //     '<ul class="list-disc pl-6 space-y-2 text-gray-800 mb-4">'
// // // //   );
// // // //   decoded = decoded.replace(
// // // //     /<ol>/gi,
// // // //     '<ol class="list-decimal pl-6 space-y-2 text-gray-800 mb-4">'
// // // //   );
// // // //   decoded = decoded.replace(/<li>/gi, '<li class="mb-1 text-sm">');

// // // //   return decoded;
// // // // };

// // // // /* ============================================================
// // // //     CHECK VALID CONTENT
// // // //    ============================================================ */
// // // // const hasValidContent = (description) => {
// // // //   if (!description) return false;

// // // //   const stripped = description
// // // //     .replace(/<[^>]*>/g, "")
// // // //     .replace(/&nbsp;/g, " ")
// // // //     .trim();

// // // //   return stripped.length >= 15;
// // // // };

// // // // /* ============================================================
// // // //     MAIN COMPONENT
// // // //    ============================================================ */
// // // // const Overview = () => {
// // // //   const { slug } = useParams();
// // // //   const [overviewData, setOverviewData] = useState([]);
// // // //   const [isLoading, setIsLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     const fetchUniversityOverview = async () => {
// // // //       try {
// // // //         const response = await api.get(`/university-overview/${slug}`);
// // // //         const { overviews } = response.data.data;
// // // //         setOverviewData(overviews || []);
// // // //       } catch (error) {
// // // //         console.error("Error fetching overview:", error);
// // // //         setOverviewData([]);
// // // //       } finally {
// // // //         setIsLoading(false);
// // // //       }
// // // //     };

// // // //     if (slug) fetchUniversityOverview();
// // // //   }, [slug]);

// // // //   const validSections = overviewData.filter((section) => {
// // // //     const hasTitle = section.title?.trim() !== "";
// // // //     const hasDesc = hasValidContent(section.description);
// // // //     const hasImage = section.thumbnail_path?.trim() !== "";

// // // //     return hasTitle && (hasDesc || hasImage);
// // // //   });

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="flex items-center justify-center p-10">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
// // // //           <p className="text-gray-600">Loading overview...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="space-y-10 px-1 md:px-0 py-8 text-black bg-white">
// // // //       {validSections.length > 0 ? (
// // // //         validSections.map((section, index) => (
// // // //           <div key={index} className="space-y-6">
// // // //             {/* Title */}
// // // //             <div className="border-l-4 border-blue-600 pl-4">
// // // //               <h2 className="text-2xl font-bold text-blue-900">
// // // //                 {section.title}
// // // //               </h2>
// // // //             </div>

// // // //             {/* Image - WITH /storage/ PREFIX */}
// // // //             {/* {section.thumbnail_path && (
// // // //               <div className="w-full overflow-hidden rounded-xl shadow-lg">
// // // //                 <img
// // // //                   src={`https://www.educationmalaysia.in/storage/${section.thumbnail_path}`}
// // // //                   alt={section.title}
// // // //                   className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
// // // //                 />
// // // //               </div>
// // // //             )} */}

// // // //             {section.thumbnail_path && (
// // // //   <div className="w-full overflow-hidden rounded-xl shadow-lg">

// // // //     <img
// // // //       src={
// // // //         "https://www.educationmalaysia.in/storage/" +
// // // //         section.thumbnail_path
// // // //           .replace(/^storage\//, "")   // remove storage/
// // // //           .replace(/^public\//, "")    // remove public/
// // // //           .replace(/^\//, "")          // remove starting slash
// // // //       }
// // // //       alt={section.title}
// // // //       className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
// // // //       onError={(e) => {
// // // //         console.log("IMAGE FAILED:", section.thumbnail_path);
// // // //         e.target.src = "https://www.educationmalaysia.in/default-image.jpg";
// // // //       }}
// // // //     />

// // // //   </div>
// // // // )}


// // // //             {/* Description */}
// // // //             {hasValidContent(section.description) && (
// // // //               <div
// // // //                 className="space-y-6 text-base leading-relaxed"
// // // //                 dangerouslySetInnerHTML={{
// // // //                   __html: formatHTML(section.description),
// // // //                 }}
// // // //               />
// // // //             )}
// // // //           </div>
// // // //         ))
// // // //       ) : (
// // // //         <div className="text-center py-10">
// // // //           <div className="p-6 bg-gray-50 rounded-lg inline-block">
// // // //             <p className="text-gray-500 text-lg mb-2">
// // // //               📄 No overview available
// // // //             </p>
// // // //             <p className="text-gray-400 text-sm">
// // // //               Content will be updated soon
// // // //             </p>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       <HelpUniversityCourses />
// // // //       <PopularCourses />

// // // //     </div>
// // // //   );
// // // // };

// // // // export default Overview;

// // // // import React, { useState, useEffect } from "react";
// // // // import { useParams } from "react-router-dom";
// // // // import api from "../../api";
// // // // import HelpUniversityCourses from "./HelpUniversityCourses";
// // // // import PopularCourses from "./PopularCourses";
// // // // // import FeaturedUniversities from "../FeaturedUniversities"; // 👈 ADD THIS IMPORT
// // // // import FeaturedUniversities from "../../components/FeaturedUniversities";


// // // // /* ============================================================
// // // //     FINAL CLEAN HTML FORMATTER (NO BLANK SPACE + FIXED TABLES)
// // // //    ============================================================ */
// // // // const formatHTML = (html) => {
// // // //   if (!html) return "";

// // // //   const textarea = document.createElement("textarea");
// // // //   textarea.innerHTML = html;
// // // //   let decoded = textarea.value;

// // // //   /* 🔥 Remove first redundant About <p> completely */
// // // //   decoded = decoded.replace(/^<p[^>]*>.*?About.*?<\/p>/i, "");

// // // //   /* 🔥 Remove spans, inline styles, NBSP */
// // // //   decoded = decoded.replace(/<span[^>]*>/gi, "");
// // // //   decoded = decoded.replace(/<\/span>/gi, "");
// // // //   decoded = decoded.replace(/style="[^"]*"/gi, "");
// // // //   decoded = decoded.replace(/&nbsp;/gi, " ");

// // // //   /* 🔥 Convert <p><strong>Heading</strong></p> → H3 */
// // // //   decoded = decoded.replace(
// // // //     /<p>\s*<(strong|b)>([^<]{5,})<\/\1>\s*<\/p>/gi,
// // // //     '<h3 class="text-lg font-bold text-gray-900 mb-3 mt-6">$2</h3>'
// // // //   );

// // // //   /* Bold inside text stays inline */
// // // //   decoded = decoded.replace(
// // // //     /<(strong|b)>/gi,
// // // //     '<span class="font-semibold text-gray-900">'
// // // //   );
// // // //   decoded = decoded.replace(/<\/(strong|b)>/gi, "</span>");

// // // //   /* 🔥 Style paragraphs */
// // // //   decoded = decoded.replace(
// // // //     /<p>/gi,
// // // //     '<p class="text-sm text-gray-700 leading-relaxed mb-4">'
// // // //   );

// // // //   /* 🔥 Remove empty <p> → fixes whitespace */
// // // //   decoded = decoded.replace(/<p[^>]*>\s*<\/p>/gi, "");

// // // //   /* ============================================================
// // // //       TABLE FIX (HEADER BLUE ONLY)
// // // //      ============================================================ */

// // // //   // Wrap table
// // // //   decoded = decoded.replace(
// // // //     /<table[^>]*>/gi,
// // // //     `<div class="overflow-auto rounded-xl shadow-md border border-gray-200 my-6">
// // // //       <table class="w-full border-collapse text-sm">`
// // // //   );
// // // //   decoded = decoded.replace(/<\/table>/gi, "</table></div>");

// // // //   // Style THEAD (blue header)
// // // //   decoded = decoded.replace(
// // // //     /<thead[^>]*>/gi,
// // // //     `<thead class="bg-blue-600 text-white">`
// // // //   );

// // // //   // Style first row containing <th> if no thead exists
// // // //   decoded = decoded.replace(
// // // //     /<tr[^>]*>(\s*<th[\s\S]*?<\/tr>)/i,
// // // //     `<tr class="bg-blue-600 text-white">$1`
// // // //   );

// // // //   // Style tbody
// // // //   decoded = decoded.replace(
// // // //     /<tbody[^>]*>/gi,
// // // //     `<tbody class="text-gray-800">`
// // // //   );

// // // //   // Table header cells
// // // //   decoded = decoded.replace(
// // // //     /<th[^>]*>/gi,
// // // //     `<th class="px-4 py-3 border-b border-gray-200 text-left font-semibold whitespace-nowrap">`
// // // //   );

// // // //   // Table rows
// // // //   decoded = decoded.replace(
// // // //     /<tr[^>]*>/gi,
// // // //     `<tr class="even:bg-blue-50">`
// // // //   );

// // // //   // Table cells
// // // //   decoded = decoded.replace(
// // // //     /<td[^>]*>/gi,
// // // //     `<td class="px-4 py-3 border-b border-gray-100">`
// // // //   );

// // // //   /* 🔥 Checkbox Fix */
// // // //   decoded = decoded.replace(
// // // //     /<input[^>]*type=["']checkbox["'][^>]*>/gi,
// // // //     `<span class="inline-block w-4 h-4 rounded border border-gray-400 mr-2 bg-white"></span>`
// // // //   );

// // // //   /* 🔥 Lists */
// // // //   decoded = decoded.replace(
// // // //     /<ul>/gi,
// // // //     '<ul class="list-disc pl-6 space-y-2 text-gray-800 mb-4">'
// // // //   );
// // // //   decoded = decoded.replace(
// // // //     /<ol>/gi,
// // // //     '<ol class="list-decimal pl-6 space-y-2 text-gray-800 mb-4">'
// // // //   );
// // // //   decoded = decoded.replace(/<li>/gi, '<li class="mb-1 text-sm">');

// // // //   return decoded;
// // // // };

// // // // /* ============================================================
// // // //     CHECK VALID CONTENT
// // // //    ============================================================ */
// // // // const hasValidContent = (description) => {
// // // //   if (!description) return false;

// // // //   const stripped = description
// // // //     .replace(/<[^>]*>/g, "")
// // // //     .replace(/&nbsp;/g, " ")
// // // //     .trim();

// // // //   return stripped.length >= 15;
// // // // };

// // // // /* ============================================================
// // // //     MAIN COMPONENT
// // // //    ============================================================ */
// // // // const Overview = () => {
// // // //   const { slug } = useParams();
// // // //   const [overviewData, setOverviewData] = useState([]);
// // // //   const [isLoading, setIsLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     const fetchUniversityOverview = async () => {
// // // //       try {
// // // //         const response = await api.get(`/university-overview/${slug}`);
// // // //         const { overviews } = response.data.data;
// // // //         setOverviewData(overviews || []);
// // // //       } catch (error) {
// // // //         console.error("Error fetching overview:", error);
// // // //         setOverviewData([]);
// // // //       } finally {
// // // //         setIsLoading(false);
// // // //       }
// // // //     };

// // // //     if (slug) fetchUniversityOverview();
// // // //   }, [slug]);

// // // //   const validSections = overviewData.filter((section) => {
// // // //     const hasTitle = section.title?.trim() !== "";
// // // //     const hasDesc = hasValidContent(section.description);
// // // //     const hasImage = section.thumbnail_path?.trim() !== "";

// // // //     return hasTitle && (hasDesc || hasImage);
// // // //   });

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="flex items-center justify-center p-10">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
// // // //           <p className="text-gray-600">Loading overview...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="space-y-10 px-1 md:px-0 py-8 text-black bg-white">
// // // //       {validSections.length > 0 ? (
// // // //         validSections.map((section, index) => (
// // // //           <div key={index} className="space-y-6">
// // // //             {/* Title */}
// // // //             <div className="border-l-4 border-blue-600 pl-4">
// // // //               <h2 className="text-2xl font-bold text-blue-900">
// // // //                 {section.title}
// // // //               </h2>
// // // //             </div>

// // // //             {/* Image - WITH /storage/ PREFIX */}
// // // //             {section.thumbnail_path && (
// // // //               <div className="w-full overflow-hidden rounded-xl shadow-lg">
// // // //                 <img
// // // //                   src={
// // // //                     "https://www.educationmalaysia.in/storage/" +
// // // //                     section.thumbnail_path
// // // //                       .replace(/^storage\//, "")   // remove storage/
// // // //                       .replace(/^public\//, "")    // remove public/
// // // //                       .replace(/^\//, "")          // remove starting slash
// // // //                   }
// // // //                   alt={section.title}
// // // //                   className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
// // // //                   onError={(e) => {
// // // //                     console.log("IMAGE FAILED:", section.thumbnail_path);
// // // //                     e.target.src = "https://www.educationmalaysia.in/storage/default-image.jpg";
// // // //                   }}
// // // //                 />
// // // //               </div>
// // // //             )}

// // // //             {/* Description */}
// // // //             {hasValidContent(section.description) && (
// // // //               <div
// // // //                 className="space-y-6 text-base leading-relaxed"
// // // //                 dangerouslySetInnerHTML={{
// // // //                   __html: formatHTML(section.description),
// // // //                 }}
// // // //               />
// // // //             )}
// // // //           </div>
// // // //         ))
// // // //       ) : (
// // // //         <div className="text-center py-10">
// // // //           <div className="p-6 bg-gray-50 rounded-lg inline-block">
// // // //             <p className="text-gray-500 text-lg mb-2">
// // // //               📄 No overview available
// // // //             </p>
// // // //             <p className="text-gray-400 text-sm">
// // // //               Content will be updated soon
// // // //             </p>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       <HelpUniversityCourses />
// // // //       <PopularCourses />
      
// // // //       {/* 👇 FEATURED UNIVERSITIES ADDED HERE */}
// // // //       <FeaturedUniversities />

// // // //     </div>
// // // //   );
// // // // };

// // // // export default Overview;


// // // import React, { useState, useEffect } from "react";
// // // import { useParams, Link } from "react-router-dom";
// // // import { FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";
// // // import api from "../../api";
// // // import { API_URL } from "../../config";
// // // import HelpUniversityCourses from "./HelpUniversityCourses";
// // // import PopularCourses from "./PopularCourses";

// // // /* ============================================================
// // //     FINAL CLEAN HTML FORMATTER (NO BLANK SPACE + FIXED TABLES)
// // //    ============================================================ */
// // // const formatHTML = (html) => {
// // //   if (!html) return "";

// // //   const textarea = document.createElement("textarea");
// // //   textarea.innerHTML = html;
// // //   let decoded = textarea.value;

// // //   /* 🔥 Remove first redundant About <p> completely */
// // //   decoded = decoded.replace(/^<p[^>]*>.*?About.*?<\/p>/i, "");

// // //   /* 🔥 Remove spans, inline styles, NBSP */
// // //   decoded = decoded.replace(/<span[^>]*>/gi, "");
// // //   decoded = decoded.replace(/<\/span>/gi, "");
// // //   decoded = decoded.replace(/style="[^"]*"/gi, "");
// // //   decoded = decoded.replace(/&nbsp;/gi, " ");

// // //   /* 🔥 Convert <p><strong>Heading</strong></p> → H3 */
// // //   decoded = decoded.replace(
// // //     /<p>\s*<(strong|b)>([^<]{5,})<\/\1>\s*<\/p>/gi,
// // //     '<h3 class="text-lg font-bold text-gray-900 mb-3 mt-6">$2</h3>'
// // //   );

// // //   /* Bold inside text stays inline */
// // //   decoded = decoded.replace(
// // //     /<(strong|b)>/gi,
// // //     '<span class="font-semibold text-gray-900">'
// // //   );
// // //   decoded = decoded.replace(/<\/(strong|b)>/gi, "</span>");

// // //   /* 🔥 Style paragraphs */
// // //   decoded = decoded.replace(
// // //     /<p>/gi,
// // //     '<p class="text-sm text-gray-700 leading-relaxed mb-4">'
// // //   );

// // //   /* 🔥 Remove empty <p> → fixes whitespace */
// // //   decoded = decoded.replace(/<p[^>]*>\s*<\/p>/gi, "");

// // //   /* ============================================================
// // //       TABLE FIX (HEADER BLUE ONLY)
// // //      ============================================================ */

// // //   // Wrap table
// // //   decoded = decoded.replace(
// // //     /<table[^>]*>/gi,
// // //     `<div class="overflow-auto rounded-xl shadow-md border border-gray-200 my-6">
// // //       <table class="w-full border-collapse text-sm">`
// // //   );
// // //   decoded = decoded.replace(/<\/table>/gi, "</table></div>");

// // //   // Style THEAD (blue header)
// // //   decoded = decoded.replace(
// // //     /<thead[^>]*>/gi,
// // //     `<thead class="bg-blue-600 text-white">`
// // //   );

// // //   // Style first row containing <th> if no thead exists
// // //   decoded = decoded.replace(
// // //     /<tr[^>]*>(\s*<th[\s\S]*?<\/tr>)/i,
// // //     `<tr class="bg-blue-600 text-white">$1`
// // //   );

// // //   // Style tbody
// // //   decoded = decoded.replace(
// // //     /<tbody[^>]*>/gi,
// // //     `<tbody class="text-gray-800">`
// // //   );

// // //   // Table header cells
// // //   decoded = decoded.replace(
// // //     /<th[^>]*>/gi,
// // //     `<th class="px-4 py-3 border-b border-gray-200 text-left font-semibold whitespace-nowrap">`
// // //   );

// // //   // Table rows
// // //   decoded = decoded.replace(
// // //     /<tr[^>]*>/gi,
// // //     `<tr class="even:bg-blue-50">`
// // //   );

// // //   // Table cells
// // //   decoded = decoded.replace(
// // //     /<td[^>]*>/gi,
// // //     `<td class="px-4 py-3 border-b border-gray-100">`
// // //   );

// // //   /* 🔥 Checkbox Fix */
// // //   decoded = decoded.replace(
// // //     /<input[^>]*type=["']checkbox["'][^>]*>/gi,
// // //     `<span class="inline-block w-4 h-4 rounded border border-gray-400 mr-2 bg-white"></span>`
// // //   );

// // //   /* 🔥 Lists */
// // //   decoded = decoded.replace(
// // //     /<ul>/gi,
// // //     '<ul class="list-disc pl-6 space-y-2 text-gray-800 mb-4">'
// // //   );
// // //   decoded = decoded.replace(
// // //     /<ol>/gi,
// // //     '<ol class="list-decimal pl-6 space-y-2 text-gray-800 mb-4">'
// // //   );
// // //   decoded = decoded.replace(/<li>/gi, '<li class="mb-1 text-sm">');

// // //   return decoded;
// // // };

// // // /* ============================================================
// // //     CHECK VALID CONTENT
// // //    ============================================================ */
// // // const hasValidContent = (description) => {
// // //   if (!description) return false;

// // //   const stripped = description
// // //     .replace(/<[^>]*>/g, "")
// // //     .replace(/&nbsp;/g, " ")
// // //     .trim();

// // //   return stripped.length >= 15;
// // // };

// // // /* ============================================================
// // //     FEATURED UNIVERSITIES COMPONENT (INLINE)
// // //    ============================================================ */
// // // const FeaturedUniversitiesSection = ({ slug }) => {
// // //   const [universities, setUniversities] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchFeaturedUniversities = async () => {
// // //       if (!slug) return;
      
// // //       try {
// // //         setIsLoading(true);
        
// // //         // Fetch from university overview endpoint
// // //         const response = await api.get(`/university-overview/${slug}`);
        
// // //         // Try to get featured universities from response
// // //         const featuredUnis = 
// // //           response.data?.data?.featured_universities || 
// // //           response.data?.featured_universities || 
// // //           [];
        
// // //         setUniversities(featuredUnis);
// // //       } catch (error) {
// // //         console.error("Error fetching featured universities:", error);
// // //         setUniversities([]);
// // //       } finally {
// // //         setIsLoading(false);
// // //       }
// // //     };

// // //     fetchFeaturedUniversities();
// // //   }, [slug]);

// // //   // Helper function to build correct image URL
// // //   const getImageUrl = (logoPath) => {
// // //     if (!logoPath) return null;
    
// // //     if (logoPath.startsWith('http://') || logoPath.startsWith('https://')) {
// // //       return logoPath;
// // //     }
    
// // //     const cleanPath = logoPath.replace(/^\/+|storage\/+|public\/+/g, '');
// // //     return `${API_URL}/storage/${cleanPath}`;
// // //   };

// // //   if (isLoading) {
// // //     return (
// // //       <div className="mt-12 mb-8">
// // //         <div className="border-l-4 border-blue-600 pl-4 mb-6">
// // //           <h2 className="text-2xl font-bold text-blue-900">
// // //             Featured Universities
// // //           </h2>
// // //         </div>
// // //         <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
// // //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (universities.length === 0) {
// // //     return (
// // //       <div className="mt-12 mb-8">
// // //         <div className="border-l-4 border-blue-600 pl-4 mb-6">
// // //           <h2 className="text-2xl font-bold text-blue-900">
// // //             Featured Universities
// // //           </h2>
// // //         </div>
// // //         <div className="text-center py-8">
// // //           <div className="p-6 bg-gray-50 rounded-lg inline-block">
// // //             <p className="text-gray-500">No featured universities available.</p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="mt-12 mb-8">
// // //       {/* Section Title */}
// // //       <div className="border-l-4 border-blue-600 pl-4 mb-6">
// // //         <h2 className="text-2xl font-bold text-blue-900">
// // //           Featured Universities
// // //         </h2>
// // //       </div>

// // //       {/* Universities List */}
// // //       <div className="space-y-4">
// // //         {universities.map((university, index) => {
// // //           const imageUrl = getImageUrl(university.logo_path || university.logo);
          
// // //           return (
// // //             <div
// // //               key={university.id || index}
// // //               className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:shadow-lg transition-all duration-300"
// // //             >
// // //               {/* University Logo */}
// // //               <div className="flex-shrink-0">
// // //                 <div className="w-16 h-16 border border-gray-200 rounded overflow-hidden bg-white flex items-center justify-center">
// // //                   {imageUrl ? (
// // //                     <img
// // //                       src={imageUrl}
// // //                       alt={university.name || 'University'}
// // //                       className="w-full h-full object-contain"
// // //                       onError={(e) => {
// // //                         if (!e.target.dataset.fallbackAttempted) {
// // //                           e.target.dataset.fallbackAttempted = 'true';
// // //                           const altPath = (university.logo_path || university.logo).replace(/^\/+/, '');
// // //                           e.target.src = `${API_URL}/${altPath}`;
// // //                         } else {
// // //                           e.target.src = 'https://via.placeholder.com/64?text=Uni';
// // //                           e.target.style.backgroundColor = '#f3f4f6';
// // //                         }
// // //                       }}
// // //                       loading="lazy"
// // //                     />
// // //                   ) : (
// // //                     <FaGraduationCap className="text-gray-400 text-2xl" />
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               {/* University Details */}
// // //               <div className="flex-grow">
// // //                 {/* University Name */}
// // //                 <h3 className="text-lg font-semibold text-blue-900 mb-2 hover:text-blue-700 transition-colors">
// // //                   {university.name}
// // //                 </h3>

// // //                 {/* Location */}
// // //                 {(university.city || university.address) && (
// // //                   <p className="text-sm text-gray-600 mb-3 flex items-start gap-2">
// // //                     <FaMapMarkerAlt className="text-red-500 flex-shrink-0 mt-0.5" />
// // //                     <span>{university.city || university.address}</span>
// // //                   </p>
// // //                 )}

// // //                 {/* Visit University Link */}
// // //                 <Link
// // //                   to={`/university/${university.uname || university.slug}`}
// // //                   className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-800 hover:underline transition-colors"
// // //                 >
// // //                   <FaGraduationCap />
// // //                   <span>Visit University</span>
// // //                 </Link>
// // //               </div>
// // //             </div>
// // //           );
// // //         })}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // /* ============================================================
// // //     MAIN OVERVIEW COMPONENT
// // //    ============================================================ */
// // // const Overview = () => {
// // //   const { slug } = useParams();
// // //   const [overviewData, setOverviewData] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchUniversityOverview = async () => {
// // //       try {
// // //         const response = await api.get(`/university-overview/${slug}`);
// // //        const overviews = response.data?.data?.overviews || [];
// // // setOverviewData(overviews);

// // //       } catch (error) {
// // //         console.error("Error fetching overview:", error);
// // //         setOverviewData([]);
// // //       } finally {
// // //         setIsLoading(false);
// // //       }
// // //     };

// // //     if (slug) fetchUniversityOverview();
// // //   }, [slug]);

// // //   const validSections = overviewData.filter((section) => {
// // //     const hasTitle = section.title?.trim() !== "";
// // //     const hasDesc = hasValidContent(section.description);
// // //     const hasImage = section.thumbnail_path?.trim() !== "";

// // //     return hasTitle && (hasDesc || hasImage);
// // //   });

// // //   if (isLoading) {
// // //     return (
// // //       <div className="flex items-center justify-center p-10">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
// // //           <p className="text-gray-600">Loading overview...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="space-y-10 px-1 md:px-0 py-8 text-black bg-white">
// // //       {/* Overview Sections */}
// // //       {validSections.length > 0 ? (
// // //         validSections.map((section, index) => (
// // //           <div key={index} className="space-y-6">
// // //             {/* Title */}
// // //             <div className="border-l-4 border-blue-600 pl-4">
// // //               <h2 className="text-2xl font-bold text-blue-900">
// // //                 {section.title}
// // //               </h2>
// // //             </div>

// // //             {/* Image */}
// // //             {section.thumbnail_path && (
// // //               <div className="w-full overflow-hidden rounded-xl shadow-lg">
// // //                 <img
// // //                   src={
// // //                     "https://www.educationmalaysia.in/storage/" +
// // //                     section.thumbnail_path
// // //                       .replace(/^storage\//, "")
// // //                       .replace(/^public\//, "")
// // //                       .replace(/^\//, "")
// // //                   }
// // //                   alt={section.title}
// // //                   className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
// // //                   onError={(e) => {
// // //                     console.log("IMAGE FAILED:", section.thumbnail_path);
// // //                     e.target.src = "https://www.educationmalaysia.in/storage/default-image.jpg";
// // //                   }}
// // //                 />
// // //               </div>
// // //             )}

// // //             {/* Description */}
// // //             {hasValidContent(section.description) && (
// // //               <div
// // //                 className="space-y-6 text-base leading-relaxed"
// // //                 dangerouslySetInnerHTML={{
// // //                   __html: formatHTML(section.description),
// // //                 }}
// // //               />
// // //             )}
// // //           </div>
// // //         ))
// // //       ) : (
// // //         <div className="text-center py-10">
// // //           <div className="p-6 bg-gray-50 rounded-lg inline-block">
// // //             <p className="text-gray-500 text-lg mb-2">
// // //               📄 No overview available
// // //             </p>
// // //             <p className="text-gray-400 text-sm">
// // //               Content will be updated soon
// // //             </p>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Help & Support Section (Get in Touch Form) */}
// // //       <HelpUniversityCourses />
      
// // //       {/* Popular Courses */}
// // //       <PopularCourses />
      
// // //       {/* 🎯 FEATURED UNIVERSITIES - Get in Touch form ke neeche */}
// // //       <FeaturedUniversitiesSection slug={slug} />

// // //     </div>
// // //   );
// // // };

// // // export default Overview;

// // import React, { useState, useEffect } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import { FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";
// // import api from "../../api";
// // import { API_URL } from "../../config";
// // import HelpUniversityCourses from "./HelpUniversityCourses";
// // import PopularCourses from "./PopularCourses";

// // /* ============================================================
// //     FINAL CLEAN HTML FORMATTER (NO BLANK SPACE + FIXED TABLES)
// //    ============================================================ */
// // const formatHTML = (html) => {
// //   if (!html) return "";

// //   const textarea = document.createElement("textarea");
// //   textarea.innerHTML = html;
// //   let decoded = textarea.value;

// //   decoded = decoded.replace(/^<p[^>]*>.*?About.*?<\/p>/i, "");
// //   decoded = decoded.replace(/<span[^>]*>/gi, "");
// //   decoded = decoded.replace(/<\/span>/gi, "");
// //   decoded = decoded.replace(/style="[^"]*"/gi, "");
// //   decoded = decoded.replace(/&nbsp;/gi, " ");

// //   decoded = decoded.replace(
// //     /<p>\s*<(strong|b)>([^<]{5,})<\/\1>\s*<\/p>/gi,
// //     '<h3 class="text-lg font-bold text-gray-900 mb-3 mt-6">$2</h3>'
// //   );

// //   decoded = decoded.replace(
// //     /<(strong|b)>/gi,
// //     '<span class="font-semibold text-gray-900">'
// //   );
// //   decoded = decoded.replace(/<\/(strong|b)>/gi, "</span>");

// //   decoded = decoded.replace(
// //     /<p>/gi,
// //     '<p class="text-sm text-gray-700 leading-relaxed mb-4">'
// //   );

// //   decoded = decoded.replace(/<p[^>]*>\s*<\/p>/gi, "");

// //   decoded = decoded.replace(
// //     /<table[^>]*>/gi,
// //     `<div class="overflow-auto rounded-xl shadow-md border border-gray-200 my-6">
// //       <table class="w-full border-collapse text-sm">`
// //   );
// //   decoded = decoded.replace(/<\/table>/gi, "</table></div>");

// //   decoded = decoded.replace(
// //     /<thead[^>]*>/gi,
// //     `<thead class="bg-blue-600 text-white">`
// //   );

// //   decoded = decoded.replace(
// //     /<tr[^>]*>(\s*<th[\s\S]*?<\/tr>)/i,
// //     `<tr class="bg-blue-600 text-white">$1`
// //   );

// //   decoded = decoded.replace(
// //     /<tbody[^>]*>/gi,
// //     `<tbody class="text-gray-800">`
// //   );

// //   decoded = decoded.replace(
// //     /<th[^>]*>/gi,
// //     `<th class="px-4 py-3 border-b border-gray-200 text-left font-semibold whitespace-nowrap">`
// //   );

// //   decoded = decoded.replace(
// //     /<tr[^>]*>/gi,
// //     `<tr class="even:bg-blue-50">`
// //   );

// //   decoded = decoded.replace(
// //     /<td[^>]*>/gi,
// //     `<td class="px-4 py-3 border-b border-gray-100">`
// //   );

// //   decoded = decoded.replace(
// //     /<input[^>]*type=["']checkbox["'][^>]*>/gi,
// //     `<span class="inline-block w-4 h-4 rounded border border-gray-400 mr-2 bg-white"></span>`
// //   );

// //   decoded = decoded.replace(
// //     /<ul>/gi,
// //     '<ul class="list-disc pl-6 space-y-2 text-gray-800 mb-4">'
// //   );
// //   decoded = decoded.replace(
// //     /<ol>/gi,
// //     '<ol class="list-decimal pl-6 space-y-2 text-gray-800 mb-4">'
// //   );
// //   decoded = decoded.replace(/<li>/gi, '<li class="mb-1 text-sm">');

// //   return decoded;
// // };

// // const hasValidContent = (description) => {
// //   if (!description) return false;
// //   const stripped = description
// //     .replace(/<[^>]*>/g, "")
// //     .replace(/&nbsp;/g, " ")
// //     .trim();
// //   return stripped.length >= 15;
// // };

// // /* ============================================================
// //     FEATURED UNIVERSITIES COMPONENT - UPDATED VERSION
// //    ============================================================ */
// // const FeaturedUniversitiesSection = ({ slug }) => {
// //   const [universities, setUniversities] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);

// //   // 🎯 YAHAN APNI STATIC UNIVERSITIES ADD KARO (temporary testing ke liye)
// //   const staticUniversities = [
// //     {
// //       id: 1,
// //       name: "University of Malaya",
// //       city: "Kuala Lumpur, Malaysia",
// //       uname: "university-of-malaya",
// //       logo_path: "universities/um-logo.png" // Apna logo path yahan daalo
// //     },
// //     {
// //       id: 2,
// //       name: "Universiti Teknologi Malaysia",
// //       city: "Johor Bahru, Malaysia",
// //       uname: "utm",
// //       logo_path: "universities/utm-logo.png"
// //     },
// //     {
// //       id: 3,
// //       name: "Universiti Kebangsaan Malaysia",
// //       city: "Bangi, Selangor, Malaysia",
// //       uname: "ukm",
// //       logo_path: "universities/ukm-logo.png"
// //     }
// //   ];

// //   useEffect(() => {
// //     const fetchFeaturedUniversities = async () => {
// //       try {
// //         setIsLoading(true);
        
// //         // 🎯 Featured universities API endpoint
// //         const response = await api.get(`/featured-universities`);
        
// //         // API response structure: data.universities
// //         const featuredUnis = 
// //           response.data?.data?.universities || 
// //           response.data?.universities || 
// //           [];
        
// //         console.log("Featured Universities:", featuredUnis);
        
// //         if (featuredUnis.length === 0) {
// //           console.log("No universities found, using static data");
// //           setUniversities(staticUniversities);
// //         } else {
// //           setUniversities(featuredUnis);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching featured universities:", error);
// //         // Error ke case mein static data show karo
// //         setUniversities(staticUniversities);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchFeaturedUniversities();
// //   }, []);

// //   const getImageUrl = (logoPath) => {
// //     if (!logoPath) return null;
    
// //     if (logoPath.startsWith('http://') || logoPath.startsWith('https://')) {
// //       return logoPath;
// //     }
    
// //     const cleanPath = logoPath.replace(/^\/+|storage\/+|public\/+/g, '');
// //     return `${API_URL}/storage/${cleanPath}`;
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="mt-12 mb-8">
// //         <div className="border-l-4 border-blue-600 pl-4 mb-6">
// //           <h2 className="text-2xl font-bold text-blue-900">
// //             Featured Universities
// //           </h2>
// //         </div>
// //         <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
// //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (universities.length === 0) {
// //     return (
// //       <div className="mt-12 mb-8">
// //         <div className="border-l-4 border-blue-600 pl-4 mb-6">
// //           <h2 className="text-2xl font-bold text-blue-900">
// //             Featured Universities
// //           </h2>
// //         </div>
// //         <div className="text-center py-8">
// //           <div className="p-6 bg-gray-50 rounded-lg inline-block">
// //             <p className="text-gray-500">No featured universities available.</p>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="mt-12 mb-8">
// //       <div className="border-l-4 border-blue-600 pl-4 mb-6">
// //         <h2 className="text-2xl font-bold text-blue-900">
// //           Featured Universities
// //         </h2>
// //       </div>

// //       <div className="space-y-4">
// //         {universities.map((university, index) => {
// //           const imageUrl = getImageUrl(university.logo_path || university.logo);
          
// //           return (
// //             <div
// //               key={university.id || index}
// //               className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:shadow-lg transition-all duration-300"
// //             >
// //               <div className="flex-shrink-0">
// //                 <div className="w-16 h-16 border border-gray-200 rounded overflow-hidden bg-white flex items-center justify-center">
// //                   {imageUrl ? (
// //                     <img
// //                       src={imageUrl}
// //                       alt={university.name || 'University'}
// //                       className="w-full h-full object-contain"
// //                       onError={(e) => {
// //                         if (!e.target.dataset.fallbackAttempted) {
// //                           e.target.dataset.fallbackAttempted = 'true';
// //                           const altPath = (university.logo_path || university.logo).replace(/^\/+/, '');
// //                           e.target.src = `${API_URL}/${altPath}`;
// //                         } else {
// //                           e.target.src = 'https://via.placeholder.com/64?text=Uni';
// //                           e.target.style.backgroundColor = '#f3f4f6';
// //                         }
// //                       }}
// //                       loading="lazy"
// //                     />
// //                   ) : (
// //                     <FaGraduationCap className="text-gray-400 text-2xl" />
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="flex-grow">
// //                 <h3 className="text-lg font-semibold text-blue-900 mb-2 hover:text-blue-700 transition-colors">
// //                   {university.name}
// //                 </h3>

// //                 {(university.city || university.address) && (
// //                   <p className="text-sm text-gray-600 mb-3 flex items-start gap-2">
// //                     <FaMapMarkerAlt className="text-red-500 flex-shrink-0 mt-0.5" />
// //                     <span>{university.city || university.address}</span>
// //                   </p>
// //                 )}

// //                 <Link
// //                   to={`/university/${university.uname || university.slug}`}
// //                   className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-800 hover:underline transition-colors"
// //                 >
// //                   <FaGraduationCap />
// //                   <span>Visit University</span>
// //                 </Link>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // /* ============================================================
// //     MAIN OVERVIEW COMPONENT
// //    ============================================================ */
// // const Overview = () => {
// //   const { slug } = useParams();
// //   const [overviewData, setOverviewData] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchUniversityOverview = async () => {
// //       try {
// //         const response = await api.get(`/university-overview/${slug}`);
// //         const overviews = response.data?.data?.overviews || [];
// //         setOverviewData(overviews);
// //       } catch (error) {
// //         console.error("Error fetching overview:", error);
// //         setOverviewData([]);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     if (slug) fetchUniversityOverview();
// //   }, [slug]);

// //   const validSections = overviewData.filter((section) => {
// //     const hasTitle = section.title?.trim() !== "";
// //     const hasDesc = hasValidContent(section.description);
// //     const hasImage = section.thumbnail_path?.trim() !== "";
// //     return hasTitle && (hasDesc || hasImage);
// //   });

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center p-10">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
// //           <p className="text-gray-600">Loading overview...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-10 px-1 md:px-0 py-8 text-black bg-white">
// //       {validSections.length > 0 ? (
// //         validSections.map((section, index) => (
// //           <div key={index} className="space-y-6">
// //             <div className="border-l-4 border-blue-600 pl-4">
// //               <h2 className="text-2xl font-bold text-blue-900">
// //                 {section.title}
// //               </h2>
// //             </div>

// //             {section.thumbnail_path && (
// //               <div className="w-full overflow-hidden rounded-xl shadow-lg">
// //                 <img
// //                   src={
// //                     "https://www.educationmalaysia.in/storage/" +
// //                     section.thumbnail_path
// //                       .replace(/^storage\//, "")
// //                       .replace(/^public\//, "")
// //                       .replace(/^\//, "")
// //                   }
// //                   alt={section.title}
// //                   className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
// //                   onError={(e) => {
// //                     console.log("IMAGE FAILED:", section.thumbnail_path);
// //                     e.target.src = "https://www.educationmalaysia.in/storage/default-image.jpg";
// //                   }}
// //                 />
// //               </div>
// //             )}

// //             {hasValidContent(section.description) && (
// //               <div
// //                 className="space-y-6 text-base leading-relaxed"
// //                 dangerouslySetInnerHTML={{
// //                   __html: formatHTML(section.description),
// //                 }}
// //               />
// //             )}
// //           </div>
// //         ))
// //       ) : (
// //         <div className="text-center py-10">
// //           <div className="p-6 bg-gray-50 rounded-lg inline-block">
// //             <p className="text-gray-500 text-lg mb-2">
// //               📄 No overview available
// //             </p>
// //             <p className="text-gray-400 text-sm">
// //               Content will be updated soon
// //             </p>
// //           </div>
// //         </div>
// //       )}

// //       <HelpUniversityCourses />
// //       <PopularCourses />
      
// //       {/* 🎯 Featured Universities Section */}
// //       <FeaturedUniversitiesSection slug={slug} />
// //     </div>
// //   );
// // };

// // export default Overview;
// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";
// import api from "../../api";
// import { API_URL } from "../../config";
// import HelpUniversityCourses from "./HelpUniversityCourses";
// import PopularCourses from "./PopularCourses";

// /* ============================================================
//     FINAL CLEAN HTML FORMATTER (NO BLANK SPACE + FIXED TABLES)
//    ============================================================ */
// const formatHTML = (html) => {
//   if (!html) return "";

//   const textarea = document.createElement("textarea");
//   textarea.innerHTML = html;
//   let decoded = textarea.value;

//   decoded = decoded.replace(/^<p[^>]*>.*?About.*?<\/p>/i, "");
//   decoded = decoded.replace(/<span[^>]*>/gi, "");
//   decoded = decoded.replace(/<\/span>/gi, "");
//   decoded = decoded.replace(/style="[^"]*"/gi, "");
//   decoded = decoded.replace(/&nbsp;/gi, " ");

//   decoded = decoded.replace(
//     /<p>\s*<(strong|b)>([^<]{5,})<\/\1>\s*<\/p>/gi,
//     '<h3 class="text-lg font-bold text-gray-900 mb-3 mt-6">$2</h3>'
//   );

//   decoded = decoded.replace(
//     /<(strong|b)>/gi,
//     '<span class="font-semibold text-gray-900">'
//   );
//   decoded = decoded.replace(/<\/(strong|b)>/gi, "</span>");

//   decoded = decoded.replace(
//     /<p>/gi,
//     '<p class="text-sm text-gray-700 leading-relaxed mb-4">'
//   );

//   decoded = decoded.replace(/<p[^>]*>\s*<\/p>/gi, "");

//   decoded = decoded.replace(
//     /<table[^>]*>/gi,
//     `<div class="overflow-auto rounded-xl shadow-md border border-gray-200 my-6">
//       <table class="w-full border-collapse text-sm">`
//   );
//   decoded = decoded.replace(/<\/table>/gi, "</table></div>");

//   decoded = decoded.replace(
//     /<thead[^>]*>/gi,
//     `<thead class="bg-blue-600 text-white">`
//   );

//   decoded = decoded.replace(
//     /<tr[^>]*>(\s*<th[\s\S]*?<\/tr>)/i,
//     `<tr class="bg-blue-600 text-white">$1`
//   );

//   decoded = decoded.replace(
//     /<tbody[^>]*>/gi,
//     `<tbody class="text-gray-800">`
//   );

//   decoded = decoded.replace(
//     /<th[^>]*>/gi,
//     `<th class="px-4 py-3 border-b border-gray-200 text-left font-semibold whitespace-nowrap">`
//   );

//   decoded = decoded.replace(
//     /<tr[^>]*>/gi,
//     `<tr class="even:bg-blue-50">`
//   );

//   decoded = decoded.replace(
//     /<td[^>]*>/gi,
//     `<td class="px-4 py-3 border-b border-gray-100">`
//   );

//   decoded = decoded.replace(
//     /<input[^>]*type=["']checkbox["'][^>]*>/gi,
//     `<span class="inline-block w-4 h-4 rounded border border-gray-400 mr-2 bg-white"></span>`
//   );

//   decoded = decoded.replace(
//     /<ul>/gi,
//     '<ul class="list-disc pl-6 space-y-2 text-gray-800 mb-4">'
//   );
//   decoded = decoded.replace(
//     /<ol>/gi,
//     '<ol class="list-decimal pl-6 space-y-2 text-gray-800 mb-4">'
//   );
//   decoded = decoded.replace(/<li>/gi, '<li class="mb-1 text-sm">');

//   return decoded;
// };

// const hasValidContent = (description) => {
//   if (!description) return false;
//   const stripped = description
//     .replace(/<[^>]*>/g, "")
//     .replace(/&nbsp;/g, " ")
//     .trim();
//   return stripped.length >= 15;
// };

// /* ============================================================
//     FEATURED UNIVERSITIES COMPONENT - UPDATED VERSION
//    ============================================================ */
// const FeaturedUniversitiesSection = ({ slug }) => {
//   const [universities, setUniversities] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // 🎯 YAHAN APNI STATIC UNIVERSITIES ADD KARO (temporary testing ke liye)
//   const staticUniversities = [
//     {
//       id: 1,
//       name: "University of Malaya",
//       city: "Kuala Lumpur, Malaysia",
//       uname: "university-of-malaya",
//       logo_path: "universities/um-logo.png" // Apna logo path yahan daalo
//     },
//     {
//       id: 2,
//       name: "Universiti Teknologi Malaysia",
//       city: "Johor Bahru, Malaysia",
//       uname: "utm",
//       logo_path: "universities/utm-logo.png"
//     },
//     {
//       id: 3,
//       name: "Universiti Kebangsaan Malaysia",
//       city: "Bangi, Selangor, Malaysia",
//       uname: "ukm",
//       logo_path: "universities/ukm-logo.png"
//     }
//   ];

//   useEffect(() => {
//     const fetchFeaturedUniversities = async () => {
//       try {
//         setIsLoading(true);
        
//         // 🎯 Featured universities API endpoint
//         const response = await api.get(`/featured-universities`);
        
//         // API response structure: data.universities
//         const featuredUnis = 
//           response.data?.data?.universities || 
//           response.data?.universities || 
//           [];
        
//         console.log("Featured Universities:", featuredUnis);
        
//         if (featuredUnis.length === 0) {
//           console.log("No universities found, using static data");
//           setUniversities(staticUniversities);
//         } else {
//           setUniversities(featuredUnis);
//         }
//       } catch (error) {
//         console.error("Error fetching featured universities:", error);
//         // Error ke case mein static data show karo
//         setUniversities(staticUniversities);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchFeaturedUniversities();
//   }, []);

//   const getImageUrl = (logoPath) => {
//     if (!logoPath) return null;
    
//     if (logoPath.startsWith('http://') || logoPath.startsWith('https://')) {
//       return logoPath;
//     }
    
//     const cleanPath = logoPath.replace(/^\/+|storage\/+|public\/+/g, '');
//     return `${API_URL}/storage/${cleanPath}`;
//   };

//   if (isLoading) {
//     return (
//       <div className="mt-12 mb-8">
//         <div className="border-l-4 border-blue-600 pl-4 mb-6">
//           <h2 className="text-2xl font-bold text-blue-900">
//             Featured Universities
//           </h2>
//         </div>
//         <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         </div>
//       </div>
//     );
//   }

//   if (universities.length === 0) {
//     return (
//       <div className="mt-12 mb-8">
//         <div className="border-l-4 border-blue-600 pl-4 mb-6">
//           <h2 className="text-2xl font-bold text-blue-900">
//             Featured Universities
//           </h2>
//         </div>
//         <div className="text-center py-8">
//           <div className="p-6 bg-gray-50 rounded-lg inline-block">
//             <p className="text-gray-500">No featured universities available.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-12 mb-8">
//       <div className="border-l-4 border-blue-600 pl-4 mb-6">
//         <h2 className="text-2xl font-bold text-blue-900">
//           Featured Universities
//         </h2>
//       </div>

//       <div className="space-y-4">
//         {universities.map((university, index) => {
//           const imageUrl = getImageUrl(university.logo_path || university.logo);
          
//           return (
//             <div
//               key={university.id || index}
//               className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:shadow-lg transition-all duration-300"
//             >
//               <div className="flex-shrink-0">
//                 <div className="w-16 h-16 border border-gray-200 rounded overflow-hidden bg-white flex items-center justify-center">
//                   {imageUrl ? (
//                     <img
//                       src={imageUrl}
//                       alt={university.name || 'University'}
//                       className="w-full h-full object-contain"
//                       onError={(e) => {
//                         if (!e.target.dataset.fallbackAttempted) {
//                           e.target.dataset.fallbackAttempted = 'true';
//                           const altPath = (university.logo_path || university.logo).replace(/^\/+/, '');
//                           e.target.src = `${API_URL}/${altPath}`;
//                         } else {
//                           e.target.src = 'https://via.placeholder.com/64?text=Uni';
//                           e.target.style.backgroundColor = '#f3f4f6';
//                         }
//                       }}
//                       loading="lazy"
//                     />
//                   ) : (
//                     <FaGraduationCap className="text-gray-400 text-2xl" />
//                   )}
//                 </div>
//               </div>

//               <div className="flex-grow">
//                 <h3 className="text-lg font-semibold text-blue-900 mb-2 hover:text-blue-700 transition-colors">
//                   {university.name}
//                 </h3>

//                 {(university.city || university.address) && (
//                   <p className="text-sm text-gray-600 mb-3 flex items-start gap-2">
//                     <FaMapMarkerAlt className="text-red-500 flex-shrink-0 mt-0.5" />
//                     <span>{university.city || university.address}</span>
//                   </p>
//                 )}

//                 <Link
//                   to={`/university/${university.uname || university.slug}`}
//                   className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-800 hover:underline transition-colors"
//                 >
//                   <FaGraduationCap />
//                   <span>Visit University</span>
//                 </Link>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// /* ============================================================
//     MAIN OVERVIEW COMPONENT
//    ============================================================ */
// const Overview = () => {
//   const { slug } = useParams();
//   const [overviewData, setOverviewData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUniversityOverview = async () => {
//       try {
//         const response = await api.get(`/university-overview/${slug}`);
//         const overviews = response.data?.data?.overviews || [];
//         setOverviewData(overviews);
//       } catch (error) {
//         console.error("Error fetching overview:", error);
//         setOverviewData([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (slug) fetchUniversityOverview();
//   }, [slug]);

//   const validSections = overviewData.filter((section) => {
//     const hasTitle = section.title?.trim() !== "";
//     const hasDesc = hasValidContent(section.description);
//     const hasImage = section.thumbnail_path?.trim() !== "";
//     return hasTitle && (hasDesc || hasImage);
//   });

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center p-10">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
//           <p className="text-gray-600">Loading overview...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-10 px-1 md:px-0 py-8 text-black bg-white">
//       {validSections.length > 0 ? (
//         validSections.map((section, index) => (
//           <div key={index} className="space-y-6">
//             <div className="border-l-4 border-blue-600 pl-4">
//               <h2 className="text-2xl font-bold text-blue-900">
//                 {section.title}
//               </h2>
//             </div>

//             {section.thumbnail_path && (
//               <div className="w-full overflow-hidden rounded-xl shadow-lg">
//                 <img
//                   src={
//                     "https://www.educationmalaysia.in/storage/" +
//                     section.thumbnail_path
//                       .replace(/^storage\//, "")
//                       .replace(/^public\//, "")
//                       .replace(/^\//, "")
//                   }
//                   alt={section.title}
//                   className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
//                   onError={(e) => {
//                     console.log("IMAGE FAILED:", section.thumbnail_path);
//                     e.target.src = "https://www.educationmalaysia.in/storage/default-image.jpg";
//                   }}
//                 />
//               </div>
//             )}

//             {hasValidContent(section.description) && (
//               <div
//                 className="space-y-6 text-base leading-relaxed"
//                 dangerouslySetInnerHTML={{
//                   __html: formatHTML(section.description),
//                 }}
//               />
//             )}
//           </div>
//         ))
//       ) : (
//         <div className="text-center py-10">
//           <div className="p-6 bg-gray-50 rounded-lg inline-block">
//             <p className="text-gray-500 text-lg mb-2">
//               📄 No overview available
//             </p>
//             <p className="text-gray-400 text-sm">
//               Content will be updated soon
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Get in Touch Form */}
//       <HelpUniversityCourses />
      
//       {/* 🎯 Featured Universities - Get in Touch ke baad */}
//       <FeaturedUniversitiesSection />
      
//       {/* Popular Courses */}
//       <PopularCourses />
//     </div>
//   );
// };

// export default Overview;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";
import api from "../../api";
import { API_URL } from "../../config";
import HelpUniversityCourses from "./HelpUniversityCourses";
import PopularCourses from "./PopularCourses";

/* ============================================================
    FINAL CLEAN HTML FORMATTER (NO BLANK SPACE + FIXED TABLES)
   ============================================================ */
const formatHTML = (html) => {
  if (!html) return "";

  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  let decoded = textarea.value;

  decoded = decoded.replace(/^<p[^>]*>.*?About.*?<\/p>/i, "");
  decoded = decoded.replace(/<span[^>]*>/gi, "");
  decoded = decoded.replace(/<\/span>/gi, "");
  decoded = decoded.replace(/style="[^"]*"/gi, "");
  decoded = decoded.replace(/&nbsp;/gi, " ");

  decoded = decoded.replace(
    /<p>\s*<(strong|b)>([^<]{5,})<\/\1>\s*<\/p>/gi,
    '<h3 class="text-lg font-bold text-gray-900 mb-3 mt-6">$2</h3>'
  );

  decoded = decoded.replace(
    /<(strong|b)>/gi,
    '<span class="font-semibold text-gray-900">'
  );
  decoded = decoded.replace(/<\/(strong|b)>/gi, "</span>");

  decoded = decoded.replace(
    /<p>/gi,
    '<p class="text-sm text-gray-700 leading-relaxed mb-4">'
  );

  decoded = decoded.replace(/<p[^>]*>\s*<\/p>/gi, "");

  decoded = decoded.replace(
    /<table[^>]*>/gi,
    `<div class="overflow-auto rounded-xl shadow-md border border-gray-200 my-6">
      <table class="w-full border-collapse text-sm">`
  );
  decoded = decoded.replace(/<\/table>/gi, "</table></div>");

  decoded = decoded.replace(
    /<thead[^>]*>/gi,
    `<thead class="bg-blue-600 text-white">`
  );

  decoded = decoded.replace(
    /<tr[^>]*>(\s*<th[\s\S]*?<\/tr>)/i,
    `<tr class="bg-blue-600 text-white">$1`
  );

  decoded = decoded.replace(
    /<tbody[^>]*>/gi,
    `<tbody class="text-gray-800">`
  );

  decoded = decoded.replace(
    /<th[^>]*>/gi,
    `<th class="px-4 py-3 border-b border-gray-200 text-left font-semibold whitespace-nowrap">`
  );

  decoded = decoded.replace(
    /<tr[^>]*>/gi,
    `<tr class="even:bg-blue-50">`
  );

  decoded = decoded.replace(
    /<td[^>]*>/gi,
    `<td class="px-4 py-3 border-b border-gray-100">`
  );

  decoded = decoded.replace(
    /<input[^>]*type=["']checkbox["'][^>]*>/gi,
    `<span class="inline-block w-4 h-4 rounded border border-gray-400 mr-2 bg-white"></span>`
  );

  decoded = decoded.replace(
    /<ul>/gi,
    '<ul class="list-disc pl-6 space-y-2 text-gray-800 mb-4">'
  );
  decoded = decoded.replace(
    /<ol>/gi,
    '<ol class="list-decimal pl-6 space-y-2 text-gray-800 mb-4">'
  );
  decoded = decoded.replace(/<li>/gi, '<li class="mb-1 text-sm">');

  return decoded;
};

const hasValidContent = (description) => {
  if (!description) return false;
  const stripped = description
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  return stripped.length >= 15;
};

/* ============================================================
    MAIN OVERVIEW COMPONENT
   ============================================================ */
const Overview = () => {
  const { slug } = useParams();
  const [overviewData, setOverviewData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUniversityOverview = async () => {
      try {
        const response = await api.get(`/university-overview/${slug}`);
        const overviews = response.data?.data?.overviews || [];
        setOverviewData(overviews);
      } catch (error) {
        console.error("Error fetching overview:", error);
        setOverviewData([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchUniversityOverview();
  }, [slug]);

  const validSections = overviewData.filter((section) => {
    const hasTitle = section.title?.trim() !== "";
    const hasDesc = hasValidContent(section.description);
    const hasImage = section.thumbnail_path?.trim() !== "";
    return hasTitle && (hasDesc || hasImage);
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading overview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1 px-1 md:px-0 py-8 text-black bg-white">
      {validSections.length > 0 ? (
        validSections.map((section, index) => (
          <div key={index} className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4">
              <h2 className="text-2xl font-bold text-blue-900">
                {section.title}
              </h2>
            </div>

            {section.thumbnail_path && (
              <div className="w-full overflow-hidden rounded-xl shadow-lg">
                <img
                  src={
                    "https://www.educationmalaysia.in/storage/" +
                    section.thumbnail_path
                      .replace(/^storage\//, "")
                      .replace(/^public\//, "")
                      .replace(/^\//, "")
                  }
                  alt={section.title}
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.log("IMAGE FAILED:", section.thumbnail_path);
                    e.target.src = "https://www.educationmalaysia.in/storage/default-image.jpg";
                  }}
                />
              </div>
            )}

            {hasValidContent(section.description) && (
              <div
                className="space-y-6 text-base leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: formatHTML(section.description),
                }}
              />
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-10">
          <div className="p-6 bg-gray-50 rounded-lg inline-block">
            <p className="text-gray-500 text-lg mb-2">
              📄 No overview available
            </p>
            <p className="text-gray-400 text-sm">
              Content will be updated soon
            </p>
          </div>
        </div>
      )}

      {/* Get in Touch Form */}
      <HelpUniversityCourses />
      
      {/* Popular Courses */}
      <PopularCourses />
    </div>
  );
};

export default Overview;