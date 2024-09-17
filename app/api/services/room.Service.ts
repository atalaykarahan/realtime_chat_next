import axios from "../axios";

export const createPrivateRoom = async (friendMail: string) => {
    const body = {
        mail: friendMail,
    }
    return await axios.post("/room", body);
};

export const checkAndGetPrivateRoom = async (friendMail: string) => {
    const body = {
        mail: friendMail,
    }
    return await axios.post("/room/check", body);
}

export const getChatListHistory = async () => {
    return await axios.get("/room/chatlist");
}