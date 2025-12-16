import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Clock,
  GraduationCap,
  Building,
} from "lucide-react";

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

      <div className="max-w-3xl mx-auto px-4 relative z-10">
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
          {/* Header Section */}
          <div className="p-6 md:p-8 border-b border-gray-100 dark:border-slate-700">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                  {doctor.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {doctor.name}
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-slate-300 mt-3">
                  <div className="flex items-center">
                    <GraduationCap size={16} className="mr-1.5 text-blue-500" />
                    {doctor.education}
                  </div>
                  <div className="flex items-center">
                    <Star
                      size={16}
                      className="mr-1.5 text-orange-500 fill-orange-500"
                    />
                    {doctor.experience} Exp.
                  </div>
                  <div className="flex items-center">
                    <Building size={16} className="mr-1.5 text-gray-400" />
                    {doctor.hospital}
                  </div>
                </div>

                <div className="flex items-center mt-3 text-gray-500 dark:text-slate-400 text-sm">
                  <MapPin size={16} className="mr-1.5 text-gray-400 dark:text-slate-500" />
                  {doctor.location}
                </div>
              </div>

              {/* Fees Badge */}
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 px-5 py-3 rounded-xl text-center min-w-[100px]">
                <p className="text-xs text-green-600 dark:text-green-400 font-bold uppercase mb-1">
                  Consultation
                </p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                  ₹{doctor.fees}
                </p>
              </div>
            </div>
          </div>

          {/* Slots Section */}
          <div className="p-6 md:p-8 bg-gray-50/50 dark:bg-slate-700/30">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-5 flex items-center">
              <Clock size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
              Available Slots Today
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
              {doctor.slots.map((slot) => (
                <button
                  key={slot}
                  className="py-3 px-2 border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-slate-200 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:bg-blue-50 dark:focus:bg-blue-900/30 transition-all active:scale-95"
                >
                  {slot}
                </button>
              ))}
            </div>

            {/* Confirm Button */}
            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-[0.99]">
              Confirm Booking
            </button>
            <p className="text-center text-xs text-gray-400 dark:text-slate-400 mt-4">
              No payment required now. Pay at the clinic.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
