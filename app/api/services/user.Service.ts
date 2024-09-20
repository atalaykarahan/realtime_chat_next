import axios from "../axios"

export const updateUsernameByMail = async (userName: string) => {
    const body = {
        user_name: userName
    }
    return await axios.patch("/user/username", body)
}

export const uploadProfilePicture = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

   
    return await axios.post("/user/upload-profile-picture", formData, {
            headers: {
                'Content-Type': 'multipart/form-data' 
            }
        });
}