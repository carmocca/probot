"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePullRequestNumbersFromCheckRunContext = exports.parsePullRequestNumberFromPullRequestContext = void 0;
/* eslint-enable @typescript-eslint/no-unused-vars */
/**
 * Parses the pull request number from the context.
 *
 * @param context The pull request version of Probot context
 * @returns The pull request number of the pull request that
 * triggered the event.
 */
var parsePullRequestNumberFromPullRequestContext = function (
/* eslint-disable @typescript-eslint/no-explicit-any */
context) {
    if ("number" in context.payload) {
        return context.payload["number"];
    }
    else {
        throw Error("Cannot find number in payload.");
    }
};
exports.parsePullRequestNumberFromPullRequestContext = parsePullRequestNumberFromPullRequestContext;
/* istanbul ignore next */
/**
 * Parses the numbers for all pull requests that are associated
 * with a check run.
 *
 * Since the function is currently not used in favor of the one
 * that extracts the pull number together with the sha, it is
 * ignored for coverage calculation for now.
 *
 * @param context The check run version of Probot context
 * @returns The pull request numbers that are associated with
 * the check run that triggered this event.
 */
var parsePullRequestNumbersFromCheckRunContext = function (
/* eslint-disable @typescript-eslint/no-explicit-any */
context) {
    if ("check_run" in context.payload) {
        var checkRun = context.payload["check_run"];
        if ("pull_requests" in checkRun) {
            var pullRequests = checkRun["pull_requests"];
            var pullRequestNumbers_1 = [];
            pullRequests.forEach(function (pullRequest) {
                if ("number" in pullRequest) {
                    pullRequestNumbers_1.push(pullRequest["number"]);
                }
                else {
                    throw Error("number not found in pull request");
                }
            });
            return pullRequestNumbers_1;
        }
        else {
            throw Error("pull_requests not found in check_run.");
        }
    }
    else {
        throw Error("check_run not found in payload.");
    }
};
exports.parsePullRequestNumbersFromCheckRunContext = parsePullRequestNumbersFromCheckRunContext;
