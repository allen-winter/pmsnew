// src/app/(dashboard)/practices/[id]/locations/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Location {
  id: string;
  addressLine1: string;
  addressLine2: string | null;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  isMain: boolean;
  locationNumber: number;
}

interface Practice {
  id: string;
  practiceName: string;
  practiceDisplayId: string;
}

export default function PracticeLocationsPage() {
  const params = useParams();
  const router = useRouter();
  const [practice, setPractice] = useState<Practice | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    suburb: "",
    city: "",
    province: "",
    postalCode: "",
    isMain: false,
  });

  const provinces = [
    "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", 
    "Limpopo", "Mpumalanga", "Northern Cape", "North West", "Western Cape"
  ];

  useEffect(() => {
    fetchPracticeAndLocations();
  }, []);

  const fetchPracticeAndLocations = async () => {
    try {
      const [practiceRes, locationsRes] = await Promise.all([
        fetch(`/api/practices/${params.id}`),
        fetch(`/api/practices/${params.id}/locations`),
      ]);
      
      const practiceResult = await practiceRes.json();
      const locationsResult = await locationsRes.json();
      
      if (practiceResult.success) {
        setPractice(practiceResult.data);
      }
      
      if (locationsResult.success) {
        setLocations(locationsResult.data);
      } else {
        setError(locationsResult.error);
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = editingLocation 
      ? `/api/practices/${params.id}/locations/${editingLocation.id}`
      : `/api/practices/${params.id}/locations`;
    
    const method = editingLocation ? "PUT" : "POST";
    
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setShowForm(false);
        setEditingLocation(null);
        setFormData({
          addressLine1: "",
          addressLine2: "",
          suburb: "",
          city: "",
          province: "",
          postalCode: "",
          isMain: false,
        });
        fetchPracticeAndLocations();
      } else {
        alert(result.error);
      }
    } catch (err) {
      alert("Failed to save location");
    }
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setFormData({
      addressLine1: location.addressLine1,
      addressLine2: location.addressLine2 || "",
      suburb: location.suburb,
      city: location.city,
      province: location.province,
      postalCode: location.postalCode,
      isMain: location.isMain,
    });
    setShowForm(true);
  };

  const handleDelete = async (locationId: string) => {
    if (!confirm("Are you sure you want to delete this location?")) return;
    
    try {
      const response = await fetch(`/api/practices/${params.id}/locations/${locationId}`, {
        method: "DELETE",
      });
      
      const result = await response.json();
      
      if (result.success) {
        fetchPracticeAndLocations();
      } else {
        alert(result.error);
      }
    } catch (err) {
      alert("Failed to delete location");
    }
  };

  const setAsMain = async (locationId: string) => {
    const location = locations.find(l => l.id === locationId);
    if (!location) return;
    
    try {
      const response = await fetch(`/api/practices/${params.id}/locations/${locationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...location, isMain: true }),
      });
      
      if (response.ok) {
        fetchPracticeAndLocations();
      }
    } catch (err) {
      alert("Failed to set as main location");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link href={`/practices/${params.id}`} className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
            ← Back to Practice
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {practice?.practiceName} - Locations
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage all practice locations and branches</p>
        </div>
        <button
          onClick={() => {
            setEditingLocation(null);
            setFormData({
              addressLine1: "",
              addressLine2: "",
              suburb: "",
              city: "",
              province: "",
              postalCode: "",
              isMain: false,
            });
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Add Location
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingLocation ? "Edit Location" : "Add New Location"}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingLocation(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Building name and number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Street name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Suburb *</label>
                    <input
                      type="text"
                      name="suburb"
                      value={formData.suburb}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Province *</label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Province</option>
                      {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isMain"
                      checked={formData.isMain}
                      onChange={handleInputChange}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">This is the main practice location</span>
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingLocation(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {editingLocation ? "Update" : "Create"} Location
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Locations List */}
      {locations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No locations added yet.</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Add your first location →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((location) => (
            <div key={location.id} className={`bg-white shadow-md rounded-lg p-6 ${location.isMain ? 'border-2 border-blue-300' : ''}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  {location.isMain && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Main Location</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(location)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                  >
                    Edit
                  </button>
                  {!location.isMain && (
                    <>
                      <button
                        onClick={() => setAsMain(location.id)}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        Set as Main
                      </button>
                      <button
                        onClick={() => handleDelete(location.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <p className="text-gray-900 font-medium">{location.addressLine1}</p>
              {location.addressLine2 && <p className="text-gray-600">{location.addressLine2}</p>}
              <p className="text-gray-600">{location.suburb}</p>
              <p className="text-gray-600">{location.city}, {location.province}</p>
              <p className="text-gray-500 text-sm mt-2">Postal Code: {location.postalCode}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}