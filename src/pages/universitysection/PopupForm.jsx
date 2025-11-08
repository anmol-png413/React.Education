// import React, { useState, useEffect } from "react";
// import {
//   FaTimes,
//   FaGraduationCap,
//   FaBook,
//   FaGlobe,
//   FaLightbulb,
//   FaMoneyBill,
//   FaPhoneAlt,
// } from "react-icons/fa";
// import { LuRefreshCw } from "react-icons/lu";
// import api from "../../api";
// import { API_URL } from "../../config";

// const PopupForm = ({ isOpen, onClose, universityData }) => {
//   const [captcha, setCaptcha] = useState("");
//   const [userInput, setUserInput] = useState("");
//   const [countriesData, setCountriesData] = useState([]);
//   const [phonecode, setPhonecode] = useState([]);
//   const [levels, setLevels] = useState([]);
//   const [courseCategories, setCourseCategories] = useState([]);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     c_code: "",
//     mobile: "",
//     nationality: "",
//     highest_qualification: "",
//     interested_course_category: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   // ✅ Captcha Generator
//   const generateCaptcha = () => {
//     const num1 = Math.floor(Math.random() * 10) + 1;
//     const num2 = Math.floor(Math.random() * 10) + 1;
//     const operators = ["+", "-", "*"];
//     const operator = operators[Math.floor(Math.random() * operators.length)];
//     setCaptcha(`${num1} ${operator} ${num2}`);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get("/phonecodes");
//         const phonecode = Array.isArray(response.data)
//           ? response.data
//           : response.data.data;
//         setPhonecode(phonecode);

//         const res = await api.get("/countries");
//         const countries = Array.isArray(res.data)
//           ? res.data
//           : res.data.data;
//         setCountriesData(countries);

//         const levelsResponse = await api.get("/levels");
//         const levels = levelsResponse.data.data;
//         setLevels(levels);

//         const categoriesResponse = await api.get("/course-categories");
//         const categories = Array.isArray(categoriesResponse.data)
//           ? categoriesResponse.data
//           : categoriesResponse.data.data;
//         setCourseCategories(categories);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (isOpen) {
//       generateCaptcha();
//       document.body.style.overflow = "hidden"; // Disable scroll when popup open
//     }
//     return () => {
//       document.body.style.overflow = "auto"; // Enable scroll when popup close
//     };
//   }, [isOpen]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // captcha check
//     try {
//       const correctAnswer = eval(captcha);
//       if (parseInt(userInput) !== correctAnswer) {
//         alert("Invalid captcha answer");
//         return;
//       }
//     } catch {
//       alert("Captcha error");
//       return;
//     }

//     setLoading(true);
//     try {
//       // 👇 Registration API (not enquiry)
//       await api.post("/inquiry/brochure-request", formData);
//       setShowSuccess(true);
//     } catch (error) {
//       console.error("Enquiry failed:", error);
//       alert("Something went wrong, please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 ">
//       {/* Success Popup */}
//       {showSuccess ? (
//         <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center">
//           <div className="flex flex-col items-center mb-4">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-16 w-16 text-green-500 mb-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//             <h2 className="text-2xl font-bold text-gray-800">Success</h2>
//             <p className="text-gray-600 mt-2 text-sm">
//               Your inquiry has been submitted successfully. We will contact you soon.
//             </p>
//           </div>
//           <button
//             onClick={() => {
//               setShowSuccess(false);
//               onClose();
//             }}
//             className="bg-indigo-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-600 transition"
//           >
//             OK
//           </button>
//         </div>
//       ) : (
//         <div className="bg-white w-[90%] max-w-5xl h-[90vh] rounded-2xl shadow-2xl p-6 relative flex flex-col md:flex-row sm:overflow-auto">
//           {/* Close button */}
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
//           >
//             <FaTimes size={28} />
//           </button>

//           {/* Left Section */}
//           <div className="w-full md:w-1/3 p-4">
//             <h2 className="text-md font-bold mb-6 text-blue-700 text-center md:text-left">
//               How Education Malaysia helps you in
//             </h2>
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 [<FaGraduationCap size={24} />, "Comprehensive Course Guidance"],
//                 [<FaBook size={24} />, "Brochure Access"],
//                 [<FaGlobe size={24} />, "International Student Support"],
//                 [<FaLightbulb size={24} />, "Personalized Counseling"],
//                 [<FaMoneyBill size={24} />, "Scholarship Assistance"],
//                 [<FaPhoneAlt size={24} />, "24/7 Support"],
//               ].map(([icon, text], idx) => (
//                 <div
//                   key={idx}
//                   className="border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-center bg-gray-50 shadow-sm hover:shadow-md transition"
//                 >
//                   <span className="text-blue-600 mb-2">{icon}</span>
//                   <p className="text-gray-700 text-xs font-medium leading-snug">
//                     {text}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="w-full md:w-2/3 bg-gray-50 rounded-xl p-6 shadow-inner">
//             <div className="flex flex-col items-center mb-0">
//               <img
//                 src={`${API_URL}${universityData.logo_path}`}
//                 alt={universityData.name}
//                 className="w-20 h-20 object-contain mb-1"
//               />
//               <h2 className="text-xl font-bold text-blue-700 text-center">
//                 Register Now To Download Brochure
//               </h2>
//               <p className="text-gray-600 text-sm mb-2">{universityData.name}</p>
//             </div>

//             <form className="grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Full Name*"
//                 className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 required
//               />

//               <div className="flex col-span-2">
//                 <select
//                   name="c_code"
//                   value={formData.c_code}
//                   onChange={handleChange}
//                   className="border border-gray-300 rounded-l-lg p-3 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   required
//                 >
//                   <option value="">Code</option>
//                   {phonecode.map((code, idx) => (
//                     <option key={idx} value={code.phonecode}>
//                       +{code.phonecode}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="text"
//                   name="mobile"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                   placeholder="Mobile/WhatsApp No*"
//                   className="border border-gray-300 p-3 rounded-r-lg flex-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   required
//                 />
//               </div>

//               <select
//                 name="nationality"
//                 value={formData.nationality}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-3 rounded-lg col-span-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 required
//               >
//                 <option value="">Nationality</option>
//                 {countriesData.map((country, idx) => (
//                   <option key={idx} value={country.name}>
//                     {country.name}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 name="highest_qualification"
//                 value={formData.highest_qualification}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-3 rounded-lg col-span-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 required
//               >
//                 <option value="">Your Highest Qualification Level</option>
//                 {levels.map((level, idx) => (
//                   <option key={idx} value={level.level}>
//                     {level.level}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 name="interested_course_category"
//                 value={formData.interested_course_category}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-3 rounded-lg col-span-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 required
//               >
//                 <option value="">Interested Course Category</option>
//                 {courseCategories.map((category, idx) => (
//                   <option key={idx} value={category.name}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>

//               {/* Captcha */}
//               <div className="flex items-center gap-3 col-span-2">
//                 <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
//                   Captcha : {captcha} =
//                 </span>
//                 <input
//                   type="text"
//                   value={userInput}
//                   onChange={(e) => setUserInput(e.target.value)}
//                   placeholder="Enter Captcha Value"
//                   className="border border-gray-300 p-2 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={generateCaptcha}
//                   className="text-blue-600 text-xs hover:underline"
//                 >
//                   <LuRefreshCw className="text-black h-4 w-4" />
//                 </button>
//               </div>

//               <p className="text-xs col-span-2 text-gray-500 mt-1">
//                 By Submitting This Form, You Accept And Agree To Our {" "}
//                 <span className="text-blue-600 cursor-pointer">Terms Of Use.</span>
//               </p>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition col-span-2"
//               >
//                 {loading ? "Submitting..." : "Send Message"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PopupForm;

import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaGraduationCap,
  FaBook,
  FaGlobe,
  FaLightbulb,
  FaMoneyBill,
  FaPhoneAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import api from "../../api";
import { API_URL } from "../../config";

const PopupForm = ({ isOpen, onClose, universityData, formType = "brochure" }) => {
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const [phonecode, setPhonecode] = useState([]);
  const [levels, setLevels] = useState([]);
  const [courseCategories, setCourseCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    c_code: "",
    mobile: "",
    nationality: "",
    highest_qualification: "",
    interested_course_category: "",
    // ✅ Counselling form ke liye extra fields
    preferred_date: "",
    preferred_time: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ✅ Dynamic titles based on formType
  const formTitle = formType === "counselling" 
    ? "Book Your Counselling Session" 
    : "Register Now To Download Brochure";
  
  const submitButtonText = formType === "counselling"
    ? "Book Session Now"
    : "Download Brochure";

  // ✅ Captcha Generator
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    setCaptcha(`${num1} ${operator} ${num2}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/phonecodes");
        const phonecode = Array.isArray(response.data)
          ? response.data
          : response.data.data;
        setPhonecode(phonecode);

        const res = await api.get("/countries");
        const countries = Array.isArray(res.data)
          ? res.data
          : res.data.data;
        setCountriesData(countries);

        const levelsResponse = await api.get("/levels");
        const levels = levelsResponse.data.data;
        setLevels(levels);

        const categoriesResponse = await api.get("/course-categories");
        const categories = Array.isArray(categoriesResponse.data)
          ? categoriesResponse.data
          : categoriesResponse.data.data;
        setCourseCategories(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // captcha check
    try {
      const correctAnswer = eval(captcha);
      if (parseInt(userInput) !== correctAnswer) {
        alert("Invalid captcha answer");
        return;
      }
    } catch {
      alert("Captcha error");
      return;
    }

    setLoading(true);
    try {
      // ✅ Different API endpoints based on formType
      const endpoint = formType === "counselling" 
        ? "/inquiry/counselling-request"
        : "/inquiry/brochure-request";
      
      await api.post(endpoint, formData);
      setShowSuccess(true);
    } catch (error) {
      console.error("Enquiry failed:", error);
      alert("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 ">
      {/* Success Popup */}
      {showSuccess ? (
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center">
          <div className="flex flex-col items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800">Success!</h2>
            <p className="text-gray-600 mt-2 text-sm">
              {formType === "counselling" 
                ? "Your counselling session has been booked successfully. We will contact you soon."
                : "Your inquiry has been submitted successfully. We will contact you soon."}
            </p>
          </div>
          <button
            onClick={() => {
              setShowSuccess(false);
              onClose();
            }}
            className="bg-indigo-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            OK
          </button>
        </div>
      ) : (
        <div className="bg-white w-[90%] max-w-5xl h-[90vh] rounded-2xl shadow-2xl p-6 relative flex flex-col md:flex-row overflow-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition z-10"
          >
            <FaTimes size={28} />
          </button>

          {/* Left Section */}
          <div className="w-full md:w-1/3 p-4">
            <h2 className="text-md font-bold mb-6 text-blue-700 text-center md:text-left">
              {formType === "counselling" 
                ? "Why Book a Counselling Session?"
                : "How Education Malaysia helps you in"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {formType === "counselling" ? (
                // ✅ Counselling specific benefits
                [
                  [<FaCalendarAlt size={24} />, "Flexible Scheduling"],
                  [<FaPhoneAlt size={24} />, "One-on-One Guidance"],
                  [<FaGraduationCap size={24} />, "Course Selection Help"],
                  [<FaLightbulb size={24} />, "Expert Advice"],
                  [<FaMoneyBill size={24} />, "Scholarship Info"],
                  [<FaGlobe size={24} />, "Visa Assistance"],
                ].map(([icon, text], idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-center bg-gray-50 shadow-sm hover:shadow-md transition"
                  >
                    <span className="text-green-600 mb-2">{icon}</span>
                    <p className="text-gray-700 text-xs font-medium leading-snug">
                      {text}
                    </p>
                  </div>
                ))
              ) : (
                // ✅ Original brochure benefits
                [
                  [<FaGraduationCap size={24} />, "Comprehensive Course Guidance"],
                  [<FaBook size={24} />, "Brochure Access"],
                  [<FaGlobe size={24} />, "International Student Support"],
                  [<FaLightbulb size={24} />, "Personalized Counseling"],
                  [<FaMoneyBill size={24} />, "Scholarship Assistance"],
                  [<FaPhoneAlt size={24} />, "24/7 Support"],
                ].map(([icon, text], idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-center bg-gray-50 shadow-sm hover:shadow-md transition"
                  >
                    <span className="text-blue-600 mb-2">{icon}</span>
                    <p className="text-gray-700 text-xs font-medium leading-snug">
                      {text}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="w-full md:w-2/3 bg-gray-50 rounded-xl p-6 shadow-inner">
            <div className="flex flex-col items-center mb-0">
              <img
                src={`${API_URL}${universityData.logo_path}`}
                alt={universityData.name}
                className="w-20 h-20 object-contain mb-1"
              />
              <h2 className={`text-xl font-bold text-center ${formType === "counselling" ? "text-green-700" : "text-blue-700"}`}>
                {formTitle}
              </h2>
              <p className="text-gray-600 text-sm mb-2">{universityData.name}</p>
            </div>

            <form className="grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name*"
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email*"
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              <div className="flex col-span-2">
                <select
                  name="c_code"
                  value={formData.c_code}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-l-lg p-3 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Code</option>
                  {phonecode.map((code, idx) => (
                    <option key={idx} value={code.phonecode}>
                      +{code.phonecode}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile/WhatsApp No*"
                  className="border border-gray-300 p-3 rounded-r-lg flex-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg col-span-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="">Nationality*</option>
                {countriesData.map((country, idx) => (
                  <option key={idx} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>

              <select
                name="highest_qualification"
                value={formData.highest_qualification}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg col-span-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="">Highest Qualification*</option>
                {levels.map((level, idx) => (
                  <option key={idx} value={level.level}>
                    {level.level}
                  </option>
                ))}
              </select>

              <select
                name="interested_course_category"
                value={formData.interested_course_category}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg col-span-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="">Interested Course Category*</option>
                {courseCategories.map((category, idx) => (
                  <option key={idx} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* ✅ COUNSELLING FORM KE EXTRA FIELDS */}
              {formType === "counselling" && (
                <>
                  <div className="col-span-1 relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="preferred_date"
                      value={formData.preferred_date}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 pl-10 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="col-span-1 relative">
                    <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="preferred_time"
                      value={formData.preferred_time}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 pl-10 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
                      required
                    >
                      <option value="">Select Time*</option>
                      <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                      <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                      <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                      <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                      <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                      <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                    </select>
                  </div>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Additional Message (Optional)"
                    rows="3"
                    className="border border-gray-300 p-3 rounded-lg col-span-2 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                  />
                </>
              )}

              {/* Captcha */}
              <div className="flex items-center gap-3 col-span-2">
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Captcha: {captcha} =
                </span>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter Answer"
                  className="border border-gray-300 p-2 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <LuRefreshCw className="h-5 w-5" />
                </button>
              </div>

              <p className="text-xs col-span-2 text-gray-500 mt-1">
                By Submitting This Form, You Accept And Agree To Our{" "}
                <span className="text-blue-600 cursor-pointer hover:underline">Terms Of Use.</span>
              </p>

              <button
                type="submit"
                disabled={loading}
                className={`${
                  formType === "counselling"
                    ? "bg-gradient-to-r from-green-600 to-green-800"
                    : "bg-gradient-to-r from-blue-600 to-blue-800"
                } text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition col-span-2 disabled:opacity-50`}
              >
                {loading ? "Submitting..." : submitButtonText}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupForm;