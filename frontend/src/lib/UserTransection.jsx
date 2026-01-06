import {create} from 'zustand'
import {toast} from 'react-toastify'



export const transectionHandle = create((set)=>({
    sendAmount: 0,
    transectionId: "",
    setSendAmount: (amount) => set({sendAmount: amount}),
    setTransectionId: (id) => set({transectionId: id}),
    depositeHistory: [],
    loading: false,
    depositeMoney: async (e, sendAmount, transectionId)=>{
        e.preventDefault()
        set({loading: true})
        try {
            const deposite = await fetch(import.meta.env.VITE_API_LINK +'/deposite', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({sendAmount, transectionId})
            });
            const data = await deposite.json();
            toast.success(data.message);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }finally{
            const getData = await fetch(import.meta.env.VITE_API_LINK +'/deposite/user-history');
            const data = await getData.json();
            set({depositeHistory: data.user})
            set({loading: false})
        }
    },
    getDepositeHistory: async ()=>{
        try {
            const getAll = await fetch(import.meta.env.VITE_API_LINK +'/deposite/user-history',
                {
                    credentials: "include"
                }
            );
            const data = await getAll.json();
            const history = [...data.user].reverse();
            set({depositeHistory: history})
        } catch (error) {
            console.log(error)
        }
    }
}))