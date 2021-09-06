var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import _ from 'lodash';
import { CustomInjectable } from '#shared/src/functions/process-providers';
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
        if (!_.isEmpty(options.startsWithTheseWords)) {
            toContain.push(`(${options.startsWithTheseWords
                .map(this.escapeRegExpIfStr.bind(this))
                .map((x) => x)
                .join('|')})`);
            toReturn += '^';
        }
        if (!_.isEmpty(options.containsTheseWords)) {
            toContain.push(`.*(${options.containsTheseWords
                .map(this.escapeRegExpIfStr.bind(this))
                .map((x) => x)
                .join('|')})`);
        }
        if (!_.isEmpty(options.endsWithTheseWords)) {
            toContain.push(`.*(${options.endsWithTheseWords
                .map(this.escapeRegExpIfStr.bind(this))
                .map((x) => x + '$')
                .join('|')})`);
        }
        if (!_.isEmpty(toContain)) {
            toReturn += /(?=A)/.source.replace('A', toContain.join(''));
        }
        const notToContain = [];
        if (!_.isEmpty(options.doesNotStartWithTheseWords)) {
            notToContain.push(`(${options.doesNotStartWithTheseWords
                .map(this.escapeRegExpIfStr.bind(this))
                .map((x) => x)
                .join('|')})`);
            toReturn += '^';
        }
        if (!_.isEmpty(options.doesNotContainTheseWords)) {
            notToContain.push(`.*(${options.doesNotContainTheseWords
                .map(this.escapeRegExpIfStr.bind(this))
                .map((x) => x)
                .join('|')})`);
        }
        if (!_.isEmpty(options.doesNotEndsWithTheseWords)) {
            notToContain.push(`.*(${options.doesNotEndsWithTheseWords
                .map(this.escapeRegExpIfStr.bind(this))
                .map((x) => x + '$')
                .join('|')})`);
        }
        if (!_.isEmpty(notToContain)) {
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
    CustomInjectable()
], RegexService);
export { RegexService };
//# sourceMappingURL=regex.service.js.map