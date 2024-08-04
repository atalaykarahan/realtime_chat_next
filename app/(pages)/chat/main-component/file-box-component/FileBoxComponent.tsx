import CustomCard from "@/components/custom-card";
import {Disclosure} from "@headlessui/react";
import {RxCross1} from "react-icons/rx";
import React, {useEffect, useState} from "react";
import {CiFileOn} from "react-icons/ci";
import {Input} from "@/components/ui/input";
import {BiSolidSend} from "react-icons/bi";
import {AppDispatch, useAppSelector} from "@/app/redux/store";
import {cn} from "@/lib/utils";
import {useDispatch} from "react-redux";
import {closeFileBox} from "@/app/redux/slices/file-boxSlice";

const FileBoxComponent = () => {
    const fileBoxValue = useAppSelector((state) => state.fileBoxReducer.value);
    const dispatch = useDispatch<AppDispatch>();
    const [visible, setVisible] = useState(false);
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

    return (
        <CustomCard
            className={cn("flex-1 flex-col justify-between  absolute w-full  bg-[#130b31]  flex h-[calc(100%-81px)] transition-all duration-500 ease-in-out transform", visible ? "opacity-100 top-[81px] z-10" : "opacity-0 top-[-300px] z-[-1]")}>
            <Disclosure as="nav" className="">
                <div className="relative px-5 flex h-20 items-center justify-between">
                    <div className="flex items-center" onClick={() => dispatch(closeFileBox())}>
                        <RxCross1 className="text-[#9f90d7] text-2xl"/>
                    </div>
                    <span className="text-sm  text-white font-medium">{fileBoxValue.name}</span>
                    <div></div>
                </div>
            </Disclosure>
            <div className="text-[#9f90d7] flex flex-col items-center my-auto">
                                <span data-icon="preview-generic" className="">
                                    <CiFileOn className="text-[10rem]"/>
                                </span>
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
                                />
                            </div>
                            <div>
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