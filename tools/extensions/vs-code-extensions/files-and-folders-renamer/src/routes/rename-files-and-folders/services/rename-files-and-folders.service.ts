import vscode from "vscode";
import fs from 'fs';
import path from 'path';

import { RenameFilesAndFoldersState } from "../models/rename-files-and-folders-state";
import { RenameFilesAndFoldersContent } from "../models/rename-files-and-folders-content";
import { RenameFilesAndFoldersPreviewItem } from "../models/rename-files-and-folders-preview-item";
import { RenameFilesAndFoldersOptions } from "../models/rename-files-and-folders-options";


class RenameFilesAndFoldersService {
  getPreviews(arg: RenameFilesAndFoldersState) {
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

  commit(args: RenameFilesAndFoldersState) {
    let { previewItems, options } = args;

    if (!previewItems) {
      previewItems = this.getPreviews(args);
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


  private getAllFilesAndFolderspreviewItems(
    srcPath: string, fromInput: RegExp, toInput: string, 
    options: RenameFilesAndFoldersOptions, previewItems: RenameFilesAndFoldersPreviewItem[] = []) {
    const isDirectory = fs.statSync(srcPath).isDirectory();
    const shouldIncludeInpreviewItem = options.includeFiles && !isDirectory || options.includeFolders && isDirectory;

    const fromBasename = path.basename(srcPath);
    const fromDirname = path.dirname(srcPath);
    let toPush: RenameFilesAndFoldersPreviewItem | undefined;

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
        const contents: RenameFilesAndFoldersContent[] = [];

        while (cont) {
          const index = cont!.index;
          const lastIndex = fromInput.lastIndex;
          cont = fromInput.exec(content);

          let contextIndex = index;
          let contextLastIndex = lastIndex;


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


          let fromContext = content.slice(contextIndex, contextLastIndex);
          const sliceIndex = index - contextIndex;
          const sliceLastIndex = contextLastIndex - index;

          const fromContent = content.slice(index, lastIndex);

          const toContent = fromContent.replace(fromInput, toInput);

          let toContext = fromContext.slice(0, sliceIndex) + toContent + fromContext.slice(sliceIndex + fromContent.length);
          fromContext = fromContext.replace(/^\r?\n|\r?\n$/g, '');
          toContext = toContext.replace(/^\r?\n|\r?\n$/g, '');
          contents.push({
            fromIndex: index,
            fromLastIndex: lastIndex,
            toContent,
            fromContext,
            toContext
          });

        };

        if (contents.length > 0) {
          if (!toPush) {
            toPush = {
              from: srcPath,
            }
          }

          toPush.contents = contents;
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