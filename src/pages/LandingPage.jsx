import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Calendar,
  MapPin,
  FileText,
  Ambulance,
  AlertCircle,
  Building,
  User,
  Star,
  X,
  Microscope,
  TestTube,
  Shield,
  CheckCircle,
  Stethoscope,
  Heart,
  Activity,
  Smile,
  Eye,
  Baby,
} from "lucide-react";

// --- 1. SEARCH DATABASE WITH TESTS ---
const SEARCH_DATABASE = [
  // DOCTORS
  {
    id: "d1",
    name: "Dr. Rajesh Gupta",
    type: "private",
    category: "General Physician",
    rating: 4.8,
    kind: "doctor",
  },
  {
    id: "d2",
    name: "Dr. Anjali Singh",
    type: "private",
    category: "Gynaecologist",
    rating: 4.9,
    kind: "doctor",
  },
  {
    id: "d3",
    name: "Dr. V.K. Verma",
    type: "govt",
    category: "Orthopedics",
    rating: 4.2,
    kind: "doctor",
  },
  {
    id: "d4",
    name: "Dr. Sharma",
    type: "private",
    category: "Cardiologist",
    rating: 4.7,
    kind: "doctor",
  },
  {
    id: "d5",
    name: "Dr. Priyanshi",
    type: "private",
    category: "Pediatrician",
    rating: 4.8,
    kind: "doctor",
  },
  {
    id: "d6",
    name: "Dr. Amit Kumar",
    type: "govt",
    category: "Dentist",
    rating: 4.0,
    kind: "doctor",
  },
  {
    id: "d7",
    name: "Dr. Sunita Mehta",
    type: "private",
    category: "Eye Specialist",
    rating: 4.6,
    kind: "doctor",
  },

  // HOSPITALS
  {
    id: "h1",
    name: "Ursula Hospital",
    type: "govt",
    category: "General Hospital",
    rating: 4.0,
    kind: "hospital",
  },
  {
    id: "h2",
    name: "Regency Hospital",
    type: "private",
    category: "Multi-Speciality",
    rating: 4.6,
    kind: "hospital",
  },
  {
    id: "kgmu",
    name: "KGMU Lucknow",
    type: "govt",
    category: "Medical College",
    rating: 4.8,
    kind: "hospital",
  },
  {
    id: "h4",
    name: "Cardiology Institute",
    type: "govt",
    category: "Heart Center",
    rating: 4.5,
    kind: "hospital",
  },

  // LABS & TESTS
  {
    id: "l1",
    name: "Dr. Lal PathLabs",
    type: "private",
    category: "Lab",
    rating: 4.5,
    kind: "lab",
  },
  {
    id: "l2",
    name: "Pathkind Diagnostics",
    type: "private",
    category: "Lab",
    rating: 4.2,
    kind: "lab",
  },
  {
    id: "t1",
    name: "CBC (Complete Blood Count)",
    category: "Blood Test",
    kind: "test",
  },
  {
    id: "t2",
    name: "Thyroid Profile (T3, T4, TSH)",
    category: "Hormone Test",
    kind: "test",
  },
  { id: "t3", name: "Lipid Profile", category: "Heart Test", kind: "test" },
  { id: "t4", name: "MRI Scan", category: "Radiology", kind: "test" },
  { id: "t5", name: "HbA1c", category: "Diabetes", kind: "test" },
];

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("doctors");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // --- SMART SEARCH LOGIC ---
  useEffect(() => {
    if (searchQuery.length > 0 && !isEmergency) {
      const lowerQuery = searchQuery.toLowerCase();

      const matches = SEARCH_DATABASE.filter((item) => {
        const textMatch = item.name.toLowerCase().includes(lowerQuery);

        // CONTEXT AWARE FILTERING
        if (activeTab === "doctors") return textMatch && item.kind === "doctor";
        if (activeTab === "hospitals")
          return textMatch && item.kind === "hospital";

        // IMPORTANT: If Lab tab is active, show Labs AND Tests
        if (activeTab === "labs")
          return textMatch && (item.kind === "lab" || item.kind === "test");

        return false;
      });

      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery, isEmergency, activeTab]);

  const handleSearch = () => {
    if (isEmergency) return alert("Connecting to 108...");
    navigate(`/search?type=${activeTab}&q=${searchQuery}`);
  };

  const handleSuggestionClick = (item) => {
    let urlType = "doctors";
    if (item.kind === "hospital") urlType = "hospitals";
    if (item.kind === "lab" || item.kind === "test") urlType = "labs";

    // If it's a test, we pass it as the query so the results page can filter by it
    navigate(`/search?type=${urlType}&q=${item.name}`);
    setShowSuggestions(false);
  };
  const handleCategoryClick = (categoryId) => {
    // Force navigation to doctors tab with the specific category
    navigate(`/search?type=doctors&category=${categoryId}`);
  };

  const getSuggestionIcon = (kind) => {
    if (kind === "doctor") return <User size={18} />;
    if (kind === "hospital") return <Building size={18} />;
    if (kind === "test") return <TestTube size={18} />; // Icon for tests
    return <Microscope size={18} />;
  };

  // --- RENDER HELPERS ---
  const categories = [
    { icon: Stethoscope, label: "General", id: "general" },
    { icon: Baby, label: "Women/Gynae", id: "gynae" },
    { icon: Heart, label: "Heart", id: "cardio" },
    { icon: Activity, label: "Bone/Ortho", id: "ortho" },
    { icon: Smile, label: "Dental", id: "dental" },
    { icon: Eye, label: "Eye/Vision", id: "eye" },
  ];

  return (
    <div
      className="min-h-screen bg-white"
      onClick={() => setShowSuggestions(false)}
    >
      {/* EMERGENCY BAR (Keep existing code) */}
      <div className="bg-red-50 border-b border-red-100 p-2">
        <div className="max-w-7xl mx-auto flex justify-between px-4 items-center">
          <div className="flex items-center text-red-700 text-sm font-bold">
            <AlertCircle size={16} className="mr-2" />
            Emergency Mode
          </div>
          <button
            onClick={() => setIsEmergency(!isEmergency)}
            className="text-xs font-bold text-red-600 bg-white px-3 py-1 rounded border border-red-200"
          >
            Toggle
          </button>
        </div>
      </div>

      <section
        className={`py-12 sm:py-20 ${
          isEmergency
            ? "bg-red-50"
            : "bg-gradient-to-br from-blue-50 via-white to-blue-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1
              className={`text-3xl font-bold mb-4 ${
                isEmergency ? "text-red-700" : "text-blue-900"
              }`}
            >
              {isEmergency
                ? "Emergency Services"
                : "Health Services for Bharat"}
            </h1>
          </div>

          <div
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-4 sm:p-6 border border-gray-100 relative z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* TABS */}
            {!isEmergency && (
              <div className="flex flex-wrap gap-2 mb-4 border-b pb-4">
                {["doctors", "hospitals", "labs"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setSearchQuery("");
                    }}
                    className={`px-6 py-3 rounded-lg font-semibold capitalize transition-all ${
                      activeTab === tab
                        ? "bg-blue-900 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}

            {/* INPUT */}
            <div className="flex flex-col sm:flex-row gap-3 relative">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {activeTab === "labs" && !isEmergency ? (
                    <Microscope size={20} />
                  ) : (
                    <Search size={20} />
                  )}
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  // DYNAMIC PLACEHOLDER BASED ON TAB
                  placeholder={
                    isEmergency
                      ? "Location..."
                      : activeTab === "labs"
                      ? "Search for tests (e.g. CBC, Thyroid, MRI)..."
                      : `Search for ${activeTab}...`
                  }
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-900 focus:outline-none"
                  onFocus={() =>
                    searchQuery.length > 0 && setShowSuggestions(true)
                  }
                />

                {/* SUGGESTIONS DROPDOWN */}
                {showSuggestions && !isEmergency && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    {suggestions.length > 0 ? (
                      suggestions.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSuggestionClick(item)}
                          className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                item.kind === "test"
                                  ? "bg-purple-100 text-purple-600"
                                  : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {getSuggestionIcon(item.kind)}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.kind === "test"
                                  ? "Diagnostic Test"
                                  : item.category}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        No matches found.
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={handleSearch}
                className={`px-8 py-4 text-white font-bold rounded-xl shadow-lg ${
                  isEmergency ? "bg-red-600" : "bg-orange-500"
                }`}
              >
                Search
              </button>
            </div>

            {/* Specialist Grid (Hide if Lab tab is active to reduce clutter, or show Lab categories) */}
            {!isEmergency && activeTab !== "labs" && (
              <div className="mt-8 pt-6 border-t border-gray-100 relative z-10">
                <p className="text-sm font-semibold text-gray-500 mb-4 uppercase">
                  Common Concerns
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="flex flex-col items-center group focus:outline-none"
                      type="button"
                    >
                      <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-2 group-hover:bg-blue-100 border border-blue-100 transition-colors">
                        <cat.icon size={24} className="text-blue-900" />
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {cat.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
