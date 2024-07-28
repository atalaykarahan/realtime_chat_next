"use client";

import CustomCard from "@/components/custom-card";
import {ScrollArea} from "@/components/ui/scroll-area";
import BlockedItem from "./blocked-item/item";
import {useEffect, useState} from "react";
import {Blocked} from "@/app/api/services/friendship.Service";
import {toast} from "sonner";

export interface BlockedModel {
    blocked_mail: string;
    user_name: string;
    user_photo: string;
}

const BlockedComponent = () => {

    const [friends, setFriends] = useState<BlockedModel[]>();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await Blocked();

        if (res.status !== 200) {
            toast('BLOKLANAN KİŞİLERİ GETİRİRKEN BİLİNMEYEN BİR HATA MEYDANA GELDİ')
            console.error(res)
        }

        setFriends(res.data);
    };

    return (
        <CustomCard
            className="bg-transparent rounded-md border border-[#5C6B81] flex-1 flex flex-col justify-between h-full">
            <ScrollArea className="rounded-md">
                <div className="mt-3 p-6 pt-0 relative">

                    {friends?.map((reqs) => (
                        <BlockedItem blocked={reqs} key={reqs.blocked_mail}/>
                    ))}
                </div>
            </ScrollArea>
        </CustomCard>
    );
};

export default BlockedComponent;
