import { redirect } from "next/navigation";

export default function Blog({ params }: { params: { id: string } }) {
  redirect(`/posts/${params.id}`);
}
