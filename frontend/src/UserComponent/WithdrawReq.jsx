import React, { useState } from 'react'
import { transectionHandle } from '../lib/UserTransection'
const WithdrawReq = () => {
    const {sendAmount,  setSendAmount, withdrawMoney, loading} = transectionHandle()
    const [open, setOpen] = useState(false)
  return (
    <div className=''>
      <button onClick={() => setOpen(!open)} className='bg-slate-100 py-3 w-full uppercase font-bold hover:bg-slate-200 duration-200 transition-all border-slate-200 border'>Withdraw Now</button>
      <form onSubmit={(e) => withdrawMoney(e, sendAmount)} className={`${open ? 'block' : 'hidden'} bg-slate-100 py-3 `}>
        <div className='w-[90%] mx-auto flex items-center justify-between gap-5'>
          <input value={sendAmount} onChange={(e)=>setSendAmount(e.target.value)} className='py-3 w-full px-2 border border-slate-300 rounded outline-none focus:ring-2 ring-cyan-300' type="number" placeholder='Enter amount' /> 
          <button type="submit" className='bg-green-500 w-full py-3 px-5 uppercase font-bold hover:bg-green-600 duration-200 transition-all border-green-700 border text-white rounded-sm'>{loading ? "Loading..." : "Withdraw Now"}</button>
        </div>
      </form>
    </div>
  )
}

export default WithdrawReq
