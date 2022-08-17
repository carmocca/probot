/**
 * The entrypoint for the Probot app.
 * @module CheckGroupApp
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Context, Probot} from 'probot';
/* eslint-enable @typescript-eslint/no-unused-vars */
import {checkRunEventHandler, pullRequestEventHandler} from './handlers';

function checkGroupApp(app: Probot): void {
  app.on('pull_request', async context => {
    await pullRequestEventHandler(context);
  });

  app.on('check_run', async context => {
    await checkRunEventHandler(context);
  });
}

export default checkGroupApp;
