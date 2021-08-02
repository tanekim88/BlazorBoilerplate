import { RenameFilesAndFoldersOptions } from "./rename-files-and-folders-options";
import { RenameFilesAndFoldersPreviewItem } from "./rename-files-and-folders-preview-item";
import vscode from 'vscode';
export interface RenameFilesAndFoldersState {
    source: string;
    from: string | undefined;
    to: string | undefined;
    options: RenameFilesAndFoldersOptions;
    previewItems: RenameFilesAndFoldersPreviewItem[];
    isPreviewLoading: boolean;
    isCommitLoading: boolean;
    extensionUri?: vscode.Uri;
}

export const defaultRenameFilesAndFoldersState: RenameFilesAndFoldersState = {
    source: '',
    from: undefined,
    to: undefined,
    options: {
        includeFiles: true,
        includeFolders: true,
        isGlobal: true,
        isRegex: true,
        caseInsensitive: false,
        includeContents: false,
        contextLinesDepth: 0,
        showLineNumbers: false
    },
    previewItems: [],
    isPreviewLoading: false,
    isCommitLoading: false
}