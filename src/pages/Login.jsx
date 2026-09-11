import React, { useState, useEffect } from 'react';
import { User, Bus, Shield, MapPin, Key, ArrowRight, Github, Mail, AlertCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/auth';

const Login = () => {
    const navigate = useNavigate();
    const { signIn, signInWithGoogle, signInWithGithub, user } = useAuth();
    const [activeTab, setActiveTab] = useState('passenger');
    const [loading, setLoading] = useState(false);
    const [oauthLoading, setOauthLoading] = useState({ google: false, github: false });
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            navigate(`/dashboard/${user.role}`);
        }
    }, [user, navigate]);

    const roles = [
        { id: 'passenger', title: 'Passenger', icon: <User />, color: 'primary', desc: 'Book and manage trips' },
        { id: 'driver', title: 'Driver', icon: <MapPin />, color: 'success', desc: 'Route & manifest access' },
        { id: 'operator', title: 'Operator', icon: <Bus />, color: 'info', desc: 'Fleet & route management' },
        { id: 'admin', title: 'Admin', icon: <Shield />, color: 'dark', desc: 'Full platform control' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Supabase sign in logic
        try {
            // Using our new frontend mock auth provider
            const { error, data } = await signIn(formData);
            if (error) throw error;
            
            // Navigation will be handled by useEffect when user state updates
            setLoading(false);
        } catch (error) {
            alert(error.message);
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setOauthLoading({ ...oauthLoading, google: true });
        try {
            const { error } = await signInWithGoogle();
            if (error) throw error;

            // Navigation will be handled by useEffect
            setOauthLoading({ ...oauthLoading, google: false });
        } catch (error) {
            alert(`Google sign-in failed: ${error}`);
            setOauthLoading({ ...oauthLoading, google: false });
        }
    };

    const handleGithubSignIn = async () => {
        setOauthLoading({ ...oauthLoading, github: true });
        setError('');
        try {
            const { error } = await signInWithGithub();
            if (error) {
                setError(error);
                setOauthLoading({ ...oauthLoading, github: false });
                return;
            }

            // Navigation will be handled by useEffect
        } catch (err) {
            setError(err.message || 'GitHub sign-in failed. Please try again.');
            setOauthLoading({ ...oauthLoading, github: false });
        }
    };

    return (
        <div className="login-page bg-light min-vh-100 d-flex align-items-center py-5 animate-fade-in">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                            <div className="row g-0">
                                {/* Left Side: Role Selection */}
                                <div className="col-lg-5 p-5 bg-dark text-white d-flex flex-column">
                                    <div className="mb-5">
                                        <h3 className="fw-bold text-primary">Portal Selection</h3>
                                        <p className="opacity-50">Select your role to access the correct dashboard.</p>
                                    </div>
                                    <div className="d-grid gap-3 flex-grow-1">
                                        {roles.map((role) => (
                                            <div 
                                                key={role.id}
                                                onClick={() => setActiveTab(role.id)}
                                                className={`p-3 rounded-4 border border-2 border-opacity-25 transition-all cursor-pointer d-flex align-items-center gap-3 ${activeTab === role.id ? `border-${role.color} bg-${role.color} bg-opacity-10` : 'border-white'}`}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className={`text-${activeTab === role.id ? role.color : 'white'}`}>
                                                    {role.icon}
                                                </div>
                                                <div>
                                                    <h6 className="fw-bold mb-0">{role.title}</h6>
                                                    <small className="opacity-50" style={{ fontSize: '0.75rem' }}>{role.desc}</small>
                                                </div>
                                                {activeTab === role.id && <ArrowRight size={16} className="ms-auto text-primary" />}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-5 text-center small opacity-50">
                                        © 2026 AMA GHANA TRANSIT
                                    </div>
                                </div>

                                {/* Right Side: Login Form */}
                                <div className="col-lg-7 p-5 bg-white">
                                    <div className="text-center mb-5">
                                        <h2 className="fw-bold">Sign In</h2>
                                        <p className="text-secondary">Accessing your <span className="text-capitalize fw-bold text-dark">{activeTab}</span> portal</p>
                                    </div>

                                    {error && (
                                        <div className="alert alert-danger d-flex align-items-center gap-2 mb-4" role="alert">
                                            <AlertCircle size={20} />
                                            <div>{error}</div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="mb-4">
                                        <div className="mb-4">
                                            <label className="form-label fw-bold small">Email Address</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-0"><Mail size={18} /></span>
                                                <input 
                                                    type="email" 
                                                    className="form-control bg-light border-0 py-3" 
                                                    placeholder="name@example.com" 
                                                    required 
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="d-flex justify-content-between">
                                                <label className="form-label fw-bold small">Password</label>
                                                <button 
                                                    className="btn btn-link p-0 small text-decoration-none"
                                                    onClick={() => alert('Password reset not implemented yet. Please contact support.')}
                                                >
                                                    Forgot Password?
                                                </button>
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-0"><Key size={18} /></span>
                                                <input 
                                                    type="password" 
                                                    className="form-control bg-light border-0 py-3" 
                                                    placeholder="••••••••" 
                                                    required 
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <button className="btn btn-primary w-100 py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2" disabled={loading}>
                                            {loading ? 'AUTHENTICATING...' : (<>SIGN INTO PORTAL <ArrowRight size={18} /></>)}
                                        </button>
                                    </form>

                                    <div className="divider d-flex align-items-center my-4">
                                        <div className="border-bottom w-100"></div>
                                        <span className="mx-3 text-secondary small text-nowrap">OR CONTINUE WITH</span>
                                        <div className="border-bottom w-100"></div>
                                    </div>

                                    <div className="row g-2 mb-4">
                                        <div className="col-6">
                                            <button 
                                                className="btn btn-outline-dark w-100 py-2 d-flex align-items-center justify-content-center gap-2 small"
                                                onClick={handleGithubSignIn}
                                                disabled={oauthLoading.github}
                                            >
                                                <Github size={18} /> {oauthLoading.github ? 'SIGNING IN...' : 'GitHub'}
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button 
                                                className="btn btn-outline-dark w-100 py-2 d-flex align-items-center justify-content-center gap-2 small"
                                                onClick={handleGoogleSignIn}
                                                disabled={oauthLoading.google}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                                </svg>
                                                {oauthLoading.google ? 'SIGNING IN...' : 'Google'}
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-center text-secondary small">
                                        Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none">Register here</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
