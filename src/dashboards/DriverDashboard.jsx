import React, { useState } from 'react';
import { MapPin, Users, Clock, AlertTriangle, ChevronRight, CheckCircle2, FileText, Fuel, Settings, Phone } from 'lucide-react';

const DriverDashboard = () => {
  const [activeView, setActiveView] = useState('overview');

  const assignedTrips = [
    {
      id: 'TRIP-102',
      route: 'Accra → Kumasi',
      departure: '08:30 AM',
      bus: 'GV-202-26',
      passengers: 42,
      status: 'Ready'
    }
  ];

  const manifest = [
    { name: 'Kojo Antwi', seat: '1A', status: 'Boarded' },
    { name: 'Ama Serwaa', seat: '1B', status: 'Boarded' },
    { name: 'Kwame Boateng', seat: '2A', status: 'Checked-in' },
    { name: 'Efua Mansa', seat: '2B', status: 'Paid' },
  ];

  const renderContent = () => {
    switch(activeView) {
      case 'manifest':
        return (
          <div className="card border-0 shadow-sm rounded-4 p-4 animate-fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0 text-dark">Passenger Manifest: {assignedTrips[0].id}</h5>
              <button className="btn btn-outline-dark btn-sm" onClick={() => setActiveView('overview')}>Back to Overview</button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="bg-light">
                  <tr>
                    <th>Seat</th>
                    <th>Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {manifest.map((p, i) => (
                    <tr key={i}>
                      <td className="fw-bold">{p.seat}</td>
                      <td>{p.name}</td>
                      <td><span className={`badge ${p.status === 'Boarded' ? 'bg-success' : 'bg-primary'} px-3 py-1`}>{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn btn-primary mt-3 w-100 py-3 fw-bold">MARK ALL AS BOARDED</button>
          </div>
        );
      case 'fuel':
        return (
          <div className="card border-0 shadow-sm rounded-4 p-4 animate-fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0 text-dark">Daily Fuel Log</h5>
              <button className="btn btn-outline-dark btn-sm" onClick={() => setActiveView('overview')}>Back</button>
            </div>
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-bold">Fuel Amount (Liters)</label>
                <input type="number" className="form-control bg-light border-0 py-2" placeholder="e.g. 50" />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Cost (GHS)</label>
                <input type="number" className="form-control bg-light border-0 py-2" placeholder="e.g. 600" />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold">Station Name</label>
                <input type="text" className="form-control bg-light border-0 py-2" placeholder="GOIL, Shell, etc." />
              </div>
              <button className="btn btn-dark mt-3 py-3 fw-bold">SUBMIT LOG</button>
            </form>
          </div>
        );
      default:
        return (
          <div className="row g-4">
            <div className="col-lg-8">
              <h5 className="fw-bold mb-4">Current Assigned Trip</h5>
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                <div className="bg-primary p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold mb-0 text-dark">ACTIVE TRIP: {assignedTrips[0].id}</h6>
                    <span className="badge bg-dark text-white px-3 py-2">DEPARTING IN 25 MINS</span>
                  </div>
                </div>
                <div className="card-body p-4">
                  <div className="row align-items-center mb-4 text-center">
                    <div className="col-5">
                      <h2 className="fw-bold mb-0">Accra</h2>
                      <small className="text-secondary">Circle Terminal</small>
                    </div>
                    <div className="col-2">
                       <ChevronRight className="text-primary" />
                    </div>
                    <div className="col-5">
                      <h2 className="fw-bold mb-0">Kumasi</h2>
                      <small className="text-secondary">Adum Terminal</small>
                    </div>
                  </div>
                  <div className="d-flex gap-3 mt-4">
                    <button className="btn btn-dark flex-grow-1 py-3 fw-bold d-flex align-items-center justify-content-center gap-2" onClick={() => setActiveView('manifest')}>
                      <Users size={20} /> VIEW MANIFEST
                    </button>
                    <button className="btn btn-primary px-5 py-3 fw-bold">START TRIP</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                <h6 className="fw-bold mb-4">Quick Actions</h6>
                <div className="d-grid gap-2">
                  <button className="btn btn-outline-dark text-start d-flex align-items-center justify-content-between py-3" onClick={() => setActiveView('fuel')}>
                    <span><Fuel size={18} className="me-2" /> Fuel Log</span> <ChevronRight size={16} />
                  </button>
                  <button className="btn btn-outline-dark text-start d-flex align-items-center justify-content-between py-3">
                    <span><Settings size={18} className="me-2" /> Maintenance</span> <ChevronRight size={16} />
                  </button>
                  <button className="btn btn-outline-dark text-start d-flex align-items-center justify-content-between py-3">
                    <span><Phone size={18} className="me-2" /> Contact Terminal</span> <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="driver-dashboard bg-light min-vh-100 py-4 animate-fade-in">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-12">
            <div className="glass-card p-4 d-flex justify-content-between align-items-center bg-dark text-white rounded-4 shadow">
              <div>
                <h3 className="fw-bold mb-0 text-primary">Driver Portal</h3>
                <p className="opacity-75 mb-0 small">Emmanuel Boateng • VIP Transport</p>
              </div>
              <div className="bg-success text-white px-3 py-1 rounded-pill fw-bold small">ON DUTY</div>
            </div>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default DriverDashboard;
