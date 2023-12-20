import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { CookiesProvider, withCookies } from "react-cookie";
import DefaultLayout from "./components/Layout/DefaultLayout";
import Sidebar from "./components/Sidebar";
import { Activation, ResendActivation } from './pages/Activation';
import { ResetPassword, ResetUsername } from './pages/Confirm';
import SignUp from "./pages/SignUp";
import ResetEmailForm from './pages/Reset';
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import SetUsername from "./pages/SetUsername";
import SetPassword from "./pages/SetPassword";
import User from "./pages/User";
import Home from "./pages/Home";
import WelcomePage from "./pages/WelcomePage";
import Profile from "./pages/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomProtectedRoute from "./components/CustomProtectedRoute"; // カスタムプロテクテッドルートのインポート
import authApi from './api/authApi';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authApi.TokenVerify()
      .then(data => {
        console.log('ログイン中', data);
        setIsLoggedIn(true);
      })
      .catch(error => {
        console.log('ログアウト中', error);
      });
  }, []);

  return (
    <div className="App">
      <CookiesProvider>
        <ToastContainer />
        <Routes>
          <Route element={<DefaultLayout />}>
            {isLoggedIn && <Sidebar />}
            <Routes>
              {isLoggedIn ? (
                <>
                  <Route path="/user" element={<User />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/setusername" element={<SetUsername />} />
                  <Route path="/setpassword" element={<SetPassword />} />
                  <Route path="/logout" element={<Logout />} />
                </>
              ) : (
                <Navigate to="/" />
              )}
            </Routes>
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/activate/:uid/:token" element={<Activation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resendactivation" element={<ResendActivation />} />
          <Route path="/reset_password_email_form" element={<ResetEmailForm reset_of="password" />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<ResetPassword />} />
          <Route path="/username/reset/confirm/:uid/:token" element={<ResetUsername />} />
          <Route path="/reset_username_email_form" element={<ResetEmailForm reset_of="username" />} />
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </CookiesProvider>
    </div>
  );
}

export default withCookies(App);
