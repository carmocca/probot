"use strict";
/**
 * GitHub webhook event handlers
 * @module Handlers
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
exports.checkRunEventHandler = exports.pullRequestEventHandler = void 0;
var core_1 = require("./core");
var trigger_filter_1 = require("./core/trigger_filter");
var pullRequestEventHandler = function (context) { return __awaiter(void 0, void 0, void 0, function () {
    var startTime, sha, config, pullRequestNumber, core;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                context.log.info('Pull request open/reopen event detected');
                startTime = new Date().toISOString();
                sha = (0, core_1.extractShaFromPullRequestContext)(context);
                return [4 /*yield*/, (0, core_1.fetchConfig)(context)];
            case 1:
                config = _a.sent();
                pullRequestNumber = (0, core_1.parsePullRequestNumberFromPullRequestContext)(context);
                core = new core_1.CheckGroup(pullRequestNumber, config, context, sha, startTime);
                return [4 /*yield*/, core.run()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.pullRequestEventHandler = pullRequestEventHandler;
var checkRunEventHandler = function (context) { return __awaiter(void 0, void 0, void 0, function () {
    var config, pullRequests, startTime, _i, pullRequests_1, pullRequest, core;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, core_1.fetchConfig)(context)];
            case 1:
                config = _a.sent();
                context.log.info("Check run event detected with ID ".concat(config.customServiceName));
                if ((0, trigger_filter_1.isTriggeredBySelf)(context, config)) {
                    return [2 /*return*/];
                }
                pullRequests = (0, core_1.extractPullRequestsFromCheckRunContext)(context);
                startTime = new Date().toISOString();
                _i = 0, pullRequests_1 = pullRequests;
                _a.label = 2;
            case 2:
                if (!(_i < pullRequests_1.length)) return [3 /*break*/, 5];
                pullRequest = pullRequests_1[_i];
                context.log.info("Check pull request #".concat(pullRequest.number, " and sha ").concat(pullRequest.sha, "."));
                core = new core_1.CheckGroup(pullRequest.number, config, context, pullRequest.sha, startTime);
                return [4 /*yield*/, core.run()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.checkRunEventHandler = checkRunEventHandler;
