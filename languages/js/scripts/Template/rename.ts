import { sharedPaths } from '@projects/shared/paths';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
const dirPath = sharedPaths.src.web.material.native.toAbsolutePath();

let from = '_temp_'
let to = '_final_';

glob.sync(path.join(dirPath, '**/*_*_.*')).forEach((file) => {
    const newPath = file.replace(new RegExp(from + '(\\.\\w+)$'), to + '$1');
    fs.renameSync(file, newPath);
});
