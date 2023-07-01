import React from "react";
import Signup from "./components/SignUp";
import Header from "./components/Header";
// import LoggedIn from "./components/LoggedIn";
import LoggedOut from "./components/LoggedOut";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CookiesProvider, withCookies } from "react-cookie";

function App() {
  return (
    <Router>
      <div className="App">
        {/** 変更 **/}
        <CookiesProvider>
          <Header
            title="twitter"
            sections={[{ title: "LOG IN", url: "/login" }]}
          />
          <h1>Hello React Router v6</h1>
          <LoggedOut>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="/login" element={<LoggedIn />} /> */}
            </Routes>
          </LoggedOut>
        </CookiesProvider>
      </div>
    </Router>
  );
}

export default withCookies(App);
