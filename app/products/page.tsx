"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  technologies: string;
  productUrl?: string;
  status: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b border-blue-700 bg-blue-800">
        <div className="flex w-full items-center justify-between px-6 py-4 md:px-10 lg:px-16 xl:px-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-white"
          >
            Company<span className="text-blue-300">.</span>
          </Link>

          {/* Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-blue-100 transition hover:text-white"
            >
              Home
            </Link>

            <Link href="/products" className="text-sm font-medium text-white">
              Products
            </Link>

            <Link
              href="/services"
              className="text-sm font-medium text-blue-100 transition hover:text-white"
            >
              Services
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium text-blue-100 transition hover:text-white"
            >
              About
            </Link>

            <Link
              href="/careers"
              className="text-sm font-medium text-blue-100 transition hover:text-white"
            >
              Careers
            </Link>

            <Link
              href="/contact"
              className="text-sm font-medium text-blue-100 transition hover:text-white"
            >
              Contact
            </Link>
          </div>

          {/* Get Started */}
          <Link
            href="/contact"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-800 transition hover:bg-blue-50"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-semibold uppercase tracking-wide text-blue-600">
              Our Products
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Software Built for Real Businesses
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore our software products designed to simplify business
              operations, improve productivity, and help organizations grow.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Loading */}
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

                <p className="mt-5 text-gray-600">Loading products...</p>
              </div>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <h2 className="text-xl font-bold text-red-700">
                Unable to Load Products
              </h2>

              <p className="mt-3 text-red-600">{error}</p>

              <button
                onClick={() => window.location.reload()}
                className="mt-6 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* No Products */}
          {!loading && !error && products.length === 0 && (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-12 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
                📦
              </div>

              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                No Products Available
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-gray-600">
                Our products will appear here once they are added from the admin
                dashboard.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Contact Us
              </Link>
            </div>
          )}

          {/* Products */}
          {!loading && !error && products.length > 0 && (
            <>
              <div className="mb-12">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Explore Our Products
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  Our Software Solutions
                </h2>

                <p className="mt-4 max-w-2xl text-gray-600">
                  Discover software solutions developed to solve real-world
                  business challenges.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {products
                  .filter((product) => product.status !== false)
                  .map((product) => (
                    <div
                      key={product._id}
                      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                    >
                      {/* Product Header */}
                      <div className="flex h-52 items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
                        <div className="text-center text-white">
                          <div className="text-6xl">💻</div>

                          <p className="mt-3 text-sm font-medium text-blue-100">
                            Software Solution
                          </p>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="p-7">
                        {/* Category */}
                        <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                          {product.category}
                        </span>

                        {/* Name */}
                        <h3 className="mt-4 text-2xl font-bold text-gray-900">
                          {product.name}
                        </h3>

                        {/* Description */}
                        <p className="mt-3 line-clamp-4 leading-7 text-gray-600">
                          {product.description}
                        </p>

                        {/* Technologies */}
                        <div className="mt-6">
                          <p className="text-sm font-semibold text-gray-900">
                            Technologies
                          </p>

                          <p className="mt-2 rounded-lg bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-600">
                            {product.technologies}
                          </p>
                        </div>

                        {/* Product URL */}
                        {product.productUrl && (
                          <a
                            href={product.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center font-semibold text-blue-600 transition hover:text-blue-700"
                          >
                            Visit Product
                            <span className="ml-2 transition-transform group-hover:translate-x-1">
                              →
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gray-900 px-8 py-16 text-center sm:px-16">
          <p className="font-semibold text-blue-400">NEED SOMETHING CUSTOM?</p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">
            Looking for a Custom Software Solution?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            Tell us about your requirements and our team can help transform your
            idea into a reliable digital product.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-lg bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Contact Us
            </Link>

            <Link
              href="/meeting"
              className="rounded-lg border border-gray-600 px-7 py-3.5 font-semibold text-white transition hover:bg-gray-800"
            >
              Book a Meeting
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            {/* Company */}
            <div>
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Company<span className="text-blue-600">.</span>
              </Link>

              <p className="mt-4 max-w-xs leading-7 text-gray-600">
                Building modern digital solutions for businesses and
                organizations.
              </p>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-gray-900">Company</h3>

              <div className="mt-4 space-y-3">
                <Link
                  href="/about"
                  className="block text-gray-600 hover:text-blue-600"
                >
                  About Us
                </Link>

                <Link
                  href="/careers"
                  className="block text-gray-600 hover:text-blue-600"
                >
                  Careers
                </Link>

                <Link
                  href="/partnership"
                  className="block text-gray-600 hover:text-blue-600"
                >
                  Partnership
                </Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-gray-900">Services</h3>

              <div className="mt-4 space-y-3">
                <Link
                  href="/services"
                  className="block text-gray-600 hover:text-blue-600"
                >
                  Web Development
                </Link>

                <Link
                  href="/services"
                  className="block text-gray-600 hover:text-blue-600"
                >
                  App Development
                </Link>

                <Link
                  href="/services"
                  className="block text-gray-600 hover:text-blue-600"
                >
                  Software Development
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-gray-900">Get In Touch</h3>

              <div className="mt-4 space-y-3 text-gray-600">
                <p>info@company.com</p>
                <p>+977-XXXXXXXXXX</p>
                <p>Nepal</p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Company. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
