import React from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Star, Bus, Shield, Users, Award, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OATravelsWebsite = () => {
  const navigate = useNavigate();

  return (
    <div className="operator-website">
      {/* Header */}
      <header className="bg-success text-white py-4">
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
                <h2 className="mb-0 fw-bold text-warning">OA TRAVELS</h2>
                <small className="text-light">Comfortable and safe road travel</small>
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
      <section className="hero-section bg-success text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">Comfort Meets Safety</h1>
              <p className="lead mb-4">Experience the perfect balance of comfort and safety on Ghana's most scenic routes. From Accra to coastal destinations, we make every journey memorable.</p>
              <div className="d-flex gap-3">
                <button className="btn btn-warning text-dark btn-lg">View Routes</button>
                <button className="btn btn-outline-light btn-lg">Schedule</button>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="/api/placeholder/600/400" alt="OA Travels Bus" className="img-fluid rounded-3 shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Why Choose OA Travels?</h2>
          <div className="row g-4">
            <div className="col-md-3 text-center">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <Sun className="text-success mb-3" size={48} />
                <h5>Scenic Routes</h5>
                <p className="text-secondary small">Specializing in coastal and scenic routes with breathtaking views.</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <Shield className="text-success mb-3" size={48} />
                <h5>Safety First</h5>
                <p className="text-secondary small">Advanced safety features and experienced drivers on all routes.</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <Users className="text-success mb-3" size={48} />
                <h5>Personal Touch</h5>
                <p className="text-secondary small">Smaller fleet size ensures personalized service and attention.</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="bg-white p-4 rounded-3 shadow-sm h-100">
                <Award className="text-success mb-3" size={48} />
                <h5>Quality Service</h5>
                <p className="text-secondary small">Consistently rated highly for comfort and customer satisfaction.</p>
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
                      <h5 className="mb-1">Accra → Takoradi</h5>
                      <small className="text-secondary">Standard Service</small>
                    </div>
                    <span className="badge bg-success">Daily</span>
                  </div>
                  <div className="row text-center">
                    <div className="col-4">
                      <h6 className="text-success mb-0">06:00 AM</h6>
                      <small>Departure</small>
                    </div>
                    <div className="col-4">
                      <h6 className="text-success mb-0">6h 00m</h6>
                      <small>Duration</small>
                    </div>
                    <div className="col-4">
                      <h6 className="text-success mb-0">GHS 100</h6>
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
                      <h5 className="mb-1">Cape Coast → Accra</h5>
                      <small className="text-secondary">Standard Service</small>
                    </div>
                    <span className="badge bg-success">Daily</span>
                  </div>
                  <div className="row text-center">
                    <div className="col-4">
                      <h6 className="text-success mb-0">03:00 PM</h6>
                      <small>Departure</small>
                    </div>
                    <div className="col-4">
                      <h6 className="text-success mb-0">3h 30m</h6>
                      <small>Duration</small>
                    </div>
                    <div className="col-4">
                      <h6 className="text-success mb-0">GHS 75</h6>
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
      <section className="py-5 bg-success text-white">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Contact OA Travels</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="row g-4">
                <div className="col-md-4 text-center">
                  <Phone className="text-warning mb-2" size={32} />
                  <h6>Call Us</h6>
                  <p className="small mb-0">+233 30 223 3456</p>
                </div>
                <div className="col-md-4 text-center">
                  <Mail className="text-warning mb-2" size={32} />
                  <h6>Email Us</h6>
                  <p className="small mb-0">info@oatravels.com</p>
                </div>
                <div className="col-md-4 text-center">
                  <MapPin className="text-warning mb-2" size={32} />
                  <h6>Visit Us</h6>
                  <p className="small mb-0">Accra & Cape Coast Stations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-0">&copy; 2026 OA Travels. All rights reserved. | Powered by AMA Ghana Transit</p>
        </div>
      </footer>
    </div>
  );
};

export default OATravelsWebsite;