import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import RequireAuth from './Components/RequireAuth'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={
        <RequireAuth>
          <Home />
        </RequireAuth>
      } />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/signup' element={<Signup />} />
    </Routes>
  )
}

export default App
