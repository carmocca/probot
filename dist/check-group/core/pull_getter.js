"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-enable @typescript-eslint/no-unused-vars */
/**
 *
 * @param context The check run version of the Probot context
 * @returns A list of pull request data.
 */
exports.extractPullRequestsFromCheckRunContext = function (
/* eslint-disable @typescript-eslint/no-explicit-any */
context) {
    if ("check_run" in context.payload) {
        var checkRun = context.payload["check_run"];
        if ("pull_requests" in checkRun) {
            var pullRequests = checkRun["pull_requests"];
            var pullRequestsData_1 = [];
            pullRequests.forEach(function (pullRequest) {
                if ("number" in pullRequest && "head" in pullRequest) {
                    var head = pullRequest["head"];
                    if ("sha" in head) {
                        pullRequestsData_1.push({
                            number: pullRequest["number"],
                            sha: head["sha"],
                        });
                    }
                    else {
                        throw Error("sha not found in pull request head field.");
                    }
                }
                else {
                    throw Error("number or head not found in pull request");
                }
            });
            return pullRequestsData_1;
        }
        else {
            throw Error("pull_requests not found in check_run.");
        }
    }
    else {
        throw Error("check_run not found in payload.");
    }
};
