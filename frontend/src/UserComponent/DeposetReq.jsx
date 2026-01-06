import React, { useState } from 'react'
import { transectionHandle } from '../lib/UserTransection'
const DeposetReq = () => {
    const {sendAmount, transectionId, setSendAmount, setTransectionId, depositeMoney, loading} = transectionHandle()
    const [open, setOpen] = useState(false)
  return (
    <div className=''>
      <button onClick={() => setOpen(!open)} className='bg-slate-100 py-3 w-full uppercase font-bold hover:bg-slate-200 duration-200 transition-all border-slate-200 border'>Deposite Now</button>
      <form onSubmit={(e) => depositeMoney(e, sendAmount, transectionId)} className={`${open ? 'block' : 'hidden'} bg-slate-100 py-3 `}>
        <div className='w-[90%] mx-auto flex items-center justify-between gap-5'>
          <input value={sendAmount} onChange={(e)=>setSendAmount(e.target.value)} className='py-3 w-full px-2 border border-slate-300 rounded outline-none focus:ring-2 ring-cyan-300' type="number" placeholder='Enter amount' />  
          <input value={transectionId} onChange={(e)=>setTransectionId(e.target.value)} className='py-3 px-2 w-full border border-slate-300 rounded outline-none focus:ring-2 ring-cyan-300' type="text" placeholder='Transaction id' />
          <button className='bg-green-500 w-full py-3 px-5 uppercase font-bold hover:bg-green-600 duration-200 transition-all border-green-700 border text-white rounded-sm'>{loading ? "Loading..." : "Deposite Now"}</button>
        </div>
      </form>
    </div>
  )
}

export default DeposetReq
