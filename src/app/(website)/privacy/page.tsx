"use client";

import React from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 py-12">
      <div className="max-content padding-x">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            <strong>Effective Date:</strong> <em>1-10-2025</em>
            <span className="mx-2">•</span>
            <strong>Brand:</strong> <em>The Scent Gallery by Elliea</em>
          </p>
        </header>

        <article className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-8 md:px-10 md:py-10 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                At <strong>The Scent Gallery by Elliea</strong>, we respect your
                privacy and are committed to protecting your personal data. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you interact with us through our
                website, social media platforms, WhatsApp, or in-store.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">
                1. Information We Collect
              </h3>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
                <li>
                  <strong>Personal Identification:</strong> Name, phone number,
                  email address, delivery address, billing details.
                </li>
                <li>
                  <strong>Order Information:</strong> Product purchases, payment
                  methods, shipping details.
                </li>
                <li>
                  <strong>Online Data:</strong> IP address, browser type, device
                  information, cookies (if you visit our website).
                </li>
                <li>
                  <strong>Communication Records:</strong> Messages, inquiries,
                  or feedback via WhatsApp, email, or social media.
                </li>
                <li>
                  <strong>Marketing Preferences:</strong> Subscriptions to
                  newsletters, promotions, or offers.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">
                2. How We Use Your Information
              </h3>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
                <li>Process and deliver orders.</li>
                <li>Communicate with you about orders and support.</li>
                <li>
                  Send updates about products and promotions (with consent).
                </li>
                <li>Improve our products, services, and website experience.</li>
                <li>Detect and prevent fraud or illegal activity.</li>
                <li>Meet legal and regulatory obligations.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">
                3. How We Share Your Information
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                We do not sell or rent customer information. We may share data
                with third parties in limited cases, such as:
              </p>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2 mt-3">
                <li>Service providers (payments, delivery, IT).</li>
                <li>Legal authorities, when required by law.</li>
                <li>
                  Marketing partners (email/SMS platforms) to send offers.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">4. Data Security</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                We implement reasonable technical, administrative, and physical
                safeguards to protect your data. However, no internet
                transmission is 100% secure — please consider that when sharing
                sensitive information.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">
                5. Your Privacy Rights
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                You have the right to access, correct, or delete the personal
                data we hold about you, and to opt out of marketing
                communications. To exercise these rights, contact us using the
                details in the Contact section below.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">
                6. Cookies & Tracking
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                We may use cookies and similar technologies to improve
                performance, remember preferences, and analyze traffic. You can
                disable cookies in your browser, but some features may not work
                as intended.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">7. Data Retention</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                We retain personal data only as long as necessary to fulfill
                purposes described in this policy or as required by law.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">
                8. Children’s Privacy
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Our services are not directed to individuals under 18. We do not
                knowingly collect data from children; if we learn we have, we
                will delete it promptly.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">9. Contact Us</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                If you have questions or requests regarding this policy, reach
                out to us:
              </p>

              <ul className="mt-3 text-sm text-gray-700 space-y-1">
                <li>
                  <strong>The Scent Gallery by Elliea</strong>
                </li>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:youremail@example.com"
                    className="text-[#770a10] hover:underline"
                  >
                    Thescentgallerybyelliea@gmail.com
                  </a>
                </li>
                <li>
                  Phone/WhatsApp:{" "}
                  <Link
                    href="tel:+2349069521083"
                    className="text-[#770a10] hover:underline"
                  >
                    <span>+2349069521083</span>
                  </Link>
                </li>
                <li className="text-gray-600">
                  No 2 geodetic road Rumuobiakani beside shell IA
                  <br />
                  Port harcourt, Rivers State
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">
                10. Updates to This Policy
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                We may update this Privacy Policy periodically. The latest
                version will be available on our website and social channels.
              </p>
            </section>

            <div className="pt-4 border-t mt-6">
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} The Scent Gallery by Elliea. All
                rights reserved.
              </p>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
