import autoCcBot from './auto-cc-bot';
import {Probot} from 'probot';

export default function botSteps(app: Probot): void {
  autoCcBot(app);
}
