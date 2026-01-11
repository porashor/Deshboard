import {create} from 'zustand'
import { toast } from 'react-toastify';


export const userHandle = create((set) => ({
    name: "",
    email: "",
    password: "",
    loading: false,
    setEmail: (email) => set({email}),
    setPassword: (password) => set({password}),
    setName: (name) => set({name}),
    createUser: async (e, name, email, password) => {
        e.preventDefault();
        set({loading: true})
        try {
            const createUser = await fetch( import.meta.env.VITE_API_LINK +'/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, email, password})
            });
            const data = await createUser.json();
            toast.success(data.message);
        } catch (error) {
            console.log(error)
        }finally {
            set({
                loading: false,
                name: "",
                email: "",
                password: ""
            })
        }
    },
    allUser: [],
    setAllUser: async () => {
        try {
            const getUser = await fetch( import.meta.env.VITE_API_LINK +'/auth');
            const data = await getUser.json();
            set({allUser: data})
        } catch (error) {
            console.log(error);
        }
    },
    status: "",
    login: async (e, email, password) => {
        e.preventDefault();
        try {
            const login = await fetch( import.meta.env.VITE_API_LINK +'/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({email, password})
            });
            const data = await login.json();
            set({status: data.status})
            toast.success(data.message);
            window.location.href = "/user";
        } catch (error) {
            console.log(error)
        }finally {
            set({
                loading: false,
                name: "",
                email: "",
                password: ""
            })
        }
    },
    user: {},
    setUser: async () => {
        try {
            const getUser = await fetch( import.meta.env.VITE_API_LINK +'/auth/data',{
                credentials: "include"
            });
            const data = await getUser.json();
            set({user: data, status: data.data.user[0].status})
        } catch (error) {
            console.log(error);
        }
    },
    logout: async () => {
        console.log("logout")
        try {
            const logout = await fetch( import.meta.env.VITE_API_LINK +'/auth/signout', {
                method: "DELETE",
                credentials: "include"
            });
            const data = await logout.json();
            toast.success(data.message);
            set({status: ""})
            window.location.href = "/";
        } catch (error) {
            console.log(error)
        }
    },
    balance: {},
    getBalance: async ()=>{
        try {
            const getBalance = await fetch( import.meta.env.VITE_API_LINK +'/deposite/user-balance', {
                credentials: "include"
            });
            const data = await getBalance.json();
            set({balance: data})
        } catch (error) {
            console.log(error)
        }
    },
    getNum: (objects, text)=>{
        console.log(objects)
    const objectss = objects?.filter((item) => item.status === text);
    const getNumValue = objectss.map((item) => Number(item.sendAmount));
    const total = getNumValue.reduce((a, b) => a + b, 0);
    return total.toFixed(2)
  }
}))