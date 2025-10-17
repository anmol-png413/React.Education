import React from 'react';
import { GraduationCap, Award, FileText, BookOpen, School } from 'lucide-react';

const UniversityCoursesCard = () => {
  const courses = [
    {
      id: 1,
      title: "Certificate Course in Malaysia",
      icon: Award,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      id: 2,
      title: "Diploma Course in Malaysia",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 3,
      title: "Bachelor Course in Malaysia",
      icon: GraduationCap,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 4,
      title: "Master Degree in Malaysia",
      icon: BookOpen,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      id: 5,
      title: "PHD Courses in Malaysia",
      icon: School,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-1">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3">
        {/* Simple Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Find Universities Courses</h1>

        {/* Courses List */}
        <div className="space-y-4">
          {courses.map((course) => {
            const IconComponent = course.icon;
            return (
              <div
                key={course.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className={`${course.bgColor} p-3 rounded-lg`}>
                  <IconComponent className={`w-6 h-6 ${course.color}`} />
                </div>
                <span className="text-md font-medium text-gray-700">{course.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UniversityCoursesCard;