import React, { useState, useRef, useEffect } from 'react';
import {
    Search, MapPin, Calendar, Clock, Map, CreditCard, Bell,
    User, Star, ChevronRight, UserCircle, Bus, QrCode, Download,
    Printer, Share2, Phone, MessageCircle, Send, Shield, LogOut,
    Edit3, Camera, Check, X, Plus, Trash2, AlertCircle, CheckCircle
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { majorCities } from '../utils/regions';

/* ── helper: format date ── */
const fmt = (d) => new Date(d).toLocaleDateString('en-GH', { day: 'numeric', month: 'short', year: 'numeric' });

const PassengerDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [searchData, setSearchData] = useState({ origin: '', destination: '', date: '' });
    const [selectedPayment, setSelectedPayment] = useState('momo-1');
    const [addingCard, setAddingCard] = useState(false);
    const [profileEdit, setProfileEdit] = useState(false);
    const [chatMsg, setChatMsg] = useState('');
    const [chatLog, setChatLog] = useState([
        { from: 'agent', text: 'Hello! Welcome to AMA Ghana Transit Terminal Support. How can I help you today?', time: '08:02 AM' },
    ]);
    const [cancelModal, setCancelModal] = useState(null); // stores booking id to cancel
    const [cancelReason, setCancelReason] = useState('');
    const chatEndRef = useRef(null);

    const [profile, setProfile] = useState({
        name: 'Kojo Antwi', email: 'kojo.antwi@gmail.com',
        phone: '+233 24 100 0001', region: 'Greater Accra', gender: 'Male',
        dob: '1995-04-12', emergency: '+233 20 999 0002',
        notifications: true, sms: true, newsletter: false,
    });
    const [profileDraft, setProfileDraft] = useState({ ...profile });

    const bookings = [
        { id: 'AGT-9902XLL', operator: 'VIP Transport', route: 'Accra → Kumasi', terminal: 'Circle Terminal → Adum Terminal', date: '2026-10-12', time: '08:30 AM', seat: '12A', service: 'Executive', price: 'GHS 120.00', status: 'Confirmed', amenities: ['AC', 'WiFi', 'Recliner'] },
        { id: 'AGT-7841YKM', operator: 'STC Express',   route: 'Kumasi → Tamale',  terminal: 'Adum Terminal → Tamale Central', date: '2026-10-15', time: '02:00 PM', seat: '5B',  service: 'Standard', price: 'GHS 200.00', status: 'Pending', amenities: ['AC'] },
        { id: 'AGT-4455PQR', operator: 'OA Travel',     route: 'Accra → Takoradi',  terminal: 'Accra Station → Takoradi Park', date: '2026-09-02', time: '06:00 AM', seat: '9C',  service: 'Standard', price: 'GHS 100.00', status: 'Completed', amenities: ['AC', 'Water'] },
        { id: 'AGT-3310AAB', operator: 'Metro Mass',    route: 'Sunyani → Accra',   terminal: 'Sunyani→ Accra Station', date: '2026-08-20', time: '05:00 AM', seat: '14D', service: 'Budget',   price: 'GHS 85.00',  status: 'Cancelled', amenities: [] },
    ];

    const payments = [
        { id: 'momo-1', type: 'Mobile Money', label: 'MTN MoMo', number: '**** 0001', icon: '📱', color: '#FCD116' },
        { id: 'momo-2', type: 'Mobile Money', label: 'Vodafone Cash', number: '**** 5533', icon: '📱', color: '#CE1126' },
        { id: 'card-1', type: 'Card', label: 'Visa Debit', number: '**** **** **** 4242', icon: '💳', color: '#3498db' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchData.origin || !searchData.destination) { alert('Please select origin and destination.'); return; }
        navigate('/search-results', { state: searchData });
    };

    const sendChat = () => {
        if (!chatMsg.trim()) return;
        const now = new Date().toLocaleTimeString('en-GH', { hour: '2-digit', minute: '2-digit' });
        setChatLog(prev => [...prev, { from: 'user', text: chatMsg, time: now }]);
        setChatMsg('');
        setTimeout(() => {
            const replies = [
                'Thank you for reaching out. Our team is reviewing your request.',
                'Please provide your booking reference number for faster assistance.',
                'Your concern has been escalated to the terminal manager. You will receive an update within 30 minutes.',
                'We apologize for any inconvenience. Our team is on it!',
            ];
            const t2 = new Date().toLocaleTimeString('en-GH', { hour: '2-digit', minute: '2-digit' });
            setChatLog(prev => [...prev, { from: 'agent', text: replies[Math.floor(Math.random() * replies.length)], time: t2 }]);
        }, 1200);
    };

    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatLog]);

    const saveProfile = () => { setProfile({ ...profileDraft }); setProfileEdit(false); };
    const cancelEdit  = () => { setProfileDraft({ ...profile }); setProfileEdit(false); };

    const statusClass = (s) => s === 'Confirmed' ? 'badge-confirmed' : s === 'Pending' ? 'badge-pending' : s === 'Cancelled' ? 'badge-cancelled' : 'badge bg-secondary';

    /* ── NAV TABS ── */
    const tabs = [
        { id: 'overview',  icon: <Map size={18} />,        label: 'Overview'         },
        { id: 'bookings',  icon: <Clock size={18} />,       label: 'My Bookings'      },
        { id: 'payments',  icon: <CreditCard size={18} />,  label: 'Payment Methods'  },
        { id: 'profile',   icon: <UserCircle size={18} />,  label: 'Profile Settings' },
        { id: 'terminal',  icon: <MessageCircle size={18} />,label: 'Contact Terminal'},
    ];

    /* ─────────────────── OVERVIEW ─────────────────── */
    const renderOverview = () => (
        <div className="page-enter">
            {/* Quick Search */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4" style={{ borderLeft: '5px solid var(--ghana-gold)' }}>
                <h5 className="fw-bold mb-4">🔍 Search New Trip</h5>
                <form onSubmit={handleSearch} className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label small fw-bold">Origin</label>
                        <select className="form-select bg-light border-0 py-2" value={searchData.origin}
                            onChange={e => setSearchData({ ...searchData, origin: e.target.value })}>
                            <option value="">Select City</option>
                            {majorCities.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label small fw-bold">Destination</label>
                        <select className="form-select bg-light border-0 py-2" value={searchData.destination}
                            onChange={e => setSearchData({ ...searchData, destination: e.target.value })}>
                            <option value="">Select City</option>
                            {majorCities.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label small fw-bold">Departure Date</label>
                        <input type="date" className="form-control bg-light border-0 py-2"
                            value={searchData.date} onChange={e => setSearchData({ ...searchData, date: e.target.value })} />
                    </div>
                    <div className="col-12 text-end">
                        <button 
                            className="btn btn-primary px-5 py-2 fw-bold d-inline-flex align-items-center gap-2"
                            onClick={() => {
                                if (!searchData.origin || !searchData.destination) {
                                    alert("Please select both origin and destination.");
                                    return;
                                }
                                navigate('/search-results', { state: searchData });
                            }}
                        >
                            <Search size={18} /> SEARCH TRIPS
                        </button>
                    </div>
                </form>
            </div>

            {/* Active Bookings Preview */}
            <h5 className="fw-bold mb-3">Active & Upcoming Bookings</h5>
            <div className="row g-3 mb-4">
                {bookings.filter(b => b.status !== 'Completed' && b.status !== 'Cancelled').map(trip => (
                    <div key={trip.id} className="col-md-6">
                        <div className="card border-0 shadow-sm rounded-4 p-4 h-100 hover-lift" style={{ borderBottom: '4px solid var(--ghana-gold)' }}>
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h6 className="fw-bold mb-0">{trip.route}</h6>
                                    <small className="text-secondary">{trip.operator}</small>
                                </div>
                                <span className={statusClass(trip.status)}>{trip.status}</span>
                            </div>
                            <div className="d-flex gap-2 flex-wrap mb-3">
                                <span className="small text-secondary fw-bold bg-light px-2 py-1 rounded"><Calendar size={12} className="me-1" />{fmt(trip.date)}</span>
                                <span className="small text-secondary fw-bold bg-light px-2 py-1 rounded"><Clock size={12} className="me-1" />{trip.time}</span>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-dark btn-sm flex-grow-1"
                                    onClick={() => setActiveTab('bookings')}>View Ticket</button>
                                <button 
                                    className="btn btn-light btn-sm"
                                    onClick={() => setActiveTab('bookings')}
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Travel Tip */}
            <div className="alert border-0 rounded-4 p-4 d-flex align-items-center gap-3"
                style={{ background: 'rgba(0,107,63,0.08)', border: '1px solid rgba(0,107,63,0.2)' }}>
                <Star className="flex-shrink-0" style={{ color: 'var(--ghana-green)' }} size={28} />
                <div>
                    <h6 className="fw-bold mb-1" style={{ color: 'var(--ghana-green)' }}>Ghana Travel Tip</h6>
                    <p className="mb-0 small text-dark opacity-75">Arrive at the terminal at least 30 minutes before your departure time. Carry a valid National ID or Passport for boarding verification.</p>
                </div>
            </div>
        </div>
    );

    /* ─────────────────── MY BOOKINGS ─────────────────── */
    const [activeBooking, setActiveBooking] = useState(null);

    const renderBookings = () => (
        <div className="page-enter">
            {activeBooking ? (
                /* DIGITAL TICKET INLINE */
                <div>
                    <button className="btn btn-link text-decoration-none ps-0 mb-4 fw-bold d-flex align-items-center gap-2"
                        style={{ color: 'var(--ghana-black)' }}
                        onClick={() => setActiveBooking(null)}>
                        ← Back to My Bookings
                    </button>
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="ticket-card card border-0 mb-4">
                                {/* Ghana stripe */}
                                <div className="ticket-stripe" />
                                {/* Header */}
                                <div className="p-4 d-flex justify-content-between align-items-center" style={{ background: 'var(--ghana-black)', color: 'white' }}>
                                    <div>
                                        <h5 className="fw-bold mb-0 text-warning">E-TICKET</h5>
                                        <small className="opacity-60 fw-bold" style={{ letterSpacing: '1px' }}>AMA GHANA TRANSIT</small>
                                    </div>
                                    <div className="text-end">
                                        <span className={statusClass(activeBooking.status)}>{activeBooking.status}</span>
                                        <div className="small opacity-50 mt-1">{activeBooking.id}</div>
                                    </div>
                                </div>
                                {/* Body */}
                                <div className="card-body p-4 position-relative bg-white">
                                    <div className="ticket-notch-left" style={{ background: 'var(--bg-light)' }} />
                                    <div className="ticket-notch-right" style={{ background: 'var(--bg-light)' }} />
                                    <div className="row g-3 mb-4">
                                        <div className="col-6">
                                            <div className="small text-secondary fw-bold mb-1" style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Passenger</div>
                                            <div className="fw-bold">{profile.name}</div>
                                        </div>
                                        <div className="col-6 text-end">
                                            <div className="small text-secondary fw-bold mb-1" style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Operator</div>
                                            <div className="fw-bold">{activeBooking.operator}</div>
                                        </div>
                                    </div>
                                    {/* Route */}
                                    <div className="bg-light rounded-3 p-3 mb-4 d-flex align-items-center justify-content-between">
                                        <div className="text-center flex-grow-1">
                                            <div className="fw-bold fs-5">{activeBooking.route.split('→')[0].trim()}</div>
                                            <small className="text-secondary">{activeBooking.terminal.split('→')[0].trim()}</small>
                                        </div>
                                        <div className="px-3"><Bus size={22} style={{ color: 'var(--ghana-gold)' }} /></div>
                                        <div className="text-center flex-grow-1">
                                            <div className="fw-bold fs-5">{activeBooking.route.split('→')[1].trim()}</div>
                                            <small className="text-secondary">{activeBooking.terminal.split('→')[1]?.trim()}</small>
                                        </div>
                                    </div>
                                    {/* Details grid */}
                                    <div className="row g-3 mb-4">
                                        {[
                                            { icon: <Calendar size={14} />, label: 'Date', value: fmt(activeBooking.date) },
                                            { icon: <Clock size={14} />,    label: 'Time', value: activeBooking.time },
                                            { icon: <User size={14} />,     label: 'Seat', value: activeBooking.seat },
                                            { icon: <Star size={14} />,     label: 'Service', value: activeBooking.service },
                                            { icon: <CreditCard size={14} />,label: 'Fare', value: activeBooking.price },
                                        ].map((d, i) => (
                                            <div key={i} className="col-4">
                                                <div className="d-flex align-items-center gap-1 mb-1" style={{ color: 'var(--ghana-gold)' }}>{d.icon}</div>
                                                <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>{d.label}</div>
                                                <div className="fw-bold small">{d.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Amenities */}
                                    {activeBooking.amenities.length > 0 && (
                                        <div className="mb-4">
                                            <div className="small fw-bold text-secondary mb-2" style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>Amenities</div>
                                            <div className="d-flex gap-2 flex-wrap">
                                                {activeBooking.amenities.map(a => (
                                                    <span key={a} className="badge bg-light text-dark border px-3 py-2">{a}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="ticket-dashed mb-4" />
                                    {/* QR */}
                                    <div className="text-center py-3">
                                        <div className="bg-light p-3 rounded-4 d-inline-block shadow-sm mb-2">
                                            <QrCode size={140} strokeWidth={1.5} />
                                        </div>
                                        <p className="small text-secondary mb-0">Scan at terminal gate for boarding</p>
                                    </div>
                                </div>
                                {/* Footer */}
                                <div className="p-3 text-center bg-light">
                                    <small className="text-secondary">Valid for single journey only. Must present with valid ID.</small>
                                </div>
                                <div className="ticket-stripe" />
                            </div>
                            {/* Actions */}
                            <div className="row g-2">
                                {[{icon:<Download size={20}/>, label:'Download'},{icon:<Printer size={20}/>, label:'Print'},{icon:<Share2 size={20}/>, label:'Share'}].map(a => (
                                    <div key={a.label} className="col-4">
                                        <button className="btn btn-white w-100 py-3 rounded-3 d-flex flex-column align-items-center gap-1 border shadow-sm"
                                            onClick={() => alert(`${a.label} feature — coming soon!`)}>
                                            <span style={{ color: 'var(--ghana-gold)' }}>{a.icon}</span>
                                            <span className="small fw-bold">{a.label}</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* BOOKING LIST */
                <div>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <div>
                            <h5 className="fw-bold mb-0">My Bookings</h5>
                            <small className="text-secondary">{bookings.length} trips • {bookings.filter(b=>b.status==='Confirmed').length} confirmed</small>
                        </div>
                        <button className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-2"
                            onClick={() => navigate('/search-results')}>
                            <Plus size={15} /> Book New Trip
                        </button>
                    </div>

                    {/* Filter tabs */}
                    {['All','Confirmed','Pending','Completed','Cancelled'].map(f => {
                        const count = f === 'All' ? bookings.length : bookings.filter(b => b.status === f).length;
                        return (
                            <span key={f} className="badge me-2 mb-3 px-3 py-2"
                                style={{ background: f === 'All' ? 'var(--ghana-gold)' : 'rgba(0,0,0,0.07)', color: f === 'All' ? 'var(--ghana-black)' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600 }}>
                                {f} ({count})
                            </span>
                        );
                    })}

                    <div className="d-flex flex-column gap-3">
                        {bookings.map(b => (
                            <div key={b.id} className="card border-0 shadow-sm rounded-4 p-4 hover-lift">
                                <div className="row align-items-center g-3">
                                    <div className="col-md-5">
                                        <div className="fw-bold fs-6 mb-1">{b.route}</div>
                                        <small className="text-secondary d-block mb-2">{b.operator} · {b.terminal}</small>
                                        <div className="d-flex gap-2 flex-wrap">
                                            <span className="small bg-light px-2 py-1 rounded fw-bold"><Calendar size={11} className="me-1" />{fmt(b.date)}</span>
                                            <span className="small bg-light px-2 py-1 rounded fw-bold"><Clock size={11} className="me-1" />{b.time}</span>
                                            <span className="small bg-light px-2 py-1 rounded fw-bold">Seat {b.seat}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-3 text-md-center">
                                        <div className="fw-bold" style={{ color: 'var(--ghana-green)' }}>{b.price}</div>
                                        <small className="text-secondary">{b.service}</small>
                                    </div>
                                    <div className="col-md-2 text-md-center">
                                        <span className={statusClass(b.status)}>{b.status}</span>
                                    </div>
                                    <div className="col-md-2 text-md-end">
                                        {(b.status === 'Confirmed' || b.status === 'Completed') && (
                                            <button className="btn btn-sm btn-primary fw-bold d-flex align-items-center gap-1 ms-md-auto"
                                                onClick={() => setActiveBooking(b)}>
                                                <QrCode size={14} /> Ticket
                                            </button>
                                        )}
                                        {b.status === 'Pending' && (
                                            <button className="btn btn-sm btn-outline-danger fw-bold" onClick={() => setCancelModal(b.id)}>Cancel</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    /* ─────────────────── PAYMENT METHODS ─────────────────── */
    const renderPayments = () => (
        <div className="page-enter">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h5 className="fw-bold mb-0">Payment Methods</h5>
                    <small className="text-secondary">Manage your saved payment options</small>
                </div>
                <button className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-2"
                    onClick={() => setAddingCard(!addingCard)}>
                    <Plus size={15} /> Add Method
                </button>
            </div>

            {/* Add form */}
            {addingCard && (
                <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 page-enter" style={{ borderTop: '4px solid var(--ghana-gold)' }}>
                    <h6 className="fw-bold mb-3">Add New Payment Method</h6>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label small fw-bold">Method Type</label>
                            <select className="form-select bg-light border-0">
                                <option>Mobile Money (MTN)</option>
                                <option>Mobile Money (Vodafone)</option>
                                <option>Mobile Money (AirtelTigo)</option>
                                <option>Visa / Mastercard</option>
                                <option>Ghana Card Payment</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold">Phone / Card Number</label>
                            <input className="form-control bg-light border-0" placeholder="e.g. 024 000 0001" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold">Account Name</label>
                            <input className="form-control bg-light border-0" placeholder="Full name on account" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold">Network / Bank</label>
                            <input className="form-control bg-light border-0" placeholder="e.g. MTN, GCB, Fidelity" />
                        </div>
                        <div className="col-12 d-flex gap-2">
                            <button className="btn btn-primary fw-bold px-4"
                                onClick={() => { alert('Payment method saved!'); setAddingCard(false); }}>Save Method</button>
                            <button className="btn btn-light" onClick={() => setAddingCard(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Saved methods */}
            <div className="row g-3 mb-4">
                {payments.map(p => (
                    <div key={p.id} className="col-md-6 col-lg-4">
                        <div className={`payment-card ${selectedPayment === p.id ? 'selected' : ''}`}
                            onClick={() => setSelectedPayment(p.id)}>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <span style={{ fontSize: '1.8rem' }}>{p.icon}</span>
                                {selectedPayment === p.id && (
                                    <span className="badge d-flex align-items-center gap-1"
                                        style={{ background: 'var(--ghana-green)', color: 'white' }}>
                                        <CheckCircle size={12} /> Default
                                    </span>
                                )}
                            </div>
                            <div className="fw-bold mb-0">{p.label}</div>
                            <small className="text-secondary">{p.type}</small>
                            <div className="mt-2 fw-bold" style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>{p.number}</div>
                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-sm btn-light flex-grow-1"
                                    onClick={e => { e.stopPropagation(); setSelectedPayment(p.id); }}>Set Default</button>
                                <button className="btn btn-sm btn-outline-danger"
                                    onClick={e => { e.stopPropagation(); alert('Remove method?'); }}>
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Security note */}
            <div className="alert rounded-4 border-0 d-flex align-items-start gap-3"
                style={{ background: 'rgba(52,152,219,0.1)' }}>
                <Shield size={20} className="flex-shrink-0 mt-1" style={{ color: '#3498db' }} />
                <div>
                    <div className="fw-bold small" style={{ color: '#3498db' }}>Secure Payments</div>
                    <p className="mb-0 small text-secondary">All your payment information is encrypted with 256-bit SSL. We never store full card or mobile money PINs. Transactions are processed through Ghana Interbank Payment and Settlement Systems (GhIPSS).</p>
                </div>
            </div>

            {/* Accepted methods info */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mt-4">
                <h6 className="fw-bold mb-3">Accepted Payment Methods in Ghana</h6>
                <div className="row g-3 text-center">
                    {[
                        { name: 'MTN MoMo', color: '#FCD116', bg: 'rgba(252,209,22,0.1)' },
                        { name: 'Vodafone Cash', color: '#CE1126', bg: 'rgba(206,17,38,0.08)' },
                        { name: 'AirtelTigo Money', color: '#e67e22', bg: 'rgba(230,126,34,0.1)' },
                        { name: 'Visa / MC', color: '#1a1aff', bg: 'rgba(26,26,255,0.07)' },
                        { name: 'Ghana Card Pay', color: 'var(--ghana-green)', bg: 'rgba(0,107,63,0.08)' },
                        { name: 'GhIPSS', color: '#555', bg: '#f7f8fa' },
                    ].map(m => (
                        <div key={m.name} className="col-4 col-md-2">
                            <div className="rounded-3 p-2" style={{ background: m.bg }}>
                                <div className="fw-bold small" style={{ color: m.color, fontSize: '0.72rem' }}>{m.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    /* ─────────────────── PROFILE SETTINGS ─────────────────── */
    const renderProfile = () => (
        <div className="page-enter">
            {/* Avatar & basic */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <div className="position-relative">
                            <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                style={{ width: 72, height: 72, background: 'var(--ghana-gold)', fontSize: '1.8rem', color: 'var(--ghana-black)' }}>
                                {profile.name.charAt(0)}
                            </div>
                            <button className="btn btn-sm btn-dark rounded-circle p-1 position-absolute bottom-0 end-0" style={{ width: 24, height: 24 }}>
                                <Camera size={12} />
                            </button>
                        </div>
                        <div>
                            <h5 className="fw-bold mb-0">{profile.name}</h5>
                            <small className="text-secondary">Passenger · 1,250 Travel Points 🌟</small>
                        </div>
                    </div>
                    {!profileEdit
                        ? <button className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2" onClick={() => setProfileEdit(true)}><Edit3 size={14} /> Edit Profile</button>
                        : <div className="d-flex gap-2">
                            <button className="btn btn-success btn-sm d-flex align-items-center gap-1" onClick={saveProfile}><Check size={14} /> Save</button>
                            <button className="btn btn-light btn-sm d-flex align-items-center gap-1" onClick={cancelEdit}><X size={14} /> Cancel</button>
                          </div>
                    }
                </div>

                <div className="row g-3">
                    {[
                        { label: 'Full Name',       key: 'name',      type: 'text'   },
                        { label: 'Email Address',    key: 'email',     type: 'email'  },
                        { label: 'Phone Number',     key: 'phone',     type: 'tel'    },
                        { label: 'Date of Birth',    key: 'dob',       type: 'date'   },
                        { label: 'Region',           key: 'region',    type: 'text'   },
                        { label: 'Emergency Contact',key: 'emergency', type: 'tel'    },
                    ].map(f => (
                        <div key={f.key} className="col-md-6">
                            <label className="form-label small fw-bold">{f.label}</label>
                            {profileEdit
                                ? <input type={f.type} className="form-control bg-light border-0"
                                    value={profileDraft[f.key]}
                                    onChange={e => setProfileDraft({ ...profileDraft, [f.key]: e.target.value })} />
                                : <div className="bg-light rounded-3 px-3 py-2 small fw-bold">{profile[f.key]}</div>
                            }
                        </div>
                    ))}
                    <div className="col-md-6">
                        <label className="form-label small fw-bold">Gender</label>
                        {profileEdit
                            ? <select className="form-select bg-light border-0" value={profileDraft.gender}
                                onChange={e => setProfileDraft({ ...profileDraft, gender: e.target.value })}>
                                <option>Male</option><option>Female</option><option>Prefer not to say</option>
                              </select>
                            : <div className="bg-light rounded-3 px-3 py-2 small fw-bold">{profile.gender}</div>
                        }
                    </div>
                </div>
            </div>

            {/* Notification Preferences */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                <h6 className="fw-bold mb-3">Notification Preferences</h6>
                {[
                    { key: 'notifications', label: 'Push Notifications', desc: 'Booking confirmations, delays, and reminders' },
                    { key: 'sms',           label: 'SMS Alerts',          desc: 'Receive booking status via text message' },
                    { key: 'newsletter',    label: 'Newsletter',           desc: 'Travel deals and AMA Ghana Transit updates' },
                ].map(n => (
                    <div key={n.key} className="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                            <div className="fw-bold small">{n.label}</div>
                            <small className="text-secondary">{n.desc}</small>
                        </div>
                        <div className="form-check form-switch ms-3">
                            <input className="form-check-input" type="checkbox"
                                checked={profileEdit ? profileDraft[n.key] : profile[n.key]}
                                onChange={e => profileEdit && setProfileDraft({ ...profileDraft, [n.key]: e.target.checked })}
                                style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Security */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                <h6 className="fw-bold mb-3">Security & Account</h6>
                <div className="d-grid gap-2">
                    <button className="btn btn-outline-dark text-start p-3 rounded-3 d-flex align-items-center gap-3">
                        <Shield size={18} style={{ color: 'var(--ghana-green)' }} />
                        <div><div className="fw-bold small">Change Password</div><small className="text-secondary">Last updated 30 days ago</small></div>
                        <ChevronRight size={16} className="ms-auto" />
                    </button>
                    <button className="btn btn-outline-dark text-start p-3 rounded-3 d-flex align-items-center gap-3">
                        <Shield size={18} style={{ color: 'var(--ghana-gold)' }} />
                        <div><div className="fw-bold small">Two-Factor Authentication</div><small className="text-secondary">Add extra security to your account</small></div>
                        <ChevronRight size={16} className="ms-auto" />
                    </button>
                    <button className="btn btn-outline-danger text-start p-3 rounded-3 d-flex align-items-center gap-3">
                        <AlertCircle size={18} style={{ color: 'var(--ghana-red)' }} />
                        <div><div className="fw-bold small" style={{ color: 'var(--ghana-red)' }}>Delete Account</div><small className="text-secondary">Permanently remove your data</small></div>
                        <ChevronRight size={16} className="ms-auto" />
                    </button>
                </div>
            </div>
        </div>
    );

    /* ─────────────────── CONTACT TERMINAL ─────────────────── */
    const renderTerminal = () => (
        <div className="page-enter">
            <div className="row g-4">
                {/* Chat */}
                <div className="col-lg-7">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                        {/* Chat header */}
                        <div className="p-3 d-flex align-items-center gap-3" style={{ background: 'var(--ghana-black)', color: 'white' }}>
                            <div className="rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: 42, height: 42, background: 'var(--ghana-gold)' }}>
                                <MessageCircle size={20} style={{ color: 'var(--ghana-black)' }} />
                            </div>
                            <div>
                                <div className="fw-bold">Terminal Support</div>
                                <small style={{ color: 'var(--ghana-gold)' }}>🟢 Agent Online · AMA Ghana Transit</small>
                            </div>
                        </div>
                        {/* Chat body */}
                        <div className="p-3 d-flex flex-column gap-2" style={{ minHeight: 340, maxHeight: 380, overflowY: 'auto', background: '#f7f8fa' }}>
                            {chatLog.map((msg, i) => (
                                <div key={i} className={`d-flex flex-column ${msg.from === 'user' ? 'align-items-end' : 'align-items-start'}`}>
                                    <div className={msg.from === 'user' ? 'chat-bubble-out' : 'chat-bubble-in'}>{msg.text}</div>
                                    <div className="chat-time">{msg.time}</div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                        {/* Input */}
                        <div className="p-3 border-top bg-white d-flex gap-2">
                            <input className="form-control bg-light border-0 rounded-pill"
                                placeholder="Type your message..."
                                value={chatMsg}
                                onChange={e => setChatMsg(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && sendChat()} />
                            <button className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: 42, height: 42, flexShrink: 0 }} onClick={sendChat}>
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info panel */}
                <div className="col-lg-5">
                    <div className="card border-0 shadow-sm rounded-4 p-4 mb-3">
                        <h6 className="fw-bold mb-3">Terminal Contact Info</h6>
                        <div className="d-flex flex-column gap-3">
                            {[
                                { icon: <Phone size={18} />, label: 'Accra Circle Terminal', value: '+233 30 221 0001' },
                                { icon: <Phone size={18} />, label: 'Kumasi Adum Terminal',   value: '+233 32 202 0042' },
                                { icon: <Phone size={18} />, label: 'Tamale Central',          value: '+233 37 202 0055' },
                                { icon: <Phone size={18} />, label: 'Takoradi Terminal',       value: '+233 31 202 0088' },
                            ].map(c => (
                                <div key={c.label} className="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                                    <div style={{ color: 'var(--ghana-green)' }}>{c.icon}</div>
                                    <div>
                                        <div className="small fw-bold">{c.label}</div>
                                        <a href={`tel:${c.value.replace(/\s/g,'')}`} className="small text-decoration-none" style={{ color: 'var(--ghana-green)' }}>{c.value}</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <h6 className="fw-bold mb-3">Support Hours</h6>
                        <div className="d-flex flex-column gap-2">
                            {[
                                { day: 'Monday – Friday', hours: '5:00 AM – 11:00 PM' },
                                { day: 'Saturday',        hours: '5:00 AM – 10:00 PM' },
                                { day: 'Sunday',          hours: '6:00 AM – 9:00 PM'  },
                                { day: 'Public Holidays', hours: 'Emergency Only'       },
                            ].map(s => (
                                <div key={s.day} className="d-flex justify-content-between">
                                    <small className="fw-bold">{s.day}</small>
                                    <small style={{ color: 'var(--ghana-green)' }}>{s.hours}</small>
                                </div>
                            ))}
                        </div>
                        <div className="alert border-0 rounded-3 mt-3 p-3" style={{ background: 'rgba(252,209,22,0.12)' }}>
                            <small className="fw-bold" style={{ color: '#8a6e00' }}>📞 Emergency Line: +233 20 000 0911 (24/7)</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return renderOverview();
            case 'bookings': return renderBookings();
            case 'payments': return renderPayments();
            case 'profile':  return renderProfile();
            case 'terminal': return renderTerminal();
            default: return renderOverview();
        }
    };

    return (
        <div className="passenger-dashboard min-vh-100 py-4 animate-fade-in" style={{ background: 'var(--bg-light)' }}>
            <div className="container">
                {/* Header */}
                <div className="row g-4 mb-4">
                    <div className="col-12">
                        <div className="card p-4 d-flex flex-row justify-content-between align-items-center rounded-4 border-0 shadow-sm"
                            style={{ background: 'var(--ghana-black)', color: 'white' }}>
                            <div className="d-flex align-items-center gap-3">
                                <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                    style={{ width: 52, height: 52, background: 'var(--ghana-gold)', color: 'var(--ghana-black)', fontSize: '1.4rem' }}>
                                    K
                                </div>
                                <div>
                                    <h5 className="fw-bold mb-0 text-white">Welcome back, Kojo!</h5>
                                    <small style={{ color: 'var(--ghana-gold)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.72rem' }}>Passenger Dashboard</small>
                                </div>
                            </div>
                            <div className="text-end d-none d-md-block">
                                <div className="small opacity-50">Travel Points</div>
                                <div className="fw-bold" style={{ color: 'var(--ghana-gold)', fontSize: '1.2rem' }}>1,250 PTS</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Sidebar */}
                    <div className="col-lg-3">
                        <div className="card border-0 shadow-sm rounded-4 p-3 mb-3">
                            <div className="small fw-bold text-secondary mb-2 px-2" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem' }}>Menu</div>
                            <div className="d-flex flex-column gap-1">
                                {tabs.map(t => (
                                    <button key={t.id}
                                        className={`dash-nav-pill ${activeTab === t.id ? 'active-pill' : ''}`}
                                        onClick={() => { setActiveTab(t.id); setActiveBooking(null); }}>
                                        {t.icon} {t.label}
                                    </button>
                                ))}
                                <hr className="my-2 opacity-10" />
                                <button className="dash-nav-pill text-danger" onClick={() => { localStorage.clear(); window.location.href = '/'; }}>
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        </div>
                        <div className="card border-0 shadow-sm rounded-4 p-4" style={{ background: 'var(--ghana-green)', color: 'white' }}>
                            <h6 className="fw-bold mb-2">Need Help?</h6>
                            <p className="small mb-3 opacity-75">Our 24/7 terminal support team is always ready to assist you.</p>
                            <button className="btn btn-sm fw-bold w-100 rounded-3"
                                style={{ background: 'var(--ghana-gold)', color: 'var(--ghana-black)' }}
                                onClick={() => { setActiveTab('terminal'); setActiveBooking(null); }}>
                                Contact Terminal
                            </button>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="col-lg-9">
                        <div className="card border-0 shadow-sm rounded-4 p-4">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
            {/* Cancellation Modal */}
            {cancelModal && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75" style={{ zIndex: 3000 }}>
                    <div className="glass-card p-5 bg-white rounded-4 shadow-lg border-0 m-3 animate-fade-in" style={{ maxWidth: '500px', width: '100%' }}>
                        <div className="text-center mb-4">
                            <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex p-3 mb-3">
                                <AlertCircle size={40} />
                            </div>
                            <h4 className="fw-bold">Cancel Booking?</h4>
                            <p className="text-secondary small">Are you sure you want to cancel trip <strong>{cancelModal}</strong>? This action cannot be undone.</p>
                        </div>
                        <div className="mb-4">
                            <label className="form-label small fw-bold">Reason for Cancellation</label>
                            <select className="form-select bg-light border-0 py-2" value={cancelReason} onChange={e => setCancelReason(e.target.value)}>
                                <option value="">Select a reason</option>
                                <option>Change of plans</option>
                                <option>Found a cheaper alternative</option>
                                <option>Travel time no longer works</option>
                                <option>Emergency situational</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-light flex-grow-1 fw-bold" onClick={() => { setCancelModal(null); setCancelReason(''); }}>Keep Booking</button>
                            <button className="btn btn-danger flex-grow-1 fw-bold" onClick={() => { alert(`Booking ${cancelModal} cancelled. Reason: ${cancelReason}`); setCancelModal(null); setCancelReason(''); }}>Confirm Refund</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PassengerDashboard;
