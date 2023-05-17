import { Route, Routes } from 'react-router-dom'
import './App.css'
import Profile from './pages/Profile'
import UserGuard from './Guards/UserGuard'
import Auth from './pages/Auth'

function App() {

  return (   
    <Routes>
      <Route path='/' element={<UserGuard><Profile /></UserGuard>} />
      <Route path='/login' element={<Auth isSignUp={false} />} />
      <Route path='/register' element={<Auth isSignUp={true} />} />
    </Routes>

  )
}

export default App
