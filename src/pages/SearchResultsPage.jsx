import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  ArrowLeft,
  Building,
  Microscope,
  User,
  ArrowUpDown,
  Home,
  ChevronRight,
  Star,
  Search,
  Loader2,
  Phone,
} from "lucide-react";
import { useLocationContext } from "../context/LocationContext";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // --- URL PARAMS ---
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const service = searchParams.get("service");
  const maxDistance = searchParams.get("max_distance") || "100";
  const typeParam = searchParams.get("type") || "hospitals";
  const apiFlag = searchParams.get("api");

  const isLabType = typeParam === "labs" || typeParam === "test";
  const isDoctorType = typeParam === "doctors";

  // Dummy doctors to use when searching from Doctors tab (IDs match DoctorProfile dummy data)
  const DUMMY_DOCTORS = [
    {
      id: "d1",
      name: "Dr. Rajesh Gupta",
      category: "General Physician",
      hospital_name: "City Care Clinic",
      hospital_address: "Civil Lines, Kanpur",
      specialties: ["General Medicine"],
    },
    {
      id: "d2",
      name: "Dr. Anjali Singh",
      category: "Gynaecologist",
      hospital_name: "Women's Health Center",
      hospital_address: "Swaroop Nagar, Kanpur",
      specialties: ["Gynaecology"],
    },
    {
      id: "d3",
      name: "Dr. V.K. Verma",
      category: "Orthopedics",
      hospital_name: "Bone & Joint Clinic",
      hospital_address: "Kakadeo, Kanpur",
      specialties: ["Orthopedics"],
    },
    {
      id: "d4",
      name: "Dr. Susan Methews",
      category: "Cardiologist",
      hospital_name: "Heart Care Institute",
      hospital_address: "Mall Road, Kanpur",
      specialties: ["Cardiology"],
    },
    {
      id: "d5",
      name: "Dr. R.K. Mishra",
      category: "Neurologist",
      hospital_name: "Brain Center",
      hospital_address: "Kidwai Nagar, Kanpur",
      specialties: ["Neurology"],
    },
    {
      id: "d6",
      name: "Dr. P.K. Sharma",
      category: "Dermatologist",
      hospital_name: "Skin Glow Clinic",
      hospital_address: "Gumti No. 5, Kanpur",
      specialties: ["Dermatology"],
    },
    // --- NEW ADDITIONS ---
    {
      id: "d7",
      name: "Dr. Amit Kumar",
      category: "Pediatrician",
      hospital_name: "Little Stars Clinic",
      hospital_address: "Civil Lines, Kanpur",
      specialties: ["Pediatrics", "Neonatology"],
    },
    {
      id: "d8",
      name: "Dr. Neha Kapoor",
      category: "Dentist",
      hospital_name: "Smile Dental Care",
      hospital_address: "Swaroop Nagar, Kanpur",
      specialties: ["Dentistry", "Orthodontics"],
    },
    {
      id: "d9",
      name: "Dr. S.K. Singh",
      category: "ENT Specialist",
      hospital_name: "Kanpur ENT Centre",
      hospital_address: "Kakadeo, Kanpur",
      specialties: ["ENT", "Head & Neck Surgery"],
    },
    {
      id: "d10",
      name: "Dr. Priya Desai",
      category: "Psychiatrist",
      hospital_name: "Mind Wellness Clinic",
      hospital_address: "Mall Road, Kanpur",
      specialties: ["Psychiatry", "Counseling"],
    },
    {
      id: "d11",
      name: "Dr. Rajiv Malhotra",
      category: "Oncologist",
      hospital_name: "Cancer Care Hub",
      hospital_address: "Kidwai Nagar, Kanpur",
      specialties: ["Oncology", "Chemotherapy"],
    },
    {
      id: "d12",
      name: "Dr. Meera Joshi",
      category: "Ophthalmologist",
      hospital_name: "Vision Eye Centre",
      hospital_address: "Gumti No. 5, Kanpur",
      specialties: ["Ophthalmology", "Eye Surgery"],
    },
    {
      id: "d13",
      name: "Dr. Suresh Reddy",
      category: "Urologist",
      hospital_name: "Kidney Stone Clinic",
      hospital_address: "Arya Nagar, Kanpur",
      specialties: ["Urology", "Andrology"],
    },
    {
      id: "d14",
      name: "Dr. Anita Saxena",
      category: "Gastroenterologist",
      hospital_name: "Digestive Health Care",
      hospital_address: "Govind Nagar, Kanpur",
      specialties: ["Gastroenterology", "Hepatology"],
    },
    {
      id: "d15",
      name: "Dr. Vikram Seth",
      category: "Pulmonologist",
      hospital_name: "Breath Easy Clinic",
      hospital_address: "Lal Bangla, Kanpur",
      specialties: ["Pulmonology", "Chest Medicine"],
    },
    {
      id: "d16",
      name: "Dr. Pooja Agarwal",
      category: "Endocrinologist",
      hospital_name: "Diabetes Care Center",
      hospital_address: "P Road, Kanpur",
      specialties: ["Endocrinology", "Diabetology"],
    },
    {
      id: "d17",
      name: "Dr. Arjun Mehta",
      category: "Rheumatologist",
      hospital_name: "Joint Pain Clinic",
      hospital_address: "Tilak Nagar, Kanpur",
      specialties: ["Rheumatology"],
    },
    {
      id: "d18",
      name: "Dr. Kavita Krishnan",
      category: "Nephrologist",
      hospital_name: "Renal Care Unit",
      hospital_address: "Shyam Nagar, Kanpur",
      specialties: ["Nephrology", "Dialysis"],
    },
    {
      id: "d19",
      name: "Dr. Sameer Khan",
      category: "General Surgeon",
      hospital_name: "City Surgical Center",
      hospital_address: "Barra, Kanpur",
      specialties: ["General Surgery", "Laparoscopy"],
    },
    {
      id: "d20",
      name: "Dr. Ritu Choudhary",
      category: "Dermatologist",
      hospital_name: "Derma Care",
      hospital_address: "Jajmau, Kanpur",
      specialties: ["Dermatology", "Cosmetology"],
    },
    {
      id: "d21",
      name: "Dr. Manoj Tiwari",
      category: "Cardiologist",
      hospital_name: "Heart Beat Clinic",
      hospital_address: "Vijay Nagar, Kanpur",
      specialties: ["Cardiology", "Interventional Cardiology"],
    },
    {
      id: "d22",
      name: "Dr. Swati Mishra",
      category: "Gynaecologist",
      hospital_name: "Mother Care Clinic",
      hospital_address: "Kalyanpur, Kanpur",
      specialties: ["Gynaecology", "Obstetrics"],
    },
    {
      id: "d23",
      name: "Dr. Alok Gupta",
      category: "Orthopedics",
      hospital_name: "Spine & Ortho Clinic",
      hospital_address: "Ashok Nagar, Kanpur",
      specialties: ["Orthopedics", "Spine Surgery"],
    },
    {
      id: "d24",
      name: "Dr. Nidhi Verma",
      category: "Pediatrician",
      hospital_name: "Child Care Hospital",
      hospital_address: "Rawatpur, Kanpur",
      specialties: ["Pediatrics"],
    },
    {
      id: "d25",
      name: "Dr. Sanjay Patel",
      category: "General Physician",
      hospital_name: "Family Health Clinic",
      hospital_address: "Saket Nagar, Kanpur",
      specialties: ["General Medicine", "Family Medicine"],
    },
  ];

  // Dummy labs data for labs tab (tests + prices)
  const DUMMY_LABS = [
    {
      id: "l1",
      name: "Dr. Lal PathLabs",
      hospital_name: "Dr. Lal PathLabs",
      hospital_address: "Civil Lines, Kanpur",
      rating: 4.5,
      homeCollection: true,
      tests: [
        { name: "CBC (Complete Blood Count)", price: 299 },
        { name: "Thyroid Profile (T3, T4, TSH)", price: 550 },
        { name: "Liver Function Test (LFT)", price: 800 },
        { name: "Lipid Profile", price: 600 },
        { name: "HbA1c", price: 450 },
      ],
    },
    {
      id: "l2",
      name: "City X-Ray & Scan",
      hospital_name: "City X-Ray & Scan",
      hospital_address: "Swaroop Nagar, Kanpur",
      rating: 4.2,
      homeCollection: false,
      tests: [
        { name: "MRI Brain", price: 6500 },
        { name: "CT Scan Chest", price: 3500 },
        { name: "Ultrasound Whole Abdomen", price: 1200 },
        { name: "Digital X-Ray", price: 400 },
        { name: "NCCT Head", price: 2800 },
      ],
    },
    {
      id: "l3",
      name: "Urban Diagnostics",
      hospital_name: "Urban Diagnostics",
      hospital_address: "Kakadeo, Kanpur",
      rating: 4.0,
      homeCollection: true,
      tests: [
        { name: "Lipid Profile", price: 600 },
        { name: "Vitamin D Total", price: 1200 },
        { name: "Vitamin B12", price: 900 },
        { name: "Kidney Function Test (KFT)", price: 750 },
        { name: "Urine Routine", price: 150 },
      ],
    },
    {
      id: "l4",
      name: "Metro Imaging",
      hospital_name: "Metro Imaging",
      hospital_address: "Gumti No. 5, Kanpur",
      rating: 3.9,
      homeCollection: false,
      tests: [
        { name: "X-Ray Chest PA View", price: 400 },
        { name: "Ultrasound Abdomen", price: 900 },
        { name: "Echo Cardiography", price: 1800 },
        { name: "TMT", price: 1500 },
        { name: "ECG", price: 250 },
      ],
    },
    {
      id: "l5",
      name: "Pathkind Labs",
      hospital_name: "Pathkind Labs",
      hospital_address: "Kidwai Nagar, Kanpur",
      rating: 4.3,
      homeCollection: true,
      tests: [
        { name: "HbA1c (Glycosylated Hemoglobin)", price: 450 },
        { name: "Fasting Blood Sugar", price: 100 },
        { name: "PP Blood Sugar", price: 100 },
        { name: "Insulin Fasting", price: 600 },
        { name: "C-Peptide", price: 900 },
      ],
    },
    {
      id: "l6",
      name: "SRL Diagnostics",
      hospital_name: "SRL Diagnostics",
      hospital_address: "Mall Road, Kanpur",
      rating: 4.6,
      homeCollection: true,
      tests: [
        { name: "Full Body Checkup", price: 1999 },
        { name: "Vitamin B12", price: 900 },
        { name: "Iron Studies", price: 850 },
        { name: "Allergy Panel", price: 3000 },
        { name: "CRP (C-Reactive Protein)", price: 450 },
      ],
    },
    {
      id: "l7",
      name: "Thyrocare Aarogyam",
      hospital_name: "Thyrocare Aarogyam",
      hospital_address: "Govind Nagar, Kanpur",
      rating: 4.4,
      homeCollection: true,
      tests: [
        { name: "Aarogyam B Profile", price: 1100 },
        { name: "Iron Deficiency Profile", price: 650 },
        { name: "Thyroid Profile", price: 500 },
        { name: "Testosterone Total", price: 400 },
        { name: "Hepatitis B Surface Antigen", price: 350 },
      ],
    },
    {
      id: "l8",
      name: "Khanna Pathology",
      hospital_name: "Khanna Pathology",
      hospital_address: "Arya Nagar, Kanpur",
      rating: 4.1,
      homeCollection: false,
      tests: [
        { name: "Dengue NS1 Antigen", price: 600 },
        { name: "Platelet Count", price: 150 },
        { name: "Malaria Antigen", price: 300 },
        { name: "Widal Test (Typhoid)", price: 250 },
        { name: "Chikungunya IgM", price: 700 },
      ],
    },
    {
      id: "l9",
      name: "Apollo Diagnostics",
      hospital_name: "Apollo Diagnostics",
      hospital_address: "Kalyanpur, Kanpur",
      rating: 4.5,
      homeCollection: true,
      tests: [
        { name: "Kidney Function Test (KFT)", price: 750 },
        { name: "Uric Acid", price: 250 },
        { name: "Electrolytes (Na/K/Cl)", price: 400 },
        { name: "Calcium Total", price: 300 },
        { name: "Phosphorus", price: 280 },
      ],
    },
    {
      id: "l10",
      name: "Heritage X-Ray",
      hospital_name: "Heritage X-Ray",
      hospital_address: "Lal Bangla, Kanpur",
      rating: 3.8,
      homeCollection: false,
      tests: [
        { name: "ECG", price: 300 },
        { name: "X-Ray Knee", price: 500 },
        { name: "X-Ray Spine", price: 600 },
        { name: "Ultrasound Pregnancy", price: 1100 },
        { name: "Color Doppler", price: 2000 },
      ],
    },
    {
      id: "l11",
      name: "Redcliffe Labs",
      hospital_name: "Redcliffe Labs",
      hospital_address: "Shyam Nagar, Kanpur",
      rating: 4.7,
      homeCollection: true,
      tests: [
        { name: "Smart Full Body Checkup", price: 1499 },
        { name: "Thyroid Stimulating Hormone (TSH)", price: 300 },
        { name: "HbA1c", price: 400 },
        { name: "Vitamin Profile (D & B12)", price: 1599 },
        { name: "RA Factor", price: 450 },
      ],
    },
    {
      id: "l12",
      name: "Kanpur Advanced Labs",
      hospital_name: "Kanpur Advanced Labs",
      hospital_address: "P Road, Kanpur",
      rating: 4.0,
      homeCollection: true,
      tests: [
        { name: "Urine Culture", price: 600 },
        { name: "Stool Routine", price: 200 },
        { name: "Pus Culture", price: 700 },
        { name: "Blood Culture", price: 900 },
        { name: "Sputum AFB", price: 250 },
      ],
    },
    {
      id: "l13",
      name: "Star Imaging Center",
      hospital_name: "Star Imaging Center",
      hospital_address: "Barra 2, Kanpur",
      rating: 4.2,
      homeCollection: false,
      tests: [
        { name: "Color Doppler", price: 2500 },
        { name: "Ultrasound KUB", price: 1000 },
        { name: "Ultrasound Whole Abdomen", price: 1500 },
        { name: "X-Ray Chest", price: 400 },
        { name: "Mammography", price: 2000 },
      ],
    },
    {
      id: "l14",
      name: "Max Lab",
      hospital_name: "Max Lab",
      hospital_address: "Cantt, Kanpur",
      rating: 4.6,
      homeCollection: true,
      tests: [
        { name: "Lipid Profile", price: 550 },
        { name: "Glucose PP", price: 120 },
        { name: "Liver Function Test", price: 700 },
        { name: "Amylase", price: 650 },
        { name: "Lipase", price: 700 },
      ],
    },
    {
      id: "l15",
      name: "Care Diagnostics",
      hospital_name: "Care Diagnostics",
      hospital_address: "Jajmau, Kanpur",
      rating: 3.9,
      homeCollection: true,
      tests: [
        { name: "Widal Test (Typhoid)", price: 250 },
        { name: "Malaria Parasite", price: 200 },
        { name: "Typhoid IgM/IgG", price: 400 },
        { name: "Dengue Profile", price: 1200 },
        { name: "ESR", price: 100 },
      ],
    },
    {
      id: "l16",
      name: "Aadhar Health Institute",
      hospital_name: "Aadhar Health Institute",
      hospital_address: "Vijay Nagar, Kanpur",
      rating: 4.8,
      homeCollection: false,
      tests: [
        { name: "MRI Spine", price: 7000 },
        { name: "CT Head", price: 3200 },
        { name: "CT Abdomen", price: 4500 },
        { name: "EEG", price: 1800 },
        { name: "NCV Test", price: 2200 },
      ],
    },
    {
      id: "l17",
      name: "Lifeline Pathology",
      hospital_name: "Lifeline Pathology",
      hospital_address: "Ashok Nagar, Kanpur",
      rating: 4.1,
      homeCollection: true,
      tests: [
        { name: "Beta HCG", price: 800 },
        { name: "Prolactin", price: 600 },
        { name: "FSH/LH", price: 1000 },
        { name: "AMH", price: 2500 },
        { name: "Progesterone", price: 650 },
      ],
    },
    {
      id: "l18",
      name: "MediQuest Lab",
      hospital_name: "MediQuest Lab",
      hospital_address: "Rawatpur, Kanpur",
      rating: 4.3,
      homeCollection: true,
      tests: [
        { name: "Allergy Panel", price: 3500 },
        { name: "IgE Total", price: 700 },
        { name: "CBC", price: 300 },
        { name: "Absolute Eosinophil Count", price: 250 },
        { name: "CBC", price: 1500 },
        { name: "Sugar (Diabetes)", price: 200 },
      ],
    },
    {
      id: "l19",
      name: "Focus Imaging",
      hospital_name: "Focus Imaging",
      hospital_address: "Saket Nagar, Kanpur",
      rating: 4.4,
      homeCollection: false,
      tests: [
        { name: "Mammography", price: 2200 },
        { name: "OPG (Dental X-Ray)", price: 800 },
        { name: "CBCT", price: 3000 },
        { name: "Dexa Scan (Bone Density)", price: 2500 },
        { name: "X-Ray PNS", price: 500 },
      ],
    },
    {
      id: "l20",
      name: "Wellness Pathcare",
      hospital_name: "Wellness Pathcare",
      hospital_address: "Tilak Nagar, Kanpur",
      rating: 4.5,
      homeCollection: true,
      tests: [
        { name: "Sugar (Diabetes)", price: 300 },
        { name: "Vitamin D3", price: 1100 },
        { name: "Vitamin B12", price: 900 },
        { name: "Magnesium", price: 450 },
        { name: "Zinc", price: 500 },
      ],
    },
  ];

  // --- STATE ---
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- LOCAL UI FILTERS ---
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("distance");
  const [showHomeCollectionOnly, setShowHomeCollectionOnly] = useState(false);

  // Local search/filter text (start empty — do not copy the query param into the input)
  const [localSearch, setLocalSearch] = useState("");

  // Location context for 'Current location'
  const { userLocation, locationQuery } = useLocationContext();

  // --- FETCH DATA FROM BACKEND ---
  useEffect(() => {
    const fetchClinics = async () => {
      // Only call backend API when explicitly requested (search originated from Hospitals tab)
      if (apiFlag !== "1") {
        setLoading(false);
        const qParam = searchParams.get("q") || "";
        const qLower = qParam.toLowerCase();

        if (typeParam === "doctors") {
          const filtered = DUMMY_DOCTORS.filter((d) => {
            if (!qLower) return true;
            return (
              d.name.toLowerCase().includes(qLower) ||
              (d.category && d.category.toLowerCase().includes(qLower)) ||
              (d.specialties &&
                d.specialties.join(" ").toLowerCase().includes(qLower))
            );
          });
          setResults(filtered);
          return;
        }

        if (typeParam === "labs" || typeParam === "test") {
          const svcParam = (searchParams.get("service") || "").toLowerCase();
          const filtered = DUMMY_LABS.filter((lab) => {
            if (svcParam) {
              return (
                lab.tests.some((t) =>
                  t.name.toLowerCase().includes(svcParam)
                ) || lab.name.toLowerCase().includes(svcParam)
              );
            }
            if (!qLower) return true;
            return (
              lab.name.toLowerCase().includes(qLower) ||
              (lab.hospital_address &&
                lab.hospital_address.toLowerCase().includes(qLower)) ||
              lab.tests.some((t) => t.name.toLowerCase().includes(qLower))
            );
          });
          setResults(filtered);
          return;
        }

        setResults([]);
        return;
      }

      // For API-driven searches ensure coordinates are present
      if (!lat || !lon) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Determine service to query. Prefer explicit 'service' param; else try to map from 'q' or fallback to lowercased q.
        let serviceToQuery = service || "";
        const qParam = searchParams.get("q") || "";

        if (!serviceToQuery && qParam) {
          try {
            const svcResp = await fetch(`/api/clinics/services/`);
            if (svcResp.ok) {
              const svcData = await svcResp.json();
              const servicesArray = Array.isArray(svcData) ? svcData : [];
              const qLower = qParam.toLowerCase();
              const match = servicesArray.find((s) => {
                if (!s.name) return false;
                const nameLower = String(s.name).toLowerCase();
                return (
                  nameLower === qLower ||
                  nameLower.includes(qLower) ||
                  qLower.includes(nameLower)
                );
              });
              if (match) serviceToQuery = String(match.name).toLowerCase();
              else serviceToQuery = qLower;
            } else {
              serviceToQuery = qParam.toLowerCase();
            }
          } catch (errSvc) {
            console.warn("Service lookup failed:", errSvc);
            serviceToQuery = qParam.toLowerCase();
          }
        } else if (serviceToQuery) {
          serviceToQuery = String(serviceToQuery).toLowerCase();
        }

        const apiUrl = `/api/clinics/search/?service=${encodeURIComponent(
          serviceToQuery
        )}&lat=${lat}&lon=${lon}&max_distance_km=${maxDistance}`;
        console.log("Fetching:", apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();
        console.log("API Data received:", data);

        // --- FIX 1: Extract the array from the object ---
        // Your API returns { results: [...] }, so we grab data.results
        if (data.results && Array.isArray(data.results)) {
          setResults(data.results);
        } else if (Array.isArray(data)) {
          setResults(data);
        } else {
          // Fallback if data format changes unexpectedly
          setResults([]);
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Unable to find services. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, [lat, lon, service, maxDistance, searchParams]);

  // --- LOCATION PRESETS FOR RESULTS PAGE ---
  const PRESET_LOCATIONS = [
    {
      key: "current",
      label: locationQuery ? `${locationQuery} (current)` : "Current location",
      getLatLon: () =>
        userLocation ? { lat: userLocation.lat, lon: userLocation.lon } : null,
    },
    {
      key: "kanpur",
      label: "Kanpur",
      lat: 26.4499,
      lon: 80.3319,
    },
    {
      key: "lucknow",
      label: "Lucknow",
      lat: 26.8467,
      lon: 80.9462,
    },
    {
      key: "delhi",
      label: "Delhi",
      lat: 28.6139,
      lon: 77.209,
    },
  ];

  const [selectedLocationKey, setSelectedLocationKey] = useState(() => {
    const latNum = lat ? parseFloat(lat) : null;
    const lonNum = lon ? parseFloat(lon) : null;
    if (
      userLocation &&
      Math.abs(userLocation.lat - latNum) < 0.0001 &&
      Math.abs(userLocation.lon - lonNum) < 0.0001
    ) {
      return "current";
    }
    if (latNum === 26.4499 && lonNum === 80.3319) return "kanpur";
    if (latNum === 26.8467 && lonNum === 80.9462) return "lucknow";
    if (latNum === 28.6139 && lonNum === 77.209) return "delhi";
    return "custom";
  });

  const handleLocationChange = (key) => {
    setSelectedLocationKey(key);

    let targetLat = lat;
    let targetLon = lon;

    const preset = PRESET_LOCATIONS.find((p) => p.key === key);
    if (preset) {
      if (preset.getLatLon) {
        const loc = preset.getLatLon();
        if (!loc) return; // no current location available
        targetLat = String(loc.lat);
        targetLon = String(loc.lon);
      } else {
        targetLat = String(preset.lat);
        targetLon = String(preset.lon);
      }
    }

    if (!targetLat || !targetLon) return;

    // Only trigger new API call if coordinates actually changed
    if (targetLat === lat && targetLon === lon) return;

    const params = new URLSearchParams(searchParams);
    params.set("lat", targetLat);
    params.set("lon", targetLon);
    navigate(`/search?${params.toString()}`);
  };

  // --- FILTERING & SORTING LOGIC ---

  // Helper to safely get price
  const getDisplayPrice = (item) => {
    // Check if API returns a direct price (string or number)
    if (item.price) return parseFloat(item.price);

    // Fallback: Check inside 'tests' array if it exists (old logic)
    if (item.tests && service) {
      const searchStr = service.toLowerCase();
      const test = item.tests.find((t) => {
        const testName = t.name.toLowerCase();
        return testName.includes(searchStr) || searchStr.includes(testName);
      });
      return test ? test.price : 0;
    }
    return 0;
  };

  // --- FIX 2: Defensive check for filtering ---
  const filteredResults = (Array.isArray(results) ? results : [])
    .filter((item) => {
      // 0. Local text filter (client-side only)
      const query = localSearch.trim().toLowerCase();
      if (query) {
        const name = (
          item.hospital_name ||
          item.name ||
          item.service_name ||
          ""
        ).toLowerCase();
        const category = (item.category || "").toLowerCase();
        if (!name.includes(query) && !category.includes(query)) {
          return false;
        }
      }

      // 1. Type Filter (Govt vs Private)
      if (
        filterType !== "all" &&
        item.type &&
        item.type.toLowerCase() !== filterType
      ) {
        return false;
      }

      // 2. Lab/Test Specific Filters
      if (isLabType) {
        if (showHomeCollectionOnly && !item.homeCollection) return false;
      }

      return true;
    })
    .sort((a, b) => {
      // 1. Sort by Price
      if (isLabType && sortBy === "priceLow") {
        return getDisplayPrice(a) - getDisplayPrice(b);
      }
      // 2. Sort by Distance
      // Your API returns 'distance_km', let's use that if available
      if (a.distance_km && b.distance_km) {
        return a.distance_km - b.distance_km;
      }
      return 0;
    });

  // --- RENDER LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:bg-slate-900 flex flex-col items-center justify-center pt-20 transition-colors duration-300">
        <div className="hidden dark:block absolute inset-0 bg-slate-900 pointer-events-none z-0" />
        <Loader2
          size={48}
          className="text-white dark:text-white animate-spin mb-4"
        />
        <p className="text-blue-700 dark:text-slate-300 font-medium animate-pulse">
          Searching for nearby {service || "services"}...
        </p>
      </div>
    );
  }

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:bg-slate-900 relative font-sans pt-24 pb-20 transition-colors duration-300">
      {/* Dark mode background overlay */}
      <div className="hidden dark:block absolute inset-0 bg-slate-900 pointer-events-none z-0" />

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none fixed z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* --- PAGE HEADER, SEARCH & FILTERS --- */}
      <div className="max-w-3xl mx-auto px-4 mb-6 relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full bg-blue-100 dark:bg-slate-800/50 text-blue-700 dark:text-white hover:bg-blue-200 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <p className="text-xs text-blue-700 dark:text-slate-400 font-bold uppercase tracking-wide">
              Search Results
            </p>
            <h1 className="text-2xl font-bold text-blue-900 dark:text-white capitalize truncate">
              {service ? `${service} nearby` : `All ${typeParam}`}
            </h1>
          </div>
        </div>

        {/* Inline Search + Location (client-side filter + optional new API on location change) */}
        <div className="mt-2 flex flex-col md:flex-row gap-3">
          {/* Location select (only for hospitals searches) */}
          {typeParam === "hospitals" && (
            <div className="md:w-1/3 w-full">
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  value={selectedLocationKey}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-blue-200 dark:border-slate-700 bg-blue-50 dark:bg-slate-800 text-sm font-medium text-blue-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-400 dark:focus:ring-blue-500"
                >
                  <option value="custom" disabled>
                    Location from search
                  </option>
                  <option value="current" disabled={!userLocation}>
                    {locationQuery
                      ? `${locationQuery} (current)`
                      : "Current location"}
                  </option>
                  <option value="kanpur">Kanpur</option>
                  <option value="lucknow">Lucknow</option>
                  <option value="delhi">Delhi</option>
                </select>
              </div>
            </div>
          )}

          {/* Text filter input */}
          <div className="flex-1">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder={
                  isLabType
                    ? "Filter by test or lab name..."
                    : "Filter by hospital or service..."
                }
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-blue-200 dark:border-slate-700 bg-blue-50 dark:bg-slate-800 text-sm text-blue-900 dark:text-slate-200 placeholder-blue-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-400 dark:focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="mt-4 flex items-center space-x-3 overflow-x-auto pb-2 hide-scrollbar">
          {isLabType ? (
            <>
              <div className="flex items-center space-x-2 bg-blue-50 dark:bg-slate-800/50 rounded-full px-3 py-1.5 border border-blue-200 dark:border-slate-700">
                <ArrowUpDown
                  size={14}
                  className="text-blue-600 dark:text-slate-300"
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm font-medium text-blue-700 dark:text-white focus:outline-none cursor-pointer [&>option]:text-gray-900 dark:[&>option]:text-slate-900"
                >
                  <option value="distance">Nearest First</option>
                  <option value="priceLow">Price: Low to High</option>
                </select>
              </div>
              <button
                onClick={() =>
                  setShowHomeCollectionOnly(!showHomeCollectionOnly)
                }
                className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center space-x-2 transition-colors border ${
                  showHomeCollectionOnly
                    ? "bg-orange-500 border-orange-500 text-white shadow-lg"
                    : "bg-blue-50 dark:bg-slate-800/50 border-blue-200 dark:border-slate-700 text-blue-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-slate-700"
                }`}
              >
                <Home size={14} />
                <span>Home Collection</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                  filterType === "all"
                    ? "bg-white dark:bg-slate-700 text-blue-900 dark:text-white border-blue-300 dark:border-slate-600 shadow-lg"
                    : "bg-blue-50 dark:bg-slate-800/50 text-blue-700 dark:text-slate-300 border-blue-200 dark:border-slate-700 hover:bg-blue-100 dark:hover:bg-slate-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType("govt")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center space-x-2 transition-colors border ${
                  filterType === "govt"
                    ? "bg-green-500 text-white border-green-500 shadow-lg"
                    : "bg-blue-50 dark:bg-slate-800/50 text-blue-700 dark:text-slate-300 border-blue-200 dark:border-slate-700 hover:bg-blue-100 dark:hover:bg-slate-700"
                }`}
              >
                <Building size={14} />
                <span>Government</span>
              </button>
              <button
                onClick={() => setFilterType("private")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center space-x-2 transition-colors border ${
                  filterType === "private"
                    ? "bg-purple-500 text-white border-purple-500 shadow-lg"
                    : "bg-blue-50 dark:bg-slate-800/50 text-blue-700 dark:text-slate-300 border-blue-200 dark:border-slate-700 hover:bg-blue-100 dark:hover:bg-slate-700"
                }`}
              >
                <Star size={14} />
                <span>Private</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* --- RESULTS LIST --- */}
      <div className="max-w-3xl mx-auto px-4 space-y-4 relative z-10">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {!error &&
          filteredResults.map((item, index) => (
            <div
              // --- FIX 3: Use 'id' (API uses 'id', your old code used '_id') ---
              key={item.id || index}
              onClick={() => {
                if (isLabType) navigate(`/lab/${item.id}`);
                else if (isDoctorType) navigate(`/doctor/${item.id}`);
                else navigate(`/hospital/${item.id}`);
              }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden hover:scale-[1.01] transition-all duration-200 cursor-pointer border-r-4 border-b-4 border-black/5 dark:border-slate-700/50"
            >
              <div className="flex">
                {/* Color Stripe */}
                <div
                  className={`w-1.5 ${
                    isLabType
                      ? "bg-orange-500"
                      : item.type === "govt"
                      ? "bg-green-500"
                      : "bg-purple-500"
                  }`}
                ></div>

                <div className="p-4 flex-1 flex">
                  {/* Icon Box */}
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 ${
                      item.type === "govt" ? "bg-green-50" : "bg-blue-50"
                    }`}
                  >
                    {isLabType ? (
                      <Microscope className="text-blue-600" />
                    ) : isDoctorType ? (
                      <User className="text-blue-600" />
                    ) : (
                      <Building className="text-blue-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Badge */}
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 ${
                        isLabType
                          ? "bg-orange-100 text-orange-700"
                          : item.type === "govt"
                          ? "bg-green-100 text-green-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {isLabType
                        ? "Diagnostics"
                        : item.type === "govt"
                        ? "Govt • Low Cost"
                        : "Private • Verified"}
                    </span>

                    {/* --- FIX 4: Mapped correct API fields (hospital_name) --- */}
                    <h2 className="font-bold text-gray-900 dark:text-white truncate text-lg">
                      {isDoctorType
                        ? item.name || item.hospital_name || "Unknown Doctor"
                        : item.hospital_name || item.name || "Unknown Clinic"}
                    </h2>

                    {/* --- FIX 5: Mapped correct API fields (hospital_address) --- */}
                    <p className="text-sm text-gray-600 dark:text-slate-300 flex items-center mt-0.5 truncate">
                      <MapPin size={12} className="mr-1 flex-shrink-0" />
                      {isDoctorType
                        ? item.hospital_name ||
                          item.hospital_address ||
                          item.address ||
                          "Location not provided"
                        : item.hospital_address ||
                          item.address ||
                          "Address not provided"}
                      {item.distance_km && (
                        <span className="ml-2 text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">
                          {item.distance_km} km away
                        </span>
                      )}
                    </p>

                    {/* Lab/Service Specific Logic */}
                    {isLabType ? (
                      <div className="mt-2">
                        {service && getDisplayPrice(item) > 0 ? (
                          <div className="bg-green-50 inline-block px-3 py-1 rounded-lg border border-green-100">
                            <p className="text-[10px] text-green-700 uppercase font-bold">
                              Estimated Price
                            </p>
                            <span className="text-green-800 font-bold text-lg leading-tight">
                              ₹{getDisplayPrice(item)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-orange-600 text-xs font-bold flex items-center mt-2 group">
                            View Test List{" "}
                            <ChevronRight
                              size={14}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="mt-2 flex gap-2 overflow-hidden flex-wrap">
                        {/* If API returns specialties list */}
                        {item.specialties && item.specialties.length > 0 ? (
                          item.specialties.slice(0, 3).map((s, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600 whitespace-nowrap"
                            >
                              {s}
                            </span>
                          ))
                        ) : (
                          // Fallback to service name if available
                          <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">
                            {item.service_name ||
                              item.category ||
                              service ||
                              "General"}
                          </span>
                        )}

                        {/* If direct price is available for the service */}
                        {item.price && (
                          <span className="text-[10px] bg-green-100 px-2 py-1 rounded text-green-700 font-bold border border-green-200">
                            Starts ₹{item.price}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* No Results Found State */}
        {!loading && !error && filteredResults.length === 0 && (
          <div className="text-center py-20 bg-white/5 dark:bg-slate-800/50 rounded-2xl border border-white/10 dark:border-slate-700">
            <div className="bg-blue-100 dark:bg-slate-700/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-blue-600 dark:text-slate-400" />
            </div>
            <h3 className="text-blue-900 dark:text-white text-xl font-bold">
              No results found
            </h3>
            <p className="text-blue-700 dark:text-slate-300 mt-2 px-6">
              We couldn't find any {service} services within{" "}
              {parseInt(maxDistance)}km.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-blue-600 dark:bg-slate-700 text-white dark:text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 dark:hover:bg-slate-600 transition"
            >
              Try Different Location
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
