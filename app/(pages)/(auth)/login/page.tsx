"use client";

import { loginAction } from "@/actions/login";
import { getLoggedInUser } from "@/app/api/services/auth.Service";
import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res: any = await getLoggedInUser();

      if (res.error) console.log("burda hata döndür");

      //kullanici basarili bir sekilde giris yapmis demektir
      if (res) {
        loginAction(
          res.data.user_id,
          res.data.user_name,
          res.data.user_email,
          res.data.user_photo
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white">
      alper buraya güzel bir yükleme veya dönen circle bul şöyle bir şey yazsın
      ekranda &apos;yönlendiriliyor&apos;
    </div>
  );
};

export default LoginPage;
