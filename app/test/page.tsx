export const revalidate = 0;
export default async function Test() {
  const res = await fetch("http://worldtimeapi.org/api/timezone/Asia/Shanghai");
  const data = await res.json();
  return <div>{data.datetime}</div>;
}
