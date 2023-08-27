import * as React from "react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Backdrop, CircularProgress } from "@mui/material";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/auth/forgot-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!responseData.error) {
        setEmailSent(true);
      } else {
        alert(responseData.error);
      }
    } catch (err) {
      alert(err);
    }
    setLoading(false);
  };

  return (
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
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        {!emailSent && (
          <>
            <Typography component="h1" variant="h5">
              Forgot Password?
            </Typography>
            <Typography
              component="p"
              variant="subtitle1"
              color="text.secondary"
            >
              Lost your password? Please enter your email address. You will
              receive a link to create a new password via email.
            </Typography>
          </>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {!emailSent && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
            </>
          )}
          {emailSent && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                borderRadius: "16px",
                padding: "16px",
                bgcolor: "#eaf3ff",
              }}
            >
              <Typography
                component="p"
                variant="subtitle1"
                color="text.secondary"
              >
                Password has been sent to given email address. Please check your
                spam folder if no email recieved at your inbox.
              </Typography>
            </Box>
          )}
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/signin" variant="body2">
                Sign in
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Container>
  );
};

export default ForgotPassword;
