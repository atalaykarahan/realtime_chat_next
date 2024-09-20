"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

/** Bu metodun amaci eger signIn kodunu client side tarafindan cagirirsak
 * user middleware'a takiliyor yani giris yapmis olsa bile giris yapmamis gibi gozukuyor.
 * ancak bu metod sayesinde once giris yapip session olusup daha sonra middleware kontrol edildiginden
 * sorunsuzca chat sayfasina yonlendirilebiliyor.
 */
export const loginAction = async (
  id: string,
  name: string,
  email: string,
  photo: string
) => {
  await signIn("credentials", {
    id,
    name,
    email,
    photo,
    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });
};
