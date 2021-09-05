import fs from 'fs';
import path from 'path';

import { RenameFilesAndFoldersState } from "../models/rename-files-and-folders-state";

import { RenameFilesAndFoldersPreviewItem } from "../models/rename-files-and-folders-preview-item";
import { RenameFilesAndFoldersOptions } from "../models/rename-files-and-folders-options";
import diff from "fast-diff";
import { RenameFilesAndFoldersContentDiffsByLineNumber } from "../models/rename-files-and-folders-content-diffs-by-line-number";

class RenameFilesAndFoldersService {
  getPreviews(arg: RenameFilesAndFoldersState) {
    let { sourcePath, toInput, options } = arg;

    this.processStateArgs(arg);

    const previewItems = this.getAllFilesAndFolderspreviewItems(sourcePath, arg.fromRegexInput!, toInput ?? '', options, [], undefined, true);
    previewItems.forEach((previewItem) => {
      if (previewItem.pathTo) {
        previewItem.pathDiffs = diff(previewItem.pathFrom, previewItem.pathTo);
      }
    });

    return previewItems;
  }
  getPreDataForCommit(arg: RenameFilesAndFoldersState) {
    let { sourcePath, toInput, options } = arg;

    this.processStateArgs(arg);

    const previewItems = this.getAllFilesAndFolderspreviewItems(sourcePath, arg.fromRegexInput!, toInput ?? '', options, [], undefined, false);

    return previewItems;
  }

  processStateArgs(arg: RenameFilesAndFoldersState) {
    let { fromInput: from, options } = arg;

    let regexOptions = '';

    if (options.isGlobal) {
      regexOptions += 'g';
    }

    if (options.caseInsensitive) {
      regexOptions += 'i';
    }

    if (!options.isRegex) {
      from = from?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    let fromRegexInput = new RegExp(from!, regexOptions);

    arg.fromRegexInput = fromRegexInput;
  }

  commit(args: RenameFilesAndFoldersState) {
    this.processStateArgs(args);

    let { previewItems, options } = args;


    const newArgs = Object.assign({}, args, { options: Object.assign({}, args.options, { includeContents: false } as RenameFilesAndFoldersOptions) });
    previewItems = this.getPreDataForCommit(newArgs);


    const changeTracker: { [src: string]: string } = {};
    previewItems.forEach(previewItem => {

      if (options.includeContents) {
        let content = fs.readFileSync(previewItem.pathFrom, { encoding: 'utf8' });
        content = content.replace(args.fromRegexInput!, args.toInput);
        fs.writeFileSync(previewItem.pathFrom, content);
      }

      do {
        if (!previewItem.pathTo) {
          break;
        }

        const isDirectory = fs.statSync(previewItem.pathFrom).isDirectory();

        let basenameOfTo = path.basename(previewItem.pathTo);
        let dirnameOfTo = path.dirname(previewItem.pathTo);
        let basenameOfFrom = path.basename(previewItem.pathFrom);
        let dirnameOfFrom = path.dirname(previewItem.pathFrom);
        const cachedDirnameOfFrom = changeTracker[dirnameOfFrom];
        dirnameOfFrom = cachedDirnameOfFrom ?? dirnameOfFrom;
        const finalTo = path.join(dirnameOfFrom, basenameOfTo);

        const shouldExecute = (options.includeFiles && !isDirectory || options.includeFolders && isDirectory)
          && basenameOfFrom !== basenameOfTo;

        if (shouldExecute) {
          try {
            fs.renameSync(previewItem.pathFrom, finalTo);
            changeTracker[previewItem.pathFrom] = finalTo;
          } catch (e) { }
        }

        previewItem = {
          pathFrom: dirnameOfFrom,
          pathTo: dirnameOfTo
        };

      } while (previewItem.pathFrom !== previewItem.pathTo);
    });
  }


  private getAllFilesAndFolderspreviewItems(
    srcPath: string, fromInput: RegExp, toInput: string,
    options: RenameFilesAndFoldersOptions, previewItems: RenameFilesAndFoldersPreviewItem[] = [], parentItem: any = undefined, isForPreview = true) {
    const isDirectory = fs.statSync(srcPath).isDirectory();
    const shouldIncludeInpreviewItem = options.includeFiles && !isDirectory || options.includeFolders && isDirectory;

    const fromBasename = path.basename(srcPath);
    const fromDirname = path.dirname(srcPath);
    let toPush: RenameFilesAndFoldersPreviewItem | undefined;

    if (fromInput.test(fromBasename)) {
      const toBasename = fromBasename.replace(fromInput, toInput);
      if (shouldIncludeInpreviewItem) {
        let to = path.join(fromDirname, toBasename);
        let from = srcPath;

        if (parentItem && srcPath.startsWith(parentItem.pathFrom)) {
          const parentDirname = parentItem.pathTo;

          if (isForPreview) {
            if (previewItems?.length > 0 && previewItems[previewItems.length - 1]?.pathFrom === parentItem.pathFrom) {
              previewItems.pop();
            }
          } else {
            from = path.join(parentDirname!, path.sep, fromBasename);;
          }

          to = path.join(parentDirname!, path.sep, toBasename);
        }

        toPush = {
          pathFrom: from,
          pathTo: to
        };
      }
    }

    if (isDirectory) {
      if (toPush) {
        previewItems.push(toPush);
      }

      const filesOrDirNames = fs.readdirSync(srcPath);

      filesOrDirNames.forEach((fileOrDirName) => {
        const fullPath = path.join(srcPath, fileOrDirName);
        this.getAllFilesAndFolderspreviewItems(fullPath, fromInput, toInput, options, previewItems, toPush, isForPreview);
      });
    } else {
      if (options.includeContents) {

        const content = fs.readFileSync(srcPath, { encoding: 'utf8' });
        let lineNumber = 1;

        const modified = content.replace(fromInput, toInput);
        const result = diff(content, modified);
        const lineNumberToDataCache: {
          [name: number]: RenameFilesAndFoldersContentDiffsByLineNumber
        } = {} as any;
        result.forEach(d => {
          const text = d[1];
          const editState = d[0];

          const reg = /(?<partTextSegment>[^\r\n]*)(?<newLine>\r?\n)?/g;

          let r = reg.exec(text);
          while (r && r[0]?.length) {
            if (!lineNumberToDataCache[lineNumber]) {
              lineNumberToDataCache[lineNumber] = { diffs: [], fromContext: '', containsDiff: false, lineNumber };
            }
            const partText = r[0];
            if (partText) {
              switch (editState) {
                case 0:
                  lineNumberToDataCache[lineNumber].fromContext += partText;

                  lineNumberToDataCache[lineNumber].diffs.push([0, partText]);
                  break;
                case -1:
                  lineNumberToDataCache[lineNumber].fromContext += partText;
                  lineNumberToDataCache[lineNumber].diffs.push([-1, partText]);
                  lineNumberToDataCache[lineNumber].containsDiff = true;
                  break;
                case 1:
                  lineNumberToDataCache[lineNumber].diffs.push([1, partText]);
                  lineNumberToDataCache[lineNumber].containsDiff = true;
                  break;
              }

              {
                // let content: RenameFilesAndFoldersContent = {

                // };
              }
            }
            const newLine = r.groups?.newLine;
            if (newLine) {
              lineNumber += 1;
            }

            r = reg.exec(text);
          };
        });

        const lineNumbersWithChange: number[] = [];
        const contentDiffsLookup: { [lineNumber: number]: RenameFilesAndFoldersContentDiffsByLineNumber } = {};
        const allLineNumbers = Object.keys(lineNumberToDataCache);
        allLineNumbers.forEach(key => {
          const lineNumber = Number(key);

          if (lineNumberToDataCache[lineNumber].containsDiff) {
            lineNumbersWithChange.push(lineNumber);
            const minLineNumber = Math.max(1, lineNumber - options.contextLinesDepth);
            const maxLineNumber = Math.min(Number(allLineNumbers[allLineNumbers.length - 1]), lineNumber + options.contextLinesDepth);
            for (let tempLineNumber = minLineNumber; tempLineNumber <= maxLineNumber; tempLineNumber++) {
              if (!contentDiffsLookup[tempLineNumber]) {
                contentDiffsLookup[tempLineNumber] = lineNumberToDataCache[tempLineNumber];
              }
            }
          };
        });
        if (toPush) {
          toPush.lineNumbersWithChange = lineNumbersWithChange;
          toPush.contentDiffsLookup = contentDiffsLookup;
        }
      }

      if (toPush) {
        previewItems.push(toPush);
      }
    }


    return previewItems;
  }
}

export const renameFilesAndFoldersService = new RenameFilesAndFoldersService();