import { RenameFilesAndFoldersOptions } from "./rename-files-and-folders-options";
import { RenameFilesAndFoldersPreviewItem } from "./rename-files-and-folders-preview-item";

export interface RenameFilesAndFoldersState {
    source: string;
    from: string;
    to: string;
    options: RenameFilesAndFoldersOptions;
    previewItems: RenameFilesAndFoldersPreviewItem[];
    isPreviewLoading: boolean;
    isCommitLoading: boolean;
}