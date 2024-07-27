import axios from "../axios";


export const SendFriendRequest = async (email: string) => {
  const body = {
    receiver_mail: email,
  };
  return await axios.post("/request", body);
};

// get all friends
export const Friends = async () => {
    return await axios.get("/friend");
};

// get all blocked users
export const Blockeds = async () => {
    return await axios.get("/friend/blockeds");
}

// block user
export const Block = async (friendMail:string) => {
    const body = {
        friend_mail : friendMail
    }
    return await axios.patch("/friend/block",body)
}

// remove friend
export const Remove = async (friendMail: string) => {
    const body = {
        friend_mail : friendMail
    }
    return await axios.delete("/friend", {
        data: body
    })
}

