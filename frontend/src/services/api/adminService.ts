import { User } from "better-auth";
import api from "./api";

//Récupere la liste de tout les utilisateurs de l'app
export const getAllUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>('/admin/users');
    return response.data;
}