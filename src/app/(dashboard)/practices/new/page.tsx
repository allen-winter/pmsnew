// src/app/(dashboard)/practices/new/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Discipline {
  disciplineName: string;
  disciplineCode: string;
  isOther: boolean;
  otherText: string;
}

interface Specialization {
  specializationName: string;
  isOther: boolean;
  otherText: string;
  subSpecialization: string;
  isSubOther: boolean;
  subOtherText: string;
}

interface Location {
  addressLine1: string;
  addressLine2: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  isMain: boolean;
}

interface Contract {
  contractType: string;
  isOther: boolean;
  otherText: string;
  schemeAdmin: string;
  scheme: string;
  plan: string;
  category: string;
  level: string;
  rateType: string;
  amount: string;
  startDate: string;
  endDate: string;
}

interface BankDetail {
  bankName: string;
  isBankOther: boolean;
  bankOtherText: string;
  branchName: string;
  branchCode: string;
  accountNumber: string;
  accountType: string;
  isAccountOther: boolean;
  accountOtherText: string;
  bankAddress: string;
}

export default function NewPracticePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("basic");

  // Basic Info
  const [practiceName, setPracticeName] = useState("");
  const [bhfNumber, setBhfNumber] = useState("");
  const [practiceType, setPracticeType] = useState("BOTH");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [cipcNumber, setCipcNumber] = useState("");
  const [billingPolicy, setBillingPolicy] = useState("");
  const [roomsDefaultRate, setRoomsDefaultRate] = useState("");
  const [inHospitalDefaultRate, setInHospitalDefaultRate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Disciplines
  const [disciplines, setDisciplines] = useState<Discipline[]>([
    { disciplineName: "", disciplineCode: "", isOther: false, otherText: "" },
  ]);

  // Specializations
  const [specializations, setSpecializations] = useState<Specialization[]>([
    {
      specializationName: "",
      isOther: false,
      otherText: "",
      subSpecialization: "",
      isSubOther: false,
      subOtherText: "",
    },
  ]);

  // Locations
  const [locations, setLocations] = useState<Location[]>([
    {
      addressLine1: "",
      addressLine2: "",
      suburb: "",
      city: "",
      province: "",
      postalCode: "",
      isMain: true,
    },
  ]);

  // Contracts
  const [contracts, setContracts] = useState<Contract[]>([
    {
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
    },
  ]);

  // Bank Details
  const [bankDetails, setBankDetails] = useState<BankDetail[]>([
    {
      bankName: "",
      isBankOther: false,
      bankOtherText: "",
      branchName: "",
      branchCode: "",
      accountNumber: "",
      accountType: "",
      isAccountOther: false,
      accountOtherText: "",
      bankAddress: "",
    },
  ]);

  const provinces = [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "Northern Cape",
    "North West",
    "Western Cape",
  ];

  const contractTypes = [
    "Network",
    "DSP",
    "REPI",
    "CAPITATION",
    "FEE_FOR_SERVICE",
  ];
  const rateTypes = ["Fixed Amount", "Percentage"];
  const accountTypes = ["Savings", "Cheque", "Transaction"];

  const addDiscipline = () => {
    setDisciplines([
      ...disciplines,
      { disciplineName: "", disciplineCode: "", isOther: false, otherText: "" },
    ]);
  };

  const removeDiscipline = (index: number) => {
    setDisciplines(disciplines.filter((_, i) => i !== index));
  };

  const updateDiscipline = (
    index: number,
    field: keyof Discipline,
    value: any,
  ) => {
    const updated = [...disciplines];
    updated[index] = { ...updated[index], [field]: value };
    setDisciplines(updated);
  };

  const addSpecialization = () => {
    setSpecializations([
      ...specializations,
      {
        specializationName: "",
        isOther: false,
        otherText: "",
        subSpecialization: "",
        isSubOther: false,
        subOtherText: "",
      },
    ]);
  };

  const removeSpecialization = (index: number) => {
    setSpecializations(specializations.filter((_, i) => i !== index));
  };

  const updateSpecialization = (
    index: number,
    field: keyof Specialization,
    value: any,
  ) => {
    const updated = [...specializations];
    updated[index] = { ...updated[index], [field]: value };
    setSpecializations(updated);
  };

  const addLocation = () => {
    setLocations([
      ...locations,
      {
        addressLine1: "",
        addressLine2: "",
        suburb: "",
        city: "",
        province: "",
        postalCode: "",
        isMain: false,
      },
    ]);
  };

  const removeLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const updateLocation = (index: number, field: keyof Location, value: any) => {
    const updated = [...locations];
    updated[index] = { ...updated[index], [field]: value };
    setLocations(updated);
  };

  const addContract = () => {
    setContracts([
      ...contracts,
      {
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
      },
    ]);
  };

  const removeContract = (index: number) => {
    setContracts(contracts.filter((_, i) => i !== index));
  };

  const updateContract = (index: number, field: keyof Contract, value: any) => {
    const updated = [...contracts];
    updated[index] = { ...updated[index], [field]: value };
    setContracts(updated);
  };

  const addBankDetail = () => {
    setBankDetails([
      ...bankDetails,
      {
        bankName: "",
        isBankOther: false,
        bankOtherText: "",
        branchName: "",
        branchCode: "",
        accountNumber: "",
        accountType: "",
        isAccountOther: false,
        accountOtherText: "",
        bankAddress: "",
      },
    ]);
  };

  const removeBankDetail = (index: number) => {
    setBankDetails(bankDetails.filter((_, i) => i !== index));
  };

  const updateBankDetail = (
    index: number,
    field: keyof BankDetail,
    value: any,
  ) => {
    const updated = [...bankDetails];
    updated[index] = { ...updated[index], [field]: value };
    setBankDetails(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = {
      practiceName,
      bhfNumber,
      practiceType,
      email,
      phone,
      vatNumber,
      cipcNumber,
      billingPolicy,
      roomsDefaultRate,
      inHospitalDefaultRate,
      additionalNotes,
      disciplines: disciplines.filter((d) => d.disciplineName),
      specializations: specializations.filter((s) => s.specializationName),
      locations: locations.filter((l) => l.addressLine1),
      contracts: contracts.filter((c) => c.contractType && c.scheme),
      bankDetails: bankDetails.filter((b) => b.bankName && b.accountNumber),
    };

    try {
      const response = await fetch("/api/practices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/practices");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to create practice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Create New Practice
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Register a new medical practice or billing entity
          </p>
        </div>
        <Link href="/practices" className="text-gray-600 hover:text-gray-800">
          Cancel
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            "basic",
            "disciplines",
            "specializations",
            "locations",
            "contracts",
            "banking",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Information Tab */}
        {activeTab === "basic" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Practice Name *
                </label>
                <input
                  type="text"
                  value={practiceName}
                  onChange={(e) => setPracticeName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Sandton Medical Centre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  BHF Number (PCNS) *
                </label>
                <input
                  type="text"
                  value={bhfNumber}
                  onChange={(e) => setBhfNumber(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="13-digit PCNS number"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Unique 13-digit number from BHF/PCNS
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Practice Type
                </label>
                <select
                  value={practiceType}
                  onChange={(e) => setPracticeType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="BOTH">Both (Cash & Medical Aid)</option>
                  <option value="Cash">Cash Only</option>
                  <option value="Cash">Medical Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="practice@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="011 123 4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  VAT Number
                </label>
                <input
                  type="text"
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 4123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CIPC Number
                </label>
                <input
                  type="text"
                  value={cipcNumber}
                  onChange={(e) => setCipcNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company registration number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rooms Default Rate (R)
                </label>
                <input
                  type="number"
                  value={roomsDefaultRate}
                  onChange={(e) => setRoomsDefaultRate(e.target.value)}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  In-Hospital Default Rate (R)
                </label>
                <input
                  type="number"
                  value={inHospitalDefaultRate}
                  onChange={(e) => setInHospitalDefaultRate(e.target.value)}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Billing Policy
                </label>
                <textarea
                  value={billingPolicy}
                  onChange={(e) => setBillingPolicy(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your billing policy..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any additional information..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Disciplines Tab */}
        {activeTab === "disciplines" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Practice Disciplines
              </h3>
              <button
                type="button"
                onClick={addDiscipline}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Discipline
              </button>
            </div>
            {disciplines.map((discipline, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-700 mb-3">
                    Discipline {index + 1}
                  </h4>
                  {disciplines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDiscipline(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discipline Name
                    </label>
                    <input
                      type="text"
                      value={discipline.disciplineName}
                      onChange={(e) =>
                        updateDiscipline(
                          index,
                          "disciplineName",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g., General Practice, Cardiology"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discipline Code
                    </label>
                    <input
                      type="text"
                      value={discipline.disciplineCode}
                      onChange={(e) =>
                        updateDiscipline(
                          index,
                          "disciplineCode",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g., 014, 016"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={discipline.isOther}
                        onChange={(e) =>
                          updateDiscipline(index, "isOther", e.target.checked)
                        }
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">
                        This is an "Other" discipline
                      </span>
                    </label>
                  </div>
                  {discipline.isOther && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Please specify
                      </label>
                      <input
                        type="text"
                        value={discipline.otherText}
                        onChange={(e) =>
                          updateDiscipline(index, "otherText", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter discipline name"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Specializations Tab */}
        {activeTab === "specializations" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Practice Specializations
              </h3>
              <button
                type="button"
                onClick={addSpecialization}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Specialization
              </button>
            </div>
            {specializations.map((spec, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-700 mb-3">
                    Specialization {index + 1}
                  </h4>
                  {specializations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSpecialization(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialization Name
                    </label>
                    <input
                      type="text"
                      value={spec.specializationName}
                      onChange={(e) =>
                        updateSpecialization(
                          index,
                          "specializationName",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g., Cardiology, Pediatrics"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={spec.isOther}
                        onChange={(e) =>
                          updateSpecialization(
                            index,
                            "isOther",
                            e.target.checked,
                          )
                        }
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">
                        This is an "Other" specialization
                      </span>
                    </label>
                  </div>
                  {spec.isOther && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Please specify
                      </label>
                      <input
                        type="text"
                        value={spec.otherText}
                        onChange={(e) =>
                          updateSpecialization(
                            index,
                            "otherText",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter specialization name"
                      />
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sub-Specialization (Optional)
                    </label>
                    <input
                      type="text"
                      value={spec.subSpecialization}
                      onChange={(e) =>
                        updateSpecialization(
                          index,
                          "subSpecialization",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g., Interventional Cardiology"
                    />
                  </div>
                  {spec.subSpecialization === "Other" && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Please specify
                      </label>
                      <input
                        type="text"
                        value={spec.subOtherText}
                        onChange={(e) =>
                          updateSpecialization(
                            index,
                            "subOtherText",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Locations Tab */}
        {activeTab === "locations" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Practice Locations
              </h3>
              <button
                type="button"
                onClick={addLocation}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Location
              </button>
            </div>
            {locations.map((location, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-700 mb-3">
                    Location {index + 1}
                  </h4>
                  {locations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLocation(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      value={location.addressLine1}
                      onChange={(e) =>
                        updateLocation(index, "addressLine1", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Building name and number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      value={location.addressLine2}
                      onChange={(e) =>
                        updateLocation(index, "addressLine2", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Street name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Suburb *
                    </label>
                    <input
                      type="text"
                      value={location.suburb}
                      onChange={(e) =>
                        updateLocation(index, "suburb", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={location.city}
                      onChange={(e) =>
                        updateLocation(index, "city", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Province *
                    </label>
                    <select
                      value={location.province}
                      onChange={(e) =>
                        updateLocation(index, "province", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Province</option>
                      {provinces.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      value={location.postalCode}
                      onChange={(e) =>
                        updateLocation(index, "postalCode", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={location.isMain}
                        onChange={(e) =>
                          updateLocation(index, "isMain", e.target.checked)
                        }
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">
                        This is the main practice location
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contracts Tab */}
        {activeTab === "contracts" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Medical Scheme Contracts
              </h3>
              <button
                type="button"
                onClick={addContract}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Contract
              </button>
            </div>
            {contracts.map((contract, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-700 mb-3">
                    Contract {index + 1}
                  </h4>
                  {contracts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContract(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contract Type *
                    </label>
                    <select
                      value={contract.contractType}
                      onChange={(e) =>
                        updateContract(index, "contractType", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Type</option>
                      {contractTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={contract.isOther}
                        onChange={(e) =>
                          updateContract(index, "isOther", e.target.checked)
                        }
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">
                        This is an "Other" contract type
                      </span>
                    </label>
                  </div>
                  {contract.isOther && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Please specify
                      </label>
                      <input
                        type="text"
                        value={contract.otherText}
                        onChange={(e) =>
                          updateContract(index, "otherText", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Scheme Administrator
                    </label>
                    <input
                      type="text"
                      value={contract.schemeAdmin}
                      onChange={(e) =>
                        updateContract(index, "schemeAdmin", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g., Discovery Health, Medscheme"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Scheme Name *
                    </label>
                    <input
                      type="text"
                      value={contract.scheme}
                      onChange={(e) =>
                        updateContract(index, "scheme", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g., Discovery, Bonitas, Momentum"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Plan / Option
                    </label>
                    <input
                      type="text"
                      value={contract.plan}
                      onChange={(e) =>
                        updateContract(index, "plan", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g., Classic Smart, Coastal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={contract.category}
                      onChange={(e) =>
                        updateContract(index, "category", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g., PRESTIGE A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Level
                    </label>
                    <input
                      type="text"
                      value={contract.level}
                      onChange={(e) =>
                        updateContract(index, "level", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rate Type *
                    </label>
                    <select
                      value={contract.rateType}
                      onChange={(e) =>
                        updateContract(index, "rateType", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      {rateTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount *
                    </label>
                    <input
                      type="number"
                      value={contract.amount}
                      onChange={(e) =>
                        updateContract(index, "amount", e.target.value)
                      }
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder={
                        contract.rateType === "Percentage"
                          ? "e.g., 100"
                          : "e.g., 350.00"
                      }
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {contract.rateType === "Percentage"
                        ? "Enter percentage (e.g., 100 for 100%)"
                        : "Enter amount in Rands"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={contract.startDate}
                      onChange={(e) =>
                        updateContract(index, "startDate", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={contract.endDate}
                      onChange={(e) =>
                        updateContract(index, "endDate", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Banking Tab */}
        {activeTab === "banking" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Bank Details
              </h3>
              <button
                type="button"
                onClick={addBankDetail}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Bank Account
              </button>
            </div>
            {bankDetails.map((bank, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-700 mb-3">
                    Bank Account {index + 1}
                  </h4>
                  {bankDetails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBankDetail(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name *
                    </label>
                    <input
                      type="text"
                      value={bank.bankName}
                      onChange={(e) =>
                        updateBankDetail(index, "bankName", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g., Standard Bank, FNB, Nedbank"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={bank.isBankOther}
                        onChange={(e) =>
                          updateBankDetail(
                            index,
                            "isBankOther",
                            e.target.checked,
                          )
                        }
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">
                        This is an "Other" bank
                      </span>
                    </label>
                  </div>
                  {bank.isBankOther && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Please specify
                      </label>
                      <input
                        type="text"
                        value={bank.bankOtherText}
                        onChange={(e) =>
                          updateBankDetail(
                            index,
                            "bankOtherText",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Branch Name
                    </label>
                    <input
                      type="text"
                      value={bank.branchName}
                      onChange={(e) =>
                        updateBankDetail(index, "branchName", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Branch Code
                    </label>
                    <input
                      type="text"
                      value={bank.branchCode}
                      onChange={(e) =>
                        updateBankDetail(index, "branchCode", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g., 250655"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      value={bank.accountNumber}
                      onChange={(e) =>
                        updateBankDetail(index, "accountNumber", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Type
                    </label>
                    <select
                      value={bank.accountType}
                      onChange={(e) =>
                        updateBankDetail(index, "accountType", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Account Type</option>
                      {accountTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={bank.isAccountOther}
                        onChange={(e) =>
                          updateBankDetail(
                            index,
                            "isAccountOther",
                            e.target.checked,
                          )
                        }
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">
                        This is an "Other" account type
                      </span>
                    </label>
                  </div>
                  {bank.isAccountOther && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Please specify
                      </label>
                      <input
                        type="text"
                        value={bank.accountOtherText}
                        onChange={(e) =>
                          updateBankDetail(
                            index,
                            "accountOtherText",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Address
                    </label>
                    <textarea
                      value={bank.bankAddress}
                      onChange={(e) =>
                        updateBankDetail(index, "bankAddress", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Full bank address"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form Actions */}
        <div className="mt-6 flex justify-end space-x-3">
          <Link
            href="/practices"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Practice"}
          </button>
        </div>
      </form>
    </div>
  );
}
