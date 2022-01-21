"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
var downloadPDFs_1 = require("./methods/downloadPDFs");
var generateSearchJSON_1 = require("./methods/generateSearchJSON");
exports.bot = {
    generateSearchJSON: function (products) { return (0, generateSearchJSON_1.generateSearchJSON)(products); },
    downloadPDFs: function () { return (0, downloadPDFs_1.downloadPDFs)(); }
};
