import {  Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/Signup'

function App() {

  return (   
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<SignUp/>} />
    </Routes>

  )
}

export default App
