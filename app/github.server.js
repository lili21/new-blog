import { Octokit } from "@octokit/core";
import { marked } from "marked";
import { json } from "@remix-run/node";

const client = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

export const getAllBlogs = async () => {
  const result = await client.request("GET /repos/{owner}/{repo}/issues", {
    owner: "lili21",
    repo: "new-blog",
    creator: "lili21",
  });

  return json(
    result.data.map(({ number, id, title, created_at }) => ({
      number,
      id,
      title,
      created_at,
    }))
  );
};

export const getBlogDetail = async (number) => {
  const {
    data: { title, body, created_at, html_url },
  } = await client.request("GET /repos/{owner}/{repo}/issues/{issue_number}", {
    owner: "lili21",
    repo: "new-blog",
    creator: "lili21",
    issue_number: number,
  });

  return json({
    title,
    html: marked.parse(body),
    created_at,
    html_url,
  });
};

export default client;
