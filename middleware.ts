import { auth } from "@/auth";

import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from "./routes";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  //eger kullanici giris yapmis ise true olur
  const isLoggedIn = !!req.auth;
  //createname veya error gibi sayfalar
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  //herkese acik olan sayfalar
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  console.log(nextUrl.pathname, isPublicRoute);
  /* kullanici createname veya error gibi bir sayfada durabilsin diye
   * aksi takdirde otomatik login sayfasına yonlenir */
  if (isAuthRoute) return NextResponse.next();

  /** eger hem public bir yerde hemde giriş yapmıs ise chat sayfasina yonlendiriyoruz */
  if (isPublicRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // giris yapmasina ragmen halen daha ilk ekranda ise otomatik chat sayfasına yonlendirme
  if (isAuthRoute) {
    if (isLoggedIn)
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    return NextResponse.next();
  }

  //eger giris yapmamis ve public bir route icinde degil ise anasayfaya yonlendirme
  if (!isLoggedIn && !isPublicRoute) {
    // return NextResponse.next();
    return Response.redirect(new URL("/", nextUrl));
  }

  //return null demek yerine alttaki kodu yazdik yeni surumde null hata veriyor
  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
