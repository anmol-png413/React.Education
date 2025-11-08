

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import { Clock, MapPin, DollarSign, Users, Eye, Book } from "lucide-react";
import { Helmet } from "react-helmet";
import api from "../../api";
import { API_URL } from "../../config";

/* ---------------------------
  Enhanced Modal Component
----------------------------*/
const Modal = ({ open, title, onClose, children, wide = false }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-auto ${wide ? "w-full max-w-3xl" : "w-full max-w-md"}`}>
        <div className="flex items-center justify-between border-b px-6 py-4 bg-gray-50">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button className="text-gray-400 hover:text-gray-600 text-2xl" onClick={onClose}>×</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

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

const Dropdown = ({ title, options, selectedValue, onSelect }) => {
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

  // Modal states
  const [feeModalOpen, setFeeModalOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

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
        if (search) params.append("search", search);
        params.append("page", page);
        endpoint = `${endpoint}?${params.toString()}`;

        const response = await api.get(endpoint, { signal: controller.signal });
        const { data } = response.data;
        setTotalUniversities(data.universities?.total || 0);

        const newDynamicFilters = data.filters || { institute_types: [], states: [] };
        if (JSON.stringify(newDynamicFilters) !== JSON.stringify(dynamicFilters)) {
          setDynamicFilters(newDynamicFilters);
        }

        setSeo(data.seo || {});
        setTitle(data.seo?.meta_title || "Universities in Malaysia");
        setUniversities(data.universities?.data || []);
        setPagination({
          current_page: data.universities?.current_page || 1,
          last_page: data.universities?.last_page || 1,
          per_page: data.universities?.per_page || 20,
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

  // Modal open handlers
  const openFeeModal = (uni) => {
    setSelectedUniversity(uni);
    setFeeModalOpen(true);
  };
  const openBrochureModal = (uni) => {
    setSelectedUniversity(uni);
    setBrochureModalOpen(true);
  };
  const openCompareModal = (uni) => {
    setSelectedUniversity(uni);
    setCompareModalOpen(true);
  };

  const infoText = `Malaysia is home to a diverse range of universities, offering a variety of programs and courses to cater to the educational needs of both local and international students.`;

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
                  {/* Image Section */}
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6 h-48">
                    <img
                      src={uni.logo_path ? `${API_URL}${uni.logo_path}` : "/placeholder.png"}
                      alt={uni.name}
                      className="max-h-32 w-auto object-contain"
                    />
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
                      <FaStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-bold text-gray-800">{uni.rating ?? "4.8"}</span>
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
                        <span>Est. {uni.established || "1970"}</span>
                      </div>
                    </div>

                    {/* University Name */}
                    <Link
                      to={`/university/${uni.uname}`}
                      className="font-bold text-gray-800 text-xl group-hover:text-blue-600 mb-3 line-clamp-2 min-h-[3.5rem]"
                    >
                      {uni.name}
                    </Link>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                      {uni.description || "Explore comprehensive programs and world-class education"}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <Book className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-blue-600">{uni.programs ?? 105}</p>
                        <p className="text-xs text-gray-600">Programs</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <Eye className="w-5 h-5 text-green-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-green-600">{uni.views ?? 416}</p>
                        <p className="text-xs text-gray-600">Views</p>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-xl">
                        <FaStar className="w-5 h-5 text-yellow-600 mx-auto mb-1 fill-current" />
                        <p className="text-lg font-bold text-yellow-600">{uni.rating ?? 4.8}</p>
                        <p className="text-xs text-gray-600">Rating</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 mt-auto">
                      <Link
                        to={`/university/${uni.uname}`}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center group"
                      >
                        View Details →
                           {/* <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" /> */}
                      </Link>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => openFeeModal(uni)}
                          className="py-2 px-3 border-2 border-blue-200 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-all duration-200 text-sm"
                        >
                          Fee Structure
                        </button>

                        <button
                          onClick={() => openBrochureModal(uni)}
                          className="py-2 px-3 border-2 border-green-200 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-all duration-200 text-sm"
                        >
                          Brochure
                        </button>

                        {/* <button
                          onClick={() => openCompareModal(uni)}
                          className="border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition text-xs"
                        >
                          Compare
                        </button> */}
                      </div>
                    </div>

                    {/* Compare Universities Link */}
                    <button
                      onClick={() => openCompareModal(uni)}
                      className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 text-sm"
                    >
                      Compare Universities
                    </button>
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
      <Modal
        open={feeModalOpen}
        title="Fee Structure Request"
        onClose={() => setFeeModalOpen(false)}
      >
        <div className="text-center mb-4">
          <p className="text-gray-700">Get detailed fee information for {selectedUniversity?.name}</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(`Fee request submitted for ${selectedUniversity?.name}`);
            setFeeModalOpen(false);
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input required className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your first name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input required className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your last name" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
            <select required className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Select your nationality</option>
              <option value="indian">Indian</option>
              <option value="malaysian">Malaysian</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input required type="email" className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your email" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="flex gap-2">
              <select className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="+91">+91</option>
                <option value="+60">+60</option>
                <option value="+1">+1</option>
              </select>
              <input required type="tel" className="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your phone number" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interested Course</label>
            <select required className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Select a course</option>
              <option value="engineering">Engineering</option>
              <option value="business">Business</option>
              <option value="medicine">Medicine</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Study Level</label>
            <select required className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Select study level</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
              <option value="phd">PhD</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setFeeModalOpen(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 font-medium hover:bg-gray-50">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Request Fee Structure</button>
          </div>
        </form>
      </Modal>

      {/* Download Brochure Modal */}
      <Modal
        open={brochureModalOpen}
        title="Download Brochure"
        onClose={() => setBrochureModalOpen(false)}
      >
        <div className="text-center mb-4">
          <p className="text-gray-700">Get the brochure for {selectedUniversity?.name}</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(`Brochure request submitted for ${selectedUniversity?.name}`);
            setBrochureModalOpen(false);
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input required className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Enter your first name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input required className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Enter your last name" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input required type="email" className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Enter your email" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="flex gap-2">
              <select className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none">
                <option value="+91">+91</option>
                <option value="+60">+60</option>
              </select>
              <input required type="tel" className="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Enter your phone number" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
            <select required className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none">
              <option value="">Select your nationality</option>
              <option value="indian">Indian</option>
              <option value="malaysian">Malaysian</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setBrochureModalOpen(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 font-medium hover:bg-gray-50">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700">Download Brochure</button>
          </div>
        </form>
      </Modal>

      {/* Compare Universities Modal */}
      <Modal
        open={compareModalOpen}
        title="Compare Universities"
        onClose={() => setCompareModalOpen(false)}
        wide={true}
      >
        <div className="text-center mb-6">
          <p className="text-gray-700">Select up to 3 universities to compare their features</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(`Comparison request submitted for ${selectedUniversity?.name}`);
            setCompareModalOpen(false);
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select First University</label>
              <select required className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none">
                <option value="">Choose University</option>
                {universities.slice(0, 10).map((u) => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Second University</label>
              <select required className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none">
                <option value="">Choose University</option>
                {universities.slice(0, 10).map((u) => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Third University (Optional)</label>
            <select className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none">
              <option value="">Choose University</option>
              {universities.slice(0, 10).map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
            <input required type="email" className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="Enter your email" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
            <select required className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none">
              <option value="">Select your nationality</option>
              <option value="indian">Indian</option>
              <option value="malaysian">Malaysian</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="flex gap-2">
              <select className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none">
                <option value="+91">+91</option>
                <option value="+60">+60</option>
                <option value="+1">+1</option>
              </select>
              <input required type="tel" className="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="Enter your phone number" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comparison Criteria (Optional)</label>
            <textarea className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" rows={3} placeholder="What specific aspects would you like to compare? (e.g., fees, programs, facilities)"></textarea>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setCompareModalOpen(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 font-medium hover:bg-gray-50">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2.5 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700">Generate Comparison</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UniversitiesList;
