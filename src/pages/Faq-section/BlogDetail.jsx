import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import GetInTouchForm from "../../components/GetInTouchForm";
import { CalendarDays, ArrowRight, User } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Home, Layers } from "lucide-react";

// Format the dynamic HTML content
function formatBlogHTML(html) {
  if (!html) return "";

  let formatted = html;

  // Paragraphs with modern styling
  formatted = formatted.replace(
    /<p>/g,
    `<p style="
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.8;
      font-size: 1.125rem;
      color: #374151;
      margin-bottom: 1.5rem;
    ">`
  );

  // Main headings
  formatted = formatted.replace(
    /<h2>/g,
    `<h2 style="
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 1.875rem;
      font-weight: 700;
      color: #111827;
      margin: 2rem 0 1rem;
      line-height: 1.3;
      border-bottom: 2px solid #E5E7EB;
      padding-bottom: 0.5rem;
    ">`
  );

  // Sub headings
  formatted = formatted.replace(
    /<h3>/g,
    `<h3 style="
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 1.5rem;
      font-weight: 600;
      color: #1F2937;
      margin: 1.5rem 0 1rem;
      line-height: 1.4;
    ">`
  );

  // Lists with better styling
  formatted = formatted.replace(
    /<ul>/g,
    `<ul style="
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      padding-left: 1.5rem;
      margin: 1.5rem 0;
      list-style-type: disc;
      color: #374151;
    ">`
  );

  formatted = formatted.replace(
    /<li>/g,
    `<li style="
      margin-bottom: 0.75rem;
      line-height: 1.6;
      font-size: 1.125rem;
    ">`
  );

  // Blockquotes with elegant styling
  formatted = formatted.replace(
    /<blockquote>/g,
    `<blockquote style="
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      border-left: 4px solid #3B82F6;
      margin: 1.5rem 0;
      padding: 1rem 0 1rem 1.5rem;
      font-size: 1.25rem;
      color: #4B5563;
      font-style: italic;
      background-color: #F3F4F6;
      border-radius: 0.375rem;
    ">`
  );

  // Tables with modern styling
  formatted = formatted.replace(
    /<table/g,
    `<table style="
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      font-size: 1rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      border-radius: 0.5rem;
      overflow: hidden;
    "`
  );

  // Table headers
  formatted = formatted.replace(
    /<th/g,
    `<th style="
      background-color: #F3F4F6;
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
      color: #111827;
      border-bottom: 2px solid #E5E7EB;
    "`
  );

  // Table cells
  formatted = formatted.replace(
    /<td/g,
    `<td style="
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #E5E7EB;
      color: #374151;
    "`
  );

  // Clean up empty elements
  formatted = formatted.replace(/<span[^>]*>\s*<\/span>/g, "");
  formatted = formatted.replace(/&nbsp;/g, " ");

  return formatted;
}

const BlogDetail = () => {
  const { category, slugWithId } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seo, setSeo] = useState({});

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/blog-details/${category}/${slugWithId}`);
        setBlog(res.data.blog);
        setRelatedBlogs(res.data.related_blogs || []);
        setCategories(res.data.categories || []);
        setSeo(res.data.seo || {});
        setCourses(res.data.specializations || []);
     
       
      } catch (err) {
        setError("Failed to load blog details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [category, slugWithId]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!blog)
    return <div className="p-6 text-center text-gray-500">Blog not found.</div>;

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
            <span>/</span>
            <h1 className="flex items-center gap-1 ">
              <Layers size={18} /> {blog.headline}
            </h1>
          </div>
        </div>
      </div>



    <div className="bg-gray-50 p-6 space-y-6">
      <div className="max-w-7xl mx-auto px-4 lg:px-0 flex flex-col lg:flex-row gap-8">
        {/* Main Blog Content */}
        <div className="w-full lg:w-2/3 space-y-6 px-4 md:px-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-extrabold text-gray-800 leading-tight">
            {blog.headline}
          </h1>

          <div className="flex items-center text-sm text-gray-600 gap-4">
            {blog.author && (
              <span className="flex items-center gap-1">
                <User className="w-4 h-4 text-gray-500" />
                <span>{blog.author.name || "Unknown"}</span>
              </span>
            )}
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4 text-gray-500" />
              {new Date(blog.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          {blog.thumbnail_path && (
            <img
              src={`https://www.educationmalaysia.in/${blog.thumbnail_path}`}
              alt={blog.headline}
              className="w-full rounded-lg shadow"
            />
          )}

          {blog.description && (
            <div
              className="prose max-w-none text-gray-800"
              dangerouslySetInnerHTML={{
                __html: formatBlogHTML(blog.description),
              }}
            />
          )}

          {blog.parent_contents?.length > 0 && (
            <div className="space-y-8">
              {blog.parent_contents.map((section, index) => (
                <div key={index}>
                  <h2 className="flex items-center gap-2 text-2xl font-bold text-[#003B73] mb-3  border-l-4 border-blue-500">
                    <span className="w-1 h-6  inline-block rounded-sm"></span>
                    {section.title}
                  </h2>
                  <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: formatBlogHTML(section.description),
                    }}
                  />
                  {section.child_contents?.length > 0 && (
                    <div className="ml-4 mt-6 space-y-6 border-l-2 border-gray-200 pl-4">
                      {section.child_contents.map((child, i) => (
                        <div key={i}>
                          <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-2">
                            <span className="w-1 h-5 bg-blue-400 inline-block rounded-sm"></span>
                            {child.title}
                          </h3>
                          <div
                            className="prose max-w-none text-gray-600"
                            dangerouslySetInnerHTML={{
                              __html: formatBlogHTML(child.description),
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/3 space-y-6">
          {categories.length > 0 && (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Categories</h3>
    <ul className="space-y-2">
      {categories.map((cat) => (
        <li key={cat.id}>
          <a
            href={`/blog/category/${cat.category_slug}`}
            className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100"
          >
            {cat.category_name}
            <ArrowRight className="w-4 h-4" />
          </a>
        </li>
      ))}
    </ul>
  </div>
)}


          <div className="">
            <GetInTouchForm />
          </div>

          {relatedBlogs.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Related Blogs</h2>
              <div className="space-y-4">
                {relatedBlogs.map((item) => (
                  <a
                    key={item.id}
                    href={`/blog/${category}/${item.slug}-${item.id}`}
                    className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded-md"
                  >
                    {item.thumbnail_path && (
                      <img
                        src={`https://www.educationmalaysia.in/${item.thumbnail_path}`}
                        alt={item.headline}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                        {item.headline}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {new Date(item.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
{courses.length > 0 && (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Trending Courses</h3>
    <ul className="space-y-2">
      {courses.map((spec) => (
        <li key={spec.id}>
          <a
            href={`/specialization/${spec.slug}`}
            className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-orange-50"
          >
            {spec.name}
            <ArrowRight className="w-4 h-4 text-orange-500" />
          </a>
        </li>
      ))}
    </ul>
  </div>
)}


        </aside>
      </div>
    </div>
    </>
  );
};

export default BlogDetail;
