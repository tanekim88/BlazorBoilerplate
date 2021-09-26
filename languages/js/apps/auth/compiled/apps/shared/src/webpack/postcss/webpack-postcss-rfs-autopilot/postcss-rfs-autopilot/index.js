"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postcss = require('postcss');
const helper_1 = require("./utilities/helper");
exports.default = postcss.plugin('postcss-rfs-autopilot', ({ includedRules, excludedRules, includedSelectors, excludedSelectors, includedUnits, excludedUnits, silentConsole }) => {
    const options = {
        includedRules: includedRules || [
            '*'
        ],
        excludedRules: excludedRules || [],
        includedSelectors: includedSelectors || [
            '*'
        ],
        excludedSelectors: excludedSelectors || [],
        includedUnits: includedUnits || ['px', 'rem'],
        excludedUnits: excludedUnits || [],
        silentConsole: silentConsole || false
    };
    // Filter includedRules here with excludedRules
    // options.includedRules = filterIdenticalValues(options.includedRules, options.excludedRules)
    // options.includedSelectors = filterIdenticalValues(options.includedSelectors, options.excludedSelectors)
    // options.includedUnits = filterIdenticalValues(options.includedUnits, options.excludedUnits)
    return (root, result) => {
        root.walkDecls((decl) => {
            if (helper_1.shouldBeTransformed(decl, options)) {
                decl.value = `rfs(${decl.value})`;
            }
        });
    };
});
//# sourceMappingURL=index.js.map