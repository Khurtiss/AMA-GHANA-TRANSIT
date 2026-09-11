import React, { useState } from 'react';
import { Search, MapPin, Calendar, ArrowRight, Shield, Clock, Users, Star, Bus, ChevronRight, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { majorCities } from '../utils/regions';
import coatOfArms from '../assets/coat-of-arms.png';
import accraKumasiImg from '../assets/accra-kumasi.png';
import kumasiTamaleImg from '../assets/kumasi-tamale.png';
import accraTakoradiImg from '../assets/accra-takoradi.png';
import sunyaniAccraImg from '../assets/sunyani-accra.png';


const Home = () => {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({ origin: '', destination: '', date: '' });

    const handleSearch = (e) => {
        e.preventDefault();
        // Input sanitization placeholder
        if (!searchData.origin || !searchData.destination) {
            alert("Please select both origin and destination.");
            return;
        }
        navigate('/search-results', { state: searchData });
    };

    const handleViewAllRoutes = () => {
        // Navigate to the search results page showing all available routes
        navigate('/search-results');
    };

    return (
        <div className="home-page animate-fade-in">
            {/* Ghana stripe accent */}
            <div className="ghana-stripe" />

            {/* Hero & Search Section */}
            <section className="hero-section py-5 d-flex align-items-center" style={{ minHeight: '80vh', backgroundColor: 'var(--ghana-black)', color: 'white', position: 'relative', overflow: 'hidden' }}>
                {/* Coat of Arms watermark — homepage only */}
                <img src={coatOfArms} alt="" aria-hidden="true" className="homepage-watermark" />
                <div className="container position-relative" style={{ zIndex: 2 }}>


                    <div className="row align-items-center">
                        <div className="col-lg-7 text-center text-lg-start mb-5 mb-lg-0">
                            <h1 className="display-4 fw-bold mb-3 text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                                AMA GHANA <span className="text-primary" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>TRANSIT</span>
                            </h1>
                            <p className="fs-4 mb-5 text-white" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.8)', fontWeight: '500' }}>Connect with every corner of Ghana. Secure, reliable, and intelligent bus travel at your fingertips.</p>
                            
                            {/* Fast Search Card */}
                            <div className="glass-card p-4 shadow-lg border-primary border-opacity-25" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                <form onSubmit={handleSearch} className="row g-3">
                                    <div className="col-md-4 text-start">
                                        <label className="small fw-bold mb-1 opacity-75">ORIGIN</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-transparent border-secondary text-primary border-end-0">
                                                <MapPin size={18} />
                                            </span>
                                            <select 
                                                className="form-select bg-dark text-white border-secondary border-start-0 ps-0"
                                                value={searchData.origin}
                                                onChange={(e) => setSearchData({...searchData, origin: e.target.value})}
                                            >
                                                <option value="">Select Origin</option>
                                                {majorCities.map(city => <option key={city} value={city}>{city}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-start">
                                        <label className="small fw-bold mb-1 opacity-75">DESTINATION</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-transparent border-secondary text-primary border-end-0">
                                                <MapPin size={18} />
                                            </span>
                                            <select 
                                                className="form-select bg-dark text-white border-secondary border-start-0 ps-0"
                                                value={searchData.destination}
                                                onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                                            >
                                                <option value="">Select Destination</option>
                                                {majorCities.map(city => <option key={city} value={city}>{city}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-start">
                                        <label className="small fw-bold mb-1 opacity-75">TRAVEL DATE</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-transparent border-secondary text-primary border-end-0">
                                                <Calendar size={18} />
                                            </span>
                                            <input 
                                                type="date" 
                                                className="form-control bg-dark text-white border-secondary border-start-0 ps-0" 
                                                value={searchData.date}
                                                onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2" type="submit">
                                            <Search size={20} /> FIND AVAILABLE BUSES
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-5 d-none d-lg-block">
                             <div className="position-relative">
                                <div className="bg-primary rounded-circle position-absolute" style={{ width: '400px', height: '400px', filter: 'blur(100px)', opacity: '0.2', top: '-50px', right: '-50px' }}></div>
                                <img src={require('../assets/logo.png')} alt="AMA Ghana Transit Logo" className="img-fluid floating-animation" style={{ filter: 'drop-shadow(0 20px 50px rgba(255,215,0,0.3))' }} />
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Features */}
            <section className="features-section py-5 bg-light">
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold display-5">Why Choose <span className="text-primary">AMA GHANA TRANSIT</span>?</h2>
                        <div className="bg-primary mx-auto mt-3" style={{ height: '4px', width: '80px' }}></div>
                    </div>
                    <div className="row g-4 text-center">
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm p-5 h-100 hover-lift rounded-4">
                                <Shield size={48} className="text-primary mb-4 mx-auto" />
                                <h4 className="fw-bold">Secure Booking</h4>
                                <p className="text-secondary mb-0">Every transaction is encrypted with multi-layer SSL. Managed auth ensures your data is safe.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm p-5 h-100 hover-lift rounded-4">
                                <Users size={48} className="text-primary mb-4 mx-auto" />
                                <h4 className="fw-bold">Passenger First</h4>
                                <p className="text-secondary mb-0">From seat selection to digital tickets, our platform is built for your convenience.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm p-5 h-100 hover-lift rounded-4">
                                <Star size={48} className="text-primary mb-4 mx-auto" />
                                <h4 className="fw-bold">Premium Operators</h4>
                                <p className="text-secondary mb-0">We only partner with Ghana's most reliable and vetted bus transport companies.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Routes */}
            <section className="routes-section py-5">
                <div className="container py-5">
                    <div className="d-flex justify-content-between align-items-end mb-5">
                        <div>
                            <h2 className="fw-bold">Popular Routes</h2>
                            <p className="text-secondary mb-0">The most traveled paths across the nation.</p>
                        </div>
                        <button type="button" className="btn btn-outline-dark d-flex align-items-center gap-2 px-4 py-2" onClick={handleViewAllRoutes}>
                            View All <ArrowRight size={18} />
                        </button>
                    </div>
                    <div className="row g-4">
                        {[
                            { from: 'Accra', to: 'Kumasi', price: '120.00', image: accraKumasiImg },
                            { from: 'Kumasi', to: 'Tamale', price: '200.00', image: kumasiTamaleImg },
                            { from: 'Accra', to: 'Takoradi', price: '100.00', image: accraTakoradiImg },
                            { from: 'Sunyani', to: 'Accra', price: '140.00', image: sunyaniAccraImg }
                        ].map((route, i) => (

                            <div key={i} className="col-md-6 col-lg-3">
                                <div className="card border-0 shadow-sm rounded-4 overflow-hidden bus-card h-100">
                                    <div className="position-relative">
                                        <img src={route.image} className="card-img-top" style={{ height: '180px', objectFit: 'cover' }} alt={route.to} />
                                        <span className="badge bg-primary text-dark position-absolute bottom-0 end-0 m-3 px-3 py-2 fw-bold">GHS {route.price}</span>
                                    </div>
                                    <div className="card-body p-4">
                                        <h5 className="fw-bold mb-1 d-flex align-items-center gap-2">
                                            {route.from} <ArrowRight size={16} className="text-primary" /> {route.to}
                                        </h5>
                                        <p className="small text-secondary mb-0">32+ trips available daily</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
