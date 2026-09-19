"use client";

import { useEffect, useState } from "react";

type Meeting = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  date: string;
  time: string;
  subject: string;
  message?: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
};

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  // Fetch meetings
  const fetchMeetings = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/meetings", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch meetings");
      }

      setMeetings(data.meetings || []);
    } catch (error) {
      console.error("Failed to fetch meetings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  // Update meeting status
  const updateStatus = async (id: string, status: Meeting["status"]) => {
    try {
      const response = await fetch(`/api/meetings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setMeetings((prev) =>
        prev.map((meeting) =>
          meeting._id === id
            ? { ...meeting, status: data.meeting.status }
            : meeting,
        ),
      );

      if (selectedMeeting?._id === id) {
        setSelectedMeeting(data.meeting);
      }
    } catch (error) {
      console.error("Update status error:", error);
      alert("Failed to update meeting status.");
    }
  };

  // Delete meeting
  const deleteMeeting = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this meeting?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/meetings/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete meeting");
      }

      setMeetings((prev) => prev.filter((meeting) => meeting._id !== id));

      if (selectedMeeting?._id === id) {
        setSelectedMeeting(null);
      }
    } catch (error) {
      console.error("Delete meeting error:", error);
      alert("Failed to delete meeting.");
    }
  };

  const totalMeetings = meetings.length;

  const pendingMeetings = meetings.filter(
    (meeting) => meeting.status === "Pending",
  ).length;

  const confirmedMeetings = meetings.filter(
    (meeting) => meeting.status === "Confirmed",
  ).length;

  const completedMeetings = meetings.filter(
    (meeting) => meeting.status === "Completed",
  ).length;

  const cancelledMeetings = meetings.filter(
    (meeting) => meeting.status === "Cancelled",
  ).length;

  const getStatusClass = (status: Meeting["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";

      case "Confirmed":
        return "bg-green-100 text-green-800";

      case "Completed":
        return "bg-blue-100 text-blue-800";

      case "Cancelled":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-600 text-lg">Loading meetings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>

        <p className="mt-2 text-gray-600">
          Manage meeting requests from your website.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-8">
        {/* Total */}
        <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Meetings</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {totalMeetings}
          </p>
        </div>

        {/* Pending */}
        <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Pending</p>

          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {pendingMeetings}
          </p>
        </div>

        {/* Confirmed */}
        <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Confirmed</p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {confirmedMeetings}
          </p>
        </div>

        {/* Completed */}
        <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Completed</p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {completedMeetings}
          </p>
        </div>

        {/* Cancelled */}
        <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Cancelled</p>

          <p className="mt-2 text-3xl font-bold text-red-600">
            {cancelledMeetings}
          </p>
        </div>
      </div>

      {/* Meetings Table */}
      <div className="rounded-xl bg-white shadow-sm border border-gray-200">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Meeting Requests
          </h2>
        </div>

        {meetings.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-500">No meeting requests found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Name
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Subject
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Date
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Time
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Email
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {meetings.map((meeting) => (
                  <tr key={meeting._id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">
                        {meeting.name}
                      </p>

                      {meeting.company && (
                        <p className="text-sm text-gray-500">
                          {meeting.company}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4 text-gray-700">
                      {meeting.subject}
                    </td>

                    <td className="px-5 py-4 text-gray-700">{meeting.date}</td>

                    <td className="px-5 py-4 text-gray-700">{meeting.time}</td>

                    <td className="px-5 py-4 text-gray-700">{meeting.email}</td>

                    <td className="px-5 py-4">
                      <select
                        value={meeting.status}
                        onChange={(e) =>
                          updateStatus(
                            meeting._id,
                            e.target.value as Meeting["status"],
                          )
                        }
                        className={`rounded-full px-3 py-1.5 text-sm font-medium border-0 outline-none cursor-pointer ${getStatusClass(
                          meeting.status,
                        )}`}
                      >
                        <option value="Pending">Pending</option>

                        <option value="Confirmed">Confirmed</option>

                        <option value="Completed">Completed</option>

                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedMeeting(meeting)}
                          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                          View
                        </button>

                        <button
                          onClick={() => deleteMeeting(meeting._id)}
                          className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Meeting Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-5">
              <h2 className="text-xl font-bold text-gray-900">
                Meeting Details
              </h2>

              <button
                onClick={() => setSelectedMeeting(null)}
                className="text-2xl text-gray-500 hover:text-gray-900"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-5 p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>

                <p className="mt-1 text-gray-900">{selectedMeeting.name}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>

                <p className="mt-1 text-gray-900">{selectedMeeting.email}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>

                <p className="mt-1 text-gray-900">
                  {selectedMeeting.phone || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Company</p>

                <p className="mt-1 text-gray-900">
                  {selectedMeeting.company || "Not provided"}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Meeting Date
                  </p>

                  <p className="mt-1 text-gray-900">{selectedMeeting.date}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Meeting Time
                  </p>

                  <p className="mt-1 text-gray-900">{selectedMeeting.time}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Subject</p>

                <p className="mt-1 text-gray-900">{selectedMeeting.subject}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Message</p>

                <p className="mt-1 whitespace-pre-wrap text-gray-900">
                  {selectedMeeting.message || "No message provided"}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>

                <div className="mt-2">
                  <select
                    value={selectedMeeting.status}
                    onChange={(e) =>
                      updateStatus(
                        selectedMeeting._id,
                        e.target.value as Meeting["status"],
                      )
                    }
                    className={`rounded-full px-3 py-1.5 text-sm font-medium border-0 outline-none cursor-pointer ${getStatusClass(
                      selectedMeeting.status,
                    )}`}
                  >
                    <option value="Pending">Pending</option>

                    <option value="Confirmed">Confirmed</option>

                    <option value="Completed">Completed</option>

                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setSelectedMeeting(null)}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
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
