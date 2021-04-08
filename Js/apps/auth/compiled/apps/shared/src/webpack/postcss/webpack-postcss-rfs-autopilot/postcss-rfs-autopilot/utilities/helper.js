"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldBeTransformed = exports.isIncluded = exports.hasWrappedInRFS = void 0;
const chalk = require('chalk');
const hasWrappedInRFS = (decl) => /^rfs/g.test(decl.value);
exports.hasWrappedInRFS = hasWrappedInRFS;
const isIncluded = (decl, inclusionRules) => {
    if (inclusionRules.includes('*')) {
        return true;
    }
    return inclusionRules.some(unit => RegExp(unit).test(decl));
};
exports.isIncluded = isIncluded;
const log = (msg, msgType, silentConsole) => {
    if (silentConsole === true) {
        return;
    }
    switch (msgType) {
        case 'success':
            console.log(chalk.green(msg));
            break;
        case 'notice':
            console.log(chalk.cyan(msg));
            break;
        case 'error':
            console.log(chalk.red(msg));
            break;
        default:
    }
};
const shouldBeTransformed = (decl, options) => {
    const messageTemplate = `${decl.parent.selector}{ ${decl.prop}: ${decl.value} }`;
    if (hasWrappedInRFS(decl)) {
        log(`${messageTemplate} was already wrapped in rfs()`, 'notice', options.silentConsole);
        return false;
    }
    const inclusionRules = [options.includedRules, options.includedSelectors, options.includedUnits];
    const exclusionRules = [options.excludedRules, options.excludedSelectors, options.excludedUnits];
    const validationValues = [decl.prop, decl.parent.selector, decl.value];
    for (const [index, value] of validationValues.entries()) {
        if (!isIncluded(value, inclusionRules[index]) || isIncluded(value, exclusionRules[index])) {
            log(`${messageTemplate} has been excluded`, 'error', options.silentConsole);
            return false;
        }
    }
    log(`${messageTemplate} has been wrapped with rfs()`, 'success', options.silentConsole);
    return true;
};
exports.shouldBeTransformed = shouldBeTransformed;
//# sourceMappingURL=helper.js.map