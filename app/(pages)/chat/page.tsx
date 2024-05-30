"use client";
import CustomCard from "@/components/custom-card";
import { Card } from "@/components/ui/card";
import ChatNavbar from "./chat-navbar";
import DummyData from "@/components/ui/dummy";
import ChatMessage from "./chat-message";
import UserProfile from "./user-profile";
import { useEffect } from "react";
import router from "next/router";
const HomePage = () => {
  useEffect(() =>{
    console.log("atalay")
    // const { token } = router.query;
    // console.log(token)
    // if (token) {
    //   // localStorage.setItem('jwt', token);
    //   router.push('/dashboard');
    // }
  },[]);
  return (
    <div
      className="h-screen w-screen p-6 flex gap-5 relative"
      style={{ zIndex: "1" }}
    >
      <CustomCard className="hidden lg:block flex-none min-w-[260px]">
        <UserProfile />
        <div className="pt-3">
          <DummyData />
          <DummyData />
          <DummyData />
          <DummyData />
          <DummyData />
          <DummyData />
          <DummyData />
          <DummyData />
          <DummyData />
          <DummyData />
          <DummyData />
        </div>
      </CustomCard>
      <CustomCard className="flex-1 flex flex-col justify-between">
        <ChatNavbar />
        <div className="mt-auto">
          <ChatMessage />
        </div>
      </CustomCard>
    </div>
  );
};

export default HomePage;
