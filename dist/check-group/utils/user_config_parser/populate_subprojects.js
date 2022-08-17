"use strict";
/**
 * @module PopulateSubProjects
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Parses the structured ID into sub-project data from the raw user config.
 *
 * The ID is required for the sub-project since it is hard to give the user
 * any useful information for debugging if the ID that is used to identify the
 * location of the issue is missing. In this case, it will be better to bail.
 *
 * @param subprojData The raw data from the config file.
 * @param subprojConfig The structured data for the sub-project.
 */
function parseProjectId(subprojData, subprojConfig) {
    if ("id" in subprojData) {
        subprojConfig.id = subprojData["id"];
    }
    else {
        throw Error("Essential field missing from config: sub-project ID");
    }
}
exports.parseProjectId = parseProjectId;
function parseProjectPaths(subprojData, subprojConfig, config) {
    if ("paths" in subprojData && subprojData["paths"] !== null) {
        var projPaths_1 = [];
        var locations = subprojData["paths"];
        locations.forEach(function (loc) {
            projPaths_1.push({
                location: loc,
            });
        });
        var minPathCnt = 0;
        if (projPaths_1.length > minPathCnt) {
            subprojConfig.paths = projPaths_1;
        }
        else {
            config.debugInfo.push({
                configError: true,
                configErrorMsg: "Paths is empty.",
            });
        }
    }
    else {
        config.debugInfo.push({
            configError: true,
            configErrorMsg: ":warning: Essential fields missing from config for project " + subprojConfig.id + ": paths",
        });
    }
}
exports.parseProjectPaths = parseProjectPaths;
function parseProjectChecks(subprojData, subprojConfig, config) {
    if ("checks" in subprojData && subprojData["checks"] !== null) {
        var projChecks_1 = [];
        var checksData = subprojData["checks"];
        checksData.forEach(function (checkId) {
            projChecks_1.push({
                id: checkId,
            });
        });
        var minPathCnt = 0;
        if (projChecks_1.length > minPathCnt) {
            subprojConfig.checks = projChecks_1;
        }
        else {
            config.debugInfo.push({
                configError: true,
                configErrorMsg: "Checks is empty.",
            });
        }
    }
    else {
        config.debugInfo.push({
            configError: true,
            configErrorMsg: ":warning: Essential fields missing from config for project " + subprojConfig.id + ": checks",
        });
    }
}
exports.parseProjectChecks = parseProjectChecks;
/**
 * Parse user config file and populate subprojects
 * @param {Record<string, unknown>} configData
 * @param {CheckGroupConfig} config
 **/
function populateSubprojects(configData, config) {
    if ("subprojects" in configData) {
        var subProjectsData = configData["subprojects"];
        subProjectsData.forEach(function (subprojData) {
            var subprojConfig = {
                checks: [],
                id: "Unknown",
                paths: [],
            };
            try {
                parseProjectId(subprojData, subprojConfig);
                parseProjectPaths(subprojData, subprojConfig, config);
                parseProjectChecks(subprojData, subprojConfig, config);
                config.subProjects.push(subprojConfig);
            }
            catch (err) {
                config.debugInfo.push({
                    configError: true,
                    configErrorMsg: "Error adding sub-project from data:\n " + JSON.stringify(subprojData),
                });
            }
        });
    }
    else {
        throw Error("subprojects not found in the user configuration file");
    }
}
exports.populateSubprojects = populateSubprojects;
