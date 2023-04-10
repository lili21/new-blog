import { getBlogDetail, getAllBlogs } from "@/app/github.server";
import format from "@/app/date";
import MDXComponent from "@/app/components/MDXComponent";
import { Metadata } from "next";
// export const revalidate = 60 * 60 * 24 * 30;

export async function generateStaticParams() {
  const posts = await getAllBlogs();

  return posts.map((post) => ({
    id: `${post.number}`,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { title } = await getBlogDetail(Number(params.id));
  const url = new URL(
    "https://vercel-og-nextjs-coral-five.vercel.app/api/param"
  );
  url.searchParams.set("title", title);
  return {
    title,
    openGraph: {
      title,
      url: `https://blog.lili21.me/blog/${params.id}`,
      images: [url.toString()],
    },
    twitter: {
      title,
      images: [url.toString()],
    },
  };
}

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
