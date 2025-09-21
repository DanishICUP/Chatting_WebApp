import React from 'react'
import { useEffect } from 'react';
import MessagesLoadingSkeleton from './MessageSkeletion';
import { useAuthStore } from '../store/UseAuthStore';
import { UseChatStore } from '../store/USeChatStore';

const ContactList = () => {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = UseChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts()
  }, [getAllContacts])

  if (isUsersLoading) return <MessagesLoadingSkeleton />


  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className="indicator">
              
              {onlineUsers.includes(contact._id.toString()) ? (
                <span className="badge badge-success badge-xs indicator-item indicator-top"></span>
              ) : (
                <span className="badge badge-neutral badge-xs indicator-item indicator-top"></span>
              )}
              
              <div className="size-12 rounded-full">
                <img src={contact.profilepic || "/avatar.png"} />
              </div>

            </div>
            <h4 className="text-slate-200 font-medium">{contact.fullname}</h4>
          </div>
        </div>
      ))}
    </>
  )
}

export default ContactList