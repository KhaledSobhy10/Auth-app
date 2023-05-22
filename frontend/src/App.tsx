import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Profile from './pages/Profile'
import UserGuard from './Guards/UserGuard'
import Auth from './pages/Auth'
import useAuth from './hooks/useAuth'
import EditProfile from './pages/EditProfile'

function App() {
  const { isLoggedIn, reCheck } = useAuth();
  return (   
    <Routes>

      <Route path='/' element={<UserGuard isLoggedIn={isLoggedIn}><Profile /></UserGuard>} /> 
      <Route path='/login' element={isLoggedIn ? <Navigate to={"/"} /> : <Auth isSignUp={false} reCheck={reCheck} />} />
      <Route path='/register' element={isLoggedIn ? <Navigate to={"/"} /> : <Auth isSignUp={true} reCheck={reCheck} />} />
      <Route path='/edit-profile' element={<UserGuard isLoggedIn={isLoggedIn}><EditProfile /></UserGuard>} /> 

    </Routes>

  )
}

export default App
