import {Probot, Context} from 'probot';
import {
  CheckRunEvent,
  PullRequestEvent,
  IssueCommentCreatedEvent
} from '@octokit/webhooks-types';
import {CheckGroup, fetchConfig} from './core';

const eventHandler = async (context: Context): Promise<void> => {
  const sha = process.env['GITHUB_SHA']!;

  let pullRequestNumber;
  const name = context.name;
  if (name === 'check_run') {
    const payload = context.payload as CheckRunEvent;
    pullRequestNumber = payload.check_run.pull_requests[0].number;
  } else if (name === 'pull_request') {
    const payload = context.payload as PullRequestEvent;
    pullRequestNumber = payload.pull_request.number;
  } else if (name === 'issue_comment') {
    const payload = context.payload as IssueCommentCreatedEvent;
    if (!payload.issue.pull_request) {
      // not a pull request
      return;
    }
    pullRequestNumber = context.pullRequest().pull_number;
  } else {
    throw new Error(`name ${name} not implemented`);
  }

  context.log.info(
    `${name} event detected for PR ${pullRequestNumber}, SHA ${sha}`
  );
  const config = await fetchConfig(context);
  const core = new CheckGroup(pullRequestNumber, config, context, sha);
  await core.run();
};

function checkGroupApp(app: Probot): void {
  app.on('pull_request', async context => await eventHandler(context));
  app.on('issue_comment', async context => await eventHandler(context));
  app.on('check_run', async context => await eventHandler(context));
}

export default checkGroupApp;
