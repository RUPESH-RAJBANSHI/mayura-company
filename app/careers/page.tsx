"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Career {
  _id: string;
  title: string;
  department: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Internship" | "Contract";
  salary?: string;
  requirements: string;
  description: string;
  deadline: string;
  status: boolean;
}

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch("/api/careers");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch careers.");
        }

        setCareers(data.careers || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load career opportunities.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const activeCareers = careers.filter((career) => {
    if (!career.status) return false;

    const deadline = new Date(career.deadline);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return deadline >= today;
  });

  const formatDeadline = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
              Careers
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Build Your Future With Us
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join our team and work on meaningful technology, innovative
              products, and digital solutions that make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
              Open Positions
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Find Your Next Opportunity
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Explore our current openings and find a role that matches your
              skills and career goals.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-14 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-800"></div>

              <p className="mt-4 text-sm text-gray-500">
                Loading available positions...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mx-auto mt-14 max-w-2xl rounded-xl border border-red-200 bg-red-50 p-6 text-center">
              <p className="font-medium text-red-700">{error}</p>

              <button
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* No Careers */}
          {!loading && !error && activeCareers.length === 0 && (
            <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-gray-200 bg-gray-50 p-10 text-center">
              <div className="text-5xl">💼</div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                No Open Positions Right Now
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                We currently don&apos;t have any open vacancies. Please check
                back later for new opportunities.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-lg bg-blue-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Contact Us
              </Link>
            </div>
          )}

          {/* Careers */}
          {!loading && !error && activeCareers.length > 0 && (
            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {activeCareers.map((career) => (
                <article
                  key={career._id}
                  className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg md:p-8"
                >
                  {/* Job Header */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        {career.employmentType}
                      </span>

                      <h3 className="mt-4 text-2xl font-bold text-gray-900">
                        {career.title}
                      </h3>

                      <p className="mt-2 font-medium text-blue-700">
                        {career.department}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 px-4 py-3 text-left sm:text-right">
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-800">
                        {career.location}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-7">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                      About the Role
                    </h4>

                    <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
                      {career.description}
                    </p>
                  </div>

                  {/* Requirements */}
                  <div className="mt-7">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                      Requirements
                    </h4>

                    <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
                      {career.requirements}
                    </p>
                  </div>

                  {/* Salary */}
                  {career.salary && (
                    <div className="mt-7 rounded-xl bg-blue-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                        Salary
                      </p>

                      <p className="mt-1 text-sm font-medium text-gray-800">
                        {career.salary}
                      </p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-8 flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        Application Deadline
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {formatDeadline(career.deadline)}
                      </p>
                    </div>

                    <Link
                      href={`/contact?subject=Application for ${encodeURIComponent(
                        career.title,
                      )}`}
                      className="inline-flex justify-center rounded-lg bg-blue-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Apply Now
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Join Us */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
              Why Join Us
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Grow With Our Team
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We believe great products are built by people who are curious,
              collaborative, and passionate about technology.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                🚀
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Innovation
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Work with modern technologies and solve interesting real-world
                problems.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                🤝
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Collaboration
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Work together with a team that values ideas, communication, and
                continuous learning.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                📈
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">Growth</h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Develop your skills while taking on meaningful challenges and
                responsibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-800 py-16">
        <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Don&apos;t see the right position?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            We are always interested in meeting talented people. Get in touch
            and tell us how you could contribute to our team.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-lg bg-white px-7 py-3.5 font-semibold text-blue-800 transition hover:bg-blue-50"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:px-16">
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
