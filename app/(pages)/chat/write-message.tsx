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
}

const WriteMessage: React.FC<WriteMessageProps> = ({user, socket, room_id}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (newMessage.trim() && user.id) {
            sendMessage(room_id, newMessage);
            setNewMessage("");
        }
    };

    const sendMessage = (room_id: string, message: string) => {
        if (socket && user) {
            socket.emit("sendMessage", {
                room_id,
                message,
            });
        }
    };

    // for press ENTER then send a message
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const onDrop = (files: any) => {
        console.log(files);
        //5 gb sinir byte cinsinden
        dispatch(openFileBox({fileBoxStatus: true}))
        if (files[0].size > 5368709120) {

            console.log("bu 5gb boyutundan büyük bir dosya");
        }
        let formData = new FormData();

        const config = {
            header: {'Content-Type': 'multipart/form-data'},
        }

        formData.append("files", files[0]);


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
                            onKeyDown={handleKeyDown}
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
                    <div onClick={handleSendMessage}>
                        <BiSolidSend className="text-[#4A32B0] text-[2rem]"/>
                    </div>
                </div>
            </div>
        </Disclosure>
    );
};

export default WriteMessage;
