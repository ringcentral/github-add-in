const a = `<div class="hook-event-selector">
<input type="checkbox" name="hook[events][]" id="hook_events_" value="*" class="d-none js-hook-event-checkbox js-hook-wildcard-event">
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="create" class="js-hook-event-checkbox">
      Branch or tag creation


      <p class="text-small color-text-secondary">
        Branch or tag created.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="delete" class="js-hook-event-checkbox">
      Branch or tag deletion


      <p class="text-small color-text-secondary">
        Branch or tag deleted.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="check_run" class="js-hook-event-checkbox">
      Check runs


      <p class="text-small color-text-secondary">
        Check run is created, requested, rerequested, or completed.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="check_suite" class="js-hook-event-checkbox">
      Check suites


      <p class="text-small color-text-secondary">
        Check suite is requested, rerequested, or completed.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="code_scanning_alert" class="js-hook-event-checkbox">
      Code scanning alerts


      <p class="text-small color-text-secondary">
        Code Scanning alert created, fixed in branch, or closed
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="member" class="js-hook-event-checkbox">
      Collaborator add, remove, or changed


      <p class="text-small color-text-secondary">
        Collaborator added to, removed from, or has changed permissions for a repository.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="commit_comment" class="js-hook-event-checkbox">
      Commit comments


      <p class="text-small color-text-secondary">
        Commit or diff commented on.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="deploy_key" class="js-hook-event-checkbox">
      Deploy keys


      <p class="text-small color-text-secondary">
        A deploy key is created or deleted from a repository.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="deployment_status" class="js-hook-event-checkbox">
      Deployment statuses


      <p class="text-small color-text-secondary">
        Deployment status updated from the API.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="deployment" class="js-hook-event-checkbox">
      Deployments


      <p class="text-small color-text-secondary">
        Repository was deployed or a deployment was deleted.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="discussion_comment" class="js-hook-event-checkbox">
      Discussion comments

        <span class="tooltipped tooltipped-s" aria-label="This event is not yet public. If you would like to receive payloads for this event, you will need to explicitly choose it here.">
          <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="octicon octicon-lock">
<path fill-rule="evenodd" d="M4 4v2h-.25A1.75 1.75 0 002 7.75v5.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-5.5A1.75 1.75 0 0012.25 6H12V4a4 4 0 10-8 0zm6.5 2V4a2.5 2.5 0 00-5 0v2h5zM12 7.5h.25a.25.25 0 01.25.25v5.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-5.5a.25.25 0 01.25-.25H12z"></path>
</svg>
        </span>

      <p class="text-small color-text-secondary">
        Discussion comment created, edited, or deleted.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="discussion" class="js-hook-event-checkbox">
      Discussions

        <span class="tooltipped tooltipped-s" aria-label="This event is not yet public. If you would like to receive payloads for this event, you will need to explicitly choose it here.">
          <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="octicon octicon-lock">
<path fill-rule="evenodd" d="M4 4v2h-.25A1.75 1.75 0 002 7.75v5.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-5.5A1.75 1.75 0 0012.25 6H12V4a4 4 0 10-8 0zm6.5 2V4a2.5 2.5 0 00-5 0v2h5zM12 7.5h.25a.25.25 0 01.25.25v5.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-5.5a.25.25 0 01.25-.25H12z"></path>
</svg>
        </span>

      <p class="text-small color-text-secondary">
        Discussion created, edited, pinned, unpinned, locked, unlocked, transferred, answered, unanswered, labeled, unlabeled, had its category changed, or was deleted.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="fork" class="js-hook-event-checkbox">
      Forks


      <p class="text-small color-text-secondary">
        Repository forked.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="issue_comment" class="js-hook-event-checkbox">
      Issue comments


      <p class="text-small color-text-secondary">
        Issue comment created, edited, or deleted.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="issues" class="js-hook-event-checkbox">
      Issues


      <p class="text-small color-text-secondary">
        Issue opened, edited, deleted, transferred, pinned, unpinned, closed, reopened, assigned, unassigned, labeled, unlabeled, milestoned, demilestoned, locked, or unlocked.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="label" class="js-hook-event-checkbox">
      Labels


      <p class="text-small color-text-secondary">
        Label created, edited or deleted.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="meta" class="js-hook-event-checkbox">
      Meta


      <p class="text-small color-text-secondary">
        This particular hook is deleted.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="milestone" class="js-hook-event-checkbox">
      Milestones


      <p class="text-small color-text-secondary">
        Milestone created, closed, opened, edited, or deleted.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="package" class="js-hook-event-checkbox">
      Packages


      <p class="text-small color-text-secondary">
        GitHub Packages published or updated in a repository.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="page_build" class="js-hook-event-checkbox">
      Page builds


      <p class="text-small color-text-secondary">
        Pages site built.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="project_card" class="js-hook-event-checkbox">
      Project cards


      <p class="text-small color-text-secondary">
        Project card created, updated, or deleted.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="project_column" class="js-hook-event-checkbox">
      Project columns


      <p class="text-small color-text-secondary">
        Project column created, updated, moved or deleted.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="project" class="js-hook-event-checkbox">
      Projects


      <p class="text-small color-text-secondary">
        Project created, updated, or deleted.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="pull_request_review_comment" class="js-hook-event-checkbox">
      Pull request review comments


      <p class="text-small color-text-secondary">
        Pull request diff comment created, edited, or deleted.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="pull_request_review_thread" class="js-hook-event-checkbox">
      Pull request review threads


      <p class="text-small color-text-secondary">
        A pull request review thread was resolved or unresolved.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="pull_request_review" class="js-hook-event-checkbox">
      Pull request reviews


      <p class="text-small color-text-secondary">
        Pull request review submitted, edited, or dismissed.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="pull_request" class="js-hook-event-checkbox">
      Pull requests


      <p class="text-small color-text-secondary">
        Pull request opened, closed, reopened, edited, assigned, unassigned, review requested, review request removed, labeled, unlabeled, synchronized, ready for review, converted to draft, locked, unlocked, auto merge enabled, auto merge disabled, milestoned, or demilestoned.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="push" class="js-hook-event-checkbox" checked="checked">
      Pushes


      <p class="text-small color-text-secondary">
        Git push to a repository.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="registry_package" class="js-hook-event-checkbox">
      Registry packages


      <p class="text-small color-text-secondary">
        Registry package published or updated in a repository.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="release" class="js-hook-event-checkbox">
      Releases


      <p class="text-small color-text-secondary">
        Release created, edited, published, unpublished, or deleted.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="repository" class="js-hook-event-checkbox">
      Repositories


      <p class="text-small color-text-secondary">
        Repository created, deleted, archived, unarchived, publicized, privatized, edited, renamed, or transferred.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="repository_import" class="js-hook-event-checkbox">
      Repository imports


      <p class="text-small color-text-secondary">
        Repository import succeeded, failed, or cancelled.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="repository_vulnerability_alert" class="js-hook-event-checkbox">
      Repository vulnerability alerts


      <p class="text-small color-text-secondary">
        Dependabot alert (aka dependency vulnerability alert) created, resolved, or dismissed on a repository.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="secret_scanning_alert" class="js-hook-event-checkbox">
      Secret scanning alerts


      <p class="text-small color-text-secondary">
        Secrets scanning alert created, resolved, or reopened
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="star" class="js-hook-event-checkbox">
      Stars


      <p class="text-small color-text-secondary">
        A star is created or deleted from a repository.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="status" class="js-hook-event-checkbox">
      Statuses


      <p class="text-small color-text-secondary">
        Commit status updated from the API.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="team_add" class="js-hook-event-checkbox">
      Team adds


      <p class="text-small color-text-secondary">
        Team added or modified on a repository.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="public" class="js-hook-event-checkbox">
      Visibility changes


      <p class="text-small color-text-secondary">
        Repository changes from private to public.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="watch" class="js-hook-event-checkbox">
      Watches


      <p class="text-small color-text-secondary">
        User stars a repository.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="gollum" class="js-hook-event-checkbox">
      Wiki


      <p class="text-small color-text-secondary">
        Wiki page updated.
      </p>
    </label>
  </div>
  <div class="hook-event form-checkbox">
    <label>
      <input type="checkbox" name="hook[events][]" value="workflow_job" class="js-hook-event-checkbox">
      Workflow jobs


      <p class="text-small color-text-secondary">
        Workflow job queued, requested or completed on a repository.
      </p>
    </label>
  </div>
</div>`

const cheerio = require('cheerio')

const $ = cheerio.load(a)
const arr = []
$('.form-checkbox').each(function (i, element) {
  const id = $(this).find('input').attr('value')
  const desc = $(this).find('p').text().trim()
  const name = $(this).text().trim().replace(desc, '').trim()
  arr.push({
    id,
    desc,
    name
  })
})
console.log(arr)
