import { useLoaderData, Link } from "@remix-run/react";
import { getAllBlogs } from '~/github.server'
import { format } from "~/utils/date";

export const loader = async () => {
  return getAllBlogs();
}


export default function Index() {
  const data = useLoaderData()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {
        data.map(d => <Article {...d} key={d.id} />)
      }
    </div>
  );
}

function Article({html_url, number, title, html, created_at}) {
  return <article>
    <header className="title">
      <h3>
        <Link to={`/detail/${number}`}>{title}</Link>
      </h3>
    </header>
    <p>{format(created_at)}</p>
  </article>
}
