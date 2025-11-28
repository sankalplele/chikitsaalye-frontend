import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Calendar, Clock } from "lucide-react";

export default function DoctorProfile() {
  const navigate = useNavigate();
  // Mock data for display
  const doctor = {
    name: "Dr. Rajesh Gupta",
    category: "General Physician",
    education: "MBBS, MD (Medicine)",
    experience: "12 Years",
    hospital: "City Care Clinic",
    location: "Civil Lines, Kanpur",
    fees: 500,
    slots: ["10:00 AM", "10:30 AM", "11:00 AM", "05:00 PM", "05:30 PM"],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 h-32 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-white"
        >
          <ArrowLeft />
        </button>
      </div>
      <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {doctor.name}
              </h1>
              <p className="text-blue-600 font-medium">{doctor.category}</p>
              <p className="text-gray-500 text-sm mt-1">
                {doctor.education} • {doctor.experience} Exp.
              </p>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg font-bold">
              ₹{doctor.fees}
            </div>
          </div>
        </div>

        <h2 className="font-bold text-lg mb-4 flex items-center">
          <Clock size={18} className="mr-2" /> Available Slots Today
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {doctor.slots.map((slot) => (
            <button
              key={slot}
              className="py-3 border border-blue-200 rounded-lg text-blue-700 font-semibold hover:bg-blue-50 focus:bg-blue-600 focus:text-white transition-colors"
            >
              {slot}
            </button>
          ))}
        </div>

        <button className="w-full mt-8 bg-orange-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg">
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
