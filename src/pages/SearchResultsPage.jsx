import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  ArrowLeft,
  Building,
  Microscope,
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

      // 2. Lab Specific Filters
      if (typeParam === "labs") {
        if (showHomeCollectionOnly && !item.homeCollection) return false;
      }

      return true;
    })
    .sort((a, b) => {
      // 1. Sort by Price
      if (typeParam === "labs" && sortBy === "priceLow") {
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
          {/* Location select */}
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
                  typeParam === "labs"
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
          {typeParam === "labs" ? (
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
                navigate(`/${typeParam.slice(0, -1)}/${item.id}`);
              }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden hover:scale-[1.01] transition-all duration-200 cursor-pointer border-r-4 border-b-4 border-black/5 dark:border-slate-700/50"
            >
              <div className="flex">
                {/* Color Stripe */}
                <div
                  className={`w-1.5 ${
                    typeParam === "labs"
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
                    {typeParam === "labs" ? (
                      <Microscope className="text-blue-600" />
                    ) : (
                      <Building className="text-blue-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Badge */}
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 ${
                        typeParam === "labs"
                          ? "bg-orange-100 text-orange-700"
                          : item.type === "govt"
                          ? "bg-green-100 text-green-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {typeParam === "labs"
                        ? "Diagnostics"
                        : item.type === "govt"
                        ? "Govt • Low Cost"
                        : "Private • Verified"}
                    </span>

                    {/* --- FIX 4: Mapped correct API fields (hospital_name) --- */}
                    <h2 className="font-bold text-gray-900 dark:text-white truncate text-lg">
                      {item.hospital_name || item.name || "Unknown Clinic"}
                    </h2>

                    {/* --- FIX 5: Mapped correct API fields (hospital_address) --- */}
                    <p className="text-sm text-gray-600 dark:text-slate-300 flex items-center mt-0.5 truncate">
                      <MapPin size={12} className="mr-1 flex-shrink-0" />
                      {item.hospital_address ||
                        item.address ||
                        "Address not provided"}
                      {item.distance_km && (
                        <span className="ml-2 text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">
                          {item.distance_km} km away
                        </span>
                      )}
                    </p>

                    {/* Lab/Service Specific Logic */}
                    {typeParam === "labs" ? (
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
