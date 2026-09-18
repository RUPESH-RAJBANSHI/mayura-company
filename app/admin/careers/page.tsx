"use client";

import { useEffect, useState } from "react";

type Career = {
  _id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  salary: string;
  requirements: string;
  description: string;
  deadline: string;
  status: boolean;
};

const emptyForm = {
  title: "",
  department: "",
  location: "",
  employmentType: "Full-time",
  salary: "",
  requirements: "",
  description: "",
  deadline: "",
  status: true,
};

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch careers
  const fetchCareers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/careers", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch careers");
      }

      setCareers(data.careers || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch careers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  // Handle input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Open add modal
  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
    setError("");
    setShowModal(true);
  };

  // Open edit modal
  const openEditModal = (career: Career) => {
    setEditingId(career._id);

    setForm({
      title: career.title || "",
      department: career.department || "",
      location: career.location || "",
      employmentType: career.employmentType || "Full-time",
      salary: career.salary || "",
      requirements: career.requirements || "",
      description: career.description || "",
      deadline: career.deadline
        ? new Date(career.deadline).toISOString().split("T")[0]
        : "",
      status: career.status,
    });

    setMessage("");
    setError("");
    setShowModal(true);
  };

  // Save career
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const url = editingId ? `/api/careers/${editingId}` : "/api/careers";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage(
        editingId
          ? "Vacancy updated successfully!"
          : "Vacancy added successfully!",
      );

      setShowModal(false);
      setForm(emptyForm);
      setEditingId(null);

      await fetchCareers();
    } catch (err: any) {
      setError(err.message || "Failed to save vacancy");
    } finally {
      setSaving(false);
    }
  };

  // Delete career
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vacancy?",
    );

    if (!confirmDelete) return;

    try {
      setError("");

      const response = await fetch(`/api/careers/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete vacancy");
      }

      setMessage("Vacancy deleted successfully!");
      await fetchCareers();
    } catch (err: any) {
      setError(err.message || "Failed to delete vacancy");
    }
  };

  // Toggle status
  const toggleStatus = async (career: Career) => {
    try {
      const response = await fetch(`/api/careers/${career._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...career,
          status: !career.status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      await fetchCareers();
    } catch (err: any) {
      setError(err.message || "Failed to update status");
    }
  };

  const activeVacancies = careers.filter((career) => career.status).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-black sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Career Management
          </h1>

          <p className="mt-1 text-gray-600">
            Manage your company's job vacancies.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          + Add Vacancy
        </button>
      </div>

      {/* Messages */}
      {message && (
        <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Vacancies</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {careers.length}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm font-medium text-gray-500">Active Vacancies</p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {activeVacancies}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm font-medium text-gray-500">
            Inactive Vacancies
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-500">
            {careers.length - activeVacancies}
          </p>
        </div>
      </div>

      {/* Career List */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-bold text-gray-900">Job Vacancies</h2>
        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading vacancies...
          </div>
        ) : careers.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-lg font-semibold text-gray-700">
              No vacancies found
            </p>

            <p className="mt-1 text-gray-500">
              Click "Add Vacancy" to create your first job vacancy.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Job Title
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Department
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Location
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Type
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Deadline
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {careers.map((career) => (
                  <tr key={career._id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-900">
                        {career.title}
                      </p>

                      {career.salary && (
                        <p className="mt-1 text-sm text-gray-500">
                          {career.salary}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4 text-gray-700">
                      {career.department}
                    </td>

                    <td className="px-5 py-4 text-gray-700">
                      {career.location}
                    </td>

                    <td className="px-5 py-4 text-gray-700">
                      {career.employmentType}
                    </td>

                    <td className="px-5 py-4 text-gray-700">
                      {career.deadline
                        ? new Date(career.deadline).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleStatus(career)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          career.status
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {career.status ? "Active" : "Inactive"}
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(career)}
                          className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(career._id)}
                          className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
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

      {/* Add/Edit Vacancy Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingId ? "Edit Vacancy" : "Add Vacancy"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {editingId
                    ? "Update the vacancy information."
                    : "Create a new job vacancy."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-2xl leading-none text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                ×
              </button>
            </div>

            {/* Scrollable Form */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto px-6 py-6 text-black"
            >
              <div className="space-y-5">
                {/* Job Title - FIRST TEXTBOX */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    Job Title <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter job title"
                    required
                    autoFocus
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    Department <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="e.g. Software Development"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    Location <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Biratnagar, Nepal"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Employment Type + Salary */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                      Employment Type
                    </label>

                    <select
                      name="employmentType"
                      value={form.employmentType}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                      Salary
                    </label>

                    <input
                      type="text"
                      name="salary"
                      value={form.salary}
                      onChange={handleChange}
                      placeholder="e.g. Negotiable"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>

                {/* Deadline */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    Application Deadline <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Requirements */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    Requirements <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    name="requirements"
                    value={form.requirements}
                    onChange={handleChange}
                    placeholder="Enter job requirements..."
                    required
                    rows={5}
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    Job Description <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the job role..."
                    required
                    rows={6}
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Status */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      name="status"
                      checked={form.status}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />

                    <div>
                      <p className="font-semibold text-gray-900">
                        Active Vacancy
                      </p>

                      <p className="text-sm text-gray-500">
                        Show this vacancy as active.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="mt-7 flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update Vacancy"
                      : "Add Vacancy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
