import React, { useEffect } from 'react'
import { transectionUpdateHandles } from '../lib/AdminTransection'
import { formatDistanceToNow } from 'date-fns'
const TransectionData = () => {
    const {depositeRequest, getTransections} = transectionUpdateHandles()
    useEffect(() => {
        getTransections()
    }, [])
    console.log(depositeRequest)
    const allSuccess = depositeRequest.filter(item => item.status === "success")
    const allCancel = depositeRequest.filter(item => item.status === "cencel")
  return (
    <div>
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
  )
}

export default TransectionData
