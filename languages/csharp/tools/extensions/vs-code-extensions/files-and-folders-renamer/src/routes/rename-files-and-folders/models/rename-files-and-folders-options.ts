export interface RenameFilesAndFoldersOptions {
    includeFiles: boolean,
    includeFolders: boolean,
    isGlobal: boolean,
    isRegex: boolean,
    caseInsensitive: boolean,
    includeContents: boolean,
    replaceContentOnlyForMatchedFiles: boolean,
    doNotRenameFilesOrFolders: boolean,
    contextLinesDepth: number,
    showLineNumbers: boolean,
    deleteIfResultingNameIsBlank: boolean,
    deleteIfResultingNameHasBlankPrefix: boolean,
    removeBlankPrefixIfResultingNameHasBlankPrefix: boolean
    skipIfResultingNameHasBlankPrefix: boolean
  }
  