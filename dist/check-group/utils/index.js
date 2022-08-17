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
var generate_progress_1 = require("./generate_progress");
exports.generateFailingTitle = generate_progress_1.generateFailingTitle;
exports.generateProgressDetails = generate_progress_1.generateProgressDetails;
exports.generateProgressSummary = generate_progress_1.generateProgressSummary;
exports.generateProgressTitle = generate_progress_1.generateProgressTitle;
exports.generateSuccessTitle = generate_progress_1.generateSuccessTitle;
var collect_expected_checks_1 = require("./collect_expected_checks");
exports.collectExpectedChecks = collect_expected_checks_1.collectExpectedChecks;
var subproj_matching_1 = require("./subproj_matching");
exports.matchFilenamesToSubprojects = subproj_matching_1.matchFilenamesToSubprojects;
var user_config_parser_1 = require("./user_config_parser");
exports.parseUserConfig = user_config_parser_1.parseUserConfig;
var satisfy_expected_checks_1 = require("./satisfy_expected_checks");
exports.satisfyExpectedChecks = satisfy_expected_checks_1.satisfyExpectedChecks;
