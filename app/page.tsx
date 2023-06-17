import Link from "next/link";
import { compareDesc, format } from "date-fns";
import "./page.css";

import { allPosts } from "contentlayer/generated";

export default async function Home() {
  // const posts = allPosts.sort((a, b) => {
  //   return compareDesc(new Date(a.date), new Date(b.date));
  // });

  const groupedPosts = allPosts.reduce(
    (acc: Record<number, typeof allPosts>, post) => {
      const year = new Date(post.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {}
  );
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h2 style={{ marginBottom: "26px" }}>文章</h2>
      <ol>
        {Object.keys(groupedPosts)
          .sort((a, b) => Number(b) - Number(a))
          .map((year) => {
            return (
              <li style={{ marginBottom: "10px" }} key={year}>
                <p
                  style={{
                    paddingTop: "30px",
                    marginBottom: "40px",
                    fontSize: "18px",
                  }}
                >
                  {year}
                </p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {groupedPosts[+year]
                    .sort((a, b) =>
                      compareDesc(new Date(a.date), new Date(b.date))
                    )
                    .map((d) => (
                      <Article
                        key={d._id}
                        title={d.title}
                        date={d.date}
                        url={d.url}
                      />
                    ))}
                </ul>
              </li>
            );
          })}
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
      <Link href={url} style={{ display: "block" }}>
        <div
          style={{
            display: "flex",
            fontSize: "18px",
            height: "60px",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              margin: "0 16px 0 0",
              color: "rgba(87, 95, 117)",
            }}
          >
            {format(new Date(date), "MM-dd")}
          </p>
          {title}
        </div>
      </Link>
    </li>
  );
}
