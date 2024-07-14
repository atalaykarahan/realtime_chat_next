import CustomCard from "@/components/custom-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import RequestItem from "./request-item/item";

const RequestsComponent = () => {
  return (
    <CustomCard className="bg-transparent rounded-md border border-[#5C6B81]">
      <ScrollArea className="flex-1 rounded-md overflow-auto">
        <div className="mt-3 p-6 pt-0 relative flex-1 overflow-y-auto">
          <RequestItem />
          <RequestItem />
          <RequestItem />
          <RequestItem />
          <RequestItem />
          <RequestItem />
          <RequestItem />
          <RequestItem />
          <RequestItem />
          <RequestItem />
        </div>
      </ScrollArea>
    </CustomCard>
  );
};

export default RequestsComponent;
