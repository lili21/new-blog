import { Outlet } from "@remix-run/react";
import codeHideStyle from "@code-hike/mdx/dist/index.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: codeHideStyle,
  },
];

export default function Detail() {
  //const utterancLoaded = useRef(false);
  //useEffect(() => {
  //  console.log(utterancLoaded.current, "useRef");
  //  if (utterancLoaded.current) {
  //    return;
  //  }
  //  // fixme - StrictMode下会执行两次
  //  const s = document.createElement("script");
  //  s.src = "https://utteranc.es/client.js";
  //  s.setAttribute("repo", "lili21/blog-comments");
  //  s.setAttribute("theme", "github-light");
  //  s.setAttribute("crossorigin", "anonymous");
  //  s.setAttribute("issue-term", "pathname");
  //  document.body.appendChild(s);
  //  utterancLoaded.current = true;
  //}, []);
  return <Outlet />;
}
