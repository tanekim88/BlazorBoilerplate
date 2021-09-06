export class MergeCommandOption {
    static token = {};
    static append = { name: 'append', token: MergeCommandOption.token };
    static prepend = { name: 'prepend', token: MergeCommandOption.token };
    static overwrite = { name: 'overwrite', token: MergeCommandOption.token };
    static overwriteCommandsOnly = { name: 'overwriteCommandsOnly', token: MergeCommandOption.token };
    static getOverwritten = { name: 'getOverwritten', token: MergeCommandOption.token };
    static deleteLastOne = { name: 'deleteLastOne', token: MergeCommandOption.token };
    static deleteFirstOne = { name: 'deleteFirstOne', token: MergeCommandOption.token };
    static deleteFirstN = { name: 'deleteFirstN', token: MergeCommandOption.token };
    static deleteLastN = { name: 'deleteLastN', token: MergeCommandOption.token };
    static makeThemUnique = { name: 'makeThemUnique', token: MergeCommandOption.token };
    static customMerge = { name: 'customMerge', token: MergeCommandOption.token };
}
//# sourceMappingURL=merge-command-option.js.map