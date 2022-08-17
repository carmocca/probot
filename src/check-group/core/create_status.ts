import * as core from "@actions/core";

/**
 * Creates a check in the pull request.
 *
 * @param conclusion The conclusion of the run.
 * @param status The status of the run.
 * @param summary The summary that shows up under the title.
 * @param details The details that shows up under the summary.
 */
export const createStatus = async (
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
): Promise<void> => {
  if (conclusion !== 'success') {
    core.setFailed(
      `${name} conclusion: ${conclusion}, status: ${status}\n${summary}\n${details}`
    )
  }
};
