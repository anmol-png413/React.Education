import React, { useRef, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  Home,
  Layers,
  Info,
  Clock,
  DollarSign,
  Briefcase,
  Share2,
} from "lucide-react";

import GetInTouchForm from "../components/GetInTouchForm";
import FeaturedUniversities from "../components/FeaturedUniversities";
import TrendingCourse2 from "../components/TrandingCourse2";
import { motion } from "framer-motion";
import api from "../api";
import UniversityCard from "../components/UniversityCard";
import { Helmet } from "react-helmet";

const tabIcons = {
  "About Course": <Info size={16} />,
  "Duration": <Clock size={16} />,
  "Cost": <DollarSign size={16} />,
  "Career": <Briefcase size={16} />,
  "Branches": <Share2 size={16} />,
};

// ✅ Helper to format raw HTML with better styles
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
    '<thead class="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-left text-sm">'
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


const SpecializationDetail = () => {
  const { name } = useParams();
  const slug = name.toLowerCase();
  const formattedName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [activeTab, setActiveTab] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [contentMap, setContentMap] = useState({});
  const [faqs, setFaqs] = useState([]);
  const [seo, setSeo] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/specialization-detail-by-slug/${slug}`);
        const specialization = res?.data?.data?.specialization;
        const contents = specialization?.contents;
        const faqs = specialization?.faqs || [];
         setSeo(res.data.data.seo || {});
        //  console.log("SEO Data:", res.data.data.seo);

        if (!Array.isArray(contents)) return;

        const groupedContent = {};
        const dynamicTabs = [];

        contents.forEach((item) => {
          if (item.tab && item.description) {
            groupedContent[item.tab] = item.description;
            dynamicTabs.push({ name: item.tab, icon: tabIcons[item.tab] || <Info size={16} /> });
            sectionRefs.current[item.tab] = React.createRef();
          }
        });

        setContentMap(groupedContent);
        setTabs(dynamicTabs);
        setActiveTab(dynamicTabs[0]?.name || "");
        setFaqs(faqs);
      } catch (error) {
        console.error("❌ API fetch failed:", error);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      for (const tab of tabs) {
        const ref = sectionRefs.current[tab.name];
        if (ref?.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveTab(tab.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tabs]);

  const handleTabClick = (tabName) => {
    sectionRefs.current[tabName]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
  <Helmet>
      {/* 🔹 Basic SEO */}
      <title>{seo?.meta_title}</title>
      <meta name="title" content={seo?.meta_title} />
      <meta name="description" content={seo?.meta_description} />
      <meta name="keywords" content={seo?.meta_keyword} />

      {/* 🔹 Robots */}
      <meta name="robots" content={seo?.robots || "index, follow"} />

      {/* 🔹 Canonical */}
      {seo?.page_url && <link rel="canonical" href={seo?.page_url} />}

      {/* 🔹 Open Graph (Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={seo?.meta_title} />
      <meta property="og:description" content={seo?.meta_description} />
      <meta property="og:image" content={seo?.og_image_path} />
      <meta property="og:url" content={seo?.page_url} />
      <meta property="og:site_name" content={seo?.site_name || "Study in Malaysia"} />
      <meta property="og:type" content={seo?.og_type || "website"} />
      <meta property="og:locale" content={seo?.og_locale || "en_US"} />
 {/* 🔹 SEO Rating (as meta) */}
      {seo?.seo_rating && <meta name="seo:rating" content={seo?.seo_rating} />}

      {/* 🔹 JSON-LD Schema (Structured Data) */}
      {seo?.seo_rating_schema && (
        <script type="application/ld+json">
          {JSON.stringify(seo.seo_rating_schema)}
        </script>
      )}
     
    </Helmet>





      <div
        className="w-full h-50 md:h-50 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/9169143.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-blue-900/60 z-10" />
        <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 py-10">
          <h1 className="text-white text-xl md:text-3xl font-bold mb-2">
            {formattedName} Course in Malaysia:
            <span className="text-yellow-300"> Complete Guide</span>
          </h1>
          <p className="text-white text-sm md:text-lg max-w-2xl">
            Learn everything about pursuing {formattedName} in Malaysia — duration, fees, universities, careers and more.
          </p>
        </div>
      </div>

      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 px-3 py-3 md:px-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center text-sm text-gray-600 space-x-2">
            <Link to="/" className="flex items-center gap-1 hover:underline hover:text-blue-500">
              <Home size={18} /> Home
            </Link>
            <span>/</span>
            <Link to="/specialization" className="flex items-center gap-1 hover:underline hover:text-blue-600">
              <Layers size={18} /> Specialization
            </Link>
            <span>/</span>
            <span className="capitalize font-medium">{formattedName}</span>
          </div>

          <div className="sticky top-0 z-30 bg-blue-50/30 backdrop-blur-sm p-3 rounded-xl shadow-sm mb-8 flex flex-wrap gap-3 w-full md:w-auto">
            {tabs.map(({ name, icon }) => (
              <button
                key={name}
                onClick={() => handleTabClick(name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border shadow-sm transition-all ${
                  activeTab === name
                    ? "text-blue-700 bg-white border-blue-300 ring-2 ring-blue-200"
                    : "text-gray-700 bg-white hover:bg-blue-50 border-gray-200"
                }`}
              >
                {icon}
                {name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">
            <div className="space-y-10">
              {tabs.map(({ name }, index) => (
                <motion.div
                  key={name}
                  ref={sectionRefs.current[name]}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >

                  
              
{contentMap[name] && (
  (() => {
    // Heading ke liye HTML content nikalein
    const html = contentMap[name];
    const match = html.match(/<h[^>]*>(.*?)<\/h[^>]*>/i);
    const headingHtmlContent = match ? match[1].replace(/:\s*$/, "") : name;

    return (
      <h3
        className="text-xl md:text-2xl font-semibold text-[#0E3C6E] border-l-4 border-blue-500 pl-3 mb-4"
        dangerouslySetInnerHTML={{ __html: headingHtmlContent }}
      />
    );
  })()
)}
                  {contentMap[name] ? (
                    <div
                      className="prose prose-p:mb-4 prose-h4:font-semibold prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2 prose-p:text-gray-800 prose-p:text-base"
                      dangerouslySetInnerHTML={{ __html: formatHTML(contentMap[name]) }}
                    />
                  ) : (
                    <p className="text-gray-500">
                      No {name.toLowerCase()} info available for {formattedName}.
                    </p>
                  )}
                </motion.div>
              ))}
<UniversityCard />
              {/* ✅ FAQ Section */}
              {faqs.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-xl md:text-2xl font-semibold text-[#0E3C6E] border-l-4 border-blue-500 pl-3 mb-4">
                    Frequently Asked Questions (FAQs)
                  </h3>
                  <div className="space-y-3">
                    {faqs.map((faq, index) => (
                      <details
                        key={index}
                        className="border-l-4 border-blue-500 bg-blue-50 px-4 py-3 rounded-md"
                      >
                        <summary className="cursor-pointer font-semibold text-gray-900 text-base">
                          {faq.question}
                        </summary>
                        <div className="mt-2 text-gray-800 text-sm leading-relaxed">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: formatHTML(faq.answer),
                            }}
                          />
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              
            </div>

            <div className="space-y-1">
              <TrendingCourse2 />
              <GetInTouchForm />
              <FeaturedUniversities />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SpecializationDetail;
