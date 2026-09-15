"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Admin = {
  _id: string;
  name: string;
  email: string;
  role: "superadmin" | "companyadmin";
  status: boolean;
  createdAt?: string;
};

type AdminForm = {
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "companyadmin";
  status: boolean;
};

const emptyForm: AdminForm = {
  name: "",
  email: "",
  password: "",
  role: "companyadmin",
  status: true,
};

export default function AdminsPage() {
  const router = useRouter();

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [form, setForm] = useState<AdminForm>(emptyForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch admins");
      }

      setAdmins(data.admins || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch admins.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const openAddModal = () => {
    setEditingAdmin(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowModal(true);
  };

  const openEditModal = (admin: Admin) => {
    setEditingAdmin(admin);

    setForm({
      name: admin.name,
      email: admin.email,
      password: "",
      role: admin.role,
      status: admin.status,
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (!saving) {
      setShowModal(false);
      setEditingAdmin(null);
      setForm(emptyForm);
      setError("");
    }
  };

  const handleChange = (field: keyof AdminForm, value: string | boolean) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const url = editingAdmin
        ? `/api/admin/${editingAdmin._id}`
        : "/api/admin/register";

      const method = editingAdmin ? "PUT" : "POST";

      const body = editingAdmin
        ? {
            name: form.name,
            email: form.email,
            role: form.role,
            status: form.status,
          }
        : {
            name: form.name,
            email: form.email,
            password: form.password,
            role: form.role,
          };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Operation failed");
      }

      setSuccess(
        editingAdmin
          ? "Admin updated successfully."
          : "Admin created successfully.",
      );

      setShowModal(false);
      setEditingAdmin(null);
      setForm(emptyForm);

      await fetchAdmins();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const deleteAdmin = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this admin?",
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      const response = await fetch(`/api/admin/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete admin");
      }

      setSuccess("Admin deleted successfully.");
      await fetchAdmins();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to delete admin.");
    }
  };

  const toggleStatus = async (admin: Admin) => {
    try {
      setError("");
      setSuccess("");

      const response = await fetch(`/api/admin/${admin._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: admin.name,
          email: admin.email,
          role: admin.role,
          status: !admin.status,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setSuccess(
        `Admin ${!admin.status ? "activated" : "deactivated"} successfully.`,
      );

      await fetchAdmins();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to update status.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Management
            </h1>
            <p className="mt-1 text-gray-500">
              Manage all administrators of MayuraERP.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            + Add Admin
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
            {success}
          </div>
        )}

        {/* Statistics */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Admins</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              {admins.length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Active Admins</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {admins.filter((admin) => admin.status).length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Inactive Admins</p>
            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {admins.filter((admin) => !admin.status).length}
            </h2>
          </div>
        </div>

        {/* Admin Table */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              All Administrators
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading admins...
            </div>
          ) : admins.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No admins found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-sm text-gray-600">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {admins.map((admin) => (
                    <tr key={admin._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {admin.name}
                      </td>

                      <td className="px-6 py-4 text-gray-600">{admin.email}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            admin.role === "superadmin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {admin.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            admin.status
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {admin.status ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => openEditModal(admin)}
                            className="rounded-md bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => toggleStatus(admin)}
                            className={`rounded-md px-3 py-2 text-sm font-medium ${
                              admin.status
                                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                          >
                            {admin.status ? "Deactivate" : "Activate"}
                          </button>

                          <button
                            onClick={() => deleteAdmin(admin._id)}
                            className="rounded-md bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
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

        {/* Back Button */}
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="mt-6 rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-700 hover:bg-gray-50"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingAdmin ? "Edit Admin" : "Add New Admin"}
              </h2>

              <button
                onClick={closeModal}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Name
                </label>

                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  placeholder="Enter admin name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  placeholder="Enter admin email"
                />
              </div>

              {/* Password */}
              {!editingAdmin && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <input
                    type="password"
                    required
                    minLength={6}
                    value={form.password}
                    onChange={(event) =>
                      handleChange("password", event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="Enter password"
                  />
                </div>
              )}

              {/* Role */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Role
                </label>

                <select
                  value={form.role}
                  onChange={(event) =>
                    handleChange(
                      "role",
                      event.target.value as "superadmin" | "companyadmin",
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="companyadmin">Company Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>

              {/* Status */}
              {editingAdmin && (
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="status"
                    checked={form.status}
                    onChange={(event) =>
                      handleChange("status", event.target.checked)
                    }
                    className="h-4 w-4"
                  />

                  <label
                    htmlFor="status"
                    className="text-sm font-medium text-gray-700"
                  >
                    Active Account
                  </label>
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-lg border border-gray-300 px-5 py-3 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingAdmin
                      ? "Update Admin"
                      : "Create Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
