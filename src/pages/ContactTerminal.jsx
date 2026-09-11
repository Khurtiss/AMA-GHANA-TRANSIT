import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Phone, Send, ChevronRight, CheckCircle, Bus, Shield, Clock, Users, Map, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * ContactTerminal — accessible by Passenger (via /dashboard/passenger),
 * Operator (via /dashboard/operator), and Admin (via /dashboard/admin).
 * Also mounted as a standalone page at /contact-terminal.
 */
const ContactTerminal = ({ role = 'Passenger' }) => {
    const navigate = useNavigate();
    const [chatMsg, setChatMsg] = useState('');
    const [chatLog, setChatLog] = useState([
        { from: 'agent', text: `Hello! You are connected to AMA Ghana Transit Terminal Support. How can we assist you today, ${role}?`, time: '08:00 AM' },
    ]);
    const [activeTicket, setActiveTicket] = useState(null);
    const chatEndRef = useRef(null);

    const agentReplies = [
        'Thank you for contacting us. Our team is reviewing your concern.',
        'Please provide your booking reference number for faster assistance.',
        'Your issue has been escalated to the terminal manager. Please allow 30 minutes for a response.',
        'We apologize for any inconvenience. Our agent is currently looking into this.',
        'Confirmed. Your request has been logged. Reference: TKT-' + Math.floor(10000 + Math.random() * 90000),
        'Is there anything else I can help you with?',
    ];

    const sendChat = () => {
        if (!chatMsg.trim()) return;
        const now = new Date().toLocaleTimeString('en-GH', { hour: '2-digit', minute: '2-digit' });
        setChatLog(prev => [...prev, { from: 'user', text: chatMsg, time: now }]);
        setChatMsg('');
        setTimeout(() => {
            const t2 = new Date().toLocaleTimeString('en-GH', { hour: '2-digit', minute: '2-digit' });
            setChatLog(prev => [...prev, { from: 'agent', text: agentReplies[Math.floor(Math.random() * agentReplies.length)], time: t2 }]);
        }, 1300);
    };

    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatLog]);

    const quickTopics = [
        'My booking is not showing', 'Request a refund', 'Report a late bus',
        'Lost item at terminal', 'Seat complaint', 'Driver behaviour report',
    ];

    /* Operator/Admin-only: open tickets */
    const openTickets = [
        { id: 'TKT-82341', user: 'Akua Mensah',     issue: 'Refund request for cancelled trip', status: 'Open',       time: '09:15 AM' },
        { id: 'TKT-82290', user: 'Kwame Boateng',   issue: 'Bus delayed by 2 hours on AC-01',   status: 'In Progress', time: '08:42 AM' },
        { id: 'TKT-82100', user: 'Ama Asante',      issue: 'Lost bag on Tamale route',           status: 'Open',       time: '07:30 AM' },
        { id: 'TKT-82055', user: 'Kofi Frimpong',   issue: 'Seat not as booked',                 status: 'Resolved',   time: 'Yesterday' },
    ];

    const isStaff = role === 'Operator' || role === 'Admin';

    return (
        <div className="page-enter" style={{ background: 'var(--bg-light)', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '3rem' }}>
            <div className="container">
                {/* Page header */}
                <div className="mb-4">
                    <button className="btn btn-link ps-0 text-decoration-none fw-bold d-flex align-items-center gap-2"
                        style={{ color: 'var(--ghana-black)' }}
                        onClick={() => navigate(-1)}>
                        ← Back
                    </button>
                    <h3 className="fw-bold mb-1">Contact Terminal</h3>
                    <p className="text-secondary mb-0">
                        {isStaff
                            ? 'Manage incoming passenger support tickets and communicate with travellers.'
                            : 'Live chat with our terminal support team or call your nearest terminal.'}
                    </p>
                </div>

                <div className="row g-4">
                    {/* LEFT — Chat / Ticket Queue */}
                    <div className="col-lg-7">
                        {isStaff ? (
                            /* ── TICKET QUEUE (Operator / Admin view) ── */
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                                <div className="p-3 d-flex align-items-center justify-content-between"
                                    style={{ background: 'var(--ghana-black)', color: 'white' }}>
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center"
                                            style={{ width: 40, height: 40, background: 'var(--ghana-gold)' }}>
                                            <MessageCircle size={18} style={{ color: 'var(--ghana-black)' }} />
                                        </div>
                                        <div>
                                            <div className="fw-bold">Support Ticket Queue</div>
                                            <small style={{ color: 'var(--ghana-gold)' }}>
                                                {openTickets.filter(t => t.status !== 'Resolved').length} active tickets
                                            </small>
                                        </div>
                                    </div>
                                    <span className="badge" style={{ background: 'var(--ghana-red)' }}>
                                        {openTickets.filter(t => t.status === 'Open').length} New
                                    </span>
                                </div>

                                <div className="p-3 d-flex flex-column gap-2" style={{ background: '#f7f8fa', minHeight: 380 }}>
                                    {openTickets.map(tk => (
                                        <div key={tk.id}
                                            className={`card border-0 p-3 rounded-3 hover-lift ${activeTicket?.id === tk.id ? 'border border-warning' : ''}`}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setActiveTicket(tk)}>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <div className="fw-bold small">{tk.user}</div>
                                                    <div className="small text-secondary">{tk.issue}</div>
                                                </div>
                                                <div className="text-end">
                                                    <span className={`badge ${tk.status === 'Resolved' ? 'badge-confirmed' : tk.status === 'In Progress' ? 'badge-pending' : 'badge-cancelled'}`}>
                                                        {tk.status}
                                                    </span>
                                                    <div className="small text-secondary mt-1">{tk.time}</div>
                                                </div>
                                            </div>
                                            {activeTicket?.id === tk.id && (
                                                <div className="mt-3 pt-3 border-top d-flex gap-2">
                                                    <button className="btn btn-sm btn-primary fw-bold">Reply</button>
                                                    <button className="btn btn-sm btn-outline-success fw-bold">Mark Resolved</button>
                                                    <button className="btn btn-sm btn-outline-secondary fw-bold">Escalate</button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Reply input (staff) */}
                                <div className="p-3 border-top bg-white d-flex gap-2">
                                    <input className="form-control bg-light border-0 rounded-pill"
                                        placeholder={activeTicket ? `Reply to ${activeTicket.user}...` : 'Select a ticket to reply...'}
                                        value={chatMsg} onChange={e => setChatMsg(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && sendChat()} />
                                    <button className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: 42, height: 42, flexShrink: 0 }} onClick={sendChat}>
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* ── PASSENGER LIVE CHAT ── */
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                                <div className="p-3 d-flex align-items-center gap-3"
                                    style={{ background: 'var(--ghana-black)', color: 'white' }}>
                                    <div className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: 42, height: 42, background: 'var(--ghana-gold)' }}>
                                        <MessageCircle size={20} style={{ color: 'var(--ghana-black)' }} />
                                    </div>
                                    <div>
                                        <div className="fw-bold">Terminal Support Agent</div>
                                        <small style={{ color: 'var(--ghana-gold)' }}>🟢 Online · Average response: 2 min</small>
                                    </div>
                                </div>

                                {/* Quick topics */}
                                <div className="px-3 pt-3" style={{ background: '#f7f8fa' }}>
                                    <div className="small fw-bold text-secondary mb-2">Quick Topics:</div>
                                    <div className="d-flex flex-wrap gap-2 mb-3">
                                        {quickTopics.map(t => (
                                            <button key={t} className="btn btn-sm btn-light rounded-pill border"
                                                onClick={() => setChatMsg(t)} style={{ fontSize: '0.78rem' }}>{t}</button>
                                        ))}
                                    </div>
                                </div>

                                <div className="px-3 pb-3 d-flex flex-column gap-2"
                                    style={{ minHeight: 300, maxHeight: 340, overflowY: 'auto', background: '#f7f8fa' }}>
                                    {chatLog.map((msg, i) => (
                                        <div key={i} className={`d-flex flex-column ${msg.from === 'user' ? 'align-items-end' : 'align-items-start'}`}>
                                            <div className={msg.from === 'user' ? 'chat-bubble-out' : 'chat-bubble-in'}>{msg.text}</div>
                                            <div className="chat-time">{msg.time}</div>
                                        </div>
                                    ))}
                                    <div ref={chatEndRef} />
                                </div>

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
                        )}
                    </div>

                    {/* RIGHT — Info panel */}
                    <div className="col-lg-5">
                        <div className="card border-0 shadow-sm rounded-4 p-4 mb-3">
                            <h6 className="fw-bold mb-3">Terminal Phone Numbers</h6>
                            <div className="d-flex flex-column gap-2">
                                {[
                                    { terminal: 'Accra Circle Terminal',  phone: '+233 30 221 0001' },
                                    { terminal: 'Kumasi Adum Terminal',    phone: '+233 32 202 0042' },
                                    { terminal: 'Tamale Central Terminal', phone: '+233 37 202 0055' },
                                    { terminal: 'Takoradi Terminal',       phone: '+233 31 202 0088' },
                                    { terminal: 'Sunyani Bus Station',     phone: '+233 35 202 0031' },
                                    { terminal: 'Cape Coast Station',      phone: '+233 33 202 0017' },
                                ].map(c => (
                                    <div key={c.terminal} className="d-flex align-items-center gap-3 p-2 rounded-3 bg-light">
                                        <Phone size={16} style={{ color: 'var(--ghana-green)', flexShrink: 0 }} />
                                        <div>
                                            <div className="small fw-bold">{c.terminal}</div>
                                            <a href={`tel:${c.phone.replace(/\s/g,'')}`}
                                                className="small text-decoration-none"
                                                style={{ color: 'var(--ghana-green)' }}>{c.phone}</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm rounded-4 p-4 mb-3">
                            <h6 className="fw-bold mb-3">Support Hours</h6>
                            <div className="d-flex flex-column gap-2">
                                {[
                                    { day: 'Monday – Friday', hours: '5:00 AM – 11:00 PM' },
                                    { day: 'Saturday',        hours: '5:00 AM – 10:00 PM' },
                                    { day: 'Sunday',          hours: '6:00 AM – 9:00 PM'  },
                                    { day: 'Public Holidays', hours: 'Emergency Only'       },
                                ].map(s => (
                                    <div key={s.day} className="d-flex justify-content-between py-1 border-bottom">
                                        <small className="fw-bold">{s.day}</small>
                                        <small style={{ color: 'var(--ghana-green)' }}>{s.hours}</small>
                                    </div>
                                ))}
                            </div>
                            <div className="alert border-0 rounded-3 mt-3 p-3"
                                style={{ background: 'rgba(252,209,22,0.12)' }}>
                                <small className="fw-bold" style={{ color: '#8a6e00' }}>
                                    📞 24/7 Emergency: +233 20 000 0911
                                </small>
                            </div>
                        </div>

                        {/* Stats for staff */}
                        {isStaff && (
                            <div className="card border-0 shadow-sm rounded-4 p-4">
                                <h6 className="fw-bold mb-3">Support Stats (Today)</h6>
                                <div className="row g-2">
                                    {[
                                        { icon: <CheckCircle size={18}/>, label: 'Resolved', value: '24', color: 'var(--ghana-green)' },
                                        { icon: <AlertCircle size={18}/>, label: 'Pending',  value: '7',  color: 'var(--ghana-red)' },
                                        { icon: <Clock size={18}/>,       label: 'Avg Time', value: '4m', color: 'var(--ghana-gold)' },
                                        { icon: <Users size={18}/>,       label: 'Contacts', value: '31', color: '#3498db' },
                                    ].map(s => (
                                        <div key={s.label} className="col-6">
                                            <div className="rounded-3 p-3 text-center" style={{ background: '#f7f8fa' }}>
                                                <div style={{ color: s.color }}>{s.icon}</div>
                                                <div className="fw-bold">{s.value}</div>
                                                <div className="small text-secondary">{s.label}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactTerminal;
