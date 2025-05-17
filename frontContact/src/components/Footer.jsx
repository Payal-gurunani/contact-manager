import { Typography, Link } from '@mui/material'

function Footer() {
  return (
    <footer className="w-full bg-gray-200 dark:bg-gray-800 text-center p-4 mt-auto">
      <Typography variant="body2" color="textSecondary" className="text-gray-700 dark:text-gray-400">
        © {new Date().getFullYear()} Your Company. All rights reserved.{' '}
        <Link href="https://yourwebsite.com" target="_blank" rel="noopener" underline="hover" color="inherit">
          yourwebsite.com
        </Link>
      </Typography>
    </footer>
  )
}

export default Footer
