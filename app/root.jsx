import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import { MetronomeLinks } from "@metronome-sh/react";
import { BulletList } from "react-content-loader";

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
  const navigate = useNavigation();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <MetronomeLinks />
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
            {navigate.state === "loading" ? <BulletList /> : <Outlet />}
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
