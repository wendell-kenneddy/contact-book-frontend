import { z } from "zod";

const schema = z.object({
  API_BASE_URL: z.string(),
});

export const env = schema.parse(process.env);
