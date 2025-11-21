import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "dark",
    setTheme: (data) => {
        localStorage.setItem("chat-theme", data);
        set((state) => ({ theme: data }));
    }
}));