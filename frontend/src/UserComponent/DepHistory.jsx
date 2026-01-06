import React, { useEffect } from 'react'
import { transectionHandle } from '../lib/UserTransection'
import {formatDistanceToNow} from 'date-fns'
import { VscLoading } from "react-icons/vsc";
import { IoMdCheckmark } from "react-icons/io";

const DepHistory = () => {
    const { getDepositeHistory, depositeHistory } = transectionHandle()
    useEffect(() => {
        getDepositeHistory()
    }, [])
  return (
    <div className='mt-10'>
      <h1 className='py-3 font-bold text-2xl uppercase text-slate-800 px-2 border-b border-slate-200'>All requests</h1>
      {/* table loaded here  */}
      <table className='w-full py-5 divide divide-slate-400'>
        <thead>
          <tr className='grid grid-cols-[1fr_2fr_2fr_2fr] w-full p-2 border-y border-slate-400 font-bold bg-slate-200'>
            <th>Amount</th>
            <th>Transection Id</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {
            depositeHistory && depositeHistory?.map((item, index) => (
            <tr className={`grid grid-cols-[1fr_2fr_2fr_2fr] w-full p-2 border-b border-slate-400 text-center ${item.status === "success" ? "bg-green-200" : item.status === "pending" ? "bg-yellow-200" : "bg-red-200"}`} key={index}>
              <td>{item.sendAmount}</td>
              <td>{item.transectionId}</td>
              <td className='flex items-center justify-center'>{item.status === "success" ? <span className='text-green-600 text-xl font-bold'><IoMdCheckmark /></span> : item.status === "pending" ? <span className='text-xl animate-spin'><VscLoading /></span> : <span className='text-red-600 text-xl font-bold'>x</span>}</td>
              <td>{formatDistanceToNow(new Date(item.date))}</td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default DepHistory
