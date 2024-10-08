import CustomCard from "@/components/custom-card";
import {Disclosure} from "@headlessui/react";
import {RxCross1} from "react-icons/rx";
import React, {useEffect, useState} from "react";
import {CiFileOn} from "react-icons/ci";
import {Input} from "@/components/ui/input";
import {BiSolidSend} from "react-icons/bi";
import {AppDispatch, useAppSelector} from "@/app/redux/store";
import {cn, generateUUID} from "@/lib/utils";
import {useDispatch} from "react-redux";
import {closeFileBox} from "@/app/redux/slices/file-boxSlice";
import {MessageItemSliceModel} from "@/app/redux/slices/message-boxSlice";
import {Socket} from "socket.io-client";

import axios from "@/app/api/axios";
import {uploadTestFunc} from "@/app/api/services/file.Service";

interface FileBoxProps {
    user: any;
    socket: Socket | null;
    room_id: string;
    formData: FormData | null;
}

const FileBoxComponent: React.FC<FileBoxProps> = ({user, socket, room_id, formData}) => {
    const fileBoxValue = useAppSelector((state) => state.fileBoxReducer.value);
    const dispatch = useDispatch<AppDispatch>();
    const [visible, setVisible] = useState(false);
    const [newMessage, setNewMessage] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    useEffect(() => {
        if (fileBoxValue.fileBoxStatus) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [fileBoxValue.fileBoxStatus]);


    const sizeText = () => {
        if (fileBoxValue.size < 1024) {
            return (fileBoxValue.size + " B");
        } else if (fileBoxValue.size > 1024 && fileBoxValue.size < 1048576) {
            return (fileBoxValue.size / 1024).toFixed() + " kB";
        } else if (fileBoxValue.size > 1048576 && fileBoxValue.size < (1024 * 1024 * 1024)) {
            return (fileBoxValue.size / (1024 * 1024)).toFixed(1) + " mB";
        } else {
            return (fileBoxValue.size / (1024 * 1024 * 1024)).toFixed(2) + " GB";
        }
    }

    const typeHandler = () => {
        switch (fileBoxValue.type) {
            case "image":
                return (<p>bu bir resim</p>)
            case "video/quicktime":
                return (<p>bu bir video</p>)
            default:
                return (<div>No preview available</div>)
        }
    }

    const sendFile = async () => {
        if (formData) {
            await uploadFileTestLav(formData.get('file') as File);
        }
        setNewMessage(null);
    };


    const uploadFileTestLav = async (file: File) => {

        const fileSize = file.size;
        const partCount = 6; // Her zaman 6 parça
        const chunkSize = Math.ceil(fileSize / partCount);

        const response = await axios.post('/file/uploadinit', {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
        });

        // const response = await uploadTestFunc();

        const {uploadId, presignedUrls} = response.data;


        console.log('atalay: ', uploadId, 'karahan: ', presignedUrls);

        //buraya kadar 6 adet link geliyor partlar icin


        const uploadPromises = presignedUrls.map(async (urlObj: any, index: number) => {
            const start = index * chunkSize;
            const end = Math.min(start + chunkSize, fileSize);
            const chunk = file.slice(start, end);

            await axios.put(urlObj.url, chunk, {
                headers: {
                    'Content-Type': file.type,
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        ((index + 1) / partCount) * 100
                    );
                    setUploadProgress(progress);
                },
            });
        });

        await Promise.all(uploadPromises);

        // Multipart upload'u tamamla
        await axios.post('/file/complete', {
            fileName: file.name,
            uploadId,
        });


    }


    const onClose = () => {
        setUploadProgress(0);
        dispatch(closeFileBox())
    }

    return (
        <CustomCard
            className={cn("flex-1 flex-col justify-between  absolute w-full  bg-[#130b31]  flex h-[calc(100%-81px)] transition-all duration-500 ease-in-out transform", visible ? "opacity-100 top-[81px] z-10" : "opacity-0 top-[-300px] z-[-1]")}>
            <Disclosure as="nav" className="">
                <div className="relative px-5 flex h-20 items-center justify-between">
                    <div className="flex items-center" onClick={onClose}>
                        <RxCross1 className="text-[#9f90d7] text-2xl"/>
                    </div>
                    <span className="text-sm  text-white font-medium">{fileBoxValue.name}</span>
                    <div></div>
                </div>
            </Disclosure>
            <div className="text-[#9f90d7] flex flex-col items-center my-auto">

                {uploadProgress > 0 ? (
                    <div>
                        <progress value={uploadProgress} max="100"/>
                        <span>{uploadProgress}%</span>
                    </div>
                ) : (
                    <span data-icon="preview-generic" className="">
                        <CiFileOn className="text-[10rem]"/>
                    </span>
                )}


                {typeHandler()}
                <div>{sizeText()}</div>
            </div>
            <div className="">
                <Disclosure as="nav" className="border-t border-[#5C6B81]">
                    <div>
                        <div className="relative px-5 flex h-20 gap-5 items-center">
                            <div className="w-full">
                                <Input
                                    type="text"
                                    placeholder="Açıklama ekle..."
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' ? sendFile() : null}
                                />
                            </div>
                            <div onClick={sendFile}>
                                <BiSolidSend className="text-[#9f90d7] text-[2rem]"/>
                            </div>
                        </div>
                    </div>
                </Disclosure>
            </div>
        </CustomCard>
    )
}
export default FileBoxComponent;