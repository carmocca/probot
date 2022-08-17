"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractShaFromCheckRunContext = exports.extractShaFromPullRequestContext = void 0;
/* eslint-enable @typescript-eslint/no-unused-vars */
/**
 * Exrtacts the head sha from the pull request event payload.
 *
 * @param context The pull request version of Probot context.
 * @returns The string sha that correspond to the head commit
 * of the pull request.
 */
var extractShaFromPullRequestContext = function (
/* eslint-disable @typescript-eslint/no-explicit-any */
context) {
    var payload = context.payload;
    if ("pull_request" in payload) {
        var pullRequest = payload["pull_request"];
        if ("head" in pullRequest) {
            var head = pullRequest["head"];
            if ("sha" in head) {
                return head["sha"];
            }
            else {
                throw Error("sha not found in the head attibute");
            }
        }
        else {
            throw Error("head field not found in the pull requets object");
        }
    }
    else {
        throw Error("pull_request not found in context payload");
    }
};
exports.extractShaFromPullRequestContext = extractShaFromPullRequestContext;
/**
 * Parses the SHA the check run is associated with from the
 * context. For more details, please see:
 * https://developer.github.com/webhooks/event-payloads/#check_run
 *
 * @param context The check run version of Probot context.
 * @returns The SHA that the check run is associated with.
 */
var extractShaFromCheckRunContext = function (
/* eslint-disable @typescript-eslint/no-explicit-any */
context) {
    if ("check_run" in context.payload) {
        var checkRun = context.payload["check_run"];
        if ("head_sha" in checkRun) {
            return checkRun["head_sha"];
        }
        else {
            throw Error("head_sha not found in check_run.");
        }
    }
    else {
        throw Error("check_run not found in payload.");
    }
};
exports.extractShaFromCheckRunContext = extractShaFromCheckRunContext;
