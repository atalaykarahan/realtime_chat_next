import axios from "../axios";

export const ComingRequests = async () => {
  return await axios.get("/request");
};

export const Accept = async (senderMail: string) => {
    const body = {
        friend_mail : senderMail
    }
    return await axios.patch("/request/accept",body)
}

export const Reject = async (senderMail: string) => {
    const body = {
        friend_mail : senderMail
    }
    return await axios.patch("/request/reject", body)
}

export const SendFriendRequest = async (email: string) => {
  const body = {
    receiver_mail: email,
  };
  return await axios.post("/request", body);
};
