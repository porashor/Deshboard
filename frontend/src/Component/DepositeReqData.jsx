import React, { useEffect, useState } from 'react'
import { transectionUpdateHandles } from '../lib/AdminTransection'
import {  formatDistanceToNow } from 'date-fns'

const DepositeReqData = () => {
    const [open, setOpen] = useState(0)
    const { depositeRequest, getTransections, SuccessOrCencel } = transectionUpdateHandles()
    useEffect(() => {
        getTransections()
    }, [])
    const allPending = depositeRequest.filter(item => item.status === "pending")
    console.log(allPending)
  return (
    <div>
        <h1 className='text-2xl font-bold pt-10 pb-5 uppercase text-slate-800 border-b border-slate-300'>Deposite Request ({allPending.length}) </h1>
        <div>
            {/* table header  */}
            <div className='w-full grid grid-cols-[1fr_2fr_1fr_2fr_2fr_2fr] py-2 border-y border-slate-400 font-bold bg-slate-200 text-center'>
                <div>Name</div>
                <div>Email</div>
                <div>Amount</div>
                <div>Transaction Id</div>
                <div>status</div>
                <div>date</div>
            </div>
            <div>
                {allPending && allPending?.map((item, index) => (
                    <div onClick={()=>setOpen(index)} key={index}>
                        <div className='w-full grid grid-cols-[1fr_2fr_1fr_2fr_2fr_2fr] py-2 border-y border-slate-400 text-center'>
                            <div>{item.email}</div>
                            <div>{item.name}</div>
                            <div>{item.sendAmount}</div>
                            <div>{item.transectionId}</div>
                            <div>{item.status}</div>
                            <div>{formatDistanceToNow(new Date(item.date))}</div>
                        </div>
                        <div className={`w-full py-2 flex items-center justify-evenly ${index === open ? "block" : "hidden"}`}>
                            <button onClick={() => SuccessOrCencel(item.sendAmount, "success", item.transectionId, item.email)} className='bg-green-700 py-2 px-5 rounded-md text-xl text-white hover:bg-green-800'>Success</button>
                            <button onClick={() => SuccessOrCencel(item.sendAmount, "cencel", item.transectionId, item.email)} className='bg-red-700 py-2 px-5 rounded-md text-xl text-white hover:bg-red-800'>Cancel</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default DepositeReqData
