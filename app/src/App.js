import React from "react";
import SignUp from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import { CookiesProvider, withCookies } from "react-cookie";
import DefaultLayout from "./components/Layout/DefaultLayout";
import { Activation, ResendActivation } from './pages/Activation';
import { ResetPassword, ResetUsername} from './pages/Confirm';
import ResetEmailForm from './pages/Reset';
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import SetUsername from "./pages/SetUsername";
import SetPassword from "./pages/SetPassword";
import User from "./pages/User"

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <Routes>
          <Route element={<DefaultLayout/ >}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/activate/:uid/:token" element={<Activation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/setusername" element={<SetUsername/>} />
            <Route path="/setpassword" element={<SetPassword/>} />
            <Route path="/user" element={<User />} />
            <Route path="/resendactivation" element={<ResendActivation />} />
            <Route path="/reset_password_email_form" element={<ResetEmailForm reset_of="password" />} />
            <Route path="/reset_password_confirm/:uid/:token" element={<ResetPassword />} />
            <Route path="/reset_username_email_form" element={<ResetEmailForm reset_of="username"/>} />
            <Route path="/reset_username_confirm/:uid/:token" element={<ResetUsername />} />
            <Route path="/" />
          </Route>
        </Routes>
      </CookiesProvider>
    </div>
  );
}

export default withCookies(App);
