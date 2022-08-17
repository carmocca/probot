import autoCcBot from './auto-cc/auto-cc-bot';
import checkGroupApp from './check-group/index';
import {Probot} from 'probot';

export default function botSteps(app: Probot): void {
  autoCcBot(app);
  checkGroupApp(app);
}
