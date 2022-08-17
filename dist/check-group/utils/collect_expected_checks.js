"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectExpectedChecks = void 0;
/* eslint-enable @typescript-eslint/no-unused-vars */
/**
 * Collect a list of expected passing checks given a
 * list of sub-project configs.
 *
 * It is responsible for de-dup the checks since multiple
 * subprojects can request the same check.
 *
 * @param configs A list of sub-project configurations.
 * @returns A list of check IDs.
 */
var collectExpectedChecks = function (configs) {
    var requiredChecks = [];
    var checksLookup = {};
    configs.forEach(function (config) {
        config.checks.forEach(function (check) {
            /* eslint-disable security/detect-object-injection */
            if (check.id in checksLookup) {
                checksLookup[check.id] += 1;
            }
            else {
                checksLookup[check.id] = 0;
                requiredChecks.push(check.id);
            }
            /* eslint-enable security/detect-object-injection */
        });
    });
    return requiredChecks;
};
exports.collectExpectedChecks = collectExpectedChecks;
