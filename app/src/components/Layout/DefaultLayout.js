import * as React from "react";
import Header from "../Header";
import { Outlet } from 'react-router-dom';

const LoginButtonObject = [{ title: "LOG IN", url: "/login" }];

export default function DefaultLayout(){
  return (
    <>
      <Header title="TwtterClone-C" sections={LoginButtonObject} />
      <Outlet />
    </>
  );
};
