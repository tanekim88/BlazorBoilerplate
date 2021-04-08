"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegexService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const process_webpack_providers_1 = require("@shared/src/functions/process-webpack-providers");
let RegexService = class RegexService {
    escapeRegExp(string) {
        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }
    escapeRegExpIfStr(arg) {
        if (arg instanceof RegExp) {
            return arg;
        }
        return this.escapeRegExp(arg);
    }
    generateRegex(options) {
        let toReturn = '';
        const toContain = [];
        if (!lodash_1.default.isEmpty(options.startsWithTheseWords)) {
            toContain.push(`(${options.startsWithTheseWords
                .map(this.escapeRegExpIfStr.bind(this))
                .map((x) => x)
                .join('|')})`);
            toReturn += '^';
        }
        if (!lodash_1.default.isEmpty(options.containsTheseWords)) {
            toContain.push(`.*(${options.containsTheseWords
                .map(this.escapeRegExpIfStr.bind(this))
                .map((x) => x)
                .join('|')})`);
        }
        if (!lodash_1.default.isEmpty(options.endsWithTheseWords)) {
            toContain.push(`.*(${options.endsWithTheseWords
                .map(this.escapeRegExpIfStr.bind(this))
                .map((x) => x + '$')
                .join('|')})`);
        }
        if (!lodash_1.default.isEmpty(toContain)) {
            toReturn += /(?=A)/.source.replace('A', toContain.join(''));
        }
        const notToContain = [];
        if (!lodash_1.default.isEmpty(options.doesNotStartWithTheseWords)) {
            notToContain.push(`(${options.doesNotStartWithTheseWords
                .map(this.escapeRegExpIfStr.bind(this))
                .map((x) => x)
                .join('|')})`);
            toReturn += '^';
        }
        if (!lodash_1.default.isEmpty(options.doesNotContainTheseWords)) {
            notToContain.push(`.*(${options.doesNotContainTheseWords
                .map(this.escapeRegExpIfStr.bind(this))
                .map((x) => x)
                .join('|')})`);
        }
        if (!lodash_1.default.isEmpty(options.doesNotEndsWithTheseWords)) {
            notToContain.push(`.*(${options.doesNotEndsWithTheseWords
                .map(this.escapeRegExpIfStr.bind(this))
                .map((x) => x + '$')
                .join('|')})`);
        }
        if (!lodash_1.default.isEmpty(notToContain)) {
            toReturn += /(?!A)/.source.replace('A', notToContain.join('|'));
        }
        let flags = '';
        if (options.caseInsensitive) {
            flags += 'i';
        }
        // console.dir(new RegExp(toReturn, flags));
        return new RegExp(toReturn, flags);
    }
};
RegexService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], RegexService);
exports.RegexService = RegexService;
//# sourceMappingURL=regex.service.js.map