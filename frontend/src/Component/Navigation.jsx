
import { useLocation, Link } from 'react-router-dom'

const Navigation = ({status}) => {
    const location = useLocation()
    const nav = [
        {
            name: "user create",
            path: "/admin/create-user"
        },
        {
            name: "user list",
            path: "/admin/user-list"
        },
        
        {
            name: "Balance",
            path: "/user/balance"
        },
        {
            name: "Deposite",
            path: "/user/deposit"
        },
        {
            name: "Withdraw",
            path: "/user/withdraw"
        },
        {
            name: "user controll",
            path: "/user/details"
        },
        {
            name: "Deposite Request",
            path: "/admin/deposite-request"
        },
        {
            name: "Withdraw Request",
            path: "/admin/withdraw-request"
        },
        {
            name: "Transection",
            path: "/admin/transaction"
        },
    ]
  return (
    <div className='sticky h-screen bg-[#3F4D67] text-white'>
        <div className='p-4 flex items-center justify-center border-b border-slate-500'>
            <h1 className='text-3xl font-bold'>{status} </h1>
        </div>
        <div className='h-fit text-xl'>
            <ul>
                {
                    nav.map((item, index) => (
                        <li key={index} className={`h-12 cursor-pointer uppercase ${location?.pathname === item.path ? "bg-[#333F54] text-cyan-300" : "hover:bg-[#333F54]"} ${item.path.split("/")[1] === status ? "block" : "hidden"}`}>
                            <Link className='w-full h-full flex items-center justify-start px-2' to={item.path}>{item.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default Navigation
