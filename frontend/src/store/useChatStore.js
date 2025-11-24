import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set((state) => ({ isUsersLoading: true }));
        try {
            const response = await axiosInstance.get('/messages/users');
            set((state) => ({ users: response.data }));
        } catch (error) {
            toast.error(error.response.data.error);
        } finally {
            set((state) => ({ isUsersLoading: false }));
        }
    },

    getMessages: async (userId) => {
        set((state) => ({ isMessagesLoading: true }));
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set((state) => ({ messages: response.data }));
        } catch (error) {
            toast.error(error.response.data.error);
        } finally {
            set((state) => ({ isMessagesLoading: false }));
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set((state) => ({ messages: [...messages, response.data] }));
        } catch (error) {
            toast.error(error.response.data.error);
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        // console.log(selectedUser);
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            set({ messages: [...get().messages, newMessage] });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => {
        set((state) => ({ selectedUser: selectedUser }));
    }
}));