import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ResetPasswordPage from './pages/ForgotPassword.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import OAuthSuccess from './pages/OAuthSuccess.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/reset-password',
        element: <ResetPasswordPage />,
    },
    {
        path: '/oauth-success',
        element: <OAuthSuccess />,
    },

    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);