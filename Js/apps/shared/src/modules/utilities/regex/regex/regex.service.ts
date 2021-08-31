import _ from 'lodash';

import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class RegexService {
    escapeRegExp(string) {
        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    escapeRegExpIfStr(arg: string | RegExp) {
        if (arg instanceof RegExp) {
            return arg;
        }

        return this.escapeRegExp(arg);
    }

    generateRegex(options: {
        startsWithTheseWords?: string[];
        doesNotStartWithTheseWords?: string[];

        containsTheseWords?: string[];
        doesNotContainTheseWords?: string[];

        endsWithTheseWords?: string[];
        doesNotEndsWithTheseWords?: string[];

        caseInsensitive?: boolean;
    }) {
        let toReturn = '';

        const toContain = [];

        if (!_.isEmpty(options.startsWithTheseWords)) {
            toContain.push(
                `(${options.startsWithTheseWords
                    .map(this.escapeRegExpIfStr.bind(this))
                    .map((x) => x)
                    .join('|')})`,
            );

            toReturn += '^';
        }

        if (!_.isEmpty(options.containsTheseWords)) {
            toContain.push(
                `.*(${options.containsTheseWords
                    .map(this.escapeRegExpIfStr.bind(this))
                    .map((x) => x)
                    .join('|')})`,
            );
        }

        if (!_.isEmpty(options.endsWithTheseWords)) {
            toContain.push(
                `.*(${options.endsWithTheseWords
                    .map(this.escapeRegExpIfStr.bind(this))
                    .map((x) => x + '$')
                    .join('|')})`,
            );
        }

        if (!_.isEmpty(toContain)) {
            toReturn += /(?=A)/.source.replace('A', toContain.join(''));
        }

        const notToContain = [];

        if (!_.isEmpty(options.doesNotStartWithTheseWords)) {
            notToContain.push(
                `(${options.doesNotStartWithTheseWords
                    .map(this.escapeRegExpIfStr.bind(this))
                    .map((x) => x)
                    .join('|')})`,
            );

            toReturn += '^';
        }

        if (!_.isEmpty(options.doesNotContainTheseWords)) {
            notToContain.push(
                `.*(${options.doesNotContainTheseWords
                    .map(this.escapeRegExpIfStr.bind(this))
                    .map((x) => x)
                    .join('|')})`,
            );
        }

        if (!_.isEmpty(options.doesNotEndsWithTheseWords)) {
            notToContain.push(
                `.*(${options.doesNotEndsWithTheseWords
                    .map(this.escapeRegExpIfStr.bind(this))
                    .map((x) => x + '$')
                    .join('|')})`,
            );
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
}
