import React from 'react'
import Navigation from './Navigation'
import UserCreate from '../Pages/UserCreate'
import UserList from '../Pages/UserList'
import Transaction from '../Pages/Transaction'
import UserLoginForm from './UserLoginForm'
import DepositeRequest from '../Pages/DepositeRequest'
import WithdeawRequest from '../Pages/WithdeawRequest'
import { Route, Routes } from 'react-router-dom'
const Deshboard = () => {
  return (
    <div className='grid grid-cols-[1fr_5fr]'>
        <Navigation status='admin'/>
        <Routes>
          <Route path='/admin/create-user' element={<UserCreate/>}></Route>
          <Route path='/admin/user-list' element={<UserList/>}></Route>
          <Route path='/admin/transaction' element={<Transaction/>}></Route>
          <Route path='/admin/deposite-request' element={<DepositeRequest/>}></Route>
          <Route path='/admin/withdraw-request' element={<WithdeawRequest/>}></Route>
          {/* <Route path='/user' element={<UserLoginForm/>}></Route> */}
        </Routes>
    </div>
  )
}

export default Deshboard
