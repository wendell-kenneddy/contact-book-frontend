import { env } from "@/lib/env";
import { serverFetch } from "@/lib/server-fetch";
import { deleteCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const pageIndex = req.nextUrl.searchParams.get("pageIndex");
  const { res, json } = await serverFetch(`${env.API_BASE_URL}/contacts?pageIndex=${pageIndex}`, {
    cache: "no-store",
  });

  if (res.status == 401) {
    deleteCookie("access-token", { cookies, path: "/" });
    deleteCookie("refresh-token", { cookies, path: "/" });
    return redirect("/login");
  }

  return new Response(JSON.stringify(json), {
    status: 200,
  });
}
