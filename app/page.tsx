import Link from "next/link";
import { compareDesc, format } from "date-fns";
import "./page.css";

import { allPosts } from "contentlayer/generated";

export default async function Home() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h2>文章</h2>
      <ol>
        {posts.map((d) => (
          <Article key={d._id} title={d.title} date={d.date} url={d.url} />
        ))}
      </ol>
    </div>
  );
}

function Article({
  url,
  title,
  date,
}: {
  url: string;
  title: string;
  date: string;
}) {
  return (
    <li>
      <span style={{ width: "100px" }}>
        {format(new Date(date), "yyyy-MM-dd")}
      </span>
      <Link href={url}>{title}</Link>
    </li>
  );
}
