


import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";


const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); // update whenever route changes

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen) {
        return;
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const closeAllMenus = () => {
    setMenuOpen(false);
    setShowDropdown(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    closeAllMenus();
  }, [location]);

  

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="px-4 sm:px-8 py-1 sticky top-0 z-50 transition-all duration-500 bg-white/80 backdrop-blur text-black shadow-lg">
      <div className="flex items-center justify-between">
        <Link to="/" aria-label="Home">
          <img
            src="/logo (2).png"
            alt="Malaysia Logo"
            className="h-12 sm:h-12 w-auto max-w-[250px] object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-7 font-medium">
          <Link to="/" className={`hover:text-blue-700 transition ${isActive("/") && "text-blue-900 font-bold underline underline-offset-8"}`}>Home</Link>

          {/* Resources Dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => window.innerWidth >= 768 && setShowDropdown(true)}
            onMouseLeave={() => window.innerWidth >= 768 && setShowDropdown(false)}
          >
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center gap-1 hover:text-blue-700"
            >
              Resources
              <FaChevronDown className={`transition-transform ${showDropdown ? "rotate-180" : ""}`} size={13} />
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 mt-1 w-[700px] bg-white/90 backdrop-blur shadow-2xl rounded-xl border border-blue-100 p-6 grid grid-cols-1 md:grid-cols-4 gap-4 z-50">
                {/* Exams */}
                <div>
                  <Link to="/resources/exams" className="font-bold text-blue-600 mb-3 hover:underline block">Exams</Link>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/resources/exams/muet" className="hover:underline">MUET</Link></li>
                    <li><Link to="/resources/exams/pte" className="hover:underline">PTE</Link></li>
                    <li><Link to="/resources/exams/toefl" className="hover:underline">TOEFL</Link></li>
                    <li><Link to="/resources/exams/ielts" className="hover:underline">IELTS</Link></li>
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <Link to="/resources/services" className="font-bold text-blue-600 mb-3 hover:underline block">Services</Link>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/resources/services/discover-malaysia" className="hover:underline">Discover Malaysia</Link></li>
                    <li><Link to="/resources/services/admission-guidance" className="hover:underline">Admission Guidance</Link></li>
                    <li><Link to="/resources/services/visa-guidance" className="hover:underline">Visa Guidance</Link></li>
                    <li><Link to="/resources/services/pre-departure-support" className="hover:underline">Pre Departure Support</Link></li>
                  </ul>
                </div>

                {/* Graduate Pass - NEW SECTION */}
                <div>
                  {/* <Link to="/resources/Graduatepass" className="font-bold text-blue-600 mb-3 hover:underline block">Graduate Pass</Link> */}
                  <Link to="/resources/graduate-pass" className="font-bold text-blue-600 mb-3 hover:underline block">
  Graduate Pass
</Link>

                  <ul className="space-y-2 text-sm">
                    {/* <li><Link to="/resources/Graduatepass/overview" className="hover:underline">Maq</Link></li> */}
                    <li><Link to="/resources/Graduatepass/eligibility" className="hover:underline">Team Education Malaysia</Link></li>
                    <li><Link to="/resources/Graduatepass/application" className="hover:underline">Application Process</Link></li>
                    <li><Link to="/resources/Graduatepass/benefits" className="hover:underline">Benefits</Link></li>
                  </ul>
                </div>

                {/* About Us */}
                <div>
                  <p className="font-bold text-black mb-3 hover:underline block">About Us</p>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/who-we-are" className="hover:underline">Who we are</Link></li>
                    <li><Link to="/students-say" className="hover:underline">What Students Say</Link></li>
                    <li><Link to="/study-malaysia" className="hover:underline">Study Malaysia</Link></li>
                    <li><Link to="/why-study" className="hover:underline">Why Study In Malaysia?</Link></li>
                  </ul>
                </div>

            
              </div>
              
            )}
          </div>

        

          <Link to="/courses-in-malaysias" className={`hover:text-blue-700 transition ${isActive("/courses-in-malaysias") && "text-blue-900 font-bold underline underline-offset-8"}`}>Courses</Link>
          <Link to="/universities" className={`hover:text-blue-700 transition ${isActive("/universities") && "text-blue-900 font-bold underline underline-offset-8"}`}>Universities</Link>
          <Link to="/specialization" className={`hover:text-blue-700 transition ${isActive("/specialization") && "text-blue-900 font-bold underline underline-offset-8"}`}>Specialization</Link>
          <Link to="/scholarships" className={`hover:text-blue-700 transition ${isActive("/scholarship") && "text-blue-900 font-bold underline underline-offset-8"}`}>Scholarship</Link>
          {isLoggedIn ? (
            <Link to="/student/profile">
              <button className="bg-blue-900 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-800 transition font-semibold">
                Profile
              </button>
            </Link>
          ) : (
            <Link to="/signup">
              <button className="bg-blue-900 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-800 transition font-semibold">
                Get Started
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-blue-900 text-2xl font-thin">
          {menuOpen ? <FaTimes /> : <FaBars /> }
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 font-medium animate-fade-in">
          <Link to="/" className="block text-left w-full">Home</Link>

          {/* Mobile Dropdown */}
          <div>
            <button onClick={() => setShowDropdown((prev) => !prev)} className="flex items-center gap-1 w-full">
              Resources
              <FaChevronDown className={`transition-transform ${showDropdown ? "rotate-180" : ""}`} size={13} />
            </button>

            {showDropdown && (
              <div className="bg-white border p-4 mt-2 rounded-xl shadow space-y-4 relative z-10">
                <div>
                  <Link to="/resources/exams" className="text-blue-600 font-semibold block text-left w-full">Exams</Link>
                  <Link to="/resources/exams/muet" className="block text-left w-full pl-2">MUET</Link>
                  <Link to="/resources/exams/pte" className="block text-left w-full pl-2">PTE</Link>
                  <Link to="/resources/exams/toefl" className="block text-left w-full pl-2">TOEFL</Link>
                  <Link to="/resources/exams/ielts" className="block text-left w-full pl-2">IELTS</Link>
                </div>
                <div>
                  <Link to="/resources/services" className="text-blue-600 font-semibold block text-left w-full">Services</Link>
                  <Link to="/resources/services/discover-malaysia" className="block text-left w-full pl-2">Discover Malaysia</Link>
                  <Link to="/resources/services/admission-guidance" className="block text-left w-full pl-2">Admission Guidance</Link>
                  <Link to="/resources/services/visa-guidance" className="block text-left w-full pl-2">Visa Guidance</Link>
                  <Link to="/resources/services/pre-departure-support" className="block text-left w-full pl-2">Pre Departure Support</Link>
                </div>
                
                {/* Graduate Pass - NEW SECTION FOR MOBILE */}
                <div>
                  <Link to="/resources/graduate-pass" className="text-blue-600 font-semibold block text-left w-full">Graduate Pass</Link>
                  <Link to="/resources/graduate-pass/overview" className="block text-left w-full pl-2">Overview</Link>
                  <Link to="/resources/graduate-pass/eligibility" className="block text-left w-full pl-2">Eligibility</Link>
                  <Link to="/resources/graduate-pass/application" className="block text-left w-full pl-2">Application Process</Link>
                  <Link to="/resources/graduate-pass/benefits" className="block text-left w-full pl-2">Benefits</Link>
                </div>

                <div>
                  <p className="text-black font-semibold">About Us</p>
                  <Link to="/who-we-are" className="block text-left w-full pl-2">Who we are</Link>
                  <Link to="/students-say" className="block text-left w-full pl-2">What Students Say</Link>
                  <Link to="/study-malaysia" className="block text-left w-full pl-2">Study Malaysia</Link>
                  <Link to="/why-study" className="block text-left w-full pl-2">Why Study In Malaysia?</Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/courses-in-malaysias" className="block text-left w-full">Courses</Link>
          <Link to="/universities" className="block text-left w-full">Universities</Link>
          <Link to="/specialization" className="block text-left w-full">Specialization</Link>
          <Link to="/scholarships" className="block text-left w-full">Scholarship</Link>

          {isLoggedIn ? (
            <Link to="/student/profile" className="w-full">
              <button className="w-full border-2 border-blue-800 text-blue-800 bg-white py-2 rounded-lg shadow hover:bg-blue-800 hover:text-white transition font-semibold">
                Profile
              </button>
            </Link>
          ) : (
            <Link to="/signup" className="w-full">
              <button className="w-full bg-blue-900 text-white py-2 rounded-lg shadow hover:bg-blue-800 transition font-semibold">
                Get Started
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;