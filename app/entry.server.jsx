import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

import x from "shiki/languages/abap.tmLanguage.json";
import a from "shiki/languages/css.tmLanguage.json";
import b from "shiki/languages/html.tmLanguage.json";
import c from "shiki/languages/javascript.tmLanguage.json";
import d from "shiki/languages/jsx.tmLanguage.json";

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
