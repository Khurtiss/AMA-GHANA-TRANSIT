import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container py-5 mt-5">
      <div className="glass-card p-5 border-0 shadow">
        <h1 className="fw-bold mb-4">Privacy Policy</h1>
        <p className="lead text-secondary">Last updated: March 2026</p>
        <hr className="my-5" />
        <h3>1. Information Collection</h3>
        <p>We collect information you provide directly to us when you create an account, make a booking, or contact us for support.</p>
        
        <h3 className="mt-4">2. Use of Information</h3>
        <p>We use the information we collect to provide, maintain, and improve our services, including processing transactions and sending trip confirmations.</p>

        <h3 className="mt-4">3. Data Sharing</h3>
        <p>We share necessary information (like passenger names) with bus operators to facilitate your travel bookings.</p>

        <h3 className="mt-4">4. Data Security</h3>
        <p>We implement Row Level Security (RLS) and encryption to protect your personal data from unauthorized access.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
