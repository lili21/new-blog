"use client";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { CH } from "@code-hike/mdx/components";
import "@code-hike/mdx/dist/index.css";

const CodeSandbox = (props: { id: string }) => {
  return (
    <iframe
      src={`https://codesandbox.io/embed/${props.id}?fontsize=14&hidenavigation=1&theme=dark`}
      style={{
        width: "100%",
        height: "500px",
        border: 0,
        borderRadius: "4px",
        overflow: "hidden",
      }}
      title="react-common-mistake (forked)"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  );
};

export default function MDXComponent({
  result,
}: {
  result: MDXRemoteSerializeResult;
}) {
  return <MDXRemote {...result} components={{ CH, CodeSandbox }} />;
}
