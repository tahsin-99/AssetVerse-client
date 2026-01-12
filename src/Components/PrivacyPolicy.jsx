import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 max-w-4xl mx-auto space-y-6 mt-60">
      <title>AssetVerse | Privacy Policy</title>
      <h1 className="text-4xl font-bold text-center mb-6">Privacy & Policy</h1>

      <p>
        At <strong>AssetVerse</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.
      </p>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <p>
          We may collect information such as your name, email address, and usage data to provide you with our services effectively. This may include data from your interactions on our website or app.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
        <p>
          Your information is used to:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Provide and maintain our services</li>
          <li>Respond to inquiries and requests</li>
          <li>Send important updates and notifications</li>
          <li>Improve our platform and user experience</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Data Sharing</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as necessary to provide our services or comply with legal obligations.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Cookies & Tracking</h2>
        <p>
          We may use cookies and similar tracking technologies to enhance your experience, monitor usage, and understand user behavior on our platform.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. Data Security</h2>
        <p>
          We implement reasonable security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">6. Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Access your personal data</li>
          <li>Request corrections to your information</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of promotional communications</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, you can contact us at: 
          <a href="mailto:support@assetverse.com" className="text-blue-600 dark:text-blue-400 underline ml-1">
            tahsinsikder456@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
