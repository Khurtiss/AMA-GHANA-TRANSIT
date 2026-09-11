import React, { useState, useEffect } from 'react';
import { Shield, Users, Bus, Map, Activity, CheckCircle, XCircle, Search, MoreVertical, LayoutDashboard, Database, HardDrive, Bell, Power, RefreshCw, MessageCircle } from 'lucide-react';
import ContactTerminal from '../pages/ContactTerminal';


const AdminDashboard = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [logs, setLogs] = useState([

    { text: 'Operator "VIP" updated Route AC-01', time: '14:05:22' },
    { text: 'New passenger registration: akosua@gmail.com', time: '14:04:10' },
    { text: 'System Check: All servers operational', time: '14:00:01' }
  ]);

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      alert("Database backup completed successfully and stored in secure vault.");
    }, 3000);
  };

  const metrics = [
    { label: 'Total Bookings', value: '14,208', icon: <Database />, trend: '+18%' },
    { label: 'Active Routes', value: '84', icon: <Map />, trend: '6 new' },
    { label: 'Operators', value: '12', icon: <Bus />, trend: '2 pending' },
    { label: 'Traffic Today', value: '2,450', icon: <Users />, trend: 'Peak' }
  ];

  return (
    <div className="admin-dashboard bg-dark text-white min-vh-100 py-4 animate-fade-in">
      <div className="container">
        {/* Admin Header */}
        <div className="d-flex justify-content-between align-items-center mb-5 bg-white bg-opacity-10 p-4 rounded-4 border border-white border-opacity-10">
          <div className="d-flex align-items-center gap-3">
             <div className="bg-primary p-2 rounded-3 text-dark"><Shield size={32} /></div>
             <div>
               <h4 className="fw-bold mb-0">Master Control Panel</h4>
               <small className="opacity-50 text-uppercase fw-bold" style={{ letterSpacing: '2px' }}>AMA GHANA TRANSIT • ADMIN</small>
             </div>
          </div>
          <div className="d-flex gap-2">
              <button className="btn btn-outline-light d-flex align-items-center gap-2 px-3" onClick={() => setShowUsers(!showUsers)} title="User Management"><Users size={18} /> USERS</button>
              <button className="btn btn-outline-light d-flex align-items-center gap-2 px-3" title="Notifications"><Bell size={18} /> <span className="badge bg-danger">5</span></button>
             <button className="btn btn-outline-danger d-flex align-items-center gap-2 px-3 fw-bold" onClick={() => { localStorage.clear(); window.location.href = '/'; }}>
                 <Power size={18} /> LOGOUT
             </button>
             <button 
                className={`btn btn-primary d-flex align-items-center gap-2 fw-bold text-dark ${isBackingUp ? 'disabled' : ''}`}
                onClick={handleBackup}
             >
                {isBackingUp ? <RefreshCw size={18} className="animate-spin" /> : <Database size={18} />} 
                {isBackingUp ? 'BACKING UP...' : 'BACKUP DATABASE'}
             </button>
          </div>
        </div>

        <div className="row g-4 mb-5">
          {metrics.map((m, i) => (
            <div key={i} className="col-md-3">
              <div className="card h-100 border-0 bg-white bg-opacity-5 rounded-4 p-4 hover-lift">
                <div className="text-primary mb-3">{m.icon}</div>
                <h3 className="fw-bold mb-1">{m.value}</h3>
                <p className="small text-secondary fw-bold uppercase mb-0">{m.label}</p>
                <small className="text-success fw-bold">{m.trend}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 bg-white bg-opacity-5 rounded-4 p-4 h-100">
               <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0">Live Platform Log</h5>
                  <button className="btn btn-sm btn-outline-secondary">Clear Logs</button>
               </div>
               <div className="bg-black bg-opacity-50 p-4 rounded-4 font-monospace small" style={{ height: '300px', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {logs.map((log, i) => (
                    <div key={i} className="mb-2 d-flex gap-3">
                      <span className="text-primary">[{log.time}]</span>
                      <span className="opacity-75">{log.text}</span>
                    </div>
                  ))}
                  <div className="text-success animate-pulse mt-2">_ Listening for active events...</div>
               </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 bg-white bg-opacity-5 rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-4">System Status</h5>
              <div className="d-grid gap-3">
                <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-dark">
                  <span className="small opacity-75">Managed Auth</span>
                  <span className="text-success small fw-bold d-flex align-items-center gap-1"><CheckCircle size={14} /> ACTIVE</span>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-dark">
                  <span className="small opacity-75">RLS Policies</span>
                  <span className="text-success small fw-bold d-flex align-items-center gap-1"><Shield size={14} /> SECURE</span>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-dark">
                  <span className="small opacity-75">SSL Encryption</span>
                  <span className="text-success small fw-bold d-flex align-items-center gap-1"><Shield size={14} /> ENABLED</span>
                </div>
              </div>
            </div>
            <button className="btn btn-danger w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-4">
              <Power size={20} /> SHUTDOWN SYSTEM
            </button>
          </div>
        </div>

        <div className="mt-5">
           <div className="card border-0 bg-white bg-opacity-5 rounded-4 p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-3 d-flex align-items-center justify-content-center p-2"
                    style={{ background: 'rgba(252,209,22,0.12)' }}>
                    <MessageCircle size={22} style={{ color: 'var(--ghana-gold)' }} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0 text-white">Terminal Support Centre</h5>
                    <small className="opacity-50">Monitor and respond to all incoming passenger support tickets</small>
                  </div>
                </div>
                <button className="btn btn-sm btn-outline-warning" onClick={() => setShowTerminal(!showTerminal)}>
                  {showTerminal ? 'CLOSE TERMINAL' : 'OPEN TERMINAL'}
                </button>
              </div>
              {showTerminal && <ContactTerminal role="Admin" />}
           </div>
        </div>

        {/* User Management Section */}
        {showUsers && (
          <div className="mt-4 page-enter">
            <div className="card border-0 bg-white bg-opacity-5 rounded-4 p-4 shadow-lg border border-white border-opacity-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0 text-primary">User Management</h5>
                <button className="btn btn-sm btn-light" onClick={() => setShowUsers(false)}>Close</button>
              </div>
              <div className="table-responsive">
                <table className="table table-dark table-hover align-middle mb-0">
                  <thead className="opacity-50 small uppercase">
                    <tr>
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Role</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="border-0">
                    {[
                      { name: 'Kojo Antwi', email: 'kojo.antwi@gmail.com', role: 'Passenger', status: 'Active' },
                      { name: 'Dr. Mensah', email: 'mensah.ops@vip.com', role: 'Operator', status: 'Active' },
                      { name: 'Sarpong K.', email: 'sarpong.driver@gh.com', role: 'Driver', status: 'Pending' },
                      { name: 'Ama Asante', email: 'ama.asante@travel.gh', role: 'Passenger', status: 'Flagged' },
                    ].map((u, i) => (
                      <tr key={i}>
                        <td className="fw-bold">{u.name}</td>
                        <td className="small opacity-75">{u.email}</td>
                        <td className="small">{u.role}</td>
                        <td>
                          <span className={`badge ${u.status === 'Active' ? 'bg-success' : u.status === 'Pending' ? 'bg-warning' : 'bg-danger'} px-3 py-1`}>
                            {u.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-light me-2">Edit</button>
                          <button className="btn btn-sm btn-outline-danger">Block</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;

