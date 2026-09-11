import React from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Star, Bus, Shield, Users, Award, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MetroMassWebsite = () => {
  const navigate = useNavigate();

  return (
    <div className="operator-website">
      {/* Header */}
      <header className="bg-info text-white py-4">
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
                <h2 className="mb-0 fw-bold text-dark">METRO MASS</h2>
                <small className="text-light">Reliable transport for the masses</small>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-dark">Book Now</button>
              <button className="btn btn-outline-light">Contact</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section bg-info text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">Transport for Everyone</h1>
              <p className="lead mb-4">Ghana's largest public transport network. Affordable, accessible, and reliable transportation serving communities nationwide, including rural areas.</p>
              <div className="d-flex gap-3">
                <button className="btn btn-dark btn-lg">View Routes</button>
                <button className="btn btn-outline-light btn-lg">Schedule</button>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="/api/placeholder/600/400" alt="Metro Mass Bus" className="img-fluid rounded-3 shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Serving Communities Nationwide</h2>
          <div className="row g-4">
            <div className="col-md-3 text-center">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <Users className="text-info mb-3" size={48} />
                <h5>Mass Transit</h5>
                <p className="text-secondary small">500 buses serving urban and rural communities across all regions.</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <Heart className="text-info mb-3" size={48} />
                <h5>Community Focused</h5>
                <p className="text-secondary small">Dedicated to connecting communities and supporting local economies.</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <Shield className="text-info mb-3" size={48} />
                <h5>Safe & Reliable</h5>
                <p className="text-secondary small">Comprehensive safety standards and regular vehicle maintenance.</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <Award className="text-info mb-3" size={48} />
                <h5>Affordable</h5>
                <p className="text-secondary small">Competitive pricing making transportation accessible to all Ghanaians.</p>
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
                      <h5 className="mb-1">Sunyani → Accra</h5>
                      <small className="text-secondary">Budget Service</small>
                    </div>
                    <span className="badge bg-info">Daily</span>
                  </div>
                  <div className="row text-center">
                    <div className="col-4">
                      <h6 className="text-info mb-0">05:00 AM</h6>
                      <small>Departure</small>
                    </div>
                    <div className="col-4">
                      <h6 className="text-info mb-0">6h 00m</h6>
                      <small>Duration</small>
                    </div>
                    <div className="col-4">
                      <h6 className="text-info mb-0">GHS 85</h6>
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
                      <h5 className="mb-1">Tamale → Accra</h5>
                      <small className="text-secondary">Standard Service</small>
                    </div>
                    <span className="badge bg-info">Daily</span>
                  </div>
                  <div className="row text-center">
                    <div className="col-4">
                      <h6 className="text-info mb-0">04:30 AM</h6>
                      <small>Departure</small>
                    </div>
                    <div className="col-4">
                      <h6 className="text-info mb-0">10h 00m</h6>
                      <small>Duration</small>
                    </div>
                    <div className="col-4">
                      <h6 className="text-info mb-0">GHS 180</h6>
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
      <section className="py-5 bg-info text-white">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Contact Metro Mass</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="row g-4">
                <div className="col-md-4 text-center">
                  <Phone className="text-dark mb-2" size={32} />
                  <h6>Call Us</h6>
                  <p className="small mb-0">+233 30 222 9012</p>
                </div>
                <div className="col-md-4 text-center">
                  <Mail className="text-dark mb-2" size={32} />
                  <h6>Email Us</h6>
                  <p className="small mb-0">info@metromass.com</p>
                </div>
                <div className="col-md-4 text-center">
                  <MapPin className="text-dark mb-2" size={32} />
                  <h6>Visit Us</h6>
                  <p className="small mb-0">Stations nationwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-0">&copy; 2026 Metro Mass. All rights reserved. | Powered by AMA Ghana Transit</p>
        </div>
      </footer>
    </div>
  );
};

export default MetroMassWebsite;