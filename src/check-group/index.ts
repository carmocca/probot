import {Probot, Context} from 'probot';
import {PullRequestEvent} from '@octokit/webhooks-types';
import {CheckGroup, fetchConfig} from './core';

const eventHandler = async (context: Context): Promise<void> => {
  const name = context.name;
  if (name !== 'pull_request') {
    throw new Error(`name ${name} should be on of ['pull_request']`);
  }
  const payload = context.payload as PullRequestEvent;
  const pullRequestNumber = payload.pull_request.number;
  const sha = payload.pull_request.head.sha;
  context.log.info(
    `${name} event detected for PR: ${pullRequestNumber}, SHA: ${sha}`
  );
  context.log.debug(`Environment SHA: ${process.env['GITHUB_SHA']}`);
  const config = await fetchConfig(context);
  const core = new CheckGroup(pullRequestNumber, config, context, sha);
  await core.run();
};

function checkGroupApp(app: Probot): void {
  app.on(
    [
      'pull_request.opened',
      'pull_request.reopened',
      'pull_request.synchronize',
      // If the bot is disabled for draft PRs, we want to run it when the PR is marked as ready
      'pull_request.ready_for_review'
    ],
    async context => await eventHandler(context)
  );
}

export default checkGroupApp;
