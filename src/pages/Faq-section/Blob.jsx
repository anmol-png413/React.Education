import React, { useEffect, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import {Helmet} from "react-helmet";
import { Home, Layers } from "lucide-react";  

const LoadingSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="flex items-center text-gray-600 text-sm">
          <div className="w-4 h-4 mr-2 bg-gray-300 rounded-full"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

const NewsCardGrid = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [seo, setSeo] = useState({});
  const [loading, setLoading] = useState(true);

  const { category_slug } = useParams(); // Will be undefined on /blog
  const navigate = useNavigate();
  const activeCategory = category_slug || "all";

  // Fetch blogs (all or by category)
  const fetchBlogs = async (page = 1, category = "all") => {
    setLoading(true);
    try {
      let res;
      if (category === "all") {
        res = await api.get(`/blog?page=${page}`);
        setSeo(res.data.seo);
      } else {
        res = await api.get(`/blog-by-category/${category}?page=${page}`);
        setSeo(res.data.seo);
        console.log(res.data);
        
      }

      const blogData = res.data.blogs;
      if (blogData?.data) {
        setBlogs(blogData.data);
        setCurrentPage(blogData.current_page);
        setLastPage(blogData.last_page);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const category = category_slug || "all";
    fetchBlogs(currentPage, category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category_slug, currentPage]);

  const handleCategoryClick = (slug) => {
    setCurrentPage(1);
    if (slug === "all") {
      navigate("/blog");
    } else {
      navigate(`/blog/category/${slug}`);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= lastPage) {
      setCurrentPage(page);
    }
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
    {/* Breadcrumb */}
      <div className="w-full bg-blue-50 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Link to="/" className="flex items-center gap-1 hover:underline hover:text-blue-500">
              <Home size={18} /> Home
            </Link>
            <span>/</span>
            <h1 className="flex items-center gap-1 ">
              <Layers size={18} /> Blog
            </h1>
          </div>
        </div>
      </div>
    
      <div className="p-6 lg:p-10">
        {activeCategory !== "all" && (
          <div className="mb-6">
            <button
              onClick={() => handleCategoryClick("all")}
            className="w-40 bg-blue-600 hover:bg-blue-700 text-white px-1  py-2 rounded-lg text-sm font-semibold transition-all-blue-600  border-blue-600"
          >
            ← View all blogs
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => <LoadingSkeleton key={index} />)
        ) : (
          blogs.map((item) => {
            const imageUrl = item.imgpath?.startsWith("http")
              ? item.imgpath
              : `https://www.educationmalaysia.in/storage/${item.thumbnail_path || "default.jpg"}`;
            const catSlug = item.get_category?.category_slug;
   
            return (
              <Link
                to={`/blog/${catSlug}/${item.slug}-${item.id}`}
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 relative"
              >
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt={item.headline}
                    className="w-full h-48 object-cover"
                  />
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(catSlug);
                    }}
                    className={`absolute top-4 left-4 font-semibold text-sm px-3 py-1 rounded shadow-md cursor-pointer transition ${
                      activeCategory === catSlug
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black hover:bg-blue-100"
                    }`}
                  >
                    {item.get_category?.category_name || "General"}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-base text-gray-800 line-clamp-2">
                    {item.headline}
                  </h3>
                </div>
                <div className="px-4 pb-4 flex items-center text-gray-600 text-sm">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  <span>
                    {new Date(item.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {lastPage > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-full ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500"
                : "bg-white hover:bg-gray-100"
            } border`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded-full border ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === lastPage}
            className={`px-3 py-2 rounded-full ${
              currentPage === lastPage
                ? "bg-gray-200 text-gray-500"
                : "bg-white hover:bg-gray-100"
            } border`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
     </>
  );
};

export default NewsCardGrid;
