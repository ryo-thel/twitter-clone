import React, { useState } from "react";
import { withCookies } from "react-cookie";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import authApi from "../api/authApi";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();


export default function ResetEmailForm(props) {
  const { reset_of } = props;
  const navigate = useNavigate();
  const [errorMessage, setError] = useState("");

  const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      if (reset_of == "username") {
        authApi.ResetUsername(data)
          .then((res) => {
              console.log('成功しました', res);
              navigate("/");
              setError("");
          })
          .catch((error) => {
              console.log(error)
              setError(error.response.data);
          });
      }
      else if (reset_of == "password")
      authApi.ResetPassword(data)
          .then((res) => {
              console.log('成功しました', res);
              navigate("/");
              setError("");
          })
          .catch((error) => {
              console.log(error)
              setError(error.response.data);
          });
  };

  return(
      <EmailForm handleSubmit={handleSubmit} errorMessage={errorMessage} />
  )
}


