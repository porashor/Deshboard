import {create} from 'zustand'
import {toast} from 'react-toastify'



export const transectionUpdateHandles = create((set)=>({
    depositeRequest: [],
    SuccessOrCencel: async (sendAmount, status, transectionId)=>{
        try {
            const update = await fetch(import.meta.env.VITE_API_LINK +'/deposite/status-update', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({sendAmount, status, transectionId})
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
    }
}))