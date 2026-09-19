"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-blue-700 bg-blue-800">
        <div className="flex w-full items-center justify-between px-6 py-4 md:px-10 lg:px-16 xl:px-20">
          {/* Company Logo */}
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
              className="text-sm font-medium text-white transition hover:text-blue-200"
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

          {/* Get Started Button */}
          <Link
            href="/contact"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-800 transition hover:bg-blue-50"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              Innovative Technology Solutions
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 sm:text-6xl">
              Building Digital
              <span className="block text-blue-600">
                Solutions for Tomorrow
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              We create modern software, websites, mobile applications, and
              digital solutions that help businesses grow, improve efficiency,
              and succeed in the digital world.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/products"
                className="rounded-lg bg-blue-600 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Products
              </Link>

              <Link
                href="/contact"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-center font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-2xl shadow-blue-100">
              <div className="rounded-2xl bg-gray-900 p-6">
                <div className="mb-6 flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="space-y-4">
                  <div className="h-4 w-3/4 rounded bg-blue-500" />
                  <div className="h-4 w-1/2 rounded bg-gray-700" />
                  <div className="h-4 w-2/3 rounded bg-gray-700" />

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="h-24 rounded-xl bg-blue-600/20" />
                    <div className="h-24 rounded-xl bg-indigo-600/20" />
                  </div>

                  <div className="h-12 rounded-xl bg-gray-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-blue-600">WHAT WE DO</p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
              Technology Solutions That Make a Difference
            </h2>

            <p className="mt-5 text-lg text-gray-600">
              From idea to implementation, we provide technology solutions
              designed around your business needs.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Service 1 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                💻
              </div>

              <h3 className="mt-6 text-xl font-bold">Software Development</h3>

              <p className="mt-3 leading-7 text-gray-600">
                Custom software solutions designed to simplify your business
                operations and improve productivity.
              </p>
            </div>

            {/* Service 2 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                🌐
              </div>

              <h3 className="mt-6 text-xl font-bold">Web Development</h3>

              <p className="mt-3 leading-7 text-gray-600">
                Modern, responsive, and high-performance websites built for
                businesses and organizations.
              </p>
            </div>

            {/* Service 3 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                📱
              </div>

              <h3 className="mt-6 text-xl font-bold">App Development</h3>

              <p className="mt-3 leading-7 text-gray-600">
                User-friendly mobile applications that provide powerful digital
                experiences.
              </p>
            </div>

            {/* Service 4 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-2xl">
                🎨
              </div>

              <h3 className="mt-6 text-xl font-bold">UI/UX Design</h3>

              <p className="mt-3 leading-7 text-gray-600">
                Clean and intuitive interfaces designed to create better
                experiences for your users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="font-semibold text-blue-600">ABOUT OUR COMPANY</p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
              Turning Ideas Into Digital Reality
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              We are a technology-focused company dedicated to creating
              practical and innovative digital solutions. Our goal is to help
              businesses use technology to work smarter and grow faster.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Whether you need a business website, custom software, mobile
              application, or a complete digital solution, we work to transform
              your ideas into reliable products.
            </p>

            <Link
              href="/about"
              className="mt-8 inline-block rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Learn More About Us
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <p className="text-4xl font-bold text-blue-600">01</p>
              <p className="mt-3 font-semibold text-gray-900">Innovation</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                We continuously explore better ways to solve business problems
                with technology.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
              <p className="text-4xl font-bold text-indigo-600">02</p>
              <p className="mt-3 font-semibold text-gray-900">Quality</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                We focus on building reliable and maintainable digital products.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <p className="text-4xl font-bold text-purple-600">03</p>
              <p className="mt-3 font-semibold text-gray-900">Collaboration</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                We work closely with clients to understand their goals and
                requirements.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
              <p className="text-4xl font-bold text-green-600">04</p>
              <p className="mt-3 font-semibold text-gray-900">Support</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Our relationship continues beyond the launch of your project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-semibold text-blue-600">OUR PRODUCTS</p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
                Software Built for Real Businesses
              </h2>

              <p className="mt-4 max-w-2xl text-lg text-gray-600">
                Explore our collection of software products designed to solve
                everyday business challenges.
              </p>
            </div>

            <Link
              href="/products"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              View All Products →
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
                <span className="text-5xl">📊</span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold">Business Management</h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Manage your business operations efficiently with modern
                  digital tools.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
                <span className="text-5xl">⚙️</span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold">Custom Software</h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Powerful software solutions tailored to your organization's
                  requirements.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-cyan-600 to-blue-700">
                <span className="text-5xl">🚀</span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold">Digital Solutions</h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Modern digital solutions that help organizations move forward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gray-900 px-8 py-16 text-center sm:px-16">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Have a Project in Mind?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            Let's discuss your idea and build a digital solution that works for
            your business.
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

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Company<span className="text-blue-600">.</span>
              </Link>

              <p className="mt-4 max-w-xs leading-7 text-gray-600">
                Building modern digital solutions for businesses and
                organizations.
              </p>
            </div>

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
