"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadPDF = exports.generateSearchResultJSON = exports.getUrlFromDuckDuckGoSearch = void 0;
var fs_1 = __importDefault(require("fs"));
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var DocumentType_1 = require("../../models/DocumentType");
var selectToWait = '.result__body';
var selectorResult = 'a[data-testid="result-title-a"]';
var getUrlFromDuckDuckGoSearch = function (page, productName, documentToSearch) { return __awaiter(void 0, void 0, void 0, function () {
    var formatedName, searchUrl, resultURL;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formatedName = productName.replace(' ', '+');
                searchUrl = "https://duckduckgo.com/?q=".concat(formatedName, "+").concat(documentToSearch, "+pdf&kl=br-pt&k1=-1");
                return [4 /*yield*/, page.goto(searchUrl)];
            case 1:
                _a.sent();
                return [4 /*yield*/, page.waitForSelector(selectToWait, { visible: true })];
            case 2:
                _a.sent();
                return [4 /*yield*/, page.$$eval(selectorResult, function (as) { return as.map(function (a) { return a.getAttribute('href'); }); })];
            case 3:
                resultURL = _a.sent();
                return [2 /*return*/, resultURL];
        }
    });
}); };
exports.getUrlFromDuckDuckGoSearch = getUrlFromDuckDuckGoSearch;
var generateSearchResultJSON = function (finalSearchResult) { return __awaiter(void 0, void 0, void 0, function () {
    var finalDataResult;
    return __generator(this, function (_a) {
        finalDataResult = JSON.stringify({ finalSearchResult: finalSearchResult });
        fs_1.default.writeFile('searchResult.json', finalDataResult, function (err) {
            if (err) {
                throw err;
            }
            console.log('JSON data is saved.');
        });
        return [2 /*return*/];
    });
}); };
exports.generateSearchResultJSON = generateSearchResultJSON;
var downloadPDF = function (searchResult, documentType) { return __awaiter(void 0, void 0, void 0, function () {
    var path, fileName, fileStream, pdfURL;
    return __generator(this, function (_a) {
        path = documentType === DocumentType_1.DocumentType.BULA ? './data/bulas' : './data/fispqs';
        fileName = documentType === DocumentType_1.DocumentType.BULA ? "".concat(searchResult.cod, "_1.pdf") : "".concat(searchResult.cod, "_2.pdf");
        fileStream = fs_1.default.createWriteStream("".concat(path, "/").concat(fileName));
        pdfURL = documentType === DocumentType_1.DocumentType.BULA ? searchResult.bulaSearchResult : searchResult.fispqSearchResult;
        if (pdfURL && pdfURL.includes('.pdf')) {
            if (pdfURL.includes('https://')) {
                https_1.default.get(pdfURL, function (response) {
                    response.pipe(fileStream);
                }).on('error', function (err) {
                    console.log("Download failed for: ".concat(documentType, " ").concat(searchResult.cod, "  ").concat(searchResult.name, ": "), err);
                }).on('finish', function () {
                    console.log("Download process finished for: ".concat(documentType, " ").concat(searchResult.cod, "  ").concat(searchResult.name));
                });
            }
            else {
                http_1.default.get(pdfURL, function (response) {
                    response.pipe(fileStream);
                }).on('error', function (err) {
                    console.log("Download failed for: ".concat(documentType, " ").concat(searchResult.cod, "  ").concat(searchResult.name, ": "), err);
                }).on('finish', function () {
                    console.log("Download process finished for: ".concat(documentType, " ").concat(searchResult.cod, "  ").concat(searchResult.name));
                });
            }
        }
        else {
            console.log("Cannot download PDF for ".concat(searchResult.name, ": ").concat(documentType, " .pdf URL is not available"));
        }
        return [2 /*return*/];
    });
}); };
exports.downloadPDF = downloadPDF;
