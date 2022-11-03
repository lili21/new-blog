import { getMDXComponent } from "mdx-bundler/client";
import { useLoaderData } from "@remix-run/react";
import { useMemo } from "react";

export default function MDXComponent() {
  const data = useLoaderData();
  const { code } = data.result;
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return <Component />;
}
