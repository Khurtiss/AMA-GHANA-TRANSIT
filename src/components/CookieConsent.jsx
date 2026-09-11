import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent-banner fixed-bottom p-4 animate-fade-in" style={{ zIndex: 2000 }}>
            <div className="container">
                <div className="glass-card shadow-lg p-4 bg-dark text-white border border-primary border-opacity-25 rounded-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary p-2 rounded-circle">🍪</div>
                        <p className="mb-0 small opacity-75" style={{ maxWidth: '600px' }}>
                            Working to improve your experience. This website uses cookies to improve browsing experience and analyze platform traffic. By continuing, you agree to our use of cookies.
                        </p>
                    </div>
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-light btn-sm px-3" onClick={() => setIsVisible(false)}>Settings</button>
                        <button className="btn btn-primary btn-sm px-4 fw-bold" onClick={acceptCookies}>Accept Cookies</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
