import { getMyCookie } from "@/hooks/get-my-cookie";
import axios from "../axios";

// kayit olmak icin
export const signup = async (token: string, username: string) => {
  return await axios.post(
    "/auth/signup",
    { username: username },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

// logout server side
export const logoutServer = async () => {
  const query = await fetch(`${process.env.BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Cookie: `${getMyCookie()}`,
    },
  });
  const response = {
    status: query.status,
    statusText: query.statusText,
    headers: query.headers,
  };
  return response;
};

//#region CHECK VALID SESSION
// for server side | check for user valid session
export const getLoggedInUserServer = async () => {
  const query = await fetch(`${process.env.BASE_URL}/auth`, {
    headers: {
      Cookie: `${getMyCookie()}`,
    },
  });
  const response = await query.json();
  return response;
};

// for client side | check for user valid session
export const getLoggedInUser = async () => {
  return await axios.get("/auth");
};
//#endregion