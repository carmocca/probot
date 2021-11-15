import autoCcBot from './auto-cc-bot';
// import autoLabelBot from './auto-label-bot';
import {Application} from 'probot';

export default function botSteps(app: Application): void {
  autoCcBot(app);
  // @carmocca: disable the auto-label feature
  // autoLabelBot(app);
}
