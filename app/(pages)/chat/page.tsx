"use client";
import ConnectionStatus from "@/components/connection-status";
import CustomCard from "@/components/custom-card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import WriteMessage from "./write-message";
import ChatNavbar from "./chat-navbar";
import Sidebar from "./sidebar/sidebar";
import Speech from "./speech/speech";
import { PostPrivateConversation } from "@/app/api/services/Message.Service";
import { Message } from "@/models/Message";
import { Search } from "@/components/ui/search";
import { Disclosure } from "@headlessui/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import FriendsDummyData from "@/components/ui/friends-dummy";
import IncomeFriendDummyData from "@/components/ui/income-friend-dummy";
import { Button } from "@/components/ui/button";
import { AddFriendSchemas } from "@/schemas/addfriend";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormError from "@/components/form-error";

const ChatPage = () => {
  const user = useCurrentUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Bağlanıyor...");
  const [messages, setMessages] = useState<
    Array<{ sender_id: string; message: string }>
  >([]);
  const [oldMessages, setOldMessages] = useState<Message[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof AddFriendSchemas>>({
    resolver: zodResolver(AddFriendSchemas),
    defaultValues: {
      email: "",
    },
  });


  const onSubmit = async (values: z.infer<typeof AddFriendSchemas>) => {
    console.warn("values", values);
  };

  useEffect(() => {
    if (user && user.id)
      oldSpeech("115849378656249115607", "115943935417963963678");

    //#region SOCKET.IO

    const newSocket = io(process.env.SOCKET_IO_CONNECTION_URL as string, {
      transports: ["websocket", "polling"],
    });
  

    newSocket.on("connect", () => {
      setConnectionStatus("Bağlandı");
    });
    newSocket.on("disconnect", () => {
      setConnectionStatus("Bağlanamadı");
    });
    newSocket.on("connect_error", (error) => {
      setConnectionStatus(`Bağlantı Hatası: ${error.message}`);
    });

    //kullanici kendi id degerini dinlemeli
    if (user && user.id) {
      newSocket.on("chat", (data: { sender_id: string; message: string }) => {
        // console.log("mesaj dinleniyor")
        // console.log(data);
        setMessages((prevMessages: any) => [...prevMessages, data]);
      });

    }

    setSocket(newSocket);
    return () => {
      if (newSocket) newSocket.close();
    };
    //#endregion
  }, []);

  //#region OLD SPEECH
  const oldSpeech = async (sender_id: string, receiver_id: string) => {
    try {
      const res = await PostPrivateConversation(sender_id, receiver_id);

      if (res.status !== 200) {
        console.error("Mesaj ile ilgili bir sorun oluştu", res);
      }

      console.warn(res.data.data);

      setOldMessages(res.data.data);
    } catch (error) {
      console.error("hata oldu mesajlar gelemedi ", error);
    }
  };
  //#endregion

  return (
    <>
      <ConnectionStatus statusTitle={connectionStatus} />
      <div
        className="h-screen w-screen p-6 flex gap-5 relative"
        style={{ zIndex: "1" }}
      >
        {/* userın id degerini gormek icin */}
        {/* {user && (
        <div className="bg-white"> {user.id}</div>
        )} */}

        {/* {JSON.stringify(session)} */}
        <Sidebar user={user} />

        {/* friends settings */}
        <CustomCard className="flex-1 flex flex-col justify-between">
          {/* add friends */}
          <Disclosure as="nav" className="border-b border-[#5C6B81]">
            <div className="relative  px-5 flex h-20 items-center justify-between gap-5">
              <Form {...form}>
                <form
                  {...form}
                  className="w-full flex gap-5"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Search
                            {...field}
                            id="email"
                            placeholder="Kullanıcı adı giriniz..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormError className="mb-3" message={errorMessage} />

                  <Button type="submit" className="bg-[#4A32B0] border-none  hover:bg-[#4A32B0] hover:text-white text-white" variant={"outline"}>Gönder</Button>
                </form>
              </Form>
            </div>
          </Disclosure>

          <div className="grid grid-cols-2 flex-1 gap-4 p-5">
            <CustomCard className="  bg-transparent rounded-md border border-[#5C6B81] flex-1 flex flex-col justify-between">
              <ScrollArea className="flex-1 rounded-md overflow-auto">
                <div className="mt-3 p-6 pt-0 relative flex-1 overflow-y-auto">
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                  <FriendsDummyData />
                </div>
              </ScrollArea>
            </CustomCard>

            <CustomCard className="bg-transparent rounded-md border border-[#5C6B81]">
              <ScrollArea className="flex-1 rounded-md overflow-auto">
                <div className="mt-3 p-6 pt-0 relative flex-1 overflow-y-auto">
                  <IncomeFriendDummyData />
                  <IncomeFriendDummyData />
                  <IncomeFriendDummyData />
                  <IncomeFriendDummyData />
                  <IncomeFriendDummyData />
                  <IncomeFriendDummyData />
                </div>
              </ScrollArea>
            </CustomCard>
          </div>
        </CustomCard>

        {/* chat box */}
        {/* duruma göre hidden vericeksin atalay !!!!! */}
        {/* <CustomCard className="flex-1 flex flex-col justify-between"> */}
        {/* chatin ust kisminda konusulan kisinin resminin falan oldugu yer */}
        <CustomCard className="flex-1 hidden flex-col justify-between">
          <ChatNavbar />

          {/* New Chat Message */}
          <Speech user={user} messages={oldMessages} />
          {/* <Speech user={user} messages={messages} /> */}

          {/* write new message section */}
          <div className="mt-auto">
            <WriteMessage user={user} socket={socket} />
          </div>
        </CustomCard>
      </div>
    </>
  );
};

export default ChatPage;
