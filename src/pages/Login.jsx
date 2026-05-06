import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { withCredentials: true })
            .then(res => setUser(res.data.user))
            .catch(() => setUser(null));
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { email: email.value, password: password.value })
            .then(res => {
                setUser(res.data.user)
            })
            .catch(err => alert(err.response.data.error));
    };

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
    };

    const handleLogout = () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, { withCredentials: true })
            .then(() => setUser(null))
            .catch(err => alert(err.response.data.error));
    };

    return (
        <div>
            {!user ? (
                <div>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <input name="email" placeholder="Email" required />
                        <input name="password" type="password" placeholder="Password" required />
                        <button type="submit">Login</button>
                    </form>
                    <button onClick={handleGoogleLogin}>Login with Google</button>
                </div>
            ) : (
                <div>
                    <h1>Welcome, {user.name}</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default Login;