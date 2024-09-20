import axios from "../axios";

// get all friends
export const Friends = async () => {
    return await axios.get("/friend");
};

// get all blocked users
export const Blocked = async () => {
    return await axios.get("/friend/blocked");
}

// block user
export const Block = async (friendMail: string) => {
    const body = {
        mail : friendMail
    }
    return await axios.patch("/friend/block", body)
}

// remove friend
export const Remove = async (friendMail: string) => {
    const body = {
        mail : friendMail
    }
    return await axios.delete("/friend", {
        data: body
    })
}
