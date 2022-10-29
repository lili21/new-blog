import { useLoaderData, Link } from "@remix-run/react";
import { getAllBlogs } from "~/github.server";
import { format } from "~/utils/date";
import style from "~/styles/list.css";

export const loader = async () => {
  return getAllBlogs();
};

export const links = () => [
  {
    rel: "stylesheet",
    href: style,
  },
];

const d = 60 * 60 * 24;

export const headers = () => {
  return {
    "Cache-Control": `max-age=${d}`,
  };
};

export default function Index() {
  const data = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h2>文章</h2>
      <ol>
        {data.map((d) => (
          <Article key={d.id} {...d} />
        ))}
      </ol>
    </div>
  );
}

function Article({ html_url, number, title, html, created_at }) {
  return (
    <li>
      <span>{format(created_at)}</span>
      <Link prefetch="intent" to={`/detail/${number}`}>
        {title}
      </Link>
    </li>
  );
}
