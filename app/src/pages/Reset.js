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
import EmailForm from "../components/EmailForm";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
      event.preventDefault();
      setIsSubmitting(true);
      const data = new FormData(event.currentTarget);
      if (reset_of == "username") {
        authApi.ResetUsername(data)
          .then((res) => {
              console.log('成功しました', res);
              toast.success('リセットメールを送信しました', {
                onClose: () => navigate("/"),  // Redirect to home on toast close
                autoClose: 2000,  // Set autoClose time
              });
              setError("");
          })
          .catch((error) => {
              console.log(error)
              setError(error.response.data);
              setIsSubmitting(false);
          });
      }
      else if (reset_of == "password") {
        authApi.ResetPassword(data)
          .then((res) => {
              console.log('成功しました', res);
              toast.success('リセットメールを送信しました', {
                onClose: () => navigate("/"),  // Redirect to home on toast close
                autoClose: 2000,  // Set autoClose time
              });
              setError("");
          })
          .catch((error) => {
              console.log(error)
              setError(error.response.data);
              setIsSubmitting(false);
          });
      }
  };

  return(
    <EmailForm handleSubmit={handleSubmit} errorMessage={errorMessage} />
  )
}