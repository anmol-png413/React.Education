import React, { useRef, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Layers,
  Clock,
  DollarSign,
  GraduationCap,
  Briefcase,
  FileText,
  ChevronDown,
} from 'lucide-react';

import api from '../../api';
import GetInTouchForm from '../../components/GetInTouchForm';
import FeaturedUniversities from '../../components/FeaturedUniversities';
import RelatedUniversities from '../../components/UniversityCard';
import CatagoryTreandingCourse from './CatagoryTreandingCourse';



const ICON_MAP = {
  'About Course': <Home size={16} />,
  'Course Duration': <Clock size={16} />,
  'Cost': <DollarSign size={16} />,
  'Universities': <GraduationCap size={16} />,
  'Career': <Briefcase size={16} />,
};

const LevelDetail = () => {
  const { slug } = useParams();
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [contentMap, setContentMap] = useState({});
  const [faqs, setFaqs] = useState([]); // New state for FAQs
  const [openFaq, setOpenFaq] = useState(null); // State to manage open/close FAQ items
  const sectionRefs = useRef({});

  const formattedName = slug
    ?.replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  // Set up refs dynamically
  useEffect(() => {
    // Add an 'FAQs' ref as well
    const allTabs = [...tabs, 'FAQs'];
    sectionRefs.current = allTabs.reduce((acc, tab) => {
      acc[tab] = React.createRef();
      return acc;
    }, {});
  }, [tabs]);

  // Fetch data from API and update state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/course-category/${slug}`);
        console.log('Fetched Level Detail:', res);
        
        const categoryData = res.data?.category || {};

        const contents = categoryData.contents || [];
        const fetchedFaqs = categoryData.faqs || [];

        const newTabs = contents.map((section) => section.tab);
        if (fetchedFaqs.length > 0) {
          newTabs.push('FAQs'); // Add FAQ tab if data exists
        }

        const newContentMap = contents.reduce((acc, section) => {
          acc[section.tab] = section.description;
          return acc;
        }, {});

        setTabs(newTabs);
        setContentMap(newContentMap);
        setFaqs(fetchedFaqs);
        setActiveTab(newTabs[0] || '');
      } catch (error) {
        console.error('Error fetching level detail:', error);
      }
    };

    fetchData();
  }, [slug]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    sectionRefs.current[tabName]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const formatHTML = (html) => {
    if (!html) return '';
    return html.replace(/&nbsp;/g, ' ').replace(/<span[^>]*>|<\/span>/g, '');
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 px-3 py-3 md:px-8 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center text-sm text-gray-600 space-x-2">
          <Link to="/" className="flex items-center gap-1 hover:underline hover:text-blue-500">
            <Home size={18} /> Home
          </Link>
          <span>/</span>
          <Link to="/courses" className="flex items-center gap-1 hover:underline hover:text-blue-600">
            <Layers size={18} /> Course
          </Link>
          <span>/</span>
          <span className="capitalize font-medium">{formattedName}</span>
        </div>

        {/* Tabs */}
        <div className="sticky top-0 z-30 bg-blue-50/30 backdrop-blur-sm p-3 rounded-xl shadow-sm mb-8">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tabName) => (
              <button
                key={tabName}
                onClick={() => handleTabClick(tabName)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border shadow-sm transition-all ${
                  activeTab === tabName
                    ? 'text-blue-700 bg-white border-blue-300 ring-2 ring-blue-200'
                    : 'text-gray-700 bg-white hover:bg-blue-50 border-gray-200'
                }`}
              >
                {/* Use the ICON_MAP or a default icon */}
                {ICON_MAP[tabName] || <FileText size={16} />}
                {tabName}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">
          {/* Left Column */}
          <div className="space-y-10">
            {tabs.map((tabName, index) => {
              if (tabName === 'FAQs') {
                return (
                  <motion.div
                    key="FAQs"
                    ref={sectionRefs.current['FAQs']}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition duration-300"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                     <RelatedUniversities />
                    <h3 className="text-xl md:text-2xl font-semibold text-[#0E3C6E] border-l-4 border-blue-500 pl-3 mb-6">
                      Frequently Asked Questions (FAQs)
                    </h3>
                    <div className="space-y-4">
                      {faqs.map((faq, faqIndex) => (
                        <div key={faq.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                          <button
                            className="flex justify-between items-center w-full text-left font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200"
                            onClick={() => toggleFaq(faqIndex)}
                          >
                            <span className="text-lg">{faq.question}</span>
                            <ChevronDown
                              size={20}
                              className={`transform transition-transform duration-300 ${
                                openFaq === faqIndex ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {openFaq === faqIndex && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-2 text-gray-600 prose"
                              dangerouslySetInnerHTML={{
                                __html: formatHTML(faq.answer),
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              }
              // Existing content rendering for other tabs
              return (
                <motion.div
                  key={tabName}
                  ref={sectionRefs.current[tabName]}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {contentMap[tabName] ? (
                    <>
                      <h3 className="text-xl md:text-2xl font-semibold text-[#0E3C6E] border-l-4 border-blue-500 pl-3 mb-4">
                        {tabName}
                      </h3>
                      <div
                        className="prose prose-p:mb-4 prose-h4:font-semibold prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2 prose-p:text-gray-800 prose-p:text-base"
                        dangerouslySetInnerHTML={{
                          __html: formatHTML(contentMap[tabName]),
                        }}
                      />
                    </>
                  ) : (
                    <p className="text-gray-500">No info available for {tabName}.</p>
                  )}
                </motion.div>
              );
            })}

           
          </div>

          {/* Right Column (Sidebar) */}
          <div className="md:sticky md:top-24 h-fit space-y-6">
            <CatagoryTreandingCourse />
            <FeaturedUniversities />
            <GetInTouchForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LevelDetail;