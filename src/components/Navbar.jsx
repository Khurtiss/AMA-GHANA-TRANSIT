import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Bus, Search, Info, User, LogOut, Home } from 'lucide-react';

import { useAuth } from '../utils/auth';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm border-bottom border-warning border-4">
      <div className="container">
        <Link className="navbar-brand py-0" to="/">
          <img src={require('../assets/logo.png')} height={45} alt="AMA Ghana Transit Logo" />
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center fw-bold text-dark px-3" to="/">
                <Home size={18} className="me-1" /> Home
              </NavLink>
            </li>

            {user?.role === 'passenger' && (
              <li className="nav-item">
                <NavLink className="nav-link d-flex align-items-center fw-bold text-dark px-3" to="/search">
                  <Search size={18} className="me-1" /> Search Trips
                </NavLink>
              </li>
            )}

            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center fw-bold text-dark px-3" to="/operators">
                <Bus size={18} className="me-1" /> Operators
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center fw-bold text-dark px-3" to="/about">
                <Info size={18} className="me-1" /> About
              </NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3">
            {(user || isDashboard) ? (
              <>
                <Link to="/dashboard/passenger" className="text-dark text-decoration-none d-flex align-items-center gap-2 px-2 py-1 rounded-pill hover-bg-light">
                   <div className="bg-primary rounded-circle p-1 text-dark shadow-sm"><User size={20} /></div>
                   <span className="small d-none d-sm-inline fw-bold">{user?.email?.split('@')[0] || 'Passenger'}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm px-3 fw-bold d-flex align-items-center gap-2 shadow-sm rounded-pill"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              !isLoginPage && (
                <Link to="/login" className="btn btn-primary d-flex align-items-center px-4 fw-bold shadow-sm rounded-pill">
                  <User size={18} className="me-2" /> Login
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
