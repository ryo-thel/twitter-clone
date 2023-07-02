import * as React from "react";
import Header from "../Header";

const LoginButtonObject = [{ title: "LOG IN", url: "/login" }];

export default DefaultLayout = ({ children }) => {
  return (
    <>
      <Header title="TwtterClone-C" sections={LoginButtonObject} />
      {children}
    </>
  );
};
