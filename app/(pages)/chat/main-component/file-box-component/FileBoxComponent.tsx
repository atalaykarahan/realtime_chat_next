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
    return (
        <CustomCard
            className={cn("flex-1 flex-col justify-between  absolute w-full z-10 bg-[#130b31]  flex h-[calc(100%-81px)] transition-all duration-500 ease-in-out transform", visible ? "opacity-100 top-[81px]" : "opacity-0 top-[-200px]")}>
            <Disclosure as="nav" className="">
                <div className="relative px-5 flex h-20 items-center justify-between">
                    <div className="flex items-center" onClick={() => dispatch(closeFileBox())}>
                        <RxCross1 className="text-[#9f90d7] text-2xl"/>
                    </div>
                    <span className="text-sm  text-white font-medium">
                                home_library
                        </span>
                    <div>
                    </div>
                </div>
            </Disclosure>
            <div className="text-[#9f90d7] flex flex-col items-center my-auto">
                                <span data-icon="preview-generic" className="">
                                    <CiFileOn className="text-[10rem]"/>
                                </span>
                <div>No preview available</div>
                <div>55 kB</div>
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