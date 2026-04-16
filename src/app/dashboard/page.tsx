'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Users, Calendar, Stethoscope, Activity, TrendingUp, ArrowUpRight } from 'lucide-react';

const stats = [
  { title: 'Total Patients', value: '1,234', change: '+12%', icon: Users, color: 'bg-blue-500' },
  { title: 'Appointments Today', value: '24', change: '+8%', icon: Calendar, color: 'bg-green-500' },
  { title: 'Active Doctors', value: '12', change: '0%', icon: Stethoscope, color: 'bg-purple-500' },
  { title: 'Consultations', value: '89', change: '+23%', icon: Activity, color: 'bg-orange-500' },
];

const recentPatients = [
  { id: 1, name: 'John Doe', date: '2024-01-15', status: 'Completed' },
  { id: 2, name: 'Jane Smith', date: '2024-01-15', status: 'Pending' },
  { id: 3, name: 'Bob Johnson', date: '2024-01-14', status: 'Completed' },
  { id: 4, name: 'Alice Brown', date: '2024-01-14', status: 'Scheduled' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-green-600 text-sm flex items-center gap-1">
                  {stat.change} <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mt-4">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Patients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Recent Patients</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{patient.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{patient.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      patient.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      patient.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}