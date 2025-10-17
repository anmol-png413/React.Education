import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import api from '../../api';
import TrendingCourses from '../../components/TrendingCourses';
import { FaUniversity, FaGraduationCap, FaGlobe, FaSchool, FaCheckCircle, FaBriefcase } from 'react-icons/fa';
import { Home, Layers, Loader2 } from "lucide-react";
import SEO from '../../components/SEO';
// Format HTML helper function
const formatHTML = (html) => {
  if (!html) return "";

  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  let decoded = textarea.value;

  // --- Start Cleaning & Formatting ---
  decoded = decoded.replace(/<span[^>]*>/gi, "");
  decoded = decoded.replace(/<\/span>/gi, "");
  decoded = decoded.replace(/style="[^"]*"/gi, "");
  decoded = decoded.replace(/&nbsp;/gi, " ");

 
  decoded = decoded.replace(
    /<h([1-3])(.*?)>([^<]*?)<\/h\1>/gi,
    (_m, level, attributes, content) => {
     
      if (level === "1") {
        return `<h1 class="text-2xl md:text-3xl font-bold text-gray-800 pb-2 mt-8 mb-4">${content.trim()}</h1>`;
      } else if (level === "2") {
        return `<h2 class="text-xl md:text-2xl font-bold text-gray-800 pb-2 mt-6 mb-3">${content.trim()}</h2>`;
      }
      return `<h3 class="text-lg md:text-xl font-bold text-gray-800 mt-5 mb-2">${content.trim()}</h3>`;
    }
  );

  decoded = decoded.replace(/<p>\s*:\s*/gi, "<p>");
  decoded = decoded.replace(/<strong>(.*?)<\/strong>/gi, `<h4 class="text-lg font-semibold mb-2 mt-4 text-gray-700">$1</h4>`);
  decoded = decoded.replace(/<b>(.*?)<\/b>/gi, `<h4 class="text-lg font-semibold mb-2 mt-4 text-gray-700">$1</h4>`);
  
  // ✅ New: Add Tailwind classes to p tags for better spacing
  decoded = decoded.replace(/<p>/g, '<p class="text-gray-700 leading-relaxed mb-4">');

  // ✅ Table styling (existing)
  decoded = decoded.replace(
    /<table(.*?)>/g,
    `<div class="overflow-auto rounded-xl shadow-sm border border-gray-200 my-6"><table class="w-full border-collapse" $1>`
  );
  decoded = decoded.replace(/<\/table>/g, "</table></div>");
  decoded = decoded.replace(
    /<thead>/g,
    '<thead class="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-left text-sm">'
  );
  decoded = decoded.replace(
    /<th>/g,
    '<th class="px-4 py-3 font-medium whitespace-nowrap">'
  );
  decoded = decoded.replace(/<tr/g, '<tr class="border-b border-gray-200 even:bg-blue-50/50"');
  decoded = decoded.replace(
    /<td>/g,
    '<td class="px-4 py-3 text-sm text-gray-700">'
  );

  // ✅ Checkbox (existing)
  decoded = decoded.replace(
    /<input[^>]*type=["']checkbox["'][^>]*>/gi,
    `<span class="inline-block w-4 h-4 rounded border border-gray-400 mr-2 bg-white"></span>`
  );

  // ✅ Bullet & Numbered lists (existing)
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



// Helper component to safely render HTML
const RenderHtml = ({ htmlString }) => {
  if (!htmlString) return null;
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

const Universities = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('public');
  const [seo ,setSeo] = useState({});

  const [pageContent, setPageContent] = useState({
    top: '',
    public: '',
    private: '',
    foreign: ''
  });

  // ✅ New state for the dynamic heading
  const [pageTitle, setPageTitle] = useState('TOP UNIVERSITIES IN MALAYSIA');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchContent = async () => {
      try {
        const response = await api.get('/universities');
        const data = response.data;
        setSeo(data.seo || {});
       

        setPageContent({
          top: formatHTML(data.pageContentTop?.description),
          public: formatHTML(data.pageContentPublic?.description),
          private: formatHTML(data.pageContentPrivate?.description),
          foreign: formatHTML(data.pageContentForeign?.description)
        });

        // ✅ Set the dynamic title from the API
        if (data.pageContentTop?.title) {
          setPageTitle(data.pageContentTop.title);
        }

      } catch (error) {
        console.error('Error fetching university content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // ✅ Helper function to render the colored heading
  const renderColoredHeading = (title) => {
    if (!title) return null;
    const words = title.split(' ');
    return (
      <>
        {words.map((word, index) => (
          <span 
            key={index}
            className={index % 2 === 0 ? "text-blue-800" : "text-blue-600"}
          >
            {word}{" "}
          </span>
        ))}
      </>
    );
  };

  const cardData = [
    {
      type: 'public',
      icon: <FaUniversity className="text-blue-600 text-4xl" />,
      title: 'Public Universities',
      description: 'Discover Malaysia\'s top-ranked public institutions offering quality education at affordable rates.',
      bgColor: 'blue',
      path: '/universities/public-institution-in-malaysia'
    },
    {
      type: 'private',
      icon: <FaGraduationCap className="text-orange-600 text-4xl" />,
      title: 'Private Universities',
      description: 'Explore leading private universities known for industry connections and innovative programs.',
      bgColor: 'orange',
      path: '/universities/private-institution-in-malaysia'
    },
    {
      type: 'foreign',
      icon: <FaGlobe className="text-green-600 text-4xl" />,
      title: 'Foreign Universities',
      description: 'Find international branch campuses offering globally recognized degrees.',
      bgColor: 'green',
      path: '/universities/foreign-institution-in-malaysia'
    }
  ];
const colorClasses = {
  blue: {
    text: 'text-blue-800',
    bg: 'bg-blue-600',
    hover: 'hover:bg-blue-700',
    lightBg: 'bg-blue-100'
  },
  orange: {
    text: 'text-orange-800',
    bg: 'bg-orange-600',
    hover: 'hover:bg-orange-700',
    lightBg: 'bg-orange-100'
  },
  green: {
    text: 'text-green-800',
    bg: 'bg-green-600',
    hover: 'hover:bg-green-700',
    lightBg: 'bg-green-100'
  }
};

  return (
    <>

   <SEO 
title={seo?.meta_title}
description={seo?.meta_description}
keywords={seo?.meta_keyword}
ogImage={seo?.og_image_path}
pageContent={seo?.page_content}
pageurl={seo?.page_url}
seorating={seo?.seo_rating}
/>





      {/* Breadcrumb */}
      <div className="w-full bg-blue-50 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Link to="/" className="flex items-center gap-1 hover:underline hover:text-blue-500">
              <Home size={18} /> Home
            </Link>
            <span>/</span>
            <Link to="/universities" className="flex items-center gap-1 hover:underline hover:text-blue-500">
              <Layers size={18} /> Universities
            </Link>
          </div>
        </div>
      </div>

      <div className="py-10 px-4">
        {/* Main Heading (Dynamic and Colored) */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          {renderColoredHeading(pageTitle)}
        </h1>

        {/* University Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
         {cardData.map((card) => {
  const color = colorClasses[card.bgColor];
  return (
    <div key={card.type} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col items-center">
      <div className={`${color.lightBg} p-4 rounded-full mb-4`}>
        {card.icon}
      </div>
      <h3 className={`text-xl font-bold ${color.text} mb-3`}>{card.title}</h3>
      <p className="text-gray-600 text-center mb-6">{card.description}</p>
      <button
        onClick={() => navigate(card.path)}
        className={`mt-auto ${color.bg} ${color.hover} text-white font-semibold py-2 px-6 rounded-lg transition-colors`}
      >
        BROWSE ALL
      </button>
    </div>
  );
})}
        </div>

{/* INTERNATIONAL SCHOOLS SECTION */}
<div className="max-w-6xl mx-auto mt-20">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
    <span className="text-purple-800">International Schools</span>{" "}
    <span className="text-orange-500">in Malaysia</span>
  </h2>
  <div className="flex justify-center grid-cols-1 md:grid-cols-3 gap-8 ">
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col items-center">
      <div className="bg-purple-100 p-4 rounded-full mb-4">
        <FaSchool className="text-purple-600 text-4xl" />
      </div>
      <h3 className="text-xl font-bold text-purple-800 mb-3">International Schools</h3>
      <p className="text-gray-600 text-center mb-6">
        Discover top international schools in Malaysia that offer globally recognized curriculums like IGCSE, IB, and American diplomas.
      </p>
      <button
        onClick={() => navigate("/universities/international-school-in-malaysia")}
        className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
      >
        BROWSE ALL
      </button>
    </div>
  </div>
</div>

{/* ACCREDITING & PROFESSIONAL BODIES SECTION */}
<div className="max-w-6xl mx-auto mt-24">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
    <span className="text-cyan-800">Accrediting</span>{" "}
    <span className="text-rose-600">and Professional Bodies</span>
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Accrediting Body */}
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col items-center">
      <div className="bg-cyan-100 p-4 rounded-full mb-4">
        <FaCheckCircle className="text-cyan-600 text-4xl" />
      </div>
      <h3 className="text-xl font-bold text-cyan-800 mb-3">Accrediting Body</h3>
      <p className="text-gray-600 text-center mb-6">
        Learn about accreditation organizations ensuring high-quality international education in Malaysia.
      </p>
      <button
        onClick={() => navigate("/bodies/accrediting-bodies")}
        className="mt-auto bg-cyan-600 hover:bg-cyan-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
      >
        View Detail
      </button>
    </div>
    {/* Professional Bodies */}
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col items-center">
      <div className="bg-rose-100 p-4 rounded-full mb-4">
        <FaBriefcase className="text-rose-600 text-4xl" />
      </div>
      <h3 className="text-xl font-bold text-rose-800 mb-3">Professional Bodies</h3>
      <p className="text-gray-600 text-center mb-6">
        Explore professional bodies that collaborate with international schools and support educational excellence.
      </p>
      <button
        onClick={() => navigate("/bodies/professional-bodies")}
        className="mt-auto bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
      >
        View Detail
      </button>
    </div>
  </div>
</div>

















        {/* University Rankings Table */}
        <div className="max-w-6xl mx-auto mt-16 prose prose-lg ">
          {loading ? (
            <div className="flex justify-center items-center p-10">
              <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
          ) : (
            <RenderHtml htmlString={pageContent.top} />
          )}
        </div>

        {/* Tab Section */}
        <div className="max-w-6xl mx-auto mt-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-10">
                <span className="text-blue-800">Find out more</span>{" "}
                <span className="text-orange-500">about:</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button 
                    onClick={() => setActiveTab('public')}
                    className={`group relative overflow-hidden rounded-xl bg-white px-6 py-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${activeTab === 'public' ? 'ring-2 ring-blue-600' : ''}`}
                >
                    <h3 className="text-xl font-bold text-blue-800">PUBLIC UNIVERSITIES</h3>
                </button>
                <button 
                    onClick={() => setActiveTab('private')}
                    className={`group relative overflow-hidden rounded-xl bg-white px-6 py-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${activeTab === 'private' ? 'ring-2 ring-orange-600' : ''}`}
                >
                    <h3 className="text-xl font-bold text-orange-800">PRIVATE UNIVERSITIES</h3>
                </button>
                <button 
                    onClick={() => setActiveTab('foreign')}
                    className={`group relative overflow-hidden rounded-xl bg-white px-6 py-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${activeTab === 'foreign' ? 'ring-2 ring-green-600' : ''}`}
                >
                    <h3 className="text-xl font-bold text-green-800">FOREIGN UNIVERSITIES</h3>
                </button>
            </div>
        </div>



        

        {/* Dynamic Content */}
        <div className="max-w-6xl mx-auto mt-16 prose prose-lg">
          {loading ? (
            <div className="flex justify-center items-center p-10">
              <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
          ) : (
            <div className="p-4 bg-white rounded-lg shadow-md">
              <RenderHtml htmlString={pageContent[activeTab]} />
            </div>
          )}
        </div>

        {/* Trending Courses */}
        <div className="max-w-6xl mx-auto mt-16">
          <TrendingCourses />
        </div>
      </div>
    </> 
  )
}

export default Universities;