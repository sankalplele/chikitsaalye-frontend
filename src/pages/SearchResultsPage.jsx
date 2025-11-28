import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Star,
  Filter,
  ArrowLeft,
  CheckCircle,
  Building,
} from "lucide-react";

// MOCK DATA - In a real app, this comes from an API
const MOCK_RESULTS = [
  {
    id: 1,
    name: "Dr. Rajesh Gupta",
    type: "private",
    category: "General Physician",
    location: "Civil Lines, Kanpur",
    distance: "1.2 km",
    rating: 4.8,
    reviews: 120,
    fees: 500,
    nextSlot: "Today, 4:00 PM",
    verified: true,
  },
  {
    id: 2,
    name: "District Government Hospital",
    type: "govt",
    category: "Multi-Speciality",
    location: "Mall Road, Kanpur",
    distance: "3.5 km",
    rating: 4.2,
    reviews: 450,
    fees: 0,
    nextSlot: "Tomorrow, 9:00 AM",
    verified: true,
    queueStatus: "Moderate",
  },
  {
    id: 3,
    name: "Care Plus Diagnostic Lab",
    type: "private",
    category: "Pathology Lab",
    location: "Swaroop Nagar, Kanpur",
    distance: "0.8 km",
    rating: 4.5,
    reviews: 89,
    fees: 300,
    nextSlot: "Open Now",
    verified: true,
  },
  {
    id: 4,
    name: "Dr. Anjali Singh",
    type: "private",
    category: "Gynaecologist",
    location: "Kakadeo, Kanpur",
    distance: "4.0 km",
    rating: 4.9,
    reviews: 210,
    fees: 600,
    nextSlot: "Today, 6:00 PM",
    verified: true,
  },
  {
    id: 5,
    name: "Ursula Horsman Hospital",
    type: "govt",
    category: "General Hospital",
    location: "Parade, Kanpur",
    distance: "2.1 km",
    rating: 4.0,
    reviews: 1200,
    fees: 5,
    nextSlot: "Tomorrow, 8:00 AM",
    verified: true,
    queueStatus: "High",
  },
];

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("all"); // 'all', 'govt', 'private'

  // Get queries from URL
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "Doctors";

  // Filter Logic
  const filteredResults = MOCK_RESULTS.filter((item) => {
    if (filterType === "all") return true;
    return item.type === filterType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase font-semibold">
                Searching for
              </p>
              <h1 className="text-lg font-bold text-blue-900 capitalize">
                {query ? query : type} in Kanpur
              </h1>
            </div>
          </div>

          {/* Filter Toggles (Govt vs Pvt) */}
          <div className="flex items-center space-x-3 mt-4 overflow-x-auto pb-1 hide-scrollbar">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filterType === "all"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              All Results
            </button>
            <button
              onClick={() => setFilterType("govt")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center space-x-2 transition-colors ${
                filterType === "govt"
                  ? "bg-green-600 text-white"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              <Building size={14} />
              <span>Government (Free/Subsidized)</span>
            </button>
            <button
              onClick={() => setFilterType("private")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center space-x-2 transition-colors ${
                filterType === "private"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-50 text-purple-700 border border-purple-200"
              }`}
            >
              <Star size={14} />
              <span>Private (Verified)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <p className="text-sm text-gray-500">
          Showing {filteredResults.length} verified results nearby
        </p>

        {filteredResults.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => alert(`Redirecting to detail page for ${item.name}`)}
          >
            <div className="flex">
              {/* Color Stripe based on Type */}
              <div
                className={`w-2 ${
                  item.type === "govt" ? "bg-green-500" : "bg-purple-500"
                }`}
              ></div>

              <div className="p-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    {/* Badge */}
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${
                        item.type === "govt"
                          ? "bg-green-100 text-green-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {item.type === "govt" ? "Government" : "Private"}
                    </span>
                    <h2 className="text-lg font-bold text-gray-900 leading-tight">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 text-sm">{item.category}</p>
                  </div>
                  <div className="bg-blue-50 px-2 py-1 rounded text-blue-800 text-sm font-bold flex items-center">
                    <Star size={12} className="mr-1 fill-current" />
                    {item.rating}
                  </div>
                </div>

                {/* Location & Slot */}
                <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin size={14} className="mr-1" />
                    {item.location} •{" "}
                    <span className="text-blue-600 font-medium">
                      {item.distance}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm bg-gray-50 px-2 py-1 rounded">
                    <Clock size={14} className="mr-1" />
                    {item.nextSlot}
                  </div>
                </div>

                {/* Footer / Action */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 block">
                      Consultation Fee
                    </span>
                    <span
                      className={`font-bold ${
                        item.fees === 0 ? "text-green-600" : "text-gray-900"
                      }`}
                    >
                      {item.fees === 0 ? "FREE" : `₹${item.fees}`}
                    </span>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              No results found
            </h3>
            <p className="text-gray-500">
              Try changing filters or search for something else.
            </p>
            <button
              onClick={() => setFilterType("all")}
              className="mt-4 text-blue-600 font-medium hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
