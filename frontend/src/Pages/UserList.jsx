import {  useEffect } from 'react'
import { userHandle } from '../lib/UserFunction'
const UserList = () => {
  const {allUser, setAllUser} = userHandle()
  useEffect(() => {
    setAllUser()
  }, [])
  console.log(allUser);
  return (
    <div>
      <div className='w-fill py-2 text-3xl font-bold uppercase border-b-2'>UserList</div>
      {/* user loaded here  */}
      <ul className='flex flex-col gap-2 items-start justify-center'>
        <li className='grid grid-cols-[1fr_3fr_4fr_1fr_1fr] w-full p-2 border-y border-slate-400 font-bold bg-slate-200'>
          <p>Id</p>
          <p>Name</p>
          <p>Email</p>
          <p>Type</p>
          <p>Password</p>
        </li>
        {
          allUser.users &&  allUser.users?.map((item, index) => (<li className='grid grid-cols-[1fr_3fr_4fr_1fr_1fr] w-full p-2 border-b border-slate-400' key={index}>
            <p>{item.id}</p>
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item?.status}</p>
            <p>{item.password}</p>
          </li>))
        }
      </ul>
    </div>
  )
}

export default UserList
