import * as vscode from "vscode";
import * as fs from 'fs';
import * as path from 'path';

export interface previewItem {
  from: string,
  to: string
}
export interface Options {
  includeFiles: boolean,
  includeFolders: boolean,
  isGlobal: boolean,
  isRegex: boolean,
  caseInsensitive: boolean
}

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

    const previewItems = this.getAllFilesAndFolderspreviewItems(source, regexFrom, to, options);
    return previewItems;
  }

  commit(args: {
    previewItems: previewItem[],
    source: string,
    from: string,
    to: string, options: Options
  }) {
    let { previewItems, options } = args;

    if (!previewItems) {
      previewItems = this.fetchPreview(args);
    }

    previewItems.reverse().forEach(previewItem => {
      do {
        const isDirectory = fs.statSync(previewItem.from).isDirectory();

        let basenameOfTo = path.basename(previewItem.to);
        let dirnameOfTo = path.dirname(previewItem.to);
        let basenameOfFrom = path.basename(previewItem.from);
        let dirnameOfFrom = path.dirname(previewItem.from);
        const finalTo = path.join(dirnameOfFrom, basenameOfTo);

        const shouldExecute = (options.includeFiles && !isDirectory || options.includeFolders && isDirectory)
          && basenameOfFrom !== basenameOfTo;

        if (shouldExecute) {
          fs.renameSync(previewItem.from, finalTo);
        }

        previewItem = {
          from: dirnameOfFrom,
          to: dirnameOfTo
        };

      } while (previewItem.from !== previewItem.to);
    });
  }


  private getAllFilesAndFolderspreviewItems(srcPath: string, fromInput: RegExp, toInput: string, options: Options, previewItems: previewItem[] = []) {
    const isDirectory = fs.statSync(srcPath).isDirectory();
    const shouldIncludeInpreviewItem = options.includeFiles && !isDirectory || options.includeFolders && isDirectory;

    const basename = path.basename(srcPath);
    const dirname = path.dirname(srcPath);

    if (fromInput.test(basename)) {
      const toBasename = basename.replace(fromInput, toInput);
      const to = path.join(dirname, toBasename);
      if (shouldIncludeInpreviewItem) {
        if (previewItems.length > 0 && srcPath.startsWith(previewItems[previewItems.length - 1].from)) {
          previewItems.pop();
        }

        previewItems.push({
          from: srcPath,
          to
        });
      }
    }

    if (isDirectory) {
      const filesOrDirNames = fs.readdirSync(srcPath);

      filesOrDirNames.forEach((fileOrDirName) => {
        const fullPath = path.join(srcPath, fileOrDirName);
        this.getAllFilesAndFolderspreviewItems(fullPath, fromInput, toInput, options, previewItems);
      });
    }

    return previewItems;
  }
}

export const dataProvider = new DataProvider();