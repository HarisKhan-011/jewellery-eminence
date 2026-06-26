import Link from "next/link";

const termsSections = [
  {
    title: "1. Use of the Website",
    body: [
      "You may browse Eminence Jewellery, create an account, add items to your cart or wishlist, and place orders for personal shopping purposes. You agree not to misuse the website, attempt unauthorized access, interfere with checkout, or use our content, product images, or brand assets without permission.",
    ],
  },
  {
    title: "2. Product Information",
    body: [
      "We aim to present every jewellery piece as clearly as possible, including its style, category, price, images, and available details. Product colors, stone appearance, scale, shine, and finish may look slightly different because of lighting, screen settings, photography, and natural variation in gemstones or metals.",
      "Hand-finished, bridal, gemstone, diamond, and bespoke pieces may have small variations. These variations are part of the character of fine jewellery and do not automatically mean that a product is defective.",
    ],
  },
  {
    title: "3. Prices, Offers, and Availability",
    body: [
      "Prices are shown in Pakistani Rupees unless another currency is clearly displayed. We may update prices, discounts, coupons, product availability, and shipping charges at any time before an order is confirmed.",
      "If a product is listed with an incorrect price, discount, description, or availability status, we may contact you for confirmation, correct the information, or cancel the affected order and refund any amount already paid.",
    ],
  },
  {
    title: "4. Orders and Payment",
    body: [
      "When you place an order, you agree that the billing, contact, and delivery details you provide are accurate and complete. An order is confirmed only after successful checkout, payment authorization where required, and our acceptance of the order.",
      "Available payment methods are displayed during checkout. Card payments are handled through a secure payment provider, and we do not store full card details on our website.",
    ],
  },
  {
    title: "5. Delivery",
    body: [
      "Delivery options and charges are shown at checkout. Estimated delivery times, including today delivery or standard delivery, depend on your address, product availability, payment confirmation, and courier operations.",
      "Please check the package when it arrives. If the package appears damaged, opened, or incomplete, contact us as soon as possible with your order details and clear photos.",
    ],
  },
  {
    title: "6. Returns, Exchanges, and Cancellations",
    body: [
      "We want you to shop confidently. If you need help with a return, exchange, or cancellation, contact customer care with your order number and reason for the request.",
      "Items should be unused, unworn, undamaged, and returned with original packaging, certificates, tags, and any accessories. Custom, resized, altered, engraved, special-order, or made-to-order jewellery may not be eligible for return or exchange unless the item is faulty or we delivered the wrong product.",
      "For hygiene and safety, worn earrings and pierced jewellery may not be eligible for return unless they are faulty. Approved refunds are issued to the original payment method where possible, after inspection.",
    ],
  },
  {
    title: "7. Bespoke and Bridal Orders",
    body: [
      "Bespoke atelier, bridal jewellery, personalized, resized, or custom design orders may require consultation, design confirmation, advance payment, and additional production time. Once production starts, these orders may not be cancelled or changed unless we agree in writing.",
    ],
  },
  {
    title: "8. Care and Responsibility",
    body: [
      "Jewellery should be handled with care and kept away from harsh chemicals, perfumes, moisture, and rough use. Damage caused by misuse, impact, improper storage, third-party repairs, or normal wear may not be treated as a manufacturing fault.",
    ],
  },
  {
    title: "9. Accounts and Security",
    body: [
      "You are responsible for keeping your login details safe and for activity under your account. Please contact us immediately if you believe your account or order information has been used without permission.",
    ],
  },
  {
    title: "10. Intellectual Property",
    body: [
      "All website content, including the Eminence Jewellery name, logos, product photography, page design, text, and graphics, belongs to Eminence Jewellery or its licensors. You may not copy, reproduce, sell, or use this content for commercial purposes without written permission.",
    ],
  },
  {
    title: "11. Limitation of Liability",
    body: [
      "To the fullest extent allowed by applicable law, Eminence Jewellery is not responsible for indirect, incidental, special, or consequential losses arising from your use of the website, delayed delivery, product availability, or inability to access the service.",
    ],
  },
  {
    title: "12. Changes to These Terms",
    body: [
      "We may update these Terms and Conditions from time to time. The latest version posted on this page will apply to your use of the website and to orders placed after the update date.",
    ],
  },
];

const TermsArea = () => {
  return (
    <section className="policy__area pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="policy__wrapper policy__translate p-relative z-index-1">
              <div className="policy__item mb-35">
                <h4 className="policy__meta">Last updated: June 26, 2026</h4>
                <p>
                  These Terms and Conditions apply to your use of the Eminence
                  Jewellery website, including browsing products, creating an
                  account, placing orders, making payments, and requesting
                  customer support. By using this website or placing an order,
                  you agree to follow these terms.
                </p>
                <p>
                  In these terms, &quot;Eminence Jewellery&quot;,
                  &quot;we&quot;, &quot;us&quot;, and &quot;our&quot; refer to
                  the Eminence Jewellery online store. &quot;You&quot; and
                  &quot;your&quot; refer to the customer or visitor using this
                  website.
                </p>
              </div>

              {termsSections.map((section) => (
                <div className="policy__item policy__item-2 mb-35" key={section.title}>
                  <h3 className="policy__title">{section.title}</h3>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ))}

              <div className="policy__contact">
                <h3 className="policy__title policy__title-2">Contact Us</h3>
                <p>
                  For order help, returns, exchanges, custom jewellery
                  consultations, or questions about these terms, contact us via:
                </p>

                <ul>
                  <li>
                    Email:{" "}
                    <span>
                      <a href="mailto:eminencejewelery1@gmail.com">
                        eminencejewelery1@gmail.com
                      </a>
                    </span>
                  </li>
                  <li>
                    Phone:{" "}
                    <span>
                      <a href="tel:+96474244763">03424495548</a>
                    </span>
                  </li>
                  <li>
                    Website:{" "}
                    <span>
                      <Link href="/">eminencejewellery.com</Link>
                    </span>
                  </li>
                </ul>

                <div className="policy__address">
                  <p>Eminence Jewellery, Lahore, Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsArea;
