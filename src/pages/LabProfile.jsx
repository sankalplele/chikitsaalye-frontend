import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Microscope,
  CheckCircle,
  Star,
  Plus,
} from "lucide-react";

// Dummy labs database
const DUMMY_LABS = [
  {
    id: "l1",
    name: "Dr. Lal PathLabs",
    location: "Civil Lines, Kanpur",
    rating: 4.5,
    homeCollection: true,
    fullTestMenu: [
      {
        name: "CBC (Complete Blood Count)",
        price: 299,
        category: "Hematology",
      },
      { name: "Thyroid Profile (Total)", price: 550, category: "Biochemistry" },
      { name: "Lipid Profile", price: 600, category: "Biochemistry" },
      {
        name: "Liver Function Test (LFT)",
        price: 800,
        category: "Biochemistry",
      },
      {
        name: "Kidney Function Test (KFT)",
        price: 850,
        category: "Biochemistry",
      },
      { name: "HbA1c", price: 450, category: "Diabetology" },
      { name: "Vitamin D", price: 1100, category: "Vitamins" },
      { name: "Vitamin B12", price: 900, category: "Vitamins" },
    ],
  },
  {
    id: "l2",
    name: "City X-Ray & Scan",
    location: "Swaroop Nagar, Kanpur",
    rating: 4.2,
    homeCollection: false,
    fullTestMenu: [
      { name: "MRI Brain", price: 6500, category: "Radiology" },
      { name: "CT Scan Chest", price: 3500, category: "Radiology" },
      { name: "NCCT Head", price: 2800, category: "Radiology" },
      { name: "Ultrasound Whole Abdomen", price: 1200, category: "Radiology" },
      { name: "Digital X-Ray Chest", price: 400, category: "Radiology" },
      { name: "MRI Spine", price: 7000, category: "Radiology" },
      { name: "CT Urography", price: 5500, category: "Radiology" },
    ],
  },
  {
    id: "l3",
    name: "Urban Diagnostics",
    location: "Kakadeo, Kanpur",
    rating: 4.0,
    homeCollection: true,
    fullTestMenu: [
      { name: "Lipid Profile", price: 600, category: "Biochemistry" },
      { name: "Vitamin D Total", price: 1200, category: "Vitamins" },
      { name: "Thyroid Profile", price: 550, category: "Biochemistry" },
      { name: "Vitamin B12", price: 900, category: "Vitamins" },
      { name: "Blood Sugar Fasting", price: 100, category: "Diabetology" },
      { name: "Urine Routine", price: 150, category: "Pathology" },
      { name: "Kidney Function Test", price: 750, category: "Biochemistry" },
      { name: "Electrolytes", price: 400, category: "Biochemistry" },
    ],
  },
  {
    id: "l4",
    name: "Metro Imaging",
    location: "Gumti No. 5, Kanpur",
    rating: 3.9,
    homeCollection: false,
    fullTestMenu: [
      { name: "X-Ray Chest PA View", price: 400, category: "Radiology" },
      { name: "Ultrasound Abdomen", price: 900, category: "Radiology" },
      { name: "X-Ray PNS", price: 500, category: "Radiology" },
      { name: "TMT (Treadmill Test)", price: 1500, category: "Cardiology" },
      { name: "Echo Cardiography", price: 1800, category: "Cardiology" },
      { name: "ECG", price: 250, category: "Cardiology" },
      { name: "Ultrasound Pelvis", price: 900, category: "Radiology" },
    ],
  },
  {
    id: "l5",
    name: "Pathkind Labs",
    location: "Kidwai Nagar, Kanpur",
    rating: 4.3,
    homeCollection: true,
    fullTestMenu: [
      {
        name: "HbA1c (Glycosylated Hemoglobin)",
        price: 450,
        category: "Diabetology",
      },
      { name: "Fasting Blood Sugar", price: 100, category: "Diabetology" },
      { name: "PP Blood Sugar", price: 100, category: "Diabetology" },
      { name: "Insulin Fasting", price: 600, category: "Diabetology" },
      { name: "C-Peptide", price: 900, category: "Diabetology" },
      { name: "Urine Microalbumin", price: 450, category: "Nephrology" },
      { name: "Kidney Function Test", price: 800, category: "Biochemistry" },
    ],
  },
  {
    id: "l6",
    name: "SRL Diagnostics",
    location: "Mall Road, Kanpur",
    rating: 4.6,
    homeCollection: true,
    fullTestMenu: [
      { name: "Full Body Checkup", price: 1999, category: "Packages" },
      { name: "Vitamin B12", price: 900, category: "Vitamins" },
      { name: "Vitamin D3", price: 1200, category: "Vitamins" },
      { name: "Iron Studies", price: 850, category: "Hematology" },
      { name: "Ferritin", price: 600, category: "Hematology" },
      { name: "Allergy Panel", price: 3000, category: "Allergy" },
      {
        name: "CRP (C-Reactive Protein)",
        price: 450,
        category: "Inflammation",
      },
      { name: "RA Factor", price: 500, category: "Arthritis" },
    ],
  },
  {
    id: "l7",
    name: "Thyrocare Aarogyam",
    location: "Govind Nagar, Kanpur",
    rating: 4.4,
    homeCollection: true,
    fullTestMenu: [
      { name: "Aarogyam B Profile", price: 1100, category: "Packages" },
      { name: "Iron Deficiency Profile", price: 650, category: "Hematology" },
      { name: "Thyroid Profile", price: 500, category: "Biochemistry" },
      { name: "Testosterone Total", price: 400, category: "Hormones" },
      { name: "Hepatitis B Surface Antigen", price: 350, category: "Serology" },
      { name: "HCV", price: 450, category: "Serology" },
      { name: "HIV I & II", price: 500, category: "Serology" },
    ],
  },
  {
    id: "l8",
    name: "Khanna Pathology",
    location: "Arya Nagar, Kanpur",
    rating: 4.1,
    homeCollection: false,
    fullTestMenu: [
      { name: "Dengue NS1 Antigen", price: 600, category: "Serology" },
      { name: "Platelet Count", price: 150, category: "Hematology" },
      { name: "Malaria Antigen", price: 300, category: "Serology" },
      { name: "Widal Test (Typhoid)", price: 250, category: "Serology" },
      { name: "Chikungunya IgM", price: 700, category: "Serology" },
      { name: "CBC", price: 250, category: "Hematology" },
    ],
  },
  {
    id: "l9",
    name: "Apollo Diagnostics",
    location: "Kalyanpur, Kanpur",
    rating: 4.5,
    homeCollection: true,
    fullTestMenu: [
      {
        name: "Kidney Function Test (KFT)",
        price: 750,
        category: "Biochemistry",
      },
      { name: "Uric Acid", price: 250, category: "Biochemistry" },
      { name: "Electrolytes (Na/K/Cl)", price: 400, category: "Biochemistry" },
      { name: "Calcium Total", price: 300, category: "Biochemistry" },
      { name: "Phosphorus", price: 280, category: "Biochemistry" },
      { name: "Serum Creatinine", price: 200, category: "Biochemistry" },
      { name: "Blood Urea Nitrogen", price: 220, category: "Biochemistry" },
    ],
  },
  {
    id: "l10",
    name: "Heritage X-Ray",
    location: "Lal Bangla, Kanpur",
    rating: 3.8,
    homeCollection: false,
    fullTestMenu: [
      { name: "ECG", price: 300, category: "Cardiology" },
      { name: "X-Ray Knee", price: 500, category: "Radiology" },
      { name: "X-Ray Spine", price: 600, category: "Radiology" },
      { name: "X-Ray Shoulder", price: 500, category: "Radiology" },
      { name: "Ultrasound Pregnancy", price: 1100, category: "Radiology" },
      { name: "Color Doppler", price: 2000, category: "Radiology" },
    ],
  },
  {
    id: "l11",
    name: "Redcliffe Labs",
    location: "Shyam Nagar, Kanpur",
    rating: 4.7,
    homeCollection: true,
    fullTestMenu: [
      { name: "Smart Full Body Checkup", price: 1499, category: "Packages" },
      {
        name: "Thyroid Stimulating Hormone (TSH)",
        price: 300,
        category: "Biochemistry",
      },
      { name: "HbA1c", price: 400, category: "Diabetology" },
      { name: "Vitamin Profile (D & B12)", price: 1599, category: "Packages" },
      { name: "RA Factor", price: 450, category: "Arthritis" },
      { name: "Anti-CCP", price: 1200, category: "Arthritis" },
    ],
  },
  {
    id: "l12",
    name: "Kanpur Advanced Labs",
    location: "P Road, Kanpur",
    rating: 4.0,
    homeCollection: true,
    fullTestMenu: [
      { name: "Urine Culture", price: 600, category: "Microbiology" },
      { name: "Stool Routine", price: 200, category: "Pathology" },
      { name: "Pus Culture", price: 700, category: "Microbiology" },
      { name: "Blood Culture", price: 900, category: "Microbiology" },
      { name: "Sputum AFB", price: 250, category: "Microbiology" },
      { name: "Semen Analysis", price: 500, category: "Pathology" },
    ],
  },
  {
    id: "l13",
    name: "Star Imaging Center",
    location: "Barra 2, Kanpur",
    rating: 4.2,
    homeCollection: false,
    fullTestMenu: [
      { name: "Color Doppler", price: 2500, category: "Radiology" },
      { name: "Ultrasound KUB", price: 1000, category: "Radiology" },
      { name: "Ultrasound Whole Abdomen", price: 1500, category: "Radiology" },
      { name: "X-Ray Chest", price: 400, category: "Radiology" },
      { name: "Mammography", price: 2000, category: "Radiology" },
      { name: "HSG", price: 3500, category: "Radiology" },
    ],
  },
  {
    id: "l14",
    name: "Max Lab",
    location: "Cantt, Kanpur",
    rating: 4.6,
    homeCollection: true,
    fullTestMenu: [
      { name: "Lipid Profile", price: 550, category: "Biochemistry" },
      { name: "Glucose PP", price: 120, category: "Diabetology" },
      { name: "Liver Function Test", price: 700, category: "Biochemistry" },
      { name: "Amylase", price: 650, category: "Biochemistry" },
      { name: "Lipase", price: 700, category: "Biochemistry" },
      { name: "Cardiac Markers", price: 1500, category: "Cardiology" },
    ],
  },
  {
    id: "l15",
    name: "Care Diagnostics",
    location: "Jajmau, Kanpur",
    rating: 3.9,
    homeCollection: true,
    fullTestMenu: [
      { name: "Widal Test (Typhoid)", price: 250, category: "Serology" },
      { name: "Malaria Parasite", price: 200, category: "Pathology" },
      { name: "Typhoid IgM/IgG", price: 400, category: "Serology" },
      { name: "Dengue Profile", price: 1200, category: "Serology" },
      { name: "ESR", price: 100, category: "Hematology" },
      { name: "Hemoglobin", price: 150, category: "Hematology" },
    ],
  },
  {
    id: "l16",
    name: "Aadhar Health Institute",
    location: "Vijay Nagar, Kanpur",
    rating: 4.8,
    homeCollection: false,
    fullTestMenu: [
      { name: "MRI Spine", price: 7000, category: "Radiology" },
      { name: "CT Head", price: 3200, category: "Radiology" },
      { name: "CT Abdomen", price: 4500, category: "Radiology" },
      { name: "EEG", price: 1800, category: "Neurology" },
      { name: "NCV Test", price: 2200, category: "Neurology" },
      { name: "BERA", price: 2500, category: "Neurology" },
    ],
  },
  {
    id: "l17",
    name: "Lifeline Pathology",
    location: "Ashok Nagar, Kanpur",
    rating: 4.1,
    homeCollection: true,
    fullTestMenu: [
      { name: "Beta HCG", price: 800, category: "Hormones" },
      { name: "Prolactin", price: 600, category: "Hormones" },
      { name: "FSH/LH", price: 1000, category: "Hormones" },
      { name: "AMH", price: 2500, category: "Hormones" },
      { name: "Progesterone", price: 650, category: "Hormones" },
      { name: "Estradiol", price: 700, category: "Hormones" },
    ],
  },
  {
    id: "l18",
    name: "MediQuest Lab",
    location: "Rawatpur, Kanpur",
    rating: 4.3,
    homeCollection: true,
    fullTestMenu: [
      { name: "Allergy Panel", price: 3500, category: "Allergy" },
      { name: "IgE Total", price: 700, category: "Allergy" },
      { name: "CBC", price: 300, category: "Hematology" },
      { name: "Absolute Eosinophil Count", price: 250, category: "Hematology" },
      { name: "Skin Prick Test", price: 1500, category: "Allergy" },
    ],
  },
  {
    id: "l19",
    name: "Focus Imaging",
    location: "Saket Nagar, Kanpur",
    rating: 4.4,
    homeCollection: false,
    fullTestMenu: [
      { name: "Mammography", price: 2200, category: "Radiology" },
      { name: "OPG (Dental X-Ray)", price: 800, category: "Radiology" },
      { name: "CBCT", price: 3000, category: "Radiology" },
      { name: "Dexa Scan (Bone Density)", price: 2500, category: "Radiology" },
      { name: "X-Ray PNS", price: 500, category: "Radiology" },
    ],
  },
  {
    id: "l20",
    name: "Wellness Pathcare",
    location: "Tilak Nagar, Kanpur",
    rating: 4.5,
    homeCollection: true,
    fullTestMenu: [
      { name: "Calcium Total", price: 300, category: "Biochemistry" },
      { name: "Vitamin D3", price: 1100, category: "Vitamins" },
      { name: "Vitamin B12", price: 900, category: "Vitamins" },
      { name: "Magnesium", price: 450, category: "Biochemistry" },
      { name: "Zinc", price: 500, category: "Biochemistry" },
      { name: "Folic Acid", price: 800, category: "Vitamins" },
    ],
  },
];

export default function LabProfile() {
  const navigate = useNavigate();
  const [testSearch, setTestSearch] = useState("");
  const { id } = useParams();
  const lab = DUMMY_LABS.find((l) => l.id === id) || DUMMY_LABS[0];

  // Filter tests inside the profile
  const filteredTests = lab.fullTestMenu.filter((t) =>
    t.name.toLowerCase().includes(testSearch.toLowerCase())
  );

  return (
    // 1. BACKGROUND: Matches theme
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:bg-slate-900 relative font-sans pt-28 pb-20 transition-colors duration-300">
      {/* Dark mode background overlay */}
      <div className="hidden dark:block absolute inset-0 bg-slate-900 pointer-events-none z-0" />

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none fixed z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        {/* 2. NAVIGATION: Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-white transition-colors group"
        >
          <div className="p-2 bg-blue-100 dark:bg-slate-800/50 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-slate-700 mr-3 transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span className="font-medium">Back to Results</span>
        </button>

        {/* 3. LAB HEADER CARD */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border-4 border-white/10 dark:border-slate-700/50 mb-6 transition-colors duration-300">
          <div className="p-6 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {lab.name}
              </h1>
              <p className="text-gray-500 dark:text-slate-400 text-sm mb-3">
                {lab.location}
              </p>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">
                  <Star size={12} className="mr-1 fill-yellow-700" />{" "}
                  {lab.rating}
                </span>
                {lab.homeCollection && (
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                    <CheckCircle size={12} className="mr-1" /> Home Collection
                  </span>
                )}
              </div>
            </div>
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
              <Microscope size={28} />
            </div>
          </div>

          {/* Search Bar inside Card */}
          <div className="px-6 pb-6 bg-gray-50 dark:bg-slate-700/30 pt-4 border-t border-gray-100 dark:border-slate-700">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search for a test in this lab..."
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500"
                value={testSearch}
                onChange={(e) => setTestSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 4. TEST LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-blue-700 dark:text-slate-300 px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Available Tests ({filteredTests.length})
            </h2>
          </div>

          {filteredTests.map((test, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border-l-4 border-orange-500 dark:border-orange-400 flex justify-between items-center hover:scale-[1.01] transition-transform"
            >
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                  {test.name}
                </h3>
                <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-slate-400 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded mt-1 inline-block">
                  {test.category}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-1">
                  ₹{test.price}
                </p>
                <button className="text-xs font-bold text-white bg-blue-900 dark:bg-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-800 dark:hover:bg-blue-600 flex items-center ml-auto">
                  <Plus size={14} className="mr-1" /> Add
                </button>
              </div>
            </div>
          ))}

          {filteredTests.length === 0 && (
            <div className="text-center py-10 bg-blue-50 dark:bg-slate-800/50 rounded-xl border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-slate-300">
              No tests found matching "{testSearch}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
