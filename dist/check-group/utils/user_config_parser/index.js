"use strict";
/**
 * The user config parser utilities
 * @module UserConfigParserUtils
 */
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-enable @typescript-eslint/no-unused-vars */
var default_config_1 = require("./default_config");
var populate_custom_service_name_1 = require("./populate_custom_service_name");
var populate_subprojects_1 = require("./populate_subprojects");
/**
 * Parses the typed configuration from the raw
 * configuration object read from the yaml file
 * in the user repository.
 *
 * @param configData The raw configuration data.
 * @returns The typed configuration.
 */
exports.parseUserConfig = function (configData) {
    var defaultConfig = default_config_1.getDefaultConfig();
    try {
        var config = defaultConfig;
        populate_subprojects_1.populateSubprojects(configData, config);
        populate_custom_service_name_1.populateCustomServiceName(configData, config);
        return config;
    }
    catch (_a) {
        return defaultConfig;
    }
};
