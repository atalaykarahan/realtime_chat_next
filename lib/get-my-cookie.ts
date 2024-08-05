import { cookies } from "next/dist/client/components/headers";

/* Cookies kismindan back-end tarafindan
 * bize getirilen cookiyi alır */
export const getMyCookie = () => {
  const cStore = cookies();
  const cookees = cStore.get("connect.sid");
  if (!cookees) return null;
  const readable = cookees?.name + "=" + cookees?.value;
  return readable;
};
