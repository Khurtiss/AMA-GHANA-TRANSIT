import React from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Star, Bus, Shield, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VIPTransportWebsite = () => {
  const navigate = useNavigate();

  return (
    <div className="operator-website">
      {/* Header */}
      <header className="bg-dark text-white py-4">
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
                <h2 className="mb-0 fw-bold text-primary">VIP TRANSPORT</h2>
                <small className="text-secondary">Leading the way in executive travel</small>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-primary">Book Now</button>
              <button className="btn btn-outline-light">Contact</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">Executive Travel Redefined</h1>
              <p className="lead mb-4">Experience luxury and comfort on Ghana's most prestigious bus routes. From Accra to Kumasi, we set the standard for executive transportation.</p>
              <div className="d-flex gap-3">
                <button className="btn btn-dark btn-lg">View Routes</button>
                <button className="btn btn-outline-light btn-lg">Schedule</button>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="/api/placeholder/600/400" alt="VIP Transport Bus" className="img-fluid rounded-3 shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Why Choose VIP Transport?</h2>
          <div className="row g-4">
            <div className="col-md-3 text-center">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <Shield className="text-primary mb-3" size={48} />
                <h5>Safety First</h5>
                <p className="text-secondary small">GPS tracking, professional drivers, and regular maintenance ensure your safety.</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <Star className="text-primary mb-3" size={48} />
                <h5>Luxury Comfort</h5>
                <p className="text-secondary small">Reclining seats, AC, WiFi, and refreshments make every journey comfortable.</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <Clock className="text-primary mb-3" size={48} />
                <h5>Punctuality</h5>
                <p className="text-secondary small">98% on-time departure record. We respect your time and schedule.</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <Award className="text-primary mb-3" size={48} />
                <h5>Award Winning</h5>
                <p className="text-secondary small">Recognized as Ghana's Best Transport Company 2025 by Ghana Tourism Awards.</p>
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
                      <h5 className="mb-1">Accra → Kumasi</h5>
                      <small className="text-secondary">Executive Service</small>
                    </div>
                    <span className="badge bg-primary">Daily</span>
                  </div>
                  <div className="row text-center">
                    <div className="col-4">
                      <h6 className="text-primary mb-0">08:30 AM</h6>
                      <small>Departure</small>
                    </div>
                    <div className="col-4">
                      <h6 className="text-primary mb-0">5h 00m</h6>
                      <small>Duration</small>
                    </div>
                    <div className="col-4">
                      <h6 className="text-primary mb-0">GHS 120</h6>
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
                      <h5 className="mb-1">Kumasi → Accra</h5>
                      <small className="text-secondary">Executive Service</small>
                    </div>
                    <span className="badge bg-primary">Daily</span>
                  </div>
                  <div className="row text-center">
                    <div className="col-4">
                      <h6 className="text-primary mb-0">02:00 PM</h6>
                      <small>Departure</small>
                    </div>
                    <div className="col-4">
                      <h6 className="text-primary mb-0">5h 00m</h6>
                      <small>Duration</small>
                    </div>
                    <div className="col-4">
                      <h6 className="text-primary mb-0">GHS 120</h6>
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
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Contact VIP Transport</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="row g-4">
                <div className="col-md-4 text-center">
                  <Phone className="text-primary mb-2" size={32} />
                  <h6>Call Us</h6>
                  <p className="small mb-0">+233 30 222 1234</p>
                </div>
                <div className="col-md-4 text-center">
                  <Mail className="text-primary mb-2" size={32} />
                  <h6>Email Us</h6>
                  <p className="small mb-0">info@viptransport.com</p>
                </div>
                <div className="col-md-4 text-center">
                  <MapPin className="text-primary mb-2" size={32} />
                  <h6>Visit Us</h6>
                  <p className="small mb-0">Accra Central Station</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-4">
        <div className="container text-center">
          <p className="mb-0">&copy; 2026 VIP Transport. All rights reserved. | Powered by AMA Ghana Transit</p>
        </div>
      </footer>
    </div>
  );
};

export default VIPTransportWebsite;