import { MergeCommandOption } from './merge-command-option';

export class MergeCommand {
    static append<T>(...args: T[]) {
        return [MergeCommandOption.append, args] as any;
    }

    static prepend<T>(...args: T[]) {
        return [MergeCommandOption.prepend, args] as any;
    }

    static overwrite<T>(...args: T[]) {
        return [MergeCommandOption.overwrite, args] as any;
    }

    static overwriteCommandsOnly<T>(...args: T[]) {
        return [MergeCommandOption.overwriteCommandsOnly, args] as any;
    }

    static getOverwritten<T>(...args: T[]) {
        return [MergeCommandOption.getOverwritten, args] as any;
    }

    static deleteLastOne() {
        return [MergeCommandOption.deleteLastOne] as any;
    }

    static deleteFirstOne() {
        return [MergeCommandOption.deleteFirstOne] as any;
    }

    static deleteFirstN(n: number) {
        return [MergeCommandOption.deleteFirstN, n] as any;
    }

    static deleteLastN(n: number) {
        return [MergeCommandOption.deleteLastN, n] as any;
    }

    static makeThemUnique() {
        return [MergeCommandOption.makeThemUnique] as any;
    }
    static customMerge = (func: any) => {
        return [MergeCommandOption.customMerge, func] as any;
    };
}
