import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import path from "path";
import fs from "fs";

const shiki_l = path.resolve(process.cwd(), "node_modules/shiki/languages");

fs.readFile(path.resolve(shiki_l, "abap.tmLanguage.json"));
fs.readFile(path.resolve(shiki_l, "css.tmLanguage.json"));
fs.readFile(path.resolve(shiki_l, "html.tmLanguage.json"));
fs.readFile(path.resolve(shiki_l, "javascript.tmLanguage.json"));
fs.readFile(path.resolve(shiki_l, "jsx.tmLanguage.json"));

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

export const handleDataRequest = async (response, { request }) => {
  let isGet = request.method.toLowerCase() === "get";
  let purpose =
    request.headers.get("Purpose") ||
    request.headers.get("X-Purpose") ||
    request.headers.get("Sec-Purpose") ||
    request.headers.get("Sec-Fetch-Purpose") ||
    request.headers.get("Moz-Purpose");
  let isPrefetch = purpose === "prefetch";

  // If it's a GET request and it's a prefetch request and it doesn't have a Cache-Control header
  if (isGet && isPrefetch && !response.headers.has("Cache-Control")) {
    // we will cache for 10 seconds only on the browser
    response.headers.set("Cache-Control", "max-age=60");
  }

  return response;
};
