"use client";

import { useEffect, useState } from "react";

interface Career {
  _id: string;
  title: string;
  department?: string;
  location?: string;
  employmentType?: string;
  deadline?: string;
}

interface Application {
  _id: string;
  applicantName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  resumeUrl?: string;
  status: string;
  createdAt: string;
  career: Career | null;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/applications", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setApplications(data.applications || []);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((application) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      application.applicantName?.toLowerCase().includes(searchText) ||
      application.email?.toLowerCase().includes(searchText) ||
      application.phone?.toLowerCase().includes(searchText) ||
      application.career?.title?.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Shortlisted":
        return "bg-green-100 text-green-700";

      case "Reviewed":
        return "bg-blue-100 text-blue-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Applications</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage job applications submitted by candidates
          </p>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Applications</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {applications.length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Pending</p>
          <h2 className="mt-2 text-2xl font-bold text-yellow-600">
            {applications.filter((app) => app.status === "Pending").length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Shortlisted</p>
          <h2 className="mt-2 text-2xl font-bold text-green-600">
            {applications.filter((app) => app.status === "Shortlisted").length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Rejected</p>
          <h2 className="mt-2 text-2xl font-bold text-red-600">
            {applications.filter((app) => app.status === "Rejected").length}
          </h2>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="mb-6 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm md:flex-row text-gray-600">
        <input
          type="text"
          placeholder="Search applicant, email, phone or position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-600"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-600 text-gray-600"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* APPLICATION TABLE */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading applications...
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No applications found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                    Applicant
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                    Position
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                    Contact
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                    Applied
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredApplications.map((application) => (
                  <tr key={application._id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-800">
                        {application.applicantName}
                      </div>

                      <div className="text-sm text-gray-500">
                        {application.email}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-800">
                        {application.career?.title || "Unknown Position"}
                      </div>

                      <div className="text-sm text-gray-500">
                        {application.career?.department || ""}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {application.phone}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          application.status,
                        )}`}
                      >
                        {application.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DETAILS MODAL */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Application Details
                </h2>

                <p className="text-sm text-gray-500">
                  {selectedApplication.applicantName}
                </p>
              </div>

              <button
                onClick={() => setSelectedApplication(null)}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="space-y-6 p-6">
              <div>
                <h3 className="mb-3 font-semibold text-gray-800">
                  Applicant Information
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-medium text-gray-800">
                      {selectedApplication.applicantName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">
                      {selectedApplication.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium text-gray-800">
                      {selectedApplication.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-800">
                  Job Information
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-gray-500">Position</p>
                    <p className="font-medium text-gray-800">
                      {selectedApplication.career?.title || "Unknown Position"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Department</p>
                    <p className="font-medium text-gray-800">
                      {selectedApplication.career?.department || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-medium text-gray-800">
                      {selectedApplication.career?.location || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Employment Type</p>
                    <p className="font-medium text-gray-800">
                      {selectedApplication.career?.employmentType || "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-800">
                  Application Status
                </h3>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusClass(
                      selectedApplication.status,
                    )}`}
                  >
                    {selectedApplication.status}
                  </span>

                  <select
                    value={selectedApplication.status}
                    onChange={async (e) => {
                      const newStatus = e.target.value;

                      try {
                        const response = await fetch(
                          `/api/applications/${selectedApplication._id}`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            credentials: "include",
                            body: JSON.stringify({
                              status: newStatus,
                            }),
                          },
                        );

                        const data = await response.json();

                        if (!response.ok) {
                          alert(data.message || "Failed to update status");
                          return;
                        }

                        setSelectedApplication(data.application);

                        setApplications((prev) =>
                          prev.map((application) =>
                            application._id === data.application._id
                              ? data.application
                              : application,
                          ),
                        );
                      } catch (error) {
                        console.error("Status update error:", error);
                        alert("Failed to update application status");
                      }
                    }}
                    className="rounded-lg border border-gray-800 px-3 py-2 text-sm text-gray-600"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-800">
                  Cover Letter
                </h3>

                <div className="rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                  {selectedApplication.coverLetter ||
                    "No cover letter provided."}
                </div>
              </div>

              {selectedApplication.resumeUrl && (
                <div>
                  <h3 className="mb-3 font-semibold text-gray-800">Resume</h3>

                  <a
                    href={selectedApplication.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
                  >
                    View Resume
                  </a>
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}
            <div className="flex flex-wrap justify-between gap-3 border-t px-6 py-4">
              <button
                onClick={async () => {
                  const confirmed = window.confirm(
                    `Are you sure you want to delete the application from ${selectedApplication.applicantName}?`,
                  );

                  if (!confirmed) return;

                  try {
                    const response = await fetch(
                      `/api/applications/${selectedApplication._id}`,
                      {
                        method: "DELETE",
                        credentials: "include",
                      },
                    );

                    const data = await response.json();

                    if (!response.ok) {
                      alert(data.message || "Failed to delete application");
                      return;
                    }

                    setApplications((prev) =>
                      prev.filter((app) => app._id !== selectedApplication._id),
                    );

                    setSelectedApplication(null);
                  } catch (error) {
                    console.error("Delete application error:", error);
                    alert("Failed to delete application");
                  }
                }}
                className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete Application
              </button>

              <button
                onClick={() => setSelectedApplication(null)}
                className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
