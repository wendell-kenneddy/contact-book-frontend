import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "./lib/env";

export async function middleware(req: NextRequest) {
  const next = NextResponse.next();
  const accessToken = getCookie("access-token", { req, res: next });
  const refreshToken = getCookie("refresh-token", { req, res: next });

  if (!accessToken || !refreshToken) return Response.redirect(new URL("/login", req.url));

  const res = await fetch(`${env.API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: `refresh-token=${refreshToken}`,
      Accept: "application/json",
    },
    credentials: "include",
    mode: "cors",
    cache: "no-store",
  });

  if (res.status == 403) {
    deleteCookie("access-token", {
      path: "/",
      req,
      res: next,
    });
    deleteCookie("refresh-token", {
      path: "/",
      req,
      res: next,
    });
    return Response.redirect(new URL("/login", req.url));
  }

  const { message }: { message?: string } = await res.json();

  if (message && message == "New Access and Refresh Tokens provided.") {
    const authorizationHeader = res.headers.get("authorization");
    const responseCookies = res.headers.getSetCookie();
    const refreshTokenCookie = responseCookies.find((s) => s.startsWith("refresh-token="));
    const newRefreshToken = String(refreshTokenCookie).replace("refresh-token=", "");
    const newAccessToken = String(authorizationHeader).replace("Bearer ", "");

    setCookie("access-token", newAccessToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 365,
      req,
      res: next,
    });
    setCookie("refresh-token", newRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 365,
      req,
      res: next,
    });
  }

  return next;
}

export const config = {
  matcher: "/dashboard/:path",
};
