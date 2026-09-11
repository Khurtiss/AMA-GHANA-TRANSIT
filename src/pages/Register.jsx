import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Phone, ArrowRight, Github, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/auth';

const Register = () => {
    const navigate = useNavigate();
    const { signUp, signInWithGoogle, signInWithGithub, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [oauthLoading, setOauthLoading] = useState({ google: false, github: false });
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'passenger'
    });

    useEffect(() => {
        if (user) {
            navigate(`/dashboard/${user.role}`);
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        setLoading(true);
        
        try {
            // Using our new frontend mock auth provider
            const { error } = await signUp({ email: formData.email, password: formData.password, fullName: formData.fullName, role: formData.role, phone: formData.phone });
            if (error) throw error;

            setTimeout(() => {
                alert("Account created successfully! Please check your email for verification.");
                navigate('/login');
                setLoading(false);
            }, 1500);
        } catch (error) {
            alert(error.message);
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setOauthLoading({ ...oauthLoading, google: true });
        try {
            const { error } = await signInWithGoogle();
            if (error) throw error;

            // Navigation will be handled by useEffect
            setOauthLoading({ ...oauthLoading, google: false });
        } catch (error) {
            alert(`Google sign-up failed: ${error}`);
            setOauthLoading({ ...oauthLoading, google: false });
        }
    };

    const handleGithubSignUp = async () => {
        setOauthLoading({ ...oauthLoading, github: true });
        try {
            const { error } = await signInWithGithub();
            if (error) throw error;

            // Navigation will be handled by useEffect
            setOauthLoading({ ...oauthLoading, github: false });
        } catch (error) {
            alert(`GitHub sign-up failed: ${error}`);
            setOauthLoading({ ...oauthLoading, github: false });
        }
    };

    return (
        <div className="register-page bg-light min-vh-100 d-flex align-items-center py-5 animate-fade-in">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                            <div className="row g-0">
                                {/* Left Side: Branding */}
                                <div className="col-lg-5 p-5 bg-dark text-white d-flex flex-column justify-content-center text-center">
                                    <img src={require('../assets/logo.png')} alt="AGT Logo" className="img-fluid mb-4 mx-auto" style={{ maxWidth: '150px' }} />
                                    <h2 className="fw-bold text-primary">Join AMA GHANA TRANSIT</h2>
                                    <p className="opacity-50 px-lg-4">Start your journey with Ghana's most intelligent transport network. Secure, easy, and efficient.</p>
                                    
                                    <div className="mt-5 d-flex flex-column gap-3 text-start px-lg-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="bg-primary p-2 rounded-circle text-dark"><ArrowRight size={16} /></div>
                                            <small className="fw-bold">Real-time seat selection</small>
                                        </div>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="bg-primary p-2 rounded-circle text-dark"><ArrowRight size={16} /></div>
                                            <small className="fw-bold">Digital tickets on your phone</small>
                                        </div>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="bg-primary p-2 rounded-circle text-dark"><ArrowRight size={16} /></div>
                                            <small className="fw-bold">Rewards for frequent travelers</small>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Register Form */}
                                <div className="col-lg-7 p-5 bg-white">
                                    <div className="text-center mb-5">
                                        <h2 className="fw-bold">Create Account</h2>
                                        <p className="text-secondary">Fill in your details to get started</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="mb-4">
                                        <div className="row g-3">
                                            <div className="col-md-12">
                                                <label className="form-label fw-bold small">Role</label>
                                                <select 
                                                    className="form-select bg-light border-0 py-3" 
                                                    required 
                                                    value={formData.role}
                                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                                >
                                                    <option value="passenger">Passenger</option>
                                                    <option value="driver">Driver</option>
                                                    <option value="operator">Operator</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="form-label fw-bold small">Full Name</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light border-0"><User size={18} /></span>
                                                    <input 
                                                        type="text" 
                                                        className="form-control bg-light border-0 py-3" 
                                                        placeholder="Kojo Antwi" 
                                                        required 
                                                        value={formData.fullName}
                                                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
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
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold small">Phone Number</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light border-0"><Phone size={18} /></span>
                                                    <input 
                                                        type="tel" 
                                                        className="form-control bg-light border-0 py-3" 
                                                        placeholder="055..." 
                                                        required 
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold small">Password</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light border-0"><Lock size={18} /></span>
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
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold small">Confirm Password</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light border-0"><Lock size={18} /></span>
                                                    <input 
                                                        type="password" 
                                                        className="form-control bg-light border-0 py-3" 
                                                        placeholder="••••••••" 
                                                        required 
                                                        value={formData.confirmPassword}
                                                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <button className="btn btn-primary w-100 py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2" disabled={loading}>
                                                {loading ? 'CREATING ACCOUNT...' : (<>CREATE ACCOUNT <ArrowRight size={18} /></>)}
                                            </button>
                                        </div>
                                    </form>

                                    <div className="divider d-flex align-items-center my-4">
                                        <div className="border-bottom w-100"></div>
                                        <span className="mx-3 text-secondary small text-nowrap">SIGN UP WITH</span>
                                        <div className="border-bottom w-100"></div>
                                    </div>

                                    <div className="row g-2 mb-4">
                                        <div className="col-6">
                                            <button 
                                                className="btn btn-outline-dark w-100 py-2 d-flex align-items-center justify-content-center gap-2 small"
                                                onClick={handleGithubSignUp}
                                                disabled={oauthLoading.github}
                                            >
                                                <Github size={18} /> {oauthLoading.github ? 'SIGNING UP...' : 'GitHub'}
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button 
                                                className="btn btn-outline-dark w-100 py-2 d-flex align-items-center justify-content-center gap-2 small"
                                                onClick={handleGoogleSignUp}
                                                disabled={oauthLoading.google}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                                </svg>
                                                {oauthLoading.google ? 'SIGNING UP...' : 'Google'}
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-center text-secondary small">
                                        Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Login here</Link>
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

export default Register;
