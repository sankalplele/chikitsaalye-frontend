import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowLeft,
  ThumbsUp,
  MessageCircle,
  Share2,
  Plus,
  Filter,
  User,
  Heart,
  Brain,
  Baby,
  Activity,
  CheckCircle,
  TrendingUp,
  ChevronRight,
  ArrowRight,
  Stethoscope,
} from "lucide-react";

// --- MOCK DATA ---
const FORUM_POSTS = [
  {
    id: 1,
    category: "General Health",
    question:
      "Is constant fatigue and slight hair fall a sign of thyroid issues?",
    excerpt:
      "While fatigue and hair fall are common signs of stress, they are also classic symptoms of hypothyroidism. I recommend getting a TSH, T3, and T4 panel test done to rule out any hormonal imbalances...",
    doctor: {
      name: "Dr. Priya Sharma",
      specialty: "Endocrinologist",
      exp: "12 Yrs Exp",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      verified: true,
    },
    likes: 124,
    views: "1.2k",
    time: "2 hours ago",
  },
  {
    id: 2,
    category: "Diet & Nutrition",
    question:
      "What is the best diet plan for losing belly fat without losing muscle mass?",
    excerpt:
      "Focus on a high-protein diet (1.5g per kg of body weight) combined with strength training. Avoid refined sugars and processed carbs...",
    doctor: {
      name: "Dt. Arun Kumar",
      specialty: "Dietitian & Nutritionist",
      exp: "8 Yrs Exp",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      verified: true,
    },
    likes: 342,
    views: "5.5k",
    time: "5 hours ago",
  },
  {
    id: 3,
    category: "Skin & Hair",
    question:
      "Sudden acne breakout on cheeks at age 28. What could be the cause?",
    excerpt:
      "Adult acne is often hormonal. If it's concentrated on the lower cheeks and jawline, it might be related to PCOD or stress hormones...",
    doctor: {
      name: "Dr. Neha Gupta",
      specialty: "Dermatologist",
      exp: "15 Yrs Exp",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      verified: true,
    },
    likes: 89,
    views: "900",
    time: "1 day ago",
  },
  {
    id: 4,
    category: "Mental Health",
    question: "How to deal with anxiety attacks at night before sleeping?",
    excerpt:
      "Sleep anxiety is very common. Try the 4-7-8 breathing technique: Inhale for 4 seconds, hold for 7, exhale for 8. Avoid screens 1 hour before bed...",
    doctor: {
      name: "Dr. R.K. Verma",
      specialty: "Psychiatrist",
      exp: "20 Yrs Exp",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
      verified: true,
    },
    likes: 560,
    views: "10k",
    time: "2 days ago",
  },
  {
    id: 5,
    category: "Cardiology",
    question: "Sharp pain in left chest while running, subsides on rest.",
    excerpt:
      "This is a classic presentation of stable angina, though it could be muscular. Given the exertion-based nature, a TMT (Treadmill Test) is highly recommended...",
    doctor: {
      name: "Dr. A.K. Singh",
      specialty: "Cardiologist",
      exp: "18 Yrs Exp",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      verified: true,
    },
    likes: 410,
    views: "8.2k",
    time: "3 days ago",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Topics", icon: Filter },
  { id: "skin", label: "Skin & Hair", icon: User },
  { id: "diet", label: "Diet", icon: Activity },
  { id: "women", label: "Women's Health", icon: Baby },
  { id: "mental", label: "Mental Health", icon: Brain },
  { id: "heart", label: "Heart", icon: Heart },
];

export default function ForumPage() {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:bg-slate-900 relative font-sans pt-24 pb-20 transition-colors duration-300">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none fixed z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Dark overlay to match other pages so dark mode panels are visible */}
      <div className="hidden dark:block absolute inset-0 bg-slate-900 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* 2. HEADER SECTION */}
        <div className="mb-10">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full bg-blue-100 dark:bg-slate-800/50 text-blue-700 dark:text-white hover:bg-blue-200 dark:hover:bg-slate-700 transition-colors mb-6 flex items-center gap-3"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </button>

          <div className="flex flex-col lg:flex-row justify-between items-end gap-6">
            <div className="w-full lg:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-white mb-3">
                Health Forum
              </h1>
              <p className="text-blue-700 dark:text-slate-300 text-lg mb-6">
                Ask questions, get answers from verified doctors, and read about
                health topics that matter to you.
              </p>

              {/* Search Bar */}
              <div className="relative w-full shadow-2xl">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 dark:text-slate-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 dark:text-slate-200 placeholder-gray-500 dark:placeholder-slate-400 bg-white dark:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/50 dark:focus:ring-blue-900/50 border border-gray-200 dark:border-slate-700"
                  placeholder="Search topics (e.g. 'fever', 'weight loss', 'acne')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 whitespace-nowrap">
              <Plus size={20} />
              Ask a Free Question
            </button>
          </div>
        </div>

        {/* 3. MAIN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_300px] gap-8 items-start">
          {/* LEFT SIDEBAR: CATEGORIES (Sticky) */}
          <div className="hidden lg:block sticky top-10 h-fit">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 border-4 border-white/10 dark:border-slate-700/50 transition-colors duration-300">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 px-2 text-sm uppercase tracking-wider text-opacity-70 dark:text-opacity-70">
                Browse Topics
              </h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCat(cat.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      activeCat === cat.id
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 shadow-sm"
                        : "text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <cat.icon size={18} />
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE: FEED */}
          <div className="flex flex-col gap-6">
            {/* Mobile Categories (Horizontal Scroll) */}
            <div className="lg:hidden flex overflow-x-auto gap-3 pb-2 hide-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold border transition-colors ${
                    activeCat === cat.id
                      ? "bg-white dark:bg-slate-700 text-blue-900 dark:text-white border-white dark:border-slate-600 shadow-md"
                      : "bg-blue-800/50 dark:bg-slate-800/50 text-blue-100 dark:text-slate-300 border-blue-700 dark:border-slate-700 hover:bg-blue-800 dark:hover:bg-slate-700"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Question Cards */}
            {FORUM_POSTS.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-6 hover:shadow-xl transition-all duration-300"
              >
                {/* Question Header */}
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-200 px-2 py-1 rounded-md tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-3 leading-snug cursor-pointer hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                    {post.question}
                  </h3>
                </div>

                {/* Answer Section */}
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-5 mb-5 border border-gray-100 dark:border-slate-700 relative">
                  <div className="absolute top-4 right-4 text-gray-200">
                    <MessageCircle size={24} className="opacity-20" />
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={post.doctor.image}
                      alt={post.doctor.name}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                        {post.doctor.name}
                        {post.doctor.verified && (
                          <CheckCircle
                            size={14}
                            className="text-blue-500 dark:text-blue-400 fill-blue-500 dark:fill-blue-400 text-white"
                          />
                        )}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        {post.doctor.specialty} • {post.doctor.exp}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-slate-300 text-sm leading-relaxed">
                    {post.excerpt}
                    <button className="text-blue-600 dark:text-blue-400 font-bold text-xs ml-2 hover:underline">
                      Read Full Answer
                    </button>
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 px-2 py-1 rounded-lg">
                      <ThumbsUp size={18} />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 px-2 py-1 rounded-lg">
                      <Share2 size={18} />
                      Share
                    </button>
                  </div>
                  <span className="text-xs font-medium text-gray-400 dark:text-slate-500">
                    {post.views} Views • {post.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Load More */}
            <button className="w-full py-4 text-white font-bold text-sm bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm">
              Load More Questions
            </button>
          </div>

          {/* RIGHT SIDEBAR: TRENDING & TOP DOCS (Sticky + Scrollable Fix) */}
          <div
            className="hidden lg:block space-y-6 sticky top-10 [&::-webkit-scrollbar]:hidden"
            // Calculate available height
          >
            {/* Trending Box */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-white/10 dark:border-slate-700/50 p-6 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-5">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                  <TrendingUp size={20} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  Trending Now
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Dengue Symptoms",
                  "Hair Transplant Cost",
                  "Vitamin D Deficiency",
                  "Sleep Disorders",
                ].map((topic, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 p-2 -mx-2 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-600 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      #{topic.replace(/\s/g, "")}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-gray-300 group-hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1"
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Doctors Promo */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-lg p-6 text-white dark:text-white border border-blue-700 dark:border-slate-700 transition-colors duration-300">
              <h3 className="font-bold text-lg mb-1">Meet Top Doctors</h3>
              <p className="text-blue-200 dark:text-slate-300 text-xs mb-5">
                Verified specialists online now
              </p>

              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white/10 dark:bg-slate-700/50 p-3 rounded-xl backdrop-blur-sm hover:bg-white/20 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-white/5 dark:border-slate-600"
                  >
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-600 flex items-center justify-center text-blue-900 dark:text-white">
                      <Stethoscope size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Dr. A. K. Singh</p>
                      <p className="text-[10px] text-blue-200 dark:text-slate-400">
                        Cardiologist • 15 Yrs
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-5 py-3 bg-white dark:bg-slate-700 text-blue-900 dark:text-white text-xs font-bold rounded-xl hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors shadow-sm flex items-center justify-center gap-1">
                View All Doctors <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
