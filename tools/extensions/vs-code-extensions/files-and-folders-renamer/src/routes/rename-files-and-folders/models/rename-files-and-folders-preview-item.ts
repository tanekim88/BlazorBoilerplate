import { RenameFilesAndFoldersContent } from "./rename-files-and-folders-content";

export interface RenameFilesAndFoldersPreviewItem {
    from: string,
    to?: string,
    diffs?: [number, string][],
    contents?: RenameFilesAndFoldersContent[];
}