import React, { useState } from 'react';
import api from '../utils/auth.js';


const SecuritySettings = () => {

    const [setupToken, setSetupToken] = useState('');

    const [disableToken, setDisableToken] = useState('');

    const [message, setMessage] = useState('');

    const sendEnableOTP = async () => {

        try {

            await api.post('/api/auth/2fa/setup');

            setMessage(
                'Verification code sent to your email.'
            );

        } catch (err) {
            console.error(err);
        }
    };

    const verifyEnable2FA = async () => {

        try {

            await api.post(
                '/api/auth/2fa/verify',
                {
                    token: setupToken,
                }
            );

            setMessage('2FA enabled successfully.');

        } catch (err) {
            console.error(err);
        }
    };

    const sendDisableOTP = async () => {

        try {

            await api.post(
                '/api/auth/2fa/disable/send-otp'
            );

            setMessage(
                'Disable verification code sent.'
            );

        } catch (err) {
            console.error(err);
        }
    };

    const disable2FA = async () => {

        try {

            await api.post(
                '/api/auth/2fa/disable',
                {
                    token: disableToken,
                }
            );

            setMessage('2FA disabled successfully.');

        } catch (err) {
            console.error(err);
        }
    };

    return (

        <div style={{ padding: 40 }}>

            <h1>Security Settings</h1>

            {message && <p>{message}</p>}

            <hr />

            <h2>Enable Two-Factor Authentication</h2>

            <button onClick={sendEnableOTP}>
                Send Enable OTP
            </button>

            <input
                placeholder="Enter OTP"
                value={setupToken}
                onChange={(e) =>
                    setSetupToken(e.target.value)
                }
            />

            <button onClick={verifyEnable2FA}>
                Verify & Enable
            </button>

            <hr />

            <h2>Disable Two-Factor Authentication</h2>

            <button onClick={sendDisableOTP}>
                Send Disable OTP
            </button>

            <input
                placeholder="Enter OTP"
                value={disableToken}
                onChange={(e) =>
                    setDisableToken(e.target.value)
                }
            />

            <button onClick={disable2FA}>
                Disable 2FA
            </button>

        </div>
    );
};

export default SecuritySettings;