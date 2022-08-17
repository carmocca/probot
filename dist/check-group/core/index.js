"use strict";
/**
 * @module Core
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPullRequestsFromCheckRunContext = exports.extractShaFromCheckRunContext = exports.parsePullRequestNumbersFromCheckRunContext = exports.parsePullRequestNumberFromPullRequestContext = exports.extractShaFromPullRequestContext = exports.fetchConfig = exports.CheckGroup = void 0;
var config_1 = require("../config");
var sha_getter_1 = require("./sha_getter");
Object.defineProperty(exports, "extractShaFromCheckRunContext", { enumerable: true, get: function () { return sha_getter_1.extractShaFromCheckRunContext; } });
Object.defineProperty(exports, "extractShaFromPullRequestContext", { enumerable: true, get: function () { return sha_getter_1.extractShaFromPullRequestContext; } });
var utils_1 = require("../utils");
var pull_number_getter_1 = require("./pull_number_getter");
Object.defineProperty(exports, "parsePullRequestNumberFromPullRequestContext", { enumerable: true, get: function () { return pull_number_getter_1.parsePullRequestNumberFromPullRequestContext; } });
Object.defineProperty(exports, "parsePullRequestNumbersFromCheckRunContext", { enumerable: true, get: function () { return pull_number_getter_1.parsePullRequestNumbersFromCheckRunContext; } });
var create_status_1 = require("./create_status");
var pull_getter_1 = require("./pull_getter");
Object.defineProperty(exports, "extractPullRequestsFromCheckRunContext", { enumerable: true, get: function () { return pull_getter_1.extractPullRequestsFromCheckRunContext; } });
var config_getter_1 = require("./config_getter");
Object.defineProperty(exports, "fetchConfig", { enumerable: true, get: function () { return config_getter_1.fetchConfig; } });
var utils_2 = require("../utils");
var utils_3 = require("../utils");
/**
 * The orchestration class.
 */
var CheckGroup = /** @class */ (function () {
    function CheckGroup(pullRequestNumber, config, context, sha) {
        this.pullRequestNumber = pullRequestNumber;
        this.config = config;
        this.context = context;
        this.sha = sha;
    }
    CheckGroup.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var filenames, subprojs, postedChecks, conclusion, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 13]);
                        return [4 /*yield*/, this.files()];
                    case 1:
                        filenames = _b.sent();
                        this.context.log.info("Files are: ".concat(JSON.stringify(filenames)));
                        subprojs = (0, utils_2.matchFilenamesToSubprojects)(filenames, this.config.subProjects);
                        this.context.log.info("Matching subprojects are: ".concat(JSON.stringify(subprojs)));
                        return [4 /*yield*/, this.getPostedChecks(this.sha)];
                    case 2:
                        postedChecks = _b.sent();
                        this.context.log.info("Posted checks are: ".concat(JSON.stringify(postedChecks)));
                        conclusion = (0, utils_3.satisfyExpectedChecks)(subprojs, postedChecks);
                        if (!!(config_1.defaultCheckId in postedChecks)) return [3 /*break*/, 4];
                        this.context.log.info("First time run. Post starting check.");
                        return [4 /*yield*/, this.postStartingCheck(this.config.customServiceName, config_1.startCheckSummary, config_1.startCheckDetails)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!(conclusion === "all_passing")) return [3 /*break*/, 6];
                        this.context.log.info("All expected checks passed.");
                        return [4 /*yield*/, this.postPassingCheck(this.config.customServiceName, (0, utils_1.generateProgressSummary)(subprojs, postedChecks), (0, utils_1.generateProgressDetails)(subprojs, postedChecks, this.config))];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 6:
                        if (!(conclusion === "has_failure")) return [3 /*break*/, 8];
                        this.context.log.info("Some of the expected checks failed.");
                        return [4 /*yield*/, this.postFailingCheck(this.config.customServiceName, (0, utils_1.generateProgressSummary)(subprojs, postedChecks), (0, utils_1.generateProgressDetails)(subprojs, postedChecks, this.config))];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        this.context.log.info("Expected checks are still pending.");
                        return [4 /*yield*/, this.postUpdatingCheck(this.config.customServiceName, (0, utils_1.generateProgressSummary)(subprojs, postedChecks), (0, utils_1.generateProgressDetails)(subprojs, postedChecks, this.config))];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        _a = _b.sent();
                        this.context.log.info("The app crashed.");
                        // TODO(@tianhaoz95): Add a better error message. Consider using
                        // markdown import suggested by
                        // https://stackoverflow.com/questions/44678315/how-to-import-markdown-md-file-in-typescript
                        return [4 /*yield*/, this.postFailingCheck(this.config.customServiceName, config_1.errorCheckSummary, config_1.errorCheckDetails)];
                    case 12:
                        // TODO(@tianhaoz95): Add a better error message. Consider using
                        // markdown import suggested by
                        // https://stackoverflow.com/questions/44678315/how-to-import-markdown-md-file-in-typescript
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches a list of already finished
     * checks.
     *
     * @param sha The sha of the commit to check
     */
    CheckGroup.prototype.getPostedChecks = function (sha) {
        return __awaiter(this, void 0, void 0, function () {
            var checkRuns, checkNames;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.context.log.info("Fetch posted check runs for ".concat(sha));
                        return [4 /*yield*/, this.context.octokit.paginate(this.context.octokit.checks.listForRef, this.context.repo({
                                ref: sha,
                            }), function (response) { return response.data; })];
                    case 1:
                        checkRuns = _a.sent();
                        checkNames = {};
                        checkRuns.forEach(function (
                        /* eslint-disable */
                        checkRun) {
                            var conclusion = checkRun.conclusion
                                ? checkRun.conclusion
                                : "pending";
                            checkNames[checkRun.name] = conclusion;
                        });
                        return [2 /*return*/, checkNames];
                }
            });
        });
    };
    /**
     * Gets a list of files that are modified in
     * a pull request.
     */
    CheckGroup.prototype.files = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pullRequestFiles, filenames;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.context.octokit.paginate(this.context.octokit.pulls.listFiles, this.context.repo({
                            "pull_number": this.pullRequestNumber,
                        }), function (response) { return response.data; })];
                    case 1:
                        pullRequestFiles = _a.sent();
                        filenames = [];
                        pullRequestFiles.forEach(function (
                        /* eslint-disable */
                        pullRequestFile) {
                            filenames.push(pullRequestFile.filename);
                        });
                        return [2 /*return*/, filenames];
                }
            });
        });
    };
    /**
     * Post a starting check
     */
    CheckGroup.prototype.postStartingCheck = function (name, summary, details) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /* eslint-disable */
                    return [4 /*yield*/, (0, create_status_1.createStatus)(undefined, "queued", name, summary, details)];
                    case 1:
                        /* eslint-disable */
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CheckGroup.prototype.postUpdatingCheck = function (name, summary, details) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /* eslint-disable */
                    return [4 /*yield*/, (0, create_status_1.createStatus)(undefined, "in_progress", name, summary, details)];
                    case 1:
                        /* eslint-disable */
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CheckGroup.prototype.postPassingCheck = function (name, summary, details) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /* eslint-disable */
                    return [4 /*yield*/, (0, create_status_1.createStatus)("success", "completed", name, summary, details)];
                    case 1:
                        /* eslint-disable */
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CheckGroup.prototype.postFailingCheck = function (name, summary, details) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /* eslint-disable */
                    return [4 /*yield*/, (0, create_status_1.createStatus)("failure", "completed", name, summary, details)];
                    case 1:
                        /* eslint-disable */
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CheckGroup;
}());
exports.CheckGroup = CheckGroup;
