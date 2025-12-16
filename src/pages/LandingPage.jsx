import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// 1. Import the hook we created
import { useLocationContext } from "../context/LocationContext";
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
  Stethoscope,
  Heart,
  Activity,
  Smile,
  Eye,
  Baby,
  ChevronRight,
  FileText,
  List,
  Scan,
  Droplet,
  Thermometer,
  Bone,
  ArrowDown,
  MapPin,
  Loader2,
  Navigation,
} from "lucide-react";

// ... [KEEP YOUR SEARCH_DATABASE ARRAY EXACTLY AS IT WAS] ...
const SEARCH_DATABASE = [
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
    id: "h1",
    name: "Ursula Hospital",
    type: "govt",
    category: "General Hospital",
    rating: 4.0,
    kind: "hospital",
  },
  {
    id: "l1",
    name: "Dr. Lal PathLabs",
    type: "private",
    category: "Lab",
    rating: 4.5,
    kind: "lab",
  },
];

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("doctors");
  const [searchQuery, setSearchQuery] = useState("");

  // --- CONTEXT CHANGE START ---
  // Instead of useState, we pull these from the Context
  const { userLocation, setUserLocation, locationQuery, setLocationQuery } =
    useLocationContext();
  // --- CONTEXT CHANGE END ---

  const [isEmergency, setIsEmergency] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Local UI state (does not need to be global)
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const navigate = useNavigate();
  const forumRef = useRef(null);
  const locationInputRef = useRef(null);

  // --- 1. GET LOCATION FUNCTION ---
  const getUserLocation = () => {
    setIsLocating(true);
    setLocationError(false);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // This now updates the Global Context, not local state
          setUserLocation({ lat: latitude, lon: longitude });
          setLocationQuery("Current Location (Detected)");
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not access location. Please enable permissions.");
          setIsLocating(false);
          locationInputRef.current?.focus();
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsLocating(false);
    }
  };

  // --- 2. MAIN NAVIGATION HANDLER ---
  const executeSearch = (overrideService = null) => {
    if (isEmergency) return alert("Connecting to 108...");

    // VALIDATION: If no coordinates are set, block entry and focus location
    if (!userLocation) {
      setLocationError(true);
      locationInputRef.current?.focus();
      return;
    }

    const params = new URLSearchParams();

    const serviceValue = overrideService || searchQuery || activeTab;
    params.set("service", serviceValue);

    params.set("lat", userLocation.lat);
    params.set("lon", userLocation.lon);
    params.set("max_distance", "10000");

    params.set("type", activeTab);

    navigate(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeSearch();
      setShowSuggestions(false);
    }
  };

  const handleSearchBtnClick = () => executeSearch();

  const handleCategoryClick = (catId) => {
    executeSearch(catId);
  };

  // --- SUGGESTION LOGIC ---
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

  const handleSuggestionClick = (item) => {
    if (!userLocation) {
      setLocationError(true);
      locationInputRef.current?.focus();
      return;
    }

    if (item.kind === "doctor") navigate(`/doctor/${item.id}`);
    else if (item.kind === "hospital") navigate(`/hospital/${item.id}`);
    else navigate(`/search?type=labs&q=${item.name}`);
    setShowSuggestions(false);
  };

  const getIcon = (kind) => {
    if (kind === "doctor") return <User size={18} />;
    if (kind === "hospital") return <Building size={18} />;
    return <Microscope size={18} />;
  };

  const scrollToForum = () => {
    forumRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // --- UPDATED CATEGORIES CONFIGURATION ---
  const CATEGORIES = {
    doctors: [
      { icon: Stethoscope, label: "General", id: "GENERAL_PHYSICIAN" },
      { icon: Baby, label: "Women", id: "GYNAECOLOGY" },
      { icon: Heart, label: "Heart", id: "CARDIOLOGY" },
      { icon: Bone, label: "Bone", id: "ORTHOPEDICS" },
      { icon: Smile, label: "Dental", id: "DENTISTRY" },
      { icon: Eye, label: "Eye", id: "OPHTHALMOLOGY" },
    ],
    hospitals: [
      { icon: Building, label: "Multispeciality", id: "MULTISPECIALITY" },
      { icon: Smile, label: "Dental Clinic", id: "DENTAL_CLINIC" },
      { icon: Activity, label: "Trauma Center", id: "TRAUMA" },
      { icon: Heart, label: "Heart Inst", id: "CARDIOLOGY_CENTER" },
      { icon: Baby, label: "Maternity", id: "MATERNITY_HOME" },
      { icon: Eye, label: "Eye Center", id: "EYE_HOSPITAL" },
    ],
    labs: [
      { icon: Thermometer, label: "Thyroid", id: "THYROID" },
      { icon: TestTube, label: "CBC", id: "CBC" },
      { icon: Scan, label: "MRI / CT", id: "MRI_CT" },
      { icon: Bone, label: "X-Ray", id: "XRAY" },
      { icon: Droplet, label: "Diabetes", id: "DIABETES" },
      { icon: User, label: "Full Body", id: "FULL_BODY_CHECKUP" },
    ],
  };

  const currentCategories = CATEGORIES[activeTab] || CATEGORIES.doctors;

  return (
    <div
      className={`min-h-screen font-sans overflow-x-hidden w-full relative ${
        isEmergency ? "bg-red-50" : "bg-gray-50"
      }`}
      onClick={() => setShowSuggestions(false)}
    >
      {/* 1. HERO SECTION */}
      <section
        className={`relative flex min-h-screen flex-col justify-center items-center px-4 py-6 overflow-visible transition-colors duration-500 ${
          isEmergency ? "bg-red-50 pt-20" : "bg-blue-900 pt-32 pb-20"
        }`}
      >
        {/* Background Pattern */}
        {!isEmergency && (
          <div
            className="absolute inset-0 opacity-10 pointer-events-none z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        )}

        {/* Emergency Toggle */}
        <div className="fixed bottom-6 right-6 z-[60]">
          <button
            onClick={() => setIsEmergency(!isEmergency)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all shadow-2xl ${
              isEmergency
                ? "bg-white text-red-600 animate-pulse border-4 border-red-600"
                : "bg-red-600/90 hover:bg-red-700 text-white backdrop-blur-sm border border-white/20 hover:scale-105"
            }`}
          >
            <AlertCircle size={20} />
            {isEmergency ? "EXIT SOS" : "EMERGENCY SOS"}
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 max-w-4xl tracking-tight drop-shadow-lg ${
              isEmergency ? "text-red-700" : "text-white"
            }`}
          >
            {isEmergency
              ? "Emergency Response"
              : "Real-Time Healthcare Access for Every Citizen"}
          </h1>

          <p
            className={`text-base md:text-lg mb-10 max-w-lg font-medium ${
              isEmergency ? "text-red-600" : "text-blue-100/90"
            }`}
          >
            {isEmergency
              ? "Finding nearest ambulances..."
              : "Search doctors, hospitals & labs near you."}
          </p>

          {/* --- RESPONSIVE GRID LAYOUT --- */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-[260px_1fr_260px] gap-6 items-start text-left relative z-20">
            {/* 1. SEARCH SECTION */}
            <div className="flex flex-col gap-4 w-full order-1 lg:order-2 relative z-50">
              {/* === REDESIGNED SEARCH BAR === */}
              <div
                className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 relative w-full border border-white/20 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                {!isEmergency && (
                  <div className="flex gap-1 mb-2 bg-gray-100/50 p-1 rounded-xl relative z-10">
                    {["doctors", "hospitals", "labs"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab);
                          setSearchQuery("");
                        }}
                        className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold capitalize transition-all ${
                          activeTab === tab
                            ? "bg-blue-900 text-white shadow-md transform scale-[1.02]"
                            : "text-gray-500 hover:bg-white hover:text-gray-700"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                )}

                {/* THE SPLIT SEARCH CONTAINER */}
                <div className="flex flex-col md:flex-row gap-2 relative z-50">
                  {/* LEFT: LOCATION INPUT */}
                  <div className="relative md:w-1/3 w-full">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                      <MapPin
                        size={20}
                        className={userLocation ? "text-blue-600" : ""}
                      />
                    </div>
                    <input
                      ref={locationInputRef}
                      type="text"
                      readOnly
                      // Value comes from Context now
                      value={locationQuery}
                      placeholder="Select Location"
                      className={`w-full pl-10 pr-10 py-3 text-base font-medium text-gray-900 bg-gray-50/50 border rounded-xl focus:bg-white outline-none transition-all ${
                        locationError
                          ? "border-red-500 ring-2 ring-red-200 animate-pulse"
                          : "border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      }`}
                    />
                    {/* GPS BUTTON INSIDE INPUT */}
                    <button
                      onClick={getUserLocation}
                      disabled={isLocating}
                      title="Detect my location"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors z-20"
                    >
                      {isLocating ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Navigation size={18} className="fill-blue-100" />
                      )}
                    </button>
                  </div>

                  {/* DIVIDER (Visible on Desktop) */}
                  <div className="hidden md:block w-px bg-gray-300 my-2"></div>

                  {/* RIGHT: SEARCH INPUT */}
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
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
                      onKeyDown={handleKeyDown}
                      placeholder={
                        isEmergency
                          ? "Ambulance type..."
                          : `Search ${activeTab}, symptoms...`
                      }
                      className="w-full pl-10 py-3 text-base font-medium text-gray-900 bg-gray-50/50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all relative z-10"
                      onFocus={() =>
                        searchQuery.length > 0 && setShowSuggestions(true)
                      }
                    />

                    {/* Suggestions Dropdown */}
                    {showSuggestions && !isEmergency && (
                      <div
                        className="absolute top-[calc(100%+10px)] left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden max-h-[300px] overflow-y-auto"
                        style={{ zIndex: 9999 }}
                      >
                        {suggestions.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleSuggestionClick(item)}
                            className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 group"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
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
                        ))}
                      </div>
                    )}
                  </div>

                  {/* SEARCH BUTTON */}
                  <button
                    onClick={handleSearchBtnClick}
                    className={`px-6 py-3 font-bold text-white rounded-xl shadow-lg whitespace-nowrap transition-transform active:scale-95 relative z-10 ${
                      isEmergency
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                    }`}
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* B. DYNAMIC CATEGORIES */}
              {!isEmergency && (
                <div
                  className="grid grid-cols-3 sm:grid-cols-6 gap-3 w-full relative"
                  style={{ zIndex: 0 }}
                >
                  {currentCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="flex flex-col items-center justify-center group bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl p-3 transition-all hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm"
                    >
                      <cat.icon
                        size={24}
                        className="text-blue-200 group-hover:text-white mb-2 transition-colors"
                      />
                      <span className="text-xs font-medium text-blue-100 group-hover:text-white transition-colors">
                        {cat.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. LIVE OPD PANEL */}
            {!isEmergency && (
              <div
                className="w-full bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 order-2 lg:order-1 h-full min-h-[250px] transition-transform hover:scale-[1.02] hover:bg-white/15 group relative"
                style={{ zIndex: 0 }}
              >
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="bg-green-500/20 p-2 rounded-lg group-hover:bg-green-500/30 transition-colors animate-pulse">
                    <Clock className="h-6 w-6 text-green-400 " />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Live OPD</h3>
                    <p className="text-xs text-blue-200">Real-time Queue</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-100 font-medium">
                      KGMU Lucknow
                    </span>
                    <span className="font-bold text-white bg-orange-500/80 px-2 py-0.5 rounded text-xs shadow-sm">
                      45 Waiting
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-100 font-medium">Ursula</span>
                    <span className="font-bold text-white bg-green-500/80 px-2 py-0.5 rounded text-xs shadow-sm">
                      12 Waiting
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-100 font-medium">
                      LLR Hospital
                    </span>
                    <span className="font-bold text-white bg-blue-500/80 px-2 py-0.5 rounded text-xs shadow-sm">
                      Open
                    </span>
                  </div>
                </div>

                <button className="mt-auto w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/10 transition-all flex items-center justify-center gap-1 group-hover:border-white/20">
                  View All Centers <ChevronRight size={14} />
                </button>
              </div>
            )}

            {/* 3. QUICK ACTIONS */}
            {!isEmergency && (
              <div
                className="w-full bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 order-3 lg:order-3 h-full min-h-[250px] transition-transform hover:scale-[1.02] hover:bg-white/15 group relative"
                style={{ zIndex: 0 }}
              >
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="bg-blue-500/20 p-2 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <List className="h-6 w-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Services</h3>
                    <p className="text-xs text-blue-200">Quick Access</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => navigate("/labs/track")}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 text-white transition-colors text-left group/btn"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-300 group-hover/btn:bg-orange-500 group-hover/btn:text-white transition-all">
                      <FileText size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">Track Report</p>
                      <p className="text-[10px] text-blue-200">Lab Status</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("hospitals")}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 text-white transition-colors text-left group/btn"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-300 group-hover/btn:bg-green-500 group-hover/btn:text-white transition-all">
                      <Building size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">Hospitals</p>
                      <p className="text-[10px] text-blue-200">View List</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("doctors")}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 text-white transition-colors text-left group/btn"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 group-hover/btn:bg-purple-500 group-hover/btn:text-white transition-all">
                      <User size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">Doctors</p>
                      <p className="text-[10px] text-blue-200">Specialists</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. SCROLL BUTTON */}
          {!isEmergency && (
            <div className="mt-12 mb-6 animate-bounce">
              <button
                onClick={scrollToForum}
                className="flex flex-col items-center text-blue-200 hover:text-white transition-colors gap-2 group"
              >
                <span className="text-sm font-semibold tracking-widest uppercase opacity-80 group-hover:opacity-100">
                  Browse Health Questions
                </span>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-sm group-hover:bg-white/20 transition-all">
                  <ArrowDown size={20} className="text-white" />
                </div>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* HEALTH FORUM / BLOG HIGHLIGHTS */}
      {!isEmergency && (
        <section
          ref={forumRef}
          className="py-16 bg-white relative z-10 border-b border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center text-gray-400 py-10">
              <h3 className="text-xl">Health Questions Section</h3>
              <p>(Content from previous code)</p>
            </div>
          </div>
        </section>
      )}

      {/* TRUST SECTION */}
      {!isEmergency && (
        <section className="py-20 bg-gray-50 relative z-10">
          <div className="text-center text-gray-400 py-10">
            <h3 className="text-xl">Trust Section</h3>
            <p>(Content from previous code)</p>
          </div>
        </section>
      )}
    </div>
  );
}
