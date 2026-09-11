import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer py-5 bg-gh-black text-white mt-auto border-top border-secondary border-opacity-10">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-4">
              <Bus className="text-primary" size={28} />
              <h4 className="fw-bold mb-0 text-white">AMA GHANA <span className="text-primary">TRANSIT</span></h4>
            </div>
            <p className="text-secondary opacity-75 small mb-4 pe-lg-5">
              Ghana's premier intelligent transport aggregator. Connecting the nation with safety, comfort, and reliability.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2 opacity-50 hover-opacity-100 transition-all"><Facebook size={18} /></a>
              <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2 opacity-50 hover-opacity-100 transition-all"><Twitter size={18} /></a>
              <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2 opacity-50 hover-opacity-100 transition-all"><Instagram size={18} /></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="fw-bold mb-4 opacity-50 uppercase small">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-secondary text-decoration-none small hover-text-primary">Home</Link></li>
              <li className="mb-2"><Link to="/search" className="text-secondary text-decoration-none small hover-text-primary">Search Trips</Link></li>
              <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none small hover-text-primary">About Us</Link></li>
              <li className="mb-2"><Link to="/operators" className="text-secondary text-decoration-none small hover-text-primary">Operators</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="fw-bold mb-4 opacity-50 uppercase small">Legal</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/privacy-policy" className="text-secondary text-decoration-none small hover-text-primary">Privacy Policy</Link></li>
              <li className="mb-2"><Link to="/terms-of-service" className="text-secondary text-decoration-none small hover-text-primary">Terms of Service</Link></li>
              <li className="mb-2"><Link to="/cookie-policy" className="text-secondary text-decoration-none small hover-text-primary">Cookie Policy</Link></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-4">
            <h6 className="fw-bold mb-3">Contact Us</h6>
            <ul className="list-unstyled">
              <li className="d-flex align-items-start mb-3 opacity-75">
                <MapPin size={20} className="text-primary me-3 mt-1" />
                <span>KUMASI Ghana KNUST, Ashanti Region</span>
              </li>
              <li className="d-flex align-items-center mb-3 opacity-75">
                <Phone size={20} className="text-primary me-3" />
                <span>0550019084</span>
              </li>
              <li className="d-flex align-items-center mb-3 opacity-75">
                <Mail size={20} className="text-primary me-3" />
                <span>support@amaghanatransit.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-secondary opacity-25" />
        
        <div className="text-center mt-3">
          <p className="text-secondary small mb-0">
            &copy; {currentYear} AMA GHANA TRANSIT. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
