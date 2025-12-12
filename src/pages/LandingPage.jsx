import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Clock,
  Ambulance,
  AlertCircle,
  Building,
  User,
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
  MessageCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

// --- SEARCH DATABASE ---
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
  // LABS
  {
    id: "l1",
    name: "Dr. Lal PathLabs",
    type: "private",
    category: "Lab",
    rating: 4.5,
    kind: "lab",
  },
  { id: "t1", name: "CBC", category: "Blood Test", kind: "test" },
];

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("doctors");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showLiveOPD, setShowLiveOPD] = useState(false);
  const navigate = useNavigate();

  // Search Logic
  useEffect(() => {
    if (searchQuery.length > 0 && !isEmergency) {
      const lowerQuery = searchQuery.toLowerCase();
      const matches = SEARCH_DATABASE.filter((item) => {
        const textMatch = item.name.toLowerCase().includes(lowerQuery);
        if (activeTab === "doctors") return textMatch && item.kind === "doctor";
        if (activeTab === "hospitals")
          return textMatch && item.kind === "hospital";
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
    if (item.kind === "doctor") navigate(`/doctor/${item.id}`);
    else if (item.kind === "hospital") navigate(`/hospital/${item.id}`);
    else if (item.kind === "lab") navigate(`/lab/${item.id}`);
    else navigate(`/search?type=labs&q=${item.name}`);
    setShowSuggestions(false);
  };

  const handleCategoryClick = (catId) =>
    navigate(`/search?type=doctors&category=${catId}`);

  const getIcon = (kind) => {
    if (kind === "doctor") return <User size={16} />;
    if (kind === "hospital") return <Building size={16} />;
    if (kind === "test") return <TestTube size={16} />;
    return <Microscope size={16} />;
  };

  const categories = [
    { icon: Stethoscope, label: "General", id: "general" },
    { icon: Baby, label: "Women", id: "gynae" },
    { icon: Heart, label: "Heart", id: "cardio" },
    { icon: Activity, label: "Bone", id: "ortho" },
    { icon: Smile, label: "Dental", id: "dental" },
    { icon: Eye, label: "Eye", id: "eye" },
  ];

  return (
    // FIX: overflow-x-hidden prevents scrollbar from off-screen LiveOPD widget
    <div
      className="min-h-screen bg-gray-50 font-sans overflow-x-hidden w-full relative"
      onClick={() => {
        setShowSuggestions(false);
        setShowLiveOPD(false);
      }}
    >
      {/* 1. HERO SECTION */}
      <section
        className={`relative min-h-[90vh] flex flex-col justify-center items-center transition-colors duration-500 ${
          isEmergency ? "bg-red-50" : "bg-blue-900"
        }`}
      >
        {/* Background Pattern */}
        {!isEmergency && (
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        )}

        {/* Emergency Toggle (Top Right) */}
        <div className="absolute top-24 right-6 z-40">
          <button
            onClick={() => setIsEmergency(!isEmergency)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all shadow-lg ${
              isEmergency
                ? "bg-white text-red-600 animate-pulse"
                : "bg-red-600 text-white hover:bg-red-700 border-2 border-white/20"
            }`}
          >
            <AlertCircle size={16} />
            {isEmergency ? "EXIT SOS MODE" : "EMERGENCY SOS"}
          </button>
        </div>

        {/* MAIN CONTENT CENTERED */}
        <div className="w-full max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center text-center -mt-16">
          {/* HEADLINE */}
          {!isEmergency && (
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8">
              <Shield className="h-4 w-4 text-orange-400" />
              <span className="text-blue-50 text-sm font-medium tracking-wide">
                A Digital India Initiative
              </span>
            </div>
          )}

          <h1
            className={`text-4xl md:text-6xl font-extrabold leading-tight mb-4 ${
              isEmergency ? "text-red-700" : "text-white"
            }`}
          >
            {isEmergency ? (
              "Emergency Response"
            ) : (
              <>
                Healthcare for <span className="text-orange-400">Bharat</span>
              </>
            )}
          </h1>

          <p
            className={`text-lg md:text-xl mb-10 max-w-lg ${
              isEmergency ? "text-red-600" : "text-blue-100/80"
            }`}
          >
            {isEmergency
              ? "Finding nearest ambulances..."
              : "Search doctors, hospitals & labs near you."}
          </p>

          {/* --- COMPACT SEARCH BAR --- */}
          <div
            className="w-4/5 bg-white rounded-2xl shadow-2xl p-3 border-4 border-white/10 relative z-40 transform transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tabs */}
            {!isEmergency && (
              <div className="flex gap-2 mb-3 p-1">
                {["doctors", "hospitals", "labs"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setSearchQuery("");
                    }}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold capitalize transition-all ${
                      activeTab === tab
                        ? "bg-blue-900 text-white shadow-md"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}

            {/* Input & Button */}
            <div className="flex gap-3 relative">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {isEmergency ? (
                    <Ambulance size={20} className="text-red-500" />
                  ) : (
                    <Search size={20} />
                  )}
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isEmergency ? "Location..." : `Search ${activeTab}...`
                  }
                  className="w-full pl-12 pr-4 py-4 text-base font-medium text-gray-900 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                  onFocus={() =>
                    searchQuery.length > 0 && setShowSuggestions(true)
                  }
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && !isEmergency && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-[250px] overflow-y-auto text-left">
                    {suggestions.length > 0 ? (
                      suggestions.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSuggestionClick(item)}
                          className="flex items-center justify-between px-5 py-4 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 group"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                              {getIcon(item.kind)}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500 capitalize">
                                {item.category}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No matches found.
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={handleSearch}
                className={`px-8 py-4 font-bold text-white rounded-xl shadow-lg text-base ${
                  isEmergency
                    ? "bg-red-600"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                Search
              </button>
            </div>
          </div>

          {/* Categories - Spaced Out & Larger Text */}
          {!isEmergency && activeTab !== "labs" && (
            <div className="mt-10 flex flex-wrap gap-8 justify-center w-full max-w-4xl px-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="flex flex-col items-center group transition-transform hover:-translate-y-1 focus:outline-none min-w-[80px]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white text-blue-200 group-hover:text-blue-900 transition-colors border border-white/10 shadow-sm">
                    <cat.icon size={24} />
                  </div>
                  <span className="text-sm font-medium text-blue-100 mt-3 group-hover:text-white transition-colors">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- 3. SLIDE-OUT LIVE OPD WIDGET --- */}
        {!isEmergency && (
          <div
            // Adjusted positioning so button is perfectly centered vertically on the toggle tab
            className={`fixed left-0 top-1/3 z-50 flex items-start transition-transform duration-300 ${
              showLiveOPD ? "translate-x-0" : "-translate-x-[280px]"
            }`}
          >
            {/* The Card */}
            <div
              className="bg-white/95 backdrop-blur-md p-5 w-72 rounded-tr-2xl rounded-br-2xl shadow-2xl border-r border-b border-t border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4 border-b pb-3">
                <Clock className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Live Queue
                  </h3>
                  <p className="text-xs text-gray-500">
                    Real-time Govt Hospital Data
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700 font-medium">
                    KGMU Lucknow
                  </span>
                  <span className="font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                    45 Waiting
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700 font-medium">
                    Ursula Hospital
                  </span>
                  <span className="font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                    12 Waiting
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700 font-medium">
                    LLR Hospital
                  </span>
                  <span className="font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                    Open
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t text-center">
                <button className="text-xs font-bold text-blue-600 hover:underline">
                  View All Centers
                </button>
              </div>
            </div>

            {/* The Toggle Tab (Centered Content) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowLiveOPD(!showLiveOPD);
              }}
              className="bg-green-500 text-white p-1 rounded-r-2xl shadow-lg flex flex-col items-center justify-center gap-4 mt-4 hover:bg-green-600 transition-colors h-56"
            >
              {showLiveOPD ? (
                <ChevronLeft size={30} />
              ) : (
                <ChevronRight size={30} />
              )}

              {showLiveOPD ? null : (
                <span className="text-xs font-bold">LIVE OPD</span>
              )}
            </button>
          </div>
        )}
      </section>

      {/* 3. TRUST SECTION (Below Fold) */}
      {!isEmergency && (
        <section className="py-20 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-12">
              Why Bharat Trusts Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                  <Shield size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-blue-900">
                  Govt Verified
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Direct integration with KGMU and District Hospitals.
                </p>
              </div>
              <div className="p-8 bg-green-50 rounded-3xl border border-green-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                  <CheckCircle size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-green-900">
                  Instant Booking
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Skip the registration lines at OPD counters.
                </p>
              </div>
              <div className="p-8 bg-purple-50 rounded-3xl border border-purple-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
                  <MessageCircle size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-purple-900">
                  WhatsApp Support
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Get your token directly on WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
