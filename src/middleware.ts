import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const next = NextResponse.next();
  const accessToken = getCookie("access-token", { req, res: next });
  const refreshToken = getCookie("refresh-token", { req, res: next });

  if (!accessToken || !refreshToken) return Response.redirect(new URL("/login", req.url));

  const res = await fetch(`${String(process.env.API_BASE_URL)}/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json, text/plain",
    },
    mode: "cors",
    credentials: "include",
    cache: "no-store",
  });

  if (res.status == 401) return Response.redirect(new URL("/login", req.url));

  return next;
}

export const config = {
  matcher: "/dashboard/:path",
};
