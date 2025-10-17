import React, { useState, useEffect } from "react";
import { ArrowRight, Home, Layers, Sparkles, BookOpen, GraduationCap, Star, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api"; // axios instance
import { Helmet } from "react-helmet";

const Specialization = () => {
  const [showMore, setShowMore] = useState(false);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seo, setSeo] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchSpecializations = async () => {
      try {
        const res = await api.get("/specializations");
        setSpecializations(res.data.data || []);
        setSeo(res.data.seo || {});
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch specializations", error);
        setLoading(false);
      }
    };

    fetchSpecializations();
  }, []);

  const toggleShowMore = () => setShowMore(!showMore);

  const infoText = `Our platform offers detailed insights to guide your choices. 
From undergraduate to postgraduate levels, we provide expert advice and up-to-date information on course requirements, eligibility, and university rankings. 
Our mission is to simplify your study abroad planning and help you make confident academic decisions.Education Malaysia helps students identify the right specialization for their future career. 
Whether you're interested in  Business, or Arts, our platform offers detailed insights to guide your choices. 
From undergraduate to postgraduate levels, we provide expert advice and up-to-date information on course requirements, eligibility, and university rankings. 
Our mission is to simplify your study abroad planning and help you make confident academic decisions.`;

  const slugify = (str) => {
    return str
      .toLowerCase()
      .replace(/&/g, "-")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-3xl shadow-lg p-6 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
          </div>
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );

  // Enhanced specialization icons
  const getSpecializationIcon = (index) => {
    const icons = [BookOpen, GraduationCap, Sparkles, Star];
    const IconComponent = icons[index % icons.length];
    return <IconComponent size={20} />;
  };

  const getGradientColor = (index) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-blue-600',
      'from-yellow-500 to-orange-600',
      'from-purple-500 to-indigo-600',
      'from-teal-500 to-green-600'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>{seo?.meta_title}</title>
        <meta name="title" content={seo?.meta_title} />
        <meta name="description" content={seo?.meta_description} />
        <meta name="keywords" content={seo?.meta_keyword} />

        {/* Robots */}
        <meta name="robots" content={seo?.robots || "index, follow"} />

        {/* Canonical */}
        {seo?.page_url && <link rel="canonical" href={seo?.page_url} />}

        {/* Open Graph */}
        <meta property="og:title" content={seo?.meta_title} />
        <meta property="og:description" content={seo?.meta_description} />
        <meta property="og:image" content={seo?.og_image_path} />
        <meta property="og:url" content={seo?.page_url} />
        <meta property="og:site_name" content={seo?.site_name || "Study in Malaysia"} />
        <meta property="og:type" content={seo?.og_type || "website"} />
        <meta property="og:locale" content={seo?.og_locale || "en_US"} />

        {/* SEO Rating */}
        {seo?.seo_rating && <meta name="seo:rating" content={seo?.seo_rating} />}

        {/* JSON-LD Schema */}
        {seo?.seo_rating_schema && (
          <script type="application/ld+json">
            {JSON.stringify(seo.seo_rating_schema)}
          </script>
        )}
      </Helmet>

      {/* Enhanced Hero Section */}
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{ backgroundImage: "url('/girl banner.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-indigo-900/80"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full mix-blend-overlay animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-yellow-300 rounded-full mix-blend-overlay animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-overlay animate-pulse delay-500 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="text-yellow-300" size={20} />
              <span className="text-white font-medium">Explore Your Future</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Discover Your Perfect
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Specialization
            </span>
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Start your academic journey with the right path. Explore top courses and fields of study in Malaysia with expert guidance.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <GraduationCap className="text-yellow-300" size={18} />
              <span className="text-white text-sm">Expert Guidance</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <BookOpen className="text-yellow-300" size={18} />
              <span className="text-white text-sm">Comprehensive Info</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Star className="text-yellow-300" size={18} />
              <span className="text-white text-sm">Top Rankings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-12 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Enhanced Breadcrumb */}
          <div className="mb-9 flex items-center text-sm text-gray-600 space-x-2 -mt-9">
             <Link to="/" className="flex items-center gap-1 hover:underline hover:text-blue-500">
              <Home size={18} /> Home
            </Link>
            <span>/</span>
            <Link to="/specialization" className="flex items-center gap-1 hover:underline hover:text-blue-600">
              <Layers size={18} /> Specialization
            </Link>
          </div>

          {/* Enhanced Heading Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-800">Study </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Abroad Exams </span>
              <span className="text-gray-800">with Education Malaysia</span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>

            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Explore a wide range of specialization areas tailored to your career aspirations. Select your preferred field and begin your global education journey today.
            </p>
          </div>

          {/* Enhanced Info Box */}
          <div className="relative bg-gray-100 rounded-3xl p-8 mb-12 max-w-6xl mx-auto shadow-lg border border-blue-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full transform translate-x-8 -translate-y-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-500/10 to-pink-500/10 rounded-full transform -translate-x-4 translate-y-4"></div>
            
            <div className="relative">
              
              
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {showMore ? infoText : infoText.slice(0, 180) + "..."}
              </p>
              
              <button
                onClick={toggleShowMore}
                className="mt-4 inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 group"
              >
                <span>{showMore ? "Show Less" : "Show More"}</span>
                {showMore ? (
                  <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                ) : (
                  <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                )}
              </button>
            </div>
          </div>

          {/* Enhanced Specializations Grid */}
          {loading ? (
            <LoadingSkeleton />
          ) : Array.isArray(specializations) && specializations.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {specializations.map((item, index) => (
                <Link
                  key={index}
                  to={`/specialization/${slugify(item.name)}`}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100"
                >
                
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getGradientColor(index)} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                          {getSpecializationIcon(index)}
                        </div>
                        <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          Study
                        </span>
                      </div>
                      <ArrowRight 
                        size={20} 
                        className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" 
                      />
                    </div>
                    
                    <h3 className="text-gray-800 font-bold text-lg mb-3 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                      {item.name}
                    </h3>

                    <div className="flex items-center justify-between mt-6">
                      <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full tracking-wide ">
                         IN MALAYSIA
                      </span>
                      
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Specializations Found</h3>
              <p className="text-gray-500">Please check back later or contact support.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Specialization;