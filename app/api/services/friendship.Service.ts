import axios from "../axios";


export const SendFriendRequest = async (email: string) => {
  const body = {
    receiver_mail: email,
  };
  return await axios.post("/request", body);
};


export const Friends = async () => {
    return await axios.get("/friend");
};

export const Blockeds = async () => {
    return await axios.get("/friend/blockeds");
}

export const Block = async (friendMail:string) => {
    const body = {
        friend_mail : friendMail
    }
    return await axios.put("/friend/block",body)
}

export const Delete = async (friendMail: string) => {
    const body = {
        friend_mail : friendMail
    }
    return await axios.delete("/friend", {
        data: body
    })
}

