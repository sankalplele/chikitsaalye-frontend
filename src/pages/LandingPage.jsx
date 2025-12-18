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
  ChevronDown, // Added ChevronDown
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
  ChevronLeft,
} from "lucide-react";

// --- STATIC DATABASE (Doctors, Labs, AND Specific Tests) ---
const SEARCH_DATABASE = [
  // DOCTORS
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
  {
    id: "d4",
    name: "Dr. Susan Methews",
    category: "Cardiologist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d5",
    name: "Dr. R.K. Mishra",
    category: "Neurologist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d6",
    name: "Dr. P.K. Sharma",
    category: "Dermatologist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  // --- NEW ADDITIONS ---
  {
    id: "d7",
    name: "Dr. Amit Kumar",
    category: "Pediatrician",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d8",
    name: "Dr. Neha Kapoor",
    category: "Dentist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d9",
    name: "Dr. S.K. Singh",
    category: "ENT Specialist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d10",
    name: "Dr. Priya Desai",
    category: "Psychiatrist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d11",
    name: "Dr. Rajiv Malhotra",
    category: "Oncologist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d12",
    name: "Dr. Meera Joshi",
    category: "Ophthalmologist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d13",
    name: "Dr. Suresh Reddy",
    category: "Urologist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d14",
    name: "Dr. Anita Saxena",
    category: "Gastroenterologist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d15",
    name: "Dr. Vikram Seth",
    category: "Pulmonologist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d16",
    name: "Dr. Pooja Agarwal",
    category: "Endocrinologist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d17",
    name: "Dr. Arjun Mehta",
    category: "Rheumatologist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d18",
    name: "Dr. Kavita Krishnan",
    category: "Nephrologist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d19",
    name: "Dr. Sameer Khan",
    category: "General Surgeon",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d20",
    name: "Dr. Ritu Choudhary",
    category: "Dermatologist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d21",
    name: "Dr. Manoj Tiwari",
    category: "Cardiologist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d22",
    name: "Dr. Swati Mishra",
    category: "Gynaecologist",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d23",
    name: "Dr. Alok Gupta",
    category: "Orthopedics",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d24",
    name: "Dr. Nidhi Verma",
    category: "Pediatrician",
    kind: "doctor",
    tabs: ["doctors"],
  },
  {
    id: "d25",
    name: "Dr. Sanjay Patel",
    category: "General Physician",
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
  {
    id: "l3",
    name: "Urban Diagnostics",
    category: "Pathology",
    kind: "lab",
    tabs: ["labs"],
  },
  {
    id: "l4",
    name: "Metro Imaging",
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
    { icon: Heart, label: "Heart Institute", id: "CARDIOLOGY" },
    { icon: Baby, label: "Maternity Home", id: "GYNAECOLOGY" },
    { icon: Eye, label: "Eye Center", id: "OPHTHALMOLOGY" },
    { icon: Building, label: "Cancer Center", id: "CANCER" },
  ],
  labs: [
    { icon: Droplet, label: "CBC Test", id: "CBC" },
    { icon: Brain, label: "MRI Scan", id: "MRI" },
    { icon: Activity, label: "Diabetes/Sugar", id: "SUGAR" },
    { icon: Dna, label: "Thyroid", id: "THYROID" },
    { icon: Scan, label: "X-Ray", id: "X-RAY" },
    { icon: Thermometer, label: "Fever Panel", id: "FEVER" },
  ],
};

// City Coordinates for Dropdown
const CITY_COORDINATES = {
  Kanpur: { lat: 26.4499, lon: 80.3319 },
  Lucknow: { lat: 26.8467, lon: 80.9462 },
  Delhi: { lat: 28.7041, lon: 77.1025 },
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
  const [hospitalServices, setHospitalServices] = useState([]);
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

  // --- 1b. FETCH HOSPITAL SERVICES (CATEGORIES) ---
  useEffect(() => {
    const fetchHospitalServices = async () => {
      try {
        const response = await fetch("/api/clinics/services/");
        if (response.ok) {
          const data = await response.json();
          // Example response:
          // [{ id: 6, name: "CARDIOLOGY" }, ...]
          const formattedServices = (Array.isArray(data) ? data : []).map(
            (svc, idx) => ({
              id: svc.id ?? `service-${idx}`,
              name: svc.name ?? "Hospital Service",
              category: "Hospital Service",
              kind: "category",
              tabs: ["hospitals"],
            })
          );
          setHospitalServices(formattedServices);
        }
      } catch (error) {
        console.error("Error fetching hospital services:", error);
      }
    };
    fetchHospitalServices();
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

    const mergedData = [
      ...SEARCH_DATABASE,
      ...apiHospitals,
      ...hospitalServices,
      ...categoryItems,
    ];
    setSearchIndex(mergedData);
  }, [apiHospitals, hospitalServices]);

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

  // --- Helper: resolve category/service to backend service name ---
  const resolveServiceParam = (input) => {
    if (!input) return null;
    // IDs are already normalized; pass them through as lowercase
    return String(input).trim().toLowerCase();
  };

  // --- 5. EXECUTE SEARCH ---
  const executeSearch = (
    overrideQuery = null,
    overrideType = null,
    overrideService = null
  ) => {
    if (isEmergency) return alert("Connecting to 108...");

    const queryToUse = overrideQuery || searchQuery;

    if (!queryToUse || queryToUse.trim() === "") {
      setInputError(true);
      searchInputRef.current?.focus();
      setTimeout(() => setInputError(false), 500);
      return;
    }

    // Resolve coordinates: prefer userLocation, otherwise use selected preset
    let targetLat = userLocation?.lat ?? null;
    let targetLon = userLocation?.lon ?? null;
    if (
      (!targetLat || !targetLon) &&
      typeof selectedLocationKey !== "undefined" &&
      selectedLocationKey !== "custom"
    ) {
      const preset =
        typeof PRESET_LOCATIONS !== "undefined"
          ? PRESET_LOCATIONS.find((p) => p.key === selectedLocationKey)
          : null;
      if (preset) {
        if (preset.getLatLon) {
          const loc = preset.getLatLon();
          if (loc) {
            targetLat = loc.lat;
            targetLon = loc.lon;
          }
        } else {
          targetLat = preset.lat;
          targetLon = preset.lon;
        }
      }
    }

    // Allow searches without coordinates for doctors and labs (no nearby API yet)
    const effectiveType = overrideType || activeTab;
    if (
      (!targetLat || !targetLon) &&
      effectiveType !== "doctors" &&
      effectiveType !== "labs"
    ) {
      setLocationError(true);
      locationInputRef.current?.focus();
      return;
    }
    const params = new URLSearchParams();
    params.set("q", queryToUse);
    params.set("type", overrideType || activeTab);
    if (targetLat && targetLon) {
      params.set("lat", String(targetLat));
      params.set("lon", String(targetLon));
    }

    // If caller passed a service/category key, resolve it to backend service
    if (overrideService) {
      const svc = resolveServiceParam(overrideService || queryToUse);
      if (svc) params.set("service", svc);
    }

    // Explicitly mark that this search should trigger backend API only when originating from hospitals tab
    const originType = overrideType || activeTab;
    if (originType === "hospitals") params.set("api", "1");

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
      executeSearch(item.name, null, item.name);
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

  const handleLocationSelect = (e) => {
    const selected = e.target.value;
    setLocationQuery(selected);
    setLocationError(false);

    if (selected === "Near Me") {
      getUserLocation();
    } else if (CITY_COORDINATES[selected]) {
      setUserLocation(CITY_COORDINATES[selected]);
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

  // --- HIGHLIGHTS DATA (dummy) ---
  const doctorArticles = [
    {
      id: "a1",
      title: "Health Tips for Working Professionals",
      excerpt:
        "Simple desk exercises and micro-break strategies to reduce neck and back strain.",
      author: "Dr. Anjali Singh",
      date: "Dec 10, 2025",
      image: "https://picsum.photos/seed/a1/800/520",
    },
    {
      id: "a2",
      title: "Seasonal Cold & Cough — Prevention",
      excerpt:
        "Practical home remedies and when to seek medical advice for coughs.",
      author: "Dr. Rajesh Gupta",
      date: "Nov 28, 2025",
      image: "https://picsum.photos/seed/a2/800/520",
    },
    {
      id: "a3",
      title: "Managing Stress at Work",
      excerpt:
        "Mindfulness techniques and short routines to calm anxiety during work hours.",
      author: "Dr. R.K. Verma",
      date: "Oct 15, 2025",
      image: "https://picsum.photos/seed/a3/800/520",
    },
    {
      id: "a4",
      title: "Healthy Eating on a Budget",
      excerpt: "Affordable meal plans and grocery tips for balanced nutrition.",
      author: "Dt. Arun Kumar",
      date: "Sep 30, 2025",
      image: "https://picsum.photos/seed/a4/800/520",
    },
    {
      id: "a5",
      title: "Sleep Hygiene for Shift Workers",
      excerpt:
        "How to manage circadian rhythm disruptions and improve sleep quality.",
      author: "Dr. Neha Gupta",
      date: "Aug 20, 2025",
      image: "https://picsum.photos/seed/a5/800/520",
    },
    {
      id: "a6",
      title: "Exercise Quick-Routines",
      excerpt: "10-minute routines you can do at your desk or in small spaces.",
      author: "Dr. V.K. Verma",
      date: "Jul 12, 2025",
      image: "https://picsum.photos/seed/a6/800/520",
    },
  ];

  const forumHighlights = [
    {
      id: "f1",
      category: "General Health",
      question:
        "Is constant fatigue and slight hair fall a sign of thyroid issues?",
      excerpt:
        "While fatigue and hair fall are common signs of stress, they are also classic symptoms of hypothyroidism.",
      expert: "Dr. Priya Sharma",
    },
    {
      id: "f2",
      category: "Diet & Nutrition",
      question:
        "What is the best diet plan for losing belly fat without losing muscle mass?",
      excerpt:
        "Focus on a high-protein diet combined with strength training and avoid refined sugars.",
      expert: "Dt. Arun Kumar",
    },
    {
      id: "f3",
      category: "Skin & Hair",
      question:
        "Sudden acne breakout on cheeks at age 28. What could be the cause?",
      excerpt:
        "Adult acne is often hormonal; consider PCOD screening and topical care.",
      expert: "Dr. Neha Gupta",
    },
    {
      id: "f4",
      category: "Mental Health",
      question: "How to deal with anxiety attacks at night before sleeping?",
      excerpt:
        "Try breathing techniques like 4-7-8, avoid screens before bed, and practice relaxation.",
      expert: "Dr. R.K. Verma",
    },
    {
      id: "f5",
      category: "Cardiology",
      question: "Sharp pain in left chest while running, subsides on rest.",
      excerpt:
        "This is a classic presentation of stable angina — an exercise ECG/TMT and cardiology consult recommended.",
      expert: "Dr. A.K. Singh",
    },
  ];

  const articlesRef = useRef(null);
  const forumRef = useRef(null);

  const scrollContainer = (ref, dir = "right") => {
    if (!ref?.current) return;
    const el = ref.current;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const scrollToHighlights = () => {
    const el = document.getElementById("highlights");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen font-sans overflow-hidden w-full relative transition-colors duration-500 ${
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
        {/* Background Pattern */}
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

        {/* MAIN CONTENT WRAPPER */}
        <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <h1
            className={`text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-sm ${
              isEmergency
                ? "text-red-600 dark:text-red-400"
                : "text-blue-900 dark:text-white"
            }`}
          >
            {isEmergency ? "Emergency Response" : "l-Time Healthcare Access"}
          </h1>

          {/* hide native scrollbars for highlight sliders */}
          <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}`}</style>

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
            {/* 3. RIGHT PANEL: LIVE OPD */}
            {!isEmergency && (
              <div
                className="w-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-2xl p-5 shadow-xl shadow-blue-200/50 dark:shadow-slate-900/50 flex flex-col gap-4 order-2 lg:order-3 h-full min-h-[250px] transition-transform hover:scale-[1.02] group relative overflow-hidden"
                style={{ zIndex: 10 }}
              >
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
                            ? "bg-white dark:bg-slate-600 text-blue-700 dark:text-white shadow-sm border border-blue-300 dark:border-slate-600"
                            : "text-blue-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-600 hover:text-blue-700 dark:hover:text-white"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-2 relative">
                  {/* --- UPDATED LOCATION SELECTOR DROPDOWN (shown only for hospitals tab) --- */}
                  {activeTab === "hospitals" && (
                    <div className="relative md:w-1/4 w-full group">
                      <MapPin
                        className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors z-10 ${
                          isLocating
                            ? "text-blue-500 animate-pulse"
                            : "text-gray-400 group-hover:text-blue-500"
                        }`}
                        size={20}
                      />
                      <select
                        ref={locationInputRef}
                        value={locationQuery || "Near Me"}
                        onChange={handleLocationSelect}
                        className={`w-full pl-10 pr-10 py-3 h-[48px] bg-blue-50 dark:bg-slate-700 border rounded-xl outline-none text-sm text-blue-900 dark:text-slate-200 appearance-none cursor-pointer ${
                          locationError
                            ? "border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20"
                            : "border-blue-200 dark:border-slate-600 hover:border-blue-400 focus:bg-white dark:focus:bg-slate-600 focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-500"
                        }`}
                      >
                        <option value="Near Me">Near Me</option>
                        <option value="Kanpur">Kanpur</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Delhi">Delhi</option>
                      </select>

                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        {isLocating ? (
                          <Loader2
                            size={16}
                            className="animate-spin text-blue-500"
                          />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </div>
                    </div>
                  )}

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

              {/* DYNAMIC CATEGORY BUTTONS */}
              {!isEmergency && (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 w-full relative z-0">
                  {currentCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() =>
                        executeSearch(
                          cat.label,
                          activeTab === "labs" ? "test" : null,
                          cat.id
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

            {/* 1. LEFT PANEL: QUICK SERVICES */}
            {!isEmergency && (
              <div
                className="w-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-2xl p-5 shadow-xl shadow-blue-200/50 dark:shadow-slate-900/50 flex flex-col gap-4 order-3 lg:order-1 h-full min-h-[250px] transition-transform hover:scale-[1.02] group relative overflow-hidden"
                style={{ zIndex: 10 }}
              >
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
                    onClick={() => setActiveTab("hospitals")}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-blue-800 dark:text-slate-300 transition-colors text-left group/btn"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover/btn:bg-emerald-500 dark:group-hover/btn:bg-emerald-600 group-hover/btn:text-white transition-all">
                      <Building size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">Hospitals Near Me</p>
                      <p className="text-[10px] text-blue-600 dark:text-slate-400">
                        Government and Private
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
                      <p className="text-sm font-bold">Search Doctors</p>
                      <p className="text-[10px] text-blue-600 dark:text-slate-400">
                        Specialists
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => navigate("/dashboard/")}
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
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Scroll hint button moved below as absolute child of the hero */}
        {/* Scroll hint button attached to hero bottom (stays with first section) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center">
          <button
            onClick={scrollToHighlights}
            className="p-3 rounded-full bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 shadow-lg animate-bounce"
            aria-label="Scroll down"
          >
            <ChevronDown size={22} className="text-blue-700 dark:text-white" />
          </button>
          <p className="mt-2 text-sm text-blue-700 dark:text-slate-300">
            See highlights below
          </p>
        </div>
      </section>
      {/* --- HIGHLIGHTS: Articles & Forum (appear after hero) --- */}
      <div
        id="highlights"
        className="w-full bg-transparent py-12 relative z-20"
        style={{ scrollMarginTop: "88px" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Articles */}
          <div className="relative mb-8">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-white mb-2">
              From Our Doctors
            </h3>
            <p className="text-sm text-blue-700 dark:text-slate-300 mb-4">
              Helpful articles, tips and research highlights
            </p>

            <button
              onClick={() => scrollContainer(articlesRef, "left")}
              aria-label="Previous articles"
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 shadow-md"
              style={{ transform: "translateY(-50%)" }}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => scrollContainer(articlesRef, "right")}
              aria-label="Next articles"
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 shadow-md"
              style={{ transform: "translateY(-50%)" }}
            >
              <ChevronRight size={18} />
            </button>

            <div
              ref={articlesRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrolling-touch no-scrollbar py-2 px-1"
            >
              {doctorArticles.map((a) => (
                <article
                  key={a.id}
                  className="group snap-center min-w-[320px] max-w-sm bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-xl p-4 shadow-md transform transition-all hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
                >
                  <div className="w-full h-40 overflow-hidden rounded-md mb-3">
                    <img
                      src={a.image}
                      alt={a.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://picsum.photos/seed/placeholder/800/520";
                      }}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-bold text-sm text-blue-900 dark:text-white mb-2">
                    {a.title}
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-slate-300 mb-3">
                    {a.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-blue-500 dark:text-slate-400">
                    <span>{a.author}</span>
                    <span>{a.date}</span>
                  </div>

                  <div className="absolute right-4 bottom-4">
                    <button
                      onClick={() => navigate("/articles")}
                      className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-lg hover:scale-105"
                    >
                      Read Article
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Forum Highlights */}
          <div className="relative">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-white mb-2">
              Forum Highlights
            </h3>
            <p className="text-sm text-blue-700 dark:text-slate-300 mb-4">
              Top questions and expert answers from our community
            </p>

            <button
              onClick={() => scrollContainer(forumRef, "left")}
              aria-label="Previous forum"
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 shadow-md"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => scrollContainer(forumRef, "right")}
              aria-label="Next forum"
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 shadow-md"
            >
              <ChevronRight size={18} />
            </button>

            <div
              ref={forumRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrolling-touch no-scrollbar py-2 px-1"
            >
              {forumHighlights.map((f) => (
                <article
                  key={f.id}
                  className="group snap-center min-w-[320px] max-w-sm bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-xl p-4 shadow-md transform transition-all hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
                >
                  <span className="text-[10px] uppercase font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
                    {f.category}
                  </span>
                  <h4 className="font-bold text-sm text-blue-900 dark:text-white mt-2 mb-2">
                    {f.question}
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-slate-300 mb-3">
                    {f.excerpt}
                  </p>
                  <div className="text-xs text-blue-500 dark:text-slate-400">
                    <span>{f.expert}</span>
                  </div>

                  <div className="absolute right-4 bottom-4">
                    <button
                      onClick={() => navigate("/forum")}
                      className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all bg-white dark:bg-slate-700 border border-blue-100 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 dark:text-blue-300 shadow-lg hover:scale-105"
                    >
                      Read More
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/forum")}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700"
              >
                Ask Your Question <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
