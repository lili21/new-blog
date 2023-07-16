"use client";
import { useMDXComponent } from "next-contentlayer/hooks";
import { format } from "date-fns";
import type { Post } from "contentlayer/generated";
import { useEffect, useRef } from "react";
import "@code-hike/mdx/dist/index.css";

const CodeSandbox = (props: { id: string }) => {
  return (
    <iframe
      src={`https://codesandbox.io/embed/${props.id}?fontsize=14&hidenavigation=1&theme=dark`}
      style={{
        width: "100%",
        height: "500px",
        border: 0,
        borderRadius: "4px",
        overflow: "hidden",
      }}
      title="react-common-mistake (forked)"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  );
};
export default function Detail({ post }: { post: Post }) {
  const MDXContent = useMDXComponent(post.body.code);
  useEffect(() => {
    const scriptEl = document.createElement('script');
    scriptEl.src = 'https://utteranc.es/client.js';
    scriptEl.async = true;
    scriptEl.crossOrigin = 'anonymous';
    scriptEl.setAttribute('repo', 'lili21/blog-comments');
    scriptEl.setAttribute('issue-term', 'title');
    scriptEl.setAttribute('theme', 'github-light');
    scriptEl.setAttribute('label', 'comment');

    // commentsRef.current?.appendChild(scriptEl);
    document.body.appendChild(scriptEl)

    return () => {
      scriptEl.remove();
      document.querySelector('.utterances').remove();
    }
  }, []);
  return (
    <article>
      <h1>{post.title}</h1>
      <p>
        {format(new Date(post.date), "yyyy-MM-dd")}{" "}
        {/* <a href={post.html_url} target="_blank" rel="noreferrer">
          评论
        </a> */}
      </p>
      <MDXContent components={{ CodeSandbox }} />
    </article>
  );
}
