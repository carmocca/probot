/**
 * Utilities that does not rely on Octokit request.
 * 
 * The utilities are separated for the purpose of testing. Writing tests for the
 * utilities is much easier than core functions, so this should encourage a more
 * robust code development.
 * 
 * @module Utils
 */

import {
  generateProgressDetails,
  generateProgressSummary,
} from "./generate_progress";
import { matchFilenamesToSubprojects } from "./subproj_matching";
import { parseUserConfig } from "./user_config_parser";
import { satisfyExpectedChecks } from "./satisfy_expected_checks";

export {
  generateProgressDetails,
  generateProgressSummary,
  matchFilenamesToSubprojects,
  parseUserConfig,
  satisfyExpectedChecks,
};
