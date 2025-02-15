import { User } from "better-auth";
import { create } from "zustand";
import { getCurrentUserSession } from "../services/api/authService";

export interface AppUser extends User {
    role?: string | null | undefined;
}

interface UserStore {
    user: AppUser | null,
    loading: boolean,
    error: string | null,
    fetchCurrentUser: () => Promise<void>,
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
    }
}))

export const globalUserUpdate = (nextUser: AppUser) => {
    useUserStore.setState({user: nextUser})
}