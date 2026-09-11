import React from 'react';

const AdinkraWatermark = () => {
  return (
    <div className="adinkra-watermark-container">
      {/* Gye Nyame */}
      <svg className="adinkra-symbol gye-nyame" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 0 C22.4 0 0 22.4 0 50 C0 77.6 22.4 100 50 100 C77.6 100 100 77.6 100 50 C100 22.4 77.6 0 50 0 M50 10 L50 20 C66.6 20 80 33.4 80 50 C80 66.6 66.6 80 50 80 L50 90 C72.1 90 90 72.1 90 50 C90 27.9 72.1 10 50 10 M35 30 L40 30 L40 70 L35 70 Z M60 30 L65 30 L65 70 L60 70 Z M45 45 L55 45 L55 55 L45 55 Z" />
      </svg>
      {/* Sankofa */}
      <svg className="adinkra-symbol sankofa" viewBox="0 0 100 100" fill="currentColor">
        <path d="M70 20 C60 10 40 10 30 20 C20 30 20 50 30 60 L20 70 L30 80 L40 70 C50 80 70 80 80 70 C90 60 90 40 80 30 Z M50 30 A10 10 0 1 1 50 31 Z M60 50 C60 55 55 60 50 60 C45 60 40 55 40 50 C40 45 45 40 50 40 C55 40 60 45 60 50 Z" />
      </svg>
      {/* Dwennimmen */}
      <svg className="adinkra-symbol dwennimmen" viewBox="0 0 100 100" fill="currentColor">
        <path d="M20 50 A30 30 0 1 1 80 50 A30 30 0 1 1 20 50 M35 50 A15 15 0 1 0 65 50 A15 15 0 1 0 35 50 M50 20 L50 35 M50 65 L50 80 M20 50 L35 50 M65 50 L80 50" stroke="currentColor" strokeWidth="5" fill="none" />
      </svg>
    </div>
  );
};

export default AdinkraWatermark;
