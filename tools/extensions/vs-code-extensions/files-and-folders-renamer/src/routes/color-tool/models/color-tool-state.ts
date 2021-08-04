import { RenameFilesAndFoldersOptions } from "./color-tool-options";
import { RenameFilesAndFoldersPreviewItem } from "./color-tool-preview-item";
import vscode from 'vscode';
export interface RenameFilesAndFoldersState {
    sourcePath: string;
    fromInput: string;
    fromRegexInput?: RegExp;
    toInput: string;
    options: RenameFilesAndFoldersOptions;
    previewItems: RenameFilesAndFoldersPreviewItem[];

    isPreviewLoading: boolean;
    isCommitLoading: boolean;
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
        showLineNumbers: true
    },
    previewItems: [],
    isPreviewLoading: false,
    isCommitLoading: false
}