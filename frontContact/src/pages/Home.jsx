import { Typography, Paper, Button } from '@mui/material'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <Paper elevation={3} className="p-8 max-w-xl w-full text-center bg-white dark:bg-gray-800">
        <Typography variant="h3" gutterBottom className="font-bold">
          Welcome to Contact Manager
        </Typography>
        <Typography variant="body1" className="mb-6 text-gray-700 dark:text-gray-300">
          Manage your contacts easily — add, edit, and organize your contact list all in one place.
        </Typography>
        <div className="space-x-4">
          <Button component={Link} to="/login" variant="contained" color="primary">
            Login
          </Button>
          <Button component={Link} to="/register" variant="outlined" color="primary">
            Register
          </Button>
        </div>
      </Paper>
    </div>
  )
}

export default Home
