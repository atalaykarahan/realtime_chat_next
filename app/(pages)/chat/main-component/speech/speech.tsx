import { ScrollArea } from "@/components/ui/scroll-area";
import LeftBubble from "./bubbles/left-bubble";
import RightBubble from "./bubbles/right-bubble";
import { Message } from "@/models/Message";
import { useEffect, useRef, useState } from "react";

interface SpeechProps {
  user: any;
  messages: Message[];
  room_id: string;
}

const Speech: React.FC<SpeechProps> = ({ user, messages, room_id }) => {
  const [oldRoomId, setOldRoomId] = useState<string>("");
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const [messageList, setMessageList] = useState<Message[]>(messages);

  useEffect(() => {
    setMessageList(messages);
  }, [messages]);

  useEffect(() => {
    if (room_id !== "" && room_id !== oldRoomId && messageList.length) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "auto" });
      setOldRoomId(room_id);
    } else if (messageList.length) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);

  const handleDelete = (messageId: string) => {
    setMessageList((prevMessages) =>
      prevMessages.map((msg) =>
        msg.message_id === messageId
          ? { ...msg, message: "", deletedAt: new Date().toISOString() } 
          : msg
      )
    );
  };

  const handleUpdateMessage = (id: string, newMessage: string) => {
    setMessageList((prevMessages) =>
      prevMessages.map((msg) =>
        msg.message_id === id ? { ...msg, message: newMessage, updatedAt:  new Date().toISOString() } : msg
      )
    );
  };

  return (
    <ScrollArea className="rounded-md">
      <div className="mt-3 p-6 pt-0 relative flex-1 overflow-y-auto">
        {messageList.map((msg) =>
          msg.sender_id === user.id ? (
            <RightBubble
              time={msg.createdAt}
              key={msg.message_id}
              group={false}
              user={user}
              msg={msg}
              onDelete={handleDelete}
              onUpdate={handleUpdateMessage}
            />
          ) : (
            <LeftBubble
              time={msg.createdAt}
              key={msg.message_id}
              group={false}
              user={user}
              msg={msg}
              onDelete={handleDelete}
            />
          )
        )}
        <div ref={endOfMessagesRef} />
      </div>
    </ScrollArea>
  );
};

export default Speech;
