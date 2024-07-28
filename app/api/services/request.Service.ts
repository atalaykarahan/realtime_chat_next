import axios from "../axios";
import {RequestStatus} from "@/models/Enum";

export const ComingRequests = async () => {
    return await axios.get("/request");
};

export const UpdateFriendshipRequest = async (senderMail: string, status: RequestStatus) => {
    const body = {
        sender_mail: senderMail,
        status: status,
    }
    return await axios.patch("/request", body)
}

export const SendFriendRequest = async (email: string) => {
    const body = {
        receiver_mail: email,
    };
    return await axios.post("/request", body);
};
