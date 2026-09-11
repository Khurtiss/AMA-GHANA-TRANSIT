import React, { useState } from 'react';
import { Bus, Map, Users, TrendingUp, Plus, ChevronRight, Settings, UserPlus, MessageCircle, Star, X, Truck, LogOut } from 'lucide-react';
import ContactTerminal from '../pages/ContactTerminal';


const OperatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('routes');
  const [showTerminal, setShowTerminal] = useState(false);
  const [showAddRoute, setShowAddRoute] = useState(false);
  const [showAssignDriver, setShowAssignDriver] = useState(false);
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [showCompanySettings, setShowCompanySettings] = useState(false);
  const [showFleetView, setShowFleetView] = useState(false);

  const stats = [
    { label: 'Active Buses', value: '45', icon: <Bus />, color: 'primary' },
    { label: 'Daily Bookings', value: '1,280', icon: <Users />, color: 'success' },
    { label: 'Revenue (GHS)', value: '32,500', icon: <TrendingUp />, color: 'info' },
    { label: 'Active Routes', value: '12', icon: <Map />, color: 'warning' }
  ];

  const routes = [
    { path: 'Accra - Kumasi', freq: 'Every 30m', price: 'GHS 120', status: 'Active' },
    { path: 'Kumasi - Tamale', freq: 'Daily (2x)', price: 'GHS 200', status: 'Active' },
    { path: 'Accra - Cape Coast', freq: 'Hourly', price: 'GHS 60', status: 'Maintenance' },
  ];

  const renderContent = () => {
    return (
      <div className="row g-4 animate-fade-in">
        <div className="col-lg-8">
          {showTerminal ? (
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
               <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0">Terminal Support Messaging</h5>
                  <button className="btn btn-sm btn-light" onClick={() => setShowTerminal(false)}>Back to Routes</button>
               </div>
               <ContactTerminal role="Operator" />
            </div>
          ) : (
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                 <h5 className="fw-bold mb-0">Manage Routes</h5>
                 <button className="btn btn-primary btn-sm d-flex align-items-center gap-2 fw-bold" onClick={() => setShowAddRoute(true)}>
                    <Plus size={16} /> ADD NEW ROUTE
                 </button>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="bg-light small uppercase">
                    <tr>
                      <th>Route Path</th>
                      <th>Freq</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {routes.map((r, i) => (
                      <tr key={i}>
                        <td className="fw-bold">{r.path}</td>
                        <td className="small text-secondary">{r.freq}</td>
                        <td className="fw-bold text-primary">{r.price}</td>
                        <td><span className={`badge ${r.status === 'Active' ? 'bg-success' : 'bg-warning'} px-3 py-1`}>{r.status}</span></td>
                        <td><button className="btn btn-sm btn-light"><ChevronRight size={16} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h5 className="fw-bold mb-4">Quick Operations</h5>
            <div className="d-grid gap-2">
              <button 
                className="btn btn-outline-dark text-start p-3 rounded-3 d-flex justify-content-between align-items-center"
                onClick={() => setShowFleetView(true)}
              >
                <div className="d-flex align-items-center gap-2">
                  <Bus size={18} className="text-secondary" />
                  <span>Fleet Overview</span>
                </div>
                <ChevronRight size={16} />
              </button>
              <button 
                className="btn btn-outline-dark text-start p-3 rounded-3 d-flex justify-content-between align-items-center"
                onClick={() => setShowAssignDriver(true)}
              >
                <div className="d-flex align-items-center gap-2">
                  <UserPlus size={18} className="text-primary" />
                  <span>Assign Driver</span>
                </div>
                <ChevronRight size={16} />
              </button>
              <button 
                className="btn btn-outline-dark text-start p-3 rounded-3 d-flex justify-content-between align-items-center"
                onClick={() => setShowMaintenance(true)}
              >
                <div className="d-flex align-items-center gap-2">
                  <Settings size={18} className="text-primary" />
                  <span>Maintenance Log</span>
                </div>
                <ChevronRight size={16} />
              </button>
              <button
                className="btn text-start p-3 rounded-3 d-flex justify-content-between align-items-center fw-bold"
                style={{ background: showTerminal ? 'var(--ghana-gold)' : 'rgba(252,209,22,0.1)', color: 'var(--ghana-black)', border: '1px solid rgba(252,209,22,0.4)' }}
                onClick={() => setShowTerminal(!showTerminal)}>
                <div className="d-flex align-items-center gap-2">
                  <MessageCircle size={18} />
                  <span>Contact Terminal Support</span>
                </div>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>


          <div className="card border-0 shadow-sm rounded-4 p-4 bg-dark text-white">
            <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <TrendingUp size={20} className="text-primary" /> Performance
            </h6>
            <div className="d-flex justify-content-between mb-1">
              <small className="opacity-50">Fleet Utilization</small>
              <small className="fw-bold">88%</small>
            </div>
            <div className="progress bg-secondary bg-opacity-25 mb-3" style={{ height: '6px' }}>
              <div className="progress-bar bg-primary" style={{ width: '88%' }}></div>
            </div>
            <p className="small text-success mb-0 d-flex align-items-center gap-1">
              +12% growth this week <Star size={12} fill="currentColor" />
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="operator-dashboard bg-light min-vh-100 py-4 animate-fade-in">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold mb-0">VIP Transport Portal</h3>
            <p className="text-secondary mb-0 small uppercase fw-bold">Operator Dashboard</p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-dark d-flex align-items-center gap-2" onClick={() => { localStorage.clear(); window.location.href = '/'; }}>
              <LogOut size={18} /> Logout
            </button>
            <button className="btn btn-outline-dark d-flex align-items-center gap-2" onClick={() => setShowCompanySettings(true)}>
              <Settings size={18} /> Company Settings
            </button>
          </div>
        </div>

        <div className="row g-4 mb-4">
          {stats.map((stat, i) => (
            <div key={i} className="col-md-3 col-6">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100 border-top border-4 border-primary">
                <div className="text-primary mb-2 opacity-75">{stat.icon}</div>
                <h4 className="fw-bold mb-0">{stat.value}</h4>
                <small className="text-secondary uppercase x-small fw-bold">{stat.label}</small>
              </div>
            </div>
          ))}
        </div>

        {renderContent()}

        {/* Modal-like Overlay for Adding Route */}
        {showAddRoute && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 animate-fade-in" style={{ zIndex: 3000 }}>
            <div className="glass-card p-5 bg-white rounded-4 shadow-lg border-0 m-3" style={{ maxWidth: '500px', width: '100%' }}>
              <h4 className="fw-bold mb-4">Add New Route</h4>
              <form onSubmit={(e) => { e.preventDefault(); setShowAddRoute(false); }}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Route Path</label>
                  <input type="text" className="form-control bg-light border-0 py-2" placeholder="e.g. Accra - Tamale" required />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Base Price (GHS)</label>
                  <input type="number" className="form-control bg-light border-0 py-2" placeholder="200" required />
                </div>
                <div className="d-flex gap-2 mt-4">
                  <button type="button" className="btn btn-light flex-grow-1" onClick={() => setShowAddRoute(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary flex-grow-1 fw-bold">Save Route</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal for Assigning Driver */}
        {showAssignDriver && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 animate-fade-in" style={{ zIndex: 3000 }}>
            <div className="glass-card p-5 bg-white rounded-4 shadow-lg border-0 m-3" style={{ maxWidth: '500px', width: '100%' }}>
              <h4 className="fw-bold mb-4 text-primary"><UserPlus className="me-2" /> Assign Driver</h4>
              <form onSubmit={(e) => { e.preventDefault(); setShowAssignDriver(false); }}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Select Bus</label>
                  <select className="form-select bg-light border-0 py-2">
                    <option>VIP-BUS-102 (Accra - Kumasi)</option>
                    <option>VIP-BUS-045 (Kumasi - Tamale)</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Select Driver</label>
                  <select className="form-select bg-light border-0 py-2">
                    <option>Kwame Mensah</option>
                    <option>Yaw Boateng</option>
                    <option>Abena Serwaa</option>
                  </select>
                </div>
                <div className="d-flex gap-2 mt-4">
                  <button type="button" className="btn btn-light flex-grow-1" onClick={() => setShowAssignDriver(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary flex-grow-1 fw-bold">Confirm Assignment</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal for Maintenance Log */}
        {showMaintenance && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 animate-fade-in" style={{ zIndex: 3000 }}>
            <div className="glass-card p-5 bg-white rounded-4 shadow-lg border-0 m-3" style={{ maxWidth: '600px', width: '100%' }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0 text-danger"><Settings className="me-2" /> Maintenance Log</h4>
                <button className="btn btn-sm btn-light" onClick={() => setShowMaintenance(false)}><X size={20} /></button>
              </div>
              <div className="table-responsive mb-4" style={{ maxHeight: '300px' }}>
                <table className="table table-sm small">
                  <thead>
                    <tr>
                      <th>Bus ID</th>
                      <th>Issue</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>VIP-102</td>
                      <td>Brake Check</td>
                      <td>12 Oct</td>
                      <td><span className="badge bg-success">Done</span></td>
                    </tr>
                    <tr>
                      <td>VIP-045</td>
                      <td>Oil Change</td>
                      <td>15 Oct</td>
                      <td><span className="badge bg-warning">Scheduled</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
               <button className="btn btn-outline-danger w-100 fw-bold" onClick={() => setShowMaintenance(false)}>CLOSE LOG</button>
            </div>
          </div>
        )}

      </div>
      {/* Modal for Company Settings */}
      {showCompanySettings && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 animate-fade-in" style={{ zIndex: 3000 }}>
          <div className="glass-card p-5 bg-white rounded-4 shadow-lg border-0 m-3" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0 text-primary"><Settings className="me-2" /> Company Settings</h4>
              <button className="btn btn-sm btn-light" onClick={() => setShowCompanySettings(false)}><X size={20} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowCompanySettings(false); }}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Company Name</label>
                <input type="text" className="form-control bg-light border-0 py-2" value="VIP Transport Ghana" readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Contact Email</label>
                <input type="email" className="form-control bg-light border-0 py-2" value="info@viptransport.com" />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Phone Number</label>
                <input type="text" className="form-control bg-light border-0 py-2" value="+233 24 123 4567" />
              </div>
              <div className="d-flex gap-2 mt-4">
                <button type="button" className="btn btn-light flex-grow-1" onClick={() => setShowCompanySettings(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary flex-grow-1 fw-bold">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Fleet View */}
      {showFleetView && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 animate-fade-in" style={{ zIndex: 3000 }}>
          <div className="glass-card p-5 bg-white rounded-4 shadow-lg border-0 m-3" style={{ maxWidth: '800px', width: '100%' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0 text-success"><Truck className="me-2" /> Fleet Overview</h4>
              <button className="btn btn-sm btn-light" onClick={() => setShowFleetView(false)}><X size={20} /></button>
            </div>
            <div className="table-responsive mb-4" style={{ maxHeight: '400px' }}>
              <table className="table table-sm small">
                <thead>
                  <tr>
                    <th>Bus ID</th>
                    <th>Route</th>
                    <th>Driver</th>
                    <th>Status</th>
                    <th>Last Service</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>VIP-102</td>
                    <td>Accra - Kumasi</td>
                    <td>Kwame Mensah</td>
                    <td><span className="badge bg-success">Active</span></td>
                    <td>2023-10-01</td>
                  </tr>
                  <tr>
                    <td>VIP-045</td>
                    <td>Kumasi - Tamale</td>
                    <td>Yaw Boateng</td>
                    <td><span className="badge bg-warning">In Maintenance</span></td>
                    <td>2023-09-15</td>
                  </tr>
                  <tr>
                    <td>VIP-078</td>
                    <td>Accra - Takoradi</td>
                    <td>Abena Serwaa</td>
                    <td><span className="badge bg-success">Active</span></td>
                    <td>2023-10-10</td>
                  </tr>
                  <tr>
                    <td>VIP-099</td>
                    <td>Tamale - Bolga</td>
                    <td>Kofi Asante</td>
                    <td><span className="badge bg-danger">Out of Service</span></td>
                    <td>2023-08-20</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="btn btn-outline-success w-100 fw-bold" onClick={() => setShowFleetView(false)}>CLOSE FLEET VIEW</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperatorDashboard;
