import React from 'react';
import { QrCode, Download, Printer, Share2, Calendar, Clock, Bus, User, CreditCard, Star } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const DigitalTicket = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Accept ticket data via route state (from booking flow) or use rich defaults
    const ticket = location.state?.ticket || {
        id: 'AGT-9902XLL',
        passenger: 'Kojo Antwi',
        operator: 'VIP Transport',
        route: 'Accra → Kumasi',
        from: 'Accra',
        fromTerminal: 'Circle Terminal',
        to: 'Kumasi',
        toTerminal: 'Adum Terminal',
        date: 'Oct 12, 2026',
        time: '08:30 AM',
        seat: '12A',
        service: 'Executive',
        price: 'GHS 120.00',
        status: 'Confirmed',
        amenities: ['AC', 'WiFi', 'Recliner', 'Water'],
    };

    const handleAction = (type) => {
        switch (type) {
            case 'Download':
                handleDownload();
                break;
            case 'Print':
                handlePrint();
                break;
            case 'Share':
                handleShare();
                break;
            default:
                alert(`${type} — this feature is coming soon!`);
        }
    };

    const handleDownload = () => {
        // Create a simple text representation of the ticket
        const ticketText = `
AMA GHANA TRANSIT - E-TICKET
============================

Ticket ID: ${ticket.id}
Passenger: ${ticket.passenger}
Operator: ${ticket.operator}
Route: ${ticket.route}
Date: ${ticket.date}
Time: ${ticket.time}
Seat: ${ticket.seat}
Service: ${ticket.service}
Fare: ${ticket.price}
Status: ${ticket.status}

This ticket is valid for single journey only.
Present with valid National ID or Passport.

Generated on: ${new Date().toLocaleString()}
        `.trim();

        // Create a blob and download it
        const blob = new Blob([ticketText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ticket-${ticket.id}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('Ticket downloaded successfully!');
    };

    const handlePrint = () => {
        // Trigger browser print dialog
        window.print();
    };

    const handleShare = async () => {
        const shareData = {
            title: 'My AMA Ghana Transit Ticket',
            text: `Check out my ticket for ${ticket.route} on ${ticket.date} at ${ticket.time}`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
                fallbackShare();
            }
        } else {
            fallbackShare();
        }
    };

    const fallbackShare = () => {
        // Copy ticket details to clipboard as fallback
        const shareText = `My AMA Ghana Transit Ticket:\nTicket ID: ${ticket.id}\nRoute: ${ticket.route}\nDate: ${ticket.date}\nTime: ${ticket.time}\n\nView: ${window.location.href}`;
        
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Ticket details copied to clipboard! You can now paste and share.');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Ticket details copied to clipboard! You can now paste and share.');
        });
    };

    const statusColor =
        ticket.status === 'Confirmed' ? 'var(--ghana-green)' :
        ticket.status === 'Pending'   ? '#8a6e00' :
        'var(--ghana-red)';

    return (
        <div className="digital-ticket-page min-vh-100 py-5 animate-fade-in" style={{ background: 'var(--bg-light)' }}>
            {/* Ghana colour stripe */}
            <div className="ghana-stripe" />

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">

                        {/* Back — navigate(-1) prevents blank page on back */}
                        <button
                            className="btn btn-link text-decoration-none ps-0 mb-4 fw-bold d-flex align-items-center gap-2"
                            style={{ color: 'var(--ghana-black)' }}
                            onClick={() => navigate(-1)}>
                            ← Back
                        </button>

                        {/* ─── Ticket Card ─── */}
                        <div className="ticket-card card border-0 mb-4">
                            <div className="ticket-stripe" />

                            {/* Header */}
                            <div className="p-4 d-flex justify-content-between align-items-center"
                                style={{ background: 'var(--ghana-black)', color: 'white' }}>
                                <div>
                                    <h5 className="fw-bold mb-0" style={{ color: 'var(--ghana-gold)' }}>E-TICKET</h5>
                                    <small className="opacity-60 fw-bold" style={{ letterSpacing: '1px' }}>AMA GHANA TRANSIT</small>
                                </div>
                                <div className="text-end">
                                    <div className="badge px-3 py-2"
                                        style={{ background: statusColor, color: 'white', fontWeight: 600 }}>
                                        {ticket.status}
                                    </div>
                                    <div className="small opacity-50 mt-1">{ticket.id}</div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="card-body p-4 position-relative bg-white">
                                <div className="ticket-notch-left" style={{ background: 'var(--bg-light)' }} />
                                <div className="ticket-notch-right" style={{ background: 'var(--bg-light)' }} />

                                {/* Passenger & Operator */}
                                <div className="row g-3 mb-4">
                                    <div className="col-6">
                                        <div className="small fw-bold text-secondary mb-1" style={{ fontSize: '0.68rem', textTransform: 'uppercase' }}>Passenger</div>
                                        <div className="fw-bold">{ticket.passenger}</div>
                                    </div>
                                    <div className="col-6 text-end">
                                        <div className="small fw-bold text-secondary mb-1" style={{ fontSize: '0.68rem', textTransform: 'uppercase' }}>Operator</div>
                                        <div className="fw-bold">{ticket.operator}</div>
                                    </div>
                                </div>

                                {/* Route */}
                                <div className="bg-light rounded-3 p-3 mb-4 d-flex align-items-center justify-content-between">
                                    <div className="text-center flex-grow-1">
                                        <div className="fw-bold fs-5">{ticket.from}</div>
                                        <small className="text-secondary">{ticket.fromTerminal}</small>
                                    </div>
                                    <div className="px-3">
                                        <Bus size={22} style={{ color: 'var(--ghana-gold)' }} />
                                    </div>
                                    <div className="text-center flex-grow-1">
                                        <div className="fw-bold fs-5">{ticket.to}</div>
                                        <small className="text-secondary">{ticket.toTerminal}</small>
                                    </div>
                                </div>

                                {/* Details grid */}
                                <div className="row g-3 mb-4">
                                    {[
                                        { icon: <Calendar size={14} />, label: 'Date',    value: ticket.date },
                                        { icon: <Clock size={14} />,    label: 'Time',    value: ticket.time },
                                        { icon: <User size={14} />,     label: 'Seat',    value: ticket.seat },
                                        { icon: <Star size={14} />,     label: 'Service', value: ticket.service },
                                        { icon: <CreditCard size={14}/>,label: 'Fare',    value: ticket.price },
                                    ].map((d, i) => (
                                        <div key={i} className="col-4">
                                            <div className="mb-1" style={{ color: 'var(--ghana-gold)' }}>{d.icon}</div>
                                            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>{d.label}</div>
                                            <div className="fw-bold small">{d.value}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Amenities */}
                                {ticket.amenities && ticket.amenities.length > 0 && (
                                    <div className="mb-4">
                                        <div className="small fw-bold text-secondary mb-2" style={{ textTransform: 'uppercase', fontSize: '0.68rem' }}>Amenities</div>
                                        <div className="d-flex gap-2 flex-wrap">
                                            {ticket.amenities.map(a => (
                                                <span key={a} className="badge bg-light text-dark border px-3 py-2">{a}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="ticket-dashed mb-4" />

                                {/* QR Code */}
                                <div className="text-center py-3">
                                    <div className="bg-light p-3 rounded-4 d-inline-block shadow-sm mb-2">
                                        <QrCode size={160} strokeWidth={1.5} />
                                    </div>
                                    <p className="small text-secondary mb-0">Scan at terminal gate for boarding</p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-3 text-center bg-light">
                                <small className="text-secondary">Valid for single journey only. Present with valid National ID or Passport.</small>
                            </div>
                            <div className="ticket-stripe" />
                        </div>

                        {/* Action Buttons */}
                        <div className="row g-2 mb-4 action-buttons">
                            {[
                                { icon: <Download size={20} />, label: 'Download' },
                                { icon: <Printer size={20} />,  label: 'Print'    },
                                { icon: <Share2 size={20} />,   label: 'Share'    },
                            ].map(a => (
                                <div key={a.label} className="col-4">
                                    <button
                                        className="btn btn-white w-100 py-3 rounded-3 d-flex flex-column align-items-center gap-1 border shadow-sm"
                                        onClick={() => handleAction(a.label)}>
                                        <span style={{ color: 'var(--ghana-gold)' }}>{a.icon}</span>
                                        <span className="small fw-bold">{a.label}</span>
                                    </button>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DigitalTicket;
