import {ScrollArea} from "@/components/ui/scroll-area";
import LeftBubble from "./bubbles/left-bubble";
import RightBubble from "./bubbles/right-bubble";
import {Message} from "@/models/Message";
import {useEffect, useRef, useState} from "react";

interface SpeechProps {
    user: any;
    messages: Message[];
    room_id: string;
}

const Speech: React.FC<SpeechProps> = ({user, messages, room_id}) => {
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
    const [oldRoomId, setOldRoomId] = useState<string>("");

    useEffect(() => {
        // Mesajlar güncellendiğinde sayfanın en altına kaydır
        if (room_id !== "" && room_id !== oldRoomId && messages.length) {
            endOfMessagesRef.current?.scrollIntoView({behavior: 'auto'});
            setOldRoomId(room_id);
        } else if (messages.length) {
            endOfMessagesRef.current?.scrollIntoView({behavior: 'smooth'});
        }

    }, [messages]);


    return (
        <ScrollArea className="rounded-md">
            <div className="mt-3 p-6 pt-0 relative flex-1 overflow-y-auto">
                {messages.map((msg) =>
                    msg.sender_id == user.id ? (
                        <RightBubble
                            time={msg.createdAt}
                            key={msg.message_id}
                            group={false}
                            user={user}
                            message={msg.message}
                        />
                    ) : (
                        <LeftBubble
                            time={msg.createdAt}
                            key={msg.message_id}
                            group={false}
                            user={user}
                            message={msg.message}
                        />
                    )
                )}
                <div ref={endOfMessagesRef}/>
            </div>
        </ScrollArea>
    );
};

export default Speech;
