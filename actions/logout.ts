"use server";

import { logoutServer } from "@/app/api/services/auth.Service";
import { cookies } from "next/dist/client/components/headers";
import { signOut } from "@/auth";

/** bu metodun amacı once back-end tarafindan
 * sonra front-end tarafindaki auth.js tarafindan guvenli cikis saglamak
 */
export const logoutAction = async () => {
  try {
    //server side logout istegi
    await logoutServer().then(async (res: any) => {
      if (res.status === 200) {
        /** normalde back-end cookie'yi siliyor ancak istek kodumuz server side
         * oldugundan cookie silme islemini manuel yapmak zorundayiz
         */
        cookies().delete(process.env.SESSION_COOKIE_NAME || "connect.sid");
        //istek basarili ise auth.js tarafindan cikis islemlerini baslatiyoruz
        await signOut();
      }
    });
  } catch (error) {
    throw error;
  }
};
