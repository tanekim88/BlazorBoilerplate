import { RenameFilesAndFoldersOptions } from "./rename-files-and-folders-options";
import { RenameFilesAndFoldersPreviewItem } from "./rename-files-and-folders-preview-item";
import vscode from 'vscode';
export interface RenameFilesAndFoldersState {
    sourcePath: string;
    fromInput: string;
    fromRegexInput?: RegExp;
    toInput: string;
    options: RenameFilesAndFoldersOptions;
    previewItems: RenameFilesAndFoldersPreviewItem[];
    isPreviewLoading: boolean;
    extensionUri?: vscode.Uri;
}

export const defaultRenameFilesAndFoldersState: RenameFilesAndFoldersState = {
    sourcePath: '',
    fromInput: '',
    toInput: '',
    options: {
        includeFiles: true,
        includeFolders: true,
        isGlobal: true,
        isRegex: false,
        caseInsensitive: false,
        includeContents: false,
        contextLinesDepth: 0,
        showLineNumbers: true,
        deleteIfResultingNameIsBlank: false,
        deleteIfResultingNameHasBlankPrefix: false
    },
    previewItems: [],
    isPreviewLoading: false,
}