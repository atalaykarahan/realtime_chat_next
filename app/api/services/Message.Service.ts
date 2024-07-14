import axios from "../axios";

export const PostPrivateConversation = async (
  sender_id: string,
  receiver_id: string
) => {
  const body = {
    message_sender_id: sender_id,
    message_receiver_id: receiver_id,
  };
  return await axios.post("/message/conversation/private", body);
};
