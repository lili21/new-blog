import Link from "next/link";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

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
            <meta name="google-site-verification" content="101Rndwn3vRQVdfe0oKPxYP9s0Y7k8kzRyHvTnQECik" />
            <a href="https://github.com/lili21/new-blog" target="_blank">Github</a>
          </header>
          <main className="main">{children}</main>
        </div>
        <Analytics />
      </body>
    </html >
  );
}
