import type { Context } from "probot";

export const createStatus = async (
  context: Context,
  conclusion:
    | "success"
    | "failure"
    | "neutral"
    | "cancelled"
    | "timed_out"
    | "action_required"
    | undefined,
  status: "in_progress" | "completed" | "queued",
  name: string,
  summary: string,
  details: string,
  sha: string,
): Promise<void> => {
  context.log.info(
    `${name} conclusion: ${conclusion}, status: ${status}\n${summary}\n${details}`
  )
  context.octokit.rest.repos.createCommitStatus({
    ...context.repo(),
    sha,
    state: conclusion === 'success' ? 'success' : 'failure',
    context: name,
    target_url: `${process.env['GITHUB_SERVER_URL']}/${process.env['GITHUB_REPOSITORY']}/actions/runs/${process.env['GITHUB_RUN_ID']}`,
    description: summary
  })
};
