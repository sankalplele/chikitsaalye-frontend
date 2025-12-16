import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Calendar,
  Shield,
  Phone,
  Info,
} from "lucide-react";

// REAL DATA EXTRACTED FROM KGMU PDF
const KGMU_DATA = {
  id: "kgmu",
  name: "King George's Medical University",
  type: "Government (State University)",
  location: "Chowk, Lucknow, Uttar Pradesh 226003",
  contact: "0522-2257540",
  description:
    "Accredited A++ by NAAC. 120 Years of Excellence. One of the premier medical institutions in India.",
  departments: [
    {
      name: "General Medicine",
      location: "New OPD Block, Ground Floor",
      doctors: [
        { name: "Dr. S.C. Chaudhary", days: "Monday" },
        { name: "Dr. M.L. Patel", days: "Tuesday" },
        { name: "Dr. Virendra Atam", days: "Wednesday" },
        { name: "Dr. K.K. Gupta", days: "Thursday" },
      ],
    },
    {
      name: "Obstetrics & Gynaecology",
      location: "QMH (Queen Mary Hospital), Ground Floor",
      doctors: [
        { name: "Dr. Amita Pandey", days: "Monday" },
        { name: "Dr. Uma Singh", days: "Wednesday" },
        { name: "Dr. Nisha Singh", days: "Friday" },
      ],
    },
    {
      name: "Pediatrics",
      location: "New OPD Block, 3rd Floor",
      doctors: [
        { name: "Prof. Sarika Gupta", days: "Monday" },
        { name: "Prof. Sanjeev Verma", days: "Tuesday" },
        { name: "Prof. S.N. Singh", days: "Wednesday" },
      ],
    },
    {
      name: "General Surgery",
      location: "New OPD Block, 1st Floor",
      doctors: [
        { name: "Prof. A.A. Sonkar", days: "Monday" },
        { name: "Prof. Abhinav Arun Sonkar", days: "Thursday" },
      ],
    },
    {
      name: "Psychiatry",
      location: "Gate No 15, In front of Trauma Centre",
      timings: "9:00 AM - 2:00 PM (All Days)",
    },
  ],
};

export default function HospitalProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  // In real app, fetch(id) here. Using KGMU static data for demo.
  const hospital = KGMU_DATA;

  return (
    // 1. BACKGROUND & PADDING: Matches Landing/Search Pages
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:bg-slate-900 relative font-sans pt-28 pb-10 transition-colors duration-300">
      {/* Dark mode background overlay */}
      <div className="hidden dark:block absolute inset-0 bg-slate-900 pointer-events-none z-0" />
      
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none fixed z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* 2. NAVIGATION: Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-white transition-colors group"
        >
          <div className="p-2 bg-blue-100 dark:bg-slate-800/50 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-slate-700 mr-3 transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span className="font-medium">Back to Results</span>
        </button>

        {/* 3. MAIN CARD: White Background */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border-4 border-white/10 dark:border-slate-700/50 transition-colors duration-300">
          {/* HEADER SECTION */}
          <div className="p-6 md:p-8 border-b border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-700/30">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                    <Shield size={12} className="mr-1.5 fill-green-700" />
                    {hospital.type}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
                    Free / Subsidized
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                  {hospital.name}
                </h1>

                <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-slate-300 mt-3">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-gray-400 dark:text-slate-500" />
                    {hospital.location}
                  </div>
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-gray-400 dark:text-slate-500" />
                    {hospital.contact}
                  </div>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    <Info size={16} className="mr-2" />
                    {hospital.description}
                  </div>
                </div>
              </div>

              {/* ACTION BOX (Registration) */}
              <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 p-5 rounded-xl shadow-sm min-w-[240px] text-center">
                <p className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold tracking-wide mb-1">
                  OPD Registration
                </p>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
                  ₹50{" "}
                  <span className="text-sm font-medium text-gray-400 dark:text-slate-500">
                    (New)
                  </span>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold shadow-md transition-transform active:scale-95">
                  Book Online Token
                </button>
              </div>
            </div>
          </div>

          {/* DEPARTMENTS SECTION */}
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calendar size={22} className="mr-2 text-blue-600 dark:text-blue-400" />
              OPD Schedule & Departments
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {hospital.departments.map((dept, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                >
                  {/* Dept Header */}
                  <div className="bg-gray-50 dark:bg-slate-700/50 px-5 py-3 border-b border-gray-100 dark:border-slate-600 flex justify-between items-center flex-wrap gap-2">
                    <h3 className="font-bold text-blue-900 dark:text-blue-400 text-lg">
                      {dept.name}
                    </h3>
                    <span className="text-xs bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 px-2 py-1 rounded text-gray-500 dark:text-slate-400 flex items-center">
                      <MapPin size={12} className="mr-1" /> {dept.location}
                    </span>
                  </div>

                  {/* Doctors / Timings Grid */}
                  <div className="p-4 bg-white dark:bg-slate-800">
                    {dept.doctors ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {dept.doctors.map((doc, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-center text-sm p-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors group"
                          >
                            <span className="w-24 font-bold text-blue-600 dark:text-blue-400 uppercase text-xs tracking-wide">
                              {doc.days}
                            </span>
                            <span className="font-medium text-gray-700 dark:text-slate-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">
                              {doc.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center text-sm text-gray-600 dark:text-slate-300 bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-100 dark:border-orange-800">
                        <Clock size={16} className="mr-2 text-orange-500 dark:text-orange-400" />
                        <span className="font-medium">{dept.timings}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
