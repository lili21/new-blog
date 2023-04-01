import { getBlogDetail } from "@/app/github.server";
import "@code-hike/mdx/dist/index.css";
import format from "@/app/date";
import MDXComponent from "./MDXComponent";

export const revalidate = 3600;

export default async function Detail({ params }: { params: { id: string } }) {
  const data = await getBlogDetail(Number(params.id));
  return (
    <article>
      <h1>{data.title}</h1>
      <p>
        {format(
          (data.result?.frontmatter.published as string) ?? data.created_at
        )}{" "}
        <a href={data.html_url} target="_blank" rel="noreferrer">
          评论
        </a>
      </p>
      <main>{data.result ? <MDXComponent result={data.result} /> : null}</main>
    </article>
  );
}
