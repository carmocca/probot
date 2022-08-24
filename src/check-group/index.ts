/**
 * The entrypoint for the Probot app.
 * @module CheckGroupApp
 */
import {Probot} from 'probot';
import {checkRunEventHandler, pullRequestEventHandler} from './handlers';

function checkGroupApp(app: Probot): void {
  app.on('pull_request', async context => {
    await pullRequestEventHandler(context);
  });

  app.on('issue_comment', async context => {
    await pullRequestEventHandler(context);
  });

  app.on('check_run', async context => {
    await checkRunEventHandler(context);
  });
}

export default checkGroupApp;
