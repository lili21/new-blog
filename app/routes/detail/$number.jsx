import { useCatch, useLoaderData } from "@remix-run/react";
import { Suspense, useMemo, lazy } from "react";

import { getBlogDetail } from "~/github.server";
import { format } from "~/utils/date";
import codeHideStyle from "@code-hike/mdx/dist/index.css";

const MDXComponent = lazy(() => import("~/components/MDXComponent"));

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

const d = 60 * 60 * 24;

export const headers = () => {
  return {
    "Cache-Control": `s-maxage=${d * 7}, stale-while-revalidate=${d * 30}`,
  };
};

export default function Detail() {
  const data = useLoaderData();
  const { frontmatter } = data.result;

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
        <Suspense fallback={null}>
          <MDXComponent />
        </Suspense>
      </main>
    </article>
  );
}
