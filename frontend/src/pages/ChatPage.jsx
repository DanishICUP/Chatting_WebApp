import React from 'react'
import { useAuthStore } from '../store/UseAuthStore'

const ChatPage = () => {

  const { logout } = useAuthStore()

  return (
    <div className='z-10'><button onClick={logout} className='z-10'>Logout</button></div>
  )
}

export default ChatPage