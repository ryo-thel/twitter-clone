import React, { useEffect, useState } from 'react';
import authApi from '../../api/authApi';
import Header from "../Header";
import { Outlet } from 'react-router-dom';

const LoginButtonObject = { title: "LOG IN", url: "/login" };
const LogoutButtonObject = { title: "LOG OUT", url: "/logout" };
const ResetPasswordObject = { title: "Reset Password", url: "/reset_password_email_form"};
const ResetUsernameObject = { title: "Reset Username", url: "/reset_username_email_form"};
const UserObject = { title: "User Profile", url: "/user" };
const sectionListLogin = [LoginButtonObject, ResetPasswordObject, ResetUsernameObject];
const sectionListLogout = [LogoutButtonObject, ResetPasswordObject, ResetUsernameObject, UserObject];

export default function DefaultLayout(){
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
  
  if (isLoggedIn){
    return (
      <>
        <Header title="TwtterClone-C" sections={sectionListLogout} />
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <Header title="TwtterClone-C" sections={sectionListLogin} />
        <Outlet />
      </>
    );

  }

  
};