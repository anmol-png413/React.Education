import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import api from "../../api";
import { Helmet } from "react-helmet";
import { API_URL } from "../../config";
import { Clock, MapPin, DollarSign, Users } from "lucide-react";
import { FaStar } from "react-icons/fa6";

const useOutsideAlerter = (ref, callback) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

const Dropdown = ({ title, options, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideAlerter(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-auto flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {selectedValue || title}
        <FiChevronDown
          className={`-mr-1 ml-2 h-5 w-5 transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option) => (
              <label
                key={option.id || option.name}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedValue === option.name}
                  onChange={() => handleSelect(option.name)}
                />
                <span className="ml-3">{option.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const UniversitiesList = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [universities, setUniversities] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    instituteType: "",
    state: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [totalUniversities, setTotalUniversities] = useState(0);
  const [seo, setSeo] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [dynamicFilters, setDynamicFilters] = useState({
    institute_types: [],
    states: [],
  });
  const [filtersLoaded, setFiltersLoaded] = useState(false);

  const formatUrl = (instituteTypeName, stateName) => {
    const instituteType = dynamicFilters.institute_types.find(
      (it) => it.name === instituteTypeName
    );
    const state = dynamicFilters.states.find((s) => s.name === stateName);

    const typeSlug = instituteType?.slug || "";
    const stateSlug = state?.slug || "";

    if (typeSlug && stateSlug)
      return `/universities/${typeSlug}-in-${stateSlug}`;
    if (typeSlug) return `/universities/${typeSlug}-in-malaysia`;
    if (stateSlug) return `/universities/universities-in-${stateSlug}`;
    return "/universities/universities-in-malaysia";
  };

  const handleFilterChange = (key, value) => {
    const updatedFilters = {
      ...selectedFilters,
      [key]: selectedFilters[key] === value ? "" : value,
    };

    if (key === 'instituteType') {
        updatedFilters.state = ''; // Reset state when institute type changes
    }

    const newUrl = formatUrl(
      updatedFilters.instituteType,
      updatedFilters.state
    );
    navigate(newUrl);
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
            if (error.name !== "AbortError") {
                console.error("Error fetching initial filters:", error);
            }
        }
    }
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
          const state = dynamicFilters.states.find(
            (s) => s.slug === stateSlug
          );
          if (state) {
            newFilters.state = state.name;
          }
        }

        if (typeSlug !== "universities") {
          const instituteType = dynamicFilters.institute_types.find(
            (it) => it.slug === typeSlug
          );
          if (instituteType) {
            newFilters.instituteType = instituteType.name;
          }
        }
      }
      
      if(newFilters.instituteType !== selectedFilters.instituteType || newFilters.state !== selectedFilters.state) {
          setSelectedFilters(newFilters);
      }
    }
  }, [type, filtersLoaded, dynamicFilters]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    if (searchQuery) {
      setSearch(decodeURIComponent(searchQuery));
    }
  }, [location.search]);

  useEffect(() => {
    if (!filtersLoaded) return; // Wait for initial filters to be loaded

    const controller = new AbortController();

    const loadUniversityData = async (page = 1) => {
      setIsLoading(true);
      try {
        let endpoint = `/universities/universities-in-malaysia`;
        const params = new URLSearchParams();

        if (selectedFilters.instituteType) {
          const instituteType = dynamicFilters.institute_types.find(
            (it) => it.name === selectedFilters.instituteType
          );
          if (instituteType) {
            params.append("institute_type", instituteType.id);
          }
        }

        if (selectedFilters.state) {
            const state = dynamicFilters.states.find(
                (s) => s.name === selectedFilters.state
            );
            if(state){
                params.append("state", state.name.toLowerCase());
            }
        }

        if (search) {
          params.append("search", search);
        }

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
        
        if (data) {
          setTitle(data.seo?.meta_title || "Universities in Malaysia");
          setUniversities(data.universities?.data || []);
          setPagination({
            current_page: data.universities?.current_page || 1,
            last_page: data.universities?.last_page || 1,
            per_page: data.universities?.per_page || 20,
            total: data.universities?.total || 0,
            next_page_url: data.universities?.next_page_url,
            prev_page_url: data.universities?.prev_page_url,
          });
        }
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
    if (newSearch) {
      params.set("search", newSearch);
    } else {
      params.delete("search");
    }
    params.delete("page");
    navigate(
      { pathname: location.pathname, search: params.toString() },
      { replace: true }
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleShowMore = () => setShowMore(!showMore);

  const infoText = `Malaysia is home to a diverse range of universities, offering a variety of programs and courses to cater to the educational needs of both local and international students. From prestigious public institutions to innovative private universities, Malaysia's higher education landscape is vibrant and dynamic. Many universities in Malaysia are recognized globally for their academic excellence, research contributions, and state-of-the-art facilities. Students can choose from a wide array of disciplines, including science, technology, engineering, arts, and humanities, ensuring that there is something for everyone. With a strong emphasis on quality education and international collaboration, Malaysian universities are well-equipped to prepare students for the challenges of the global job market.`;

  return (
    <>
      <Helmet>
        <title>{seo?.meta_title || "Universities in Malaysia"}</title>
        <meta name="description" content={seo?.meta_description} />
        <meta name="keywords" content={seo?.meta_keyword} />
        {seo?.page_url && <link rel="canonical" href={seo.page_url} />}
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-6 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Universities</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Found{" "}
            <span className="font-bold text-blue-600">{totalUniversities}</span>{" "}
            universities matching your criteria.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-1 max-w-6xl mx-auto shadow-sm mt-4">
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
        </header>

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
            <button
              onClick={handleReset}
              className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              Reset
            </button>
          </div>
        </div>

        <main>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {universities.map((uni) => (
                <div
                  key={uni.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition relative"
                >
                  <div className="relative">
                    <img
                      src={`${API_URL}${uni.logo_path}`}
                      alt={uni.name}
                      className="w-full h-40 object-contain "
                    />
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Undergraduate
                    </span>
                    <div className="absolute top-3 right-3 bg-gray-50 px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-semibold">
                      <FaStar className="w-4 h-4 text-yellow-400" />
                      {uni.rating}
                    </div>
                  </div>
                  <div className="p-7">
                    <Link
                      to={`/university/${uni.uname}`}
                      className="text-lg font-bold text-gray-900 hover:text-blue-600 transition"
                    >
                      {uni.name || "Bachelor of Engineering"}
                    </Link>

                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      Comprehensive program with various specializations...
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4 text-gray-600 text-sm ">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-600" /> 4 years
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-green-400" /> {uni.city}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-yellow-400" /> RM 32,000
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-purple-600" /> 3,200
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-5">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        Research labs
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        Industry collaboration
                      </span>
                      {/* <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        +2 more
                      </span> */}
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <Link
                        to={`/university/${uni.uname}`}
                        className="flex-1 text-center bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold py-2 rounded-lg hover:opacity-90"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {pagination.last_page > 1 && (
            <div className="mt-10 flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {pagination.last_page}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.last_page}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default UniversitiesList;
