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
  Loader2, // Added for loading state
  Phone, // Added for call action
} from "lucide-react";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // --- URL PARAMS ---
  // These are the params your landing page sends
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const service = searchParams.get("service"); // This acts as the search query/category
  const maxDistance = searchParams.get("max_distance") || "10000"; // Default 10km
  const typeParam = searchParams.get("type") || "hospitals"; // fallback type for UI styling

  // --- STATE ---
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- LOCAL UI FILTERS ---
  const [filterType, setFilterType] = useState("all"); // 'all', 'govt', 'private'
  const [sortBy, setSortBy] = useState("distance");
  const [showHomeCollectionOnly, setShowHomeCollectionOnly] = useState(false);

  // --- FETCH DATA FROM BACKEND ---
  useEffect(() => {
    const fetchClinics = async () => {
      // 1. Validation: Ensure we have location data
      if (!lat || !lon) {
        setLoading(false);
        // Optional: Set an error or redirect if location is missing
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // 2. Construct API URL
        // Endpoint: https://backend-7-dzo3.onrender.com/clinics/search/
        const apiUrl = `/api/clinics/search/?service=${encodeURIComponent(
          service || ""
        )}&lat=${lat}&lon=${lon}&max_distance=${maxDistance}`;

        console.log("Fetching:", apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Unable to find services. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, [lat, lon, service, maxDistance]);

  // --- FILTERING & SORTING LOGIC ---

  // Helper to safely get price (Backend might not return individual test prices yet)
  const getTestPrice = (item) => {
    // If backend doesn't provide 'tests' array yet, return 0
    if (!item.tests || !service) return 0;

    const searchStr = service.toLowerCase();
    const test = item.tests.find((t) => {
      const testName = t.name.toLowerCase();
      return testName.includes(searchStr) || searchStr.includes(testName);
    });
    return test ? test.price : 0;
  };

  const filteredResults = results
    .filter((item) => {
      // 1. Type Filter (Govt vs Private)
      // Assuming backend returns 'type' field. If not, this filter is skipped.
      if (
        filterType !== "all" &&
        item.type &&
        item.type.toLowerCase() !== filterType
      )
        return false;

      // 2. Lab Specific Filters
      if (typeParam === "labs") {
        if (showHomeCollectionOnly && !item.homeCollection) return false;
      }

      return true;
    })
    .sort((a, b) => {
      // 1. Sort by Price
      if (typeParam === "labs" && sortBy === "priceLow") {
        return getTestPrice(a) - getTestPrice(b);
      }
      // 2. Sort by Distance (Default) - Assuming backend might not sort perfectly
      // (This assumes the API returns a 'distance' field, if not, we skip sort)
      // Note: Usually geo-queries return data sorted by distance automatically.
      return 0;
    });

  // --- RENDER LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen bg-blue-900 flex flex-col items-center justify-center pt-20">
        <Loader2 size={48} className="text-white animate-spin mb-4" />
        <p className="text-blue-100 font-medium animate-pulse">
          Searching for nearby {service || "services"}...
        </p>
      </div>
    );
  }

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-blue-900 relative font-sans pt-24 pb-20">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none fixed"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* --- PAGE HEADER & FILTERS --- */}
      <div className="max-w-3xl mx-auto px-4 mb-6 relative z-10">
        {/* Breadcrumb / Back Navigation */}
        <div className="flex items-center space-x-3 mb-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <p className="text-xs text-blue-200 font-bold uppercase tracking-wide">
              Search Results
            </p>
            <h1 className="text-2xl font-bold text-white capitalize truncate">
              {service ? `${service} nearby` : `All ${typeParam}`}
            </h1>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex items-center space-x-3 overflow-x-auto pb-2 hide-scrollbar">
          {typeParam === "labs" ? (
            <>
              <div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1.5 border border-white/10">
                <ArrowUpDown size={14} className="text-blue-200" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer [&>option]:text-gray-900"
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
                    : "bg-white/5 border-white/20 text-blue-100 hover:bg-white/10"
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
                    ? "bg-white text-blue-900 border-white shadow-lg"
                    : "bg-white/5 text-blue-100 border-white/10 hover:bg-white/10"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType("govt")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center space-x-2 transition-colors border ${
                  filterType === "govt"
                    ? "bg-green-500 text-white border-green-500 shadow-lg"
                    : "bg-white/5 text-blue-100 border-white/10 hover:bg-white/10"
                }`}
              >
                <Building size={14} />
                <span>Sarkari / Free</span>
              </button>
              <button
                onClick={() => setFilterType("private")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center space-x-2 transition-colors border ${
                  filterType === "private"
                    ? "bg-purple-500 text-white border-purple-500 shadow-lg"
                    : "bg-white/5 text-blue-100 border-white/10 hover:bg-white/10"
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
        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Results Map */}
        {!error &&
          filteredResults.map((item, index) => (
            <div
              // Use _id from backend or index as fallback
              key={item._id || index}
              onClick={() => {
                // Navigating to detail page (ensure these routes exist or handle accordingly)
                navigate(`/${typeParam.slice(0, -1)}/${item._id}`);
              }}
              className="bg-white rounded-xl shadow-xl overflow-hidden hover:scale-[1.01] transition-all duration-200 cursor-pointer border-r-4 border-b-4 border-black/5"
            >
              <div className="flex">
                {/* Color Stripe based on Type */}
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

                    <h2 className="font-bold text-gray-900 truncate text-lg">
                      {item.name || "Unknown Clinic"}
                    </h2>
                    <p className="text-sm text-gray-600 flex items-center mt-0.5 truncate">
                      <MapPin size={12} className="mr-1 flex-shrink-0" />
                      {item.address || item.location || "Address not provided"}
                    </p>

                    {/* Lab Specific Logic (Price Display) */}
                    {typeParam === "labs" ? (
                      <div className="mt-2">
                        {service && getTestPrice(item) > 0 ? (
                          <div className="bg-green-50 inline-block px-3 py-1 rounded-lg border border-green-100">
                            <p className="text-[10px] text-green-700 uppercase font-bold">
                              Estimated Price
                            </p>
                            <span className="text-green-800 font-bold text-lg leading-tight">
                              ₹{getTestPrice(item)}
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
                      // Hospital/Doctor Tags
                      <div className="mt-2 flex gap-2 overflow-hidden flex-wrap">
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
                          <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">
                            {item.category || service || "General"}
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
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-blue-200" />
            </div>
            <h3 className="text-white text-xl font-bold">No results found</h3>
            <p className="text-blue-200 mt-2 px-6">
              We couldn't find any {service} services within{" "}
              {parseInt(maxDistance) / 1000}km.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-white text-blue-900 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition"
            >
              Try Different Location
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
