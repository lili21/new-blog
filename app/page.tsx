import Link from "next/link";
import { getAllBlogs } from "./github.server";
import format from "./date";
import "./page.css";

// export const revalidate = 60 * 60 * 24 * 7;

export default async function Home() {
  const data = await getAllBlogs();

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

function Article({
  number,
  title,
  created_at,
}: {
  number: number;
  title: string;
  created_at: string;
}) {
  return (
    <li>
      <span>{format(created_at)}</span>
      <Link href={`/blog/${number}`}>{title}</Link>
    </li>
  );
}
