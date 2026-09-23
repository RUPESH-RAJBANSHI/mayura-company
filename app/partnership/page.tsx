"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    partnershipType: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
      const response = await fetch("/api/partnership", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit partnership inquiry.",
        );
      }

      setSuccess(
        "Your partnership inquiry has been submitted successfully. We will contact you soon.",
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        partnershipType: "",
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
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
              Partnership & Collaboration
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Let&apos;s build something together.
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              We are open to working with businesses, organizations, technology
              providers, and other partners to create meaningful digital
              solutions and new opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
              Why Partner With Us
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Collaboration creates better opportunities
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              We believe strong partnerships can combine different skills,
              ideas, and technologies to create solutions that provide value for
              everyone involved.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-7">
              <div className="mb-5 text-3xl">🤝</div>

              <h3 className="text-xl font-semibold text-gray-900">
                Collaboration
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Work together on technology projects, products, and business
                opportunities.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-7">
              <div className="mb-5 text-3xl">💡</div>

              <h3 className="text-xl font-semibold text-gray-900">
                Shared Ideas
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Combine knowledge and ideas to explore innovative solutions.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-7">
              <div className="mb-5 text-3xl">🚀</div>

              <h3 className="text-xl font-semibold text-gray-900">
                New Opportunities
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Explore opportunities to develop products, services, and
                technology initiatives together.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-7">
              <div className="mb-5 text-3xl">🌐</div>

              <h3 className="text-xl font-semibold text-gray-900">
                Long-Term Growth
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Build professional relationships that can grow into long-term
                collaborations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP TYPES */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
                Partnership Opportunities
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Different ways we can work together
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                Every partnership is different. Tell us what you have in mind,
                and we can discuss how our capabilities and resources can work
                together.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900">
                  Technology Partnership
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Collaborate on technology products, platforms, or development
                  projects.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900">
                  Business Partnership
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Explore business opportunities and mutually beneficial
                  initiatives.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900">
                  Service Partnership
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Work together to provide complementary services to clients.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900">
                  Project Collaboration
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Join forces on specific projects, ideas, or digital
                  initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            {/* LEFT */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
                Start a Conversation
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                Interested in partnering with us?
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                Send us some information about yourself, your organization, and
                the type of partnership you are interested in. Our team will
                review your inquiry and get in touch.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-semibold text-gray-900">
                    💬 Share Your Idea
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Tell us what you would like to achieve through the
                    partnership.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-semibold text-gray-900">🔍 We Review</h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    We will review your information and understand the
                    opportunity.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-semibold text-gray-900">🤝 Connect</h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    We will contact you to discuss the next steps.
                  </p>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Partnership Inquiry
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

                {/* Partnership Type */}
                <div>
                  <label
                    htmlFor="partnershipType"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Partnership Type *
                  </label>

                  <select
                    id="partnershipType"
                    name="partnershipType"
                    value={formData.partnershipType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select partnership type</option>
                    <option value="Technology Partnership">
                      Technology Partnership
                    </option>
                    <option value="Business Partnership">
                      Business Partnership
                    </option>
                    <option value="Service Partnership">
                      Service Partnership
                    </option>
                    <option value="Project Collaboration">
                      Project Collaboration
                    </option>
                    <option value="Other">Other</option>
                  </select>
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
                    placeholder="Partnership subject"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                  />
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
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your partnership idea..."
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
                  {loading ? "Submitting..." : "Submit Partnership Inquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-800">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Have another idea?
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-blue-100">
                If your opportunity does not fit one of the options above,
                contact us and tell us what you have in mind.
              </p>
            </div>

            <Link
              href="/contact"
              className="shrink-0 rounded-lg bg-white px-6 py-3 font-semibold text-blue-800 transition hover:bg-blue-50"
            >
              Contact Us
            </Link>
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

                <Link href="/partnership" className="hover:text-blue-700">
                  Partnership
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
