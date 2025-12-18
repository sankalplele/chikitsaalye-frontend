import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";

const ARTICLES = [
  {
    id: "a1",
    title: "Health Tips for Working Professionals",
    excerpt:
      "Simple desk exercises and micro-break strategies to reduce neck and back strain.",
    author: "Dr. Anjali Singh",
    date: "Dec 10, 2025",
  },
  {
    id: "a2",
    title: "Seasonal Cold & Cough — Prevention",
    excerpt:
      "Practical home remedies and when to seek medical advice for coughs.",
    author: "Dr. Rajesh Gupta",
    date: "Nov 28, 2025",
  },
  {
    id: "a3",
    title: "Managing Stress at Work",
    excerpt:
      "Mindfulness techniques and short routines to calm anxiety during work hours.",
    author: "Dr. R.K. Verma",
    date: "Oct 15, 2025",
  },
  {
    id: "a4",
    title: "Healthy Eating on a Budget",
    excerpt: "Affordable meal plans and grocery tips for balanced nutrition.",
    author: "Dt. Arun Kumar",
    date: "Sep 30, 2025",
  },
  {
    id: "a5",
    title: "Sleep Hygiene for Shift Workers",
    excerpt:
      "How to manage circadian rhythm disruptions and improve sleep quality.",
    author: "Dr. Neha Gupta",
    date: "Aug 20, 2025",
  },
  {
    id: "a6",
    title: "Exercise Quick-Routines",
    excerpt: "10-minute routines you can do at your desk or in small spaces.",
    author: "Dr. V.K. Verma",
    date: "Jul 12, 2025",
  },
];

export default function ArticlesPage() {
  const navigate = useNavigate();
  useEffect(() => {
    // Ensure page starts at top when navigated to from other pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:bg-slate-900 relative font-sans pt-28 pb-20 transition-colors duration-300">
      <div className="hidden dark:block absolute inset-0 bg-slate-900 pointer-events-none z-0" />
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-white"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-blue-900 dark:text-white">
              Articles & Tips
            </h1>
            <p className="text-sm text-blue-700 dark:text-slate-300">
              Helpful articles, research and doctor tips
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((a) => (
            <article
              key={a.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow hover:shadow-xl transition-all"
            >
              <h3 className="font-bold text-lg text-blue-900 dark:text-white mb-2">
                {a.title}
              </h3>
              <p className="text-sm text-blue-700 dark:text-slate-300 mb-3">
                {a.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-blue-500 dark:text-slate-400">
                  {a.author}
                </div>
                <div className="text-xs text-blue-500 dark:text-slate-400">
                  {a.date}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
