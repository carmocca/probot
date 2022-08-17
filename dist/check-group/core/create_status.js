"use strict";
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
/* eslint-enable @typescript-eslint/no-unused-vars */
var http_status_codes_1 = require("http-status-codes");
/**
 * Creates a check in the pull request.
 *
 * @param context The request context from Probot core.
 * @param conclusion The conclusion of the run.
 * @param status The status of the run.
 * @param title The title that shows up when user clicks on the check.
 * @param summary The summary that shows up under the title.
 * @param details The details that shows up under the summary.
 * @param startTime The string time that the run started.
 */
exports.createStatus = function (context, conclusion, status, name, title, summary, details, startTime, sha) { return __awaiter(void 0, void 0, void 0, function () {
    var completedAt, startedAt, statusOptions, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                completedAt = conclusion
                    ? new Date().toISOString()
                    : undefined;
                startedAt = status === "queued" ? undefined : startTime;
                statusOptions = context.repo({
                    "completed_at": completedAt,
                    conclusion: conclusion,
                    "head_sha": sha,
                    "name": name,
                    "output": {
                        summary: summary,
                        "text": details,
                        title: title,
                    },
                    "request": {
                        "retries": 3,
                        "retryAfter": 3,
                    },
                    "started_at": startedAt,
                    status: status,
                });
                context.log.info("Create " + status + " status with conclusion " + conclusion + " for sha " + sha);
                return [4 /*yield*/, context.octokit.checks.create(statusOptions)];
            case 1:
                response = _a.sent();
                context.log.info("Create status finished with status " + response.status);
                if (response.status !== http_status_codes_1.StatusCodes.CREATED) {
                    context.log.error("Create passing status failed with status " + response.status + " and error: " + JSON.stringify(response.data));
                }
                return [2 /*return*/];
        }
    });
}); };
