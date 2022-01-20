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
exports.searchAndFillAllBulasAndFispq = void 0;
var puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
var puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
var user_agents_1 = __importDefault(require("user-agents"));
var fs_1 = __importDefault(require("fs"));
var searchAndFillAllBulasAndFispq = function (products) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('Launching puppeteer... ');
        puppeteer_extra_1.default
            .use((0, puppeteer_extra_plugin_stealth_1.default)())
            .launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars',
                '--window-position=0,0',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list'
            ],
            ignoreHTTPSErrors: true,
            headless: false
        })
            .then(function (instance) { return __awaiter(void 0, void 0, void 0, function () {
            var browser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        browser = instance;
                        return [4 /*yield*/, browser.pages()
                                .then(function (pages) { return __awaiter(void 0, void 0, void 0, function () {
                                var page, finalSearchResult, i, nameProduct, formatedName, bulaUrl, fispqUrl, formatResult, finalDataResult;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            page = pages[0];
                                            finalSearchResult = [];
                                            i = 0;
                                            _b.label = 1;
                                        case 1:
                                            if (!(i < 3)) return [3 /*break*/, 10];
                                            nameProduct = products[i].NOME_PROD;
                                            if (!nameProduct) return [3 /*break*/, 9];
                                            formatedName = nameProduct.replace(' ', '+');
                                            return [4 /*yield*/, page.setUserAgent(user_agents_1.default.toString())];
                                        case 2:
                                            _b.sent();
                                            console.log("".concat(i + 1, " de ").concat(products.length, " - Searching for ").concat(nameProduct, " "));
                                            return [4 /*yield*/, page.goto("https://duckduckgo.com/?q=".concat(formatedName, "+bula+pdf&kl=br-pt&k1=-1"))];
                                        case 3:
                                            _b.sent();
                                            return [4 /*yield*/, page.waitForSelector('.result__body', { visible: true })];
                                        case 4:
                                            _b.sent();
                                            return [4 /*yield*/, page.$$eval('a[data-testid="result-title-a"]', function (as) { return as.map(function (a) { return a.getAttribute('href'); }); })];
                                        case 5:
                                            bulaUrl = _b.sent();
                                            return [4 /*yield*/, page.goto("https://duckduckgo.com/?q=".concat(formatedName, "+fispq+pdf&kl=br-pt&k1=-1"))];
                                        case 6:
                                            _b.sent();
                                            return [4 /*yield*/, page.waitForSelector('.result__body', { visible: true })];
                                        case 7:
                                            _b.sent();
                                            return [4 /*yield*/, page.$$eval('a[data-testid="result-title-a"]', function (as) { return as.map(function (a) { return a.getAttribute('href'); }); })];
                                        case 8:
                                            fispqUrl = _b.sent();
                                            formatResult = {
                                                cod: (_a = products[i]) === null || _a === void 0 ? void 0 : _a.COD_PROD,
                                                name: nameProduct,
                                                bulaSearchResult: bulaUrl[0],
                                                fispqSearchResult: fispqUrl[0]
                                            };
                                            finalSearchResult.push(formatResult);
                                            _b.label = 9;
                                        case 9:
                                            i++;
                                            return [3 /*break*/, 1];
                                        case 10:
                                            finalDataResult = JSON.stringify({ finalSearchResult: finalSearchResult });
                                            fs_1.default.writeFile('finalSearchResult.json', finalDataResult, function (err) {
                                                if (err) {
                                                    throw err;
                                                }
                                                console.log('JSON data is saved.');
                                            });
                                            browser.close();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })
                                .catch(function (error) {
                                console.log('Something went wrong during browser.pages: ', error);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })
            .catch(function (error) {
            console.log('Something went wrong during puppeteer.launch: ', error);
        });
        return [2 /*return*/];
    });
}); };
exports.searchAndFillAllBulasAndFispq = searchAndFillAllBulasAndFispq;
