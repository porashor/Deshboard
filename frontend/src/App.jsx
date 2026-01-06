import React, { useEffect } from 'react'
import Deshboard from './Component/Deshboard'
import UserDeshboard from './Component/UserDeshboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserLoginForm from './Component/UserLoginForm'
import { userHandle } from './lib/UserFunction'
const App = () => {
  const {user, status, setUser} = userHandle()
  useEffect(() => {
    setUser()
  }, [])
  console.log(user);
  return (
    <div className=''>
      <Router>
        {status === 'admin' ? <Deshboard/> : status === 'user' ? <UserDeshboard/> : <UserLoginForm/>}
      </Router>
    </div>
  )
}

export default App
