import React from 'react';

const TermsOfService = () => {
  return (
    <div className="container py-5 mt-5">
      <div className="glass-card p-5 border-0 shadow">
        <h1 className="fw-bold mb-4">Terms of Service</h1>
        <p className="lead text-secondary">Last updated: March 2026</p>
        <hr className="my-5" />
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing and using AMA GHANA TRANSIT, you agree to be bound by these Terms of Service and all applicable laws and regulations in Ghana.</p>
        
        <h3 className="mt-4">2. Service Description</h3>
        <p>AMA GHANA TRANSIT is a platform for transport aggregation and booking. We do not operate the buses ourselves; we provide a system to connect passengers with operators.</p>

        <h3 className="mt-4">3. User Responsibilities</h3>
        <p>Users are responsible for providing accurate information during booking and complying with the rules set by the bus operators.</p>

        <h3 className="mt-4">4. Liability</h3>
        <p>We are not liable for any delays, cancellations, or incidents occurring during travel with third-party operators.</p>
      </div>
    </div>
  );
};

export default TermsOfService;
