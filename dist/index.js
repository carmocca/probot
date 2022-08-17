"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auto_cc_bot_1 = __importDefault(require("./auto-cc/auto-cc-bot"));
var index_1 = __importDefault(require("./check-group/index"));
function botSteps(app) {
    auto_cc_bot_1.default(app);
    index_1.default(app);
}
exports.default = botSteps;
