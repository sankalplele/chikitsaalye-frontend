import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Star,
  ArrowLeft,
  Building,
  Users,
  Thermometer,
  Microscope,
  ArrowUpDown,
  Home,
  CheckCircle,
  ChevronRight,
  Activity,
  Zap,
  Droplet,
} from "lucide-react";

// --- MOCK DATA ---
const LABS_DATA = [
  {
    id: "l1",
    name: "Dr. Lal PathLabs",
    location: "Civil Lines, Kanpur",
    distance: "1.2 km",
    rating: 4.5,
    homeCollection: true,
    tests: [
      { name: "CBC", price: 299 },
      { name: "Thyroid Profile", price: 550 },
      { name: "MRI Scan", price: 6500 },
    ],
  },
  {
    id: "l2",
    name: "Pathkind Diagnostics",
    location: "Swaroop Nagar",
    distance: "0.8 km",
    rating: 4.2,
    homeCollection: false,
    tests: [
      { name: "CBC", price: 250 },
      { name: "Thyroid Profile", price: 500 },
    ],
  },
];

const HOSPITAL_DATA = [
  {
    id: "kgmu",
    name: "KGMU Lucknow",
    type: "govt",
    specialties: ["General", "Ortho", "ENT", "Cardio", "Pediatrics", "Gynae"],
    location: "Chowk, Lucknow",
    distance: "85 km",
    rating: 4.8,
    fees: 50,
    queueStatus: "High",
    nextSlot: "OPD: 9 AM - 2 PM",
    facilities: ["Trauma Center", "Emergency", "Blood Bank", "Forensic"],
    image: "bg-blue-100",
  },
  {
    id: "h2",
    name: "Regency Hospital",
    type: "private",
    specialties: ["Cardio", "Neuro", "Multi-Speciality"],
    location: "Sarvodaya Nagar",
    distance: "3.5 km",
    rating: 4.6,
    fees: 600,
    queueStatus: "Low",
    nextSlot: "24 Hours",
    facilities: ["ICU", "MRI", "Pvt Ward", "Pharmacy"],
    image: "bg-purple-100",
  },
  {
    id: "h1",
    name: "Ursula Hospital",
    type: "govt",
    specialties: ["General", "Eye", "Ortho"],
    location: "Parade, Kanpur",
    distance: "2.1 km",
    rating: 4.0,
    fees: 5,
    queueStatus: "High",
    nextSlot: "OPD: 8 AM - 2 PM",
    facilities: ["X-Ray", "Emergency"],
    image: "bg-green-100",
  },
  {
    id: "h4",
    name: "Cardiology Institute (LPS)",
    type: "govt",
    specialties: ["Cardio", "Heart Surgery", "CTVS"],
    location: "Swaroop Nagar",
    distance: "3.0 km",
    rating: 4.5,
    fees: 0,
    queueStatus: "Moderate",
    nextSlot: "OPD: 9 AM - 1 PM",
    facilities: ["Cath Lab", "ICU", "ECG"],
    image: "bg-green-100",
  },
];

const DOCTOR_DATA = [
  {
    id: 1,
    name: "Dr. Rajesh Gupta",
    type: "private",
    category: "General Physician",
    location: "Civil Lines",
    distance: "1.2 km",
    rating: 4.8,
    fees: 500,
    nextSlot: "Today, 4:00 PM",
  },
  {
    id: 2,
    name: "Dr. Anjali Singh",
    type: "private",
    category: "Gynaecologist",
    location: "Kakadeo",
    distance: "4.0 km",
    rating: 4.9,
    fees: 600,
    nextSlot: "Today, 6:00 PM",
  },
  {
    id: 3,
    name: "Dr. V.K. Verma",
    type: "govt",
    category: "Orthopedics",
    location: "District Hospital",
    distance: "2.5 km",
    rating: 4.2,
    fees: 0,
    nextSlot: "Tomorrow, 9:00 AM",
  },
  {
    id: 4,
    name: "Dr. Priyanshi",
    type: "private",
    category: "Pediatrician",
    location: "Kidwai Nagar",
    distance: "5.0 km",
    rating: 4.8,
    fees: 400,
    nextSlot: "Today, 5:00 PM",
  },
  {
    id: 5,
    name: "Dr. Sharma",
    type: "private",
    category: "Cardiologist",
    location: "Swaroop Nagar",
    distance: "3.2 km",
    rating: 4.7,
    fees: 800,
    nextSlot: "Tomorrow, 11:00 AM",
  },
  {
    id: 6,
    name: "Dr. Amit Kumar",
    type: "govt",
    category: "Dentist",
    location: "LLR Hospital",
    distance: "3.0 km",
    rating: 4.0,
    fees: 0,
    nextSlot: "Tomorrow, 10:00 AM",
  },
  {
    id: 7,
    name: "Dr. Sunita Mehta",
    type: "private",
    category: "Eye Specialist",
    location: "Gumti No. 5",
    distance: "2.8 km",
    rating: 4.6,
    fees: 300,
    nextSlot: "Today, 7:00 PM",
  },
  {
    id: 8,
    name: "Dr. Sunita Mehta",
    type: "private",
    category: "Eye Specialist",
    location: "Gumti No. 5",
    distance: "2.8 km",
    rating: 4.6,
    fees: 300,
    nextSlot: "Today, 7:00 PM",
  },
  {
    id: 9,
    name: "Dr. Sunita Mehta",
    type: "govt",
    category: "Eye Specialist",
    location: "Gumti No. 5",
    distance: "2.8 km",
    rating: 4.6,
    fees: 300,
    nextSlot: "Today, 7:00 PM",
  },
];

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("distance");
  const [showHomeCollectionOnly, setShowHomeCollectionOnly] = useState(false);

  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "doctors";
  const categoryParam = searchParams.get("category");

  let activeData =
    type === "hospitals"
      ? HOSPITAL_DATA
      : type === "labs"
      ? LABS_DATA
      : DOCTOR_DATA;

  // --- FILTERING LOGIC ---
  const getTestPrice = (lab) => {
    if (!query) return 0;
    const searchStr = query.toLowerCase();
    const test = lab.tests?.find((t) => {
      const testName = t.name.toLowerCase();
      return testName.includes(searchStr) || searchStr.includes(testName);
    });
    return test ? test.price : 0;
  };

  const filteredResults = activeData
    .filter((item) => {
      // 1. Tag/Category Filter
      if (categoryParam) {
        const cat = categoryParam.toLowerCase();
        const keywords = item.specialties || [item.category];
        const normalizedKeywords = keywords
          .map((k) => k.toLowerCase())
          .join(" ");

        const tagMap = {
          cardio: "cardio",
          heart: "cardio",
          baby: "pediatric", // pediatrician matches
          gynae: "gynaecologist",
          ortho: "orthopedics",
          eye: "eye",
          dental: "dentist",
          general: "general",
        };

        const targetKeyword = tagMap[cat] || cat;
        if (!normalizedKeywords.includes(targetKeyword)) return false;
      }

      // 2. Text Search
      if (query) {
        const lowerQ = query.toLowerCase();
        const nameMatch = item.name.toLowerCase().includes(lowerQ);
        const testMatch =
          type === "labs" &&
          item.tests?.some((t) => t.name.toLowerCase().includes(lowerQ));

        if (!nameMatch && !testMatch) return false;
      }

      // 3. Type Filter
      if (type !== "labs" && filterType !== "all" && item.type !== filterType)
        return false;

      // 4. Lab Filters
      if (type === "labs") {
        if (showHomeCollectionOnly && !item.homeCollection) return false;
        if (query && getTestPrice(item) === 0) return false; // Hide labs that don't have the test if searching for test
      }

      return true;
    })
    .sort((a, b) => {
      if (type === "labs" && sortBy === "priceLow") {
        return getTestPrice(a) - getTestPrice(b);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4 max-w-3xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-blue-900 capitalize">
              {categoryParam
                ? `${categoryParam} Specialists`
                : query || `All ${type}`}
            </h1>
          </div>
        </div>

        {/* --- RESTORED FILTER TOGGLES --- */}
        <div className="max-w-3xl mx-auto mt-4 flex items-center space-x-3 overflow-x-auto pb-1 hide-scrollbar">
          {type === "labs" ? (
            // Lab Filters
            <>
              <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1.5 border border-gray-200">
                <ArrowUpDown size={14} className="text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
                >
                  <option value="distance">Nearest First</option>
                  <option value="priceLow">Price: Low to High</option>
                </select>
              </div>
              <button
                onClick={() =>
                  setShowHomeCollectionOnly(!showHomeCollectionOnly)
                }
                className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center space-x-2 transition-colors ${
                  showHomeCollectionOnly
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700"
                }`}
              >
                <Home size={14} />
                <span>Home Collection</span>
              </button>
            </>
          ) : (
            // Doctor/Hospital Filters (Govt/Private)
            <>
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filterType === "all"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                All
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
                <span>Sarkari / Free</span>
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
                <span>Private / Fast</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {filteredResults.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              if (type === "hospitals") navigate(`/hospital/${item.id}`);
              else if (type === "labs") navigate(`/lab/${item.id}`);
              else navigate(`/doctor/${item.id}`);
            }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative"
          >
            {/* RENDER CARD CONTENT BASED ON TYPE */}
            <div className="flex">
              {/* --- RESTORED COLOR STRIPE FOR DOCTORS/HOSPITALS --- */}
              {type !== "labs" && (
                <div
                  className={`w-1.5 ${
                    item.type === "govt" ? "bg-green-500" : "bg-purple-500"
                  }`}
                ></div>
              )}

              <div className="p-4 flex-1 flex">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 ${
                    type === "govt" ? "bg-green-50" : "bg-blue-50"
                  }`}
                >
                  {type === "labs" ? (
                    <Microscope className="text-blue-600" />
                  ) : (
                    <Building className="text-blue-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {/* --- RESTORED VISUAL BADGES (TAGS) --- */}
                  {type !== "labs" && (
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 ${
                        item.type === "govt"
                          ? "bg-green-100 text-green-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {item.type === "govt"
                        ? "Govt • Low Cost"
                        : "Private • Verified"}
                    </span>
                  )}

                  <h2 className="font-bold text-gray-900 truncate">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600 flex items-center mt-0.5">
                    <MapPin size={12} className="mr-1" /> {item.location}
                  </p>

                  {/* Lab Specific Logic */}
                  {type === "labs" ? (
                    <div className="mt-2">
                      {query &&
                      item.tests.find((t) =>
                        t.name.toLowerCase().includes(query.toLowerCase())
                      ) ? (
                        <span className="text-blue-800 font-bold text-lg">
                          ₹
                          {
                            item.tests.find((t) =>
                              t.name.toLowerCase().includes(query.toLowerCase())
                            ).price
                          }
                        </span>
                      ) : (
                        <span className="text-orange-600 text-xs font-bold flex items-center">
                          View Test List <ChevronRight size={14} />
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="mt-2 flex gap-2 overflow-hidden">
                      {/* Doctor/Hospital Specialties Pills */}
                      {item.specialties ? (
                        item.specialties.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600 whitespace-nowrap"
                          >
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">
                          {item.category}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredResults.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
}
