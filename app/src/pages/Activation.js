import React, { useEffect, useState } from 'react';
import authApi from '../api/authApi';
import { useParams, useNavigate } from "react-router-dom";
import EmailForm from '../components/EmailForm';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

export function Activation() {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const [Success, setSuccess] = useState(false);

    useEffect(() => {
        if (uid && token) {
            authApi.Activate(uid, token)
                .then(data => {
                    console.log('成功しました', data);
                    setSuccess(true);
                })
                .catch(error => {
                    console.log('失敗しました', error);
                });
        }
    }, [uid, token]);

    if (Success) {
        return (
            <div>
                <h1>本登録完了</h1>
            </div>
        )
    } else {
        return (
            <div>
                <h1>本登録失敗</h1>
                <button onClick={() => navigate('/resendactivation')}>再度メールを送信</button>
            </div>
        )
    }

}

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

export function ResendActivation() {
    const navigate = useNavigate();
    const [errorMessage, setError] = useState("");
    const handleSubmit = (event) => {
    event.preventDefault();


    const data = new FormData(event.currentTarget);

    authApi.ResendActivation(data)
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
            Resend Activation
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
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                />
                </Grid>
            {errorMessage.email ? (
                <p className="red">{errorMessage.email}</p>
                ) : null}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
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
    )
}
