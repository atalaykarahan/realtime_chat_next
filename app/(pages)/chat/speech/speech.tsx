import { ScrollArea } from "@/components/ui/scroll-area";
import LeftBuble from "./left-bubble";
import RightBuble from "./right-bubble";

interface SpeechProps {
  user: any;
}

const Speech: React.FC<SpeechProps> = ({ user }) => {
  return (
    <div className="mt-3 p-6 pt-0 relative flex-1 overflow-y-auto">
      <ScrollArea>
        <LeftBuble user={user} group={true} message="test deneme lorem ipsum" />
        <RightBuble
          user={user}
          group={true}
          message="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam explicabo cupiditate laudantium vitae quae, quidem beatae! Dolores eaque natus magni, sequi temporibus quisquam. Quo vitae voluptas atque magni obcaecati. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam explicabo cupiditate laudantium vitae quae, quidem beatae! Dolores eaque natus magni, sequi temporibus quisquam. Quo vitae voluptas atque magni obcaecati. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam explicabo cupiditate laudantium vitae quae, quidem beatae! Dolores eaque natus magni, sequi temporibus quisquam. Quo vitae voluptas atque magni obcaecati. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam explicabo cupiditate laudantium vitae quae, quidem beatae! Dolores eaque natus magni, sequi temporibus quisquam. Quo vitae voluptas atque magni obcaecati."
        />
        <LeftBuble
          user={user}
          group={true}
          message="bu kadar uzun mesaj mı yazılır aw"
        />
        <LeftBuble
          user={user}
          group={true}
          message="Kısa kısa yaz benim gibi."
        />
        <LeftBuble
          user={user}
          group={true}
          message="ve noktalama işaretlerine uy amk"
        />
        <RightBuble user={user} group={true} message="Tabi Efendim." />
      </ScrollArea>
    </div>
  );
};

export default Speech;
