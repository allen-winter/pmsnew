// src/app/(dashboard)/practices/[id]/contracts/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Contract {
  id: string;
  contractType: string;
  isOther: boolean;
  otherText: string | null;
  schemeAdmin: string | null;
  scheme: string;
  plan: string | null;
  category: string | null;
  level: string | null;
  rateType: string;
  amount: number;
  startDate: string | null;
  endDate: string | null;
}

interface Practice {
  id: string;
  practiceName: string;
  practiceDisplayId: string;
}

export default function PracticeContractsPage() {
  const params = useParams();
  const router = useRouter();
  const [practice, setPractice] = useState<Practice | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  
  const [formData, setFormData] = useState({
    contractType: "",
    isOther: false,
    otherText: "",
    schemeAdmin: "",
    scheme: "",
    plan: "",
    category: "",
    level: "",
    rateType: "Fixed Amount",
    amount: "",
    startDate: "",
    endDate: "",
  });

  const contractTypes = ["Network", "DSP", "REPI", "CAPITATION", "FEE_FOR_SERVICE"];
  const rateTypes = ["Fixed Amount", "Percentage"];

  useEffect(() => {
    fetchPracticeAndContracts();
  }, []);

  const fetchPracticeAndContracts = async () => {
    try {
      const [practiceRes, contractsRes] = await Promise.all([
        fetch(`/api/practices/${params.id}`),
        fetch(`/api/practices/${params.id}/contracts`),
      ]);
      
      const practiceResult = await practiceRes.json();
      const contractsResult = await contractsRes.json();
      
      if (practiceResult.success) {
        setPractice(practiceResult.data);
      }
      
      if (contractsResult.success) {
        setContracts(contractsResult.data);
      } else {
        setError(contractsResult.error);
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
    
    const url = editingContract 
      ? `/api/practices/${params.id}/contracts/${editingContract.id}`
      : `/api/practices/${params.id}/contracts`;
    
    const method = editingContract ? "PUT" : "POST";
    
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setShowForm(false);
        setEditingContract(null);
        setFormData({
          contractType: "",
          isOther: false,
          otherText: "",
          schemeAdmin: "",
          scheme: "",
          plan: "",
          category: "",
          level: "",
          rateType: "Fixed Amount",
          amount: "",
          startDate: "",
          endDate: "",
        });
        fetchPracticeAndContracts();
      } else {
        alert(result.error);
      }
    } catch (err) {
      alert("Failed to save contract");
    }
  };

  const handleEdit = (contract: Contract) => {
    setEditingContract(contract);
    setFormData({
      contractType: contract.contractType,
      isOther: contract.isOther,
      otherText: contract.otherText || "",
      schemeAdmin: contract.schemeAdmin || "",
      scheme: contract.scheme,
      plan: contract.plan || "",
      category: contract.category || "",
      level: contract.level || "",
      rateType: contract.rateType,
      amount: contract.amount.toString(),
      startDate: contract.startDate?.split('T')[0] || "",
      endDate: contract.endDate?.split('T')[0] || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (contractId: string) => {
    if (!confirm("Are you sure you want to delete this contract?")) return;
    
    try {
      const response = await fetch(`/api/practices/${params.id}/contracts/${contractId}`, {
        method: "DELETE",
      });
      
      const result = await response.json();
      
      if (result.success) {
        fetchPracticeAndContracts();
      } else {
        alert(result.error);
      }
    } catch (err) {
      alert("Failed to delete contract");
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
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
            {practice?.practiceName} - Contracts
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage medical scheme contracts and agreements</p>
        </div>
        <button
          onClick={() => {
            setEditingContract(null);
            setFormData({
              contractType: "",
              isOther: false,
              otherText: "",
              schemeAdmin: "",
              scheme: "",
              plan: "",
              category: "",
              level: "",
              rateType: "Fixed Amount",
              amount: "",
              startDate: "",
              endDate: "",
            });
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Add Contract
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
                  {editingContract ? "Edit Contract" : "Add New Contract"}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingContract(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type *</label>
                    <select
                      name="contractType"
                      value={formData.contractType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Type</option>
                      {contractTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isOther"
                        checked={formData.isOther}
                        onChange={handleInputChange}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">This is an "Other" contract type</span>
                    </label>
                  </div>
                </div>
                
                {formData.isOther && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Please specify</label>
                    <input
                      type="text"
                      name="otherText"
                      value={formData.otherText}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Scheme Administrator</label>
                    <input
                      type="text"
                      name="schemeAdmin"
                      value={formData.schemeAdmin}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g., Discovery Health, Medscheme"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Scheme Name *</label>
                    <input
                      type="text"
                      name="scheme"
                      value={formData.scheme}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g., Discovery, Bonitas"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan / Option</label>
                    <input
                      type="text"
                      name="plan"
                      value={formData.plan}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g., Classic Smart"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g., PRESTIGE A"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                    <input
                      type="text"
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rate Type *</label>
                    <select
                      name="rateType"
                      value={formData.rateType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      {rateTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder={formData.rateType === "Percentage" ? "e.g., 100" : "e.g., 350.00"}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.rateType === "Percentage" ? "Enter percentage (e.g., 100 for 100%)" : "Enter amount in Rands"}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingContract(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {editingContract ? "Update" : "Create"} Contract
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Contracts List */}
      {contracts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No contracts added yet.</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Add your first contract →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {contracts.map((contract) => (
            <div key={contract.id} className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{contract.scheme}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {contract.contractType}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-sm text-gray-500">Rate</p>
                      <p className="text-gray-900">
                        {contract.rateType === "Percentage" 
                          ? `${contract.amount}%` 
                          : `R ${contract.amount.toFixed(2)}`}
                      </p>
                    </div>
                    
                    {contract.plan && (
                      <div>
                        <p className="text-sm text-gray-500">Plan</p>
                        <p className="text-gray-900">{contract.plan}</p>
                      </div>
                    )}
                    
                    {contract.schemeAdmin && (
                      <div>
                        <p className="text-sm text-gray-500">Administrator</p>
                        <p className="text-gray-900">{contract.schemeAdmin}</p>
                      </div>
                    )}
                    
                    {(contract.startDate || contract.endDate) && (
                      <div>
                        <p className="text-sm text-gray-500">Valid Period</p>
                        <p className="text-gray-900">
                          {formatDate(contract.startDate)} - {formatDate(contract.endDate)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(contract)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contract.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}