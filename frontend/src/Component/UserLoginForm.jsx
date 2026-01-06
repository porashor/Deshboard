import React from 'react'
import { userHandle } from '../lib/UserFunction'
const UserLoginForm = () => {
    const {email, password, setEmail, setPassword, loading, login} = userHandle()
  return (
    <div className='absolute bg-white w-full h-full flex items-center justify-center z-100'>
        <form onSubmit={(e) => login(e, email, password)} className='border border-slate-300 py-4 px-2 rounded-lg shadow-md w-80' >
            <h1 className='text-xl font-bold uppercase text-center'> Log In</h1>
            <label className='flex flex-col gap-2' htmlFor="email">Email : 
            <input value={email} onChange={(e) => setEmail(e.target.value)} name='email' className='py-1 px-2 border border-bg-slate-200 rounded outline-none focus:ring-2 ring-cyan-300' type="email" placeholder='Enter email' required/>
            </label>
            <label className='flex flex-col gap-2' htmlFor="name">Password : 
            <input value={password} onChange={(e) => setPassword(e.target.value)} name='password' className='py-1 px-2 border border-bg-slate-200 rounded outline-none focus:ring-2 ring-cyan-300' type="password" placeholder='Type name' required/>
            </label>
            <button type="submit" className='py-1 font-bold bg-blue-300 hover:bg-blue-400 rounded duration-300 tansition my-2 w-full'>{loading ? "Loading..." : "Sign In"}</button>
        </form>
    </div>
  )
}

export default UserLoginForm
