import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    authError: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check-auth', { withCredentials: true });
            set((state) => ({ authUser: response.data }));
            get().connectSocket();
        } catch (error) {
            console.error("Auth check failsed: ", error.message);
            set((state) => ({ authUser: null, authError: error }));
        } finally {
            set((state) => ({ isCheckingAuth: false }));
        }
    },

    signup: async (data) => {
        set((state) => ({ isSigningUp: true }));
        try {
            const response = await axiosInstance.post('/auth/signup', data);
            set((state) => ({ authUser: response.data }));
            get().connectSocket();
            toast.success("Account created successfully");
        } catch (error) {
            console.error("signup failed: ", error.message);
            toast.error(error.response.data.error);
            set((state) => ({ authUser: null, authError: error }));
        } finally {
            set((state) => ({ isSigningUp: false }));
        }
    },

    login: async (data) => {
        set((state) => ({ isLoggingIn: true }));
        try {
            const response = await axiosInstance.post('/auth/login', data);
            set((state) => ({ authUser: response.data }));
            get().connectSocket()
            toast.success("Logged in Successfully");
        } catch (error) {
            console.error("login failed: ", error.message);
            console.log(error);
            toast.error(error.response.data.error);
            set((state) => ({ authUser: null, authError: error }));
        } finally {
            set((state) => ({ isLoggingIn: false }));
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set((state) => ({ authUser: null }));
            get().disconnectSocket()
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    },

    updateProfile: async (data) => {
        set((state) => ({ isUpdatingProfile: true }));
        try {
            const response = await axiosInstance.put('/auth/update-profile', data);
            set((state) => ({ authUser: response.data }));
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("error in update profile", error);
            toast.error(error.response.data.error);
        } finally {
            set((state) => ({ isUpdatingProfile: false }));
        }
    },

    connectSocket: () => {
        const currentUser  = get().authUser;
        if (!currentUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: currentUser._id,
            },
        });
        socket.connect();

        set((state) => ({ socket: socket }));

        socket.on("getOnlineUsers", (userIds) => {
            set((state) => ({ onlineUsers: userIds }));
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}));