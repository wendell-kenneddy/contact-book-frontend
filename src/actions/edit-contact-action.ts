"use server";

import { env } from "@/lib/env";
import { serverFetch } from "@/lib/server-fetch";

export async function editContactAction(prevState: any, formData: FormData) {
  try {
    const id = formData.get("contact-id");
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone_number: formData.get("phone"),
    };

    const { json } = await serverFetch<{ message: string }>(`${env.API_BASE_URL}/contacts/${id}`, {
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(data),
    });

    return { message: json.message };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong." };
  }
}
