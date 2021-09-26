"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeCustomizer = void 0;
const merge_command_option_1 = require("./merge-command-option");
const lodash_1 = __importDefault(require("lodash"));
function mergeCustomizer(mergeDefault = merge_command_option_1.MergeCommandOption.append) {
    return (objValue, srcValue, key, object, source, stack) => {
        // if (srcValue && srcValue[0]?.name === 'prepend') {
        //     debugger;
        // }
        if (lodash_1.default.isNil(objValue)) {
            return srcValue;
        }
        if (lodash_1.default.isObject(objValue) && lodash_1.default.isObject(srcValue)) {
            if ((lodash_1.default.isArray(objValue) && !lodash_1.default.isArray(srcValue)) || (!lodash_1.default.isArray(objValue) && lodash_1.default.isArray(srcValue))) {
                throw new Error('Property type mismatch.');
            }
        }
        if (typeof srcValue === 'string') {
            return srcValue;
        }
        if (lodash_1.default.isArray(objValue)) {
            if (objValue.length > 0) {
                let toReturn = [];
                objValue.forEach((s) => {
                    if (s[0]?.token !== merge_command_option_1.MergeCommandOption.token) {
                        s = [mergeDefault, [s]];
                    }
                    const command = s[0];
                    switch (command) {
                        case merge_command_option_1.MergeCommandOption.prepend:
                            toReturn = [].concat(s[1]).concat(toReturn);
                            break;
                        case merge_command_option_1.MergeCommandOption.overwrite:
                            toReturn = [];
                            toReturn = toReturn.concat(s[1]);
                            break;
                        case merge_command_option_1.MergeCommandOption.overwriteCommandsOnly:
                            toReturn = toReturn.filter((t) => t[0]?.token !== merge_command_option_1.MergeCommandOption.token);
                            toReturn = toReturn.concat(s[1]);
                            break;
                        case merge_command_option_1.MergeCommandOption.getOverwritten:
                            break;
                        case merge_command_option_1.MergeCommandOption.append:
                            toReturn = toReturn.concat(s[1]);
                            break;
                        case merge_command_option_1.MergeCommandOption.deleteFirstOne:
                            toReturn.shift();
                            break;
                        case merge_command_option_1.MergeCommandOption.deleteFirstN:
                            toReturn.splice(0, s[1][0]);
                            break;
                        case merge_command_option_1.MergeCommandOption.deleteLastOne:
                            toReturn.pop();
                            break;
                        case merge_command_option_1.MergeCommandOption.deleteLastN:
                            toReturn.splice(toReturn.length - s[1][0]);
                            break;
                        case merge_command_option_1.MergeCommandOption.makeThemUnique:
                            toReturn = lodash_1.default.uniq(toReturn);
                            break;
                        case merge_command_option_1.MergeCommandOption.customMerge:
                            toReturn = s[1][0](toReturn);
                            break;
                        default:
                            toReturn.push(s[1][0]);
                            break;
                    }
                });
                objValue = toReturn;
            }
            if (lodash_1.default.isArray(srcValue) && srcValue.length > 0) {
                let toReturn = objValue;
                srcValue.forEach((s) => {
                    if (s[0]?.token !== merge_command_option_1.MergeCommandOption.token) {
                        s = [mergeDefault, s];
                    }
                    const command = s[0];
                    switch (command) {
                        case merge_command_option_1.MergeCommandOption.prepend:
                            toReturn = [].concat(s[1]).concat(toReturn);
                            break;
                        case merge_command_option_1.MergeCommandOption.overwrite:
                            toReturn = [];
                            toReturn = toReturn.concat(s[1]);
                            break;
                        case merge_command_option_1.MergeCommandOption.overwriteCommandsOnly:
                            toReturn = toReturn.filter((t) => t[0]?.token !== merge_command_option_1.MergeCommandOption.token);
                            toReturn = toReturn.concat(s[1]);
                            break;
                        case merge_command_option_1.MergeCommandOption.getOverwritten:
                            break;
                        case merge_command_option_1.MergeCommandOption.append:
                            toReturn = toReturn.concat(s[1]);
                            break;
                        case merge_command_option_1.MergeCommandOption.deleteFirstOne:
                            toReturn.shift();
                            break;
                        case merge_command_option_1.MergeCommandOption.deleteFirstN:
                            toReturn.splice(0, s[1][0]);
                            break;
                        case merge_command_option_1.MergeCommandOption.deleteLastOne:
                            toReturn.pop();
                            break;
                        case merge_command_option_1.MergeCommandOption.deleteLastN:
                            toReturn.splice(toReturn.length - s[1][0]);
                            break;
                        case merge_command_option_1.MergeCommandOption.makeThemUnique:
                            toReturn = lodash_1.default.uniq(toReturn);
                            break;
                        case merge_command_option_1.MergeCommandOption.customMerge:
                            toReturn = s[1][0](toReturn);
                            break;
                        default:
                            toReturn.push(s[1][0]);
                            break;
                    }
                });
                return toReturn;
            }
        }
    };
}
exports.mergeCustomizer = mergeCustomizer;
//# sourceMappingURL=merge-with-customizer.js.map