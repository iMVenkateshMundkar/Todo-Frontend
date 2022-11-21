import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import RequireAuth from './Components/RequireAuth'
import Navbar from './Components/Navbar'
import SingleTask from './Pages/SingleTask'
import TasksLayout from './Pages/TasksLayout'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={
        <RequireAuth>
          <>
            <Navbar />
            <Home />
            {/* <TasksLayout /> */}
          </>
        </RequireAuth>
      } />
      <Route exact path='/tasks/:id' element={
        <RequireAuth>
          <>
            <Navbar />
            <SingleTask />
          </>
        </RequireAuth>
      } />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/signup' element={<Signup />} />
    </Routes>
  )
}

export default App
