"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Require your Probot app's entrypoint, usually this is just index.js
var index_1 = __importDefault(require("./index"));
// Require the adapter
var adapter_github_actions_1 = __importDefault(require("@probot/adapter-github-actions"));
// Adapt the Probot app for Actions
// This also acts as the main entrypoint for the Action
adapter_github_actions_1.default.run(index_1.default);
