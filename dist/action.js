"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Require the adapter
var run = require('@probot/adapter-github-actions').run;
// Require your Probot app's entrypoint, usually this is just index.js
var index_1 = __importDefault(require("./index"));
// Adapt the Probot app for Actions
// This also acts as the main entrypoint for the Action
run(index_1.default);
