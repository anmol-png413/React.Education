import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import HelpUniversityCourses from "./HelpUniversityCourses";
import PopularCourses from "./PopularCourses";

// The formatHTML function is defined here
const formatHTML = (html) => {
  if (!html) return "";

  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  let decoded = textarea.value;

  decoded = decoded.replace(/<span[^>]*>/gi, "");
  decoded = decoded.replace(/<\/span>/gi, "");
  decoded = decoded.replace(/style="[^"]*"/gi, "");
  decoded = decoded.replace(/&nbsp;/gi, " ");
  decoded = decoded.replace(/<h([1-6])[^>]*>([^<]*?)\s*:\s*<\/h\1>/gi, (_m, level, title) => {
    return `<h${level}>${title.trim()}</h${level}>`;
  });
  decoded = decoded.replace(/<p>\s*:\s*/gi, "<p>");
  decoded = decoded.replace(/<strong>(.*?)<\/strong>/gi, `<h4 class="text-lg font-semibold mb-2 mt-4">$1</h4>`);
  decoded = decoded.replace(/<b>(.*?)<\/b>/gi, `<h4 class="text-lg font-semibold mb-2 mt-4">$1</h4>`);
  decoded = decoded.replace(/(?:\r\n|\r|\n)/g, "</p><p>");
  decoded = `<p>${decoded}</p>`;
  decoded = decoded.replace(/<p><\/p>/g, "");

  // ✅ Table styling
  decoded = decoded.replace(
    /<table(.*?)>/g,
    `<div class="overflow-auto rounded-xl shadow-sm border border-gray-200 my-6"><table class="w-full border-collapse" $1>`
  );
  decoded = decoded.replace(/<\/table>/g, "</table></div>");
  decoded = decoded.replace(
    /<thead>/g,
    '<thead class="bg-gradient-to-r from-blue-500 to-blue-600 text-black text-left text-sm">'
  );
  decoded = decoded.replace(
    /<th>/g,
    '<th class="px-4 py-3 font-medium whitespace-nowrap border-b border-blue-200 text-white text-sm">'
  );
  decoded = decoded.replace(/<tr>/g, '<tr class="even:bg-blue-50">');
  decoded = decoded.replace(
    /<td>(.*?)<\/td>/g,
    '<td class="px-4 py-3 text-sm text-gray-800">$1</td>'
  );

  // ✅ Checkbox
  decoded = decoded.replace(
    /<input[^>]*type=["']checkbox["'][^>]*>/gi,
    `<span class="inline-block w-4 h-4 rounded border border-gray-400 mr-2 bg-white"></span>`
  );

  // ✅ Bullet & Numbered lists
  decoded = decoded.replace(
    /<ul>/g,
    '<ul class="list-disc pl-6 space-y-2 text-gray-800">'
  );
  decoded = decoded.replace(
    /<ol>/g,
    '<ol class="list-decimal pl-6 space-y-2 text-gray-800">'
  );
  decoded = decoded.replace(
    /<li>/g,
    '<li class="mb-1">'
  );

  return decoded;
};

const Overview = () => {
  const { slug } = useParams();
  const [overviewData, setOverviewData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUniversityOverview = async () => {
      try {
        const response = await api.get(`/university-overview/${slug}`);
        const { overviews } = response.data.data;
        setOverviewData(overviews);
      } catch (error) {
        console.error('Error fetching university overview:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchUniversityOverview();
    }
  }, [slug]);

  if (isLoading) {
    return <div className="text-center p-10">Loading overview...</div>;
  }
  
  return (
    <div className="space-y-10 px-1 md:px- py-8 text-black bg-white">
      {/* Map through overview sections */}
      {overviewData.map((section, index) => (
        <div key={index} className="space-y-6">
          <div className="border-l-4 border-blue-600 pl-4">
            <h2 className="text-2xl font-bold text-blue-900">
              {section.title}
            </h2>
          </div>
          
          {/* Add thumbnail image if available */}
          {section.thumbnail_path && (
            <div className="w-full overflow-hidden rounded-xl shadow-lg">
              <img
                src={`https://www.educationmalaysia.in/${section.thumbnail_path}`}
                alt={section.title}
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div 
            className="space-y-6 text-base leading-relaxed"
            // HERE'S THE CHANGE: Call the function to format the HTML
            dangerouslySetInnerHTML={{ __html: formatHTML(section.description) }}
          />
        </div>
      ))}

      {/* Keep existing additional components */}
      <HelpUniversityCourses />
      <PopularCourses />
    </div>
  );
};

export default Overview;