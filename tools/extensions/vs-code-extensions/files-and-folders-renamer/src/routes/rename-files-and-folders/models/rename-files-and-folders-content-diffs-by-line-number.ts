
export interface RenameFilesAndFoldersContentDiffsByLineNumber {
  lineNumber: number;
  fromContext: string;
  containsDiff: boolean;
  diffs: [number, string][];
}