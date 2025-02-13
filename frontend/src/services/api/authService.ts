import { authClient } from "../../utils/auth-client";

export interface LoginFormData {
    email: string;
    password: string;
}

export interface SignUpFormData {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    profilePicture: string | null;
}

export const getCurrentUserSession = async () => {
    return await authClient.getSession();
}

//Authentificate a user
export const logIn = async (credentials: LoginFormData) => {
    return await authClient.signIn.email({
        email: credentials.email,
        password: credentials.password
    })
}

//Create and signUp a User
export const signUp = async (credentials: SignUpFormData) => {
    return authClient.signUp.email({
        name: credentials.firstname + ' ' + credentials.lastname,
        email: credentials.email,
        password: credentials.password,
        image: credentials.profilePicture || undefined,
    })
}

//Log out a user
export const signOut = async () => {
    await authClient.signOut();
} 


