import React from 'react'
import { UseChatStore } from '../store/USeChatStore';

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = UseChatStore();
  return (
    <div className="tabs tabs-boxed bg-transparent flex justify-evenly m-2">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab ${
          activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"
        }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab ${
          activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"
        }`}
      >
        Contacts
      </button>
    </div>
  )
}

export default ActiveTabSwitch