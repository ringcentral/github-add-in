export default () => ([
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
  // {
  //   id: 'check_run',
  //   desc: 'Check run is created, requested, rerequested, or completed.',
  //   name: 'Check runs'
  // },
  // {
  //   id: 'check_suite',
  //   desc: 'Check suite is requested, rerequested, or completed.',
  //   name: 'Check suites'
  // },
  {
    id: 'code_scanning_alert',
    desc: 'Code Scanning alert created, fixed in branch, or closed',
    name: 'Code scanning alerts'
  },
  {
    id: 'member',
    desc: 'Collaborator added to, removed from, or has changed permissions for a repository.',
    name: 'Collaborator add, remove, or changed'
  },
  {
    id: 'commit_comment',
    desc: 'Commit or diff commented on.',
    name: 'Commit comments'
  },
  {
    id: 'deploy_key',
    desc: 'A deploy key is created or deleted from a repository.',
    name: 'Deploy keys'
  },
  {
    id: 'deployment_status',
    desc: 'Deployment status updated from the API.',
    name: 'Deployment statuses'
  },
  {
    id: 'deployment',
    desc: 'Repository was deployed or a deployment was deleted.',
    name: 'Deployments'
  },
  {
    id: 'discussion_comment',
    desc: 'Discussion comment created, edited, or deleted.',
    name: 'Discussion comments'
  },
  {
    id: 'discussion',
    desc: 'Discussion created, edited, pinned, unpinned, locked, unlocked, transferred, answered, unanswered, labeled, unlabeled, had its category changed, or was deleted.',
    name: 'Discussions'
  },
  { id: 'fork', desc: 'Repository forked.', name: 'Forks' },
  {
    id: 'issue_comment',
    desc: 'Issue comment created, edited, or deleted.',
    name: 'Issue comments',
    cat: 'Most commonly used'
  },
  {
    id: 'issues',
    cat: 'Most commonly used',
    desc: 'Issue opened, edited, deleted, transferred, pinned, unpinned, closed, reopened, assigned, unassigned, labeled, unlabeled, milestoned, demilestoned, locked, or unlocked.',
    name: 'Issues'
  },
  {
    id: 'label',
    desc: 'Label created, edited or deleted.',
    name: 'Labels'
  },
  {
    id: 'meta',
    desc: 'This particular hook is deleted.',
    name: 'Meta'
  },
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
  { id: 'page_build', desc: 'Pages site built.', name: 'Page builds' },
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
  {
    id: 'project',
    desc: 'Project created, updated, or deleted.',
    name: 'Projects'
  },
  {
    id: 'pull_request_review_comment',
    desc: 'Pull request diff comment created, edited, or deleted.',
    name: 'Pull request review comments'
  },
  {
    id: 'pull_request_review_thread',
    desc: 'A pull request review thread was resolved or unresolved.',
    name: 'Pull request review threads'
  },
  {
    id: 'pull_request_review',
    desc: 'Pull request review submitted, edited, or dismissed.',
    name: 'Pull request reviews'
  },
  {
    id: 'pull_request',
    cat: 'Most commonly used',
    desc: 'Pull request opened, closed, reopened, edited, assigned, unassigned, review requested, review request removed, labeled, unlabeled, synchronized, ready for review, converted to draft, locked, unlocked, auto merge enabled, auto merge disabled, milestoned, or demilestoned.',
    name: 'Pull requests'
  },
  {
    id: 'push',
    cat: 'Most commonly used',
    desc: 'Git push to a repository.',
    name: 'Pushes'
  },
  {
    id: 'registry_package',
    desc: 'Registry package published or updated in a repository.',
    name: 'Registry packages'
  },
  {
    id: 'release',
    cat: 'Most commonly used',
    desc: 'Release created, edited, published, unpublished, or deleted.',
    name: 'Releases'
  },
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
    desc: 'Dependabot alert (aka dependency vulnerability alert) created, resolved, or dismissed on a repository.',
    name: 'Repository vulnerability alerts'
  },
  {
    id: 'secret_scanning_alert',
    desc: 'Secrets scanning alert created, resolved, or reopened',
    name: 'Secret scanning alerts'
  },
  {
    id: 'star',
    desc: 'A star is created or deleted from a repository.',
    name: 'Stars'
  },
  {
    id: 'status',
    desc: 'Commit status updated from the API.',
    name: 'Statuses'
  },
  {
    id: 'team_add',
    desc: 'Team added or modified on a repository.',
    name: 'Team adds'
  },
  // {
  //   id: 'public',
  //   desc: 'Repository changes from private to public.',
  //   name: 'Visibility changes'
  // },
  // { id: 'watch', desc: 'User stars a repository.', name: 'Watches' },
  { id: 'gollum', desc: 'Wiki page updated.', name: 'Wiki' }
  // {
  //   id: 'workflow_job',
  //   desc: 'Workflow job queued, requested or completed on a repository.',
  //   name: 'Workflow jobs'
  // }
])
