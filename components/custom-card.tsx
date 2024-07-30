import { cn } from "@/lib/utils";
import { Card } from "./ui/card";

interface CustomCardProps {
  className?: string;
  children?: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({ className, children }) => {
  return (
    <Card
      className={cn("bg-[#1F2938]/40 transition", className)}
    >
      {children}
    </Card>
  );
};

export default CustomCard;
