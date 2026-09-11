import React from 'react';
import { CheckCircle, MapPin, Calendar, Clock, User, CreditCard, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingSummary = () => {
  return (
    <div className="booking-summary min-vh-100 bg-light py-5 animate-fade-in">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="bg-primary p-4 text-center">
                <CheckCircle size={48} className="text-dark mb-2" />
                <h3 className="fw-bold mb-0">Booking Confirmation</h3>
                <p className="text-dark opacity-75 mb-0">Review your trip details before final payment</p>
              </div>
              
              <div className="card-body p-5">
                <div className="row g-4 mb-5">
                  <div className="col-md-6 border-end">
                    <h6 className="text-secondary uppercase small mb-3">Passenger Information</h6>
                    <div className="d-flex align-items-center gap-3 mb-2">
                       <div className="bg-light p-2 rounded-circle"><User size={20} className="text-primary" /></div>
                       <div>
                         <p className="fw-bold mb-0">Kwame Mensah</p>
                         <small className="text-secondary">kwame@example.com</small>
                       </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-secondary uppercase small mb-3">Trip Details</h6>
                    <div className="mb-2">
                      <p className="mb-1 fw-bold"><MapPin size={16} className="text-primary me-2" /> Accra &rarr; Kumasi</p>
                      <p className="mb-1 small"><Calendar size={16} className="text-primary me-2" /> 12 Oct, 2026</p>
                      <p className="mb-0 small"><Clock size={16} className="text-primary me-2" /> 08:30 AM (Morning Session)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-light rounded-4 p-4 mb-5">
                  <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                    <span className="fw-bold">Operator</span>
                    <span className="text-primary fw-bold">VIP TRANSPORT</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-secondary">Selected Seats</span>
                    <span className="fw-bold">Seat 12, Seat 13</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-secondary">Base Fare (x2)</span>
                    <span className="fw-bold">GHS 240.00</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                    <span className="text-secondary">Booking Fee</span>
                    <span className="fw-bold">GHS 10.00</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fs-5 fw-bold">Total Amount</span>
                    <h3 className="fw-bold text-dark mb-0">GHS 250.00</h3>
                  </div>
                </div>

                <div className="payment-options mb-5">
                  <h6 className="fw-bold mb-4">Payment Method</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-check border rounded-3 p-3 pointer border-primary bg-primary bg-opacity-10 d-flex align-items-center gap-2">
                        <input className="form-check-input" type="radio" name="payment" id="momo" checked readOnly />
                        <label className="form-check-label fw-bold" htmlFor="momo">Mobile Money (MTN/AirtelTigo)</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check border rounded-3 p-3 pointer d-flex align-items-center gap-2">
                        <input className="form-check-input" type="radio" name="payment" id="card" />
                        <label className="form-check-label fw-bold" htmlFor="card">Credit / Debit Card</label>
                      </div>
                    </div>
                  </div>
                </div>

                <Link to="/digital-ticket" className="btn btn-dark w-100 py-3 fw-bold fs-5 shadow-sm d-flex align-items-center justify-content-center gap-2">
                  CONFIRM & RESERVE TICKET <ChevronRight size={24} />
                </Link>
                
                <p className="text-center text-secondary small mt-4">
                  By confirming, you agree to AMA GHANA TRANSIT Terms of Service and Refund Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
