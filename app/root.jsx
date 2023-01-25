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
import ContentLoader from "react-content-loader";

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

const Loader = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={600}
      height={150}
      viewBox="0 0 600 150"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      {/* <circle cx="10" cy="20" r="8" /> */}
      <rect x="0" y="15" rx="5" ry="5" width="520" height="10" />
      {/* <circle cx="10" cy="50" r="8" /> */}
      <rect x="0" y="45" rx="5" ry="5" width="520" height="10" />
      {/* <circle cx="10" cy="80" r="8" /> */}
      <rect x="0" y="75" rx="5" ry="5" width="520" height="10" />
      {/* <circle cx="10" cy="110" r="8" /> */}
      <rect x="0" y="105" rx="5" ry="5" width="520" height="10" />
    </ContentLoader>
  );
};

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
            {navigate.state === "loading" ? <Loader /> : <Outlet />}
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
