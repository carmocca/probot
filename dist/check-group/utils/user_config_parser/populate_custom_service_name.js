"use strict";
/**
 * @module PopulateCustomServiceName
 */
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../../config");
/**
 * Parse the custom service name from the user
 * configuration if present.
 * @param {Record<string, unknown>} configData
 * @param {CheckGroupConfig} config
 **/
function populateCustomServiceName(configData, config) {
    if ("custom_service_name" in configData) {
        config.customServiceName = configData["custom_service_name"];
    }
    else {
        config.customServiceName = config_1.defaultCheckId;
    }
}
exports.populateCustomServiceName = populateCustomServiceName;
