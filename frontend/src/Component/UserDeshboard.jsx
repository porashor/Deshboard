import React from 'react'
import Navigation from './Navigation'
import UserBalance from '../Pages/UserBalance'
import UserDeposit from '../Pages/UserDeposit'
import UserWithdraw from '../Pages/UserWithdraw'
import UserControll from '../Pages/UserControll'
import { Route, Routes } from 'react-router-dom'
const UserDeshboard = () => {
  return (
    <div className='grid grid-cols-[1fr_5fr]'>
        <Navigation status='user'/>
        <Routes>
          <Route path='/user/balance' element={<UserBalance/>}></Route>
          <Route path='/user/deposit' element={<UserDeposit/>}></Route>
          <Route path='/user/withdraw' element={<UserWithdraw/>}></Route>
          <Route path='/user/details' element={<UserControll/>}></Route>
        </Routes>
    </div>
  )
}

export default UserDeshboard
