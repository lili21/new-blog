import { Octokit } from "@octokit/core";
import { serialize } from "next-mdx-remote/serialize";
import { remarkCodeHike } from "@code-hike/mdx";
import theme from "shiki/themes/nord.json";

const client = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

export const getAllBlogs = async () => {
  const result = await client.request("GET /repos/{owner}/{repo}/issues", {
    owner: "lili21",
    repo: "new-blog",
    creator: "lili21",
  });

  return result.data
    .filter((d) => !d.pull_request)
    .filter((d) =>
      d.labels.every((l) => {
        if (typeof l !== "string") {
          return l.name !== "draft";
        } else {
          return true;
        }
      })
    )

    .map(({ number, id, title, created_at }) => ({
      number,
      id,
      title,
      created_at,
    }));
};

export const getBlogDetail = async (id: number) => {
  const {
    data: { title, body, created_at, html_url },
  } = await client.request("GET /repos/{owner}/{repo}/issues/{issue_number}", {
    owner: "lili21",
    repo: "new-blog",
    creator: "lili21",
    issue_number: id,
  });

  if (body) {
    const result = await serialize(body, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          [
            remarkCodeHike,
            {
              autoImport: false,
              theme,
              showCopyButton: true,
              lineNumbers: true,
            },
          ],
        ],
        useDynamicImport: true,
      },
    });

    return {
      title,
      result,
      created_at,
      html_url,
    };
  } else {
    return {
      title,
      created_at,
      html_url,
    };
  }
};

export default client;
