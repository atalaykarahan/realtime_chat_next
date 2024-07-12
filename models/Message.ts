export interface Message {
    message_id: string;
    message_content: string;
    createdAt: Date;
    updatedAt: Date;
    message_sender_id: string;
    message_receiver_id: string;
    message_read_status: "unread" | "read";
  }