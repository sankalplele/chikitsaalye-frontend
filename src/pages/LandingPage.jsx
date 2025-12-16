import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocationContext } from "../context/LocationContext";
import Fuse from "fuse.js";
import {
  Search,
  Clock,
  Ambulance,
  AlertCircle,
  Building,
  User,
  Microscope,
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
  MapPin,
  Loader2,
  Navigation,
  Layers,
  FlaskConical,
  Syringe,
  Dna,
  Brain,
} from "lucide-react";

// --- STATIC DATABASE (Doctors, Labs, AND Specific Tests) ---
const SEARCH_DATABASE = [
  // DOCTORS
  {
    id: "d1",
    name: "Dr. Rajesh Gupta",
    category: "General Physician",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d2",
    name: "Dr. Anjali Singh",
    category: "Gynaecologist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d3",
    name: "Dr. V.K. Verma",
    category: "Orthopedics",
    kind: "doctor",
    tabs: ["doctors"],
  },

  // LABS
  {
    id: "l1",
    name: "Dr. Lal PathLabs",
    category: "Pathology",
    kind: "lab",
    tabs: ["labs"],
  },
  {
    id: "l2",
    name: "City X-Ray & Scan",
    category: "Radiology",
    kind: "lab",
    tabs: ["labs"],
  },

  // LAB TESTS
  {
    id: "t1",
    name: "CBC (Complete Blood Count)",
    category: "Hematology",
    kind: "test",
    tabs: ["labs"],
  },
  {
    id: "t2",
    name: "Thyroid Profile (T3, T4, TSH)",
    category: "Hormones",
    kind: "test",
    tabs: ["labs"],
  },
  {
    id: "t3",
    name: "MRI Brain",
    category: "Radiology",
    kind: "test",
    tabs: ["labs"],
  },
  {
    id: "t4",
    name: "Fasting Blood Sugar",
    category: "Diabetes",
    kind: "test",
    tabs: ["labs"],
  },
  {
    id: "t5",
    name: "RT-PCR",
    category: "Covid-19",
    kind: "test",
    tabs: ["labs"],
  },
];

// --- CATEGORY DEFINITIONS ---
const CATEGORIES = {
  doctors: [
    { icon: Stethoscope, label: "General Physician", id: "GENERAL_PHYSICIAN" },
    { icon: Baby, label: "Gynaecologist", id: "GYNAECOLOGY" },
    { icon: Heart, label: "Cardiologist", id: "CARDIOLOGY" },
    { icon: Bone, label: "Orthopedist", id: "ORTHOPEDICS" },
    { icon: Smile, label: "Dentist", id: "DENTISTRY" },
    { icon: Eye, label: "Ophthalmologist", id: "OPHTHALMOLOGY" },
  ],
  hospitals: [
    { icon: Building, label: "Multispeciality", id: "MULTISPECIALITY" },
    { icon: Activity, label: "Trauma Center", id: "TRAUMA" },
    { icon: Heart, label: "Heart Institute", id: "CARDIOLOGY_CENTER" },
    { icon: Baby, label: "Maternity Home", id: "MATERNITY_HOME" },
    { icon: Eye, label: "Eye Center", id: "EYE_HOSPITAL" },
  ],
  labs: [
    { icon: Droplet, label: "CBC Test", id: "CBC" },
    { icon: Brain, label: "MRI Scan", id: "MRI" },
    { icon: Activity, label: "Diabetes/Sugar", id: "SUGAR" },
    { icon: Dna, label: "Thyroid", id: "THYROID" },
    { icon: Scan, label: "X-Ray", id: "XRAY" },
    { icon: Thermometer, label: "Fever Panel", id: "FEVER" },
  ],
};

export default function LandingPage() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem("selectedSearchTab") || "hospitals";
  });

  const [searchQuery, setSearchQuery] = useState("");
  const { userLocation, setUserLocation, locationQuery, setLocationQuery } =
    useLocationContext();
  const [isEmergency, setIsEmergency] = useState(false);

  // Search State
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [apiHospitals, setApiHospitals] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);

  // UI State
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [inputError, setInputError] = useState(false);

  const navigate = useNavigate();
  const locationInputRef = useRef(null);
  const searchInputRef = useRef(null);

  // --- SAVE TAB STATE ---
  useEffect(() => {
    sessionStorage.setItem("selectedSearchTab", activeTab);
  }, [activeTab]);

  // --- 1. FETCH HOSPITALS API ---
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch("/api/clinics/get_all_clinics/");
        if (response.ok) {
          const data = await response.json();
          const formattedHospitals = data.map((clinic) => ({
            id: clinic.id || clinic._id,
            name: clinic.name || clinic.hospital_name,
            category: clinic.category || "General Hospital",
            kind: "hospital",
            tabs: ["hospitals"],
          }));
          setApiHospitals(formattedHospitals);
        }
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    fetchHospitals();
  }, []);

  // --- 2. BUILD SEARCH INDEX ---
  useEffect(() => {
    const categoryItems = [];
    Object.keys(CATEGORIES).forEach((tabKey) => {
      CATEGORIES[tabKey].forEach((cat) => {
        categoryItems.push({
          id: cat.id,
          name: cat.label,
          category: tabKey === "labs" ? "Test/Scan" : "Specialty",
          kind: tabKey === "labs" ? "test" : "category",
          tabs: [tabKey],
        });
      });
    });

    const mergedData = [...SEARCH_DATABASE, ...apiHospitals, ...categoryItems];
    setSearchIndex(mergedData);
  }, [apiHospitals]);

  // --- 3. CONFIGURE FUSE.JS ---
  const fuse = useMemo(() => {
    return new Fuse(searchIndex, {
      keys: ["name", "category"],
      threshold: 0.3,
      distance: 100,
      includeScore: true,
    });
  }, [searchIndex]);

  // --- 4. HANDLE INPUT & FUZZY SEARCH ---
  useEffect(() => {
    if (!searchQuery.trim()) {
      setShowSuggestions(false);
      return;
    }

    if (!isEmergency) {
      const results = fuse.search(searchQuery);
      const filteredResults = results
        .map((result) => result.item)
        .filter((item) => item.tabs.includes(activeTab))
        .slice(0, 6);

      setSuggestions(filteredResults);
      setShowSuggestions(true);
    }
  }, [searchQuery, activeTab, isEmergency, fuse]);

  // --- 5. EXECUTE SEARCH ---
  const executeSearch = (overrideQuery = null, overrideType = null) => {
    if (isEmergency) return alert("Connecting to 108...");

    const queryToUse = overrideQuery || searchQuery;

    if (!queryToUse || queryToUse.trim() === "") {
      setInputError(true);
      searchInputRef.current?.focus();
      setTimeout(() => setInputError(false), 500);
      return;
    }

    if (!userLocation) {
      setLocationError(true);
      locationInputRef.current?.focus();
      return;
    }

    const params = new URLSearchParams();
    params.set("q", queryToUse);
    params.set("type", overrideType || activeTab);
    params.set("lat", userLocation.lat);
    params.set("lon", userLocation.lon);

    navigate(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeSearch();
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (item) => {
    if (item.kind === "category") {
      executeSearch(item.name);
    } else if (item.kind === "doctor") {
      navigate(`/doctor/${item.id}`);
    } else if (item.kind === "hospital") {
      navigate(`/hospital/${item.id}`);
    } else if (item.kind === "lab") {
      navigate(`/lab/${item.id}`);
    } else if (item.kind === "test") {
      navigate(`/search?type=labs&q=${item.name}&kind=test`);
    }
    setShowSuggestions(false);
  };

  // --- 6. LOCATION HANDLER ---
  const getUserLocation = () => {
    setIsLocating(true);
    setLocationError(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setLocationQuery("Near Me");
          setIsLocating(false);
        },
        () => {
          alert("Location permission denied.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation not supported.");
      setIsLocating(false);
    }
  };

  // --- ICON HELPER ---
  const getIcon = (kind) => {
    switch (kind) {
      case "doctor":
        return <User size={18} />;
      case "hospital":
        return <Building size={18} />;
      case "lab":
        return <Microscope size={18} />;
      case "test":
        return <FlaskConical size={18} />;
      case "category":
        return <Layers size={18} />;
      default:
        return <Search size={18} />;
    }
  };

  const currentCategories = CATEGORIES[activeTab] || CATEGORIES.hospitals;

  return (
    <div
      className={`min-h-screen font-sans overflow-x-hidden w-full relative transition-colors duration-500 ${
        isEmergency
          ? "bg-red-50 dark:bg-red-900/20"
          : "bg-gradient-to-br from-blue-50 via-white to-cyan-50" // BRIGHT BLUE GRADIENT
      }`}
      onClick={() => setShowSuggestions(false)}
    >
      {/* Dark mode background overlay */}
      {!isEmergency && (
        <div className="hidden dark:block absolute inset-0 bg-slate-900 pointer-events-none z-0" />
      )}

      {/* HERO SECTION */}
      <section
        className={`relative flex min-h-screen flex-col justify-center items-center px-4 py-6 ${
          isEmergency ? "pt-20" : "pt-32 pb-20"
        }`}
      >
        {/* Background Pattern (Subtle dots for light theme, plus signs for dark) */}
        {!isEmergency && (
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        )}
        {/* Dark mode pattern like ForumPage */}
        {!isEmergency && (
          <div
            className="absolute inset-0 opacity-0 dark:opacity-[0.05] pointer-events-none z-0 hidden dark:block"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        )}

        {/* Emergency Toggle 
        <div className="fixed bottom-6 right-6 z-[9999]">
          <button
            onClick={() => setIsEmergency(!isEmergency)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm shadow-2xl transition-all ${
              isEmergency
                ? "bg-white text-red-600 animate-pulse border-4 border-red-600"
                : "bg-red-600 text-white hover:bg-red-700 hover:scale-105 shadow-red-200"
            }`}
          >
            <AlertCircle size={20} />
            {isEmergency ? "EXIT SOS" : "EMERGENCY SOS"}
          </button>
        </div> 
        */}

        {/* MAIN CONTENT WRAPPER */}
        <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <h1
            className={`text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-sm ${
              isEmergency
                ? "text-red-600 dark:text-red-400"
                : "text-blue-900 dark:text-white"
            }`}
          >
            {isEmergency ? "Emergency Response" : "Real-Time Healthcare Access"}
          </h1>

          <p
            className={`text-lg mb-10 font-medium ${
              isEmergency
                ? "text-red-500 dark:text-red-300"
                : "text-blue-700 dark:text-slate-300"
            }`}
          >
            {isEmergency
              ? "Finding nearest ambulances..."
              : "Search doctors, hospitals & labs near you."}
          </p>

          {/* GRID LAYOUT: Left (OPD), Center (Search), Right (Services) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-[260px_1fr_260px] gap-6 items-start text-left relative z-20">
            {/* 1. LEFT PANEL: LIVE OPD (White Card, Green Accents) */}
            {!isEmergency && (
              <div
                className="w-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-2xl p-5 shadow-xl shadow-blue-200/50 dark:shadow-slate-900/50 flex flex-col gap-4 order-2 lg:order-1 h-full min-h-[250px] transition-transform hover:scale-[1.02] group relative overflow-hidden"
                style={{ zIndex: 10 }}
              >
                {/* Decorative top accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>

                <div className="flex items-center gap-3 border-b border-blue-100 dark:border-slate-700 pb-3">
                  <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
                    <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 dark:text-white">
                      Live OPD
                    </h3>
                    <p className="text-xs text-blue-600 dark:text-slate-400">
                      Real-time Queue
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-800 dark:text-slate-300 font-medium">
                      KGMU Lucknow
                    </span>
                    <span className="font-bold text-white bg-orange-500 px-2 py-0.5 rounded text-xs shadow-sm">
                      45 Waiting
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-800 dark:text-slate-300 font-medium">
                      Ursula
                    </span>
                    <span className="font-bold text-white bg-emerald-500 px-2 py-0.5 rounded text-xs shadow-sm">
                      12 Waiting
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-800 dark:text-slate-300 font-medium">
                      LLR Hospital
                    </span>
                    <span className="font-bold text-white bg-blue-500 px-2 py-0.5 rounded text-xs shadow-sm">
                      Open
                    </span>
                  </div>
                </div>

                <button className="mt-auto w-full py-2 bg-blue-50 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-slate-600 text-blue-700 dark:text-slate-300 text-xs font-bold rounded-lg border border-blue-200 dark:border-slate-600 transition-all flex items-center justify-center gap-1">
                  View All Centers <ChevronRight size={14} />
                </button>
              </div>
            )}

            {/* 2. CENTER PANEL: SEARCH SECTION */}
            <div className="flex flex-col gap-4 w-full order-1 lg:order-2 relative z-50">
              {/* SEARCH BOX CONTAINER */}
              <div
                className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-blue-100/50 dark:shadow-slate-900/50 p-2 relative w-full transition-all z-[100] ${
                  inputError ? "ring-2 ring-red-100 dark:ring-red-900/30" : ""
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {!isEmergency && (
                  <div className="flex gap-1 mb-2 bg-blue-100 dark:bg-slate-700 p-1 rounded-xl">
                    {["doctors", "hospitals", "labs"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab);
                          setSearchQuery("");
                        }}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                          activeTab === tab
                            ? "bg-white dark:bg-slate-600 text-blue-700 dark:text-white shadow-sm border border-blue-300 dark:border-slate-600" // Active Light/Dark Theme
                            : "text-blue-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-600 hover:text-blue-700 dark:hover:text-white"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-2 relative">
                  {/* LOCATION INPUT */}
                  <div className="relative md:w-1/4 w-full">
                    <MapPin
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      ref={locationInputRef}
                      type="text"
                      readOnly
                      value={locationQuery || ""}
                      placeholder="Select Location"
                      className={`w-full pl-10 pr-10 py-3 h-[48px] bg-blue-50 dark:bg-slate-700 border rounded-xl outline-none text-sm text-blue-900 dark:text-slate-200 placeholder-blue-500 dark:placeholder-slate-400 ${
                        locationError
                          ? "border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-blue-200 dark:border-slate-600 focus:bg-white dark:focus:bg-slate-600 focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-500"
                      }`}
                    />
                    <button
                      onClick={getUserLocation}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      {isLocating ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Navigation size={18} />
                      )}
                    </button>
                  </div>

                  <div className="hidden md:block w-px bg-gray-200 my-2"></div>

                  {/* SEARCH INPUT */}
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {isEmergency ? (
                        <Ambulance size={20} className="text-red-500" />
                      ) : (
                        <Search size={20} />
                      )}
                    </div>

                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setInputError(false);
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder={
                        isEmergency
                          ? "Ambulance..."
                          : activeTab === "hospitals"
                          ? "Search 'City Hospital'..."
                          : activeTab === "labs"
                          ? "Search 'CBC', 'MRI'..."
                          : "Search 'Dr. Gupta'..."
                      }
                      className="w-full pl-10 py-3 h-[48px] bg-blue-50 dark:bg-slate-700 border border-blue-200 dark:border-slate-600 rounded-xl focus:bg-white dark:focus:bg-slate-600 text-sm text-blue-900 dark:text-slate-200 outline-none focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-500 placeholder-blue-500 dark:placeholder-slate-400"
                      onFocus={() =>
                        searchQuery.length > 0 && setShowSuggestions(true)
                      }
                    />

                    {/* SUGGESTIONS DROPDOWN */}
                    {showSuggestions &&
                      !isEmergency &&
                      suggestions.length > 0 && (
                        <div className="absolute top-[calc(100%+10px)] left-0 right-0 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-blue-200 dark:border-slate-700 overflow-hidden max-h-[300px] overflow-y-auto z-[200] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-blue-200 [&::-webkit-scrollbar-thumb]:dark:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full">
                          {suggestions.map((item, idx) => (
                            <div
                              key={`${item.id}-${idx}`}
                              onClick={() => handleSuggestionClick(item)}
                              className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer border-b border-blue-100 dark:border-slate-700 group"
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    item.kind === "category"
                                      ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                                      : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                  }`}
                                >
                                  {getIcon(item.kind)}
                                </div>
                                <div className="text-left">
                                  <p className="font-bold text-blue-900 dark:text-white text-sm">
                                    {item.name}
                                    {item.kind === "category" && (
                                      <span className="ml-2 text-[10px] border border-orange-200 bg-orange-50 text-orange-600 px-1 rounded uppercase">
                                        Category
                                      </span>
                                    )}
                                    {item.kind === "test" && (
                                      <span className="ml-2 text-[10px] border border-blue-200 bg-blue-50 text-blue-600 px-1 rounded uppercase">
                                        Test
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-xs text-blue-600 dark:text-slate-400 capitalize">
                                    {item.category || item.kind}
                                  </p>
                                </div>
                              </div>
                              <ChevronRight
                                size={16}
                                className="text-blue-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                  </div>

                  {/* ORANGE SEARCH BUTTON */}
                  <button
                    onClick={() => executeSearch()}
                    className={`px-6 py-3 font-bold text-white rounded-xl shadow-lg transition-transform active:scale-95 ${
                      isEmergency
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 shadow-orange-200 dark:shadow-orange-900/50"
                    }`}
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* DYNAMIC CATEGORY BUTTONS (Bright Blue Theme) */}
              {!isEmergency && (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 w-full relative z-0">
                  {currentCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() =>
                        executeSearch(
                          cat.label,
                          activeTab === "labs" ? "test" : null
                        )
                      }
                      className="flex flex-col items-center justify-center group bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-blue-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-slate-600 rounded-xl p-3 min-h-[90px] transition-all hover:-translate-y-1 hover:shadow-lg shadow-sm"
                    >
                      <cat.icon
                        size={24}
                        className="text-blue-500 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 mb-2 transition-colors"
                      />
                      <span className="text-xs font-medium text-blue-700 dark:text-slate-300 group-hover:text-blue-900 dark:group-hover:text-white transition-colors text-center leading-tight">
                        {cat.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. RIGHT PANEL: QUICK SERVICES (White Card, Blue Accents) */}
            {!isEmergency && (
              <div
                className="w-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-2xl p-5 shadow-xl shadow-blue-200/50 dark:shadow-slate-900/50 flex flex-col gap-4 order-3 lg:order-3 h-full min-h-[250px] transition-transform hover:scale-[1.02] group relative overflow-hidden"
                style={{ zIndex: 10 }}
              >
                {/* Decorative top accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-500"></div>

                <div className="flex items-center gap-3 border-b border-blue-100 dark:border-slate-700 pb-3">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                    <List className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 dark:text-white">
                      Services
                    </h3>
                    <p className="text-xs text-blue-600 dark:text-slate-400">
                      Quick Access
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => navigate("/labs/track")}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 text-blue-800 dark:text-slate-300 transition-colors text-left group/btn"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover/btn:bg-orange-500 dark:group-hover/btn:bg-orange-600 group-hover/btn:text-white transition-all">
                      <FileText size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">Track Report</p>
                      <p className="text-[10px] text-blue-600 dark:text-slate-400">
                        Lab Status
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("hospitals")}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-blue-800 dark:text-slate-300 transition-colors text-left group/btn"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover/btn:bg-emerald-500 dark:group-hover/btn:bg-emerald-600 group-hover/btn:text-white transition-all">
                      <Building size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">Hospitals</p>
                      <p className="text-[10px] text-blue-600 dark:text-slate-400">
                        View List
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("doctors")}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-800 dark:text-slate-300 transition-colors text-left group/btn"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover/btn:bg-blue-600 dark:group-hover/btn:bg-blue-500 group-hover/btn:text-white transition-all">
                      <User size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">Doctors</p>
                      <p className="text-[10px] text-blue-600 dark:text-slate-400">
                        Specialists
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
