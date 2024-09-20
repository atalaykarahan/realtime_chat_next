import NextAuth, { DefaultSession } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { getLoggedInUserServer } from "@/app/api/services/auth.Service";
import { cookies } from "next/dist/client/components/headers";

/** bu metodun amaci user.role kismi boyle bir alan yok
 * hatasi veriyor bunun onune gecmek icin yazildi */
//#region EXTENDED USER
export type ExtendedUser = DefaultSession["user"] & {
  role: "standard" | "high";
  name: any;
  photo: any;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
//#endregion

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      /** eger kullanici giris yapmis ise token icinde sub olusur
       * ve session icindede user objesi olusur */
      if (token.sub && session.user) {
        //front-end tarafinda session icinde user_id degerine erismek icin
        session.user.name = token.username || session.user.name;
        session.user.photo = token.photo || session.user.photo;

        session.user.id = token.sub;
      }

      //token icinden gelen role yetkisini session'a iletiyoruz
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token }) {
      /** burda yazan yetkilendirme kodu kullanici her bir sayfa
       * degistirdiginde tetikleniyor surekli olarak guncel yetkisini cekiyor yani
       */

      //bu kisimda userin session icinde gozuken role yetkisini ekliyoruz
      if (!token.sub) return token;

      const existingUser = await getLoggedInUserServer();
      if (!existingUser.role) {
        cookies().delete(process.env.SESSION_COOKIE_NAME || "connect.sid");
        await signOut();
      }

      if (existingUser && existingUser.name && existingUser.photo) {
        token.name = existingUser.name;
        token.photo = existingUser.photo;

      }

      token.role = existingUser.role;
      return token;
    },
  },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        return {
          id: credentials.id as string,
          name: credentials.name as string,
          email: credentials.email as string,
          photo: credentials.photo as string,
          role: credentials.role as string
        };
      },
    }),
  ],
});

/** auth.js yapisindan dolayi user giris yapmis olsa bile session etrafinda user role bilgisi icin
 * tekrar api ye istek atıp user bilgilerini cekmemiz gerekiyor. bunu daha hafifletmek icin ise
 * redis icindeki session verisini cekiyoruz. Bu isin kotu yani user basarili bir sekilde giris yaptiktan sonra
 * 1 adet back-end istegi gidiyor veritabanina.
 */
