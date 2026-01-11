import React, { useEffect, useState } from 'react'
import { transectionUpdateHandles } from '../lib/AdminTransection'
import { formatDistanceToNow } from 'date-fns'
const TransectionData = () => {
    const {depositeRequest, getTransections, getWithdraws, allwithdraw} = transectionUpdateHandles()
    const [open, setOpen] = useState(0)
    useEffect(() => {
        getTransections()
    }, [])
    console.log(depositeRequest)
    const allSuccess = depositeRequest.filter(item => item.status === "success")
    const allCancel = depositeRequest.filter(item => item.status === "cencel")
  return (
    <div>
        {/* //navigation  */}
        <ul className='w-[90%] mx-auto flex items-center gap-5 py-5'>
            <li><a onClick={() => setOpen(0)} className={`cursor-pointer uppercase font-semibold bg-slate-700 text-white py-2 px-5 hover:bg-slate-800 ${open === 0 ? 'bg-slate-800 text-cyan-200' : ''}`} >Deposite History</a></li>
            <li><a  onClick={() => setOpen(1)} className={`cursor-pointer uppercase font-semibold bg-slate-700 text-white py-2 px-5 hover:bg-slate-800 ${open === 1 ? 'bg-slate-800 text-cyan-200' : ''}`} >Withdraw History</a></li>
        </ul>

        {/* deposite request  */}
      <div className={open === 0 ? "block" : "hidden"}>
      <h1 className='text-2xl font-bold pt-10 pb-5 uppercase text-slate-800'>Deposite Request successed ({allSuccess.length})</h1>
        <table className='w-full py-5 divide divide-slate-400'>
            <thead>
            <tr className='grid grid-cols-[1fr_2fr_1fr_2fr_2fr_2fr] w-full p-2 border-y border-slate-400 font-bold bg-slate-200'>
                <th>Name</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Transection Id</th>
                <th>Status</th>
                <th>Time</th>
            </tr>
            </thead>
            <tbody>
            {
                allSuccess && allSuccess?.map((item, index) => (
                    <tr className={`grid grid-cols-[1fr_2fr_1fr_2fr_2fr_2fr] w-full p-2 border-b border-slate-400 text-center ${item.status === "success" ? "bg-green-200" : item.status === "pending" ? "bg-yellow-200" : "bg-red-200"}`} key={index}>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.sendAmount}</td>
                <td>{item.transectionId}</td>
                <td>{item.status}</td>
                <td>{formatDistanceToNow(new Date(item.date))}</td>
                </tr>
                ))}
            </tbody>
        </table>
      <h1 className='text-2xl font-bold pt-10 pb-5 uppercase text-slate-800'>Deposite Request Canceled({allCancel.length})</h1>
        <table className='w-full py-5 divide divide-slate-400'>
            <thead>
            <tr className='grid grid-cols-[1fr_2fr_1fr_2fr_2fr_2fr] w-full p-2 border-y border-slate-400 font-bold bg-slate-200'>
                <th>Name</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Transection Id</th>
                <th>Status</th>
                <th>Time</th>
            </tr>
            </thead>
            <tbody>
            {
                allCancel && allCancel?.map((item, index) => (
                    <tr className={`grid grid-cols-[1fr_2fr_1fr_2fr_2fr_2fr] w-full p-2 border-b border-slate-400 text-center ${item.status === "success" ? "bg-green-200" : item.status === "pending" ? "bg-yellow-200" : "bg-red-200"}`} key={index}>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.sendAmount}</td>
                <td>{item.transectionId}</td>
                <td>{item.status}</td>
                <td>{formatDistanceToNow(new Date(item.date))}</td>
                </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* withdraw request */}
      <div className={open === 1 ? "block" : "hidden"}>
      <h1 className='text-2xl font-bold pt-10 pb-5 uppercase text-slate-800'>Withdraw Request successed ({allSuccess.length})</h1>
        <table className='w-full py-5 divide divide-slate-400'>
            <thead>
            <tr className='grid grid-cols-[1fr_2fr_1fr_2fr_2fr_2fr] w-full p-2 border-y border-slate-400 font-bold bg-slate-200'>
                <th>Name</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Transection Id</th>
                <th>Status</th>
                <th>Time</th>
            </tr>
            </thead>
            <tbody>
            {
                allSuccess && allSuccess?.map((item, index) => (
                    <tr className={`grid grid-cols-[1fr_2fr_1fr_2fr_2fr_2fr] w-full p-2 border-b border-slate-400 text-center ${item.status === "success" ? "bg-green-200" : item.status === "pending" ? "bg-yellow-200" : "bg-red-200"}`} key={index}>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.sendAmount}</td>
                <td>{item.transectionId}</td>
                <td>{item.status}</td>
                <td>{formatDistanceToNow(new Date(item.date))}</td>
                </tr>
                ))}
            </tbody>
        </table>
      <h1 className='text-2xl font-bold pt-10 pb-5 uppercase text-slate-800'>Withdraw Request Canceled({allCancel.length})</h1>
        <table className='w-full py-5 divide divide-slate-400'>
            <thead>
            <tr className='grid grid-cols-[1fr_2fr_1fr_2fr_2fr_2fr] w-full p-2 border-y border-slate-400 font-bold bg-slate-200'>
                <th>Name</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Transection Id</th>
                <th>Status</th>
                <th>Time</th>
            </tr>
            </thead>
            <tbody>
            {
                allCancel && allCancel?.map((item, index) => (
                    <tr className={`grid grid-cols-[1fr_2fr_1fr_2fr_2fr_2fr] w-full p-2 border-b border-slate-400 text-center ${item.status === "success" ? "bg-green-200" : item.status === "pending" ? "bg-yellow-200" : "bg-red-200"}`} key={index}>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.sendAmount}</td>
                <td>{item.transectionId}</td>
                <td>{item.status}</td>
                <td>{formatDistanceToNow(new Date(item.date))}</td>
                </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransectionData
