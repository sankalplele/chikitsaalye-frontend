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
    id: "kgmu", // KGMU ID
    name: "King George's Medical University (KGMU)",
    type: "govt",
    specialties: ["General", "Ortho", "ENT", "Cardio", "Pediatrics"],
    location: "Chowk, Lucknow",
    distance: "85 km from Kanpur",
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
    specialties: ["Cardio", "Neuro"],
    location: "Sarvodaya Nagar",
    distance: "3.5 km",
    rating: 4.6,
    fees: 600,
    queueStatus: "Low",
    nextSlot: "24 Hours",
    facilities: ["ICU", "MRI"],
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
    location: "KGMU",
    distance: "2.5 km",
    rating: 4.2,
    fees: 0,
    nextSlot: "Tomorrow, 9:00 AM",
  },
];

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("all");

  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "doctors";
  const categoryParam = searchParams.get("category"); // FIX: Read category from URL

  let activeData =
    type === "hospitals"
      ? HOSPITAL_DATA
      : type === "labs"
      ? LABS_DATA
      : DOCTOR_DATA;

  // --- FILTERING LOGIC ---
  const filteredResults = activeData.filter((item) => {
    // 1. Tag/Category Filter (e.g. Heart, Baby)
    if (categoryParam) {
      const cat = categoryParam.toLowerCase();
      // Map tags to actual data keywords
      const keywords = item.specialties || [item.category];
      const normalizedKeywords = keywords.map((k) => k.toLowerCase()).join(" ");

      const tagMap = {
        cardio: "cardio",
        heart: "cardio",
        baby: "pediatrics",
        gynae: "gynaecologist",
        ortho: "orthopedics",
        eye: "ophthalmologist",
        dental: "dentist",
      };

      const targetKeyword = tagMap[cat] || cat;
      if (!normalizedKeywords.includes(targetKeyword)) return false;
    }

    // 2. Text Search Filter
    if (query) {
      const lowerQ = query.toLowerCase();
      const nameMatch = item.name.toLowerCase().includes(lowerQ);
      // For labs: also match if they have the test
      const testMatch =
        type === "labs" &&
        item.tests?.some((t) => t.name.toLowerCase().includes(lowerQ));

      if (!nameMatch && !testMatch) return false;
    }

    // 3. Type Filter (Govt/Pvt)
    if (type !== "labs" && filterType !== "all" && item.type !== filterType)
      return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header (Simplified for brevity) */}
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
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {filteredResults.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              // CLICK HANDLER: Navigate to specific profile page
              if (type === "hospitals") navigate(`/hospital/${item.id}`);
              else if (type === "labs") navigate(`/lab/${item.id}`);
              else navigate(`/doctor/${item.id}`);
            }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative"
          >
            {/* RENDER CARD CONTENT BASED ON TYPE */}
            <div className="p-4 flex">
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center mr-4 ${
                  type === "govt" ? "bg-green-50" : "bg-blue-50"
                }`}
              >
                {type === "labs" ? (
                  <Microscope className="text-blue-600" />
                ) : (
                  <Building className="text-blue-600" />
                )}
              </div>

              <div className="flex-1">
                <h2 className="font-bold text-gray-900">{item.name}</h2>
                <p className="text-sm text-gray-600">{item.location}</p>

                {/* Lab Specific: Show matched test price or "View Profile" */}
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
                  <div className="mt-2 flex gap-2">
                    {item.specialties?.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="text-[10px] bg-gray-100 px-2 py-1 rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
