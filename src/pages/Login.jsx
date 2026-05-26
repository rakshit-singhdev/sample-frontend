import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const styles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

    .login-root {
        min-height: 100vh;
        display: flex;
        background: #0f0f0f;
        font-family: 'DM Sans', sans-serif;
        overflow: hidden;
    }

    .login-left {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 60px;
        position: relative;
    }

    .login-left::before {
        content: '';
        position: absolute;
        top: -120px;
        left: -120px;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%);
        pointer-events: none;
    }

    .login-brand {
        font-family: 'DM Serif Display', serif;
        font-size: 13px;
        letter-spacing: 4px;
        text-transform: uppercase;
        color: #d4af37;
        margin-bottom: 64px;
    }

    .login-heading {
        font-family: 'DM Serif Display', serif;
        font-size: 52px;
        color: #f5f0e8;
        line-height: 1.1;
        margin: 0 0 12px 0;
    }

    .login-heading em {
        font-style: italic;
        color: #d4af37;
    }

    .login-sub {
        color: #666;
        font-size: 15px;
        font-weight: 300;
        margin: 0 0 48px 0;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 360px;
    }

    .input-group {
        position: relative;
    }

    .input-group label {
        display: block;
        font-size: 11px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #555;
        margin-bottom: 8px;
    }

    .input-group input {
        width: 100%;
        background: #1a1a1a;
        border: 1px solid #2a2a2a;
        border-radius: 4px;
        padding: 14px 16px;
        color: #f5f0e8;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s;
        box-sizing: border-box;
    }

    .input-group input:focus {
        border-color: #d4af37;
    }

    .input-group input::placeholder {
        color: #3a3a3a;
    }

    .btn-primary {
        background: #d4af37;
        color: #0f0f0f;
        border: none;
        border-radius: 4px;
        padding: 15px;
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 2px;
        text-transform: uppercase;
        cursor: pointer;
        transition: opacity 0.2s, transform 0.1s;
        margin-top: 8px;
    }

    .btn-primary:hover:not(:disabled) {
        opacity: 0.9;
        transform: translateY(-1px);
    }

    .btn-primary:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    .btn-google {
        background: transparent;
        color: #888;
        border: 1px solid #2a2a2a;
        border-radius: 4px;
        padding: 14px;
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        letter-spacing: 1px;
        cursor: pointer;
        transition: border-color 0.2s, color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .btn-google:hover {
        border-color: #555;
        color: #f5f0e8;
    }

    .error-msg {
        background: rgba(220, 38, 38, 0.1);
        border: 1px solid rgba(220, 38, 38, 0.3);
        color: #f87171;
        padding: 12px 14px;
        border-radius: 4px;
        font-size: 13px;
    }

    .divider {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #333;
        font-size: 12px;
    }

    .divider::before, .divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background: #2a2a2a;
    }

    .login-right {
        width: 420px;
        background: #141414;
        border-left: 1px solid #1e1e1e;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 60px 40px;
        position: relative;
        overflow: hidden;
    }

    .login-right::after {
        content: 'LANDSTATS';
        position: absolute;
        bottom: -20px;
        right: -20px;
        font-family: 'DM Serif Display', serif;
        font-size: 100px;
        color: rgba(212,175,55,0.03);
        white-space: nowrap;
        pointer-events: none;
    }

    .stat-card {
        background: #1a1a1a;
        border: 1px solid #252525;
        border-radius: 8px;
        padding: 28px;
        width: 100%;
    }

    .stat-label {
        font-size: 11px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #555;
        margin-bottom: 20px;
    }

    .stat-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #1e1e1e;
    }

    .stat-item:last-child {
        border-bottom: none;
    }

    .stat-name {
        font-size: 13px;
        color: #888;
    }

    .stat-value {
        font-family: 'DM Serif Display', serif;
        font-size: 18px;
        color: #d4af37;
    }

    @media (max-width: 768px) {
        .login-right { display: none; }
        .login-left { padding: 40px 24px; }
        .login-heading { font-size: 36px; }
    }
`;

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);
            setError('');

            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                formData,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );

            // 2FA REQUIRED
            if (res.status === 202 && res.data.twoFactorRequired) {

                localStorage.setItem(
                    'pending2FA',
                    JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    })
                );

                navigate('/2fa-login');

                return;
            }

            // NORMAL LOGIN
            if (res.status === 200) {

                const { accessToken, user } = res.data;

                localStorage.setItem(
                    'accessToken',
                    accessToken
                );

                localStorage.setItem(
                    'user',
                    JSON.stringify(user)
                );

                navigate('/dashboard');

                return;
            }

            setError(res.data.message || 'Login failed');

        } catch (err) {

            setError(
                err.response?.data?.message ||
                'Login failed'
            );

        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
    };

    return (
        <>
            <style>{styles}</style>
            <div className="login-root">
                <div className="login-left">
                    <div className="login-brand">Landstats</div>
                    <h1 className="login-heading">
                        Land deals,<br /><em>intelligently</em><br />managed.
                    </h1>
                    <p className="login-sub">Sign in to access your project portfolio.</p>

                    <form onSubmit={handleSubmit} className="login-form">
                        {error && <div className="error-msg">{error}</div>}

                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>

                        <div className="divider">or</div>

                        <button type="button" className="btn-google" onClick={handleGoogleLogin}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>
                    </form>
                </div>

                <div className="login-right">
                    <div className="stat-card">
                        <div className="stat-label">Platform Overview</div>
                        <div className="stat-item">
                            <span className="stat-name">Active Projects</span>
                            <span className="stat-value">45</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-name">Total Acreage</span>
                            <span className="stat-value">1,791</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-name">Avg. Margin</span>
                            <span className="stat-value">20%</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-name">Counties Covered</span>
                            <span className="stat-value">12</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;