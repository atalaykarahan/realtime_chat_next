"use client";

import { signup } from "@/app/api/services/auth.Service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";

const CreateName = () => {
  const nickInputRef = useRef<HTMLInputElement | null>(null);


  const searchParams = useSearchParams();
  const token = searchParams.get("token");


  const onClick = async () => {

    console.log(token);

    

    if (nickInputRef.current && nickInputRef.current.value && token) {
      const username = nickInputRef.current.value;

      const res = await signup(token, username);


      console.log(res);
    }

    console.log("tuşa basıldı");
  };
  return (
    <div className="bg-white">
      <h1>kardeşim nick name yaratman lazım hadi bakalım</h1>
      <Input
        ref={nickInputRef}
        className="text-black"
        type="text"
        placeholder="nick gir şuraya bakam"
      />
      <Button onClick={onClick} variant="destructive">
        nickname girdikten sonra bana bas
      </Button>
    </div>
  );
};

export default CreateName;
