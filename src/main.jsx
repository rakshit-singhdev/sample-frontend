import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createHashRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from './pages/Login.jsx';       
import Dashboard from './pages/Dashboard.jsx';       
import ResetPasswordPage from './pages/ForgotPassword.jsx';

const router = createHashRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage/>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
