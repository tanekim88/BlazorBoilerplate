"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeCommand = void 0;
const merge_command_option_1 = require("./merge-command-option");
class MergeCommand {
    static append(...args) {
        return [merge_command_option_1.MergeCommandOption.append, args];
    }
    static prepend(...args) {
        return [merge_command_option_1.MergeCommandOption.prepend, args];
    }
    static overwrite(...args) {
        return [merge_command_option_1.MergeCommandOption.overwrite, args];
    }
    static overwriteCommandsOnly(...args) {
        return [merge_command_option_1.MergeCommandOption.overwriteCommandsOnly, args];
    }
    static getOverwritten(...args) {
        return [merge_command_option_1.MergeCommandOption.getOverwritten, args];
    }
    static deleteLastOne() {
        return [merge_command_option_1.MergeCommandOption.deleteLastOne];
    }
    static deleteFirstOne() {
        return [merge_command_option_1.MergeCommandOption.deleteFirstOne];
    }
    static deleteFirstN(n) {
        return [merge_command_option_1.MergeCommandOption.deleteFirstN, n];
    }
    static deleteLastN(n) {
        return [merge_command_option_1.MergeCommandOption.deleteLastN, n];
    }
    static makeThemUnique() {
        return [merge_command_option_1.MergeCommandOption.makeThemUnique];
    }
}
exports.MergeCommand = MergeCommand;
MergeCommand.customMerge = (func) => {
    return [merge_command_option_1.MergeCommandOption.customMerge, func];
};
//# sourceMappingURL=merge-command.js.map