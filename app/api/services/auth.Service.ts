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

export const logout = () => {
  return axios.post("/auth/logout");
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
