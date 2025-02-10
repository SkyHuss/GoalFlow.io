import { User } from "better-auth";
import api from "./api";
import { authClient } from "../../utils/auth-client";

//Récupere la liste de tout les utilisateurs de l'app
export const getAllUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>('/admin/users');
    return response.data;
}

export const removeUser = async (userId: string) => {
    const response = await authClient.admin.removeUser({
        userId: userId
    });
    return response;
}