import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Home, Layers } from "lucide-react";
import api from "../api"; // Adjust the import based on your project structure
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import {Helmet } from "react-helmet"; // Import Helmet for SEO management
import {
  MapPin,
  Building,
  Star,
  BookOpen,
  Globe,

} from "lucide-react";
import { toast } from "react-toastify";

const CourseCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 animate-pulse flex flex-col md:flex-row justify-between overflow-hidden">
    <div className="flex-1">
      <div className="flex gap-5">
        <div className="w-[100px] h-[100px] bg-gray-200 rounded-xl"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-4"></div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-24"></div>
            <div className="h-4 bg-gray-200 rounded-md w-20"></div>
            <div className="h-4 bg-gray-200 rounded-md w-28"></div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 mt-5 pt-5">
        <div className="h-5 bg-gray-200 rounded-md w-1/2 mb-8"></div>
        <div className="flex flex-wrap md:flex-nowrap items-center justify-start divide-x divide-slate-300">
          <div className="flex-1 px-4"><div className="h-4 bg-gray-200 rounded-md w-1/2"></div></div>
          <div className="flex-1 px-4"><div className="h-4 bg-gray-200 rounded-md w-1/2"></div></div>
          <div className="flex-1 px-4"><div className="h-4 bg-gray-200 rounded-md w-1/2"></div></div>
          <div className="flex-1 px-4"><div className="h-4 bg-gray-200 rounded-md w-1/2"></div></div>
        </div>
      </div>
    </div>
    <div className="bg-slate-50/60 w-full md:max-w-[220px] px-6 py-6 flex flex-col items-center justify-between gap-4">
      <div className="h-6 bg-gray-200 rounded-md w-16"></div>
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
      </div>
    </div>
  </div>
);

const FilterPanelSkeleton = () => (
  <div className="hidden md:block w-[280px] bg-white border border-gray-200 p-5 rounded-xl shadow-md space-y-6 text-base animate-pulse">
    <div className="flex justify-between items-center mb-2">
      <div className="h-6 bg-gray-200 rounded-md w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
    </div>
    {[...Array(5)].map((_, i) => (
      <div key={i} className="space-y-2">
        <div className="h-5 bg-gray-200 rounded-md w-1/2"></div>
        <div className="mt-3 pl-1 space-y-3">
          <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-full"></div>
          <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
        </div>
      </div>
    ))}
  </div>
);


const Courses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const infoText = `or Arts, our platform offers detailed insights to guide your choices. 
From undergraduate to postgraduate levels, we provide expert advice and up-to-date information on course requirements, eligibility, and university rankings. 
Our mission is to simplify`;

  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [seo, setSeo] = useState({});
  const [totalCourses, setTotalCourses] = useState(0);

  // Add selected filters state
  const [selectedFilters, setSelectedFilters] = useState({
    levels: "",
    categories: "",
    specialization: "",
    intakes: "",
    study_modes: "",
  });

  const [filters, setFilters] = useState({
    levels: [],
    categories: [],
    specialization: [],
    study_modes: [],
    intakes: [],
  });
  

  const [openFilters, setOpenFilters] = useState(
      Object.keys(filters).reduce((acc, key) => {
        acc[key] = true; // Initially all filters are open
        return acc;
      }, {})
    );;

  const [coursesData, setCoursesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [paginationLinks, setPaginationLinks] = useState([]);
   const [appliedCourses, setAppliedCourses] = useState(new Set());

  const fetchFilterOptions = async (filtersToApply = {}) => {
    try {
      const keyMapping = {
          levels: 'level',
          categories: 'category',
          specialization: 'specialization',
          study_modes: 'study_mode',
          intakes: 'intake'
      };

      const queryParams = new URLSearchParams();
      for (const [key, val] of Object.entries(filtersToApply)) {
          if (val) {
              const paramKey = keyMapping[key];
              if (paramKey) {
                  const slugValue = String(val).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
                  queryParams.set(paramKey, slugValue);
              }
          }
      }
      
      const endpoint = `/courses-in-malaysia?${queryParams.toString()}`;
      const res = await api.get(endpoint);
      const fetchedFilters = res.data.filters || {};
      setFilters(fetchedFilters);
      console.log("Fetched Filters:", fetchedFilters);

      if (Object.keys(openFilters).length === 0 && Object.keys(fetchedFilters).length > 0) {
        setOpenFilters(
            Object.keys(fetchedFilters).reduce((acc, key) => {
              acc[key] = false; // Initially all filters are closed
              return acc;
            }, {})
        );
      }
    } catch (e) {
      console.error("Error fetching filters:", e);
    }
  };

  const fetchCourses = async (page = 1, filtersToApply = {}, searchTerm = "") => {
    setLoading(true);
    try {
      const keyMapping = {
          levels: 'level',
          categories: 'category',
          specializations: 'specialization',
          study_modes: 'study_mode',
          intakes: 'intake'
      };

      const queryParams = new URLSearchParams({ page });
      if (searchTerm) {
        queryParams.set("search", searchTerm);
      }
      for (const [key, val] of Object.entries(filtersToApply)) {
          if (val) {
              const paramKey = keyMapping[key];
              if (paramKey) {
                  const slugValue = String(val).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
                  queryParams.set(paramKey, slugValue);
              }
          }
      }
      
      const endpoint = `/courses-in-malaysia?${queryParams.toString()}`;
      const res = await api.get(endpoint);
      const rows = res?.data?.rows;
      console.log("Fetched Courses Data:", rows);

      setCoursesData(rows?.data || []);
      setTotalCourses(rows?.total || 0);
      setPaginationLinks(rows?.links || []);
      setCurrentPage(rows?.current_page || 1);
      setLastPage(rows?.last_page || 1);
      setSeo(res.data.seo || {});

    } catch (e) {
      console.error("Error fetching courses:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/student/applied-college", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        const appliedList = res.data.applied_programs || [];
        const appliedIds = new Set(appliedList.map(item => item.prog_id));
        setAppliedCourses(appliedIds);
      })
      .catch((err) => {
        console.error("Error fetching applied programs:", err);
      });
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    setSearch(searchQuery || "");
  }, [location.search]);

  useEffect(() => {
    fetchCourses(currentPage, selectedFilters, search);
    fetchFilterOptions(selectedFilters);
  }, [currentPage, selectedFilters, search]);


  const handleFilterChange = (filterType, value) => {
    const params = new URLSearchParams(location.search);
    params.delete('search');
    navigate({ search: params.toString() });
    setSearch("");

    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType] === value ? "" : value,
    }));
    setCurrentPage(1);
  };

  const toggleFilter = (key) => {
    setOpenFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReset = () => {
    const params = new URLSearchParams(location.search);
    params.delete('search');
    navigate({ search: params.toString() });
    setSearch("");

    setSelectedFilters({
      levels: "",
      categories: "",
      specializations: "",
      intakes: "",
      study_modes: "",
    });
    setCurrentPage(1);
  };

  const handleUniversityClick = (universityName) => {
    if (!universityName || typeof universityName !== "string") return;
    const slug = universityName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, ""); // special characters remove
    navigate(`/university/${slug}`);
  };


 const handleSearch = (value) => {
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    navigate({ search: params.toString() });
    setCurrentPage(1);
  };

  const handleApplyNow = async (courseId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // ✅ User not logged in → redirect to sign-up
    navigate(`/sign-up?program_id=${courseId}`);
    return;
  }

  try {
    // ✅ Apply API
    await api.get(`/student/apply-program/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

   toast.success("Program applied successfully!");
    setAppliedCourses(prev => new Set(prev).add(courseId));
    // Redirect to profile after success
    navigate("/student/profile");
  } catch (error) {
     if (error.response?.status === 409) {
      // ⚠️ Already applied
      toast.warn("You have already applied for this program.");
      setAppliedCourses(prev => new Set(prev).add(courseId));
      navigate("/student/profile");
    } else {
      console.error("Apply failed:", error);
      toast.error("Something went wrong while applying.");
    }
  }
};





  const toggleShowMore = () => setShowMore(!showMore);
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

      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-2xl w-full max-w-6xl p-6 relative shadow-xl overflow-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setShowCompareModal(false)}
              className="absolute top-4 right-4 text-xl font-bold text-gray-700"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-6">
              Select a College & Course to Compare
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {compareList.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 shadow-md text-center"
                >
                  <img
                    src="https://www.educationmalaysia.in/uploads/university/IMG_20200821_124444.jpg"
                    alt="University Logo"
                    className="mx-auto h-20 mb-3"
                  />
                  <h3 className="text-md font-semibold text-gray-800">
                    {item.university}
                  </h3>
                  <p className="text-sm text-gray-500">{item.course}</p>
                  <p className="text-yellow-500 mt-2 font-semibold flex items-center justify-center gap-1">
                    <FaStar className="text-yellow-500" /> {item.rating} Stars
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{item.duration}</p>
                  <p className="text-sm text-gray-600">{item.intakes}</p>
                  <p className="text-sm text-green-600 mt-1">
                    Fee: {item.fee || "1 lakh"}
                  </p>

                  <button
                    className="mt-3 text-sm text-red-500 hover:underline"
                    onClick={() =>
                      setCompareList(compareList.filter((_, i) => i !== index))
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}

              {/* Add more */}
              {compareList.length < 3 && (
                <div className="flex flex-col justify-center items-center border-dashed border-2 rounded-xl p-4 text-center text-gray-500">
                  <span className="text-4xl font-bold">+</span>
                  <p>Add College</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  // Proceed to compare page if needed
                  alert("Comparison logic triggered!");
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold"
              >
                🔍 Compare
              </button>
              <button
                onClick={() => setCompareList([])}
                className="border px-5 py-2 rounded-full text-sm font-semibold"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BreadcrumbBar */}
      <div className="w-full bg-blue-50 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Link
              to="/"
              className="flex items-center gap-1 hover:underline hover:text-blue-500"
            >
              <Home size={18} /> Home
            </Link>
            <span>/</span>
            <Link
              to="/courses-in-malaysia"
              className="flex items-center gap-1 hover:underline hover:text-blue-500"
            >
              <Layers size={18} />
              Courses in Malaysia
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-white p-4 gap-6 min-h-screen">
        {/* Mobile Filter Button */}
        <div className="md:hidden flex justify-end">
          <button
            className="bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md"
            onClick={() => setShowMobileFilter(true)}
          >
           Filters
          </button>
        </div>

        {/* Filter Panel */}
        {loading ? <FilterPanelSkeleton /> : (
        <div className="hidden md:block w-[280px] bg-white border border-gray-200 p-5 rounded-xl shadow-md space-y-6 text-base">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            <button
              onClick={handleReset}
              className="text-sm text-blue-600 hover:underline"
            >
              Reset All Filters
            </button>
          </div>

         {Object.entries(filters).map(([key, items]) => (
  <div key={key} className="space-y-2">
    <div>
      <div
        className="flex justify-between items-center cursor-pointer text-gray-800 font-semibold text-[16px]"
        onClick={() => toggleFilter(key)}
      >
        <span>
          {key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (s) => s.toUpperCase())}
        </span>
        <FiChevronDown
          className={`text-xl transform transition-transform duration-300 ${
            openFilters[key] ? "rotate-180" : ""
          }`}
        />
      </div>

      {openFilters[key] && (
        <div className="mt-3 pl-1 space-y-3 max-h-56 overflow-y-auto">
          {items.map((item) => {
            const value = item.slug || item.name || item.month || item.study_mode || item;
            const display = item.name || item.slug || item.month || item.study_mode || item;
            return (
              <label
                key={item.id || value}
                className="flex items-center gap-3 text-[15px] text-gray-700"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-600"
                  checked={selectedFilters[key] === value}
                  onChange={() => handleFilterChange(key, value)}
                />
                <span>{display}</span>
              </label>
            );
          })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Mobile Filter Drawer */}
        {showMobileFilter && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
            <div className="w-4/5 max-w-xs bg-white p-5 rounded-r-xl shadow-xl h-full overflow-y-auto animate-slide-in-left space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button
                  className="text-2xl font-bold text-gray-600"
                  onClick={() => setShowMobileFilter(false)}
                >
                  ×
                </button>
              </div>

              <button
                onClick={() => {
                  handleReset();
                  setShowMobileFilter(false);
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                Reset All Filters
              </button>

             {Object.entries(filters).map(([key, items]) => (
      <div key={key}>
        <div
          className="flex justify-between items-center cursor-pointer font-semibold text-gray-800 text-[16px]"
          onClick={() => toggleFilter(key)}
        >
          <span>
            {key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (s) => s.toUpperCase())}
          </span>
          <FiChevronDown
            className={`text-xl transform transition-transform duration-300 ${
              openFilters[key] ? "rotate-180" : ""
            }`}
          />
        </div>

        {openFilters[key] && (
          <div className="mt-3 pl-1 space-y-3 max-h-56 overflow-y-auto">
            {items.map((item) => {
              const value = item.slug || item.name || item.month || item.study_mode || item;
              const display = item.name || item.slug || item.month || item.study_mode || item;
              return (
                <label
                  key={item.id || value}
                  className="flex items-center gap-3 text-[15px] text-gray-700"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-600"
                    checked={selectedFilters[key] === value}
                    onChange={() => {
                      handleFilterChange(key, value);
                      setShowMobileFilter(false);
                    }}
                  />
                  <span>{display}</span>
                </label>
              );
            })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              className="flex-1"
              onClick={() => setShowMobileFilter(false)}
            ></div>
          </div>
        )}

        {/* Course List Section */}
        <div className="flex-1 space-y-6">
          {/* Top Search Box */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md">
            <p className="text-lg font-semibold text-gray-700">
              🎓 Found <span className="text-blue-700 font-bold">{totalCourses}</span>{" "}
              programs
            </p>
            <p className="text-gray-600 mt-1">
              Explore top private & public universities in Malaysia, including
              course details, intake dates, and durations.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 ">
              <input
                type="text"
                placeholder="Search Universities"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className=" flex-grow border rounded-md px-3 py-2 w-xl"
              />
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md" onClick={() => handleSearch(search)}>
                Search
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md"
                onClick={handleReset}
              >
                Reset
              </button>

              {/* Expandable Info Box */}
              <div className="bg-blue-50 border flex-grow border-blue-200 rounded-xl p-5 mb-1 max-w-6xl mx-auto shadow-sm mt-4">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {showMore ? infoText : infoText.slice(0, 180) + "..."}
                </p>
                <button
                  onClick={toggleShowMore}
                  className="mt-3 text-blue-600 text-sm font-semibold hover:underline focus:outline-none"
                >
                  {showMore ? "Show Less" : "Show More"}
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Bar */}
          {Object.values(selectedFilters).some((filter) => filter !== "") && (
            <div className="bg-transparent border border-gray-200 rounded-xl p-2  mb-2 -mt-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedFilters).map(([key, value]) => {
                    if (value) {
                      return (
                        <div
                          key={key}
                          className="flex items-center gap-2 px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm text-gray-700"
                        >
                          <span>{value}</span>
                          <button
                            onClick={() => handleFilterChange(key, value)}
                            className="text-gray-500 hover:text-gray-700 font-bold text-lg leading-none"
                          >
                            ×
                          </button>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                <button
                  onClick={handleReset}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

          {/* Course Cards */}
          {loading ? (
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => <CourseCardSkeleton key={i} />)}
            </div>
          ) : (
            coursesData.map((course, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-blue-100 transition-all duration-300 group flex flex-col md:flex-row justify-between overflow-hidden"
              >
                <div className="p-6 flex-1">
                  {/* University Info */}
                  <div className="flex gap-5">
                    {/* Logo */}
                    <div className="w-[100px] h-[100px] flex-shrink-0 border border-slate-200 rounded-xl flex items-center justify-center p-2 bg-white">
                      <img
                        src={`https://www.educationmalaysia.in/${course.university?.logo_path}`}
                        alt={`${course.university?.name} Logo`}
                        className="object-contain w-full h-full"
                      />
                    </div>

                    {/* University Info Block */}
                    <div className="flex-1">
                      <h3
                        onClick={() =>
                          handleUniversityClick(course.university?.name)
                        }
                        className="text-xl font-bold text-slate-800 cursor-pointer hover:text-blue-600"
                      >
                        {course.university?.name}
                      </h3>
                      <div className="text-sm text-slate-500 flex items-center mt-1">
                        <MapPin size={14} className="mr-1.5" />
                        <span>{`${course.university?.city}, ${course.university?.state}`}</span>
                      </div>

                      {/* University Stats */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Building size={14} className="text-slate-400" />
                          <span>
                            {course.university?.inst_type ||
                              "Private Institution"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BookOpen size={14} className="text-slate-400" />
                          <span>{course.university?.programs_count} Courses</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Globe size={14} className="text-slate-400" />
                          <span>
                            Rankings: {course.university?.rank || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="border-t border-slate-100 mt-5 pt-5">
                    <h4 className="text-blue-700 text-lg font-semibold mb-8 -mt-9">
                      {course.course_name}
                    </h4>

                    {/* Course Specs */}
                    <div className="flex flex-wrap md:flex-nowrap items-center justify-start divide-x divide-slate-300 text-sm text-slate-700 mt-4">
                      {/* Mode */}
                      <div className="flex-1 px-4">
                        <p className="text-xs text-slate-400">Mode</p>
                        <p className="font-medium">
                          {course.study_mode || "N/A"}
                        </p>
                      </div>

                      {/* Duration */}
                      <div className="flex-1 px-4">
                        <p className="text-xs text-slate-400">Duration</p>
                        <p className="font-medium">{course.duration || "N/A"}</p>
                      </div>

                      {/* Intakes */}
                      <div className="flex-1 px-4">
                        <p className="text-xs text-slate-400">Intakes</p>
                        <p className="font-medium">{course.intake || "N/A"}</p>
                      </div>

                      {/* Fee Structure */}
                      <div className="flex-1 px-4">
                        <p className="text-xs text-slate-400">Fee Structure</p>
                        <p className="font-medium">{course.fee || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="bg-slate-50/60 border-l border-slate-100 w-full md:max-w-[220px] px-6 py-6 flex flex-col items-center justify-between gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xl font-bold text-black flex items-center">
                      {course.university?.rating || "N/A"}{" "}
                      <Star className="text-yellow-400 ml-1" size={18} />
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-3 w-full">
                    
                    <button
        onClick={() => !appliedCourses.has(course.id) && handleApplyNow(course.id)}
        className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-all 
          ${appliedCourses.has(course.id) ? "bg-blue-600 text-white cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}
        `}
        disabled={appliedCourses.has(course.id)} // disable after applied
      >
        {appliedCourses.has(course.id) ? "Applied" : "Apply Now"}
      </button>

                    <button
                      onClick={() =>
                        handleUniversityClick(course.university?.name)
                      }
                      className="w-full border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-all"
                    >
                      View Detail
                    </button>
                    <button
                      className="w-full bg-slate-100 hover:bg-slate-200 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                      onClick={() => {
                        if (compareList.length < 3) {
                          setCompareList([...compareList, course]);
                          setShowCompareModal(true);
                        } else {
                          alert("You can compare up to 3 universities only");
                        }
                      }}
                    >
                      Compare
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

      <div className="flex justify-center items-center gap-3 mt-6 flex-wrap">
  {paginationLinks.map((link, idx) => {
    const isDisabled = link.url === null;
    const isActive = !!link.active;

    // Label cleanup
    const label = link.label
      .replace("&laquo;", "«")
      .replace("&raquo;", "»");

    // Icon check
    let content = label;
    if (label.includes("Previous")) {
       content = <HiChevronLeft size={20} />;
    } else if (label.includes("Next")) {
      content = <HiChevronRight size={20} />;
    }

    return (
      <button
        key={`${label}-${idx}`}
        onClick={() => {
          if (!isDisabled && link.url) {
            const url = new URL(link.url);
            const page = url.searchParams.get('page');
            if (page) {
              fetchCourses(parseInt(page, 10), selectedFilters, search);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }
        }}
        disabled={isDisabled}
        className={`w-10 h-10 rounded-full flex items-center justify-center border text-sm
          ${isActive ? "bg-blue-700 text-white" : "hover:bg-gray-100"}
          ${isDisabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""}
        `}
      >
        {content}
      </button>
    );
  })}
</div>


        </div>
      </div>
    </>
  );
};

export default Courses;
