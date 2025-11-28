import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Phone,
  Calendar,
  Shield,
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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <div className="bg-blue-900 text-white p-6 pt-10">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/20 p-2 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold mt-4">{hospital.name}</h1>
        <div className="flex items-center text-blue-200 text-sm mt-2">
          <MapPin size={16} className="mr-1" /> {hospital.location}
        </div>
        <div className="flex items-center text-green-300 text-sm mt-1 font-bold">
          <Shield size={16} className="mr-1" /> {hospital.type} • Free /
          Subsidized
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6">
        {/* Quick Actions Card */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">OPD Registration</p>
            <p className="text-lg font-bold text-green-600">₹50 (New)</p>
          </div>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-orange-600">
            Book Online Token
          </button>
        </div>

        {/* Departments List (Extracted from PDF) */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          OPD Schedule & Departments
        </h2>
        <div className="space-y-4">
          {hospital.departments.map((dept, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-blue-900 text-lg">{dept.name}</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                  {dept.location}
                </span>
              </div>

              {/* Doctors List */}
              {dept.doctors ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {dept.doctors.map((doc, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded"
                    >
                      <Calendar size={14} className="mr-2 text-blue-500" />
                      <span className="font-semibold w-20">{doc.days}:</span>
                      <span>{doc.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600 flex items-center">
                  <Clock size={14} className="mr-2" /> {dept.timings}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
