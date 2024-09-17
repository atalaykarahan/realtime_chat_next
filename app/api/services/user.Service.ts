import axios from "../axios"

export const updateUsernameByMail = async (userName: string) => {
    const body = {
        user_name: userName
    }
    return await axios.patch("/user/username", body)
}

