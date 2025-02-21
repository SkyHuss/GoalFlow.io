import { authClient } from "../../utils/auth-client"

export const updateUserName = async (newName: string) => {
    return await authClient.updateUser({
        name: newName
    })
}

export const updateProfilPicture = async (picture: string | null | undefined) => {
    return await authClient.updateUser({
        image: picture
    })
}

