import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const Profile = () => {
    const navigate = useNavigate();
    const [errorMessage, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = (event) => {
      event.preventDefault();  // デフォルトでリロードの処理がかかるのを防いでいる
      setIsSubmitting(true);
      const data = new FormData(event.currentTarget);

      authApi.Profile(data)
        .then((res) => {
            console.log('成功しました', res);
            toast.success('プロフィール設定完了', {
              onClose: () => navigate("/user"),  // Redirect to home on toast close
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />  {/* Placeholder for profile image */}
          <Typography component="h1" variant="h5">
            Profile Settings
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* File input for profile image */}
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              name="icon"
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span">
                Upload Profile Image
              </Button>
            </label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="accountName"
              label="Account Name"
              name="accountName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="bio"
              label="Bio"
              type="text"
              id="bio"
              multiline
              rows={4}
            />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              Save
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
