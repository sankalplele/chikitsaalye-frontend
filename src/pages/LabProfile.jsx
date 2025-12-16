import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Microscope,
  CheckCircle,
  Star,
  Plus,
} from "lucide-react";

// MOCK FULL DATABASE FOR LAB
const LAB_DETAILS = {
  id: "l1",
  name: "Dr. Lal PathLabs",
  location: "Civil Lines, Kanpur",
  rating: 4.5,
  homeCollection: true,
  fullTestMenu: [
    { name: "CBC (Complete Blood Count)", price: 299, category: "Hematology" },
    { name: "Thyroid Profile (Total)", price: 550, category: "Biochemistry" },
    { name: "Lipid Profile", price: 600, category: "Biochemistry" },
    { name: "Liver Function Test (LFT)", price: 800, category: "Biochemistry" },
    {
      name: "Kidney Function Test (KFT)",
      price: 900,
      category: "Biochemistry",
    },
    { name: "HbA1c", price: 450, category: "Diabetes" },
    { name: "Vitamin D Total", price: 1200, category: "Vitamins" },
    { name: "Vitamin B12", price: 1100, category: "Vitamins" },
    { name: "MRI Brain", price: 6500, category: "Radiology" },
    { name: "CT Scan Chest", price: 3500, category: "Radiology" },
  ],
};

export default function LabProfile() {
  const navigate = useNavigate();
  const [testSearch, setTestSearch] = useState("");
  const lab = LAB_DETAILS;

  // Filter tests inside the profile
  const filteredTests = lab.fullTestMenu.filter((t) =>
    t.name.toLowerCase().includes(testSearch.toLowerCase())
  );

  return (
    // 1. BACKGROUND: Matches theme
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:bg-slate-900 relative font-sans pt-28 pb-20 transition-colors duration-300">
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

        {/* 3. LAB HEADER CARD */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border-4 border-white/10 dark:border-slate-700/50 mb-6 transition-colors duration-300">
          <div className="p-6 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {lab.name}
              </h1>
              <p className="text-gray-500 dark:text-slate-400 text-sm mb-3">{lab.location}</p>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">
                  <Star size={12} className="mr-1 fill-yellow-700" />{" "}
                  {lab.rating}
                </span>
                {lab.homeCollection && (
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                    <CheckCircle size={12} className="mr-1" /> Home Collection
                  </span>
                )}
              </div>
            </div>
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
              <Microscope size={28} />
            </div>
          </div>

          {/* Search Bar inside Card */}
          <div className="px-6 pb-6 bg-gray-50 dark:bg-slate-700/30 pt-4 border-t border-gray-100 dark:border-slate-700">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search for a test in this lab..."
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500"
                value={testSearch}
                onChange={(e) => setTestSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 4. TEST LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-blue-700 dark:text-slate-300 px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Available Tests ({filteredTests.length})
            </h2>
          </div>

          {filteredTests.map((test, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border-l-4 border-orange-500 dark:border-orange-400 flex justify-between items-center hover:scale-[1.01] transition-transform"
            >
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">{test.name}</h3>
                <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-slate-400 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded mt-1 inline-block">
                  {test.category}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-1">
                  ₹{test.price}
                </p>
                <button className="text-xs font-bold text-white bg-blue-900 dark:bg-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-800 dark:hover:bg-blue-600 flex items-center ml-auto">
                  <Plus size={14} className="mr-1" /> Add
                </button>
              </div>
            </div>
          ))}

          {filteredTests.length === 0 && (
            <div className="text-center py-10 bg-blue-50 dark:bg-slate-800/50 rounded-xl border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-slate-300">
              No tests found matching "{testSearch}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
