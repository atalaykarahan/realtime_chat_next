import axios from "../axios";


export const SendFriendRequest = async (email: string) => {
  const body = {
    mail: email,
  };
  return await axios.post("/request", body);
};

// get all friends
export const Friends = async () => {
    return await axios.get("/friend");
};

// get all blocked users
export const Blocked = async () => {
    return await axios.get("/friend/blocked");
}

// block user
export const Block = async (friendMail:string) => {
    const body = {
        mail : friendMail
    }
    return await axios.patch("/friend/block",body)
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

