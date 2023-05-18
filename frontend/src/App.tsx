import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Profile from './pages/Profile'
import UserGuard from './Guards/UserGuard'
import Auth from './pages/Auth'
import useAuth from './hooks/useAuth'

function App() {
  const { isLoggedIn, reCheck } = useAuth();
  return (   
    <Routes>

      <Route path='/' element={<UserGuard isLoggedIn={isLoggedIn}><Profile /></UserGuard>} /> 
      <Route path='/login' element={isLoggedIn ? <Navigate to={"/"} /> : <Auth isSignUp={false} reCheck={reCheck} />} />
      <Route path='/register' element={isLoggedIn ? <Navigate to={"/"} /> : <Auth isSignUp={true} reCheck={reCheck} />} />
    </Routes>

  )
}

export default App
