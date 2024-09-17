import axios from "../axios";

// export const PostPrivateConversation = async (
//     sender_id: string,
//     receiver_id: string
// ) => {
//     const body = {
//         message_sender_id: sender_id,
//         message_receiver_id: receiver_id,
//     };
//     return await axios.post("/message/conversation/private", body);
// };

// export const GetConversation = async () => {
//   return await axios.get("/message/conversation");
// };

export const getChatHistoryByRoomId = async (room_id: string) => {
    const body = {
        room_id: room_id
    }
    return await axios.post("/message/history", body);
}


