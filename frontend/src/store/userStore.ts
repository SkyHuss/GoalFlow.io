import { User } from "better-auth";
import { create } from "zustand";
import { getCurrentUserSession } from "../services/api/authService";

interface UserStore {
    user: User | null,
    loading: boolean,
    error: string | null,
    fetchCurrentUser: () => Promise<void>,
    clearUser: () => void,
}

export const useUserStore = create<UserStore>()((set) => ({
    user: null,
    loading: false,
    error: null,
    fetchCurrentUser: async () => {
        set({loading: true, error: null})
        try {
            const response = await getCurrentUserSession();
            if(response?.data?.user) {
                set({user: response.data.user, loading: false, error: null})
            } else {
                set({user: null, loading: false, error: "No user connected"})
            }
        } catch {
            set({error: "Error : Can't get the user session", loading: false})
        }
    },
    clearUser: () => set({user: null, error: null})
}))