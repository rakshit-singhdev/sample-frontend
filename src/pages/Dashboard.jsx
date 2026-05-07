import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Dashboard = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');

                if (!accessToken) {
                    navigate('/login');
                    return;
                }

                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        withCredentials: true,
                    }
                );

                setUser(res.data.user || res.data.data?.user);
            } catch (error) {
                console.error(error);

                handleLocalLogout();
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLocalLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');

        navigate('/login');
    };

    const handleLogout = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
                {},
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.error(error);
        } finally {
            handleLocalLogout();
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>

            {user ? (
                <>
                    <p>
                        <strong>Name:</strong> {user.name}
                    </p>

                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </>
            ) : (
                <p>User not found</p>
            )}
        </div>
    );
};

export default Dashboard;