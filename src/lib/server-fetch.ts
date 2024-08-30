import { getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function serverFetch<T>(url: string, options?: RequestInit) {
  const accessToken = getCookie("access-token", { cookies });
  const refreshToken = getCookie("refresh-token", { cookies });
  const fullOptions: RequestInit = {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
      Cookie: `refresh-token=${refreshToken}`,
    },
    credentials: "include",
  };

  let res = await fetch(url, fullOptions);
  const data: Record<string, any> & T = await res.json();

  if (data.message && data.message == "New Access and Refresh Tokens provided.") {
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
      cookies,
    });
    setCookie("refresh-token", newRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 365,
      cookies,
    });

    fullOptions.headers = {
      ...fullOptions.headers,
      Authorization: `Bearer ${newAccessToken}`,
      Cookie: `refresh-token=${newRefreshToken}`,
    };

    const newFetch = await fetch(url, fullOptions);
    const newData: T = await newFetch.json();
    return { res: newFetch, json: newData };
  }

  return { res, json: data };
}
