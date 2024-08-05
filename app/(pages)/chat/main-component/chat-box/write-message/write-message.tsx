"use client";
import {Disclosure} from "@headlessui/react";
import {LuPlusCircle} from "react-icons/lu";
import {Input} from "@/components/ui/input";
import {Socket} from "socket.io-client";
import React, {useState} from "react";
import Dropzone from "react-dropzone";
import {FiUpload} from "react-icons/fi";
import {BiSolidSend} from "react-icons/bi";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/redux/store";
import {openFileBox} from "@/app/redux/slices/file-boxSlice";

interface WriteMessageProps {
    user: any;
    socket: Socket | null;
    room_id: string;
    onFileChange: (formData: FormData) => void;
}

const WriteMessage: React.FC<WriteMessageProps> = ({user, socket, room_id, onFileChange}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        newMessage.trim();

        if (socket) {
            socket.emit("sendMessage", {
                room_id,
                message: newMessage,
            });
        }
        setNewMessage("");
    };

    const onDrop = (files: any) => {
        let formData = new FormData();
        formData.append("file", files[0]);
        onFileChange(formData);

        //redux slice doldurma.
        dispatch(openFileBox({
            fileBoxStatus: true,
            name: files[0].name,
            size: files[0].size,
            type: files[0].type,
        }))
    }

    return (
        <Disclosure as="nav" className="border-t border-[#5C6B81]">
            <div>
                <div className="relative px-5 flex h-20 gap-5 items-center">
                    <div>
                        <LuPlusCircle className="text-[#4A32B0] text-[2rem]"/>
                    </div>
                    <div className="w-full">
                        <Input
                            type="text"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
                        />
                    </div>
                    {/*DROP FILE*/}
                    <Dropzone onDrop={onDrop}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />

                                    <div>
                                        <FiUpload className="text-[#4A32B0] text-[2rem]"/>
                                    </div>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <div onClick={sendMessage}>
                        <BiSolidSend className="text-[#4A32B0] text-[2rem]"/>
                    </div>
                </div>
            </div>
        </Disclosure>
    );
};

export default WriteMessage;
