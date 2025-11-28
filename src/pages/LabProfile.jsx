import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Microscope, CheckCircle } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-gray-600"
          >
            <ArrowLeft size={16} className="mr-1" /> Back
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-blue-900">{lab.name}</h1>
              <p className="text-gray-600 text-sm">{lab.location}</p>
              {lab.homeCollection && (
                <span className="inline-flex items-center mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                  <CheckCircle size={12} className="mr-1" /> Home Collection
                  Available
                </span>
              )}
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              <Microscope size={24} />
            </div>
          </div>

          {/* Search within Lab */}
          <div className="mt-6 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search for a test in this lab..."
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={testSearch}
              onChange={(e) => setTestSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Test List */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-sm font-bold text-gray-500 uppercase mb-3">
          Available Tests ({filteredTests.length})
        </h2>
        <div className="space-y-3">
          {filteredTests.map((test, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-center shadow-sm"
            >
              <div>
                <h3 className="font-bold text-gray-800">{test.name}</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {test.category}
                </span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-900">₹{test.price}</p>
                <button className="text-xs font-bold text-white bg-orange-500 px-4 py-2 rounded mt-1 shadow-sm hover:bg-orange-600">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
