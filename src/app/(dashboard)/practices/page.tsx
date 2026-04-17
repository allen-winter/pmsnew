// src/app/(dashboard)/practices/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Filter,
  Building2,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

interface Practice {
  id: string;
  practiceDisplayId: string;
  practiceName: string;
  bhfNumber: string;
  practiceType: string;
  email: string | null;
  phone: string | null;
  vatNumber: string | null;
  cipcNumber: string | null;
  isActive: boolean;
  createdAt: string;
  locations: Array<{ city: string; isMain: boolean; suburb: string }>;
  contracts: Array<{ scheme: string }>;
}

export default function PracticesListPage() {
  const router = useRouter();
  const [practices, setPractices] = useState<Practice[]>([]);
  const [filteredPractices, setFilteredPractices] = useState<Practice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    fetchPractices();
  }, []);

  useEffect(() => {
    filterPractices();
  }, [searchTerm, filterType, practices]);

  const fetchPractices = async () => {
    try {
      const response = await fetch("/api/practices");
      const result = await response.json();

      if (result.success) {
        setPractices(result.data);
        setFilteredPractices(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to fetch practices");
    } finally {
      setLoading(false);
    }
  };

  const filterPractices = () => {
    let filtered = [...practices];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (practice) =>
          practice.practiceName.toLowerCase().includes(term) ||
          practice.bhfNumber.toLowerCase().includes(term) ||
          practice.practiceDisplayId.toLowerCase().includes(term) ||
          practice.locations.some((loc) =>
            loc.city.toLowerCase().includes(term),
          ) ||
          (practice.email && practice.email.toLowerCase().includes(term)) ||
          (practice.phone && practice.phone.includes(term)),
      );
    }

    // Filter by practice type
    if (filterType !== "all") {
      filtered = filtered.filter(
        (practice) => practice.practiceType === filterType,
      );
    }

    setFilteredPractices(filtered);
  };

  const togglePracticeStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch("/api/practices", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !currentStatus }),
      });

      if (response.ok) {
        fetchPractices();
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const deletePractice = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this practice? This will also delete all associated data (locations, contracts, bank details, documents).",
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/practices?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPractices();
      } else {
        const result = await response.json();
        alert(result.error || "Failed to delete practice");
      }
    } catch (err) {
      console.error("Error deleting practice:", err);
      alert("Failed to delete practice");
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilterType("all");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading practices...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Practices</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your medical practices and billing entities
          </p>
        </div>
        <Link
          href="/practices/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2"
        >
          <span>+</span> New Practice
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by practice name, BHF number, city, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="BOTH">Both (Rooms & Hospital)</option>
              <option value="ROOMS">Rooms Only</option>
              <option value="HOSPITAL">Hospital Only</option>
            </select>

            {(searchTerm || filterType !== "all") && (
              <button
                onClick={clearSearch}
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Search Results Count */}
        {searchTerm && (
          <div className="mt-3 text-sm text-gray-500">
            Found {filteredPractices.length} practice
            {filteredPractices.length !== 1 ? "s" : ""} matching "{searchTerm}"
          </div>
        )}
      </div>

      {filteredPractices.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Building2 className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">
            {searchTerm
              ? `No practices found matching "${searchTerm}"`
              : "No practices found. Create your first practice."}
          </p>
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Clear Search
            </button>
          )}
          {!searchTerm && (
            <Link
              href="/practices/new"
              className="inline-block mt-4 text-blue-600 hover:text-blue-800"
            >
              Create Practice →
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Practice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Practice Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BHF Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPractices.map((practice) => (
                <tr key={practice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {practice.practiceDisplayId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link
                      href={`/practices/${practice.id}`}
                      className="hover:text-blue-600"
                    >
                      {practice.practiceName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {practice.bhfNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        practice.practiceType === "CASH_AND_MEDICAL_AID" ||
                        practice.practiceType === "BOTH"
                          ? "bg-purple-100 text-purple-800"
                          : practice.practiceType === "CASH_ONLY" ||
                              practice.practiceType === "ROOMS"
                            ? "bg-green-100 text-green-800"
                            : practice.practiceType === "MEDICAL_AID_ONLY" ||
                                practice.practiceType === "HOSPITAL"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {practice.practiceType === "CASH_AND_MEDICAL_AID" ||
                      practice.practiceType === "BOTH"
                        ? "Cash & Medical Aid"
                        : practice.practiceType === "CASH_ONLY" ||
                            practice.practiceType === "ROOMS"
                          ? "Cash Only"
                          : practice.practiceType === "MEDICAL_AID_ONLY" ||
                              practice.practiceType === "HOSPITAL"
                            ? "Medical Aid Only"
                            : practice.practiceType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {practice.locations.find((l) => l.isMain)?.city ||
                        practice.locations[0]?.city ||
                        "-"}
                    </div>
                    {practice.locations.find((l) => l.isMain)?.suburb && (
                      <div className="text-xs text-gray-400 mt-0.5">
                        {practice.locations.find((l) => l.isMain)?.suburb}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {practice.phone && (
                      <div className="flex items-center gap-1 text-xs">
                        <Phone className="h-3 w-3" /> {practice.phone}
                      </div>
                    )}
                    {practice.email && (
                      <div className="flex items-center gap-1 text-xs mt-0.5">
                        <Mail className="h-3 w-3" /> {practice.email}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() =>
                        togglePracticeStatus(practice.id, practice.isActive)
                      }
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        practice.isActive
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {practice.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/practices/${practice.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </Link>
                    <Link
                      href={`/practices/${practice.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePractice(practice.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
