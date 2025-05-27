import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import { APIUrl, handleError, handleSuccess } from "../utils";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const url = `${APIUrl}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
    <Paper elevation={1} sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleLogin} noValidate>
        <TextField
          fullWidth
          size="small"
          label="Email"
          name="email"
          type="email"
          value={loginInfo.email}
          onChange={handleChange}
          margin="normal"
          required
          sx={{
            '& .MuiInputBase-root': {
              height: '40px',
            },
          }}
        />
        <TextField
          fullWidth
          size="small"
          label="Password"
          name="password"
          type="password"
          value={loginInfo.password}
          onChange={handleChange}
          margin="normal"
          required
          sx={{
            '& .MuiInputBase-root': {
              height: '40px',
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
        >
          Login
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
                Signup
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
    <ToastContainer />
  </Container>
  
  );
}

export default Login;
