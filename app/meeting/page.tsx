"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function MeetingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: "",
    time: "",
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit meeting request.");
      }

      setSuccess(
        "Your meeting request has been submitted successfully. We will contact you soon.",
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        date: "",
        time: "",
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

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
              Book a Meeting
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Let&apos;s discuss your project
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Tell us about your project, requirements, or business idea.
              Choose a convenient date and time, and send us a meeting
              request.
            </p>
          </div>
        </div>
      </section>

      {/* MEETING FORM */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            {/* LEFT INFORMATION */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Schedule a conversation
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                Whether you need a website, application, business software,
                UI/UX design, or another technology solution, we would be happy
                to discuss your requirements.
              </p>

              <div className="mt-8 space-y-5">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-semibold text-gray-900">
                    📅 Flexible Scheduling
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Choose a date and time that works for you.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-semibold text-gray-900">
                    💬 Discuss Your Requirements
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Share your project requirements before the meeting.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-semibold text-gray-900">
                    🤝 Find the Right Solution
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    We can explore possible solutions based on your needs.
                  </p>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Meeting Request
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Fields marked with * are required.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Name + Email */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Full Name *
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
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
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Phone + Company */}
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
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Company
                    </label>

                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Date + Time */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="date"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Preferred Date *
                    </label>

                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Preferred Time *
                    </label>

                    <input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Subject */}
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
                    placeholder="What would you like to discuss?"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us briefly about your project or requirements..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Success */}
                {success && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                    {success}
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-blue-800 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Request Meeting"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Company */}
            <div>
              <Link
                href="/"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                Company<span className="text-blue-700">.</span>
              </Link>

              <p className="mt-4 max-w-sm leading-7 text-gray-600">
                Building modern digital solutions for businesses and
                organizations.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900">Quick Links</h3>

              <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600">
                <Link href="/" className="hover:text-blue-700">
                  Home
                </Link>

                <Link href="/products" className="hover:text-blue-700">
                  Products
                </Link>

                <Link href="/services" className="hover:text-blue-700">
                  Services
                </Link>

                <Link href="/about" className="hover:text-blue-700">
                  About
                </Link>

                <Link href="/careers" className="hover:text-blue-700">
                  Careers
                </Link>

                <Link href="/contact" className="hover:text-blue-700">
                  Contact
                </Link>

                <Link href="/meeting" className="hover:text-blue-700">
                  Book a Meeting
                </Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-gray-900">Services</h3>

              <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600">
                <Link href="/services" className="hover:text-blue-700">
                  Web Development
                </Link>

                <Link href="/services" className="hover:text-blue-700">
                  Software Development
                </Link>

                <Link href="/services" className="hover:text-blue-700">
                  App Development
                </Link>

                <Link href="/services" className="hover:text-blue-700">
                  UI/UX Design
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-gray-900">Contact</h3>

              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <p>📧 info@company.com</p>
                <p>📞 +977-XXXXXXXXXX</p>
                <p>📍 Nepal</p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-500">
            © {new Date().getFullYear()} Company. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}