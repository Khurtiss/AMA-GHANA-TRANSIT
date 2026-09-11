import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="container py-5 mt-5">
      <div className="glass-card p-5 border-0 shadow">
        <h1 className="fw-bold mb-4">Cookie Policy</h1>
        <p className="lead text-secondary">Last updated: March 2026</p>
        <hr className="my-5" />
        <h3>1. What are cookies?</h3>
        <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work or work more efficiently, as well as to provide information to the owners of the site.</p>
        
        <h3 className="mt-4">2. How we use cookies</h3>
        <p>AMA GHANA TRANSIT uses cookies for the following purposes:</p>
        <ul>
          <li><strong>Essential:</strong> These are necessary for the website to function properly.</li>
          <li><strong>Analytics:</strong> These help us understand how visitors interact with our website.</li>
          <li><strong>Preferences:</strong> These allow the website to remember choices you make.</li>
        </ul>

        <h3 className="mt-4">3. Managing cookies</h3>
        <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noreferrer">aboutcookies.org</a>.</p>
      </div>
    </div>
  );
};

export default CookiePolicy;
