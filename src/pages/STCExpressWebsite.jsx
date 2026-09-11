import React from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Star, Bus, Shield, Users, Award, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STCExpressWebsite = () => {
  const navigate = useNavigate();

  return (
    <div className="operator-website">
      {/* Header */}
      <header className="bg-danger text-white py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-outline-light"
                onClick={() => navigate('/operators')}
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h2 className="mb-0 fw-bold text-warning">STC EXPRESS</h2>
                <small className="text-light">Inter-city bus transport services</small>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-warning text-dark">Book Now</button>
              <button className="btn btn-outline-light">Contact</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section bg-warning text-dark py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">Connecting Ghana Nationwide</h1>
              <p className="lead mb-4">Ghana's largest inter-city bus network. Reliable, affordable, and comprehensive coverage across all major cities and regional capitals.</p>
              <div className="d-flex gap-3">
                <button className="btn btn-danger btn-lg">View Routes</button>
                <button className="btn btn-outline-dark btn-lg">Schedule</button>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="/api/placeholder/600/400" alt="STC Express Bus" className="img-fluid rounded-3 shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Why Travel with STC Express?</h2>
          <div className="row g-4">
            <div className="col-md-3 text-center">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <Globe className="text-danger mb-3" size={48} />
                <h5>Nationwide Coverage</h5>
                <p className="text-secondary small">250 buses serving all major cities and regional capitals across Ghana.</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <Users className="text-danger mb-3" size={48} />
                <h5>High Capacity</h5>
                <p className="text-secondary small">Modern fleet designed for comfort and efficiency on long-distance routes.</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <Clock className="text-danger mb-3" size={48} />
                <h5>Frequent Service</h5>
                <p className="text-secondary small">Multiple departures daily on popular routes. Never wait long for your journey.</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <Shield className="text-danger mb-3" size={48} />
                <h5>Reliable Service</h5>
                <p className="text-secondary small">95% on-time performance with dedicated customer support available 24/7.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Routes */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Popular Routes</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="mb-1">Kumasi → Tamale</h5>
                      <small className="text-secondary">Super Galloper Service</small>
                    </div>
                    <span className="badge bg-danger">Daily</span>
                  </div>
                  <div className="row text-center">
                    <div className="col-4">
                      <h6 className="text-danger mb-0">02:00 PM</h6>
                      <small>Departure</small>
                    </div>
                    <div className="col-4">
                      <h6 className="text-danger mb-0">6h 30m</h6>
                      <small>Duration</small>
                    </div>
                    <div className="col-4">
                      <h6 className="text-danger mb-0">GHS 200</h6>
                      <small>Fare</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="mb-1">Accra → Cape Coast</h5>
                      <small className="text-secondary">Standard Service</small>
                    </div>
                    <span className="badge bg-danger">Daily</span>
                  </div>
                  <div className="row text-center">
                    <div className="col-4">
                      <h6 className="text-danger mb-0">09:00 AM</h6>
                      <small>Departure</small>
                    </div>
                    <div className="col-4">
                      <h6 className="text-danger mb-0">3h 00m</h6>
                      <small>Duration</small>
                    </div>
                    <div className="col-4">
                      <h6 className="text-danger mb-0">GHS 85</h6>
                      <small>Fare</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-5 bg-danger text-white">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Contact STC Express</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="row g-4">
                <div className="col-md-4 text-center">
                  <Phone className="text-warning mb-2" size={32} />
                  <h6>Call Us</h6>
                  <p className="small mb-0">+233 30 222 5678</p>
                </div>
                <div className="col-md-4 text-center">
                  <Mail className="text-warning mb-2" size={32} />
                  <h6>Email Us</h6>
                  <p className="small mb-0">info@stcexpress.com</p>
                </div>
                <div className="col-md-4 text-center">
                  <MapPin className="text-warning mb-2" size={32} />
                  <h6>Visit Us</h6>
                  <p className="small mb-0">Tema Station & Accra Central</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-0">&copy; 2026 STC Express. All rights reserved. | Powered by AMA Ghana Transit</p>
        </div>
      </footer>
    </div>
  );
};

export default STCExpressWebsite;