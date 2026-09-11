import React, { useState } from 'react';
import { Search as SearchIcon, MapPin, Calendar, Clock, Bus, Shield, Info, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { majorCities } from '../utils/regions';

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({ origin: '', destination: '', date: '' });

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchData.origin || !searchData.destination) {
            alert("Please select both origin and destination.");
            return;
        }
        navigate('/search-results', { state: searchData });
    };

    return (
        <div className="search-page bg-light min-vh-100 py-5 animate-fade-in">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center mb-5">
                        <h1 className="fw-bold display-4 mb-3">Find Your Next <span className="text-primary">Adventure</span></h1>
                        <p className="text-secondary fs-5 px-lg-5">Search through Ghana's largest network of partner bus operators and book your seat in seconds.</p>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                            <div className="row g-0">
                                <div className="col-md-4 bg-dark text-white p-5 d-flex flex-column justify-content-center">
                                    <div className="mb-4">
                                        <div className="bg-primary text-dark p-2 rounded-3 d-inline-block mb-3">
                                            <SearchIcon size={24} />
                                        </div>
                                        <h4 className="fw-bold">Smart Search</h4>
                                        <p className="small opacity-50 mb-0">We compare 12+ premium operators to find you the best price and schedule.</p>
                                    </div>
                                    <div className="mt-auto">
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <Shield size={16} className="text-primary" />
                                            <small className="fw-bold">Secured by RLS</small>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <Bus size={16} className="text-primary" />
                                            <small className="fw-bold">Vetted Operators</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8 p-5 bg-white">
                                    <form onSubmit={handleSearch}>
                                        <div className="mb-4">
                                            <label className="form-label fw-bold small text-secondary">DEPART FROM</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-0"><MapPin size={18} className="text-primary" /></span>
                                                <select 
                                                    className="form-select bg-light border-0 py-3"
                                                    value={searchData.origin}
                                                    onChange={(e) => setSearchData({...searchData, origin: e.target.value})}
                                                    required
                                                >
                                                    <option value="">Select Origin City</option>
                                                    {majorCities.map(city => <option key={city} value={city}>{city}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mb-4 text-center position-relative">
                                            <hr className="my-0" />
                                            <div className="position-absolute top-50 start-50 translate-middle bg-white px-3">
                                                <div className="bg-light p-2 rounded-circle border">
                                                    <ArrowRight size={16} className="text-secondary rotate-90 d-md-none" />
                                                    <ArrowRight size={16} className="text-secondary d-none d-md-block" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label fw-bold small text-secondary">TRAVEL TO</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-0"><MapPin size={18} className="text-primary" /></span>
                                                <select 
                                                    className="form-select bg-light border-0 py-3"
                                                    value={searchData.destination}
                                                    onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                                                    required
                                                >
                                                    <option value="">Select Destination City</option>
                                                    {majorCities.map(city => <option key={city} value={city}>{city}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <label className="form-label fw-bold small text-secondary">TRAVEL DATE</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-0"><Calendar size={18} className="text-primary" /></span>
                                                <input 
                                                    type="date" 
                                                    className="form-control bg-light border-0 py-3" 
                                                    value={searchData.date}
                                                    onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <button className="btn btn-primary w-100 py-3 fw-bold shadow d-flex align-items-center justify-content-center gap-2 fs-5">
                                            <SearchIcon size={24} /> SEARCH FOR BUSES
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popular Searches */}
                <div className="row justify-content-center mt-5">
                    <div className="col-lg-10">
                        <h6 className="fw-bold mb-4 opacity-50 uppercase small text-center">Popular Searches</h6>
                        <div className="d-flex flex-wrap justify-content-center gap-2">
                            {['Accra to Kumasi', 'Kumasi to Tamale', 'Accra to Takoradi', 'Sunyani to Accra', 'Cape Coast to Accra'].map((route, i) => (
                                <button 
                                    key={i} 
                                    className="btn btn-white shadow-sm border rounded-pill px-4 py-2 small hover-lift"
                                    onClick={() => {
                                        const [origin, , destination] = route.split(' ');
                                        setSearchData({
                                            origin: origin,
                                            destination: destination,
                                            date: ''
                                        });
                                    }}
                                >
                                    {route}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
