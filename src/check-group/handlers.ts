import {CheckGroup, fetchConfig} from './core';
import {Context} from 'probot';
import {isTriggeredBySelf} from './core/trigger_filter';

export const pullRequestEventHandler = async (
  context: Context
): Promise<void> => {
  const sha = process.env['GITHUB_SHA'];
  const pullRequestNumber = context.pullRequest().pull_number;
  context.log.info(
    `${context.name} event detected for PR ${pullRequestNumber}, SHA ${sha}`
  );
  const config = await fetchConfig(context);
  const core = new CheckGroup(pullRequestNumber, config, context, sha);
  await core.run();
};

export const checkRunEventHandler = async (context: Context): Promise<void> => {
  const sha = process.env['GITHUB_SHA'];
  const pullRequestNumber = context.pullRequest().pull_number;
  context.log.info(
    `${context.name} event detected for PR ${pullRequestNumber}, SHA ${sha}`
  );
  const config = await fetchConfig(context);
  if (isTriggeredBySelf(context, config)) {
    return;
  }
  const core = new CheckGroup(pullRequestNumber, config, context, sha);
  await core.run();
};
