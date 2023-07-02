import React from "react";
import Signup from "./components/SignUp";
import Header from "./components/Header";
// import LoggedIn from "./components/LoggedIn";
// import LoggedOut from "./components/LoggedOut";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CookiesProvider, withCookies } from "react-cookie";
// import LoggedIn from "./components/LoggedIn";

const LoginButtonObject = [{ title: "LOG IN", url: "/login" }]; //この辺はとりあえずで追加

function App() {
  return (
    <Router>
      <div className="App">
        <CookiesProvider>
          <Header title="TwtterClone-C" sections={LoginButtonObject} />
          <h1>Hello React Router v6</h1>
          {/* <LoggedIn></LoggedIn> */}
          {/* <LoggedOut> */}
          <Routes>
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/login" element={<LoggedIn />} /> */}
          </Routes>
          {/* </LoggedOut> */}
        </CookiesProvider>
      </div>
    </Router>
  );
}

export default withCookies(App);
