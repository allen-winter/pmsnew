// src/app/(dashboard)/layout.tsx

"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Stethoscope,
  Users,
  Calendar,
  DollarSign,
  FileText,
  Package,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  User,
  HelpCircle,
  Menu,
  X,
  CreditCard,
  FileCheck,
  Send,
  Inbox,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Activity,
  Pill,
  Heart,
  Scissors,
  Ambulance,
  Baby,
  Briefcase,
  Shield,
  Award,
  Star,
  Wallet,
  Receipt,
  FileSpreadsheet,
  RefreshCw,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";

// Custom Truck icon
const Truck = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </svg>
);

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  subItems?: { name: string; href: string; icon?: React.ElementType }[];
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Practice Management",
    href: "/practices",
    icon: Building2,
    subItems: [
      { name: "Practices", href: "/practices", icon: Building2 },
      { name: "Locations", href: "/practices/locations", icon: MapPin },
      { name: "Contracts", href: "/practices/contracts", icon: FileCheck },
    ],
  },
  {
    name: "Clinical",
    href: "/doctors",
    icon: Stethoscope,
    subItems: [
      { name: "Doctors", href: "/doctors", icon: Stethoscope },
      { name: "Patients", href: "/patients", icon: Users },
      { name: "Appointments", href: "/appointments", icon: Calendar },
      { name: "EMR", href: "/emr", icon: Activity },
      { name: "Prescriptions", href: "/prescriptions", icon: Pill },
      { name: "Referrals", href: "/referrals", icon: Send },
    ],
  },
  {
    name: "Billing & Finance",
    href: "/bills",
    icon: DollarSign,
    subItems: [
      { name: "Bills", href: "/bills", icon: Receipt },
      { name: "Claims", href: "/claims", icon: FileText },
      { name: "Payments", href: "/payments", icon: CreditCard },
      { name: "ERA", href: "/era", icon: Inbox },
      { name: "Eligibility", href: "/eligibility", icon: CheckCircle },
    ],
  },
  {
    name: "Stock & Pharmacy",
    href: "/stock",
    icon: Package,
    subItems: [
      { name: "Products", href: "/stock/products", icon: Pill },
      { name: "Batches", href: "/stock/batches", icon: Package },
      { name: "Suppliers", href: "/stock/suppliers", icon: Truck },
      { name: "Purchase Orders", href: "/stock/purchase-orders", icon: FileText },
      { name: "Transfers", href: "/stock/transfers", icon: RefreshCw },
    ],
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
    subItems: [
      { name: "Financial Reports", href: "/reports/financial", icon: TrendingUp },
      { name: "Claims Reports", href: "/reports/claims", icon: FileText },
      { name: "Clinical Reports", href: "/reports/clinical", icon: Activity },
      { name: "ERA Reports", href: "/reports/era", icon: Inbox },
    ],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    subItems: [
      { name: "Practice Settings", href: "/settings/practice", icon: Building2 },
      { name: "Billing Settings", href: "/settings/billing", icon: DollarSign },
      { name: "User Management", href: "/settings/users", icon: User },
      { name: "Integrations", href: "/settings/integrations", icon: Settings },
    ],
  },
];

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type?: "info" | "success" | "warning" | "error";
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "New Claim Response", message: "Claim #CLM001 has been approved", time: "5 min ago", read: false, type: "success" },
    { id: 2, title: "Low Stock Alert", message: "Amoxicillin 250mg is below reorder level", time: "1 hour ago", read: false, type: "warning" },
    { id: 3, title: "ERA Received", message: "ERA file for March 2026 is ready", time: "2 hours ago", read: true, type: "info" },
    { id: 4, title: "New Patient Registered", message: "Jane Smith registered as a new patient", time: "3 hours ago", read: true, type: "success" },
  ]);
  const [mounted, setMounted] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSubmenu = (href: string) => {
    setOpenSubmenus(prev =>
      prev.includes(href) ? prev.filter(h => h !== href) : [...prev, href]
    );
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleGlobalSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && globalSearch.trim()) {
      router.push(`/search?q=${encodeURIComponent(globalSearch)}`);
      setShowSearchResults(false);
    }
  };

  const handleSearchChange = async (value: string) => {
    setGlobalSearch(value);
    if (value.trim().length > 2) {
      try {
        const [patientsRes, practicesRes, doctorsRes] = await Promise.all([
          fetch(`/api/patients/search?q=${encodeURIComponent(value)}`).catch(() => ({ ok: false, json: () => [] })),
          fetch(`/api/practices/search?q=${encodeURIComponent(value)}`).catch(() => ({ ok: false, json: () => [] })),
          fetch(`/api/doctors/search?q=${encodeURIComponent(value)}`).catch(() => ({ ok: false, json: () => [] })),
        ]);
        
        const patients = patientsRes.ok ? await patientsRes.json() : [];
        const practices = practicesRes.ok ? await practicesRes.json() : [];
        const doctors = doctorsRes.ok ? await doctorsRes.json() : [];
        
        setSearchResults([...patients, ...practices, ...doctors]);
        setShowSearchResults(true);
      } catch (error) {
        console.error("Search error:", error);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const getNotificationIcon = (type?: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  if (!mounted) {
    return (
      <div className="flex h-screen bg-gray-100">
        <div className="w-72 bg-white shadow-lg"></div>
        <div className="flex-1 flex flex-col">
          <div className="bg-white shadow-sm px-6 py-3 h-14"></div>
          <div className="flex-1 p-6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg flex flex-col transition-all duration-300 z-20 ${
          sidebarCollapsed ? "w-20" : "w-72"
        }`}
      >
        {/* Logo */}
        <div className={`p-4 border-b flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"}`}>
          {!sidebarCollapsed && (
            <Link href="/" className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PMS System
              </h1>
              <p className="text-xs text-gray-500">Medical Billing Software</p>
            </Link>
          )}
          {sidebarCollapsed && (
            <Link href="/" className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 transition"
          >
            {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.href)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                        isActive(item.href)
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        {!sidebarCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                      </div>
                      {!sidebarCollapsed && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openSubmenus.includes(item.href) ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                    {!sidebarCollapsed && openSubmenus.includes(item.href) && (
                      <ul className="ml-9 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                                pathname === subItem.href
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              {subItem.icon && <subItem.icon className="h-4 w-4" />}
                              <span>{subItem.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {!sidebarCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="border-t p-3">
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">Dr. John Smith</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              )}
              {!sidebarCollapsed && <ChevronDown className="h-4 w-4 text-gray-400" />}
            </button>
            
            {showUserMenu && (
              <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                <div className="p-3 border-b">
                  <p className="font-medium text-gray-900">Dr. John Smith</p>
                  <p className="text-xs text-gray-500">john.smith@example.com</p>
                </div>
                <div className="py-2">
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={() => router.push("/login")}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <button className="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            
            {/* Global Search */}
            <div className="relative flex-1 max-w-md" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients, doctors, practices..."
                value={globalSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleGlobalSearch}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <Link
                      key={index}
                      href={result.href || "#"}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 border-b last:border-0"
                      onClick={() => setShowSearchResults(false)}
                    >
                      {result.type === "patient" && <Users className="h-4 w-4 text-blue-500" />}
                      {result.type === "doctor" && <Stethoscope className="h-4 w-4 text-teal-500" />}
                      {result.type === "practice" && <Building2 className="h-4 w-4 text-purple-500" />}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{result.name}</p>
                        <p className="text-xs text-gray-500">{result.details}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-100 relative"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-3 border-b flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No notifications</p>
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${!n.read ? "bg-blue-50" : ""}`}
                          onClick={() => markNotificationAsRead(n.id)}
                        >
                          <div className="flex items-start gap-2">
                            {getNotificationIcon(n.type)}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{n.title}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                            </div>
                            {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <HelpCircle className="h-5 w-5 text-gray-600" />
            </button>
            
            <button
              onClick={() => router.push("/login")}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}