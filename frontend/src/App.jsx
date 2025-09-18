import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignnupPage from './pages/SignnupPage'
import { useAuthStore } from './store/UseAuthStore'
import PageLoader from './components/PageLoader'
import { Toaster } from 'react-hot-toast';

const App = () => {

  const { authUser, isCheckAuthUser, CheckAuth } = useAuthStore()

  useEffect(() => {
    CheckAuth()
  }, [CheckAuth])

  console.log({ authUser })

  if (isCheckAuthUser) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">

      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <ChatPage /> : <Navigate to={'/login'} />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path='/signup' element={!authUser ? <SignnupPage /> : <Navigate to={'/'} />} />
      </Routes>
    </div>
  )
}

export default App