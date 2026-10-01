"use client";

import { useEffect, useState } from "react";

type Admin = {
  _id: string;
  name: string;
  email: string;
  role: "superadmin" | "companyadmin";
  status: boolean;
};
type Stats = {
  totalAdmins: number;
  activeAdmins: number;
  totalProducts: number;
  totalQueries: number;
  totalMeetings: number;
  totalPartnerships: number;
  totalApplications: number;
};
type Query = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "New" | "Read" | "Replied";
  createdAt: string;
};
type Application = {
  _id: string;
  applicantName: string;
  email: string;
  phone: string;
  status: "Pending" | "Reviewed" | "Shortlisted" | "Rejected";
  createdAt: string;
  career?: {
    title: string;
  };
};

type Meeting = {
  _id: string;
  name: string;
  email: string;
  company: string;
  date: string;
  time: string;
  subject: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
};

export default function AdminDashboard() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [queries, setQueries] = useState<Query[]>([]);
  const [queriesLoading, setQueriesLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [meetingsLoading, setMeetingsLoading] = useState(true);

  useEffect(() => {
    fetchAdmins();
    fetchStats();
    fetchQueries();
    fetchApplications();
    fetchMeetings();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await fetch("/api/admin", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      if (data.success) {
        setAdmins(data.admins);
      }
    } catch (error) {
      console.error("Failed to fetch admins:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const response = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/admin/login";
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoggingOut(false);
    }
  };
  const fetchQueries = async () => {
    try {
      setQueriesLoading(true);

      const response = await fetch("/api/queries", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      const data = await response.json();

      if (data.success) {
        setQueries(data.queries.slice(0, 5));
      }
    } catch (error) {
      console.error("Failed to fetch queries:", error);
    } finally {
      setQueriesLoading(false);
    }
  };
  const fetchApplications = async () => {
    try {
      setApplicationsLoading(true);

      const response = await fetch("/api/admin/stats", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      const data = await response.json();

      if (data.success) {
        setApplications(data.recentApplications || []);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setApplicationsLoading(false);
    }
  };
  const fetchMeetings = async () => {
    try {
      setMeetingsLoading(true);

      const response = await fetch("/api/admin/stats", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      const data = await response.json();

      if (data.success) {
        setMeetings(data.recentMeetings || []);
      }
    } catch (error) {
      console.error("Failed to fetch meetings:", error);
    } finally {
      setMeetingsLoading(false);
    }
  };

  const activeAdmins = admins.filter((admin) => admin.status).length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900 text-white">
        <div className="flex h-16 items-center border-b border-slate-700 px-6">
          <h1 className="text-xl font-bold">
            IT<span className="text-blue-400">Company</span>
          </h1>
        </div>

        <nav className="p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase text-slate-400">
            Main Menu
          </p>

          <a
            href="/admin/dashboard"
            className="mb-2 flex items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium"
          >
            <span>▣</span>
            Dashboard
          </a>

          <a
            href="/admin/admins"
            className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800"
          >
            <span>👥</span>
            Admins
          </a>

          <a
            href="/admin/products"
            className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800"
          >
            <span>▦</span>
            Products
          </a>

          <a
            href="/admin/careers"
            className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800"
          >
            <span>💼</span>
            Careers
          </a>

          <a
            href="/admin/queries"
            className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800"
          >
            <span>💬</span>
            Queries
          </a>

          <a
            href="/admin/meetings"
            className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800"
          >
            <span>📅</span>
            Meetings
          </a>
          <a
            href="/admin/partnership"
            className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800"
          >
            <span>🤝</span>
            Partnership
          </a>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full border-t border-slate-700 p-4">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-red-600 hover:text-white disabled:opacity-50"
          >
            <span>↪</span>
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
            <p className="text-xs text-gray-500">Manage your company system</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
              A
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back 👋
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Here's what's happening in your admin panel.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Admins */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Admins</p>

                  <h3 className="mt-2 text-3xl font-bold text-gray-900">
                    {loading ? "..." : admins.length}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-xl">
                  👥
                </div>
              </div>
            </div>

            {/* Active Admins */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Admins</p>

                  <h3 className="mt-2 text-3xl font-bold text-gray-900">
                    {loading ? "..." : activeAdmins}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-xl">
                  ✓
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Products</p>
                  <h3 className="mt-2 text-3xl font-bold text-gray-900">
                    {statsLoading ? "..." : stats?.totalProducts || 0}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-xl">
                  ▦
                </div>
              </div>
            </div>

            {/* Queries */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Queries</p>
                  <h3 className="mt-2 text-3xl font-bold text-gray-900">
                    {statsLoading ? "..." : stats?.totalQueries || 0}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-xl">
                  💬
                </div>
              </div>
            </div>
            {/* Meetings */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Meetings</p>
                  <h3 className="mt-2 text-3xl font-bold text-gray-900">
                    {statsLoading ? "..." : (stats?.totalMeetings ?? 0)}
                  </h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-xl">
                  📅
                </div>
              </div>
            </div>

            {/* Partnerships */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Partnerships</p>
                  <h3 className="mt-2 text-3xl font-bold text-gray-900">
                    {statsLoading ? "..." : (stats?.totalPartnerships ?? 0)}
                  </h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-xl">
                  🤝
                </div>
              </div>
            </div>
            {/* Applications */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Applications</p>
                  <h3 className="mt-2 text-3xl font-bold text-gray-900">
                    {statsLoading ? "..." : (stats?.totalApplications ?? 0)}
                  </h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-xl">
                  📄
                </div>
              </div>
            </div>
          </div>

          {/* Admin Table */}
          <div className="mt-8 rounded-xl border bg-white shadow-sm">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="font-semibold text-gray-900">Recent Admins</h2>

                <p className="mt-1 text-xs text-gray-500">
                  Manage administrators
                </p>
              </div>

              <a
                href="/admin/admins"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Manage Admins
              </a>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-8 text-center text-sm text-gray-500">
                  Loading admins...
                </div>
              ) : admins.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-500">
                  No admins found.
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {admins.slice(0, 5).map((admin) => (
                      <tr key={admin._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {admin.name}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {admin.email}
                        </td>

                        <td className="px-6 py-4">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                            {admin.role}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          {admin.status ? (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                              Active
                            </span>
                          ) : (
                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                              Inactive
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Recent Queries */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Recent Queries
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Latest messages from visitors
                </p>
              </div>

              <a
                href="/admin/queries"
                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                View All →
              </a>
            </div>

            {queriesLoading ? (
              <p className="text-gray-500 text-sm">Loading queries...</p>
            ) : queries.length === 0 ? (
              <p className="text-gray-500 text-sm">No queries found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200 text-sm text-gray-500">
                      <th className="py-3 pr-4">Name</th>
                      <th className="py-3 pr-4">Email</th>
                      <th className="py-3 pr-4">Subject</th>
                      <th className="py-3 pr-4">Status</th>
                      <th className="py-3">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {queries.map((query) => (
                      <tr
                        key={query._id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 pr-4 font-medium text-gray-800">
                          {query.name}
                        </td>

                        <td className="py-4 pr-4 text-sm text-gray-600">
                          {query.email}
                        </td>

                        <td className="py-4 pr-4 text-sm text-gray-700">
                          {query.subject}
                        </td>

                        <td className="py-4 pr-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              query.status === "New"
                                ? "bg-blue-100 text-blue-700"
                                : query.status === "Read"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                            }`}
                          >
                            {query.status}
                          </span>
                        </td>

                        <td className="py-4 text-sm text-gray-600 whitespace-nowrap">
                          {new Date(query.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Meetings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Meetings
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Latest meeting requests from visitors
                </p>
              </div>

              <a
                href="/admin/meetings"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View All →
              </a>
            </div>

            {meetingsLoading ? (
              <div className="py-8 text-center text-gray-500">
                Loading meetings...
              </div>
            ) : meetings.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No meetings found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 text-left">
                      <th className="pb-3 text-sm font-medium text-gray-500">
                        Name
                      </th>
                      <th className="pb-3 text-sm font-medium text-gray-500">
                        Subject
                      </th>
                      <th className="pb-3 text-sm font-medium text-gray-500">
                        Date
                      </th>
                      <th className="pb-3 text-sm font-medium text-gray-500">
                        Time
                      </th>
                      <th className="pb-3 text-sm font-medium text-gray-500">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {meetings.map((meeting) => (
                      <tr
                        key={meeting._id}
                        className="border-b border-gray-100 last:border-0"
                      >
                        <td className="py-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {meeting.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {meeting.email}
                            </p>
                          </div>
                        </td>

                        <td className="py-4 text-sm text-gray-700">
                          {meeting.subject}
                        </td>

                        <td className="py-4 text-sm text-gray-700">
                          {meeting.date}
                        </td>

                        <td className="py-4 text-sm text-gray-700">
                          {meeting.time}
                        </td>

                        <td className="py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              meeting.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : meeting.status === "Confirmed"
                                  ? "bg-blue-100 text-blue-700"
                                  : meeting.status === "Completed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                          >
                            {meeting.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Applications */}
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Recent Applications
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Latest job applications from candidates
                </p>
              </div>

              <a
                href="/admin/applications"
                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                View All →
              </a>
            </div>

            {applicationsLoading ? (
              <p className="text-sm text-gray-500">Loading applications...</p>
            ) : applications.length === 0 ? (
              <p className="text-sm text-gray-500">No applications found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200 text-sm text-gray-500">
                      <th className="py-3 pr-4">Applicant</th>
                      <th className="py-3 pr-4">Position</th>
                      <th className="py-3 pr-4">Email</th>
                      <th className="py-3 pr-4">Status</th>
                      <th className="py-3">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {applications.map((application) => (
                      <tr
                        key={application._id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 pr-4 font-medium text-gray-800">
                          {application.applicantName}
                        </td>

                        <td className="py-4 pr-4 text-sm text-gray-700">
                          {application.career?.title || "Unknown Position"}
                        </td>

                        <td className="py-4 pr-4 text-sm text-gray-600">
                          {application.email}
                        </td>

                        <td className="py-4 pr-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              application.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : application.status === "Reviewed"
                                  ? "bg-blue-100 text-blue-700"
                                  : application.status === "Shortlisted"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                          >
                            {application.status}
                          </span>
                        </td>

                        <td className="whitespace-nowrap py-4 text-sm text-gray-600">
                          {new Date(application.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <a
                href="/admin/admins"
                className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-3 text-2xl">👥</div>
                <h3 className="font-semibold text-gray-500">Manage Admins</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Add, update and remove admins
                </p>
              </a>

              <a
                href="/admin/products"
                className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-3 text-2xl">📦</div>
                <h3 className="font-semibold text-gray-500">Add Product</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Add your company software
                </p>
              </a>

              <a
                href="/admin/careers"
                className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-3 text-2xl">💼</div>
                <h3 className="font-semibold text-gray-500">Create Job</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Publish a new vacancy
                </p>
              </a>

              <a
                href="/admin/meetings"
                className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-3 text-2xl">📅</div>
                <h3 className="font-semibold text-gray-500">Meetings</h3>
                <p className="mt-1 text-xs text-gray-500">
                  View meeting requests
                </p>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
