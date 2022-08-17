"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProgressDetails = exports.statusToMark = exports.generateProgressSummary = exports.generateSuccessTitle = exports.generateFailingTitle = exports.generateProgressTitle = exports.generateProgressReport = void 0;
/* eslint-enable @typescript-eslint/no-unused-vars */
var config_1 = require("../config");
var generateProgressReport = function (subprojects, checksStatusLookup) {
    var report = {
        completed: [],
        expected: [],
        failed: [],
        missing: [],
        needAction: [],
        running: [],
        succeeded: [],
    };
    var lookup = {};
    subprojects.forEach(function (proj) {
        proj.checks.forEach(function (check) {
            var _a, _b, _c, _d, _e, _f;
            /* eslint-disable security/detect-object-injection */
            if (!(check.id in lookup)) {
                lookup[check.id] = true;
                (_a = report.expected) === null || _a === void 0 ? void 0 : _a.push(check.id);
                if (check.id in checksStatusLookup) {
                    var status_1 = checksStatusLookup[check.id];
                    if (status_1 === "success") {
                        (_b = report.completed) === null || _b === void 0 ? void 0 : _b.push(check.id);
                        (_c = report.succeeded) === null || _c === void 0 ? void 0 : _c.push(check.id);
                    }
                    if (status_1 === "failure") {
                        (_d = report.completed) === null || _d === void 0 ? void 0 : _d.push(check.id);
                        (_e = report.failed) === null || _e === void 0 ? void 0 : _e.push(check.id);
                    }
                    if (status_1 === "pending") {
                        (_f = report.running) === null || _f === void 0 ? void 0 : _f.push(check.id);
                    }
                }
            }
            /* eslint-enable security/detect-object-injection */
        });
    });
    return report;
};
exports.generateProgressReport = generateProgressReport;
/**
 * Generate the title for the status check.
 *
 * @param subprojects The matching subprojects.
 * @param checksStatusLookup The posted check status.
 */
var generateProgressTitle = function (subprojects, checksStatusLookup) {
    var _a, _b;
    var report = (0, exports.generateProgressReport)(subprojects, checksStatusLookup);
    var message = "Pending (".concat((_a = report.completed) === null || _a === void 0 ? void 0 : _a.length, "/").concat((_b = report.expected) === null || _b === void 0 ? void 0 : _b.length, ")");
    return message;
};
exports.generateProgressTitle = generateProgressTitle;
/**
 * Generate the title for the status check.
 *
 * @param subprojects The matching subprojects.
 * @param checksStatusLookup The posted check status.
 */
var generateFailingTitle = function (subprojects, checksStatusLookup) {
    var _a, _b;
    var report = (0, exports.generateProgressReport)(subprojects, checksStatusLookup);
    var message = "Failed (".concat((_a = report.completed) === null || _a === void 0 ? void 0 : _a.length, "/").concat((_b = report.expected) === null || _b === void 0 ? void 0 : _b.length, ")");
    return message;
};
exports.generateFailingTitle = generateFailingTitle;
/**
 * Generate the title for the successful check.
 *
 * @param subprojects The matching subprojects.
 * @param checksStatusLookup The posted check status.
 */
var generateSuccessTitle = function (subprojects, checksStatusLookup) {
    var _a, _b;
    var report = (0, exports.generateProgressReport)(subprojects, checksStatusLookup);
    var message = "Completed (".concat((_a = report.completed) === null || _a === void 0 ? void 0 : _a.length, "/").concat((_b = report.expected) === null || _b === void 0 ? void 0 : _b.length, ")");
    return message;
};
exports.generateSuccessTitle = generateSuccessTitle;
var generateProgressSummary = function (subprojects, checksStatusLookup) {
    var _a, _b;
    var report = (0, exports.generateProgressReport)(subprojects, checksStatusLookup);
    var message = "Progress: ".concat((_a = report.completed) === null || _a === void 0 ? void 0 : _a.length, " completed, ").concat((_b = report.running) === null || _b === void 0 ? void 0 : _b.length, " pending");
    return message;
};
exports.generateProgressSummary = generateProgressSummary;
var statusToMark = function (check, checksStatusLookup, config) {
    // TODO(@tianhaoz95): come up with better way to deal with dev and prod discrepancies.
    if (check === config_1.defaultCheckId || check == config.customServiceName) {
        return "Yep, that's me :cat:";
    }
    if (check in checksStatusLookup) {
        /* eslint-disable security/detect-object-injection */
        if (checksStatusLookup[check] == "success") {
            return ":heavy_check_mark:";
        }
        if (checksStatusLookup[check] == "failure") {
            return ":x:";
        }
        /* eslint-enable security/detect-object-injection */
    }
    else {
        return ":hourglass:";
    }
    return ":interrobang:";
};
exports.statusToMark = statusToMark;
/**
 * Generates a progress report for currently finished checks
 * which will be posted in the status check report.
 *
 * @param subprojects The subprojects that the PR matches.
 * @param checksStatusLookup The lookup table for checks status.
 */
var generateProgressDetails = function (subprojects, checksStatusLookup, config) {
    var progress = "";
    progress += "## Progress by sub-projects\n\n";
    subprojects.forEach(function (subproject) {
        progress += "### Summary for sub-project ".concat(subproject.id, "\n\n");
        progress += "| Project Name | Current Status |\n";
        progress += "| ------------ | -------------- |\n";
        subproject.checks.forEach(function (check) {
            var mark = (0, exports.statusToMark)(check.id, checksStatusLookup, config);
            progress += "| ".concat(check.id, " | ").concat(mark, " |\n");
        });
        progress += "\n";
    });
    progress += "## Currently received checks\n\n";
    progress += "| Project Name | Current Status |\n";
    progress += "| ------------ | -------------- |\n";
    /* eslint-disable security/detect-object-injection */
    for (var availableCheck in checksStatusLookup) {
        progress += "| ".concat(availableCheck, " | ").concat((0, exports.statusToMark)(availableCheck, checksStatusLookup, config), " |\n");
    }
    progress += "\n";
    var minimumWarningCnt = 0;
    /* eslint-enable security/detect-object-injection */
    if (config.debugInfo.length > minimumWarningCnt) {
        progress += "## Found following issues\n\n";
        // TODO(@tianhaoz95): add the simplified debug info.
        for (var _i = 0, _a = config.debugInfo; _i < _a.length; _i++) {
            var debugInfo = _a[_i];
            progress += "* ".concat(debugInfo.configErrorMsg, "\n");
        }
    }
    return progress;
};
exports.generateProgressDetails = generateProgressDetails;
