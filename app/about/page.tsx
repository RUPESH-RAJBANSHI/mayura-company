import Link from "next/link";

export default function AboutPage() {
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

            <Link href="/about" className="text-sm font-medium text-white">
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
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-700">
              About Us
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Building technology that helps businesses grow.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              We are a technology company focused on creating modern, reliable,
              and practical digital solutions for businesses, organizations, and
              individuals.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="rounded-lg bg-blue-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-900"
              >
                Explore Our Services
              </Link>

              <Link
                href="/contact"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-700">
                Who We Are
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Technology with purpose
              </h2>

              <p className="mt-6 leading-8 text-gray-600">
                Our company works to turn ideas and business requirements into
                useful digital products. We combine modern technologies,
                thoughtful design, and practical development approaches to
                create solutions that are easy to use and built for real-world
                needs.
              </p>

              <p className="mt-4 leading-8 text-gray-600">
                From websites and applications to customized business software,
                our goal is to help organizations use technology more
                effectively and build a stronger digital presence.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-7">
                <div className="mb-4 text-3xl">💡</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Innovation
                </h3>
                <p className="mt-3 leading-7 text-gray-600">
                  We explore modern technologies and practical ideas to create
                  better digital experiences.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-7">
                <div className="mb-4 text-3xl">🎯</div>
                <h3 className="text-xl font-semibold text-gray-900">Purpose</h3>
                <p className="mt-3 leading-7 text-gray-600">
                  We focus on solutions that address real business needs and
                  provide meaningful value.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-7">
                <div className="mb-4 text-3xl">🤝</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Collaboration
                </h3>
                <p className="mt-3 leading-7 text-gray-600">
                  We work closely with clients and partners to turn ideas into
                  successful digital solutions.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-7">
                <div className="mb-4 text-3xl">🚀</div>
                <h3 className="text-xl font-semibold text-gray-900">Growth</h3>
                <p className="mt-3 leading-7 text-gray-600">
                  We build solutions designed to support businesses as they grow
                  and evolve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16 lg:py-24">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <div className="rounded-2xl bg-blue-800 p-8 text-white md:p-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
                Our Mission
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                Making technology practical and accessible.
              </h2>

              <p className="mt-5 leading-8 text-blue-100">
                Our mission is to develop reliable and user-friendly digital
                solutions that help businesses solve problems, improve
                efficiency, and create better experiences for their customers.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
                Our Vision
              </p>

              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                Creating a smarter digital future.
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                We aim to become a trusted technology partner for businesses by
                delivering innovative solutions, maintaining high standards, and
                continuously adapting to the changing digital world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
              What We Do
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Digital solutions for modern businesses
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              We provide a range of technology services designed to help
              businesses establish, improve, and expand their digital
              operations.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">
                Web Development
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                Modern and responsive websites designed around business goals
                and user needs.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">
                Software Development
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                Customized software solutions that help organizations manage
                their operations more effectively.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">
                App Development
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                User-focused application development for modern digital
                experiences.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">
                UI/UX Design
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                Clean and intuitive interfaces that make digital products easier
                and more enjoyable to use.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">
                Business Solutions
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                Technology solutions designed around specific organizational
                requirements and workflows.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">
                Technology Support
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                Ongoing support and improvements to help digital systems remain
                reliable and useful.
              </p>
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
                Have an idea or project in mind?
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-blue-100">
                Let's discuss your requirements and explore how technology can
                help bring your idea to life.
              </p>
            </div>

            <Link
              href="/contact"
              className="shrink-0 rounded-lg bg-white px-6 py-3 font-semibold text-blue-800 transition hover:bg-blue-50"
            >
              Get in Touch
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
