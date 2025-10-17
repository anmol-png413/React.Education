import React, { useState, useEffect } from "react";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Home, Layers } from "lucide-react";


const locationsData = {
  INDIA: [
    {
      city: "Gurgaon",
      address:
        "B-16 Ground Floor, Mayfield Garden, Sector 50, Gurugram, Haryana, India 122002",
      contact: "+91-9818560331",
      email: "info@educationmalaysia.in",
    },
    {
      city: "Chennai",
      address:
        "#1 H, first floor, Vantage Plaza, Door No.1, L.B.Road and MG Road Junction, Thiruvanmiyur-600 041",
      contact: "+60-17-647-2057",
      email: "info@educationmalaysia.in",
    },
    {
      city: "Chittoor",
      address:
        "2nd floor, opp. to Indian Bank, Bairagi Patteda, Tirupati 517501",
      contact: "+91-9818560331",
      email: "info@educationmalaysia.in",
    },
    {
      city: "Maharashtra",
      address:
        "Office No. 35, PP Chamber, Fathe Ali Road, Dombivli East, Thane, Maharashtra, 421201",
      contact: "+91-9818560331",
      email: "info@educationmalaysia.in",
    },
    {
      city: "Hyderabad",
      address:
        "H.no:-16-2-669 Flat no–116, Jamuna Towers, Malakpet 500036 TS",
      contact: "+91-9818560331",
      email: "info@educationmalaysia.in",
    },
  ],
  MALAYSIA: [
    {
      city: "Kuala Lumpur",
      address:
        "8, Jalan Tun Sambanthan, Wilayah Persekutuan Kuala Lumpur Malaysia 50470",
      contact: "+60-3-12345678",
      email: "kl@educationmalaysia.in",
    },
  ],
  BANGLADESH: [
    {
      city: "Uttara Dhaka",
      address:
        "H-16, Road-09, Sector-01, (Flat-A5/B), Uttara, Dhaka, Bangladesh 1230",
      contact: "+60-11-1778-4424",
      email: "info@educationmalaysia.in",
    },
  ],
  PAKISTAN: [
    {
      city: "Lahore",
      address: "#311, Garden Heights, Garden Town Lahore Pakistan 54000",
      contact: "+60-11-1778-4424",
      email: " info@educationmalaysia.in",
    },
  ],
};

const ContactUs = () => {
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [activeTab, setActiveTab] = useState("INDIA");

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10 + 1);
    const b = Math.floor(Math.random() * 10 + 1);
    setCaptchaQuestion(`${a} * ${b}`);
    setCaptchaAnswer((a * b).toString());
  };

  useEffect(() => {
    generateCaptcha();
  }, []);
  
useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const tabStyles = (tab) =>
    `px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
      activeTab === tab
        ? "bg-blue-700 text-white shadow-lg"
        : "bg-gray-100 text-blue-700 hover:bg-blue-200"
    }`;

  return (
<>
{/* Breadcrumb */}
      <div className="w-full bg-blue-50 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Link to="/" className="flex items-center gap-1 hover:underline hover:text-blue-500">
              <Home size={18} /> Home
            </Link>
            <span>/</span>
            <Link to="/contact-us" className="flex items-center gap-1 hover:underline hover:text-blue-500">
              <Layers size={18} /> Contact Us
            </Link>
          </div>
        </div>
      </div>


    <div className="bg-gradient-to-br from-blue-50 to-white py-12 px-4 md:px-12">
      {/* Contact Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Form */}
        <div className="md:col-span-2 bg-white/60 backdrop-blur-md shadow-xl rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-blue-800">Get in Touch</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded border bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded border bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="p-3 rounded border bg-white/90">
              <option value="+91">+91 (India)</option>
            </select>
            <input
              type="text"
              placeholder="Mobile Number"
              className="p-3 rounded border bg-white/90"
            />
          </div>

          <textarea
            rows="4"
            placeholder="Write your message..."
            className="w-full mt-4 p-3 rounded border bg-white/90"
          ></textarea>

          <div className="flex items-center gap-3 mt-4">
            <span className="px-4 py-2 bg-blue-100 rounded">{captchaQuestion}</span>
            <input
              type="text"
              placeholder="Answer"
              className="flex-1 p-2 border rounded bg-white/90"
            />
          </div>

          <button
            onClick={generateCaptcha}
            className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg shadow-md font-medium"
          >
            Submit Request
          </button>
        </div>

        {/* Info */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">
            Contact Info
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            We at Britannica Education support and guide students and families
            in making informed decisions for a bright future.
          </p>
          <div className="flex items-start gap-3 mb-4">
            <MdLocationOn className="text-blue-700 text-xl mt-1" />
            <p className="text-gray-700 text-sm">
              B-16 Ground Floor, Mayfield Garden, Sector 50, Gurugram, Haryana,
              India 122002
            </p>
          </div>
          <div className="flex items-start gap-3 mb-2">
            <MdEmail className="text-blue-700 text-xl mt-1" />
            <div>
              <p className="text-sm text-blue-600">info@educationmalaysia.in</p>
              <p className="text-sm text-blue-600">sales@educationmalaysia.in</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MdPhone className="text-blue-700 text-xl mt-1" />
            <p className="text-sm text-blue-600">
              +91 9818560331, +91 8130798532
            </p>
          </div>
        </div>
      </div>

      {/* Location Tabs */}
      <div className="mt-16">
        <h2 className="text-center text-3xl font-bold text-blue-800 mb-8">
          Our <span className="text-black">Locations</span>
        </h2>

        <div className="flex justify-center flex-wrap gap-4 mb-10">
          {["INDIA", "MALAYSIA", "BANGLADESH", "PAKISTAN"].map((country) => (
            <button
              key={country}
              className={tabStyles(country)}
              onClick={() => setActiveTab(country)}
            >
              {country}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locationsData[activeTab].map((loc, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <FaBuilding className="text-blue-700" />
                <h3 className="text-xl font-semibold">{loc.city}</h3>
              </div>
              <p className="text-sm mb-2 text-gray-600">
                <MdLocationOn className="inline mr-1 text-blue-500" />
                {loc.address}
              </p>
              <p className="text-sm text-gray-700">
                <MdPhone className="inline mr-1 text-blue-500" />
                {loc.contact}
              </p>
              <p className="text-sm text-blue-700">
                <MdEmail className="inline mr-1 text-blue-500" />
                {loc.email}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Map Section */}
<div className="mt-12">
  <h2 className="text-center text-2xl font-semibold text-blue-800 mb-4">
    Find Us on Map
  </h2>
  <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
    <iframe
      title="Google Map"
      src={
        {
          INDIA: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7004.303129814315!2d77.0554621!3d28.4165369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18c4f2546a01%3A0x6455c6b75e55b144!2sMayfield%20Garden%2C%20Sector%2050%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1695710000000!5m2!1sen!2sin",
          MALAYSIA: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1993.0368803700766!2d101.69296431614036!3d3.135667000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49f65b24d13f%3A0x1eaf1b07bc8a4171!2sJalan%20Tun%20Sambanthan%2C%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1695710000001!5m2!1sen!2smy",
          BANGLADESH: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.432555942795!2d90.39129481538585!3d23.766332394294655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c427c23f8f5f%3A0xa1a6c5794873d890!2sUttara%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1695710000002!5m2!1sen!2sbd",
          PAKISTAN: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13613.520763872065!2d74.3211251!3d31.4969397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904a3aeaad4fb%3A0x4044ab6fae594b3d!2sGarden%20Town%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1695710000003!5m2!1sen!2s"
        }[activeTab]
      }
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>

    </div>
    </>
  );
};

export default ContactUs;
