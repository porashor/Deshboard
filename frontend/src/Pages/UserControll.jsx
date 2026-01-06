import React from 'react'
import { userHandle } from '../lib/UserFunction'
const UserControll = () => {

    const {logout} = userHandle()
  return (
    <div>
      <button className='bg-red-400 py-2 px-3' onClick={logout}>Logout</button>
    </div>
  )
}

export default UserControll
