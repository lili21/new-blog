import { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import Detail from "./Detail";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    id: post._raw.flattenedPath,
  }));
}

function getBlogDetail(id: string) {
  return allPosts.find((post) => post._raw.flattenedPath === id);
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const post = getBlogDetail(params.id);
  if (post) {
    const { title } = post;
    return {
      title,
      openGraph: {
        title,
        url: `https://blog.lili21.me/posts/${params.id}`,
        images: [`https://blog.lili21.me/og?title=${title}`],
      },
      twitter: {
        title,
        images: [`https://blog.lili21.me/og?title=${title}`],
      },
    };
  } else {
    return {};
  }
}

export default function Post({ params }: { params: { id: string } }) {
  const post = getBlogDetail(params.id);
  if (!post) {
    return "404 not found";
  }
  return <Detail post={post} />;
}
