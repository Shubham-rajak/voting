import React from 'react'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Candidateslist from './components/Candidateslist'
import UserVotePage from './components/UserVotePage'
import Navbar from './components/Navbar'
import Home from './components/Home'

const App = () => {
  return (
   <>
      <Router>
        <Navbar />
          <Routes>
            <Route path = '/' element = {<Home/>} />
            <Route exact path='/' element = {<Login/>} />  
            <Route path='/signup' element = {<Signup/>} />
            <Route path="/login"element={<Login/>}/>
            <Route path='/admin' element={<Candidateslist/>}/>
            <Route path='/uservote' element={<UserVotePage/>}/>
          </Routes>
      </Router>
   </>
  )
}

export default App