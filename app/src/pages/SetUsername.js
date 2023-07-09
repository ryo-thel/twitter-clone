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

const SetUsername = () => {
    const navigate = useNavigate();
    const [errorMessage, setError] = useState("");
    const handleSubmit = (event) => {
    event.preventDefault();  // デフォルトでリロードの処理がかかるのを防いでいる

    const data = new FormData(event.currentTarget);

    authApi.SetUsername(data)
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
                  autoComplete="given-name"
                  name="new_username"
                  required
                  fullWidth
                  id="new_username"
                  label="NewUsername"
                  autoFocus
                />
              </Grid>
              {errorMessage.username ? (
                <p className="red">{errorMessage.username}</p>
              ) : null}
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="re_new_username"
                  required
                  fullWidth
                  id="re_new_username"
                  label="ReNewUsername"
                  autoFocus
                />
              </Grid>
              {errorMessage.username ? (
                <p className="red">{errorMessage.username}</p>
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
              {errorMessage.password ? (
                <p className="red">{errorMessage.password}</p>
              ) : null}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default (SetUsername);
