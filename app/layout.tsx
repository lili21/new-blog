import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export const metadata = {
  title: `lili's blog`,
  description: "Thinking...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <header className="header">
            <Link href="/">
              <Image
                className="avatar"
                src="/avatar.jpeg"
                alt="avatar"
                width={45}
                height={45}
              />
            </Link>
            <Link href="/about">About Me</Link>
          </header>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
