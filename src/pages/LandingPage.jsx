import React, { useState, useEffect, useRef } from "react";
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
  FileText,
  List,
  Scan,
  Droplet,
  Thermometer,
  Bone,
  ArrowRight,
  ThumbsUp,
  ArrowDown, // Used for the scroll indicator
} from "lucide-react";

// --- SEARCH DATABASE ---
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
    id: "d4",
    name: "Dr. Sharma",
    type: "private",
    category: "Cardiologist",
    rating: 4.7,
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
    id: "kgmu",
    name: "KGMU Lucknow",
    type: "govt",
    category: "Medical College",
    rating: 4.8,
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
  { id: "t1", name: "CBC", category: "Blood Test", kind: "test" },
];

// --- MOCK FORUM HIGHLIGHTS DATA ---
const FORUM_HIGHLIGHTS = [
  {
    id: "f1",
    question:
      "Is constant fatigue and slight hair fall a sign of thyroid issues?",
    excerpt:
      "While fatigue and hair fall are common signs of stress, they are also classic symptoms of hypothyroidism...",
    doctor: {
      name: "Dr. Priya Sharma",
      specialty: "Endocrinologist, Delhi",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    topicImage:
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=200&h=200&fit=crop",
    likes: 124,
    answerCount: 5,
  },
  {
    id: "f2",
    question: "Can I take paracetamol on an empty stomach for sudden fever?",
    excerpt:
      "It is generally advised not to take painkillers like paracetamol on a completely empty stomach...",
    doctor: {
      name: "Dr. Arun Kumar",
      specialty: "General Physician, Mumbai",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    topicImage:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop",
    likes: 89,
    answerCount: 3,
  },
  {
    id: "f3",
    question:
      "What are early warning signs of high blood sugar in pre-diabetics?",
    excerpt:
      "Look out for increased thirst (polydipsia), frequent urination (polyuria), especially at night...",
    doctor: {
      name: "Dr. K. Verma",
      specialty: "Diabetologist, Lucknow",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
    },
    topicImage:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&h=200&fit=crop",
    likes: 210,
    answerCount: 8,
  },
  {
    id: "f4",
    question: "Severe lower back pain after lifting heavy weights at the gym.",
    excerpt:
      "This sounds like a potential muscle strain or a lumbar disc issue. Apply ice immediately...",
    doctor: {
      name: "Dr. S. Singh",
      specialty: "Orthopedic Surgeon, Kanpur",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    topicImage:
      "https://images.unsplash.com/photo-1609741198262-395037749c2d?w=200&h=200&fit=crop",
    likes: 156,
    answerCount: 4,
  },
];

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("doctors");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const forumRef = useRef(null);

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (item) => {
    if (item.kind === "doctor") navigate(`/doctor/${item.id}`);
    else if (item.kind === "hospital") navigate(`/hospital/${item.id}`);
    else navigate(`/search?type=labs&q=${item.name}`);
    setShowSuggestions(false);
  };

  const handleCategoryClick = (catId) =>
    navigate(`/search?type=${activeTab}&category=${catId}`);

  const getIcon = (kind) => {
    if (kind === "doctor") return <User size={18} />;
    if (kind === "hospital") return <Building size={18} />;
    return <Microscope size={18} />;
  };

  const scrollToForum = () => {
    forumRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const CATEGORIES = {
    doctors: [
      { icon: Stethoscope, label: "General", id: "general" },
      { icon: Baby, label: "Women", id: "gynae" },
      { icon: Heart, label: "Heart", id: "cardio" },
      { icon: Bone, label: "Bone", id: "ortho" },
      { icon: Smile, label: "Dental", id: "dental" },
      { icon: Eye, label: "Eye", id: "eye" },
    ],
    hospitals: [
      { icon: Building, label: "Govt", id: "govt" },
      { icon: Shield, label: "Private", id: "private" },
      { icon: Activity, label: "Trauma", id: "trauma" },
      { icon: Heart, label: "Heart Inst", id: "cardio_center" },
      { icon: Baby, label: "Maternity", id: "maternity" },
      { icon: Eye, label: "Eye Center", id: "eye_center" },
    ],
    labs: [
      { icon: Thermometer, label: "Thyroid", id: "thyroid" },
      { icon: TestTube, label: "CBC", id: "cbc" },
      { icon: Scan, label: "MRI / CT", id: "mri" },
      { icon: Bone, label: "X-Ray", id: "xray" },
      { icon: Droplet, label: "Diabetes", id: "diabetes" },
      { icon: User, label: "Full Body", id: "fullbody" },
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

        {/* Emergency Toggle - FIXED BOTTOM RIGHT */}
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
          {/* HEADLINE */}
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
            {/* 1. SEARCH SECTION (Middle Column on Desktop, FIRST on Mobile) */}
            <div className="flex flex-col gap-4 w-full order-1 lg:order-2 relative z-50">
              {/* A. SEARCH BAR */}
              <div
                className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 relative w-full border border-white/20 z-50"
                onClick={(e) => e.stopPropagation()}
                style={{ zIndex: 50 }}
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

                <div className="flex gap-2 relative z-50">
                  <div className="flex-1 relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
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
                        isEmergency ? "Location..." : `Search ${activeTab}...`
                      }
                      className="w-full pl-10 pr-4 py-3 text-base font-medium text-gray-900 bg-gray-50/50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all relative z-10"
                      onFocus={() =>
                        searchQuery.length > 0 && setShowSuggestions(true)
                      }
                    />

                    {/* SUGGESTIONS DROPDOWN */}
                    {showSuggestions && !isEmergency && (
                      <div
                        className="absolute top-[calc(100%+10px)] left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden max-h-[300px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
                        style={{ zIndex: 9999 }}
                      >
                        {suggestions.length > 0 ? (
                          suggestions.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => handleSuggestionClick(item)}
                              className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 group transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 group-hover:bg-blue-200 group-hover:scale-110 transition-all">
                                  {getIcon(item.kind)}
                                </div>
                                <div>
                                  <p className="font-bold text-gray-900 text-sm group-hover:text-blue-700">
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

            {/* 2. LIVE OPD */}
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

          {/* === 4. NEW CENTRAL SCROLL-TO-FORUM BUTTON (FILLING THE SPACE) === */}
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
            {/* Section Header */}
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
                  Health Questions & Answers
                </h2>
                <p className="text-gray-600 text-lg">
                  Real questions answered by verified doctors.
                </p>
              </div>
              <button
                onClick={() => navigate("/forum")}
                className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
              >
                View all questions <ArrowRight size={20} />
              </button>
            </div>

            {/* Forum Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FORUM_HIGHLIGHTS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => navigate(`/forum/question/${item.id}`)}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-snug group-hover:text-blue-700 transition-colors">
                    {item.question}
                  </h3>

                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.doctor.image}
                        alt={item.doctor.name}
                        className="w-10 h-10 rounded-full border-2 border-blue-50 object-cover"
                      />
                      <div>
                        <p className="font-bold text-gray-900 text-sm">
                          {item.doctor.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.doctor.specialty}
                        </p>
                      </div>
                    </div>
                    <img
                      src={item.topicImage}
                      alt="Topic"
                      className="w-20 h-20 rounded-xl object-cover shadow-sm hidden sm:block"
                    />
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    "{item.excerpt}"
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={16} className="text-blue-500" />{" "}
                        {item.likes}
                      </span>
                      <span>
                        {item.answerCount}{" "}
                        {item.answerCount === 1 ? "Answer" : "Answers"}
                      </span>
                    </div>
                    <span className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:underline">
                      Read Full Answer <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 md:hidden">
              <button
                onClick={() => navigate("/forum")}
                className="w-full py-3 bg-blue-50 text-blue-700 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
              >
                View all questions <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* TRUST SECTION */}
      {!isEmergency && (
        <section className="py-20 bg-gray-50 relative z-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 tracking-tight">
              Why Bharat Trusts Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white rounded-3xl border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-sm">
                  <Shield size={32} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-slate-800">
                  Govt Verified
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Direct integration with KGMU and District Hospitals.
                </p>
              </div>
              <div className="p-8 bg-white rounded-3xl border border-green-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600 shadow-sm">
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-slate-800">
                  Instant Booking
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Skip the registration lines at OPD counters.
                </p>
              </div>
              <div className="p-8 bg-white rounded-3xl border border-purple-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600 shadow-sm">
                  <MessageCircle size={32} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-slate-800">
                  WhatsApp Support
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
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
