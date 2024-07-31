import {ScrollArea} from "@/components/ui/scroll-area";
import LeftBubble from "./bubbles/left-bubble";
import RightBubble from "./bubbles/right-bubble";
import {Message} from "@/models/Message";
import {useEffect, useRef, useState} from "react";

interface SpeechProps {
    user: any;
    messages: Message[];
}

const Speech: React.FC<SpeechProps> = ({user, messages}) => {
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    useEffect(() => {
        // Mesajlar güncellendiğinde sayfanın en altına kaydır
        if (isInitialLoad) {
            // İlk yüklemede en alt kısma git
            endOfMessagesRef.current?.scrollIntoView({ behavior: 'auto' });
            setIsInitialLoad(false);
        }
        else {
            // Mesajlar güncellendiğinde pürüzsüz kaydırma
            endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
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
