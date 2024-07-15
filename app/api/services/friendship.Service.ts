import axios from "../axios";

export const SendFriendRequest = async (email: string) => {
  const body = {
    email: email,
  };
  return await axios.post("/friendship", body);
};

export const ComingRequests = async () => {
  return await axios.get("/friendship/coming");
};

export const Friends = async () => {
    return await axios.get("/friendship/friends");
};

export const Blockeds = async () => {
    return await axios.get("/friendship/blockeds");
}

export const Block = async (friend_id:string) => {
    const body = {
        friend_id : friend_id
    }
    return await axios.put("/friendship/block",body)
}

export const Delete = async (friend_id: string) => {
    const body = {
        friend_id : friend_id
    }
    return await axios.delete("/friendship", {
        data: body
    })
}

export const Accept = async (friend_id: string) => {
    const body = {
        friend_id : friend_id
    }
    return await axios.put("/friendship/accept",body)
}

export const Reject = async (friend_id: string) => {
    const body = {
        friend_id : friend_id
    }
    return await axios.delete("/friendship/reject", {
        data: body
    })
}