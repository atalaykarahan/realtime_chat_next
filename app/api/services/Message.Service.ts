import axios from "../axios";

export const PostPrivateConversation = async (
  sender_id: string,
  receiver_id: string
) => {
  const body = {
    sender_id: sender_id,
    receiver_id: receiver_id,
  };
  return await axios.post("/message/conversation_private", body);
};
