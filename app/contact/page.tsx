"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/queries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit your query.");
      }

      setSuccess(
        "Thank you! Your message has been submitted successfully. We will get back to you soon.",
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

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

            <Link
              href="/products"
              className="text-sm font-medium text-blue-100 transition hover:text-white"
            >
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

            <Link href="/contact" className="text-sm font-medium text-white">
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-700">
              Get In Touch
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Let&apos;s Talk About Your Project
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Have a question, project idea, or business requirement? Send us a
              message and our team will get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-5 lg:px-16">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
              Contact Us
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              We&apos;d love to hear from you
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Whether you need a website, software solution, mobile application,
              UI/UX design, or technical support, feel free to contact our team.
            </p>

            <div className="mt-10 space-y-7">
              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl">
                  ✉️
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-600">info@company.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl">
                  📞
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="mt-1 text-gray-600">+977-XXXXXXXXXX</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl">
                  📍
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="mt-1 text-gray-600">Nepal</p>
                </div>
              </div>
            </div>

            {/* Meeting CTA */}
            <div className="mt-10 rounded-2xl bg-blue-50 p-6">
              <h3 className="text-lg font-bold text-gray-900">
                Prefer a meeting?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Schedule a meeting with our team to discuss your project in
                detail.
              </p>

              <Link
                href="/meeting"
                className="mt-5 inline-flex rounded-lg bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Book a Meeting
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Send Us a Message
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Fill out the form below and we&apos;ll contact you as soon as
                possible.
              </p>

              {/* Success Message */}
              {success && (
                <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                  {success}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Name + Email */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Name *
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Phone + Subject */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+977-XXXXXXXXXX"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Subject *
                    </label>

                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Message *
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={7}
                    placeholder="Tell us about your project or question..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-blue-800 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                <p className="text-center text-xs text-gray-500">
                  * Required fields
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-800 py-16">
        <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Have a project in mind?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Let&apos;s discuss your requirements and build a solution that works
            for your business.
          </p>

          <Link
            href="/meeting"
            className="mt-8 inline-flex rounded-lg bg-white px-7 py-3.5 font-semibold text-blue-800 transition hover:bg-blue-50"
          >
            Schedule a Meeting
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:px-10 md:grid-cols-2 lg:grid-cols-4 lg:px-16">
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold text-white">Company</h3>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Building modern digital solutions for businesses and
              organizations.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white">Company</h4>

            <div className="mt-4 space-y-3 text-sm">
              <Link href="/about" className="block transition hover:text-white">
                About Us
              </Link>

              <Link
                href="/careers"
                className="block transition hover:text-white"
              >
                Careers
              </Link>

              <Link
                href="/contact"
                className="block transition hover:text-white"
              >
                Contact
              </Link>

              <Link
                href="/partnership"
                className="block transition hover:text-white"
              >
                Partnership
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white">Services</h4>

            <div className="mt-4 space-y-3 text-sm text-gray-400">
              <p>Web Development</p>
              <p>Software Development</p>
              <p>App Development</p>
              <p>UI/UX Design</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white">Contact</h4>

            <div className="mt-4 space-y-3 text-sm text-gray-400">
              <p>info@company.com</p>
              <p>+977-XXXXXXXXXX</p>
              <p>Nepal</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-500 md:px-10 lg:px-16">
            © {new Date().getFullYear()} Company. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
