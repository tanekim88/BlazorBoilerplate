export class MergeCommandOption {
    static readonly token = {};

    static readonly append: any = { name: 'append', token: MergeCommandOption.token };

    static readonly prepend: any = { name: 'prepend', token: MergeCommandOption.token };

    static readonly overwrite: any = { name: 'overwrite', token: MergeCommandOption.token };

    static readonly overwriteCommandsOnly: any = { name: 'overwriteCommandsOnly', token: MergeCommandOption.token };

    static readonly getOverwritten: any = { name: 'getOverwritten', token: MergeCommandOption.token };

    static readonly deleteLastOne: any = { name: 'deleteLastOne', token: MergeCommandOption.token };

    static readonly deleteFirstOne: any = { name: 'deleteFirstOne', token: MergeCommandOption.token };

    static readonly deleteFirstN: any = { name: 'deleteFirstN', token: MergeCommandOption.token };

    static readonly deleteLastN: any = { name: 'deleteLastN', token: MergeCommandOption.token };

    static readonly makeThemUnique: any = { name: 'makeThemUnique', token: MergeCommandOption.token };

    static readonly customMerge: any = { name: 'customMerge', token: MergeCommandOption.token };
}
