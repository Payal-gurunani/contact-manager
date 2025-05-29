import { useState } from 'react'
import { TextField, Button, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../config/apiRequest'
import { Endpoints } from '../config/EndPoints'
function Login() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Placeholder for login logic (API call)
    const response = await apiRequest(Endpoints.LOGIN, { email, password })
localStorage.setItem('token', response.message.token)

    // On successful login, redirect to home or contacts
   
if (response.message.token) {
  localStorage.setItem('token', response.message.token);
  navigate('/contact');
} else {
  alert('Login failed: no token returned');
}

  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Paper elevation={3} className="p-8 w-full max-w-md">
        <Typography variant="h5" className="mb-6 text-center">
          Login
        </Typography>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>

        </form>
        <Typography variant="body2" className="mt-4 text-center">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-blue-500 cursor-pointer"
          >
            Register
          </span>
        </Typography>
      </Paper>
    </div>
  )
}

export default Login
