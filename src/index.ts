import {install} from 'source-map-support';

import autoCcBot from './auto-cc-bot';
// import autoLabelBot from './auto-label-bot';
import {Application} from 'probot';

// Needed for traceback translation from transpiled javascript -> typescript
install();

function runBot(app: Application): void {
  autoCcBot(app);
  // @carmocca: disable the auto-label feature
  // autoLabelBot(app);
}

export = runBot;
