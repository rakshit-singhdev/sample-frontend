import React, { useState } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router';

const LoginTwoFactor = () => {

    const navigate = useNavigate();

    const [token, setToken] = useState('');

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

    const pending = JSON.parse(
        localStorage.getItem('pending2FA') || '{}'
    );

    const handleVerify = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            setError('');

            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                {
                    email: pending.email,
                    password: pending.password,
                    twoFactorToken: token,
                },
                {
                    withCredentials: true,
                }
            );

            const { accessToken, user } = res.data;

            localStorage.setItem(
                'accessToken',
                accessToken
            );

            localStorage.setItem(
                'user',
                JSON.stringify(user)
            );

            localStorage.removeItem('pending2FA');

            navigate('/dashboard');

        } catch (err) {

            setError(
                err.response?.data?.message ||
                'Invalid verification code'
            );

        } finally {
            setLoading(false);
        }
    };

    const resendCode = async () => {

        try {

            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                {
                    email: pending.email,
                    password: pending.password,
                },
                {
                    withCredentials: true,
                }
            );

            alert('Verification code resent.');

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="login-root">

            <div className="login-left">

                <h1 className="login-heading">
                    Two-Factor<br />
                    <em>Verification</em>
                </h1>

                <p className="login-sub">
                    Enter the 6-digit code sent to your email.
                </p>

                <form
                    onSubmit={handleVerify}
                    className="login-form"
                >

                    {error && (
                        <div className="error-msg">
                            {error}
                        </div>
                    )}

                    <div className="input-group">

                        <label>Verification Code</label>

                        <input
                            type="text"
                            maxLength={6}
                            value={token}
                            onChange={(e) =>
                                setToken(e.target.value)
                            }
                            placeholder="123456"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >
                        {
                            loading
                                ? 'Verifying...'
                                : 'Verify & Login'
                        }
                    </button>

                    <button
                        type="button"
                        className="btn-google"
                        onClick={resendCode}
                    >
                        Resend Code
                    </button>

                </form>

            </div>

        </div>
    );
};

export default LoginTwoFactor;