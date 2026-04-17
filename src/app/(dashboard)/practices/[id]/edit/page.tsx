// src/app/(dashboard)/practices/[id]/edit/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface PracticeData {
  practiceName: string;
  bhfNumber: string;
  practiceType: string;
  email: string;
  phone: string;
  vatNumber: string;
  cipcNumber: string;
  billingPolicy: string;
  roomsDefaultRate: string;
  inHospitalDefaultRate: string;
  additionalNotes: string;
  isActive: boolean;
}

export default function EditPracticePage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<PracticeData>({
    practiceName: "",
    bhfNumber: "",
    practiceType: "BOTH",
    email: "",
    phone: "",
    vatNumber: "",
    cipcNumber: "",
    billingPolicy: "",
    roomsDefaultRate: "",
    inHospitalDefaultRate: "",
    additionalNotes: "",
    isActive: true,
  });

  useEffect(() => {
    fetchPractice();
  }, []);

  const fetchPractice = async () => {
    try {
      const response = await fetch(`/api/practices/${params.id}`);
      const result = await response.json();
      
      if (result.success) {
        const practice = result.data;
        setFormData({
          practiceName: practice.practiceName,
          bhfNumber: practice.bhfNumber,
          practiceType: practice.practiceType,
          email: practice.email || "",
          phone: practice.phone || "",
          vatNumber: practice.vatNumber || "",
          cipcNumber: practice.cipcNumber || "",
          billingPolicy: practice.billingPolicy || "",
          roomsDefaultRate: practice.roomsDefaultRate?.toString() || "",
          inHospitalDefaultRate: practice.inHospitalDefaultRate?.toString() || "",
          additionalNotes: practice.additionalNotes || "",
          isActive: practice.isActive,
        });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to fetch practice");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/practices/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        router.push(`/practices/${params.id}`);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to update practice");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading practice...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link href={`/practices/${params.id}`} className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
            ← Back to Practice
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Edit Practice</h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Practice Name *</label>
            <input
              type="text"
              name="practiceName"
              value={formData.practiceName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">BHF Number *</label>
            <input
              type="text"
              name="bhfNumber"
              value={formData.bhfNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Practice Type</label>
            <select
              name="practiceType"
              value={formData.practiceType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="BOTH">Both (Rooms & Hospital)</option>
              <option value="ROOMS">Rooms Only</option>
              <option value="HOSPITAL">Hospital Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">VAT Number</label>
            <input
              type="text"
              name="vatNumber"
              value={formData.vatNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CIPC Number</label>
            <input
              type="text"
              name="cipcNumber"
              value={formData.cipcNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rooms Default Rate (R)</label>
            <input
              type="number"
              name="roomsDefaultRate"
              value={formData.roomsDefaultRate}
              onChange={handleChange}
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">In-Hospital Default Rate (R)</label>
            <input
              type="number"
              name="inHospitalDefaultRate"
              value={formData.inHospitalDefaultRate}
              onChange={handleChange}
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Practice is Active</span>
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Billing Policy</label>
            <textarea
              name="billingPolicy"
              value={formData.billingPolicy}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Link
            href={`/practices/${params.id}`}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}