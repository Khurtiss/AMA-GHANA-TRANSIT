import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Clock, Star, Zap, ChevronRight, Bus, Calendar, Info } from 'lucide-react';
import { majorCities } from '../utils/regions';

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialSearch = location.state || { origin: '', destination: '', date: '' };
    
    const [searchData, setSearchData] = useState(initialSearch);
    const allBuses = [
        { id: 1, operator: 'VIP TRANSPORT', type: 'Executive', departure: '08:30 AM', arrival: '01:30 PM', price: '120', seats: 8, rating: 4.8, features: ['AC', 'WiFi', 'USB'] },
        { id: 2, operator: 'STC EXPRESS', type: 'Super Galloper', departure: '09:00 AM', arrival: '02:00 PM', price: '110', seats: 15, rating: 4.5, features: ['AC', 'WiFi'] },
        { id: 3, operator: 'OA TRAVELS', type: 'Standard', departure: '10:30 AM', arrival: '03:30 PM', price: '100', seats: 24, rating: 4.2, features: ['AC'] },
        { id: 4, operator: 'VIP TRANSPORT', type: 'Standard', departure: '11:00 AM', arrival: '04:00 PM', price: '90', seats: 32, rating: 4.6, features: ['AC'] }
    ];
    const [filtredBuses, setFilteredBuses] = useState(allBuses);
    const [filters, setFilters] = useState({
        timeSlot: '',
        operators: [],
        priceRange: 300,
        sortBy: 'best-match'
    });

    const handleSelectBus = (bus) => {
        navigate('/seat-selection', { state: { bus, searchData } });
    };

    const handleTimeFilter = (timeSlot) => {
        setFilters(prev => ({ ...prev, timeSlot: prev.timeSlot === timeSlot ? '' : timeSlot }));
    };

    const handleOperatorFilter = (operator) => {
        setFilters(prev => ({
            ...prev,
            operators: prev.operators.includes(operator)
                ? prev.operators.filter(op => op !== operator)
                : [...prev.operators, operator]
        }));
    };

    const handleSort = (sortType) => {
        setFilters(prev => ({ ...prev, sortBy: sortType }));
    };

    // Apply filters and sorting
    useEffect(() => {
        let filtered = allBuses.filter(bus => {
            // Price filter
            if (parseInt(bus.price) > filters.priceRange) return false;
            
            // Operator filter (normalize names so UI options match bus data)
            if (filters.operators.length > 0) {
                const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
                const busOp = normalize(bus.operator);
                const matchFound = filters.operators.some(op => normalize(op) === busOp);
                if (!matchFound) return false;
            }
            
            // Time slot filter
            if (filters.timeSlot) {
                const [timePart, meridiem] = bus.departure.split(' ');
                const [hourStr, minuteStr] = timePart.split(':');
                let hour = parseInt(hourStr, 10);
                const minute = parseInt(minuteStr, 10);

                // Convert to 24-hour format for accurate slot matches
                if (meridiem === 'PM' && hour !== 12) hour += 12;
                if (meridiem === 'AM' && hour === 12) hour = 0;

                if (filters.timeSlot === 'morning' && !(hour >= 6 && hour < 12)) return false;
                if (filters.timeSlot === 'afternoon' && !(hour >= 12 && hour < 18)) return false;
                if (filters.timeSlot === 'evening' && !(hour >= 18 && hour < 24)) return false;
            }
            
            return true;
        });
        
        // Apply sorting
        if (filters.sortBy === 'cheapest') {
            filtered.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        } else if (filters.sortBy === 'earliest') {
            filtered.sort((a, b) => {
                const timeA = a.departure.replace(' AM', '').replace(' PM', '').split(':').map(Number);
                const timeB = b.departure.replace(' AM', '').replace(' PM', '').split(':').map(Number);
                const hourA = timeA[0] + (a.departure.includes('PM') && timeA[0] !== 12 ? 12 : 0) - (a.departure.includes('AM') && timeA[0] === 12 ? 12 : 0);
                const hourB = timeB[0] + (b.departure.includes('PM') && timeB[0] !== 12 ? 12 : 0) - (b.departure.includes('AM') && timeB[0] === 12 ? 12 : 0);
                return hourA - hourB || timeA[1] - timeB[1];
            });
        } else if (filters.sortBy === 'highest-rated') {
            filtered.sort((a, b) => b.rating - a.rating);
        }
        
        setFilteredBuses(filtered);
    }, [filters]);

    return (
        <div className="search-results-page bg-light min-vh-100 py-4 animate-fade-in">
            {/* Search Context Bar */}
            <div className="bg-dark text-white py-4 mb-4 shadow">
                <div className="container">
                    <form className="row g-3 align-items-end">
                        <div className="col-md-3">
                            <label className="form-label x-small fw-bold text-primary">ORIGIN</label>
                            <select 
                                className="form-select bg-white bg-opacity-10 border-0 text-white"
                                value={searchData.origin}
                                onChange={(e) => setSearchData({...searchData, origin: e.target.value})}
                            >
                                <option value="" className="text-dark">Select City</option>
                                {majorCities.map(city => <option key={city} value={city} className="text-dark">{city}</option>)}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label x-small fw-bold text-primary">DESTINATION</label>
                            <select 
                                className="form-select bg-white bg-opacity-10 border-0 text-white"
                                value={searchData.destination}
                                onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                            >
                                <option value="" className="text-dark">Select City</option>
                                {majorCities.map(city => <option key={city} value={city} className="text-dark">{city}</option>)}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label x-small fw-bold text-primary">DEPARTURE DATE</label>
                            <input 
                                type="date" 
                                className="form-control bg-white bg-opacity-10 border-0 text-white" 
                                value={searchData.date}
                                onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                            />
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-primary w-100 fw-bold d-flex align-items-center justify-content-center gap-2">
                                <Search size={18} /> UPDATE SEARCH
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="container">
                <div className="row g-4">
                    {/* Filters Sidebar */}
                    <div className="col-lg-3">
                        <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px', zIndex: 10 }}>
                            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                                <Filter size={20} className="text-primary" /> Filters
                            </h5>
                            
                            <div className="mb-4">
                                <label className="form-label fw-bold small">Departure Time</label>
                                <div className="d-grid gap-2">
                                    <button 
                                        className={`btn btn-sm text-start ${filters.timeSlot === 'morning' ? 'btn-primary' : 'btn-outline-dark'}`}
                                        onClick={() => handleTimeFilter('morning')}
                                    >
                                        Morning (06:00 - 12:00)
                                    </button>
                                    <button 
                                        className={`btn btn-sm text-start ${filters.timeSlot === 'afternoon' ? 'btn-primary' : 'btn-outline-dark'}`}
                                        onClick={() => handleTimeFilter('afternoon')}
                                    >
                                        Afternoon (12:00 - 18:00)
                                    </button>
                                    <button 
                                        className={`btn btn-sm text-start ${filters.timeSlot === 'evening' ? 'btn-primary' : 'btn-outline-dark'}`}
                                        onClick={() => handleTimeFilter('evening')}
                                    >
                                        Evening (18:00 - 00:00)
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold small">Operators</label>
                                {['VIP Transport', 'STC Express', 'OA Travels', 'Metro Mass'].map((op, i) => (
                                    <div key={i} className="form-check mb-2">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            id={`op-${i}`} 
                                            checked={filters.operators.includes(op)}
                                            onChange={() => handleOperatorFilter(op)}
                                        />
                                        <label className="form-check-label small" htmlFor={`op-${i}`}>{op}</label>
                                    </div>
                                ))}
                            </div>

                            <div className="mb-0">
                                <label className="form-label fw-bold small">Price Range (GHS)</label>
                                <input 
                                    type="range" 
                                    className="form-range" 
                                    min="50" 
                                    max="300" 
                                    step="10" 
                                    value={filters.priceRange}
                                    onChange={(e) => setFilters(prev => ({ ...prev, priceRange: parseInt(e.target.value) }))}
                                />
                                <div className="d-flex justify-content-between small text-secondary">
                                    <span>50</span>
                                    <span>{filters.priceRange}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results List */}
                    <div className="col-lg-9">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold mb-0">{filtredBuses.length} Buses Found</h5>
                            <div className="dropdown">
                                <button className="btn btn-white btn-sm shadow-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                    Sort By: {filters.sortBy === 'best-match' ? 'Best Match' : filters.sortBy === 'cheapest' ? 'Cheapest First' : filters.sortBy === 'earliest' ? 'Earliest First' : 'Highest Rated'}
                                </button>
                                <ul className="dropdown-menu shadow border-0">
                                    <li><button className="dropdown-item small" onClick={() => handleSort('best-match')}>Best Match</button></li>
                                    <li><button className="dropdown-item small" onClick={() => handleSort('cheapest')}>Cheapest First</button></li>
                                    <li><button className="dropdown-item small" onClick={() => handleSort('earliest')}>Earliest First</button></li>
                                    <li><button className="dropdown-item small" onClick={() => handleSort('highest-rated')}>Highest Rated</button></li>
                                </ul>
                            </div>
                        </div>

                        {filtredBuses.map((bus) => (
                            <div key={bus.id} className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 hover-lift bus-card border-start border-5 border-primary">
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-md-9 p-4">
                                            <div className="d-flex justify-content-between align-items-start mb-4">
                                                <div>
                                                    <h5 className="fw-bold mb-1">{bus.operator}</h5>
                                                    <span className="badge bg-light text-secondary border px-2 py-1">{bus.type}</span>
                                                </div>
                                                <div className="text-end">
                                                    <div className="d-flex align-items-center gap-1 text-primary mb-1">
                                                        <Star size={16} fill="currentColor" />
                                                        <span className="fw-bold text-dark">{bus.rating}</span>
                                                    </div>
                                                    <small className="text-secondary">(120 Reviews)</small>
                                                </div>
                                            </div>

                                            <div className="row align-items-center mb-4">
                                                <div className="col-4">
                                                    <h4 className="fw-bold mb-0">{bus.departure}</h4>
                                                    <small className="text-secondary">{searchData.origin || 'Origin'}</small>
                                                </div>
                                                <div className="col-4 text-center">
                                                    <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                                                        <div className="border-bottom border-2 flex-grow-1" style={{ borderStyle: 'dashed !important' }}></div>
                                                        <Clock size={16} className="text-primary" />
                                                        <div className="border-bottom border-2 flex-grow-1" style={{ borderStyle: 'dashed !important' }}></div>
                                                    </div>
                                                    <small className="text-secondary">5h 00m</small>
                                                </div>
                                                <div className="col-4 text-end">
                                                    <h4 className="fw-bold mb-0">{bus.arrival}</h4>
                                                    <small className="text-secondary">{searchData.destination || 'Destination'}</small>
                                                </div>
                                            </div>

                                            <div className="d-flex gap-2">
                                                {bus.features.map((feat, idx) => (
                                                    <span key={idx} className="badge bg-light text-dark fw-normal px-2 py-1">
                                                        {feat}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-md-3 bg-light p-4 d-flex flex-column justify-content-center text-center border-start">
                                            <small className="text-secondary mb-1">Starting from</small>
                                            <h3 className="fw-bold mb-1 text-primary">GHS {bus.price}</h3>
                                            <p className="small text-danger fw-bold mb-4">{bus.seats} seats left</p>
                                            <button 
                                                className="btn btn-dark w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 mt-auto"
                                                onClick={() => handleSelectBus(bus)}
                                            >
                                                SELECT SEATS <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Banner for reliability */}
                        <div className="alert bg-primary bg-opacity-10 border-0 rounded-4 p-4 d-flex align-items-center gap-3">
                            <Zap className="text-primary" size={24} />
                            <p className="mb-0 small fw-bold">All trips are covered by our secure payment guarantee. Travel with peace of mind.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
