import { useEffect, useState } from 'react'
import './App.css'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'  // Import icons
import {Routes , Route} from 'react-router-dom'
import Layout from './components/Layout'
import Home  from  './pages/Home.jsx'
import Login from './pages/login.jsx'
import Contacts from './pages/Contacts.jsx'
import Register from './pages/Register.jsx'
import ViewContacts from './pages/ViewContact.jsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { IconButton } from '@mui/material'
function App() {
 const [isDarkMode, setIsDarkMode] = useState(true)
 
 useEffect(() => {
   const savedTheme = localStorage.getItem('theme');
   if(savedTheme){
    setIsDarkMode(savedTheme === 'dark')
   }
 }, [])
 
 useEffect(()=>{
  if(isDarkMode){
    document.documentElement.classList.add('dark')
  }else{
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme',isDarkMode? 'dark' : 'light')
 },[isDarkMode])

 const toggletheme = () =>{
  setIsDarkMode(!isDarkMode)
 }
 const theme = createTheme({
  palette :{
    mode : isDarkMode ? 'dark' : 'light'
  }
 })
  return (
<ThemeProvider theme={theme}>
<CssBaseline />
  <div className={` flex flex-col  min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
    <div className='absolute top-4 right-4'>
      <IconButton
         onClick={toggletheme}
        className="p-2 bg-blue-400 text-white rounded-l-full m-4"
      >
       {isDarkMode ?  (
          <SunIcon className="h-5 w-5 mr-2" />
        ) : (
          <MoonIcon className="h-5 w-5 mr-2" />
        )}
      </IconButton>

    </div>
    <Routes >
  <Route path='/' element={<Layout />} >
  <Route index element = {< Home/>} />
  <Route path='/home' element ={<Home/>}/>
  <Route path = '/login' element = {<Login />}/>
  <Route path = '/register' element = {<Register />}/>
  <Route path = '/contact' element = {<Contacts />}/>
  <Route path="/view-contacts" element={<ViewContacts />} />
   </Route>
</Routes> 
    </div>




  
</ThemeProvider>
  )
}

export default App

 