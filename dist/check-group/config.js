"use strict";
/**
 * Project level configurations
 * @module Config
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorCheckDetails = exports.errorCheckSummary = exports.errorCheckTitle = exports.startCheckDetails = exports.startCheckSummary = exports.startCheckTitle = exports.configPath = exports.defaultDevCheckId = exports.defaultCheckId = void 0;
/**
 * The default name that will be display on the list
 * on the pull request page.
 */
exports.defaultCheckId = 'Check Group';
/**
 * The default dev name that will be display on the list
 * on the pull request page.
 */
exports.defaultDevCheckId = 'Check Group (local)';
/**
 * The default path to find the configuration file.
 * This is not customizable for now, but might be in
 * the future upon request.
 */
exports.configPath = 'checkgroup.yml';
/**
 * The message that will be displayed in the pull request
 * checks list when the service is started but no other
 * checks have reported anything yet.
 */
exports.startCheckTitle = 'Started';
/**
 * The message that will be displayed as the summary when the
 * service status is "started". The user will see this after
 * clicking on the detail button next to the check.
 */
exports.startCheckSummary = 'The service has started gathering required statuses';
/**
 * The message that will be displayed as the details when the
 * service status is "started" to inform the user what the app
 * is currently doing and why there is no status yet to hopefully
 * report confusion.
 */
exports.startCheckDetails = "\n  The service has started watching available check statues, but other\n  checks have not reported statuses yet.\n";
/**
 * The title message that will be displayed to the user when an
 * error is encountered while the app is running.
 */
exports.errorCheckTitle = 'Error';
/**
 * The summary message that will be displayed to the user when an
 * error happened during the app run.
 */
exports.errorCheckSummary = 'Whoops, the app encountered an error';
/**
 * The detailed message that will be displayed to the user when an
 * error happened during the app run.
 */
exports.errorCheckDetails = "\n  Something went wrong, please file a issue\n  [here](https://github.com/tianhaoz95/check-group/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D).\n  Thanks!\n";
