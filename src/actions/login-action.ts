"use server";

import { env } from "@/lib/env";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid e-mail."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export async function loginAction(prevState: any, formData: FormData) {
  const data = schema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const res = await fetch(`${env.API_BASE_URL}/auth/login`, {
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json",
    },
    mode: "cors",
    method: "POST",
    cache: "no-store",
  });
  const json: { message: string } = await res.json();

  if (!res.ok) {
    return { message: json.message };
  }

  const authorization = res.headers.get("authorization");
  const responseCookies = res.headers.getSetCookie();
  const refreshTokenCookie = responseCookies.find((s) => s.startsWith("refresh-token="));
  const refreshToken = String(refreshTokenCookie).replace("refresh-token=", "");
  const accessToken = String(authorization).replace("Bearer ", "");

  setCookie("access-token", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 365,
    cookies,
  });
  setCookie("refresh-token", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 365,
    cookies,
  });

  redirect("/dashboard");
}
