import { MergeCommandOption } from './merge-command-option';
export class MergeCommand {
    static append(...args) {
        return [MergeCommandOption.append, args];
    }
    static prepend(...args) {
        return [MergeCommandOption.prepend, args];
    }
    static overwrite(...args) {
        return [MergeCommandOption.overwrite, args];
    }
    static overwriteCommandsOnly(...args) {
        return [MergeCommandOption.overwriteCommandsOnly, args];
    }
    static getOverwritten(...args) {
        return [MergeCommandOption.getOverwritten, args];
    }
    static deleteLastOne() {
        return [MergeCommandOption.deleteLastOne];
    }
    static deleteFirstOne() {
        return [MergeCommandOption.deleteFirstOne];
    }
    static deleteFirstN(n) {
        return [MergeCommandOption.deleteFirstN, n];
    }
    static deleteLastN(n) {
        return [MergeCommandOption.deleteLastN, n];
    }
    static makeThemUnique() {
        return [MergeCommandOption.makeThemUnique];
    }
    static customMerge = (func) => {
        return [MergeCommandOption.customMerge, func];
    };
}
//# sourceMappingURL=merge-command.js.map