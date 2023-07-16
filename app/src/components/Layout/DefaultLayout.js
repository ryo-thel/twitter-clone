import * as React from "react";
import Header from "../Header";
import { Outlet } from 'react-router-dom';

const LoginButtonObject = { title: "LOG IN", url: "/login" };
const ResetPasswordObject = { title: "Reset Password", url: "/reset_password_email_form"};
const ResetUsernameObject = { title: "Reset Username", url: "/reset_username_email_form"};

export default function DefaultLayout(){
  return (
    <>
      <Header title="TwtterClone-C" sections={[LoginButtonObject, ResetPasswordObject, ResetUsernameObject]} />
      <Outlet />
    </>
  );
};
