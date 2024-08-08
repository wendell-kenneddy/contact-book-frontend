import Image from "next/image";
import { Button } from "@/components/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-4">
      <h1 className="text-white text-xl font-medium">Easily manage your contacts</h1>

      <Image src="/chat-illustration.png" width={256} height={256} alt="Chat illustration" />

      <Link href="/dashboard">
        <Button variant="primary">Get Started</Button>
      </Link>
    </main>
  );
}
