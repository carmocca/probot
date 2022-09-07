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
    core.info(`Files are: ${JSON.stringify(filenames)}`);

    const subprojs = matchFilenamesToSubprojects(filenames, this.config.subProjects);
    core.info(`Matching subprojects are: ${JSON.stringify(subprojs)}`);

    const interval = parseInt(core.getInput('interval'))
    core.info(`Check interval: ${interval}`);
    
    let tries = 0;
    let conclusion = undefined;
    // IMPORTANT: a timeout should be set in the action workflow
    const loop = setInterval(
      async function(that) {
        try {
          if (conclusion === "success") {
            core.info("Required checks were successful!")
            clearInterval(loop)
          }
          tries += 1;

          const postedChecks = await getPostedChecks(that.context, that.sha);
          core.info(`Posted checks are: ${JSON.stringify(postedChecks)}`);

          conclusion = satisfyExpectedChecks(subprojs, postedChecks);
          const summary = generateProgressSummary(subprojs, postedChecks)
          const details = generateProgressDetails(subprojs, postedChecks, that.config)
          core.info(
            `${that.config.customServiceName} conclusion: ${conclusion} after ${tries} tries:\n${summary}\n${details}`
          )
        } catch (error) {
          core.setFailed(error);
          clearInterval(loop)
        }
      }, interval * 1000, this
    )
  }

  /**
   * Gets a list of files that are modified in
   * a pull request.
   */
  async files(): Promise<string[]> {
    const pullRequestFiles = await this.context.octokit.paginate(
      this.context.octokit.pulls.listFiles,
      this.context.repo({"pull_number": this.pullRequestNumber}),
      (response) => response.data,
    );
    const filenames: string[] = [];
    pullRequestFiles.forEach((pullRequestFile: any) => {
        filenames.push(pullRequestFile.filename);
      },
    );
    return filenames;
  }
}

export {fetchConfig};


/**
 * Fetches a list of already finished
 * checks.
 */
const getPostedChecks = async (context: Context, sha: string): Promise<Record<string, string>> => {
  const checkRuns = await context.octokit.paginate(
    context.octokit.checks.listForRef,
    context.repo({ref: sha}),
    (response) => response.data,
  );
  core.debug(`checkRuns: ${JSON.stringify(checkRuns)}`)
  const checkNames: Record<string, string> = {};
  checkRuns.forEach(
    (checkRun: any) => {
      const conclusion = checkRun.conclusion ? checkRun.conclusion : "pending";
      checkNames[checkRun.name] = conclusion;
    },
  );
  return checkNames;
}