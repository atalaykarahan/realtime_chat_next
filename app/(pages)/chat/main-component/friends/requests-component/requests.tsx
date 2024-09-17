"use client";
import CustomCard from "@/components/custom-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import RequestItem from "./request-item/item";
import { useEffect, useState } from "react";
import { ComingRequests } from "@/app/api/services/request.Service"; 
import io, { Socket } from "socket.io-client";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";

export interface ComingRequestsModel {
  sender_mail: string;
  user_name: string;
  user_photo: string;
}

interface AddFriendProps {
  socket: Socket | null;
}

const RequestsComponent: React.FC<AddFriendProps> = ({ socket, }) => {
  const [requests, setRequests] = useState<ComingRequestsModel[]>([]);
  const user = useCurrentUser();

  useEffect(() => {
    fetchData();
    if (user && user?.email && socket) {
      console.log("userid",user.email)
      
      socket.on(user.email, (res: any) => {
        if (res.notification_type === "friend_request") {
            console.log("arkadaslik geldi", res.data);
            setRequests((prevRequests) => {
              if (!Array.isArray(prevRequests)) {
                return [res.data];
              }
              return [...prevRequests, res.data];
            });
            toast(res.data.user_name + " arkadaslik istegi geldi");
        }
       
    
    });
    }
  }, [socket]);

  const fetchData = async () => {
    const res = await ComingRequests();
    if (res.status == 200) {
      setRequests(res.data);
    } else {
      console.warn("ya arkadaşlık isteği yok yada hata var", res);
    }
  };

  return (
    <CustomCard className="bg-transparent rounded-md border border-[#5C6B81] flex-1 flex flex-col justify-between">
      <span className="border-b border-[#5C6B81] text-white pl-4 py-2">
        Gelen İstekler
      </span>
      <ScrollArea className="h-full rounded-md">
        <div className="mt-3 p-6 pt-0 relative">
          {requests?.map((reqs) => (
            <RequestItem requests={reqs} key={reqs.sender_mail} />
          ))}
        </div>
      </ScrollArea>
    </CustomCard>
  );
};

export default RequestsComponent;
