import React from 'react';
import { Shield, Target, Users, Award, MapPin, Bus } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page bg-light min-vh-100 animate-fade-in">
      {/* Hero Header */}
      <section className="bg-dark text-white py-5 mb-5 position-relative overflow-hidden">
        <div className="container py-5 position-relative z-1 text-center">
            <h1 className="display-4 fw-bold mb-3">Pioneering Ghana's <span className="text-primary">Transport Future</span></h1>
              <p className="lead opacity-75 mb-4 px-lg-5">
                AMA GHANA TRANSIT is an intelligent transport aggregator dedicated to centralizing and modernizing bus booking services across our beautiful nation.
              </p>
        </div>
        <div className="position-absolute translate-middle-y opacity-25 start-0 top-50">
            <Bus size={400} className="text-primary" />
        </div>
      </section>

      <div className="container py-4">
        {/* Vision & Mission */}
        <div className="row g-5 align-items-center mb-5">
            <div className="col-md-6">
                <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800" alt="Bus" className="img-fluid rounded-4 shadow" />
            </div>
            <div className="col-md-6">
                <span className="badge bg-primary-subtle text-primary border border-primary px-3 py-2 rounded-pill mb-3 fw-bold">OUR VISION</span>
                <h2 className="fw-bold mb-4">A Unified Booking System for Everyone</h2>
                <p className="text-secondary lead">
                    We believe that transport should be accessible, transparent, and intelligent. By bringing together VIP, STC, Metro Mass, and others, we provide passengers with choice and convenience.
                </p>
                <div className="row g-4 mt-2">
                    <div className="col-sm-6">
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <Target className="text-primary" />
                            <h6 className="fw-bold mb-0">Transparency</h6>
                        </div>
                        <p className="small text-secondary">Real-time seat availability and honest pricing for all routes.</p>
                    </div>
                    <div className="col-sm-6">
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <Shield className="text-primary" />
                            <h6 className="fw-bold mb-0">Security</h6>
                        </div>
                        <p className="small text-secondary">Safe digital payments and verified bus operators.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Stats Section */}
        <section className="glass-card p-5 mb-5 text-center">
            <div className="row g-4">
                <div className="col-md-3">
                    <h2 className="display-5 fw-bold text-primary">50+</h2>
                    <p className="text-secondary mb-0 fw-semibold">Active Routes</p>
                </div>
                <div className="col-md-3">
                    <h2 className="display-5 fw-bold text-primary">12</h2>
                    <p className="text-secondary mb-0 fw-semibold">Partner Operators</p>
                </div>
                <div className="col-md-3">
                    <h2 className="display-5 fw-bold text-primary">100k+</h2>
                    <p className="text-secondary mb-0 fw-semibold">Happy Travelers</p>
                </div>
                <div className="col-md-3">
                    <h2 className="display-5 fw-bold text-primary">16</h2>
                    <p className="text-secondary mb-0 fw-semibold">Regions Covered</p>
                </div>
            </div>
        </section>

        {/* Values */}
        <div className="text-center mb-5">
            <h2 className="fw-bold mb-5">Why Choose Us?</h2>
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="p-4 bg-white rounded-4 shadow-sm h-100 hover-lift">
                        <Award size={48} className="text-primary mb-3" />
                        <h5 className="fw-bold">Premium Experience</h5>
                        <p className="text-secondary">From executive coaches to state-of-the-art booking portals.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-4 bg-white rounded-4 shadow-sm h-100 hover-lift">
                        <Users size={48} className="text-primary mb-3" />
                        <h5 className="fw-bold">Passenger Focused</h5>
                        <p className="text-secondary">Designed with the traveler in mind, ensuring a stress-free journey.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-4 bg-white rounded-4 shadow-sm h-100 hover-lift">
                        <MapPin size={48} className="text-primary mb-3" />
                        <h5 className="fw-bold">Nationwide Local</h5>
                        <p className="text-secondary">Locally owned and operated, covering every corner of Ghana.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
