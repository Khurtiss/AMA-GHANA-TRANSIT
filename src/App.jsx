import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import ScrollToTop from './components/ScrollToTop';
import AdinkraWatermark from './components/AdinkraWatermark';
import ProtectedRoute from './components/ProtectedRoute';



// Pages (to be created)
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Search from './pages/Search';
import SearchResults from './pages/SearchResults';
import SeatSelection from './pages/SeatSelection';
import BookingSummary from './pages/BookingSummary';
import DigitalTicket from './pages/DigitalTicket';
import Operators from './pages/Operators';
import PassengerDashboard from './dashboards/PassengerDashboard';
import DriverDashboard from './dashboards/DriverDashboard';
import OperatorDashboard from './dashboards/OperatorDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import CookiePolicy from './pages/CookiePolicy';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Notifications from './pages/Notifications';
import ContactTerminal from './pages/ContactTerminal';
import VIPTransportWebsite from './pages/VIPTransportWebsite';
import STCExpressWebsite from './pages/STCExpressWebsite';
import MetroMassWebsite from './pages/MetroMassWebsite';
import OATravelsWebsite from './pages/OATravelsWebsite';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AdinkraWatermark />
      <div className="d-flex flex-column min-vh-100">


        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<ProtectedRoute allowedRoles={['passenger']}><Search /></ProtectedRoute>} />
            <Route path="/search-results" element={<ProtectedRoute allowedRoles={['passenger']}><SearchResults /></ProtectedRoute>} />
            <Route path="/seat-selection" element={<ProtectedRoute allowedRoles={['passenger']}><SeatSelection /></ProtectedRoute>} />
            <Route path="/booking-summary" element={<ProtectedRoute allowedRoles={['passenger']}><BookingSummary /></ProtectedRoute>} />
            <Route path="/digital-ticket" element={<ProtectedRoute allowedRoles={['passenger']}><DigitalTicket /></ProtectedRoute>} />
            <Route path="/dashboard/passenger" element={<ProtectedRoute allowedRoles={['passenger']}><PassengerDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/driver" element={<ProtectedRoute allowedRoles={['driver']}><DriverDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/operator" element={<ProtectedRoute allowedRoles={['operator']}><OperatorDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/operators" element={<Operators />} />
            <Route path="/operators/vip-transport" element={<VIPTransportWebsite />} />
            <Route path="/operators/stc-express" element={<STCExpressWebsite />} />
            <Route path="/operators/metro-mass" element={<MetroMassWebsite />} />
            <Route path="/operators/oa-travels" element={<OATravelsWebsite />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/contact-terminal" element={<ContactTerminal />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
