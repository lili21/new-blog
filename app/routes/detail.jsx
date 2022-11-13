import { Outlet } from "@remix-run/react";
import codeHideStyle from "@code-hike/mdx/dist/index.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: codeHideStyle,
  },
];

export default function Detail() {
  return <Outlet />;
}
