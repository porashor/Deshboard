import { userHandle } from "../lib/UserFunction"

const UserCreate = () => {
  const {name, email, password, loading, setName, setEmail, setPassword, createUser} = userHandle()
  return (
    <div className='flex items-center justify-center w-full h-screen'>
        {/* From loaded here  */}
        <form onSubmit={(e) => createUser(e, name, email, password)} className='border-slate-300 border w-80 min-h-[100px] p-4 rounded-xl flex flex-col shadow space-y-5' >
            <h1 className='py-2 text-center text-2xl font-bold'>Create User</h1>
            <label className='flex flex-col gap-2' htmlFor="name">Name : 
            <input value={name} onChange={(e) => setName(e.target.value)} name='name' className='py-1 px-2 border border-bg-slate-200 rounded outline-none focus:ring-2 ring-cyan-300' type="text" placeholder='Type name' required/>
            </label>
            <label className='flex flex-col gap-2' htmlFor="email">Email : 
            <input value={email} onChange={(e) => setEmail(e.target.value)} name='email' className='py-1 px-2 border border-bg-slate-200 rounded outline-none focus:ring-2 ring-cyan-300' type="email" placeholder='Enter email' required/>
            </label>
            <label className='flex flex-col gap-2' htmlFor="name">Password : 
            <input value={password} onChange={(e) => setPassword(e.target.value)} name='password' className='py-1 px-2 border border-bg-slate-200 rounded outline-none focus:ring-2 ring-cyan-300' type="password" placeholder='Type name' required/>
            </label>
            <button type="submit" className='py-1 font-bold bg-blue-300 hover:bg-blue-400 rounded duration-300 tansition my-2'>{loading ? "Loading..." : "Create User"}</button>
        </form>
    </div>
  )
}

export default UserCreate
