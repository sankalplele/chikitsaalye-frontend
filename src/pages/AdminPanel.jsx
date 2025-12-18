import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("hospitals"); // hospitals, services, link-services
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // New State: To handle pre-selecting a hospital when switching tabs
  const [targetHospitalId, setTargetHospitalId] = useState(null);

  // --- DATA STATES ---
  const [hospitals, setHospitals] = useState([]);
  const [services, setServices] = useState([]);

  // --- INITIAL DATA FETCH ---
  useEffect(() => {
    fetchHospitals();
    fetchServices();
  }, []);

  const showNotification = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // GET: List All Hospitals [cite: 1]
  const fetchHospitals = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/clinics/get_all_clinics/`);
      setHospitals(Array.isArray(res.data) ? res.data : res.data.data || []);
      console.log("fetched hospitals", res.data);
    } catch (err) {
      console.error("Error fetching hospitals", err);
    } finally {
      setLoading(false);
    }
  };

  // GET: List All Services [cite: 1]
  const fetchServices = async () => {
    try {
      const res = await axios.get(`/api/clinics/services/`);
      setServices(Array.isArray(res.data) ? res.data : res.data.data || []);
      console.log("fetched services", res.data);
    } catch (err) {
      console.error("Error fetching services", err);
    }
  };

  // HANDLER: Jump from Hospital List to Link Service Tab
  const handleJumpToLink = (hospitalId) => {
    setTargetHospitalId(hospitalId);
    setActiveTab("link-services");
  };

  return (
    // FIX 1: Added 'mt-24' to push content down below the navbar
    <div className="container mx-auto p-6 min-h-screen mt-24">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        Admin Dashboard
      </h1>

      {/* FIX 2: Visual Loading Indicator */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="font-semibold">Loading...</span>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded shadow-lg text-white z-50 ${
            notification.type === "error" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {notification.msg}
        </div>
      )}

      {/* TABS */}
      <div className="flex space-x-4 mb-6 border-b">
        {["hospitals", "services", "link-services"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-4 capitalize ${
              activeTab === tab
                ? "border-b-2 border-blue-600 font-bold text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div className="bg-white p-6 rounded shadow">
        {activeTab === "hospitals" && (
          <HospitalManager
            hospitals={hospitals}
            refresh={fetchHospitals}
            setLoading={setLoading}
            showNotification={showNotification}
            onAddService={handleJumpToLink} // Pass the handler down
          />
        )}
        {activeTab === "services" && (
          <ServiceManager
            services={services}
            refresh={fetchServices}
            setLoading={setLoading}
            showNotification={showNotification}
          />
        )}
        {activeTab === "link-services" && (
          <ServiceLinker
            hospitals={hospitals}
            services={services}
            setLoading={setLoading}
            showNotification={showNotification}
            initialHospitalId={targetHospitalId} // Pass the ID
            clearInitialId={() => setTargetHospitalId(null)} // Cleanup callback
          />
        )}
      </div>
    </div>
  );
};

// ==========================================
// 1. HOSPITAL MANAGER COMPONENT
// ==========================================
const HospitalManager = ({
  hospitals,
  refresh,
  setLoading,
  showNotification,
  onAddService, // Receive the handler
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    latitude: "",
    longitude: "",
    address: "",
    rating: "",
  });

  // Filter Logic
  const filtered = hospitals.filter(
    (h) =>
      h.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // DELETE Hospital [cite: 1]
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hospital?"))
      return;
    try {
      setLoading(true);
      await axios.delete(`/api/clinics/clinic/delete/${id}/`);
      showNotification("Hospital deleted successfully");
      refresh();
    } catch (err) {
      showNotification("Failed to delete", "error");
    } finally {
      setLoading(false);
    }
  };

  // ADD or UPDATE Hospital [cite: 1]
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingHospital) {
        // UPDATE
        await axios.put(`/api/clinics/clinic/${editingHospital.id}/`, formData);
        showNotification("Hospital updated");
      } else {
        // ADD
        await axios.post(`/api/clinics/services/clinic/`, formData);
        showNotification("Hospital added");
      }
      setIsModalOpen(false);
      setEditingHospital(null);
      setFormData({
        name: "",
        latitude: "",
        longitude: "",
        address: "",
        rating: "",
      });
      refresh();
    } catch (err) {
      showNotification("Operation failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (hospital) => {
    setEditingHospital(hospital);
    setFormData({
      name: hospital.name,
      latitude: hospital.latitude,
      longitude: hospital.longitude,
      address: hospital.address,
      rating: hospital.rating,
    });
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search hospitals..."
          className="border p-2 rounded w-1/3"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => {
            setEditingHospital(null);
            setFormData({});
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Hospital
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3">Name</th>
            <th className="p-3">Address</th>
            <th className="p-3">Rating</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((h) => (
            <tr key={h.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{h.name}</td>
              <td className="p-3">{h.address}</td>
              <td className="p-3">{h.rating}</td>
              <td className="p-3 flex items-center space-x-2">
                {/* FIX 3: Add Services Button */}
                <button
                  onClick={() => onAddService(h.id)}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200 border border-green-200"
                >
                  + Add Services
                </button>
                <button
                  onClick={() => openEdit(h)}
                  className="text-blue-600 hover:underline px-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(h.id)}
                  className="text-red-600 hover:underline px-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-end space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingHospital ? "Edit Hospital" : "Add New Hospital"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                placeholder="Name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                required
                placeholder="Address"
                value={formData.address || ""}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <div className="flex space-x-2">
                <input
                  required
                  placeholder="Latitude"
                  value={formData.latitude || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, latitude: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
                <input
                  required
                  placeholder="Longitude"
                  value={formData.longitude || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, longitude: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <input
                required
                placeholder="Rating (0-5)"
                value={formData.rating || ""}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. GLOBAL SERVICE MANAGER
// ==========================================
const ServiceManager = ({
  services,
  refresh,
  setLoading,
  showNotification,
}) => {
  const [newService, setNewService] = useState("");

  // ADD Service [cite: 1]
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newService) return;
    try {
      setLoading(true);
      await axios.post(`/api/clinics/services/`, { name: newService });
      showNotification("Global service added");
      setNewService("");
      refresh();
    } catch (err) {
      showNotification("Failed to add service", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-8">
      <div className="w-1/2">
        <h3 className="font-bold mb-4">Available Global Services</h3>
        <ul className="border rounded divide-y max-h-96 overflow-y-auto">
          {services.map((s, idx) => (
            <li key={s.id || idx} className="p-3 hover:bg-gray-50">
              {s.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/2">
        <h3 className="font-bold mb-4">Add New Global Service</h3>
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            placeholder="Service Name (e.g. Neurology)"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            className="border p-2 rounded flex-grow"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 rounded"
          >
            Add
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-2">
          Note: Use the "Link Services" tab to assign these to specific
          hospitals with prices.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// 3. SERVICE LINKER (Multi-row Logic)
// ==========================================
const ServiceLinker = ({
  hospitals,
  services,
  setLoading,
  showNotification,
  initialHospitalId, // Receive the ID
  clearInitialId,
}) => {
  const [selectedHospital, setSelectedHospital] = useState("");
  const [filterText, setFilterText] = useState("");
  const [rows, setRows] = useState([{ serviceId: "", price: "" }]);

  // FIX 4: Handle auto-selection when coming from the Hospital list
  useEffect(() => {
    if (initialHospitalId) {
      // Must convert to string if the value in the select option is string/number mismatch
      setSelectedHospital(initialHospitalId.toString());
      clearInitialId(); // Clear the parent state so it doesn't persist
    }
  }, [initialHospitalId, clearInitialId]);

  const addRow = () => {
    setRows([...rows, { serviceId: "", price: "" }]);
  };

  const removeRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  // SUBMIT ALL ROWS [cite: 1]
  const handleSubmit = async () => {
    if (!selectedHospital)
      return showNotification("Please select a hospital", "error");

    setLoading(true);
    let successCount = 0;
    let failCount = 0;

    for (const row of rows) {
      if (!row.serviceId || !row.price) continue;

      try {
        const payload = {
          hospital: selectedHospital, // Hospital ID
          service: row.serviceId, // Service ID
          price: row.price,
        };

        await axios.post(`/api/clinics/services/hospital-service/`, payload);
        successCount++;
      } catch (err) {
        console.error(err);
        failCount++;
      }
    }

    setLoading(false);
    showNotification(`Processed: ${successCount} added, ${failCount} failed`);
    if (successCount > 0) {
      setRows([{ serviceId: "", price: "" }]); // Reset form
    }
  };

  // Filter services for dropdown
  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Assign Services to Hospital</h2>

      {/* 1. Select Hospital */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Select Hospital
        </label>
        <select
          className="w-full border p-2 rounded"
          value={selectedHospital}
          onChange={(e) => setSelectedHospital(e.target.value)}
        >
          <option value="">-- Choose a Hospital --</option>
          {hospitals.map((h) => (
            <option key={h.id} value={h.id}>
              {h.name} ({h.address})
            </option>
          ))}
        </select>
      </div>

      {/* 2. Dynamic Rows */}
      <div className="bg-gray-50 p-4 rounded border">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Services List</h3>
          {/* Helper search for the dropdowns below */}
          <input
            type="text"
            placeholder="Filter service dropdowns..."
            className="text-sm border p-1 rounded w-64"
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        {rows.map((row, index) => (
          <div key={index} className="flex gap-4 mb-3 items-end">
            {/* Service Dropdown */}
            <div className="flex-grow">
              <label className="block text-xs text-gray-500 mb-1">
                Service
              </label>
              <select
                className="w-full border p-2 rounded"
                value={row.serviceId}
                onChange={(e) =>
                  handleRowChange(index, "serviceId", e.target.value)
                }
              >
                <option value="">Select Service</option>
                {filteredServices.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Input */}
            <div className="w-32">
              <label className="block text-xs text-gray-500 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                placeholder="500"
                className="w-full border p-2 rounded"
                value={row.price}
                onChange={(e) =>
                  handleRowChange(index, "price", e.target.value)
                }
              />
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeRow(index)}
              className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 mb-[1px]"
              title="Remove Row"
            >
              ✕
            </button>
          </div>
        ))}

        {/* Add Row Button */}
        <button
          onClick={addRow}
          className="mt-2 flex items-center text-blue-600 font-semibold hover:text-blue-800"
        >
          <span className="text-xl mr-1">+</span> Add Another Service
        </button>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-right">
        <button
          onClick={handleSubmit}
          disabled={!selectedHospital}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Save All Services
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
