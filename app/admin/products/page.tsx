"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  technologies: string;
  productUrl: string;
  status: boolean;
  createdAt?: string;
};

type ProductForm = {
  name: string;
  description: string;
  category: string;
  technologies: string;
  productUrl: string;
  status: boolean;
};

const emptyForm: ProductForm = {
  name: "",
  description: "",
  category: "",
  technologies: "",
  productUrl: "",
  status: true,
};

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [form, setForm] = useState<ProductForm>(emptyForm);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // FETCH PRODUCTS
  // =========================
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/products", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch products.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // OPEN ADD MODAL
  // =========================
  const openAddModal = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowModal(true);
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================
  const openEditModal = (product: Product) => {
    setEditingProduct(product);

    setForm({
      name: product.name,
      description: product.description,
      category: product.category,
      technologies: product.technologies,
      productUrl: product.productUrl,
      status: product.status,
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  };

  // =========================
  // CLOSE MODAL
  // =========================
  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingProduct(null);
    setForm(emptyForm);
    setError("");
  };

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (field: keyof ProductForm, value: string | boolean) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // =========================
  // ADD / UPDATE PRODUCT
  // =========================
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : "/api/products";

      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
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
        editingProduct
          ? "Product updated successfully."
          : "Product created successfully.",
      );

      setShowModal(false);
      setEditingProduct(null);
      setForm(emptyForm);

      await fetchProducts();
    } catch (err) {
      console.error(err);

      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const deleteProduct = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      setSuccess("Product deleted successfully.");

      await fetchProducts();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error ? err.message : "Failed to delete product.",
      );
    }
  };

  // =========================
  // TOGGLE STATUS
  // =========================
  const toggleStatus = async (product: Product) => {
    try {
      setError("");
      setSuccess("");

      const response = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          category: product.category,
          technologies: product.technologies,
          productUrl: product.productUrl,
          status: !product.status,
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
        `Product ${
          !product.status ? "activated" : "deactivated"
        } successfully.`,
      );

      await fetchProducts();
    } catch (err) {
      console.error(err);

      setError(err instanceof Error ? err.message : "Failed to update status.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Product Management
            </h1>

            <p className="mt-1 text-gray-500">
              Manage software products developed by MayuraERP.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            + Add Product
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
            {success}
          </div>
        )}

        {/* STATISTICS */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Products</p>

            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              {products.length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Active Products</p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {products.filter((product) => product.status).length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Inactive Products</p>

            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {products.filter((product) => !product.status).length}
            </h2>
          </div>
        </div>

        {/* PRODUCT TABLE */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              All Products
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No products found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-sm text-gray-600">
                  <tr>
                    <th className="px-6 py-4">Product</th>

                    <th className="px-6 py-4">Category</th>

                    <th className="px-6 py-4">Technologies</th>

                    <th className="px-6 py-4">Status</th>

                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {product.name}
                          </p>

                          <p className="mt-1 max-w-md text-sm text-gray-500">
                            {product.description}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {product.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {product.technologies}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            product.status
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.status ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="rounded-md bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => toggleStatus(product)}
                            className={`rounded-md px-3 py-2 text-sm font-medium ${
                              product.status
                                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                          >
                            {product.status ? "Deactivate" : "Activate"}
                          </button>

                          <button
                            onClick={() => deleteProduct(product._id)}
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

        {/* BACK BUTTON */}
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="mt-6 rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-700 hover:bg-gray-50"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
            {/* MODAL HEADER */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>

              <button
                onClick={closeModal}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                ×
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* NAME */}
              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Product Name
                </label>

                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 text-black"
                  placeholder="Example: Mayura School Management System"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Description
                </label>

                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(event) =>
                    handleChange("description", event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 text-black"
                  placeholder="Describe your product..."
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Category
                </label>

                <select
                  required
                  value={form.category}
                  onChange={(event) =>
                    handleChange("category", event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 text-black"
                >
                  <option value="">Select category</option>

                  <option value="ERP">ERP</option>

                  <option value="School Management">School Management</option>

                  <option value="Business Management">
                    Business Management
                  </option>

                  <option value="E-commerce">E-commerce</option>

                  <option value="Website">Website</option>

                  <option value="Mobile App">Mobile App</option>

                  <option value="Other">Other</option>
                </select>
              </div>

              {/* TECHNOLOGIES */}
              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Technologies
                </label>

                <input
                  type="text"
                  required
                  value={form.technologies}
                  onChange={(event) =>
                    handleChange("technologies", event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 text-black"
                  placeholder="Example: Next.js, Node.js, MongoDB"
                />
              </div>

              {/* PRODUCT URL */}
              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Product URL
                </label>

                <input
                  type="url"
                  value={form.productUrl}
                  onChange={(event) =>
                    handleChange("productUrl", event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 text-black"
                  placeholder="https://example.com"
                />
              </div>

              {/* STATUS */}
              {editingProduct && (
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="product-status"
                    checked={form.status}
                    onChange={(event) =>
                      handleChange("status", event.target.checked)
                    }
                    className="h-4 w-4"
                  />

                  <label
                    htmlFor="product-status"
                    className="text-sm font-medium text-gray-700"
                  >
                    Active Product
                  </label>
                </div>
              )}

              {/* BUTTONS */}
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
                    : editingProduct
                      ? "Update Product"
                      : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
