import { sharedPaths } from '#shared/paths';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
const dirPath = sharedPaths.src.web.material.native.toAbsolutePath();
glob.sync(path.join(dirPath, '**/_index.ts')).forEach((file) => {
    const newPath = file.replace(/(_)(index.ts)$/, '$2');
    fs.renameSync(file, newPath);
});
//# sourceMappingURL=rename-_index-ts-to-index-ts.js.map