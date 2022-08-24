import {Probot, Context} from 'probot';
import {CheckGroup, fetchConfig} from './core';

const eventHandler = async (context: Context): Promise<void> => {
  const sha = process.env['GITHUB_SHA'];
  const pullRequestNumber = context.pullRequest().pull_number;
  context.log.info(
    `${context.name} event detected for PR ${pullRequestNumber}, SHA ${sha}`
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
