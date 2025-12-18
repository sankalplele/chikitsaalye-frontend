import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Clock,
  GraduationCap,
  Building,
} from "lucide-react";

// --- DUMMY DATA FOR PROFILE (Consistent IDs) ---
const DUMMY_DOCTORS_FULL = [
  // --- EXISTING D1-D6 ---
  {
    id: "d1",
    name: "Dr. Rajesh Gupta",
    category: "General Physician",
    education: "MBBS, MD (Medicine)",
    experience: "12 Years",
    hospital: "City Care Clinic",
    location: "Civil Lines, Kanpur",
    fees: 500,
    rating: 4.5,
    about:
      "Dr. Rajesh Gupta is a senior General Physician with over 12 years of experience in treating chronic illnesses and acute infections.",
    slots: ["10:00 AM", "10:30 AM", "11:00 AM", "05:00 PM", "05:30 PM"],
  },
  {
    id: "d2",
    name: "Dr. Anjali Singh",
    category: "Gynaecologist",
    education: "MBBS, MS (Obs & Gynae)",
    experience: "15 Years",
    hospital: "Women's Health Center",
    location: "Swaroop Nagar, Kanpur",
    fees: 800,
    rating: 4.8,
    about:
      "Dr. Anjali Singh specializes in high-risk pregnancies, infertility treatments, and laparoscopic surgeries.",
    slots: ["09:00 AM", "09:30 AM", "12:00 PM", "04:00 PM"],
  },
  {
    id: "d3",
    name: "Dr. V.K. Verma",
    category: "Orthopedics",
    education: "MBBS, MS (Ortho)",
    experience: "20 Years",
    hospital: "Bone & Joint Clinic",
    location: "Kakadeo, Kanpur",
    fees: 700,
    rating: 4.2,
    about:
      "Dr. V.K. Verma is a renowned Orthopedic surgeon specializing in joint replacement and sports injuries.",
    slots: ["11:00 AM", "11:30 AM", "02:00 PM", "06:00 PM"],
  },
  {
    id: "d4",
    name: "Dr. Susan Methews",
    category: "Cardiologist",
    education: "MBBS, DM (Cardiology)",
    experience: "18 Years",
    hospital: "Heart Care Institute",
    location: "Mall Road, Kanpur",
    fees: 1200,
    rating: 4.9,
    about:
      "Dr. Susan Methews is a leading Cardiologist with expertise in interventional cardiology and heart failure management.",
    slots: ["10:00 AM", "01:00 PM", "05:00 PM"],
  },
  {
    id: "d5",
    name: "Dr. R.K. Mishra",
    category: "Neurologist",
    hospital: "Brain Center",
    fees: 1500,
    rating: 4.7,
    experience: "10 Years",
    location: "Kidwai Nagar, Kanpur",
    education: "MBBS, DM (Neuro)",
    slots: ["11:00 AM", "03:00 PM"],
    about:
      "Specialist in neurological disorders, migraines, and stroke management.",
  },
  {
    id: "d6",
    name: "Dr. P.K. Sharma",
    category: "Dermatologist",
    hospital: "Skin Glow Clinic",
    fees: 600,
    rating: 4.4,
    experience: "8 Years",
    location: "Gumti No. 5, Kanpur",
    education: "MBBS, MD (Derma)",
    slots: ["05:00 PM", "06:00 PM"],
    about:
      "Expert in clinical and cosmetic dermatology, including laser treatments and acne management.",
  },

  // --- NEW ADDITIONS (D7 - D25) ---
  {
    id: "d7",
    name: "Dr. Amit Kumar",
    category: "Pediatrician",
    education: "MBBS, MD (Pediatrics)",
    experience: "9 Years",
    hospital: "Little Stars Clinic",
    location: "Civil Lines, Kanpur",
    fees: 400,
    rating: 4.6,
    about:
      "Dr. Amit Kumar is dedicated to child health, specializing in newborn care, vaccinations, and pediatric growth monitoring.",
    slots: ["09:00 AM", "10:00 AM", "06:00 PM", "07:00 PM"],
  },
  {
    id: "d8",
    name: "Dr. Neha Kapoor",
    category: "Dentist",
    education: "BDS, MDS (Orthodontics)",
    experience: "6 Years",
    hospital: "Smile Dental Care",
    location: "Swaroop Nagar, Kanpur",
    fees: 300,
    rating: 4.7,
    about:
      "Dr. Neha Kapoor is an expert in smile designing, braces, root canals, and cosmetic dentistry.",
    slots: ["11:00 AM", "12:00 PM", "05:00 PM", "06:00 PM"],
  },
  {
    id: "d9",
    name: "Dr. S.K. Singh",
    category: "ENT Specialist",
    education: "MBBS, MS (ENT)",
    experience: "14 Years",
    hospital: "Kanpur ENT Centre",
    location: "Kakadeo, Kanpur",
    fees: 500,
    rating: 4.3,
    about:
      "Dr. S.K. Singh specializes in micro-ear surgery, endoscopic sinus surgery, and vertigo treatment.",
    slots: ["10:30 AM", "01:00 PM", "06:30 PM"],
  },
  {
    id: "d10",
    name: "Dr. Priya Desai",
    category: "Psychiatrist",
    education: "MBBS, MD (Psychiatry)",
    experience: "8 Years",
    hospital: "Mind Wellness Clinic",
    location: "Mall Road, Kanpur",
    fees: 1000,
    rating: 4.8,
    about:
      "Dr. Priya Desai provides compassionate care for anxiety, depression, and stress management counselling.",
    slots: ["04:00 PM", "05:00 PM", "06:00 PM"],
  },
  {
    id: "d11",
    name: "Dr. Rajiv Malhotra",
    category: "Oncologist",
    education: "MBBS, DM (Medical Oncology)",
    experience: "22 Years",
    hospital: "Cancer Care Hub",
    location: "Kidwai Nagar, Kanpur",
    fees: 2000,
    rating: 4.9,
    about:
      "Dr. Rajiv Malhotra is a highly respected oncologist with vast experience in chemotherapy and targeted cancer therapies.",
    slots: ["11:00 AM", "02:00 PM"],
  },
  {
    id: "d12",
    name: "Dr. Meera Joshi",
    category: "Ophthalmologist",
    education: "MBBS, MS (Ophthalmology)",
    experience: "11 Years",
    hospital: "Vision Eye Centre",
    location: "Gumti No. 5, Kanpur",
    fees: 450,
    rating: 4.5,
    about:
      "Dr. Meera Joshi specializes in cataract surgery, LASIK, and glaucoma management.",
    slots: ["10:00 AM", "11:00 AM", "06:00 PM"],
  },
  {
    id: "d13",
    name: "Dr. Suresh Reddy",
    category: "Urologist",
    education: "MBBS, MCh (Urology)",
    experience: "16 Years",
    hospital: "Kidney Stone Clinic",
    location: "Arya Nagar, Kanpur",
    fees: 900,
    rating: 4.6,
    about:
      "Dr. Suresh Reddy is an expert in treating kidney stones, prostate issues, and urinary tract infections.",
    slots: ["05:00 PM", "05:30 PM", "06:00 PM"],
  },
  {
    id: "d14",
    name: "Dr. Anita Saxena",
    category: "Gastroenterologist",
    education: "MBBS, DM (Gastroenterology)",
    experience: "13 Years",
    hospital: "Digestive Health Care",
    location: "Govind Nagar, Kanpur",
    fees: 800,
    rating: 4.7,
    about:
      "Dr. Anita Saxena specializes in liver diseases, endoscopy, and digestive disorders.",
    slots: ["12:00 PM", "01:00 PM", "02:00 PM"],
  },
  {
    id: "d15",
    name: "Dr. Vikram Seth",
    category: "Pulmonologist",
    education: "MBBS, MD (Respiratory Medicine)",
    experience: "10 Years",
    hospital: "Breath Easy Clinic",
    location: "Lal Bangla, Kanpur",
    fees: 600,
    rating: 4.4,
    about:
      "Dr. Vikram Seth treats asthma, COPD, bronchitis, and sleep apnea related issues.",
    slots: ["09:00 AM", "10:00 AM", "07:00 PM"],
  },
  {
    id: "d16",
    name: "Dr. Pooja Agarwal",
    category: "Endocrinologist",
    education: "MBBS, DM (Endocrinology)",
    experience: "9 Years",
    hospital: "Diabetes Care Center",
    location: "P Road, Kanpur",
    fees: 700,
    rating: 4.8,
    about:
      "Dr. Pooja Agarwal focuses on diabetes management, thyroid disorders, and hormonal imbalances.",
    slots: ["10:30 AM", "11:30 AM", "05:30 PM"],
  },
  {
    id: "d17",
    name: "Dr. Arjun Mehta",
    category: "Rheumatologist",
    education: "MBBS, DM (Rheumatology)",
    experience: "7 Years",
    hospital: "Joint Pain Clinic",
    location: "Tilak Nagar, Kanpur",
    fees: 850,
    rating: 4.5,
    about:
      "Dr. Arjun Mehta specializes in arthritis, lupus, and autoimmune diseases.",
    slots: ["03:00 PM", "04:00 PM", "05:00 PM"],
  },
  {
    id: "d18",
    name: "Dr. Kavita Krishnan",
    category: "Nephrologist",
    education: "MBBS, DM (Nephrology)",
    experience: "19 Years",
    hospital: "Renal Care Unit",
    location: "Shyam Nagar, Kanpur",
    fees: 1200,
    rating: 4.9,
    about:
      "Dr. Kavita Krishnan is a senior consultant for kidney failure, dialysis, and transplant management.",
    slots: ["10:00 AM", "12:00 PM"],
  },
  {
    id: "d19",
    name: "Dr. Sameer Khan",
    category: "General Surgeon",
    education: "MBBS, MS (General Surgery)",
    experience: "14 Years",
    hospital: "City Surgical Center",
    location: "Barra, Kanpur",
    fees: 500,
    rating: 4.2,
    about:
      "Dr. Sameer Khan performs laparoscopic surgeries for gallbladder, hernia, and appendix.",
    slots: ["09:00 AM", "11:00 AM", "06:00 PM"],
  },
  {
    id: "d20",
    name: "Dr. Ritu Choudhary",
    category: "Dermatologist",
    education: "MBBS, MD (Dermatology)",
    experience: "5 Years",
    hospital: "Derma Care",
    location: "Jajmau, Kanpur",
    fees: 400,
    rating: 4.3,
    about:
      "Dr. Ritu Choudhary offers treatments for hair loss, anti-aging, and general skin allergies.",
    slots: ["02:00 PM", "03:00 PM", "04:00 PM"],
  },
  {
    id: "d21",
    name: "Dr. Manoj Tiwari",
    category: "Cardiologist",
    education: "MBBS, DM (Cardiology)",
    experience: "25 Years",
    hospital: "Heart Beat Clinic",
    location: "Vijay Nagar, Kanpur",
    fees: 1500,
    rating: 5.0,
    about:
      "Dr. Manoj Tiwari is a pioneer in non-invasive cardiology and preventive heart care.",
    slots: ["09:00 AM", "10:00 AM"],
  },
  {
    id: "d22",
    name: "Dr. Swati Mishra",
    category: "Gynaecologist",
    education: "MBBS, DGO",
    experience: "8 Years",
    hospital: "Mother Care Clinic",
    location: "Kalyanpur, Kanpur",
    fees: 450,
    rating: 4.4,
    about:
      "Dr. Swati Mishra provides complete antenatal care and women's wellness checks.",
    slots: ["11:00 AM", "12:00 PM", "06:00 PM"],
  },
  {
    id: "d23",
    name: "Dr. Alok Gupta",
    category: "Orthopedics",
    education: "MBBS, D.Ortho",
    experience: "12 Years",
    hospital: "Spine & Ortho Clinic",
    location: "Ashok Nagar, Kanpur",
    fees: 600,
    rating: 4.1,
    about:
      "Dr. Alok Gupta specializes in fracture management, back pain, and physiotherapy guidance.",
    slots: ["05:00 PM", "06:00 PM", "07:00 PM"],
  },
  {
    id: "d24",
    name: "Dr. Nidhi Verma",
    category: "Pediatrician",
    education: "MBBS, MD (Pediatrics)",
    experience: "7 Years",
    hospital: "Child Care Hospital",
    location: "Rawatpur, Kanpur",
    fees: 400,
    rating: 4.6,
    about:
      "Dr. Nidhi Verma is known for her friendly approach towards treating childhood illnesses and allergies.",
    slots: ["09:30 AM", "10:30 AM", "05:30 PM"],
  },
  {
    id: "d25",
    name: "Dr. Sanjay Patel",
    category: "General Physician",
    education: "MBBS",
    experience: "20 Years",
    hospital: "Family Health Clinic",
    location: "Saket Nagar, Kanpur",
    fees: 300,
    rating: 4.3,
    about:
      "Dr. Sanjay Patel is a trusted family doctor treating common ailments and providing health counseling.",
    slots: ["08:00 AM", "09:00 AM", "07:00 PM", "08:00 PM"],
  },
];

export default function DoctorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Find Doctor by ID
  const doctor = DUMMY_DOCTORS_FULL.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800">Doctor Not Found</h2>
        <p className="text-gray-500 mt-2">
          The doctor profile you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-600 underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    // 1. BACKGROUND & PADDING
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:bg-slate-900 relative font-sans pt-28 pb-10 transition-colors duration-300">
      {/* Dark mode background overlay */}
      <div className="hidden dark:block absolute inset-0 bg-slate-900 pointer-events-none z-0" />

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none fixed z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Search
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Doctor Info Card */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-blue-100 dark:border-slate-700 overflow-hidden p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Avatar Placeholder */}
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 shadow-inner flex-shrink-0">
                  <span className="text-3xl md:text-4xl font-bold">
                    {doctor.name.split(" ")[1][0]}
                  </span>
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                        {doctor.name}
                      </h1>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                          {doctor.category}
                        </span>
                        <span className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full text-sm font-bold">
                          <Star size={14} className="fill-current mr-1" />
                          {doctor.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right hidden md:block">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Consultation Fee
                      </p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ₹{doctor.fees}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center text-gray-600 dark:text-slate-300">
                      <GraduationCap size={18} className="mr-2 text-blue-500" />
                      <span>{doctor.education}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-slate-300">
                      <Building size={18} className="mr-2 text-blue-500" />
                      <span>{doctor.hospital}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-slate-300">
                      <Clock size={18} className="mr-2 text-blue-500" />
                      <span>{doctor.experience} Experience</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-slate-300">
                      <MapPin size={18} className="mr-2 text-blue-500" />
                      <span>{doctor.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 dark:bg-slate-700 my-6" />

              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  About Doctor
                </h3>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                  {doctor.about ||
                    `${doctor.name} is a dedicated ${doctor.category} committed to providing the best healthcare services.`}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-blue-100 dark:border-slate-700 p-6 sticky top-28">
              <div className="md:hidden mb-6 flex justify-between items-center pb-4 border-b border-gray-100 dark:border-slate-700">
                <span className="font-semibold text-gray-700 dark:text-slate-200">
                  Consultation Fee
                </span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  ₹{doctor.fees}
                </span>
              </div>

              <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-5 flex items-center">
                <Calendar
                  size={20}
                  className="mr-2 text-blue-600 dark:text-blue-400"
                />
                Select Date
              </h2>

              {/* Fake Calendar Strip */}
              <div className="flex justify-between gap-2 mb-6 overflow-x-auto pb-2">
                {[0, 1, 2, 3].map((offset) => {
                  const d = new Date();
                  d.setDate(d.getDate() + offset);
                  const dayName = d.toLocaleDateString("en-US", {
                    weekday: "short",
                  });
                  const dayNum = d.getDate();
                  return (
                    <button
                      key={offset}
                      className={`flex flex-col items-center justify-center min-w-[60px] p-2 rounded-xl border transition-all ${
                        offset === 0
                          ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                          : "bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-300 hover:border-blue-400"
                      }`}
                    >
                      <span className="text-xs font-medium opacity-80">
                        {dayName}
                      </span>
                      <span className="text-lg font-bold">{dayNum}</span>
                    </button>
                  );
                })}
              </div>

              <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-5 flex items-center">
                <Clock
                  size={20}
                  className="mr-2 text-blue-600 dark:text-blue-400"
                />
                Available Slots Today
              </h2>

              <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 mb-8">
                {doctor.slots.map((slot) => (
                  <button
                    key={slot}
                    className="py-2 px-1 border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl text-xs font-semibold text-gray-700 dark:text-slate-200 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:bg-blue-50 dark:focus:bg-blue-900/30 transition-all active:scale-95"
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 transform transition hover:-translate-y-0.5 active:scale-95">
                Book Appointment
              </button>

              <p className="text-center text-xs text-gray-400 dark:text-slate-500 mt-4">
                No booking fee required instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
