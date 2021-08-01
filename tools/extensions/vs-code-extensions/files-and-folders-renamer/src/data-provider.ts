import * as vscode from "vscode";
import * as fs from 'fs';
import * as path from 'path';

export interface Mapping {
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

    const mappings = this.getAllFilesAndFoldersMappings(source, regexFrom, to, options);
    return mappings;
  }

  commit(mappings: Mapping[]) {
    mappings.reverse().forEach(mapping => {
      do {
        let basenameOfTo = path.basename(mapping.to);
        let dirnameOfTo = path.dirname(mapping.to);
        let dirnameOfFrom = path.dirname(mapping.from);
        const finalTo = path.join(dirnameOfFrom, basenameOfTo);
        fs.renameSync(mapping.from, finalTo);

        mapping = {
          from: dirnameOfFrom,
          to: dirnameOfTo
        };

      } while (mapping.from !== mapping.to);
    });
  }

  private getAllFilesAndFoldersMappings(srcPath: string, fromInput: RegExp, toInput: string, options: Options, mappings: Mapping[] = []) {
    const isDirectory = fs.statSync(srcPath).isDirectory();
    const shouldIncludeInMapping = options.includeFiles && !isDirectory || options.includeFolders && isDirectory;
    if (fromInput.test(srcPath)) {
      const to = srcPath.replace(fromInput, toInput);
      if (shouldIncludeInMapping) {
        if (mappings.length > 0 && srcPath.startsWith(mappings[mappings.length - 1].from)) {
          mappings.pop();
        }

        mappings.push({
          from: srcPath,
          to
        });
      }
    }

    if (isDirectory) {
      const filesOrDirNames = fs.readdirSync(srcPath);

      filesOrDirNames.forEach((fileOrDirName) => {
        const fullPath = path.join(srcPath, fileOrDirName);
        this.getAllFilesAndFoldersMappings(fullPath, fromInput, toInput, options, mappings);
      });
    }

    return mappings;
  }
}

export const dataProvider = new DataProvider();