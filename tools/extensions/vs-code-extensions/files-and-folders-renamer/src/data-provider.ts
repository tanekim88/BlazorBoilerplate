import vscode from "vscode";
import fs from 'fs';
import path from 'path';
import diff from 'fast-diff';
export interface PreviewItem {
  from: string,
  to?: string,
  diffs?: [number, string][],
  contents?: Content[];
}
interface Content {
  fromIndex: number,
  fromLastIndex: number,
  toContent: string,
  fromContext: string,
  toContext: string,
  contextDiffs?: [number, string][]
}
export interface Options {
  includeFiles: boolean,
  includeFolders: boolean,
  isGlobal: boolean,
  isRegex: boolean,
  caseInsensitive: boolean,
  includeContents: boolean,
  contextLinesDepth: number,
  showLineNumbers: boolean
}
const newLineRegex = /\r?\n/g;
class DataProvider {
  fetchPreview(
    arg: {
      source: string,
      from: string,
      to: string,
      options: Options
    }) {
    let { source, from, to, options } = arg;

    let regexOptions = '';

    if (options.isGlobal) {
      regexOptions += 'g';
    }

    if (options.caseInsensitive) {
      regexOptions += 'i';
    }

    if (!options.isRegex) {
      from = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    let regexFrom = new RegExp(from, regexOptions);

    const previewItems = this.getAllFilesAndFolderspreviewItems(source, regexFrom, to ?? '', options);
    return previewItems;
  }

  commit(args: {
    previewItems: PreviewItem[],
    source: string,
    from: string,
    to: string, options: Options
  }) {
    let { previewItems, options } = args;

    if (!previewItems) {
      previewItems = this.fetchPreview(args);
    }

    const changeTracker: { [src: string]: string } = {};
    previewItems.reverse().forEach(previewItem => {

      if (options.includeContents) {
        let content = fs.readFileSync(previewItem.from, { encoding: 'utf8' });
        previewItem.contents?.reverse().forEach(contentData => {
          content = content.slice(0, contentData.fromIndex) + contentData.toContent + content.slice(contentData.fromLastIndex);
        });
        fs.writeFileSync(previewItem.from, content);
      }

      do {
        if (!previewItem.to) {
          break;
        }

        const isDirectory = fs.statSync(previewItem.from).isDirectory();

        let basenameOfTo = path.basename(previewItem.to);
        let dirnameOfTo = path.dirname(previewItem.to);
        let basenameOfFrom = path.basename(previewItem.from);
        let dirnameOfFrom = path.dirname(previewItem.from);
        const cachedDirnameOfFrom = changeTracker[dirnameOfFrom];
        dirnameOfFrom = cachedDirnameOfFrom ?? dirnameOfFrom;
        const finalTo = path.join(dirnameOfFrom, basenameOfTo);

        const shouldExecute = (options.includeFiles && !isDirectory || options.includeFolders && isDirectory)
          && basenameOfFrom !== basenameOfTo;

        if (shouldExecute) {
          try {
            fs.renameSync(previewItem.from, finalTo);
            changeTracker[previewItem.from] = finalTo;
          } catch (e) { }
        }

        previewItem = {
          from: dirnameOfFrom,
          to: dirnameOfTo
        };

      } while (previewItem.from !== previewItem.to);


    });
  }


  private getAllFilesAndFolderspreviewItems(srcPath: string, fromInput: RegExp, toInput: string, options: Options, previewItems: PreviewItem[] = []) {
    const isDirectory = fs.statSync(srcPath).isDirectory();
    const shouldIncludeInpreviewItem = options.includeFiles && !isDirectory || options.includeFolders && isDirectory;

    const fromBasename = path.basename(srcPath);
    const fromDirname = path.dirname(srcPath);
    let toPush: PreviewItem | undefined;

    if (fromInput.test(fromBasename)) {
      const toBasename = fromBasename.replace(fromInput, toInput);
      if (shouldIncludeInpreviewItem) {
        let to = path.join(fromDirname, toBasename);

        if (previewItems.length > 0 && srcPath.startsWith(previewItems[previewItems.length - 1].from)) {
          const parentDirname = previewItems.pop()?.to;
          to = path.join(parentDirname!, toBasename);
        }

        toPush = {
          from: srcPath,
          to
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
        this.getAllFilesAndFolderspreviewItems(fullPath, fromInput, toInput, options, previewItems);
      });
    } else {
      if (options.includeContents) {
        const content = fs.readFileSync(srcPath, { encoding: 'utf8' });
        const contentLength = content.length;
        fromInput.lastIndex = 0;
        let cont = fromInput.exec(content);
        const contents: Content[] = [];

        while (cont) {
          const index = cont!.index;
          const lastIndex = fromInput.lastIndex;
          let contextIndex = index;
          let contextLastIndex = lastIndex;

          if (options.showLineNumbers) {
            let currentContextLinesDepth = 0;
            while (currentContextLinesDepth < (options.contextLinesDepth + 1) && contextIndex > 0) {
              contextIndex = content.lastIndexOf('\n', Math.max(0, contextIndex - 1));
              contextIndex = Math.max(0, contextIndex);
              if (contextIndex > 0 && content[contextIndex - 1] === '\r') {
                contextIndex -= 1;
              }

              contextLastIndex = content.indexOf('\n', Math.min(contentLength, contextLastIndex + 1));
              if (contextLastIndex === -1) {
                contextLastIndex = contentLength;
              } else {
                contextLastIndex += 1;
              }

              currentContextLinesDepth += 1;
            }
          }

          let fromContext = content.slice(contextIndex, contextLastIndex);
          const sliceIndex = index - contextIndex;
          const sliceLastIndex = lastIndex - contextLastIndex;

          const fromContent = content.slice(index, lastIndex);
          const toContent = fromContent.replace(fromInput, toInput);

          let toContext = fromContext.slice(0, sliceIndex) + toContent + fromContent.slice(sliceLastIndex);
          fromContext = fromContext.replace(/^\r?\n|\r?\n$/g, '');
          toContext = toContext.replace(/^\r?\n|\r?\n$/g, '');
          contents.push({
            fromIndex: index,
            fromLastIndex: lastIndex,
            toContent,
            fromContext,
            toContext
          });

          cont = fromInput.exec(content);
        };

        if (contents.length > 0) {
          if (!toPush) {
            toPush = {
              from: srcPath,

            }
          }
        }

      }
    }

    return previewItems;
  }
}

export const dataProvider = new DataProvider();