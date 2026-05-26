import React, { useState, useEffect } from 'react';
import api from '../utils/auth';
import { useNavigate } from 'react-router';

const TwoFactorSetup = () => {
    const navigate = useNavigate();
    const [qrCode, setQrCode] = useState('');
    const [secret, setSecret] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const setup2FA = async () => {
            try {
                const res = await api.post('/api/auth/2fa/setup');
                setQrCode(res.data.qrCode);
                setSecret(res.data.secret);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to setup 2FA');
            } finally {
                setLoading(false);
            }
        };

        setup2FA();
    }, []);

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            setVerifying(true);
            await api.post('/api/auth/2fa/verify', { code });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid code');
        } finally {
            setVerifying(false);
        }
    };

    const handleSkip = () => {
        navigate('/dashboard');
    };

    if (loading) {
        return <div>Loading 2FA setup...</div>;
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Setup Two-Factor Authentication</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {qrCode && (
                <div>
                    <p>Scan this QR code with your authenticator app:</p>
                    <img src={qrCode} alt="QR Code" />
                    <p>Or manually enter this secret: {secret}</p>
                    <form onSubmit={handleVerify}>
                        <input
                            type="text"
                            placeholder="Enter 6-digit code to verify"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            maxLength="6"
                            required
                        />
                        <button type="submit" disabled={verifying}>
                            {verifying ? 'Verifying...' : 'Verify & Enable'}
                        </button>
                    </form>
                    <button onClick={handleSkip} style={{ marginTop: '10px' }}>
                        Skip for now
                    </button>
                </div>
            )}
        </div>
    );
};

export default TwoFactorSetup;