"use client";

import { loginAction } from "@/actions/login";
import { getLoggedInUser } from "@/app/api/services/Auth.Service";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Loading from "@/public/blocks-wave.svg";
import Image from "next/image";
import UnknownErrorCard from "@/components/unknown-error-card";

const LoginPage = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await getLoggedInUser();

        if (res.error) setError(true);

        //kullanici basarili bir sekilde giris yapmis demektir
        if (res) {
          loginAction(
            res.data.id,
            res.data.name,
            res.data.mail,
            res.data.photo
          );
        }
      } catch (error: any) {
        setError(true);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (error) return <UnknownErrorCard />;

  return (
    <div className="w-screen h-screen items-center flex justify-center backdrop-blur-sm ">
      <Image src="/loading.svg" alt="Loading" width={50} height={50} />
    </div>
  );
};

export default LoginPage;
