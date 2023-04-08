"use client";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { CH } from "@code-hike/mdx/components";
import "@code-hike/mdx/dist/index.css";

export default function MDXComponent({
  result,
}: {
  result: MDXRemoteSerializeResult;
}) {
  return <MDXRemote {...result} components={{ CH }} />;
}
