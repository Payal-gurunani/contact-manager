import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Container,
  Paper,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { apiRequest } from '../config/apiRequest';
import { Endpoints } from '../config/EndPoints';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic frontend validation
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      const response = await apiRequest(Endpoints.REGISTER, formData);
      console.log(response);
      
      if (response.success) {
        alert('Registration successful! Please login.');
        navigate('/login');
      } else {
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
    // Handle structured error response from backend
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError(err.message || 'Something went wrong.');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ mt: 8, p: 4, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Create Account
        </Typography>

        {error && (
          <Typography color="error" align="center" mt={2}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
            />

          </Box>
          <Box mb={3}>
            <TextField
              label="Email"
              type="email"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Box>

          <Box mb={3}>
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>

          <Typography mt={3} textAlign="center">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Login
            </Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
