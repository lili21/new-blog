import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
// import hljs from 'highlight.js'
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import highlightStyle from "highlight.js/styles/night-owl.css";

import { getBlogDetail } from "~/github.server";
import { format } from "~/utils/date";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("html", html);

export const links = () => [
  {
    rel: "stylesheet",
    href: highlightStyle,
  },
];

export const loader = ({ params }) => {
  return getBlogDetail(params.number);
};

const d = 60 * 60 * 24 * 7;

export const headers = () => {
  return {
    "Cache-Control": `max-age=${d}`,
  };
};

export default function Detail() {
  const data = useLoaderData();
  // console.log(data);
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <article>
      <h1>{data.title}</h1>
      <p>
        {format(data.created_at)}{" "}
        <a href={data.html_url} target="_blank" rel="noreferrer">
          评论
        </a>
      </p>
      <main dangerouslySetInnerHTML={{ __html: data.html }} />
    </article>
  );
}
