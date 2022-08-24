import { CheckGroupConfig } from "../types";
import { configPath } from "../config";
import { Context } from "probot";
import { parseUserConfig } from "../utils";

/**
 * Fetches the app configuration from the user's repository.
 *
 * @param context The base Probot context which is even independent.
 * @returns The configuration or default configuration if non exists.
 */
export const fetchConfig = async (
  context: Context<"check_run"> | Context<"pull_request">,
): Promise<CheckGroupConfig> => {
  const configData: Record<string, unknown> = (await context.config(
    configPath,
  )) as Record<string, unknown>;
  return parseUserConfig(configData);
};
