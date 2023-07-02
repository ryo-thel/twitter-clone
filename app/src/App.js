import React from "react";
import SignUp from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import { CookiesProvider, withCookies } from "react-cookie";
import DefaultLayout from "./components/Layout/DefaultLayout";
import Activation from './pages/Activation';

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <Routes>
          <Route element={<DefaultLayout/ >}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/activate/:uid/:token" element={<Activation />} />
          </Route>
        </Routes>
      </CookiesProvider>
    </div>
  );
}

export default withCookies(App);
