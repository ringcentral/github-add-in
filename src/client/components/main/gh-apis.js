/**
 * apis to fetch data
 *
 * get orgs
 * https://docs.github.com/en/free-pro-team@latest/rest/reference/orgs
 * /organizations
 *
 *
      Name Type In Description
      accept string header
      Setting to application/vnd.github.v3+json is recommended.

      since string query
      Only show notifications updated after the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.

      per_page integer query
      Results per page (max 100)

 * [
  {
    "login": "github",
    "id": 1,
    "node_id": "MDEyOk9yZ2FuaXphdGlvbjE=",
    "url": "https://api.github.com/orgs/github",
    "repos_url": "https://api.github.com/orgs/github/repos",
    "events_url": "https://api.github.com/orgs/github/events",
    "hooks_url": "https://api.github.com/orgs/github/hooks",
    "issues_url": "https://api.github.com/orgs/github/issues",
    "members_url": "https://api.github.com/orgs/github/members{/member}",
    "public_members_url": "https://api.github.com/orgs/github/public_members{/member}",
    "avatar_url": "https://github.com/images/error/octocat_happy.gif",
    "description": "A great organization"
  }
]
 * get repos
 *Lists repositories for the specified organization.

GET /orgs/{org}/repos
Parameters
Name Type In Description
accept string header
Setting to application/vnd.github.v3+json is recommended. See preview notices

org string path
type string query
Specifies the types of repositories you want returned. Can be one of all, public, private, forks, sources, member, internal. Default: all. If your organization is associated with an enterprise account using GitHub Enterprise Cloud or GitHub Enterprise Server 2.20+, type can also be internal.

sort string query
Can be one of created, updated, pushed, full_name.

direction string query
Can be one of asc or desc. Default: when using full_name: asc, otherwise desc

per_page integer query
Results per page (max 100)

page integer query
Page number of the results to fetch.

Code samples
Shell
curl \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/orgs/ORG/repos
JavaScript (@octokit/core.js)
await octokit.request('GET /orgs/{org}/repos', {
  org: 'org'
})
Default response
Status: 200 OK
[
  {
    "id": 1296269,
    "node_id": "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",
    "name": "Hello-World",
    "full_name": "octocat/Hello-World",
    "owner": {
      "login": "octocat",
      "id": 1,
      "node_id": "MDQ6VXNlcjE=",
      "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      "gravatar_id": "",
      "url": "https://api.github.com/users/octocat",
      "html_url": "https://github.com/octocat",
      "followers_url": "https://api.github.com/users/octocat/followers",
      "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      "organizations_url": "https://api.github.com/users/octocat/orgs",
      "repos_url": "https://api.github.com/users/octocat/repos",
      "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/octocat/received_events",
      "type": "User",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/octocat/Hello-World",
    "description": "This your first repo!",
    "fork": false,
    "url": "https://api.github.com/repos/octocat/Hello-World",
    "archive_url": "https://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}",
    "assignees_url": "https://api.github.com/repos/octocat/Hello-World/assignees{/user}",
    "blobs_url": "https://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}",
    "branches_url": "https://api.github.com/repos/octocat/Hello-World/branches{/branch}",
    "collaborators_url": "https://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}",
    "comments_url": "https://api.github.com/repos/octocat/Hello-World/comments{/number}",
    "commits_url": "https://api.github.com/repos/octocat/Hello-World/commits{/sha}",
    "compare_url": "https://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}",
    "contents_url": "https://api.github.com/repos/octocat/Hello-World/contents/{+path}",
    "contributors_url": "https://api.github.com/repos/octocat/Hello-World/contributors",
    "deployments_url": "https://api.github.com/repos/octocat/Hello-World/deployments",
    "downloads_url": "https://api.github.com/repos/octocat/Hello-World/downloads",
    "events_url": "https://api.github.com/repos/octocat/Hello-World/events",
    "forks_url": "https://api.github.com/repos/octocat/Hello-World/forks",
    "git_commits_url": "https://api.github.com/repos/octocat/Hello-World/git/commits{/sha}",
    "git_refs_url": "https://api.github.com/repos/octocat/Hello-World/git/refs{/sha}",
    "git_tags_url": "https://api.github.com/repos/octocat/Hello-World/git/tags{/sha}",
    "git_url": "git:github.com/octocat/Hello-World.git",
    "issue_comment_url": "https://api.github.com/repos/octocat/Hello-World/issues/comments{/number}",
    "issue_events_url": "https://api.github.com/repos/octocat/Hello-World/issues/events{/number}",
    "issues_url": "https://api.github.com/repos/octocat/Hello-World/issues{/number}",
    "keys_url": "https://api.github.com/repos/octocat/Hello-World/keys{/key_id}",
    "labels_url": "https://api.github.com/repos/octocat/Hello-World/labels{/name}",
    "languages_url": "https://api.github.com/repos/octocat/Hello-World/languages",
    "merges_url": "https://api.github.com/repos/octocat/Hello-World/merges",
    "milestones_url": "https://api.github.com/repos/octocat/Hello-World/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}",
    "pulls_url": "https://api.github.com/repos/octocat/Hello-World/pulls{/number}",
    "releases_url": "https://api.github.com/repos/octocat/Hello-World/releases{/id}",
    "ssh_url": "git@github.com:octocat/Hello-World.git",
    "stargazers_url": "https://api.github.com/repos/octocat/Hello-World/stargazers",
    "statuses_url": "https://api.github.com/repos/octocat/Hello-World/statuses/{sha}",
    "subscribers_url": "https://api.github.com/repos/octocat/Hello-World/subscribers",
    "subscription_url": "https://api.github.com/repos/octocat/Hello-World/subscription",
    "tags_url": "https://api.github.com/repos/octocat/Hello-World/tags",
    "teams_url": "https://api.github.com/repos/octocat/Hello-World/teams",
    "trees_url": "https://api.github.com/repos/octocat/Hello-World/git/trees{/sha}",
    "clone_url": "https://github.com/octocat/Hello-World.git",
    "mirror_url": "git:git.example.com/octocat/Hello-World",
    "hooks_url": "https://api.github.com/repos/octocat/Hello-World/hooks",
    "svn_url": "https://svn.github.com/octocat/Hello-World",
    "homepage": "https://github.com",
    "language": null,
    "forks_count": 9,
    "stargazers_count": 80,
    "watchers_count": 80,
    "size": 108,
    "default_branch": "master",
    "open_issues_count": 0,
    "is_template": true,
    "topics": [
      "octocat",
      "atom",
      "electron",
      "api"
    ],
    "has_issues": true,
    "has_projects": true,
    "has_wiki": true,
    "has_pages": false,
    "has_downloads": true,
    "archived": false,
    "disabled": false,
    "visibility": "public",
    "pushed_at": "2011-01-26T19:06:43Z",
    "created_at": "2011-01-26T19:01:12Z",
    "updated_at": "2011-01-26T19:14:43Z",
    "permissions": {
      "admin": false,
      "push": false,
      "pull": true
    },
    "template_repository": "octocat/template",
    "temp_clone_token": "ABTLWHOULUVAXGTRYU7OC2876QJ2O",
    "delete_branch_on_merge": true,
    "subscribers_count": 42,
    "network_count": 0,
    "license": {
      "key": "mit",
      "name": "MIT License",
      "spdx_id": "MIT",
      "url": "https://api.github.com/licenses/mit",
      "node_id": "MDc6TGljZW5zZW1pdA=="
    }
  }
]

await octokit.request('POST /repos/{owner}/{repo}/hooks', {
  owner: 'octocat',
  repo: 'hello-world',
  config: {
    url: 'url',
    content_type: 'content_type',
    secret: 'secret',
    insecure_ssl: 'insecure_ssl',
    token: 'token',
    digest: 'digest',
    events: []
  }
})

 */

import fetch from '../../lib/fetch'

function handleError (
  e,
  data,
  url,
  method,
  headers
) {
  console.log('fetch error', e)
  console.log('method:', method)
  console.log('url:', url)
  console.log('data:', data)
}
export async function request ({
  path = '/api/action',
  action = 'op',
  data,
  url,
  method = 'GET',
  headers
}) {
  const res = await fetch.post(window.rc.server + path, {
    action: 'op',
    data,
    url,
    method,
    headers
  }, {
    handleErr: (e) => {
      handleError(
        e,
        data,
        url,
        method,
        headers
      )
    }
  })
  if ((res && res.result && res.status !== 0)) {
    handleError(
      res.result,
      data,
      url,
      method,
      headers
    )
  } else if (res && res.result && res.status === 0) {
    return res.result
  }
}

export function getOrgs () {
  return request({
    url: '/user/orgs?per_page=100'
  })
}

export async function getRepos (org, isUser) {
  let all = []
  let page = 1
  let arr = []
  const pageSize = 100
  const urlCreate = isUser
    ? (page) => `/user/repos?per_page=${pageSize}&page=${page}`
    : (page) => `/orgs/${org}/repos?per_page=${pageSize}&page=${page}`
  do {
    arr = await request({
      url: urlCreate(page)
    })
    if (arr && arr.length) {
      all = [
        ...all,
        ...arr
      ]
    }
    page = page + 1
  } while (arr.length >= pageSize)
  return all
}

export async function createGhWebhook (org, repo, url, events, password) {
  return request({
    url: `/repos/${org}/${repo}/hooks`,
    method: 'POST',
    data: {
      config: {
        url,
        content_type: 'json',
        insecure_ssl: 0,
        password,
        digest: 1
      },
      events
    }
  })
}

export async function delGhWebhook (org, repo, id) {
  return request({
    url: `/repos/${org}/${repo}/hooks/${id}`,
    method: 'DELETE'
  })
}

export async function updateGhWebhook (org, repo, id, events) {
  return request({
    url: `/repos/${org}/${repo}/hooks/${id}`,
    method: 'PATCH',
    data: {
      events
    }
  })
}
