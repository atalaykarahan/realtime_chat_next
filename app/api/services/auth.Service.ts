import axios from "../axios";
import { cookies } from "next/dist/client/components/headers";

/* Cookies kismindan back-end tarafindan
 * bize getirilen cookiyi alır */
export const getMyCookie = () => {
  try {
    const cStore = cookies();
    const cookees = cStore.get("connect.sid");
    const readable = cookees?.name + "=" + cookees?.value;
    return readable;
  } catch (error) {
    return { error: "Cookie bulunamadı!" };
  }
};

export const signup = async (token: string, username: string) => {
  return await axios.post(
    `/auth/signup`,
    { username: username },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const getLoggedInUserServer = async () => {
  const query = await fetch(`${process.env.BASE_URL}/auth`, {
    headers: {
      Cookie: `${getMyCookie()}`,
    },
  });
  const response = await query.json();
  return response;
};

