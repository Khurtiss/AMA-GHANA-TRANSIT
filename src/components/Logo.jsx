import React from 'react';

const Logo = ({ height = 40 }) => {
  return (
    <div className="d-flex align-items-center gap-2" style={{ height }}>
      <svg 
        viewBox="0 0 200 100" 
        style={{ height: '100%', width: 'auto' }}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stylized Bus Shape */}
        <path 
          d="M40 40 Q45 25 70 25 L150 25 Q175 25 180 40 L180 70 Q175 85 150 85 L70 85 Q45 85 40 70 Z" 
          fill="white" 
          stroke="#1a1a1a" 
          strokeWidth="2"
        />
        
        {/* Swooshes in Ghana Colors */}
        {/* Red Swoosh */}
        <path 
          d="M20 30 Q60 15 150 20" 
          stroke="#CE1126" 
          strokeWidth="6" 
          strokeLinecap="round"
        />
        {/* Gold Swoosh */}
        <path 
          d="M15 50 Q60 40 160 45" 
          stroke="#FCD116" 
          strokeWidth="6" 
          strokeLinecap="round"
        />
        {/* Green Swoosh */}
        <path 
          d="M10 70 Q60 65 155 75" 
          stroke="#006B3F" 
          strokeWidth="6" 
          strokeLinecap="round"
        />
        
        {/* Bus Windows/Details */}
        <rect x="55" y="35" width="30" height="20" rx="4" fill="#e0e0e0" />
        <rect x="95" y="35" width="40" height="20" rx="4" fill="#e0e0e0" />
        <circle cx="70" cy="85" r="8" fill="#1a1a1a" />
        <circle cx="150" cy="85" r="8" fill="#1a1a1a" />
      </svg>
    </div>
  );
};


export default Logo;
