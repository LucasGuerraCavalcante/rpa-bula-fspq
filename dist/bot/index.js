"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
var searchAndFillAllBulasAndFispq_1 = require("./methods/searchAndFillAllBulasAndFispq");
exports.bot = {
    searchAndFillAllBulasAndFispq: function (products) { return (0, searchAndFillAllBulasAndFispq_1.searchAndFillAllBulasAndFispq)(products); }
};
