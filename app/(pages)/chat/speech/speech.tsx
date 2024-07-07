import { ScrollArea } from "@/components/ui/scroll-area";
import LeftBuble from "./bubbles/left-bubble";
import RightBuble from "./bubbles/right-bubble";

interface SpeechProps {
  user: any;
  messages: Array<{ fromUserId: string; text: string }>;
}

const Speech: React.FC<SpeechProps> = ({ user, messages }) => {
  return (
    <ScrollArea className="rounded-md">
    <div className=" mt-3 p-6 pt-0 relative flex-1 overflow-y-auto ">
      
        {/* buradaki scroll area ne ise yariyor silince hic bir sey degismiyor */}


      {messages.map((msg, index) => (
         <LeftBuble key={index} user={user} group={true} message={msg.text} />
      ))}

       
        <RightBuble
          user={user}
          group={true}
          message="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam explicabo cupiditate laudantium vitae quae, quidem beatae! Dolores eaque natus magni, sequi temporibus quisquam. Quo vitae voluptas atque magni obcaecati. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam explicabo cupiditate laudantium vitae quae, quidem beatae! Dolores eaque natus magni, sequi temporibus quisquam. Quo vitae voluptas atque magni obcaecati. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam explicabo cupiditate laudantium vitae quae, quidem beatae! Dolores eaque natus magni, sequi temporibus quisquam. Quo vitae voluptas atque magni obcaecati. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam explicabo cupiditate laudantium vitae quae, quidem beatae! Dolores eaque natus magni, sequi temporibus quisquam. Quo vitae voluptas atque magni obcaecati."
        />
        <LeftBuble
          user={user}
          group={true}
          message="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam explicabo cupiditate laudantium vitae quae, quidem beatae! Dolores eaque natus magni, sequi temporibus quisquam. Quo vitae voluptas atque magni obcaecati. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam explicabo cupiditate laudantium vitae quae, quidem beatae! Dolores eaque natus magni, sequi temporibus quisquam. Quo vitae voluptas atque magni obcaecati. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam explicabo cupiditate laudantium vitae quae, quidem beatae! Dolores eaque natus magni, sequi temporibus quisquam. Quo vitae voluptas atque magni obcaecati. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam explicabo cupiditate laudantium vitae quae, quidem beatae! Dolores eaque natus magni, sequi temporibus quisquam. Quo vitae voluptas atque magni obcaecati."
        />
      
    </div>
    </ScrollArea>
  );
};

export default Speech;
