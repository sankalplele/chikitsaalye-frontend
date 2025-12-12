import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  ArrowLeft,
  Building,
  Microscope,
  ArrowUpDown,
  Home,
  ChevronRight,
  Star,
  Search,
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
      { name: "Complete Blood Count", price: 299 },
      { name: "Thyroid Profile", price: 550 },
      { name: "Lipid Profile", price: 600 },
      { name: "HbA1c", price: 450 },
      { name: "Sugar Test", price: 450 },
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
      { name: "Lipid Profile", price: 650 },
      { name: "HbA1c", price: 400 },
    ],
  },
  {
    id: "l3",
    name: "City X-Ray & Scan",
    location: "Kakadeo",
    distance: "3.5 km",
    rating: 4.0,
    homeCollection: true,
    tests: [
      { name: "CBC", price: 350 },
      { name: "MRI Scan", price: 4500 },
      { name: "CT Scan", price: 2200 },
    ],
  },
];

const HOSPITAL_DATA = [
  {
    id: "kgmu",
    name: "King George's Medical University (KGMU)",
    type: "govt",
    specialties: ["General", "Ortho", "ENT", "Cardio", "Pediatrics", "Gynae"],
    location: "Chowk, Lucknow",
    distance: "85 km",
    rating: 4.8,
    fees: 50,
    queueStatus: "High",
    nextSlot: "OPD: 9 AM - 2 PM",
    facilities: ["Trauma Center", "Emergency", "Blood Bank", "Forensic"],
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
      // 1. Tag/Category Filter (Safeguarded for Labs)
      if (categoryParam) {
        const cat = categoryParam.toLowerCase();
        // SAFEGUARD: Default to empty array if properties don't exist
        const keywords =
          item.specialties || (item.category ? [item.category] : []);
        const normalizedKeywords = keywords
          .map((k) => k.toLowerCase())
          .join(" ");

        const tagMap = {
          cardio: "cardio",
          heart: "cardio",
          baby: "pediatric",
          gynae: "gynaecologist",
          ortho: "orthopedics",
          eye: "eye",
          dental: "dentist",
          general: "general",
        };

        const targetKeyword = tagMap[cat] || cat;
        // If keywords string is empty, it won't match, which is correct for Labs in Doctor categories
        if (!normalizedKeywords.includes(targetKeyword)) return false;
      }

      // 2. Text Search
      if (query) {
        const lowerQ = query.toLowerCase();
        const nameMatch = item.name.toLowerCase().includes(lowerQ);
        const testMatch =
          type === "labs" &&
          item.tests?.some((t) => {
            const testName = t.name.toLowerCase();
            return testName.includes(lowerQ) || lowerQ.includes(testName);
          });

        if (!nameMatch && !testMatch) return false;
      }

      // 3. Type Filter
      if (type !== "labs" && filterType !== "all" && item.type !== filterType)
        return false;

      // 4. Lab Filters
      if (type === "labs") {
        if (showHomeCollectionOnly && !item.homeCollection) return false;
        const isLabNameSearch = item.name
          .toLowerCase()
          .includes(query.toLowerCase());
        if (!isLabNameSearch && query && getTestPrice(item) === 0) return false;
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
    // PT-24 to push content below Navbar
    <div className="min-h-screen bg-blue-900 relative font-sans pt-24 pb-20">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none fixed"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* --- PAGE HEADER & FILTERS --- */}
      <div className="max-w-3xl mx-auto px-4 mb-6 relative z-10">
        {/* Breadcrumb / Back Navigation */}
        <div className="flex items-center space-x-3 mb-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <p className="text-xs text-blue-200 font-bold uppercase tracking-wide">
              Search Results
            </p>
            <h1 className="text-2xl font-bold text-white capitalize truncate">
              {categoryParam
                ? `${categoryParam} Specialists`
                : query || `All ${type}`}
            </h1>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex items-center space-x-3 overflow-x-auto pb-2 hide-scrollbar">
          {type === "labs" ? (
            <>
              <div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1.5 border border-white/10">
                <ArrowUpDown size={14} className="text-blue-200" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer [&>option]:text-gray-900"
                >
                  <option value="distance">Nearest First</option>
                  <option value="priceLow">Price: Low to High</option>
                </select>
              </div>
              <button
                onClick={() =>
                  setShowHomeCollectionOnly(!showHomeCollectionOnly)
                }
                className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center space-x-2 transition-colors border ${
                  showHomeCollectionOnly
                    ? "bg-orange-500 border-orange-500 text-white shadow-lg"
                    : "bg-white/5 border-white/20 text-blue-100 hover:bg-white/10"
                }`}
              >
                <Home size={14} />
                <span>Home Collection</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                  filterType === "all"
                    ? "bg-white text-blue-900 border-white shadow-lg"
                    : "bg-white/5 text-blue-100 border-white/10 hover:bg-white/10"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType("govt")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center space-x-2 transition-colors border ${
                  filterType === "govt"
                    ? "bg-green-500 text-white border-green-500 shadow-lg"
                    : "bg-white/5 text-blue-100 border-white/10 hover:bg-white/10"
                }`}
              >
                <Building size={14} />
                <span>Sarkari / Free</span>
              </button>
              <button
                onClick={() => setFilterType("private")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center space-x-2 transition-colors border ${
                  filterType === "private"
                    ? "bg-purple-500 text-white border-purple-500 shadow-lg"
                    : "bg-white/5 text-blue-100 border-white/10 hover:bg-white/10"
                }`}
              >
                <Star size={14} />
                <span>Private</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* --- RESULTS LIST --- */}
      <div className="max-w-3xl mx-auto px-4 space-y-4 relative z-10">
        {filteredResults.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              if (type === "hospitals") navigate(`/hospital/${item.id}`);
              else if (type === "labs") navigate(`/lab/${item.id}`);
              else navigate(`/doctor/${item.id}`);
            }}
            className="bg-white rounded-xl shadow-xl overflow-hidden hover:scale-[1.01] transition-all duration-200 cursor-pointer border-r-4 border-b-4 border-black/5"
          >
            <div className="flex">
              {/* Color Stripe - ADDED ORANGE STRIPE FOR LABS */}
              <div
                className={`w-1.5 ${
                  type === "labs"
                    ? "bg-orange-500"
                    : item.type === "govt"
                    ? "bg-green-500"
                    : "bg-purple-500"
                }`}
              ></div>

              <div className="p-4 flex-1 flex">
                {/* Icon Box */}
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
                  {/* Badge - ADDED BADGE FOR LABS */}
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 ${
                      type === "labs"
                        ? "bg-orange-100 text-orange-700"
                        : item.type === "govt"
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {type === "labs"
                      ? "Diagnostics • Verified"
                      : item.type === "govt"
                      ? "Govt • Low Cost"
                      : "Private • Verified"}
                  </span>

                  <h2 className="font-bold text-gray-900 truncate text-lg">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600 flex items-center mt-0.5">
                    <MapPin size={12} className="mr-1" /> {item.location}
                  </p>

                  {/* Lab Specific Logic */}
                  {type === "labs" ? (
                    <div className="mt-2">
                      {query && getTestPrice(item) > 0 ? (
                        <div className="bg-green-50 inline-block px-3 py-1 rounded-lg border border-green-100">
                          <p className="text-[10px] text-green-700 uppercase font-bold">
                            Best Price For {query}
                          </p>
                          <span className="text-green-800 font-bold text-lg leading-tight">
                            ₹{getTestPrice(item)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-orange-600 text-xs font-bold flex items-center mt-2 group">
                          View Test List{" "}
                          <ChevronRight
                            size={14}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="mt-2 flex gap-2 overflow-hidden">
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
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-blue-200" />
            </div>
            <h3 className="text-white text-xl font-bold">No results found</h3>
            <p className="text-blue-200 mt-2">
              Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
