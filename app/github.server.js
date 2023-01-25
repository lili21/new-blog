import { Octokit } from "@octokit/core";
import { json } from "@remix-run/node";
import { bundleMDX } from "mdx-bundler";
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

  return json(
    result.data
      .filter((d) => !d.pull_request)
      .map(({ number, id, title, created_at }) => ({
        number,
        id,
        title,
        created_at,
      }))
  );
};

export const getBlogDetail = async (number) => {
  try {
    const {
      data: { title, body, created_at, html_url },
    } = await client.request(
      "GET /repos/{owner}/{repo}/issues/{issue_number}",
      {
        owner: "lili21",
        repo: "new-blog",
        creator: "lili21",
        issue_number: number,
      }
    );

    const result = await bundleMDX({
      source: body,
      mdxOptions(options, frontmatter) {
        // this is the recommended way to add custom remark/rehype plugins:
        // The syntax might look weird, but it protects you in case we add/remove
        // plugins in the future.
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          [
            remarkCodeHike,
            {
              showCopyButton: true,
              theme,
            },
          ],
        ];

        return options;
      },
    });

    return json({
      title,
      result,
      created_at,
      html_url,
    });
  } catch (e) {
    throw json({ error: e }, { status: 500 });
  }
};

export default client;
