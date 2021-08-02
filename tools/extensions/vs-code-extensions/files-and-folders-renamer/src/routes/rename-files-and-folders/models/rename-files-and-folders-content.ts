export interface RenameFilesAndFoldersContent {
  fromIndex: number,
  fromLastIndex: number,
  toContent: string,
  fromContext: string,
  toContext: string,
  contextDiffs?: [number, string][]
}