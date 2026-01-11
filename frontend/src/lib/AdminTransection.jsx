import {create} from 'zustand'
import {toast} from 'react-toastify'



export const transectionUpdateHandles = create((set)=>({
    depositeRequest: [],
    SuccessOrCencel: async (sendAmount, status, transectionId, email)=>{
        try {
            const update = await fetch(import.meta.env.VITE_API_LINK +'/deposite/status-update', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({sendAmount, status, transectionId, email})
            });
            const data = await update.json();
            toast.success(data.message);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }finally{
            const getData = await fetch(import.meta.env.VITE_API_LINK +'/deposite/all-transection');
            const data = await getData.json();
            const history = [...data.user].reverse();
            set({depositeRequest: history})
        }
    },
    getTransections: async ()=>{
        try {
            const getAll = await fetch(import.meta.env.VITE_API_LINK +'/deposite/all-transection');
            const data = await getAll.json();
            const history = [...data.user].reverse();
            set({depositeRequest: history})
        } catch (error) {
            console.log(error)
        }
    },
    allwithdraw: [],
    getWithdraws: async ()=>{
        try {
            const getAll = await fetch(import.meta.env.VITE_API_LINK +'/withdraw/all-withdraw');
            const data = await getAll.json();
            console.log(data)
            set({allwithdraw: data.user})
        } catch (error) {
            console.log(error)
        }
    },
    WithdrawSuccessOrCencel: async (sendAmount, status, email, id)=>{
        try {
            const update = await fetch(import.meta.env.VITE_API_LINK +'/withdraw/status-update', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({amount: sendAmount, status, email, id})
            });
            const data = await update.json();
            toast.success(data.message);
        } catch (error) {
            console.log(error)
        }finally{
            const getData = await fetch(import.meta.env.VITE_API_LINK +'/withdraw/all-withdraw');
            const data = await getData.json();
            set({allwithdraw: data.user})
        }
    }
}))