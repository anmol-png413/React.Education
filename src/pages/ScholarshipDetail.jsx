import React, { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { Helmet } from "react-helmet";

import {
  Home,
  Info,
  Gift,
  Building2,
  FileEdit,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import GetInTouchForm from "../components/GetInTouchForm";
import api from "../api";

// ✅ Formatting function for API HTML
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

const tabs = [
  { name: "Overview", icon: <Info size={16} /> },
  { name: "Scholarship Opportunity", icon: <Gift size={16} /> },
  { name: "University", icon: <Building2 size={16} /> },
  { name: "Application Process", icon: <FileEdit size={16} /> },
  { name: "Conclusion", icon: <CheckCircle size={16} /> },
];

const ScholarshipDetail = () => {
  const { slug } = useParams();
  const sectionRefs = tabs.reduce((acc, tab) => {
    acc[tab.name] = useRef(null);
    return acc;
  }, {});

  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [toastShown, setToastShown] = useState(false);
  const [scholarshipData, setScholarshipData] = useState(null);
  const [otherScholarships, setOtherScholarships] = useState([]);
  const [seo, setSeo] = useState({});

  useEffect(() => {
    const fetchScholarshipDetail = async () => {
      try {
        const response = await api.get(`/scholarship-details/${slug}`);
        setScholarshipData(response.data?.scholarship || null);
        setOtherScholarships(response.data.other_scholarships || []);
        setSeo(response.data.seo || {});
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching scholarship details:", error);
      }
    };
    fetchScholarshipDetail();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      for (const tab of tabs) {
        const ref = sectionRefs[tab.name].current;
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveTab(tab.name);
            if (tab.name === "Conclusion" && !toastShown) {
              toast.success("You've reached the Conclusion section ✨");
              setToastShown(true);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs, toastShown]);

  const handleTabClick = (tabName) => {
    sectionRefs[tabName]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!scholarshipData) {
    return <p className="text-center py-20 text-gray-500">Loading...</p>;
  }

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
    <section className="bg-gradient-to-br from-blue-50 to-white px-4 py-10 md:px-10 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center text-sm text-gray-600 gap-2">
          <Link
            to="/"
            className="flex items-center gap-1 hover:underline hover:text-blue-600"
          >
            <Home size={18} /> Home
          </Link>
          <span>/</span>
          <span className="capitalize text-blue-600">
            {scholarshipData?.title || "Scholarship Detail"}
          </span>
        </div>

        {/* Title */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center text-blue-800 mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {scholarshipData?.title}
        </motion.h2>

        {/* Tab Navigation */}
        <motion.div
          className="flex gap-4 overflow-x-auto border-b border-gray-200 pb-3 mb-8 no-scrollbar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {tabs.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => handleTabClick(name)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition duration-300 text-sm md:text-base font-medium shadow-sm ${
                activeTab === name
                  ? "bg-blue-100 text-blue-700 ring-2 ring-blue-300"
                  : "bg-white text-gray-600 hover:bg-blue-50"
              }`}
            >
              {icon}
              {name}
            </button>
          ))}
        </motion.div>

        {/* Two-column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
          {/* Left Content */}
          <div className="space-y-10">
            {tabs.map(({ name }, index) => {
              const contentObj = scholarshipData?.contents?.find(
                (c) => c.tab.toLowerCase() === name.toLowerCase()
              );
              return (
                <motion.div
                  key={name}
                  ref={sectionRefs[name]}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Section title={name}>
                    <div
                      className="formatted-content"
                      dangerouslySetInnerHTML={{
                        __html: formatHTML(contentObj?.description || ""),
                      }}
                    />
                  </Section>
                </motion.div>
              );
            })}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Other Scholarships Section */}
            {Array.isArray(otherScholarships) && (
              <div className="border rounded-lg p-4 bg-white shadow-sm mt-6">
                <h2 className="text-lg font-bold mb-4">Other Scholarships</h2>
                <div className="space-y-3">
                  {otherScholarships.map((sch) => (
                    <div
                      key={sch.id}
                      className="flex justify-between items-center border-b last:border-b-0 pb-3 last:pb-0"
                    >
                      <Link
                        to={`/scholarships/${sch.slug}`}
                        className="flex-1 text-sm hover:text-blue-600 transition-colors"
                      >
                        {sch.title}
                      </Link>
                      <FaChevronRight className="text-white bg-blue-500 rounded-full p-1 w-6 h-6 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <GetInTouchForm />
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ScholarshipDetail;

// Reusable Section Component
const Section = ({ title, children }) => (
  <div className="bg-white border border-blue-100 shadow-md rounded-xl p-6">
    <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
      {title}
    </h3>
    <div className="text-gray-700 leading-relaxed space-y-2">{children}</div>
  </div>
);