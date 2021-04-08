import { sharedPaths } from '@shared/paths';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import {rootPaths}  from '@root/paths';

const dirPath = rootPaths.toAbsolutePath();



glob.sync(path.join(dirPath, '**/*.temp.txt')).forEach((file) => {
    fs.unlinkSync(file);
});
