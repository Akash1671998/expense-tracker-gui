import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';
import signupIllustration from '../Images/Expense.svg'; // reuse same image or replace with another

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }

    try {
      const url = `${APIUrl}/auth/register`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo)
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate('/login'), 1000);
      } else if (error) {
        handleError(error?.details?.[0]?.message || 'Signup failed');
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message || 'Signup failed');
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left Side Image/Illustration */}
      <Grid
        item
        xs={false}
        sm={6}
        sx={{
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          p: 4,
        }}
      >
        <img
          src={signupIllustration}
          alt="Signup Illustration"
          style={{ maxWidth: '80%', height: 'auto' }}
        />
        <Typography variant="h5" sx={{ mt: 2, color: '#555' }}>
          Join Us and Track Your Expenses
        </Typography>
      </Grid>

      {/* Signup Form */}
      <Grid
        item
        xs={12}
        sm={6}
        component={Paper}
        elevation={3}
        square
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSignup}
          sx={{
            width: '100%',
            maxWidth: 400,
            textAlign: 'center',
            p: 4,
          }}
          noValidate
        >
          {/* Logo Above Heading */}
          <img
            src={signupIllustration}
            alt="Expense Logo"
            style={{ width: '60px', marginBottom: '10px' }}
          />

          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
            Enter your details to get started
          </Typography>

          <TextField
            fullWidth
            label="Name"
            name="name"
            value={signupInfo.name}
            onChange={handleChange}
            margin="normal"
            size="small"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={signupInfo.email}
            onChange={handleChange}
            margin="normal"
            size="small"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={signupInfo.password}
            onChange={handleChange}
            margin="normal"
            size="small"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          >
            Signup
          </Button>

          <Typography variant="body2">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Grid>

      <ToastContainer />
    </Grid>
  );
}

export default Signup;
