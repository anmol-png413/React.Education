

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import { Clock, MapPin, DollarSign, Users, Eye, Book } from "lucide-react";
import { Helmet } from "react-helmet";
import api from "../../api";
import { FeeStructureForm, BrochureForm, CompareUniversitiesForm } from "../../pages/universitysection/universitypopform";
import { API_URL } from "../../config";

/* ---------------------------
  Enhanced Modal Component
-
/* ---------------------------
  Dropdown Component
----------------------------*/
const useOutsideAlerter = (ref, callback) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};

const Dropdown = ({ title, options, selectedValue, onSelect, showAllOption = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useOutsideAlerter(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-auto flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        {selectedValue || title}
        <FiChevronDown className={`-mr-1 ml-2 h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1 max-h-60 overflow-y-auto">
            {/* ✅ ALL UNIVERSITY OPTION */}
            {showAllOption && (
              <button
                onClick={() => {
                  onSelect("");
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 font-semibold"
              >
                All Universities
              </button>
            )}
            
            {options.map((opt) => (
              <button
                key={opt.id || opt.name}
                onClick={() => {
                  onSelect(opt.name);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------------------
  Main Component
----------------------------*/
const UniversitiesList = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [universities, setUniversities] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({ instituteType: "", state: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, per_page: 20, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [totalUniversities, setTotalUniversities] = useState(0);
  const [seo, setSeo] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [dynamicFilters, setDynamicFilters] = useState({ institute_types: [], states: [] });
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});

  // Modal states
  const [feeModalOpen, setFeeModalOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setSuccessModalOpen(true);
    setTimeout(() => setSuccessModalOpen(false), 2200);
  };

  // Format URL helper
  const formatUrl = (instituteTypeName, stateName) => {
    const instituteType = dynamicFilters.institute_types.find((it) => it.name === instituteTypeName);
    const state = dynamicFilters.states.find((s) => s.name === stateName);
    const typeSlug = instituteType?.slug || "";
    const stateSlug = state?.slug || "";
    if (typeSlug && stateSlug) return `/universities/${typeSlug}-in-${stateSlug}`;
    if (typeSlug) return `/universities/${typeSlug}-in-malaysia`;
    if (stateSlug) return `/universities/universities-in-${stateSlug}`;
    return "/universities/universities-in-malaysia";
  };

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...selectedFilters, [key]: selectedFilters[key] === value ? "" : value };
    if (key === "instituteType") updatedFilters.state = "";
    navigate(formatUrl(updatedFilters.instituteType, updatedFilters.state));
  };

  const handleReset = () => {
    setSearch("");
    setSelectedFilters({ instituteType: "", state: "" });
    navigate("/universities/universities-in-malaysia");
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchInitialFilters = async () => {
      try {
        const response = await api.get(`/universities/universities-in-malaysia`, { signal: controller.signal });
        const { data } = response.data;
        setDynamicFilters(data.filters || { institute_types: [], states: [] });
        setFiltersLoaded(true);
      } catch (error) {
        if (error.name !== "AbortError") console.error("Error fetching initial filters:", error);
      }
    };
    fetchInitialFilters();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (filtersLoaded) {
      const newFilters = { instituteType: "", state: "" };
      if (type) {
        const parts = type.split("-in-");
        const typeSlug = parts[0];
        const stateSlug = parts.length > 1 ? parts[1] : null;
        if (stateSlug && stateSlug !== "malaysia") {
          const state = dynamicFilters.states.find((s) => s.slug === stateSlug);
          if (state) newFilters.state = state.name;
        }
        if (typeSlug !== "universities") {
          const instituteType = dynamicFilters.institute_types.find((it) => it.slug === typeSlug);
          if (instituteType) newFilters.instituteType = instituteType.name;
        }
      }
      if (newFilters.instituteType !== selectedFilters.instituteType || newFilters.state !== selectedFilters.state) {
        setSelectedFilters(newFilters);
      }
    }
  }, [type, filtersLoaded, dynamicFilters]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    if (searchQuery) setSearch(decodeURIComponent(searchQuery));
  }, [location.search]);

  useEffect(() => {
    if (!filtersLoaded) return;
    const controller = new AbortController();

    const loadUniversityData = async (page = 1) => {
      setIsLoading(true);
      try {
        let endpoint = `/universities/universities-in-malaysia`;
        const params = new URLSearchParams();

        if (selectedFilters.instituteType) {
          const instituteType = dynamicFilters.institute_types.find((it) => it.name === selectedFilters.instituteType);
          if (instituteType) params.append("institute_type", instituteType.id);
        }
        if (selectedFilters.state) {
          const state = dynamicFilters.states.find((s) => s.name === selectedFilters.state);
          if (state) params.append("state", state.name.toLowerCase());
        }
        // if (search) params.append("search", search);
        // // params.append("page", page);
        // params.append("per_page", 21);  
        // endpoint = `${endpoint}?${params.toString()}`;
        if (search) params.append("search", search);
params.append("per_page", 21);  // YE ADD KARO
params.append("page", page);
endpoint = `${endpoint}?${params.toString()}`;

        const response = await api.get(endpoint, { signal: controller.signal });
        const { data } = response.data;
        setTotalUniversities(data.universities?.total || 0);

        const newDynamicFilters = data.filters || { institute_types: [], states: [] };
        if (JSON.stringify(newDynamicFilters) !== JSON.stringify(dynamicFilters)) {
          setDynamicFilters(newDynamicFilters);
        }

        // setSeo(data.seo || {});
        // setTitle(data.seo?.meta_title || "Universities in Malaysia");
        setSeo(data.seo || {});

// ✅ Custom title logic
let pageTitle = "All Universities in Malaysia 2024-25";
if (selectedFilters.instituteType && selectedFilters.state) {
  pageTitle = `Top ${data.universities?.total || ''} ${selectedFilters.instituteType} Universities in ${selectedFilters.state} 2024-25`;
} else if (selectedFilters.instituteType) {
  pageTitle = `Top ${data.universities?.total || ''} ${selectedFilters.instituteType} Universities in Malaysia 2024-25`;
} else if (selectedFilters.state) {
  pageTitle = `Top ${data.universities?.total || ''} Universities in ${selectedFilters.state} 2024-25`;
}

setTitle(pageTitle);
        setUniversities(data.universities?.data || []);
        // setPagination({
        //   current_page: data.universities?.current_page || 1,
        //   last_page: data.universities?.last_page || 1,
        //   per_page: data.universities?.per_page || 21,
        //   total: data.universities?.total || 0,
        // });
        // ✅ FORCE 21 PER PAGE
        setPagination({
  current_page: data.universities?.current_page || 1,
  last_page: Math.ceil((data.universities?.total || 0) / 21),  // ✅ FORCE 21
  per_page: 21,  // ✅ HARDCODE 21
  total: data.universities?.total || 0,
});
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching universities:", error);
          setUniversities([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUniversityData(currentPage);
    return () => controller.abort();
  }, [selectedFilters, currentPage, search, filtersLoaded]);

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    const params = new URLSearchParams(location.search);
    if (newSearch) params.set("search", newSearch);
    else params.delete("search");
    params.delete("page");
    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleShowMore = () => setShowMore(!showMore);
  const toggleCardDescription = (uniId) => {
  setExpandedCards(prev => ({
    ...prev,
    [uniId]: !prev[uniId]
  }));
};

  // Modal open handlers
  const openFeeModal = (uni) => {
    setSelectedUniversity(uni);
    setFeeModalOpen(true);
  };
  const openBrochureModal = (uni) => {
    setSelectedUniversity(uni);
    setBrochureModalOpen(true);
  };
  //  const openCompareModal = (uni) => {
  //   setSelectedUniversity(uni);
  //   setCompareModalOpen(true);
  // };
 

  // const infoText = `Malaysia is home to a diverse range of universities, offering a variety of programs and courses to cater to the educational needs of both local and international students.`;
  const getInfoText = () => {
  if (selectedFilters.instituteType && selectedFilters.state) {
    return `Discover top-ranked ${selectedFilters.instituteType.toLowerCase()} universities in ${selectedFilters.state}, offering exceptional programs and world-class facilities.`;
  } else if (selectedFilters.instituteType) {
    return `Explore the best ${selectedFilters.instituteType.toLowerCase()} universities in Malaysia, known for their academic excellence and diverse course offerings.`;
  } else if (selectedFilters.state) {
    return `Find leading universities in ${selectedFilters.state}, providing quality education and a vibrant campus life.`;
  }
  return `Malaysia is home to a diverse range of universities, offering a variety of programs and courses to cater to the educational needs of both local and international students.`;
};

const infoText = getInfoText();

  return (
    <>
      <Helmet>
        <title>{seo?.meta_title || "Universities in Malaysia"}</title>
        <meta name="description" content={seo?.meta_description || ""} />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span>Universities</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h1>
          <p className="mt-2 text-lg text-gray-600">
            Found <span className="font-bold text-blue-600">{totalUniversities}</span> universities matching your criteria.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4 max-w-6xl mx-auto shadow-sm mt-4">
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {showMore ? infoText : infoText.slice(0, 140) + (infoText.length > 140 ? "..." : "")}
            </p>
            <button onClick={toggleShowMore} className="mt-3 text-blue-600 text-sm font-semibold hover:underline">
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="relative flex-grow">
            <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search university by name..."
              value={search}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
         <Dropdown
  title="Institute Type"
  options={dynamicFilters.institute_types}
  selectedValue={selectedFilters.instituteType}
  onSelect={(value) => handleFilterChange("instituteType", value)}
  showAllOption={true}  
/>
            <Dropdown
              title="State"
              options={dynamicFilters.states}
              selectedValue={selectedFilters.state}
              onSelect={(value) => handleFilterChange("state", value)}
            />
            <button onClick={handleReset} className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium">
              Reset
            </button>
          </div>
        </div>

        {/* Universities Grid */}
        <main>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="w-full h-40 bg-gray-200" />
                  <div className="p-5">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {universities.map((uni) => (
                <div
                  key={uni.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 relative"
                >
                  {/* Image Section - UPDATED */}
<div className="relative w-full h-48 overflow-hidden bg-gray-100">
  <img
    src={uni.banner_path ? `${API_URL}${uni.banner_path}` : "/placeholder.png"}
    alt={uni.name}
    className="w-full h-full object-cover"
  />
  
  {/* Rating Badge */}
  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
    <FaStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
  <span className="text-sm font-bold text-gray-800">
  {uni.rating ? parseFloat(uni.rating).toFixed(1) : '0.0'}
</span>
  </div>
</div>

                  {/* Content Section */}
                  <div className="p-5">
                    {/* Location & Established */}
                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{uni.city || "Kuala Lumpur"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                      <span>Est. {uni.established_year || "N/A"}</span>
                      </div>
                    </div>

                 

                    <Link
  to={`/university/${uni.uname || uni.slug}`}
  className="font-bold text-gray-800 text-xl group-hover:text-blue-600 mb-3 line-clamp-2 min-h-[3.5rem]"
>
  {uni.name}
</Link>



{/* 
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                      {uni.description || ""}
                    </p> */}
{/* ✅ NEW TRUNCATED DESCRIPTION - Line ~455 */}
<div className="mb-4">
  <p className={`text-gray-600 text-sm leading-relaxed transition-all duration-300 ${
    expandedCards[uni.id] ? '' : 'line-clamp-2'
  }`}>
    {uni.shortnote || "No description available"}
  </p>
  
  {/* Show More/Less button - only show if text is long */}
  {uni.shortnote && uni.shortnote.length > 100 && (
    <button
      onClick={() => toggleCardDescription(uni.id)}
      className="text-blue-600 text-xs font-semibold hover:underline mt-1.5 flex items-center gap-1"
    >
      {expandedCards[uni.id] ? (
        <>Show Less <FiChevronDown className="rotate-180 transition-transform" /></>
      ) : (
        <>Show More <FiChevronDown className="transition-transform" /></>
      )}
    </button>
  )}
</div>             

                  {/* Stats Grid */}
<div className="grid grid-cols-3 gap-4 mb-5">
  <div className="text-center p-3 bg-blue-50 rounded-xl">
    <Book className="w-5 h-5 text-blue-600 mx-auto mb-1" />
    <p className="text-lg font-bold text-blue-600">{uni.active_programs_count || 0}</p>
    <p className="text-xs text-gray-600">Programs</p>
  </div>
  <div className="text-center p-3 bg-green-50 rounded-xl">
    <Eye className="w-5 h-5 text-green-600 mx-auto mb-1" />
    <p className="text-lg font-bold text-green-600">{uni.views || 0}</p>
    <p className="text-xs text-gray-600">Views</p>
  </div>
  <div className="text-center p-3 bg-yellow-50 rounded-xl">
    <FaStar className="w-5 h-5 text-yellow-600 mx-auto mb-1 fill-current" />
    <p className="text-lg font-bold text-yellow-600">
      {uni.rating ? parseFloat(uni.rating).toFixed(1) : '0.0'}
    </p>
    <p className="text-xs text-gray-600">Rating</p>
  </div>
</div>
<div className="space-y-3">
                   
      <Link
    to={`/university/${uni.uname || uni.slug}`}
    className="cursor-pointer w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center group"
  >
    View Details →
  </Link>

                      <div className="grid grid-cols-2 gap-2">
                       <button
      onClick={() => openFeeModal(uni)}
      className="cursor-pointer py-2 px-3 border-2 border-blue-200 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-all duration-200 text-sm"
    >
      Fee Structure
    </button>

                       <button
      onClick={() => openBrochureModal(uni)}
      className="cursor-pointer py-2 px-3 border-2 border-green-200 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-all duration-200 text-sm"
    >
      Brochure
    </button>

                      
                      </div>
                    </div>

                    {/* Compare Universities Link */}
      <button
  onClick={() => setCompareModalOpen(true)}
  className="cursor-pointer w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 text-sm mt-3"
>
  Compare Universities
</button>
<div>
  </div>

                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.last_page > 1 && (
            <div className="mt-10 flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {pagination.last_page}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.last_page}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
         
      {/* Fee Structure Modal */}
      <FeeStructureForm
        universityName={selectedUniversity?.name}
        isOpen={feeModalOpen}
        onClose={() => setFeeModalOpen(false)}
        onSuccess={showSuccess}
      />

      {/* Brochure Modal */}
      <BrochureForm
        universityName={selectedUniversity?.name}
        isOpen={brochureModalOpen}
        onClose={() => setBrochureModalOpen(false)}
        onSuccess={showSuccess}
      />

      {/* Compare Universities Modal */}
      <CompareUniversitiesForm
        universities={universities}
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        onSuccess={showSuccess}
      />

      {/* Success Modal */}
      {successModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl p-6 text-center max-w-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{successMessage}</h3>
            <p className="text-gray-600">We'll get back to you soon.</p>
          </div>
        </div>
      )}

      
      
    </>
  );
};

export default UniversitiesList;