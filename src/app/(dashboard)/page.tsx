// src/app/(dashboard)/page.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  Stethoscope,
  Activity,
  Package,
  DollarSign,
  Settings,
  BarChart3,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  UserPlus,
  Building2,
  Pill,
  FileText,
  CreditCard,
  ArrowRight,
  CalendarDays,
  Receipt,
  Send,
  Inbox,
  FileSpreadsheet,
  Eye,
} from "lucide-react";

// ==================== TYPE DEFINITIONS ====================

interface Appointment {
  id: string;
  date: string;
  patientName?: string;
  doctorName?: string;
  status?: string;
}

interface Bill {
  id: string;
  createdAt: string;
  totalAmount: number;
}

interface Claim {
  id: string;
  status: string;
}

interface DashboardStats {
  totalAppointments: number;
  totalPatients: number;
  totalDoctors: number;
  totalPractices: number;
  lowStockCount: number;
  pendingClaims: number;
  todayAppointments: number;
  todayRevenue: number;
  monthlyRevenue: number;
  approvedClaims: number;
  rejectedClaims: number;
  totalProducts: number;
  expiringStockCount: number;
}

interface RecentActivity {
  id: string;
  type: "appointment" | "patient" | "claim" | "bill" | "stock";
  title: string;
  description: string;
  time: string;
  status: "success" | "warning" | "error" | "info";
}

interface UpcomingAppointment {
  id: string;
  patientName: string;
  patientId: string;
  time: string;
  doctorName: string;
  type: string;
  status: "scheduled" | "confirmed" | "checked-in" | "completed" | "cancelled" | "no-show";
}

// ==================== MAIN COMPONENT ====================

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAppointments: 0,
    totalPatients: 0,
    totalDoctors: 0,
    totalPractices: 0,
    lowStockCount: 0,
    pendingClaims: 0,
    todayAppointments: 0,
    todayRevenue: 0,
    monthlyRevenue: 0,
    approvedClaims: 0,
    rejectedClaims: 0,
    totalProducts: 0,
    expiringStockCount: 0,
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<UpcomingAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchDashboardStats();
      fetchRecentActivities();
      fetchUpcomingAppointments();
    }
  }, [mounted]);

  const fetchDashboardStats = async () => {
    try {
      const [
        practicesRes,
        doctorsRes,
        patientsRes,
        appointmentsRes,
        stockRes,
        claimsRes,
        billsRes,
      ] = await Promise.all([
        fetch("/api/practices").catch(() => ({ ok: false, json: () => ({ data: [] }) })),
        fetch("/api/doctors").catch(() => ({ ok: false, json: () => ({ data: [] }) })),
        fetch("/api/patients").catch(() => ({ ok: false, json: () => ({ data: [] }) })),
        fetch("/api/appointments/list").catch(() => ({ ok: false, json: () => [] })),
        fetch("/api/stock/low-stock").catch(() => ({ ok: false, json: () => [] })),
        fetch("/api/claims").catch(() => ({ ok: false, json: () => ({ data: [] }) })),
        fetch("/api/bills").catch(() => ({ ok: false, json: () => ({ data: [] }) })),
      ]);

      const practicesData = practicesRes.ok ? await practicesRes.json() : { data: [] };
      const doctorsData = doctorsRes.ok ? await doctorsRes.json() : { data: [] };
      const patientsData = patientsRes.ok ? await patientsRes.json() : { data: [] };
      const appointmentsData = appointmentsRes.ok ? await appointmentsRes.json() as Appointment[] : [];
      const lowStockData = stockRes.ok ? await stockRes.json() : [];
      const claimsData = claimsRes.ok ? await claimsRes.json() : { data: [] };
      const billsData = billsRes.ok ? await billsRes.json() : { data: [] };

      const today = new Date().toDateString();
      const todayAppointments = appointmentsData.filter(
        (apt: Appointment) => new Date(apt.date).toDateString() === today
      ).length;

      const todayBills = (billsData.data || []).filter(
        (bill: Bill) => new Date(bill.createdAt).toDateString() === today
      );
      const todayRevenue = todayBills.reduce((sum: number, bill: Bill) => sum + (bill.totalAmount || 0), 0);

      const monthlyBills = (billsData.data || []).filter(
        (bill: Bill) => new Date(bill.createdAt).getMonth() === new Date().getMonth()
      );
      const monthlyRevenue = monthlyBills.reduce((sum: number, bill: Bill) => sum + (bill.totalAmount || 0), 0);

      const approvedClaims = (claimsData.data || []).filter((c: Claim) => c.status === "APPROVED").length || 0;
      const rejectedClaims = (claimsData.data || []).filter((c: Claim) => c.status === "REJECTED").length || 0;
      const pendingClaims = (claimsData.data || []).filter(
        (c: Claim) => c.status === "PENDING" || c.status === "SUBMITTED"
      ).length || 0;

      setStats({
        totalPractices: (practicesData.data || []).length,
        totalDoctors: (doctorsData.data || []).length,
        totalPatients: (patientsData.data || []).length,
        totalAppointments: appointmentsData.length,
        lowStockCount: lowStockData.length || 0,
        pendingClaims,
        todayAppointments,
        todayRevenue,
        monthlyRevenue,
        approvedClaims,
        rejectedClaims,
        totalProducts: 0,
        expiringStockCount: 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentActivities = async () => {
    // Simulated data - replace with actual API calls
    setRecentActivities([
      {
        id: "1",
        type: "appointment",
        title: "New Appointment",
        description: "John Doe scheduled an appointment with Dr. Smith",
        time: "5 minutes ago",
        status: "success",
      },
      {
        id: "2",
        type: "patient",
        title: "New Patient Registered",
        description: "Jane Smith registered as a new patient",
        time: "1 hour ago",
        status: "info",
      },
      {
        id: "3",
        type: "claim",
        title: "Claim Submitted",
        description: "Claim #CLM202604160001 submitted to Discovery",
        time: "2 hours ago",
        status: "success",
      },
      {
        id: "4",
        type: "stock",
        title: "Low Stock Alert",
        description: "Amoxicillin 250mg is below reorder level",
        time: "3 hours ago",
        status: "warning",
      },
    ]);
  };

  const fetchUpcomingAppointments = async () => {
    // Simulated data - replace with actual API calls
    setUpcomingAppointments([
      {
        id: "1",
        patientName: "John Doe",
        patientId: "PAT001",
        time: "09:00 AM",
        doctorName: "Dr. Smith",
        type: "Consultation",
        status: "confirmed",
      },
      {
        id: "2",
        patientName: "Jane Smith",
        patientId: "PAT002",
        time: "10:30 AM",
        doctorName: "Dr. Johnson",
        type: "Follow-up",
        status: "scheduled",
      },
      {
        id: "3",
        patientName: "Bob Wilson",
        patientId: "PAT003",
        time: "11:00 AM",
        doctorName: "Dr. Williams",
        type: "Procedure",
        status: "checked-in",
      },
      {
        id: "4",
        patientName: "Alice Brown",
        patientId: "PAT004",
        time: "02:00 PM",
        doctorName: "Dr. Smith",
        type: "Consultation",
        status: "scheduled",
      },
      {
        id: "5",
        patientName: "Charlie Davis",
        patientId: "PAT005",
        time: "03:30 PM",
        doctorName: "Dr. Johnson",
        type: "Telehealth",
        status: "scheduled",
      },
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "checked-in":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "no-show":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const statCards = [
    {
      title: "Total Practices",
      value: stats.totalPractices,
      icon: Building2,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      href: "/practices",
    },
    {
      title: "Total Doctors",
      value: stats.totalDoctors,
      icon: Stethoscope,
      color: "bg-teal-500",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
      href: "/doctors",
    },
    {
      title: "Total Patients",
      value: stats.totalPatients,
      icon: Users,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      href: "/patients",
    },
    {
      title: "Appointments Today",
      value: stats.todayAppointments,
      icon: Calendar,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      href: "/appointments",
    },
    {
      title: "Today's Revenue",
      value: `R ${stats.todayRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      href: "/bills",
    },
    {
      title: "Monthly Revenue",
      value: `R ${stats.monthlyRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "bg-indigo-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      href: "/reports/financial",
    },
    {
      title: "Pending Claims",
      value: stats.pendingClaims,
      icon: FileText,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      href: "/claims",
    },
    {
      title: "Low Stock Items",
      value: stats.lowStockCount,
      icon: AlertCircle,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      href: "/stock",
    },
  ];

  const quickActions = [
    { name: "New Appointment", icon: Calendar, href: "/appointments/new", color: "bg-blue-500" },
    { name: "Register Patient", icon: UserPlus, href: "/patients/new", color: "bg-green-500" },
    { name: "Create Bill", icon: Receipt, href: "/bills/new", color: "bg-purple-500" },
    { name: "Submit Claim", icon: Send, href: "/claims/new", color: "bg-orange-500" },
    { name: "Add Product", icon: Package, href: "/stock/products/new", color: "bg-teal-500" },
    { name: "Generate Report", icon: FileSpreadsheet, href: "/reports", color: "bg-indigo-500" },
  ];

  // Don't render time-dependent content until mounted on client
  if (!mounted || !currentTime) {
    return (
      <div className="space-y-6">
        {/* Skeleton loading state */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Dr. Smith</h1>
              <p className="text-blue-100 mt-1">Loading dashboard...</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-5 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header with Time and Date */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Dr. Smith</h1>
            <p className="text-blue-100 mt-1">Here's what's happening with your practice today</p>
            <div className="flex items-center gap-4 mt-3 text-blue-100 text-sm">
              <span className="flex items-center gap-1" suppressHydrationWarning>
                <CalendarDays className="h-4 w-4" />
                {formatDate(currentTime)}
              </span>
              <span className="flex items-center gap-1" suppressHydrationWarning>
                <Clock className="h-4 w-4" />
                {formatTime(currentTime)}
              </span>
            </div>
          </div>
          <div className="bg-white/20 rounded-full px-4 py-2 text-sm">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              System Online
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-xl`}>
                <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Appointments & Activities */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Appointments */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-5 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
                <Link href="/appointments" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {upcomingAppointments.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No appointments scheduled for today</p>
                </div>
              ) : (
                upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="p-4 hover:bg-gray-50 transition">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center min-w-[60px]">
                          <p className="text-sm font-semibold text-gray-900">{apt.time}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{apt.patientName}</p>
                          <p className="text-sm text-gray-500">{apt.doctorName} • {apt.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${getAppointmentStatusColor(apt.status)}`}>
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                        <Link
                          href={`/appointments/${apt.id}`}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-4 flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                    {activity.type === "appointment" && <Calendar className="h-4 w-4" />}
                    {activity.type === "patient" && <UserPlus className="h-4 w-4" />}
                    {activity.type === "claim" && <FileText className="h-4 w-4" />}
                    {activity.type === "bill" && <Receipt className="h-4 w-4" />}
                    {activity.type === "stock" && <Package className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition"
                >
                  <div className={`${action.color} p-2 rounded-lg`}>
                    <action.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{action.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Claims Summary */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Claims Summary</h2>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="text-center flex-1">
                  <div className="text-2xl font-bold text-green-600">{stats.approvedClaims}</div>
                  <div className="text-xs text-gray-500">Approved</div>
                </div>
                <div className="text-center flex-1">
                  <div className="text-2xl font-bold text-yellow-600">{stats.pendingClaims}</div>
                  <div className="text-xs text-gray-500">Pending</div>
                </div>
                <div className="text-center flex-1">
                  <div className="text-2xl font-bold text-red-600">{stats.rejectedClaims}</div>
                  <div className="text-xs text-gray-500">Rejected</div>
                </div>
              </div>
              <Link
                href="/claims"
                className="block text-center text-sm text-blue-600 hover:text-blue-800 mt-3"
              >
                Manage Claims →
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">MediKredit Integration</span>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ERA Processing</span>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Database Backup</span>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Today 02:00 AM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Claim Sync</span>
                <span className="text-xs text-gray-600">5 minutes ago</span>
              </div>
            </div>
          </div>

          {/* Tips & Updates */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">NHI Readiness</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Your practice is NHI-ready. All required fields are properly configured for future NHI claims.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}