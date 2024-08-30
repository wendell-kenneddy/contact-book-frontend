"use server";

import { env } from "@/lib/env";
import { serverFetch } from "@/lib/server-fetch";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email"),
  phone: z.string(),
});

export async function createContactAction(prevState: any, formData: FormData) {
  try {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone_number: formData.get("phone"),
    };

    const { json } = await serverFetch<{ message: string }>(`${env.API_BASE_URL}/contacts`, {
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
    });

    return { message: json.message };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong." };
  }
}
