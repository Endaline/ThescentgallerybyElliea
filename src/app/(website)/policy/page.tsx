"use client";

import React from "react";

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 py-12">
      <div className="max-content padding-x">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
            Refund &amp; Return Policy
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
              <p className="text-sm text-gray-700 leading-relaxed">
                At <strong>The Scent Gallery by Elliea</strong>, customer
                satisfaction is important to us. This Refund &amp; Return Policy
                explains the conditions and process for returns, refunds, and
                exchanges.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">
                1. Eligibility for Returns &amp; Refunds
              </h3>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
                <li>The item is damaged, defective, or incorrect.</li>
                <li>
                  The item is unused, unopened, and in its original packaging
                  (opened perfumes cannot be returned for hygiene reasons).
                </li>
                <li>
                  The request is made within <strong>7 days</strong> of
                  delivery/receipt.
                </li>
              </ul>

              <p className="mt-3 text-sm text-gray-700 font-semibold">
                Non-returnable items include:
              </p>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2 mt-2">
                <li>Opened or used perfumes.</li>
                <li>Unboxed or tester perfumes sold at discounted rates.</li>
                <li>Items purchased during clearance or promotional sales.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">2. Refund Process</h3>
              <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-2">
                <li>
                  Contact our customer service team with your order number,
                  proof of purchase, and clear photos of the product.
                </li>
                <li>
                  We will review and confirm if the item is eligible for return.
                </li>
                <li>
                  If approved, we will provide instructions for returning the
                  item.
                </li>
                <li>
                  After inspection, we will process the refund by the selected
                  method.
                </li>
              </ol>

              <p className="mt-3 text-sm text-gray-700">
                Refunds are issued via:
              </p>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2 mt-2">
                <li>Store Credit / Voucher (fastest option).</li>
                <li>
                  Bank Transfer / Original Payment Method (may take 5–10 working
                  days depending on bank/payment provider).
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">3. Exchanges</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                We allow exchanges for the same product (if available) or for
                another product of equal value. If the replacement product is of
                higher value, the customer will be asked to pay the difference.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">4. Shipping Costs</h3>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
                <li>
                  If the return is due to our error (wrong item, damaged,
                  defective), we will cover the return shipping cost.
                </li>
                <li>
                  If the return is due to customer preference (change of mind),
                  the customer is responsible for return shipping costs.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">
                5. Order Cancellations
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Orders can be canceled within <strong>12 hours</strong> of
                purchase provided the item has not yet shipped. Once shipped,
                cancellations are not possible but a return may be requested
                after delivery (if eligible).
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">
                6. Damaged or Missing Items
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                If your order arrives damaged or is missing an item, report the
                issue within <strong>48 hours</strong> of delivery and provide
                photos/videos of the packaging and product. We will investigate
                and replace or refund the affected items if verified.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">7. Contact Us</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                For refund, return, or exchange requests, please contact us:
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
                  <a
                    href="tel:+2348105049386"
                    className="text-[#770a10] hover:underline"
                  >
                    <span>+2349069521083</span>
                  </a>
                </li>
                <li className="text-gray-600">
                  No 2 geodetic road Rumuobiakani beside shell IA
                  <br />
                  Port harcourt, Rivers State
                </li>{" "}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">8. Policy Updates</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                We may update this Refund Policy periodically. The latest
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
