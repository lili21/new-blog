import { useLoaderData } from "@remix-run/react"
import { getBlogDetail } from "~/github.server"
import { format } from '~/utils/date'

export const loader = ({ params }) => {
  return getBlogDetail(params.number)
}

export default function Detail() {
  const data = useLoaderData();
  console.log(data);

  return <article>
    <h3>{data.title}</h3>
    <p>{format(data.created_at)} <a href={data.html_url} target="_blank" rel="noreferrer">source</a></p>
    <main dangerouslySetInnerHTML={{__html: data.html}} />
  </article>
}
