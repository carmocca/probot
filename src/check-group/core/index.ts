/**
 * @module Core
 */

import {
  generateProgressDetails,
  generateProgressSummary,
} from "../utils";
import * as core from '@actions/core'
import type { CheckGroupConfig } from "../types";
import type { Context } from "probot";
import { fetchConfig } from "./config_getter";
import { matchFilenamesToSubprojects } from "../utils";
import { satisfyExpectedChecks } from "../utils";

/**
 * The orchestration class.
 */
export class CheckGroup {
  pullRequestNumber: number;
  config: CheckGroupConfig;
  context: Context;
  sha: string;

  constructor(
    pullRequestNumber: number,
    config: CheckGroupConfig,
    context: Context,
    sha: string,
  ) {
    this.pullRequestNumber = pullRequestNumber;
    this.config = config;
    this.context = context;
    this.sha = sha;
  }

  async run(): Promise<void> {
    const filenames = await this.files();
    const log = this.context.log
    const config = this.config

    log.info(`Files are: ${JSON.stringify(filenames)}`);
    const subprojs = matchFilenamesToSubprojects(filenames, config.subProjects);
    log.info(`Matching subprojects are: ${JSON.stringify(subprojs)}`);

    let tries = 0;
    let conclusion = undefined;
    // cannot access `this` inside
    const getPostedChecks = this.getPostedChecks
    const serviceName = this.config.customServiceName

    // IMPORTANT: a timeout should be set in the action workflow
    const loop = setInterval(
      async function() {
        try {
          if (conclusion === "success") {
            log.info("Required checks were successful!")
            clearInterval(loop)
          }
          tries += 1;
          const postedChecks = await getPostedChecks();
          log.info(`Posted checks are: ${JSON.stringify(postedChecks)}`);
          conclusion = satisfyExpectedChecks(subprojs, postedChecks);
          const summary = generateProgressSummary(subprojs, postedChecks)
          const details = generateProgressDetails(subprojs, postedChecks, config)
          log.info(
            `${serviceName} conclusion: ${conclusion} after ${tries} tries:\n${summary}\n${details}`
          )
        } catch (error) {
          core.setFailed(JSON.stringify(error));
        }
      }, 2 * 60 * 1000  // 2 minutes in ms
    )
  }

  /**
   * Fetches a list of already finished
   * checks.
   */
  async getPostedChecks(): Promise<Record<string, string>> {
    const checkRuns = await this.context.octokit.paginate(
      this.context.octokit.checks.listForRef,
      this.context.repo({
        ref: this.sha,
      }),
      (response) => response.data,
    );
    const checkNames: Record<string, string> = {};
    checkRuns.forEach(
      (
        /* eslint-disable */
        checkRun: any,
        /* eslint-enable */
      ) => {
        const conclusion = checkRun.conclusion
          ? checkRun.conclusion
          : "pending";
        checkNames[checkRun.name] = conclusion;
      },
    );
    return checkNames;
  }

  /**
   * Gets a list of files that are modified in
   * a pull request.
   */
  async files(): Promise<string[]> {
    const pullRequestFiles = await this.context.octokit.paginate(
      this.context.octokit.pulls.listFiles,
      this.context.repo({
        "pull_number": this.pullRequestNumber,
      }),
      (response) => response.data,
    );
    const filenames: string[] = [];
    pullRequestFiles.forEach(
      (
        /* eslint-disable */
        pullRequestFile: any,
        /* eslint-enable */
      ) => {
        filenames.push(pullRequestFile.filename);
      },
    );
    return filenames;
  }
}

export {fetchConfig};
