"use client";
import CustomCard from "@/components/custom-card";
import {ScrollArea} from "@/components/ui/scroll-area";
import RequestItem from "./request-item/item";
import {useEffect, useState} from "react";
import {ComingRequests} from "@/app/api/services/request.Service";

export interface ComingRequestsModel {
    sender_mail: string;
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
        if (res.status == 200) {
            setRequests(res.data);
        } else {
            console.warn("ya arkadaşlık isteği yok yada hata var", res);
        }
    };

    return (
        <CustomCard
            className="bg-transparent rounded-md border border-[#5C6B81] flex-1 flex flex-col justify-between h-full">
            <span className="border-b border-[#5C6B81] text-white pl-4 py-2">Bekleyen</span>
            <ScrollArea className="mb-auto">
                <div className="mt-3 p-6 pt-0 relative">
                    {requests?.map((reqs) => (
                        <RequestItem requests={reqs} key={reqs.sender_mail}/>
                    ))}
                </div>
            </ScrollArea>
        </CustomCard>
    );
};

export default RequestsComponent;
