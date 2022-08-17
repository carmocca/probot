"use strict";
/**
 * Utilities that does not rely on Octokit request.
 *
 * The utilities are separated for the purpose of testing. Writing tests for the
 * utilities is much easier than core functions, so this should encourage a more
 * robust code development.
 *
 * @module Utils
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.satisfyExpectedChecks = exports.parseUserConfig = exports.matchFilenamesToSubprojects = exports.generateProgressSummary = exports.generateProgressDetails = void 0;
var generate_progress_1 = require("./generate_progress");
Object.defineProperty(exports, "generateProgressDetails", { enumerable: true, get: function () { return generate_progress_1.generateProgressDetails; } });
Object.defineProperty(exports, "generateProgressSummary", { enumerable: true, get: function () { return generate_progress_1.generateProgressSummary; } });
var subproj_matching_1 = require("./subproj_matching");
Object.defineProperty(exports, "matchFilenamesToSubprojects", { enumerable: true, get: function () { return subproj_matching_1.matchFilenamesToSubprojects; } });
var user_config_parser_1 = require("./user_config_parser");
Object.defineProperty(exports, "parseUserConfig", { enumerable: true, get: function () { return user_config_parser_1.parseUserConfig; } });
var satisfy_expected_checks_1 = require("./satisfy_expected_checks");
Object.defineProperty(exports, "satisfyExpectedChecks", { enumerable: true, get: function () { return satisfy_expected_checks_1.satisfyExpectedChecks; } });
