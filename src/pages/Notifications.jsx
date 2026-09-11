import React from 'react';
import { Bell, Clock, ChevronRight, Info } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    { id: 1, title: 'Trip Confirmed', message: 'Your booking for Accra to Kumasi has been confirmed.', time: '2 hours ago', type: 'success' },
    { id: 2, title: 'Bus Delay', message: 'VIP-702 is experiencing a 15-minute delay due to traffic.', time: '1 day ago', type: 'warning' },
    { id: 3, title: 'New Promotion', message: 'Enjoy 10% off your next trip with STC Express!', time: '2 days ago', type: 'info' }
  ];

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="bg-dark text-white p-4">
              <h4 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <Bell className="text-primary" /> Notifications
              </h4>
            </div>
            <div className="card-body p-0">
              {notifications.length > 0 ? (
                notifications.map((notif, i) => (
                  <div key={notif.id} className={`p-4 border-bottom hover-lift ${i === 0 ? 'bg-light' : ''}`} style={{ cursor: 'pointer' }}>
                    <div className="d-flex gap-3">
                      <div className={`bg-${notif.type} bg-opacity-10 p-2 rounded-circle`} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifySelf: 'center' }}>
                        <Info className={`text-${notif.type}`} size={20} />
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between">
                          <h6 className="fw-bold mb-1">{notif.title}</h6>
                          <small className="text-secondary d-flex align-items-center gap-1">
                            <Clock size={14} /> {notif.time}
                          </small>
                        </div>
                        <p className="text-secondary small mb-0">{notif.message}</p>
                      </div>
                      <ChevronRight size={18} className="text-secondary opacity-25" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-5">
                  <Bell size={48} className="text-secondary opacity-25 mb-3" />
                  <p className="text-secondary">No new notifications</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
