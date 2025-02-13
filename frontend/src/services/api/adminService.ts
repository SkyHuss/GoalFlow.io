import { authClient } from "../../utils/auth-client";
import { UserWithRole } from "better-auth/plugins";
import { SignUpFormData } from "./authService";

//Récupere la liste de tout les utilisateurs de l'app
export const getAllUsers = async (): Promise<UserWithRole[] | undefined> => {
    const response = await authClient.admin.listUsers({query: {}});
    return response.data?.users;
}

//Create user account
export const createUser = async (credentials: SignUpFormData) => {
    const response = await authClient.admin.createUser({
        name: credentials.firstname + ' ' + credentials.lastname,
        email: credentials.email,
        password: credentials.password,
        role: "user"
    })
    return response;
}

export const removeUser = async (userId: string) => {
    const response = await authClient.admin.removeUser({
        userId: userId
    });
    return response;
}