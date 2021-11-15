import autoCcBot from './auto-cc-bot';
// import autoLabelBot from './auto-label-bot';
import {Probot} from 'probot';

export default function botSteps(app: Probot): void {
  autoCcBot(app);
  // @carmocca: disable the auto-label feature
  // autoLabelBot(app);
}
