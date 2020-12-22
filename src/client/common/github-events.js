export default () => ([
  {
    id: 'commit_comment',
    desc: 'Commit or diff commented on.',
    name: 'Commit comments'
  },
  {
    id: 'create',
    desc: 'Branch or tag created.',
    name: 'Branch or tag creation'
  },
  {
    id: 'delete',
    desc: 'Branch or tag deleted.',
    name: 'Branch or tag deletion'
  },

  { id: 'fork', desc: 'Repository forked.', name: 'Forks' },
  { id: 'gollum', desc: 'Wiki page updated.', name: 'Wiki' },
  {
    id: 'issue_comment',
    desc: 'Issue comment created, edited, or deleted.',
    name: 'Issue comments'
  },
  {
    id: 'issues',
    desc: 'Issue opened, edited, deleted, transferred, pinned, unpinned, closed, reopened, assigned, unassigned, labeled, unlabeled, milestoned, demilestoned, locked, or unlocked.',
    name: 'Issues'
  },
  {
    id: 'pull_request',
    desc: 'Pull request opened, closed, reopened, edited, assigned, unassigned, review requested, review request removed, labeled, unlabeled, synchronized, ready for review, converted to draft, locked, or unlocked.',
    name: 'Pull requests'
  },
  {
    id: 'pull_request_review',
    desc: 'Pull request review submitted, edited, or dismissed.',
    name: 'Pull request reviews'
  },
  {
    id: 'pull_request_review_comment',
    desc: 'Pull request diff comment created, edited, or deleted.',
    name: 'Pull request review comments'
  },
  { id: 'push', desc: 'Git push to a repository.', name: 'Pushes' },
  {
    id: 'release',
    desc: 'Release created, edited, published, unpublished, or deleted.',
    name: 'Releases'
  },
  {
    id: 'star',
    desc: 'A star is created or deleted from a repository.',
    name: 'Stars'
  },
  {
    id: 'check_run',
    desc: 'Check run is created, requested, rerequested, or completed.',
    name: 'Check runs'
  },
  {
    id: 'check_suite',
    desc: 'Check suite is requested, rerequested, or completed.',
    name: 'Check suites'
  },
  {
    id: 'code_scanning_alert',
    desc: 'Code Scanning alert created, fixed in branch, or closed',
    name: 'Code scanning alerts'
  },
  {
    id: 'deploy_key',
    desc: 'A deploy key is created or deleted from a repository.',
    name: 'Deploy keys'
  },
  {
    id: 'deployment',
    desc: 'Repository was deployed or a deployment was deleted.',
    name: 'Deployments'
  },
  {
    id: 'deployment_status',
    desc: 'Deployment status updated from the API.',
    name: 'Deployment statuses'
  },
  // {
  //   id: 'registry_package',
  //   desc: 'Registry package published or updated in a repository.',
  //   name: 'Registry packages'
  // },
  {
    id: 'repository',
    desc: 'Repository created, deleted, archived, unarchived, publicized, privatized, edited, renamed, or transferred.',
    name: 'Repositories'
  },
  {
    id: 'repository_import',
    desc: 'Repository import succeeded, failed, or cancelled.',
    name: 'Repository imports'
  },
  {
    id: 'repository_vulnerability_alert',
    desc: 'Security alert created, resolved, or dismissed on a repository.',
    name: 'Repository vulnerability alerts'
  },
  {
    id: 'label',
    desc: 'Label created, edited or deleted.',
    name: 'Labels'
  },
  {
    id: 'member',
    desc: 'Collaborator added to, removed from, or has changed permissions for a repository.',
    name: 'Collaborator add, remove, or changed'
  },
  // {
  //   id: 'meta',
  //   desc: 'This particular hook is deleted.',
  //   name: 'Meta'
  // },
  {
    id: 'milestone',
    desc: 'Milestone created, closed, opened, edited, or deleted.',
    name: 'Milestones'
  },
  {
    id: 'package',
    desc: 'GitHub Packages published or updated in a repository.',
    name: 'Packages'
  },
  {
    id: 'package_v2',
    desc: 'GitHub Packages published or updated in a repository.',
    name: 'Package v2s'
  },
  { id: 'page_build', desc: 'Pages site built.', name: 'Page builds' },
  // {
  //   id: 'project',
  //   desc: 'Project created, updated, or deleted.',
  //   name: 'Projects'
  // },
  {
    id: 'project_card',
    desc: 'Project card created, updated, or deleted.',
    name: 'Project cards'
  },
  {
    id: 'project_column',
    desc: 'Project column created, updated, moved or deleted.',
    name: 'Project columns'
  },
  // {
  //   id: 'public',
  //   desc: 'Repository changes from private to public.',
  //   name: 'Visibility changes'
  // },
  {
    id: 'status',
    desc: 'Commit status updated from the API.',
    name: 'Statuses'
  },
  {
    id: 'team_add',
    desc: 'Team added or modified on a repository.',
    name: 'Team adds'
  }
  // { id: 'watch', desc: 'User stars a repository.', name: 'Watches' }
])
