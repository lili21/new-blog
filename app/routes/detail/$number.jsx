import { useCatch, useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

import { getBlogDetail } from "~/github.server";
import { format } from "~/utils/date";
import codeHideStyle from "@code-hike/mdx/dist/index.css";

export const CatchBoundary = () => {
  const {
    data: { error },
  } = useCatch();

  const message = useMemo(() => {
    const { message, errors } = error;
    if (message) {
      return message;
    }

    if (Array.isArray(errors)) {
      return errors.map((e) => e.text).join("\n");
    }
  }, [error]);

  return <div className="catch">{message}</div>;
};

export const links = () => [
  {
    rel: "stylesheet",
    href: codeHideStyle,
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
  const { code, frontmatter } = data.result;

  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <article>
      <h1>{data.title}</h1>
      <p>
        {format(frontmatter.published ?? data.created_at)}{" "}
        <a href={data.html_url} target="_blank" rel="noreferrer">
          评论
        </a>
      </p>
      <main>
        <Component />
      </main>
    </article>
  );
}
