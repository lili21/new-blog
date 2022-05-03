import { Octokit } from '@octokit/core'

const client = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN
})

export const getAllBlogs = async () => {
  const result = await client.request('GET /repos/{owner}/{repo}/issues', {
    owner: 'lili.21',
    repo: 'new-blog',
    creator: 'lili.21'
  })

  return result;
}

export default client;