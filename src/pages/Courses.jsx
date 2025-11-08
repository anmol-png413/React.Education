
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Home, Layers } from "lucide-react";
import api from "../api"; // Adjust the import based on your project structure
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import {Helmet } from "react-helmet";
import ApplicationModal from "../components/ApplicationModal"; // adjust path as needed // Import Helmet for SEO management

import {
  MapPin,
  Building,
  Star,
  BookOpen,
  Globe,
  Search,
  ArrowUpDown,
  List,
  LayoutGrid,
   ChevronUp,
    ChevronDown,
    Filter,
     Heart ,
       X,           
  ArrowRight,  
  Clock,       
  Calendar,    
  DollarSign,  
  Award,
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
  <div className="hidden lg:block w-[280px] min-w-[280px] flex-shrink-0 bg-white border border-gray-200 p-5 rounded-xl shadow-md space-y-6 text-base animate-pulse">
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
    const [viewMode, setViewMode] = useState('list');
    const [showApplicationModal, setShowApplicationModal] = useState(false);
const [selectedCourse, setSelectedCourse] = useState(null);

  const infoText = `or Arts, our platform offers detailed insights to guide your choices. 
From undergraduate to postgraduate levels, we provide expert advice and up-to-date information on course requirements, eligibility, and university rankings. 
Our mission is to simplify`;

  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [comparisonCourses, setComparisonCourses] = useState([]);
const [showComparisonModal, setShowComparisonModal] = useState(false);
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
  // Active filter count
const activeFilterCount = Object.values(selectedFilters).filter(val => val !== "").length;

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
  const handleApplyNow = async (courseOrId) => {
  console.log("🔥 Apply Now clicked!", courseOrId); // Debug ke liye
  
  const token = localStorage.getItem("token");

  // Check if courseOrId is an object (course) or just ID
  const courseId = typeof courseOrId === 'object' ? courseOrId.id : courseOrId;
  const courseData = typeof courseOrId === 'object' ? courseOrId : null;

  if (!token) {
    // User not logged in
    if (courseData) {
      // Show modal with course data
      setSelectedCourse(courseData);
      setShowApplicationModal(true);
    } else {
      // Redirect to sign-up
      navigate(`/sign-up?program_id=${courseId}`);
    }
    return;
  }

  // User logged in - Apply directly via API
  try {
    await api.get(`/student/apply-program/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Program applied successfully!");
    setAppliedCourses(prev => new Set(prev).add(courseId));
    navigate("/student/profile");
  } catch (error) {
    if (error.response?.status === 409) {
      toast.warn("You have already applied for this program.");
      setAppliedCourses(prev => new Set(prev).add(courseId));
      navigate("/student/profile");
    } else {
      console.error("Apply failed:", error);
      toast.error("Something went wrong while applying.");
    }
  }
};

  
const handleAddToCompare = (course) => {
  if (comparisonCourses.length >= 4) {
    toast.warn("You can compare maximum 4 courses");
    return;
  }
  if (comparisonCourses.find(c => c.id === course.id)) {
    toast.info("Course already added to comparison");
    return;
  }
  setComparisonCourses([...comparisonCourses, course]);
  toast.success("Course added to comparison");
};

const handleRemoveFromCompare = (courseId) => {
  setComparisonCourses(comparisonCourses.filter(c => c.id !== courseId));
};

const handleClearAll = () => {
  setComparisonCourses([]);
};

const handleCompare = () => {
  if (comparisonCourses.length < 2) {
    toast.warn("Please add at least 2 courses to compare");
    return;
  }
  setShowComparisonModal(true);
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
  onClick={handleCompare}
  disabled={comparisonCourses.length < 2}
  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
    comparisonCourses.length >= 2
      ? 'bg-orange-500 hover:bg-orange-600 text-white'
      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
  }`}
>
  🔍 Compare {comparisonCourses.length > 0 && `(${comparisonCourses.length})`}
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
{/* <div className="flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-white p-4 gap-6 min-h-screen"> */}

      
    {/* </div>   */}
    {/* )} */}
  {/* Mobile Filter Drawer */}
  {showMobileFilter && (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
      <div className="w-4/5 max-w-xs bg-white p-5 rounded-r-xl shadow-xl h-full overflow-y-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            className="text-2xl font-bold text-gray-600 hover:text-gray-900"
            onClick={() => setShowMobileFilter(false)}
          >
            ×
          </button>
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={() => {
              handleReset();
              setShowMobileFilter(false);
            }}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            Clear All Filters
          </button>
        )}

        {/* Mobile Filters */}
        <div className="space-y-2">
          {Object.entries(filters).map(([key, items]) => (
            <div key={key} className="border-b border-gray-100 last:border-0 pb-2">
              <button
                onClick={() => toggleFilter(key)}
                className="w-full flex items-center justify-between py-2 text-left hover:bg-gray-50 rounded-lg px-2"
              >
                <span className="font-semibold text-gray-900 capitalize flex items-center gap-2">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                  {selectedFilters[key] && (
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      1
                    </span>
                  )}
                </span>
                {openFilters[key] ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {openFilters[key] && (
                <div className="mt-2 space-y-2 pl-2 max-h-56 overflow-y-auto">
                  {items.map((item) => {
                    const value = item.slug || item.name || item.month || item.study_mode || item;
                    const display = item.name || item.slug || item.month || item.study_mode || item;
                    return (
                      <label
                        key={item.id || value}
                        className="flex items-center space-x-3 py-2.5 cursor-pointer hover:bg-blue-50 rounded-lg px-3 transition-all group"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          checked={selectedFilters[key] === value}
                          onChange={() => {
                            handleFilterChange(key, value);
                            setShowMobileFilter(false);
                          }}
                        />
                        <span className="text-gray-700 text-sm font-medium group-hover:text-blue-700">
                          {display}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1" onClick={() => setShowMobileFilter(false)}></div>
    </div>
  )}

        {/* Course List Section */}
        {/* New Modern Header */}
        <div className="bg-gradient-to-br from-blue-50 to-white p-4 min-h-screen">
      <div className="bg-gradient-to-br from-blue-50 to-white">
  <div className="max-w-[1600px] mx-auto px-4 py-6">
  
  {/* ✅ Header SABSE UPAR - FILTER SE PEHLE */}
  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-4">
    <div className="flex flex-col gap-3">
      {/* Top Row - Title & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Find Your Perfect Course</h1>
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-blue-600">{totalCourses}</span> courses available in Malaysia
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 lg:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses, universities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(search);
                }
              }}
              className="w-full pl-12 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors font-medium"
            />
          </div>
        </div>
      </div>

      {/* Sort & View Mode Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-3 border-t border-gray-200">
        {/* Left: Sort By Dropdown */}
        <div className="flex items-center gap-3">
          <ArrowUpDown className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">Sort by:</span>
          <select
            className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors font-medium text-sm bg-white cursor-pointer hover:border-gray-300"
          >
            <option value="relevance">Most Relevant</option>
            <option value="rating">Highest Rated</option>
            <option value="fee-low">Fee: Low to High</option>
            <option value="fee-high">Fee: High to Low</option>
            <option value="duration">Duration</option>
          </select>
        </div>

        {/* Right: List/Grid Toggle - ✅ FUNCTIONAL */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === 'list'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="List View"
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === 'grid'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 flex-wrap">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md font-semibold transition-all"
          onClick={() => handleSearch(search)}
        >
          Search
        </button>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg shadow-md font-semibold transition-all"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {/* Expandable Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-2 shadow-sm">
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

  {/* ✅ FILTER & COURSES - NEECHE */}
  {/* <div className="flex flex-col md:flex-row gap-6"> */}
  <div className="flex flex-col lg:flex-row gap-6 items-start">
    {/* Mobile Filter Button */}
    {/* <div className="md:hidden flex justify-end"> */}
    {/* Mobile Filter Button */}
<div className="lg:hidden flex justify-end mb-4">
      <button
        className="bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md"
        onClick={() => setShowMobileFilter(true)}
      >
        Filters
      </button>
    </div>

    {/* Filter Panel */}
    <>
    {loading ? <FilterPanelSkeleton /> : (
      // <div className="hidden lg:block w-[280px] min-w-[280px] flex-shrink-0 bg-white border border-gray-200 p-5 rounded-xl shadow-md space-y-6 text-base">
      <div className="hidden lg:block w-[280px] min-w-[280px] flex-shrink-0 bg-white border border-gray-200 p-5 rounded-xl shadow-md space-y-6 text-base sticky top-4 self-start max-h-[calc(100vh-2rem)] overflow-y-auto">
     <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <Filter className="w-5 h-5 text-blue-600" />
        Filters
        
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {activeFilterCount}
          </span>
    
      </h2>
      {activeFilterCount > 0 && (
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline"
        >
          Clear All
        </button>
      )}
    </div>

    {/* Filter Options */}
    <div className="space-y-2">
      {Object.entries(filters).map(([key, items]) => (
        <div key={key} className="border-b border-gray-100 last:border-0 pb-2 last:pb-0">
          <button
            onClick={() => toggleFilter(key)}
            className="w-full flex items-center justify-between py-2 text-left hover:bg-gray-50 rounded-lg px-2 transition-colors"
          >
            <span className="font-semibold text-gray-900 capitalize flex items-center gap-2">
              {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
              {selectedFilters[key] && (
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  1
                </span>
              )}
            </span>
            {openFilters[key] ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {openFilters[key] && (
            <div className="mt-2 space-y-2 pl-2 max-h-56 overflow-y-auto">
              {items.map((item) => {
                const value = item.slug || item.name || item.month || item.study_mode || item;
                const display = item.name || item.slug || item.month || item.study_mode || item;
                return (
                  <label
                    key={item.id || value}
                    className="flex items-center gap-3 py-2 cursor-pointer hover:bg-blue-50 rounded-lg px-3 transition-all duration-200 group"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      checked={selectedFilters[key] === value}
                      onChange={() => handleFilterChange(key, value)}
                    />
                    <span className="text-gray-700 text-sm font-medium group-hover:text-blue-700 transition-colors">
                      {display}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
      </div>
    )}
     </>

    {/* Course List */}
{/* <div className="flex-1 min-w-0 space-y-6"> */}
<div className="flex-1 min-w-0 max-w-full space-y-6">
      {/* Active Filters Bar */}
      {Object.values(selectedFilters).some((filter) => filter !== "") && (
        <div className="bg-transparent border border-gray-200 rounded-xl p-2 mb-2 shadow-sm">
          {/* ... active filters code ... */}
        </div>
      )}

      {/* Course Cards */}
      {/* Course Cards with Grid/List Toggle */}
{loading ? (
  <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
    {[...Array(5)].map((_, i) => <CourseCardSkeleton key={i} />)}
  </div>
) : (
  <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
    {coursesData.map((course, i) => (
      <div 
        key={i} 
        className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-300 group relative ${
          viewMode === 'grid' ? 'flex flex-col h-full' : 'mb-6 w-full'
        }`}
      >
        <div className="p-5">
          {/* University Header */}
          <div className={`flex ${viewMode === 'grid' ? 'flex-col' : 'items-start justify-between'} gap-3 mb-4`}>
            <div className={`flex gap-4 ${viewMode === 'grid' ? 'w-full' : 'flex-1'}`}>
              {/* Logo */}
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200 shadow-sm overflow-hidden">
                <img 
                  src={`https://www.educationmalaysia.in/${course.university?.logo_path}`}
                  alt={course.university?.name} 
                  className="w-full h-full object-contain p-2" 
                />
              </div>

              {/* University Info */}
              <div className="flex-1 min-w-0">
              <h3 
  onClick={() => handleUniversityClick(course.university?.name)}
  className="text-lg font-bold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer transition-colors line-clamp-1"
>
  {course.university?.name}
</h3>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="line-clamp-1">{`${course.university?.city}, ${course.university?.state}`}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-1" />
                    <span>{course.university?.inst_type || "Private"}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>{course.university?.programs_count} Courses</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-1" />
                    <span>Rankings: {course.university?.rank || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating & Heart */}
            <div className={`flex items-center gap-3 flex-shrink-0 ${viewMode === 'grid' ? 'w-full justify-between mt-2' : ''}`}>
              <div className="flex items-center gap-1 bg-gradient-to-br from-amber-50 to-yellow-50 px-3 py-2 rounded-lg border border-amber-200 shadow-sm">
                <span className="text-lg font-bold text-gray-900">{course.university?.rating || "N/A"}</span>
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
              <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-red-300">
                <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
              </button>
            </div>
          </div>

          {/* Course Details Section */}
          <div className="border-t border-gray-200 pt-3 mb-3">
            {/* Course Title */}
            <h4 className="text-base font-bold text-blue-600 mb-3 hover:text-blue-700 cursor-pointer transition-colors line-clamp-2">
              {course.course_name}
            </h4>

            

            {/* Course Specs Grid */}
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2' : 'grid-cols-4'} gap-2 mb-3`}>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex flex-col justify-center">
                <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Mode</p>
                <p className="text-sm font-bold text-gray-900 line-clamp-1">{course.study_mode || "N/A"}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex flex-col justify-center">
                <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Duration</p>
                <p className="text-sm font-bold text-gray-900 line-clamp-1">{course.duration || "N/A"}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex flex-col justify-center">
                <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Intakes</p>
                <p className="text-sm font-bold text-gray-900 line-clamp-1">{course.intake || "N/A"}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex flex-col justify-center">
                <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Fee</p>
                <p className="text-sm font-bold text-gray-900 line-clamp-1">{course.fee || "N/A"}</p>
              </div>
            </div>
          </div>
          {/* Accreditation Badges - ALWAYS SHOW */}
<div className="flex flex-wrap gap-2 mb-3">
  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-300">
    Malaysian Medical Council
  </span>
  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-300">
    MQA
  </span>
</div>
          

          {/* Action Buttons */}
          <div className={`flex ${viewMode === 'grid' ? 'flex-col' : 'items-center'} gap-3`}>
            <button
              onClick={() => !appliedCourses.has(course.id) && handleApplyNow(course)}
              className={`${viewMode === 'grid' ? 'w-full' : 'flex-1'} font-bold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm ${
                appliedCourses.has(course.id) 
                  ? "bg-gray-400 text-white cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
              }`}
              disabled={appliedCourses.has(course.id)}
            >
              {appliedCourses.has(course.id) ? "Applied" : "Apply Now"}
            </button>
            <button
              onClick={() => handleUniversityClick(course.university?.name)}
              className={`${viewMode === 'grid' ? 'w-full' : 'flex-1'} bg-white text-gray-800 font-bold py-2.5 px-4 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md text-sm`}
            >
              View Details
            </button>
            <button
              onClick={() => handleAddToCompare(course)}
              className={`${viewMode === 'grid' ? 'w-full' : ''} font-bold py-2.5 px-4 rounded-lg border-2 transition-all duration-200 shadow-sm hover:shadow-md bg-white text-blue-600 border-blue-300 hover:border-blue-400 hover:bg-blue-50 text-sm`}
            >
              Compare
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}
   
      {/* ⬇️ YAHA ADD KARO ⬇️ */}
      {/* Comparison Bottom Panel */}
      {comparisonCourses.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4 flex-1 overflow-x-auto">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-bold text-gray-900">Compare Courses</span>
                  <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {comparisonCourses.length}
                  </span>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2">
                  {comparisonCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center gap-2 bg-blue-50 border-2 border-blue-200 rounded-xl px-4 py-2 flex-shrink-0"
                    >
                      <div className="text-sm">
                        <p className="font-semibold text-gray-900 truncate max-w-[200px]">
                          {course.course_name}
                        </p>
                        <p className="text-xs text-gray-600">{course.university?.name}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCompare(course.id)}
                        className="text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={handleCompare}
                  disabled={comparisonCourses.length < 2}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md ${
                    comparisonCourses.length >= 2
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Compare Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>   
      )}

      {/* Pagination */}
      {/* <div className="flex justify-center items-center gap-3 mt-6 flex-wrap max-w-full">
        
      </div> */}
      {/* Pagination */}
<div className="flex justify-center items-center gap-3 mt-6 flex-wrap max-w-full">
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
              setCurrentPage(parseInt(page, 10));
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
  </div> 
</div> 
</div>

      {showComparisonModal && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto my-auto relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
        <h2 className="text-xl font-bold">Course Comparison</h2>
        <button
          onClick={() => setShowComparisonModal(false)}
          className="text-white hover:text-gray-200 transition-colors bg-white bg-opacity-20 rounded-lg p-2 flex-shrink-0"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Table Container */}
      <div className="p-4 overflow-x-auto">
        <table className="w-full border-collapse min-w-[700px]">
          <thead className="sticky top-14 bg-white z-10 shadow-sm">
            <tr className="bg-gray-100 border-b-2 border-gray-300">
              <th className="text-left p-3 font-bold text-gray-900 w-36 min-w-[144px] text-sm bg-gray-100">
                Feature
              </th>
              {comparisonCourses.map((course) => (
                <th key={course.id} className="p-3 text-left min-w-[260px]">
                  <h3 className="font-bold text-gray-900 mb-1 text-sm leading-tight line-clamp-2">
                    {course.course_name}
                  </h3>
                  <p className="text-xs font-normal text-gray-600 line-clamp-1">
                    {course.university?.name}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Rating Row */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3 font-semibold text-gray-700 bg-gray-50 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Rating</span>
                </div>
              </td>
              {comparisonCourses.map((course) => (
                <td key={course.id} className="p-3">
                  <div className="flex items-center gap-1">
                    <span className="text-base font-bold text-gray-900">
                      {course.university?.rating || "N/A"}
                    </span>
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </div>
                </td>
              ))}
            </tr>

            {/* Duration Row */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3 font-semibold text-gray-700 bg-gray-50 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Duration</span>
                </div>
              </td>
              {comparisonCourses.map((course) => (
                <td key={course.id} className="p-3 font-medium text-gray-900 text-sm">
                  {course.duration || "N/A"}
                </td>
              ))}
            </tr>

            {/* Fee Row */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3 font-semibold text-gray-700 bg-gray-50 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Fee</span>
                </div>
              </td>
              {comparisonCourses.map((course) => (
                <td key={course.id} className="p-3 font-medium text-gray-900 text-sm">
                  {course.fee || "N/A"}
                </td>
              ))}
            </tr>

            {/* Intake Row */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3 font-semibold text-gray-700 bg-gray-50 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Intake</span>
                </div>
              </td>
              {comparisonCourses.map((course) => (
                <td key={course.id} className="p-3 font-medium text-gray-900 text-sm">
                  {course.intake || "N/A"}
                </td>
              ))}
            </tr>

            {/* Study Mode Row */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3 font-semibold text-gray-700 bg-gray-50 text-sm">
                Study Mode
              </td>
              {comparisonCourses.map((course) => (
                <td key={course.id} className="p-3 font-medium text-gray-900 text-sm">
                  {course.study_mode || "N/A"}
                </td>
              ))}
            </tr>

            {/* Location Row */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3 font-semibold text-gray-700 bg-gray-50 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>Location</span>
                </div>
              </td>
              {comparisonCourses.map((course) => (
                <td key={course.id} className="p-3 text-gray-700 text-sm">
                  {`${course.university?.city}, ${course.university?.state}`}
                </td>
              ))}
            </tr>

            {/* University Type Row */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3 font-semibold text-gray-700 bg-gray-50 text-sm">
                University Type
              </td>
              {comparisonCourses.map((course) => (
                <td key={course.id} className="p-3 text-gray-700 text-sm">
                  {course.university?.inst_type || "N/A"}
                </td>
              ))}
            </tr>

            {/* Ranking Row */}
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3 font-semibold text-gray-700 bg-gray-50 text-sm">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>Ranking</span>
                </div>
              </td>
              {comparisonCourses.map((course) => (
                <td key={course.id} className="p-3 text-gray-700 text-sm">
                  {course.university?.rank || "N/A"}
                </td>
              ))}
            </tr>

            {/* Actions Row */}
            <tr className="bg-gray-50">
              <td className="p-3 font-semibold text-gray-700 text-sm">
                Actions
              </td>
              {comparisonCourses.map((course) => (
                <td key={course.id} className="p-3">
                  <button 
                    onClick={() => handleApplyNow(course)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg text-sm"
                  >
                    Apply Now
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
        <button
          onClick={() => setShowComparisonModal(false)}
          className="w-full px-5 py-2.5 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          Close Comparison
        </button>
      </div>
    </div>
  </div>
)}
{/* Application Modal */}
{showApplicationModal && selectedCourse && (
  <ApplicationModal
    course={{
      title: selectedCourse.course_name,
      university: {
        name: selectedCourse.university?.name || "University"
      }
    }}
    onClose={() => {
      setShowApplicationModal(false);
      setSelectedCourse(null);
    }}
  />
)}

</>   

  );
};

export default Courses;