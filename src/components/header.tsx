import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

export function Header() {
  return (
    <header className="w-full py-2 flex items-center justify-center bg-gray-900 text-white shadow-md">
      <div className="w-[90%] max-w-[720px] flex items-center justify-between py-2">
        <Link href="/">
          <Image src="/logo.svg" width={60} height={24} alt="Logo" />
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="primary">Login</Button>
          </Link>

          <Link href="/signup">
            <Button variant="primary">Signup</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
