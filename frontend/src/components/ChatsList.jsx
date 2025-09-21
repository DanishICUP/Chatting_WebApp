import React, { useEffect } from 'react'
import { UseChatStore } from '../store/USeChatStore';
import MessageSkeletion from '../components/MessageSkeletion'
import NoChatsFound from './NoChatFound';
import { useAuthStore } from '../store/UseAuthStore';
const ChatsList = () => {

  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = UseChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners()
  }, [getMyChatPartners])

  if (isUsersLoading) return <MessageSkeletion />
  if (chats.length === 0) return <NoChatsFound />


  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className="indicator">
              
              {onlineUsers.includes(chat._id.toString()) ? (
                <span className="badge badge-success badge-xs indicator-item indicator-top"></span>
              ) : (
                <span className="badge badge-neutral badge-xs indicator-item indicator-top"></span>
              )}
              
              <div className="size-12 rounded-full">
                <img src={chat.profilepic || "/avatar.png"} alt={chat.fullname} />
              </div>
            </div>

            <h4 className="text-slate-200 font-medium truncate">{chat.fullname}</h4>
          </div>

        </div>
      ))}

    </>
  )
}

export default ChatsList