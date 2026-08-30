import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface PolicyPageProps {
  title: string;
  breadcrumb: string;
  sections: { heading: string; body: string }[];
  lastUpdated?: string;
}

export function PolicyPage({ title, breadcrumb, sections, lastUpdated = 'August 2026' }: PolicyPageProps) {
  return (
    <div className="container-lux py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: breadcrumb }]} />
      <h1 className="font-serif text-headline text-charcoal-800 dark:text-ivory mt-6 mb-3">{title}</h1>
      <p className="text-xs text-charcoal-400 mb-10">Last updated: {lastUpdated}</p>

      <div className="max-w-3xl space-y-8">
        {sections.map((section, i) => (
          <div key={i}>
            <h2 className="font-serif text-xl text-charcoal-800 dark:text-ivory mb-3">{section.heading}</h2>
            <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed">{section.body}</p>
          </div>
        ))}

        <div className="mt-12 pt-8 border-t border-charcoal-100 dark:border-charcoal-700">
          <p className="text-sm text-charcoal-400 italic">
            This is demo policy content for NIGAHE SHAUQ, a prototype jewellery e-commerce website. The information above is illustrative and should be reviewed by legal counsel before use in a live business.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ShippingPolicyPage() {
  return (
    <PolicyPage
      title="Shipping Policy"
      breadcrumb="Shipping Policy"
      sections={[
        { heading: 'Processing Time', body: 'Orders are processed within 1–2 business days of placement. Processing time does not include weekends or public holidays. Orders placed after 2pm on Friday will be processed the following Monday.' },
        { heading: 'Domestic Shipping', body: 'We offer standard delivery (3–5 business days) and express delivery (1–2 business days) within the United States. Standard shipping is complimentary on orders over $150; otherwise a flat fee of $8 applies. Express delivery costs $15 regardless of order value.' },
        { heading: 'International Shipping', body: 'We ship to most countries worldwide. International shipping rates are calculated at checkout based on destination and order weight. Delivery times range from 7–14 business days depending on location. Customs duties and import taxes are the responsibility of the customer.' },
        { heading: 'Order Tracking', body: 'Once your order ships, you will receive a confirmation email with a tracking number. You can track your order at any time using the Track Order page on our website.' },
        { heading: 'Shipping Delays', body: 'While we strive to meet estimated delivery times, we are not responsible for delays caused by carriers, customs processing, weather, or other events outside our control. If your order is significantly delayed, please contact our customer care team.' },
        { heading: 'Lost or Damaged Packages', body: 'If your package arrives damaged, please contact us within 48 hours with photos of the damage. For lost packages, we will work with the carrier to locate your order or arrange a replacement or refund.' },
      ]}
    />
  );
}

export function ReturnPolicyPage() {
  return (
    <PolicyPage
      title="Return & Exchange Policy"
      breadcrumb="Returns"
      sections={[
        { heading: 'Return Window', body: 'We accept returns within 14 days of delivery for unworn pieces in their original packaging. Items must be in the same condition as received, with all tags and accessories included.' },
        { heading: 'How to Initiate a Return', body: 'To start a return, visit your account dashboard, locate the order, and click "Return Item." Alternatively, contact our customer care team with your order number and reason for return. We will provide a return shipping label and instructions.' },
        { heading: 'Refund Processing', body: 'Refunds are issued to the original payment method within 5–7 business days of receiving the returned item at our studio. Shipping fees are non-refundable except in cases of defective or incorrect items.' },
        { heading: 'Exchanges', body: 'We allow exchanges within 14 days of delivery. If the new item costs more, you pay the difference; if less, we refund the difference. Contact us to arrange an exchange.' },
        { heading: 'Non-Returnable Items', body: 'Certain items are non-returnable for hygiene and safety reasons, including earrings (unless defective) and personalised or custom-made pieces. Sale and clearance items are final sale.' },
        { heading: 'Damaged or Defective Items', body: 'If you receive a damaged or defective item, please contact us within 48 hours of delivery with photos. We will arrange a free replacement or full refund, including return shipping.' },
      ]}
    />
  );
}

export function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      breadcrumb="Privacy Policy"
      sections={[
        { heading: 'Information We Collect', body: 'We collect information you provide when creating an account, placing an order, or contacting us. This includes your name, email, phone number, shipping address, and payment information. We also collect browsing data such as pages visited and time spent on our site.' },
        { heading: 'How We Use Your Information', body: 'Your information is used to process orders, communicate with you about your purchases, provide customer support, and send marketing communications (if you opt in). We do not sell your personal information to third parties.' },
        { heading: 'Data Security', body: 'We use industry-standard encryption (SSL) to protect your data during transmission. Payment information is processed through PCI-compliant gateways and is never stored on our servers. This is a prototype store, so no real payment data is collected.' },
        { heading: 'Cookies', body: 'We use cookies to remember your preferences, track items in your cart and wishlist, and analyse site traffic. You can disable cookies in your browser settings, but some features may not function properly.' },
        { heading: 'Your Rights', body: 'You have the right to access, update, or delete your personal information. To exercise these rights, contact us at care@nigaheshauq.com (demo email). We will respond within 30 days.' },
        { heading: 'Third-Party Services', body: 'We use third-party services for analytics, shipping, and payment processing. These providers have their own privacy policies, and we encourage you to review them. We only share information necessary to fulfill your orders.' },
        { heading: 'Children\'s Privacy', body: 'Our website is not intended for children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with information, please contact us for deletion.' },
      ]}
    />
  );
}

export function TermsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      breadcrumb="Terms"
      sections={[
        { heading: 'Acceptance of Terms', body: 'By accessing and using the NIGAHE SHAUQ website, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website or services.' },
        { heading: 'Use of Website', body: 'You may use our website for lawful purposes only. You agree not to use the site in any way that could damage, disable, or impair the service, or interfere with another user\'s use. Unauthorized access, data scraping, and abuse of the platform are strictly prohibited.' },
        { heading: 'Product Information', body: 'We strive to display product images and descriptions accurately. However, colours may vary slightly due to monitor settings, and product specifications may change without notice. Jewellery pieces are handcrafted, so minor variations may occur.' },
        { heading: 'Pricing and Payment', body: 'All prices are listed in US dollars and may change without notice. This is a prototype store, so no real payments are processed. In a live environment, payment would be required at the time of order placement through accepted methods.' },
        { heading: 'Intellectual Property', body: 'All content on this website, including text, images, logos, and designs, is the property of NIGAHE SHAUQ and is protected by copyright and trademark laws. You may not reproduce, distribute, or use our content without written permission.' },
        { heading: 'Limitation of Liability', body: 'NIGAHE SHAUQ is not liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our maximum liability is limited to the purchase price of the product in question.' },
        { heading: 'Governing Law', body: 'These terms are governed by the laws of Pakistan. Any disputes will be resolved in the courts of Karachi, Pakistan.' },
        { heading: 'Changes to Terms', body: 'We reserve the right to update these Terms and Conditions at any time. Continued use of the website after changes constitutes acceptance of the updated terms.' },
      ]}
    />
  );
}
