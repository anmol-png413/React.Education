import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GetInTouchForm from '../components/GetInTouchForm';
import OtherServicesBox from '../components/OtherFeatures';
import TrendingCourse2 from "../components/TrandingCourse2";
import UniversityBox from '../components/FeaturedUniversities';
import api from '../api';
import { Helmet } from "react-helmet";

const ServiceDetailSkeleton = () => (
  <section className="bg-gradient-to-b from-blue-50 to-white py-8 px-4 md:px-8 animate-pulse">
    <div className="max-w-7xl mx-auto md:grid md:grid-cols-12 gap-6 flex flex-col relative">
      {/* Sidebar Skeleton */}
      <aside className="md:col-span-4 md:block">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="h-6 bg-gray-200 rounded-md w-1/2 mb-5"></div>
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded-lg"></div>
              <div className="h-8 bg-gray-200 rounded-lg"></div>
              <div className="h-8 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="h-6 bg-gray-200 rounded-md w-1/2 mb-5"></div>
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded-lg"></div>
              <div className="h-8 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="md:col-span-8 space-y-8 mt-6 md:mt-0">
        <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-blue-100">
          <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded-md w-1/2 mb-6"></div>
          <div className="w-full h-80 bg-gray-200 rounded-xl mb-6"></div>
          
          {/* Tabs Skeleton */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-10 bg-gray-200 rounded-full w-24"></div>
            <div className="h-10 bg-gray-200 rounded-full w-32"></div>
            <div className="h-10 bg-gray-200 rounded-full w-28"></div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-11/12"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
          </div>
        </div>
      </main>
    </div>
  </section>
);


const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [seo, setSeo] = useState({});

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
    return <div className="text-center text-red-500 mt-10">Service not found.</div>;
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

    <section className="bg-gradient-to-b from-blue-50 to-white py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto md:grid md:grid-cols-12 gap-6 flex flex-col relative">

        {/* Mobile Toggle */}
        <button
          onClick={toggleSidebar}
          className="md:hidden bg-blue-600 text-white py-2 px-4 rounded mb-4 w-fit self-end z-40"
        >
          {showSidebar ? "Close Sidebar" : "📂 Show Services"}
        </button>

        {/* Overlay */}
        {showSidebar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={closeSidebar} />
        )}

        {/* Sidebar */}
        <aside
          className={`md:col-span-4 fixed md:static top-0 right-0 z-40 h-full md:h-fit w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 overflow-y-auto shadow-lg md:shadow-none transition-transform transform ${
            showSidebar ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0 md:block`}
        >
          <div className="flex justify-end mb-4 md:hidden">
            <button
              onClick={closeSidebar}
              className="text-xl text-gray-600 hover:text-red-500"
            >
              ❌ close sidebar
            </button>
          </div>
          <div className="space-y-6">
            <OtherServicesBox />
            <GetInTouchForm />
            <TrendingCourse2 />
            <UniversityBox />
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-8 space-y-8 mt-6 md:mt-0">
          <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-blue-100 transition hover:shadow-blue-200 duration-300">
            <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-4">
              {service.page_name}
            </h1>

            {service.headline && (
              <h2 className="text-xl md:text-2xl text-blue-700 font-semibold mb-6">
                {service.headline}
              </h2>
            )}

            {service.thumbnail_path && (
              <img
                src={`https://www.educationmalaysia.in/${service.thumbnail_path}`}
                alt={service.page_name}
                className="w-full h-60 md:h-80 object-cover rounded-xl mb-6"
              />
            )}

            {/* Tabs */}
            {service.contents?.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.contents.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium ${
                        activeTab === index
                          ? "bg-blue-600 text-white"
                          : "bg-white border-blue-200 text-blue-700"
                      }`}
                    >
                      {item.tab_title.length > 60
                        ? item.tab_title.slice(0, 60) + "..."
                        : item.tab_title}
                    </button>
                  ))}
                </div>

                <div
                  className="prose max-w-none prose-blue text-gray-800"
                  dangerouslySetInnerHTML={{
                    __html: service.contents[activeTab].tab_content,
                  }}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
    </>
  );
};

export default ServiceDetail;