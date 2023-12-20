import React, { useState } from "react";
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

const SetPassword = () => {
    const navigate = useNavigate();
    const [errorMessage, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = (event) => {
    event.preventDefault();  // デフォルトでリロードの処理がかかるのを防いでいる
    setIsSubmitting(true);
    const data = new FormData(event.currentTarget);

    authApi.SetPassword(data)
        .then((res) => {
            console.log('成功しました', res);
            toast.success('変更しました', {
              onClose: () => navigate("/home"),  // Redirect to home on toast close
              autoClose: 2000,  // Set autoClose time
            });
            setError("");
        })
        .catch((error) => {
            console.log(error)
            setError(error.response.data);
            setIsSubmitting(false);
        });
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Set Username
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {errorMessage.non_field_errors ? (
              <p className="red">{errorMessage.non_field_errors}</p>
            ) : null}
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_password"
                  label="NewPassword"
                  type="password"
                  id="new_password"
                  autoComplete="new-password"
                />
              </Grid>
              {errorMessage.new_password ? (
                <p className="red">{errorMessage.new_password}</p>
              ) : null}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="re_new_password"
                  label="ReNewPassword"
                  type="password"
                  id="re_new_password"
                  autoComplete="re-new-password"
                />
              </Grid>
              {errorMessage.re_new_password ? (
                <p className="red">{errorMessage.re_new_password}</p>
              ) : null}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="current_password"
                  label="CurrentPassword"
                  type="password"
                  id="current_password"
                  autoComplete="current-password"
                />
              </Grid>
              {errorMessage.current_password ? (
                <p className="red">{errorMessage.current_password}</p>
              ) : null}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              Change Password
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default (SetPassword);