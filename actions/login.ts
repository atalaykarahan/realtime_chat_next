"use server";

import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

/** Bu metodun amaci eger signIn kodunu client side tarafindan cagirirsak
 * user middleware'a takiliyor yani giris yapmis olsa bile giris yapmamis gibi gozukuyor.
 * ancak bu metod sayesinde once giris yapip session olusup daha sonra middleware kontrol edildiginden
 * sorunsuzca chat sayfasina yonlendirilebiliyor.
 */
export const loginAction = async (
  id: string,
  name: string,
  email: string,
  image: string
) => {
  await signIn("credentials", {
    id,
    name,
    email,
    image,
    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });
};
