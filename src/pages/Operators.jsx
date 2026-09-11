import React, { useState } from 'react';
import { Bus, MapPin, Star, Phone, Globe, ChevronRight, Clock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Operators = () => {
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [showRoutesModal, setShowRoutesModal] = useState(false);
  const navigate = useNavigate();

  const operators = [
    {
      name: 'VIP TRANSPORT',
      logo: 'VIP',
      tagline: 'Leading the way in executive travel.',
      coverage: 'Accra, Kumasi, Sunyani, Tamale',
      rating: 4.8,
      buses: 120,
      contact: '+233 30 222 1234',
      routes: [
        { from: 'Accra', to: 'Kumasi', duration: '5h 30m', frequency: 'Every 2 hours', price: 'GHS 120' },
        { from: 'Accra', to: 'Sunyani', duration: '6h 15m', frequency: 'Daily 3x', price: 'GHS 140' },
        { from: 'Kumasi', to: 'Tamale', duration: '4h 45m', frequency: 'Daily 2x', price: 'GHS 100' },
        { from: 'Accra', to: 'Tamale', duration: '10h 15m', frequency: 'Daily 1x', price: 'GHS 200' }
      ]
    },
    {
      name: 'STC EXPRESS',
      logo: 'STC',
      tagline: 'Inter-city bus transport services.',
      coverage: 'All major cities and regional capitals',
      rating: 4.5,
      buses: 250,
      contact: '+233 30 222 5678',
      routes: [
        { from: 'Accra', to: 'Kumasi', duration: '5h 00m', frequency: 'Every hour', price: 'GHS 110' },
        { from: 'Accra', to: 'Takoradi', duration: '4h 30m', frequency: 'Every 3 hours', price: 'GHS 95' },
        { from: 'Kumasi', to: 'Tamale', duration: '4h 30m', frequency: 'Daily 4x', price: 'GHS 95' },
        { from: 'Accra', to: 'Cape Coast', duration: '3h 15m', frequency: 'Every 2 hours', price: 'GHS 75' },
        { from: 'Sunyani', to: 'Accra', duration: '5h 45m', frequency: 'Daily 3x', price: 'GHS 125' }
      ]
    },
    {
      name: 'METRO MASS',
      logo: 'MM',
      tagline: 'Reliable transport for the masses.',
      coverage: 'Nationwide coverage including rural areas',
      rating: 4.0,
      buses: 500,
      contact: '+233 30 222 9012',
      routes: [
        { from: 'Accra', to: 'Kumasi', duration: '6h 00m', frequency: 'Every 30 min', price: 'GHS 85' },
        { from: 'Accra', to: 'Takoradi', duration: '5h 00m', frequency: 'Every hour', price: 'GHS 75' },
        { from: 'Kumasi', to: 'Tamale', duration: '5h 30m', frequency: 'Daily 6x', price: 'GHS 80' },
        { from: 'Accra', to: 'Cape Coast', duration: '3h 45m', frequency: 'Every 45 min', price: 'GHS 65' },
        { from: 'Sunyani', to: 'Accra', duration: '6h 30m', frequency: 'Daily 4x', price: 'GHS 90' },
        { from: 'Wa', to: 'Accra', duration: '8h 00m', frequency: 'Daily 2x', price: 'GHS 150' }
      ]
    },
    {
      name: 'OA TRAVELS',
      logo: 'OA',
      tagline: 'Comfortable and safe road travel.',
      coverage: 'Accra, Kumasi, Cape Coast, Takoradi',
      rating: 4.3,
      buses: 85,
      contact: '+233 30 223 3456',
      routes: [
        { from: 'Accra', to: 'Kumasi', duration: '5h 15m', frequency: 'Every 3 hours', price: 'GHS 100' },
        { from: 'Accra', to: 'Takoradi', duration: '4h 45m', frequency: 'Daily 3x', price: 'GHS 90' },
        { from: 'Accra', to: 'Cape Coast', duration: '3h 30m', frequency: 'Every 4 hours', price: 'GHS 70' },
        { from: 'Kumasi', to: 'Cape Coast', duration: '4h 00m', frequency: 'Daily 2x', price: 'GHS 85' }
      ]
    }
  ];

  const handleViewRoutes = (operator) => {
    setSelectedOperator(operator);
    setShowRoutesModal(true);
  };

  const closeModal = () => {
    setShowRoutesModal(false);
    setSelectedOperator(null);
  };

  return (
    <div className="operators-page bg-light min-vh-100 py-5 animate-fade-in">
      <div className="container">
        <div className="text-center mb-5">
            <h2 className="fw-bold display-5">Our Partner <span className="text-primary">Operators</span></h2>
            <p className="text-secondary fs-5">We collaborate with the most reliable transport companies in Ghana.</p>
        </div>

        <div className="row g-4">
            {operators.map((op, i) => (
                <div key={i} className="col-lg-6">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 bus-card hover-lift">
                        <div className="row g-0 h-100">
                            <div className="col-md-4 bg-dark text-white d-flex align-items-center justify-content-center p-4">
                                <div className="text-center">
                                    <div className="bg-primary text-dark fw-bold rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', fontSize: '1.5rem' }}>
                                        {op.logo}
                                    </div>
                                    <h5 className="fw-bold mb-0">{op.name}</h5>
                                </div>
                            </div>
                            <div className="col-md-8 p-4 d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h6 className="text-secondary italic">{op.tagline}</h6>
                                    <div className="d-flex align-items-center gap-1 text-primary">
                                        <Star size={16} fill="currentColor" />
                                        <span className="fw-bold text-dark">{op.rating}</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <p className="small mb-1"><MapPin size={14} className="text-primary me-2" /> <strong>Coverage:</strong> {op.coverage}</p>
                                    <p className="small mb-1"><Bus size={14} className="text-primary me-2" /> <strong>Fleet Size:</strong> {op.buses} Buses</p>
                                    <p className="small mb-0"><Phone size={14} className="text-primary me-2" /> <strong>Contact:</strong> {op.contact}</p>
                                </div>
                                <div className="mt-auto d-flex gap-2">
                                    <button 
                                        className="btn btn-primary flex-grow-1 fw-bold"
                                        onClick={() => {
                                            const routeMap = {
                                                'VIP TRANSPORT': '/operators/vip-transport',
                                                'STC EXPRESS': '/operators/stc-express',
                                                'METRO MASS': '/operators/metro-mass',
                                                'OA TRAVELS': '/operators/oa-travels'
                                            };
                                            navigate(routeMap[op.name]);
                                        }}
                                    >
                                        View Routes
                                    </button>
                                    <button 
                                        className="btn btn-outline-dark"
                                        onClick={() => {
                                            const routeMap = {
                                                'VIP TRANSPORT': '/operators/vip-transport',
                                                'STC EXPRESS': '/operators/stc-express',
                                                'METRO MASS': '/operators/metro-mass',
                                                'OA TRAVELS': '/operators/oa-travels'
                                            };
                                            navigate(routeMap[op.name]);
                                        }}
                                    >
                                        <Globe size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="glass-card mt-5 p-5 text-center bg-dark text-white">
            <h3 className="fw-bold mb-3">Are you a Bus Operator?</h3>
            <p className="opacity-75 mb-4 px-lg-5">Join the AMA GHANA TRANSIT network and reach thousands of passengers daily. Digitise your operations and manage your fleet efficiently.</p>
            <button 
                className="btn btn-primary px-5 py-3 fw-bold fs-5"
                onClick={() => alert('Partnership inquiry submitted! Our team will contact you within 24 hours.')}
            >
                Partner With Us <ChevronRight size={24} />
            </button>
        </div>

        {/* Routes Modal */}
        {showRoutesModal && selectedOperator && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={closeModal}>
            <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content border-0 shadow-lg rounded-4">
                <div className="modal-header bg-dark text-white border-0 rounded-top-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary text-dark fw-bold rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>
                      {selectedOperator.logo}
                    </div>
                    <div>
                      <h5 className="modal-title mb-0 fw-bold">{selectedOperator.name} Routes</h5>
                      <small className="opacity-75">{selectedOperator.routes.length} active routes</small>
                    </div>
                  </div>
                  <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
                </div>
                <div className="modal-body p-0">
                  <div className="list-group list-group-flush">
                    {selectedOperator.routes.map((route, index) => (
                      <div key={index} className="list-group-item border-0 px-4 py-3">
                        <div className="row align-items-center">
                          <div className="col-md-6">
                            <div className="d-flex align-items-center gap-3">
                              <div className="route-stops">
                                <div className="route-dot route-start"></div>
                                <div className="route-line"></div>
                                <div className="route-dot route-end"></div>
                              </div>
                              <div>
                                <h6 className="mb-0 fw-bold">{route.from} → {route.to}</h6>
                                <small className="text-secondary">{route.frequency}</small>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 text-center">
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              <Clock size={16} className="text-primary" />
                              <span className="small fw-bold">{route.duration}</span>
                            </div>
                          </div>
                          <div className="col-md-3 text-end">
                            <div className="fw-bold text-primary fs-5">{route.price}</div>
                            <small className="text-secondary">Starting from</small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer border-0 bg-light rounded-bottom-4">
                  <div className="w-100 text-center">
                    <p className="text-secondary small mb-3">
                      Prices are starting fares and may vary based on service class and availability.
                    </p>
                    <button className="btn btn-primary px-4 fw-bold" onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Operators;
