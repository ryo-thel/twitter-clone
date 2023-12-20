import React, { useState, useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import authApi from "../api/authApi";

function CustomProtectedRoute({ element: Element, ...rest }) {
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
      },[]);

  return (
    <Route
      {...rest}
      element={
        isLoggedIn ? <Element /> : <Navigate to="/" />
      }
    />
  );
}

export default CustomProtectedRoute;
