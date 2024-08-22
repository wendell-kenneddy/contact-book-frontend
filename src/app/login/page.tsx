"use client";

import { loginAction } from "@/actions/login-action";
import { Button } from "@/components/button";
import { useActionState } from "react";

export default function Login() {
  const [state, action, pending] = useActionState(loginAction, { message: "" });

  return (
    <main className="flex flex-col items-center gap-4 text-white">
      <h1 className="text-xl font-medium">Log in</h1>

      {state && state.message && (
        <span className="w-full max-w-[350px] p-4 rounded-md bg-red-300 border-red-500 border-solid border-2 text-red-500">
          {state.message}
        </span>
      )}

      <form
        action={action}
        className="flex w-[90%] max-w-[350px] flex-col items-center gap-4 bg-zinc-900 py-2 px-4 rounded-lg shadow-lg"
      >
        <label htmlFor="email" className="sr-only">
          Your e-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="bg-transparent text-lg placeholder:zinc-400 flex-1 outline-none"
          required
        />

        <label htmlFor="password" className="sr-only">
          Your password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          min={8}
          className="bg-transparent text-lg placeholder:zinc-400 flex-1 outline-none"
          required
        />

        <Button size="full" disabled={pending}>
          {pending ? "Just a moment..." : "Confirm"}
        </Button>
      </form>
    </main>
  );
}
