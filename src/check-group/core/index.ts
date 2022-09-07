/**
 * @module Core
 */

import {
  generateProgressDetails,
  generateProgressSummary,
} from "../utils";
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
    this.context.log.info(`Files are: ${JSON.stringify(filenames)}`);
    const subprojs = matchFilenamesToSubprojects(
      filenames,
      this.config.subProjects,
    );
    this.context.log.info(`Matching subprojects are: ${JSON.stringify(subprojs)}`);

    let tries = 0;
    let conclusion = undefined;
    // IMPORTANT: a timeout should be set in the action workflow
    const loop = setInterval(
      async function() {
        if (conclusion === "success") {
          clearInterval(loop)
        }
        tries += 1;
        const postedChecks = await this.getPostedChecks(this.sha);
        this.context.log.info(`Posted checks are: ${JSON.stringify(postedChecks)}`);
        conclusion = satisfyExpectedChecks(subprojs, postedChecks);
        const summary = generateProgressSummary(subprojs, postedChecks)
        const details = generateProgressDetails(subprojs, postedChecks, this.config)
        this.context.log.info(
          `${this.config.customServiceName} conclusion: ${conclusion} after ${tries} tries:\n${summary}\n${details}`
        )
      }, 2 * 60 * 1000  // 2 minutes in ms
    )
    this.context.log.info("Required checks were successful!")
  }

  /**
   * Fetches a list of already finished
   * checks.
   *
   * @param sha The sha of the commit to check
   */
  async getPostedChecks(sha: string): Promise<Record<string, string>> {
    this.context.log.info(`Fetch posted check runs for ${sha}`);
    const checkRuns = await this.context.octokit.paginate(
      this.context.octokit.checks.listForRef,
      this.context.repo({
        ref: sha,
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
