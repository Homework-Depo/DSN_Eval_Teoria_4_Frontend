import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import registerAction from "./pages/register/action";
import loginAction from "./pages/login/action";
import mainLoader from "./pages/main/loader";
import requestPasswordResetAction from "./pages/passwordReset/request/action";

import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import RequestPasswordReset from './pages/passwordReset/request/RequestPasswordReset';
import SubmitPasswordReset from './pages/passwordReset/submit/SubmitPasswordReset';
import submitPassswordResetAction from './pages/passwordReset/submit/action';
import mainAction from './pages/main/action';
import isLoggedIn from './utils/isLoggedIn';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: isLoggedIn,
    action: loginAction
  },
  {
    path: "/register",
    element: <Register />,
    loader: isLoggedIn,
    action: registerAction
  },
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    action: mainAction
  },
  {
    path: "/request-password-reset",
    element: <RequestPasswordReset />,
    loader: isLoggedIn,
    action: requestPasswordResetAction
  },
  {
    path: "/submit-password-reset",
    element: <SubmitPasswordReset />,
    loader: isLoggedIn,
    action: submitPassswordResetAction
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
