import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Header } from "../components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Contact Book",
  description: "Manage your contacts easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-950`}>
        <Header />

        <div className="mt-4 mx-auto w-[90%] max-w-[720px]">{children}</div>
      </body>
    </html>
  );
}
