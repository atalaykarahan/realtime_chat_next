export interface Message {
    message_id: string;
    message: string;
    sender_id:string;
    message_status: "unread" | "read";
    createdAt: Date;
    updatedAt: Date;
  }