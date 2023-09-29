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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (uid && token) {
            authApi.Activate(uid, token)
                .then(data => {
                    console.log('成功しました', data);
                    setSuccess(true);
                    setLoading(false);
                })
                .catch(error => {
                    console.log('失敗しました', error);
                    setLoading(false); 
                    if (error.response && error.response.status === 403) {
                        setSuccess(true);  // 403エラーの場合、アクティベーションはすでに完了している
                    }
                });
        }
    }, [uid, token]);

    if (loading) {
        return (
            <div>
                <h1>読み込み中...</h1>
            </div>
        );
    } else if (Success) {
        return (
            <div>
                <h1>本登録完了</h1>
                <button onClick={() => navigate('/login')}>ログイン</button>
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
        <EmailForm handleSubmit={handleSubmit} errorMessage={errorMessage} />
    )
}