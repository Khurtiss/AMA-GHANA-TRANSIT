import React, { useState } from 'react';
import { Truck, Info, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Simulated seat data (44 seats coach)
  const rows = 11;
  const seatsPerRow = 4;
  
  const toggleSeat = (id) => {
    if (id === 'reserved') return;
    if (selectedSeats.includes(id)) {
      setSelectedSeats(selectedSeats.filter(s => s !== id));
    } else {
      setSelectedSeats([...selectedSeats, id]);
    }
  };

  const isReserved = (id) => [3, 7, 12, 19, 24, 25, 30].includes(id);

  return (
    <div className="seat-selection min-vh-100 bg-light py-5 animate-fade-in">
      <div className="container">
        <div className="row g-4">
          {/* Seat Layout Column */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
              <h5 className="fw-bold mb-5">Select Your Preferred Seats</h5>
              
              <div className="bus-layout mx-auto bg-white p-4 rounded-5 border-4 border-dark overflow-auto" style={{ maxWidth: '350px', position: 'relative' }}>
                {/* Driver Section */}
                <div className="d-flex justify-content-between mb-5 px-3">
                  <div className="bg-secondary text-white rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                    <Truck size={24} />
                  </div>
                  <div className="opacity-0" style={{ width: '45px' }}></div>
                  <div className="opacity-0" style={{ width: '45px' }}></div>
                  <div className="opacity-0" style={{ width: '45px' }}></div>
                </div>

                {/* Seats Grid */}
                {[...Array(rows)].map((_, rowIndex) => (
                  <div key={rowIndex} className="d-flex justify-content-between mb-3 px-1">
                    {[...Array(seatsPerRow)].map((_, seatIndex) => {
                      const seatNum = rowIndex * seatsPerRow + seatIndex + 1;
                      const reserved = isReserved(seatNum);
                      const selected = selectedSeats.includes(seatNum);
                      
                      return (
                        <div 
                          key={seatNum}
                          onClick={() => toggleSeat(seatNum)}
                          className={`seat d-flex align-items-center justify-content-center rounded-3 fw-bold small transition-all ${
                            reserved ? 'bg-secondary text-white opacity-25 cursor-not-allowed' :
                            selected ? 'bg-primary text-dark' : 'bg-light text-secondary border'
                          }`}
                          style={{ 
                            width: '45px', 
                            height: '45px', 
                            cursor: reserved ? 'not-allowed' : 'pointer',
                            marginRight: seatIndex === 1 ? '40px' : '0' // Aisle
                          }}
                        >
                          {seatNum}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="d-flex justify-content-center gap-4 mt-5 pt-3 border-top">
                <div className="d-flex align-items-center gap-2 small">
                  <div className="rounded-2 border" style={{ width: '20px', height: '20px' }}></div> Available
                </div>
                <div className="d-flex align-items-center gap-2 small">
                  <div className="rounded-2 bg-primary" style={{ width: '20px', height: '20px' }}></div> Selected
                </div>
                <div className="d-flex align-items-center gap-2 small">
                  <div className="rounded-2 bg-secondary opacity-25" style={{ width: '20px', height: '20px' }}></div> Reserved
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary Column */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
              <h5 className="fw-bold mb-4">Trip Summary</h5>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary">Operator</span>
                  <span className="fw-bold">VIP TRANSPORT</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary">Route</span>
                  <span className="fw-bold">Accra &rarr; Kumasi</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary">Date</span>
                  <span className="fw-bold">12 Oct, 2026 | 08:30 AM</span>
                </div>
              </div>

              <div className="border-top pt-4 mb-4">
                <p className="fw-bold mb-3">Selected Seats ({selectedSeats.length})</p>
                <div className="d-flex flex-wrap gap-2">
                  {selectedSeats.length > 0 ? (
                    selectedSeats.map(id => (
                      <span key={id} className="badge bg-primary text-dark px-3 py-2 rounded-3">Seat {id}</span>
                    ))
                  ) : (
                    <span className="text-secondary italic">No seats selected yet</span>
                  )}
                </div>
              </div>

              <div className="border-top pt-4 mb-5">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="fs-5">Total Price</span>
                  <h3 className="fw-bold mb-0">GHS {selectedSeats.length * 120}</h3>
                </div>
                <small className="text-secondary">*Prices include VAT and platform fees</small>
              </div>

              <Link 
                to={selectedSeats.length > 0 ? "/booking-summary" : "#"} 
                className={`btn btn-dark w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 ${selectedSeats.length === 0 ? 'disabled' : ''}`}
              >
                PROCEED TO CHECKOUT <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
