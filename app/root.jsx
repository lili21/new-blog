import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styleUrl from "~/styles/global.css";
import normalizeStyle from "~/styles/normalize.css";
import avatar from "~/images/avatar.jpeg";

export const links = () => [
  {
    rel: "stylesheet",
    href: normalizeStyle,
  },
  {
    rel: "stylesheet",
    href: styleUrl,
  },
];

export const meta = () => ({
  charset: "utf-8",
  title: "Blog",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div id="root">
          <header className="header">
            <Link to="/">
              <img className="avatar" src={avatar} alt="avatar" />
            </Link>
            <Link to="/about">About Me</Link>
          </header>
          <main className="main">
            <Outlet />
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
