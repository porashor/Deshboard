import React, {  useEffect } from 'react'
import { userHandle } from '../lib/UserFunction'
import  {transectionHandle} from '../lib/UserTransection'

const UserBalanceData = () => {
  const {getDepositeHistory, depositeHistory, getWithdrawHistory, withdrawHistory} = transectionHandle()
  const {balance, getBalance, getNum} = userHandle()
  useEffect(() => {
    getBalance()
    getDepositeHistory()
    getWithdrawHistory()
  }, [])
  console.log(depositeHistory);
  console.log(withdrawHistory);
  const getPanding = getNum(depositeHistory, "pending")
  const getCencel = getNum(depositeHistory, "cencel")
  const getWpanding = getNum(withdrawHistory, "pending")
  return (
    <div className='w-[95%] mx-auto py-5 grid grid-cols-4 gap-20'>
      {/* main Balance card */}
      <div className='bg-green-600 w-full h-[120px] rounded-md flex items-center flex-col justify-center text-white'>
        <h3 className='text-2xl font-bold'>Your Main Balance</h3>
        <h1 className='text-4xl font-bold'>{balance ? balance.balance : "0"}</h1>
      </div>
      {/* panding deposite balance card */}
      <div className='bg-yellow-600 w-full h-[120px] rounded-md flex items-center flex-col justify-center text-white'>
        <h3 className='text-2xl font-bold'>Panding Deposite</h3>
        <h1 className='text-4xl font-bold'>{getPanding}</h1>
      </div>
      {/* panding deposite balance card */}
      <div className='bg-yellow-600 w-full h-[120px] rounded-md flex items-center flex-col justify-center text-white'>
        <h3 className='text-2xl font-bold'>Panding Withdraw</h3>
        <h1 className='text-4xl font-bold'>{getWpanding}</h1>
      </div>
      {/* cencelled balance card */}
      <div className='bg-red-600 w-full h-[120px] rounded-md flex items-center flex-col justify-center text-white'>
        <h3 className='text-2xl font-bold text-center'> Cencelled Balance</h3>
        <h1 className='text-4xl font-bold'>{getCencel}</h1>
      </div>
    </div>
  )
}

export default UserBalanceData
