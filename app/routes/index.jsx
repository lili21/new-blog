import { useLoaderData, Link } from "@remix-run/react";
import { format } from "~/utils/date";
import style from "~/styles/list.css";
import * as post1 from "./detail/1.mdx";
import * as post2 from "./detail/2.mdx";
import * as post3 from "./detail/3.mdx";
import * as post4 from "./detail/4.mdx";
import * as post5 from "./detail/5.mdx";
import * as post6 from "./detail/6.mdx";
import * as post7 from "./detail/7.mdx";
import * as post8 from "./detail/8.mdx";
import * as post9 from "./detail/9.mdx";
import * as post10 from "./detail/10.mdx";
import * as post11 from "./detail/11.mdx";
import * as post12 from "./detail/12.mdx";
import * as post13 from "./detail/13.mdx";
import * as post14 from "./detail/14.mdx";
import * as post15 from "./detail/15.mdx";
import * as post16 from "./detail/16.mdx";
import * as post17 from "./detail/17.mdx";
import * as post18 from "./detail/18.mdx";
import * as post19 from "./detail/19.mdx";
import * as post20 from "./detail/20.mdx";
import * as post21 from "./detail/21.mdx";
import * as post22 from "./detail/22.mdx";
import { json } from "@remix-run/node";

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

export const loader = () => {
  return json(
    [
      post1,
      post2,
      post3,
      post4,
      post5,
      post6,
      post7,
      post8,
      post9,
      post10,
      post11,
      post12,
      post13,
      post14,
      post15,
      post16,
      post17,
      post18,
      post19,
      post20,
      post21,
      post22,
    ]
      .map((mod) => {
        return {
          name: mod.filename.replace(/\.mdx?$/, ""),
          created_at: mod.attributes.published,
          ...mod.attributes.meta,
        };
      })
      .sort((a, b) => {
        // return b - a;
        const t1 = new Date(a).getTime();
        const t2 = new Date(b).getTime();
        return t2 > t1 ? 1 : -1;
      })
  );
};

export default function Index() {
  const data = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h2>文章</h2>
      <ol>
        {data.map((d) => (
          <Article key={d.name} {...d} />
        ))}
      </ol>
    </div>
  );
}

function Article({ created_at, name, title }) {
  return (
    <li>
      <span>{format(created_at)}</span>
      <Link prefetch="intent" to={`/detail/${name}`}>
        {title}
      </Link>
    </li>
  );
}
