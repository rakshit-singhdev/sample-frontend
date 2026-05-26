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
import TwoFactorSetup from './pages/TwoFactorSetup.jsx';
import TwoFactorVerify from './pages/TwoFactorVerify.jsx';
import Sample from './pages/Sample.jsx';
import Sample2 from './pages/Sample2.jsx';


import '@arcgis/map-components/dist/components/arcgis-map';
import '@arcgis/map-components/dist/components/arcgis-scene';
import '@arcgis/map-components/dist/components/arcgis-zoom';
import '@arcgis/map-components/dist/components/arcgis-compass';
import '@arcgis/map-components/dist/components/arcgis-navigation-toggle';
import '@arcgis/map-components/dist/components/arcgis-expand';
import '@arcgis/map-components/dist/components/arcgis-legend';
import LoginTwoFactor from './pages/LoginTwoFactor.jsx';
import SecuritySettings from './pages/SecuritySettings.jsx';


const router = createBrowserRouter([
    {
        path: '/sample2',
        element: <Sample2 />,
    },
    {
        path: '/sample',
        element: <Sample />,
    },
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
        path: '/2fa-setup',
        element: <TwoFactorSetup />,
    },
    {
        path: '/2fa-verify',
        element: <TwoFactorVerify />,
    },

    { path: "/2fa-login", element: <LoginTwoFactor /> },



    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            { path: "/security", element: <SecuritySettings /> },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);