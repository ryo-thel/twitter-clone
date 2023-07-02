import React from "react";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
// import LoggedIn from "./components/LoggedIn";
// import LoggedOut from "./components/LoggedOut";
import { Route, Routes } from "react-router-dom";
import { CookiesProvider, withCookies } from "react-cookie";
import DefaultLayout from "./components/Layout/DefaultLayout";
// import LoggedIn from "./components/LoggedIn";

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </CookiesProvider>
    </div>
  );
}

export default withCookies(App);
