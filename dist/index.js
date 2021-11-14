"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var source_map_support_1 = require("source-map-support");
var auto_cc_bot_1 = __importDefault(require("./auto-cc-bot"));
// Needed for traceback translation from transpiled javascript -> typescript
source_map_support_1.install();
function runBot(app) {
    auto_cc_bot_1.default(app);
    // @carmocca: disable the auto-label feature
    // autoLabelBot(app);
}
module.exports = runBot;
