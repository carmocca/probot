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
var regexToLabel = [[/rocm/gi, 'module: rocm']];
function myBot(app) {
    var _this = this;
    function addLabel(labelSet, newLabels, l) {
        if (!labelSet.has(l)) {
            newLabels.push(l);
            labelSet.add(l);
        }
    }
    app.on('issues.labeled', function (context) { return __awaiter(_this, void 0, void 0, function () {
        var label, labels, labelSet, newLabels;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    label = context.payload['label']['name'];
                    labels = context.payload['issue']['labels'].map(function (e) { return e['name']; });
                    context.log({ label: label, labels: labels });
                    labelSet = new Set(labels);
                    newLabels = [];
                    // NB: Added labels here will trigger more issues.labeled actions,
                    // so be careful about accidentally adding a cycle.  With just label
                    // addition it's not possible to infinite loop as you will
                    // eventually quiesce, beware if you remove labels though!
                    switch (label) {
                        case 'high priority':
                        case 'critical':
                            addLabel(labelSet, newLabels, 'triage review');
                            break;
                        case 'module: flaky-tests':
                            addLabel(labelSet, newLabels, 'high priority');
                            addLabel(labelSet, newLabels, 'triage review');
                            break;
                    }
                    if (!newLabels.length) return [3 /*break*/, 2];
                    return [4 /*yield*/, context.octokit.issues.addLabels(context.issue({ labels: newLabels }))];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
    function addLabelsFromTitle(existingLabels, title, context) {
        return __awaiter(this, void 0, void 0, function () {
            var labelSet, newLabels, _i, regexToLabel_1, _a, regex, label;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        labelSet = new Set(existingLabels);
                        newLabels = [];
                        for (_i = 0, regexToLabel_1 = regexToLabel; _i < regexToLabel_1.length; _i++) {
                            _a = regexToLabel_1[_i], regex = _a[0], label = _a[1];
                            if (title.match(regex)) {
                                addLabel(labelSet, newLabels, label);
                            }
                        }
                        if (!newLabels.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, context.octokit.issues.addLabels(context.issue({ labels: newLabels }))];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    app.on(['issues.opened', 'issues.edited'], function (context) { return __awaiter(_this, void 0, void 0, function () {
        var labels, title;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    labels = context.payload['issue']['labels'].map(function (e) { return e['name']; });
                    title = context.payload['issue']['title'];
                    context.log({ labels: labels, title: title });
                    return [4 /*yield*/, addLabelsFromTitle(labels, title, context)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    app.on(['pull_request.opened', 'pull_request.edited'], function (context) { return __awaiter(_this, void 0, void 0, function () {
        var labels, title;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    labels = context.payload['pull_request']['labels'].map(function (e) { return e['name']; });
                    title = context.payload['pull_request']['title'];
                    context.log({ labels: labels, title: title });
                    return [4 /*yield*/, addLabelsFromTitle(labels, title, context)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.default = myBot;
