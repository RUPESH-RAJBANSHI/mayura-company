"use client";

import { useEffect, useState } from "react";

interface Partnership {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  partnershipType: string;
  subject: string;
  message: string;
  status: "New" | "Contacted" | "In Progress" | "Completed" | "Rejected";
  createdAt: string;
}

const statuses = [
  "New",
  "Contacted",
  "In Progress",
  "Completed",
  "Rejected",
] as const;

export default function PartnershipAdminPage() {
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [selectedPartnership, setSelectedPartnership] =
    useState<Partnership | null>(null);

  const fetchPartnerships = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/partnership", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch partnerships");
      }

      setPartnerships(data.partnerships || []);
    } catch (error) {
      console.error("Fetch partnerships error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch partnerships",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerships();
  }, []);

  const updateStatus = async (
    id: string,
    status: Partnership["status"],
  ) => {
    try {
      setUpdatingId(id);
      setError("");

      const response = await fetch("/api/partnership", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setPartnerships((current) =>
        current.map((partnership) =>
          partnership._id === id
            ? {
                ...partnership,
                status: data.partnership.status,
              }
            : partnership,
        ),
      );

      if (selectedPartnership?._id === id) {
        setSelectedPartnership((current) =>
          current
            ? {
                ...current,
                status: data.partnership.status,
              }
            : null,
        );
      }
    } catch (error) {
      console.error("Update status error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update partnership status",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusClass = (status: Partnership["status"]) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700";

      case "Contacted":
        return "bg-yellow-100 text-yellow-700";

      case "In Progress":
        return "bg-purple-100 text-purple-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex items-center justify-between px-6 py-5 md:px-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Partnership Inquiries
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage partnership and collaboration requests
            </p>
          </div>

          <button
            onClick={fetchPartnerships}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="p-6 md:p-10">
        {/* Stats */}
        <div className="mb-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total</p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {partnerships.length}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">New</p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {partnerships.filter(
                (item) => item.status === "New",
              ).length}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">In Progress</p>

            <p className="mt-2 text-3xl font-bold text-purple-600">
              {partnerships.filter(
                (item) => item.status === "In Progress",
              ).length}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Completed</p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {partnerships.filter(
                (item) => item.status === "Completed",
              ).length}
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <span>{error}</span>

            <button
              onClick={() => setError("")}
              className="ml-4 font-semibold hover:text-red-900"
            >
              ✕
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">
              Loading partnership inquiries...
            </p>
          </div>
        ) : partnerships.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              No partnership inquiries
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Partnership requests submitted from the website will
              appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px] text-left">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Name
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Contact
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Company
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Partnership Type
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Subject
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Date
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {partnerships.map((partnership) => (
                    <tr
                      key={partnership._id}
                      className="transition hover:bg-gray-50"
                    >
                      {/* Name */}
                      <td className="px-6 py-5">
                        <p className="font-semibold text-gray-900">
                          {partnership.name}
                        </p>

                        {partnership.phone && (
                          <p className="mt-1 text-sm text-gray-500">
                            {partnership.phone}
                          </p>
                        )}
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-5">
                        <p className="text-sm text-gray-700">
                          {partnership.email}
                        </p>
                      </td>

                      {/* Company */}
                      <td className="px-6 py-5 text-sm text-gray-700">
                        {partnership.company || "—"}
                      </td>

                      {/* Partnership Type */}
                      <td className="px-6 py-5">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          {partnership.partnershipType}
                        </span>
                      </td>

                      {/* Subject */}
                      <td className="max-w-xs px-6 py-5">
                        <p className="truncate text-sm text-gray-700">
                          {partnership.subject}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <select
                          value={partnership.status}
                          disabled={updatingId === partnership._id}
                          onChange={(event) =>
                            updateStatus(
                              partnership._id,
                              event.target.value as Partnership["status"],
                            )
                          }
                          className={`rounded-lg border-0 px-3 py-2 text-xs font-semibold outline-none ring-1 ring-inset ring-gray-200 ${getStatusClass(
                            partnership.status,
                          )}`}
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>

                        {updatingId === partnership._id && (
                          <p className="mt-1 text-xs text-gray-500">
                            Updating...
                          </p>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-sm text-gray-500">
                        {new Date(
                          partnership.createdAt,
                        ).toLocaleDateString()}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-5">
                        <button
                          onClick={() =>
                            setSelectedPartnership(partnership)
                          }
                          className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Details Modal */}
      {selectedPartnership && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Partnership Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Full inquiry information
                </p>
              </div>

              <button
                onClick={() => setSelectedPartnership(null)}
                className="rounded-lg px-3 py-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-6 p-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-400">
                    Name
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {selectedPartnership.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-gray-400">
                    Email
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {selectedPartnership.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-gray-400">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {selectedPartnership.phone || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-gray-400">
                    Company
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {selectedPartnership.company || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-gray-400">
                    Partnership Type
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {selectedPartnership.partnershipType}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-gray-400">
                    Status
                  </p>

                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      selectedPartnership.status,
                    )}`}
                  >
                    {selectedPartnership.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Subject
                </p>

                <p className="mt-2 text-sm font-medium text-gray-900">
                  {selectedPartnership.subject}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Message
                </p>

                <div className="mt-2 rounded-lg bg-gray-50 p-4">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
                    {selectedPartnership.message}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Submitted
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {new Date(
                    selectedPartnership.createdAt,
                  ).toLocaleString()}
                </p>
              </div>

              {/* Modal Status Update */}
              <div className="border-t pt-5">
                <label className="text-sm font-semibold text-gray-700">
                  Update Status
                </label>

                <select
                  value={selectedPartnership.status}
                  disabled={updatingId === selectedPartnership._id}
                  onChange={(event) =>
                    updateStatus(
                      selectedPartnership._id,
                      event.target.value as Partnership["status"],
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t bg-gray-50 px-6 py-4">
              <button
                onClick={() => setSelectedPartnership(null)}
                className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
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