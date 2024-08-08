"use client";

import { Button } from "@/components/button";
import { FormEvent } from "react";

export default function Signup() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data);
    e.currentTarget.reset();
  }

  return (
    <main className="flex flex-col items-center gap-4 text-white">
      <h1 className="text-xl font-medium">Sign up</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 bg-zinc-900 py-2 px-4 rounded-lg shadow-lg"
      >
        <label htmlFor="name" className="sr-only">
          Your name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="bg-transparent text-lg placeholder:zinc-400 flex-1 outline-none"
        />

        <label htmlFor="email" className="sr-only">
          Your e-mail
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-transparent text-lg placeholder:zinc-400 flex-1 outline-none"
        />

        <label htmlFor="password" className="sr-only">
          Your password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          min={8}
          className="bg-transparent text-lg placeholder:zinc-400 flex-1 outline-none"
        />

        <Button size="full">Confirm</Button>
      </form>
    </main>
  );
}
