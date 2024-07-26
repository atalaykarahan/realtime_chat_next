"use client";

import CustomCard from "@/components/custom-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import FriendItem from "./blocked-item/item";
import { useEffect, useState } from "react";
import { Blockeds } from "@/app/api/services/friendship.Service";

export interface BlockedsModel {
  blocked_mail: string;
  user_name: string;
  user_photo: string;
}


const BlockedsComponent = () => {

  const [friends, setFriends] = useState<BlockedsModel[]>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await Blockeds();

    if (res.status !== 200) {
      console.error(
        "geçmiş mesajları getirmekle ilgili bir sorun oluştu ",
        res
      );
    }

    setFriends(res.data);
  };

  return (
    <CustomCard className="bg-transparent rounded-md border border-[#5C6B81] flex-1 flex flex-col justify-between h-full">
      <ScrollArea className="rounded-md">
        <div className="mt-3 p-6 pt-0 relative">
          
        {friends?.map((reqs) => (
            <FriendItem blocked={reqs} key={reqs.blocked_mail} />
          ))}
          {/* <FriendItem />
          <FriendItem />
          <FriendItem />
          <FriendItem /> */}

        </div>
      </ScrollArea>
    </CustomCard>
  );
};

export default BlockedsComponent;
