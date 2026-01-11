import React, { useEffect } from 'react'
import { transectionHandle } from '../lib/UserTransection'
import {format} from "date-fns"

const TransectionHistory = () => {
    const {getDepositeHistory, depositeHistory, getWithdrawHistory, withdrawHistory} = transectionHandle()
    useEffect(() => {
        getDepositeHistory()
        getWithdrawHistory()
    }, [])
    console.log(depositeHistory);
    const depositeHis = depositeHistory.filter((item) => item.status === "success")
    const withdrawHis = withdrawHistory.filter((item) => item.status === "success")
    const allHistory = [...depositeHis, ...withdrawHis]
    const sortedHistory = allHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log(sortedHistory);
  return (
    <div className='w-[95%] mx-auto py-5'>
        <h1 className='text-3xl font-bold uppercase text-slate-600 border-b border-slate-300 pb-5'>All Transection History</h1>
        <div>
            <ul className='grid grid-cols-2 py-2 bg-slate-200 font-bold text-center'>
                <li>Amount</li>
                <li>Date</li>
            </ul>
            <ul className=''>
                {
                    sortedHistory && sortedHistory?.map((item, index) => (<li className={`grid grid-cols-2 py-2 text-center ${item.transectionId ? "bg-green-200" : "bg-red-200"}`} key={index}>
                        <li> {item.transectionId ? "+" : "-"} {item.sendAmount}</li>
                        <li>{format(item.date, "dd/MM/yyyy")}</li>
                    </li>))
                }
            </ul>
        </div>
    </div>
  )
}

export default TransectionHistory
