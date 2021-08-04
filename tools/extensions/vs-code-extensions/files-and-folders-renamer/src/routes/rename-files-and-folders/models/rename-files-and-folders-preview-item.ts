import { RenameFilesAndFoldersContentDiffsByLineNumber } from "./rename-files-and-folders-content-diffs-by-line-number";

export interface RenameFilesAndFoldersPreviewItem {
    pathFrom: string,
    pathTo?: string,
    pathDiffs?: [number, string][],
    lineNumbersWithChange?: number[];
    contentDiffsLookup?: { [lineNumber: number]: RenameFilesAndFoldersContentDiffsByLineNumber }
}