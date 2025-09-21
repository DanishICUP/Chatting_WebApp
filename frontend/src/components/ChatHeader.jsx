import React, { useEffect } from 'react'
import { UseChatStore } from '../store/USeChatStore';
import { XIcon } from "lucide-react";
import { useAuthStore } from '../store/UseAuthStore';

const ChatHeader = () => {

    const { selectedUser, setSelectedUser } = UseChatStore();
    const { onlineUsers } = useAuthStore();
    const isOnline = onlineUsers.includes(selectedUser._id.toString());

    useEffect(()=>{

        const handleEscKey = (event) => {
            if (event.key === 'Escape') return setSelectedUser(null)
        }

        window.addEventListener("keydown",handleEscKey)
        return () => window.removeEventListener("keydown", handleEscKey);
    },[setSelectedUser])

    return (
        <div
            className="flex justify-between items-center bg-slate-800/50 border-b
   border-slate-700/50 max-h-[84px] px-6 flex-1"
        >
            <div className="flex items-center space-x-3">
                <div className="avatar online">
                    <div className="w-12 rounded-full">
                        <img src={selectedUser.profilepic || "/avatar.png"} alt={selectedUser.fullname} />
                    </div>
                </div>

                <div>
                    <h3 className="text-slate-200 font-medium">{selectedUser.fullname}</h3>
                    <p className="text-slate-400 text-sm">{`${isOnline ? "Online" : "offline"}`}</p>
                </div>
            </div>

            <button onClick={() => setSelectedUser(null)}>
                <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
            </button>
        </div>
    )
}

export default ChatHeader