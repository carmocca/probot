"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auto_cc_bot_1 = __importDefault(require("./auto-cc-bot"));
function botSteps(app) {
    auto_cc_bot_1.default(app);
    // @carmocca: disable the auto-label feature
    // autoLabelBot(app);
}
exports.default = botSteps;
