import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { LuRefreshCw } from "react-icons/lu";
import api from "../../../api";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { handleErrors } from "../../../utils/handleErrors";

const SignUp = () => {
  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countriesData, setCountriesData] = useState([]);
  const [phonecode, setPhonecode] = useState([]);
  const [levels, setLevels] = useState([]);
  const [courseCategories, setCourseCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country_code: "",
    mobile: "",
    password: "",
    confirm_password: "",
    highest_qualification: "",
    interested_course_category: "",
    nationality: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/phonecodes");
        const phonecode = Array.isArray(response.data) ? response.data : response.data.data;
        setPhonecode(phonecode);

        const res = await api.get("/countries");
        const countries = Array.isArray(res.data) ? res.data : res.data.data;
        setCountriesData(countries);

        const levelsResponse = await api.get("/levels");
        const levels = levelsResponse.data.data;
        setLevels(levels);

        const categoriesResponse = await api.get("/course-categories");
        const categories = Array.isArray(categoriesResponse.data) ? categoriesResponse.data : categoriesResponse.data.data;
        setCourseCategories(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    generateCaptcha();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const generateCaptcha = () => {
    const operators = ["+", "-", "×"];
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = operators[Math.floor(Math.random() * operators.length)];
    setCaptcha(`${num1} ${operator} ${num2}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [num1, operator, num2] = captcha.split(" ");
    let expectedAnswer;
    if (operator === "+") {
      expectedAnswer = parseInt(num1) + parseInt(num2);
    } else if (operator === "-") {
      expectedAnswer = parseInt(num1) - parseInt(num2);
    } else if (operator === "×") {
      expectedAnswer = parseInt(num1) * parseInt(num2);
    }

    if (parseInt(userCaptcha) !== expectedAnswer) {
      toast.error("Incorrect captcha value.");
      generateCaptcha();
      setUserCaptcha("");
      return;
    }

   try {
  const response = await api.post("/student/register", null, { params: formData });
  console.log("Registration Response:", response.data);

  const studentId =
    response.data?.id || response.data?.data?.id || response.data?.student_id;

  if (studentId) {
    localStorage.setItem("student_id", studentId);
    toast.success("Registration successful!");
    navigate("/confirmed-email");
  } else {
    toast.error("Registration failed. Please check your details.");
  }
} catch (error) {
  console.error("Registration failed:", error.response?.data || error);

  if (error.response?.data?.errors) {
    // field-wise validation errors
    handleErrors(error.response.data.errors);
  } else if (error.response?.data?.message) {
    // general message from API
    toast.error(error.response.data.message);
  } else {
    // fallback
    toast.error("Registration failed. Please try again.");
  }
}
};

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 flex items-center justify-center overflow-auto p-4">
      <div className="relative w-full max-w-5xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 flex flex-col lg:flex-row overflow-hidden transition-all duration-500">
        <div className="lg:w-1/2 hidden lg:flex items-center justify-center p-10 bg-gradient-to-br from-blue-700 via-blue-500 to-blue-400 text-white">
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-extrabold">Join the Community</h2>
            <p className="text-md max-w-sm mx-auto opacity-90">
              Create a new account to unlock your full potential!
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-white/80 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 ">
            Sign Up
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputWithIcon icon={<FaUser />} placeholder="Username" name="name" value={formData.name} onChange={handleChange} />
            <InputWithIcon icon={<FaEnvelope />} type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />

            <div className="flex gap-2">
              <div className="relative w-1/3">
                <select name="country_code" value={formData.country_code} onChange={handleChange} className="appearance-none w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-600 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
                  <option value="">Code</option>
                  {phonecode.map((code, idx) => (
                    <option key={idx} value={code.phonecode}>+{code.phonecode}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
              </div>
              <input type="tel" placeholder="Phone Number" name="mobile" value={formData.mobile} onChange={handleChange} className="w-2/3 px-4 py-2 rounded-md bg-white shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <SelectInput label="Qualification Level" name="highest_qualification" value={formData.highest_qualification} onChange={handleChange} options={levels.map((level) => level.level)} />
            <SelectInput label="Interested Course Category" name="interested_course_category" value={formData.interested_course_category} onChange={handleChange} options={courseCategories.map((cat) => cat.name)} />
            <SelectInput label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} options={countriesData.map((country) => country.name)} />

            <div className="relative">
              <InputWithIcon icon={<FaLock />} placeholder="Password" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} />
              <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="relative">
              <InputWithIcon icon={<FaLock />} placeholder="Confirm Password" type={showConfirmPassword ? "text" : "password"} name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
              <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-gray-200 text-gray-600 font-bold px-6 py-2 rounded-md shadow-inner select-none min-w-[100px] text-center">
                {captcha}
              </div>
              <LuRefreshCw onClick={generateCaptcha} className="cursor-pointer text-gray-600 hover:text-gray-900 transition-transform duration-300" size={20} />
              <input type="text" placeholder="Enter Captcha Value" value={userCaptcha} onChange={(e) => setUserCaptcha(e.target.value)} className="flex-1 px-4 py-2 rounded-md bg-white shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2 rounded-lg shadow-md hover:opacity-90 transition-all">Sign Up</button>

            <div className="text-center text-sm text-gray-700 mt-4">
              <p>
                Already a member? {" "}
                <Link to="/login" className="text-blue-600 hover:underline cursor-pointer"><b>Sign In</b></Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputWithIcon = ({ icon, placeholder, type = "text", name, value, onChange }) => (
  <div className="relative">
    <div className="absolute left-3 top-2.5 text-gray-500">{icon}</div>
    <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full pl-10 pr-3 py-2 rounded-md bg-white shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </div>
);

const SelectInput = ({ label, options, name, value, onChange }) => (
  <div className="relative">
    <select name={name} value={value} onChange={onChange} className="appearance-none w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-500 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
      <option value="" disabled hidden>{label}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>{opt}</option>
      ))}
    </select>
    <FiChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
  </div>
);

export default SignUp;
