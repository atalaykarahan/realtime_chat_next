import CustomCard from "@/components/custom-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import RequestItem from "./request-item/item";
import { useEffect, useState } from "react";
import { ComingRequests } from "@/app/api/services/friendship.Service";

export interface ComingRequestsModel {
  sender_id: string;
  user_name: string;
  user_photo: string;
}

const RequestsComponent = () => {

  const [requests, setRequests] = useState<ComingRequestsModel[]>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await ComingRequests();

    if (res.status !== 200) {
      console.error(
        "geçmiş mesajları getirmekle ilgili bir sorun oluştu ",
        res
      );
    }

    setRequests(res.data);
  };

  return (
    <CustomCard className="bg-transparent rounded-md border border-[#5C6B81]">
      <ScrollArea className="flex-1 rounded-md overflow-auto">
        <div className="mt-3 p-6 pt-0 relative flex-1 overflow-y-auto">
        {requests?.map((reqs) => (
            <RequestItem requests={reqs} key={reqs.sender_id} />
          ))}
          {/* <RequestItem />
          <RequestItem />
          <RequestItem />
          <RequestItem />
          <RequestItem />
          <RequestItem />
          <RequestItem />
          <RequestItem />
          <RequestItem />
          <RequestItem /> */}
        </div>
      </ScrollArea>
    </CustomCard>
  );
};

export default RequestsComponent;
