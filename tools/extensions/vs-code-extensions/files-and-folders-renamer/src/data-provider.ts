import * as vscode from "vscode";
import * as fs from 'fs';
import * as path from 'path';

export interface Mapping {
  from: string,
  to: string
}

class DataProvider {
  fetchPreview(
    arg: {
      sourcePath: string,
      from: RegExp,
      to: string
    }) {
    const { sourcePath, from, to } = arg;

    const mappings = this.getAllFilesAndFoldersMappings(sourcePath, from, to);
    return mappings;
  }

  commit(mappings: Mapping[]) {
    mappings.forEach(mapping => {
      fs.renameSync(mapping.from, mapping.to);
    });
  }

  private getAllFilesAndFoldersMappings(srcPath: string, fromInput: RegExp, toInput: string, mappings: Mapping[] = []) {
    if (!fromInput.test(srcPath)) {
      return mappings;
    }

    const to = srcPath.replace(fromInput, toInput);

    mappings.push({
      from: srcPath,
      to
    });

    if (fs.statSync(srcPath).isDirectory()) {
      const filesOrDirNames = fs.readdirSync(srcPath);

      filesOrDirNames.forEach((fileOrDirName) => {
        const fullPath = path.join(srcPath, fileOrDirName);
        this.getAllFilesAndFoldersMappings(fullPath, fromInput, toInput, mappings);
      });
    }

    return mappings;
  }
}

export const dataProvider = new DataProvider();