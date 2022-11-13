import { Outlet } from "@remix-run/react";
import codeHideStyle from "@code-hike/mdx/dist/index.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: codeHideStyle,
  },
];

const d = 60 * 60 * 24;

export const headers = () => {
  return {
    "Cache-Control": `max-age=${d}`,
  };
};

export default function Detail() {
  return <Outlet />;
}
