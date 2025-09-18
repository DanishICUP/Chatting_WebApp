import { create } from 'zustand'
import { axiosInstance } from '../lib/Axios'
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckAuthUser: true,
    isSignUp: false,
    isLoading: false,
    isLoggedin: false,

    CheckAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({ authUser: res.data })
        } catch (error) {
            console.log("error in authChecking", error)
            set({ authUser: null })
        } finally {
            set({ isCheckAuthUser: false })
        }
    },

    signup: async (data) => {
        set({ isSignUp: true, isLoading: true })
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({ authUser: res.data })

            toast.success("Account Created Successfuly")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isSignUp: false, isLoading: false })
        }
    },

    login: async (data) => {
        set({ isLoggedin: true })
        try {
            const res = await axiosInstance.post('/auth/login', data)
            set({ authUser: res.data })

            toast.success("Login successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isLoggedin: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({ authUser: null })

            toast.success("Logout success")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}))