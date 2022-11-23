import { Outlet } from "@remix-run/react";
import codeHideStyle from "@code-hike/mdx/dist/index.css";
import { useEffect } from "react";

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
  useEffect(() => {
    // fixme - StrictMode下会执行两次
    const s = document.createElement("script");
    s.src = "https://utteranc.es/client.js";
    s.setAttribute("repo", "lili21/blog-comments");
    s.setAttribute("theme", "github-light");
    s.setAttribute("crossorigin", "anonymous");
    s.setAttribute("issue-term", "pathname");
    document.body.appendChild(s);
  }, []);
  return <Outlet />;
}
