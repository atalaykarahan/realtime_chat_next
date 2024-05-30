import axios from "../axios";

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
