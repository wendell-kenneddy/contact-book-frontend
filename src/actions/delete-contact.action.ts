"use server";

import { env } from "@/lib/env";
import { serverFetch } from "@/lib/server-fetch";

export async function deleteContactAction(prevState: any, formData: FormData) {
  try {
    const id = formData.get("contact-id");

    const { json } = await serverFetch<{ message: string }>(`${env.API_BASE_URL}/contacts/${id}`, {
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      mode: "cors",
    });

    return { message: json.message };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong." };
  }
}
