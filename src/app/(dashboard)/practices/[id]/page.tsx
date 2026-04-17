// src/app/(dashboard)/practices/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

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
  billingPolicy: string | null;
  roomsDefaultRate: number | null;
  inHospitalDefaultRate: number | null;
  additionalNotes: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  disciplines: Array<{ id: string; disciplineName: string; disciplineCode: string | null }>;
  specializations: Array<{ id: string; specializationName: string; subSpecialization: string | null }>;
  locations: Array<{ id: string; addressLine1: string; suburb: string; city: string; province: string; isMain: boolean }>;
  contracts: Array<{ id: string; contractType: string; scheme: string; rateType: string; amount: number }>;
  bankDetails: Array<{ id: string; bankName: string; accountNumber: string }>;
}

export default function PracticeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [practice, setPractice] = useState<Practice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchPractice();
  }, []);

  const fetchPractice = async () => {
    try {
      const response = await fetch(`/api/practices/${params.id}`);
      const result = await response.json();
      
      if (result.success) {
        setPractice(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to fetch practice");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading practice details...</div>
      </div>
    );
  }

  if (error || !practice) {
    return (
      <div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error || "Practice not found"}
        </div>
        <Link href="/practices" className="text-blue-600 hover:text-blue-800">
          ← Back to Practices
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: "overview", name: "Overview", icon: "📋" },
    { id: "locations", name: "Locations", icon: "📍", href: `/practices/${practice.id}/locations` },
    { id: "contracts", name: "Contracts", icon: "📄", href: `/practices/${practice.id}/contracts` },
    { id: "banking", name: "Banking", icon: "🏦" },
    { id: "documents", name: "Documents", icon: "📎" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link href="/practices" className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
            ← Back to Practices
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{practice.practiceName}</h1>
          <p className="text-sm text-gray-500">ID: {practice.practiceDisplayId} | BHF: {practice.bhfNumber}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/practices/${practice.id}/edit`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Edit Practice
          </Link>
          <button
            onClick={async () => {
              if (confirm("Delete this practice?")) {
                await fetch(`/api/practices?id=${practice.id}`, { method: "DELETE" });
                router.push("/practices");
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-6">
        <span className={`px-2 py-1 text-sm rounded-full ${practice.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {practice.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            tab.href ? (
              <Link
                key={tab.id}
                href={tab.href}
                className="py-2 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </Link>
            ) : (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            )
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Basic Information</h2>
            <dl className="space-y-3">
              <div><dt className="text-sm font-medium text-gray-500">Practice Name</dt><dd className="text-gray-900">{practice.practiceName}</dd></div>
              <div><dt className="text-sm font-medium text-gray-500">BHF Number</dt><dd className="text-gray-900">{practice.bhfNumber}</dd></div>
              <div><dt className="text-sm font-medium text-gray-500">Practice Type</dt><dd className="text-gray-900">{practice.practiceType}</dd></div>
              <div><dt className="text-sm font-medium text-gray-500">Email</dt><dd className="text-gray-900">{practice.email || "-"}</dd></div>
              <div><dt className="text-sm font-medium text-gray-500">Phone</dt><dd className="text-gray-900">{practice.phone || "-"}</dd></div>
              <div><dt className="text-sm font-medium text-gray-500">VAT Number</dt><dd className="text-gray-900">{practice.vatNumber || "-"}</dd></div>
              <div><dt className="text-sm font-medium text-gray-500">CIPC Number</dt><dd className="text-gray-900">{practice.cipcNumber || "-"}</dd></div>
            </dl>
          </div>

          {/* Rates */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Practice Rates</h2>
            <dl className="space-y-3">
              <div><dt className="text-sm font-medium text-gray-500">Rooms Default Rate</dt><dd className="text-gray-900">{practice.roomsDefaultRate ? `R ${practice.roomsDefaultRate.toFixed(2)}` : "-"}</dd></div>
              <div><dt className="text-sm font-medium text-gray-500">In-Hospital Default Rate</dt><dd className="text-gray-900">{practice.inHospitalDefaultRate ? `R ${practice.inHospitalDefaultRate.toFixed(2)}` : "-"}</dd></div>
            </dl>
          </div>

          {/* Disciplines */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Disciplines</h2>
            {practice.disciplines.length === 0 ? (
              <p className="text-gray-500">No disciplines added</p>
            ) : (
              <ul className="space-y-2">
                {practice.disciplines.map((d) => (
                  <li key={d.id} className="text-gray-900">{d.disciplineName}{d.disciplineCode && ` (${d.disciplineCode})`}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Specializations */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Specializations</h2>
            {practice.specializations.length === 0 ? (
              <p className="text-gray-500">No specializations added</p>
            ) : (
              <ul className="space-y-2">
                {practice.specializations.map((s) => (
                  <li key={s.id}>
                    <span className="text-gray-900">{s.specializationName}</span>
                    {s.subSpecialization && <span className="text-gray-500 text-sm ml-2">→ {s.subSpecialization}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Locations Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Locations</h2>
            {practice.locations.length === 0 ? (
              <p className="text-gray-500">No locations added</p>
            ) : (
              <div className="space-y-3">
                {practice.locations.slice(0, 3).map((loc) => (
                  <div key={loc.id} className="flex items-center gap-2">
                    {loc.isMain && <span className="text-blue-500">📍</span>}
                    <span className="text-gray-900">{loc.addressLine1}, {loc.city}</span>
                  </div>
                ))}
                {practice.locations.length > 3 && (
                  <Link href={`/practices/${practice.id}/locations`} className="text-blue-600 text-sm hover:underline">
                    View all {practice.locations.length} locations →
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Contracts Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Medical Scheme Contracts</h2>
            {practice.contracts.length === 0 ? (
              <p className="text-gray-500">No contracts added</p>
            ) : (
              <div className="space-y-3">
                {practice.contracts.slice(0, 3).map((c) => (
                  <div key={c.id}>
                    <p className="font-medium text-gray-900">{c.scheme}</p>
                    <p className="text-sm text-gray-600">{c.contractType}: {c.rateType === "Percentage" ? `${c.amount}%` : `R${c.amount}`}</p>
                  </div>
                ))}
                {practice.contracts.length > 3 && (
                  <Link href={`/practices/${practice.id}/contracts`} className="text-blue-600 text-sm hover:underline">
                    View all {practice.contracts.length} contracts →
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Bank Details Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Bank Details</h2>
            {practice.bankDetails.length === 0 ? (
              <p className="text-gray-500">No bank details added</p>
            ) : (
              <div className="space-y-3">
                {practice.bankDetails.map((b) => (
                  <div key={b.id}>
                    <p className="font-medium text-gray-900">{b.bankName}</p>
                    <p className="text-sm text-gray-600">Account: {b.accountNumber}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Additional Notes */}
          {practice.additionalNotes && (
            <div className="bg-white shadow-md rounded-lg p-6 lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Additional Notes</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{practice.additionalNotes}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "banking" && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Bank Account Details</h2>
          {practice.bankDetails.length === 0 ? (
            <p className="text-gray-500">No bank details added.</p>
          ) : (
            <div className="space-y-4">
              {practice.bankDetails.map((bank) => (
                <div key={bank.id} className="border-b pb-3 last:border-0">
                  <p className="font-medium text-gray-900">{bank.bankName}</p>
                  <p className="text-gray-600">Account: {bank.accountNumber}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "documents" && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Practice Documents</h2>
          <p className="text-gray-500">Document management coming soon...</p>
        </div>
      )}
    </div>
  );
}